import { Request, Response } from 'express';
import Project, { IProject } from '../models/Project';
import User from '../models/User';
import Batch from '../models/Batch';
import { AuthRequest } from '../middleware/auth';

// Create new project (students only)
export const createProject = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const {
      title,
      description,
      shortDescription,
      year,
      category,
      tags,
      teamMembers,
      supervisor,
      demoUrl,
      videoUrl,
      repoUrl,
      documentUrl,
      researchArticleUrl,
      implementation,
      modelDesign,
      relatedWork,
      motivation,
      softwareUsed,
      complexity,
      resultsDiscussion,
      batch,
      batchId
    } = req.body;

    // Validation
    if (!title || !description || !shortDescription || !year || !category || !teamMembers || !supervisor) {
      res.status(400).json({
        success: false,
        message: 'All required fields must be provided'
      });
      return;
    }

    // Use provided batchId or fall back to user's batchId
    const projectBatchId = batchId || req.user.batchId;
    const projectBatch = batch || req.user.batch;

    // Verify batch information exists
    if (!projectBatchId || !projectBatch) {
      res.status(400).json({
        success: false,
        message: 'Batch information is missing'
      });
      return;
    }

    // Check if batch exists and is active
    const batchRecord = await Batch.findOne({
      batchId: projectBatchId,
      isActive: true
    });

    if (!batchRecord) {
      res.status(400).json({
        success: false,
        message: 'Batch is not active or does not exist'
      });
      return;
    }

    // Create new project with all fields
    const newProject = new Project({
      title,
      description,
      shortDescription,
      year,
      batch: projectBatch,
      batchId: projectBatchId,
      category,
      tags: tags || [],
      teamMembers,
      supervisor,
      demoUrl,
      videoUrl,
      repoUrl,
      documentUrl,
      researchArticleUrl,
      implementation,
      modelDesign,
      relatedWork,
      motivation,
      softwareUsed: softwareUsed || [],
      complexity,
      resultsDiscussion,
      images: [],
      createdBy: req.user._id,
      isApproved: false
    });

    await newProject.save();

    // Populate creator information
    await newProject.populate('createdBy', 'name email batchId batch');

    res.status(201).json({
      success: true,
      message: 'Project created successfully and pending approval',
      data: {
        project: newProject
      }
    });
  } catch (error: any) {
    console.error('Create project error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during project creation'
    });
  }
};

// Get all projects (admin can see all, students see only their batch)
export const getAllProjects = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      category, 
      year, 
      search,
      approved,
      batchId 
    } = req.query;

    // Build query based on user role
    let query: any = {};

    if (req.user.role === 'student') {
      // Students can only see projects from their own batch
      query.batchId = req.user.batchId;
    } else if (req.user.role === 'admin') {
      // Admin can see all projects
      if (approved !== undefined) {
        query.isApproved = approved === 'true';
      }
      // Admin can filter by specific batch if provided
      if (batchId) {
        query.batchId = batchId;
      }
    }

    // Add filters
    if (category && category !== 'all') {
      query.category = category;
    }

    if (year && year !== 'all') {
      query.year = parseInt(year as string);
    }

    if (search) {
      query.$text = { $search: search as string };
    }

    // Calculate pagination
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    // Get projects with pagination
    const projects = await Project.find(query)
      .populate('createdBy', 'name email batchId batch')
      .populate('approvedBy', 'name email')
      .sort({ createdAt: -1 })
      .limit(limitNum)
      .skip(skip);

    // Get total count
    const total = await Project.countDocuments(query);

    // Calculate pagination info
    const totalPages = Math.ceil(total / limitNum);
    const hasNext = pageNum < totalPages;
    const hasPrev = pageNum > 1;

    res.json({
      success: true,
      data: {
        projects,
        pagination: {
          currentPage: pageNum,
          totalPages,
          totalProjects: total,
          hasNext,
          hasPrev,
          limit: limitNum
        }
      }
    });
  } catch (error: any) {
    console.error('Get projects error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting projects'
    });
  }
};

// Get single project by ID
export const getProjectById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id)
      .populate('createdBy', 'name email batchId batch')
      .populate('approvedBy', 'name email');

    if (!project) {
      res.status(404).json({
        success: false,
        message: 'Project not found'
      });
      return;
    }

    // Check if user can access this project
    if (req.user.role === 'student') {
      // Students can see approved projects or their own projects
      if (!project.isApproved && project.createdBy._id.toString() !== req.user._id.toString()) {
        res.status(403).json({
          success: false,
          message: 'Access denied'
        });
        return;
      }
    }

    res.json({
      success: true,
      data: {
        project
      }
    });
  } catch (error: any) {
    console.error('Get project by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting project'
    });
  }
};

// Update project (only creator can update, and only if not approved)
export const updateProject = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const project = await Project.findById(id);

    if (!project) {
      res.status(404).json({
        success: false,
        message: 'Project not found'
      });
      return;
    }

    // Check if user can update this project
    if (req.user.role === 'student') {
      // Only creator can update, and only if not approved
      if (project.createdBy.toString() !== req.user._id.toString()) {
        res.status(403).json({
          success: false,
          message: 'You can only update your own projects'
        });
        return;
      }

      if (project.isApproved) {
        res.status(400).json({
          success: false,
          message: 'Cannot update approved projects'
        });
        return;
      }
    }
    // Admin can update any project

    // Remove fields that shouldn't be updated by students
    if (req.user.role === 'student') {
      delete updateData.createdBy;
      delete updateData.batchId;
      delete updateData.batch;
      delete updateData.isApproved;
      delete updateData.approvedBy;
      delete updateData.approvedAt;
    }
    // Admin can update more fields but still protect some
    if (req.user.role === 'admin') {
      delete updateData.createdBy;
    }

    // Update project
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { ...updateData, updatedAt: new Date() },
      { new: true, runValidators: true }
    ).populate('createdBy', 'name email batchId batch');

    res.json({
      success: true,
      message: 'Project updated successfully',
      data: {
        project: updatedProject
      }
    });
  } catch (error: any) {
    console.error('Update project error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating project'
    });
  }
};

// Approve/Reject project (admin only)
export const approveProject = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { approve } = req.body; // true to approve, false to reject

    const project = await Project.findById(id);

    if (!project) {
      res.status(404).json({
        success: false,
        message: 'Project not found'
      });
      return;
    }

    // Update approval status
    project.isApproved = approve;
    project.approvedBy = req.user._id;
    project.approvedAt = new Date();

    await project.save();

    await project.populate('createdBy', 'name email batchId batch');
    await project.populate('approvedBy', 'name email');

    res.json({
      success: true,
      message: `Project ${approve ? 'approved' : 'rejected'} successfully`,
      data: {
        project
      }
    });
  } catch (error: any) {
    console.error('Approve project error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during project approval'
    });
  }
};

// Delete project (admin only, or creator if not approved)
export const deleteProject = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id);

    if (!project) {
      res.status(404).json({
        success: false,
        message: 'Project not found'
      });
      return;
    }

    // Check permissions
    if (req.user.role === 'student') {
      // Students can only delete their own non-approved projects
      if (project.createdBy.toString() !== req.user._id.toString()) {
        res.status(403).json({
          success: false,
          message: 'You can only delete your own projects'
        });
        return;
      }

      if (project.isApproved) {
        res.status(400).json({
          success: false,
          message: 'Cannot delete approved projects'
        });
        return;
      }
    }

    await Project.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error: any) {
    console.error('Delete project error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error deleting project'
    });
  }
};

// Get projects statistics (admin only)
export const getProjectStats = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const totalProjects = await Project.countDocuments();
    const approvedProjects = await Project.countDocuments({ isApproved: true });
    const pendingProjects = await Project.countDocuments({ isApproved: false });

    // Projects by category
    const projectsByCategory = await Project.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);

    // Projects by year
    const projectsByYear = await Project.aggregate([
      { $group: { _id: '$year', count: { $sum: 1 } } },
      { $sort: { _id: -1 } }
    ]);

    // Projects by batch
    const projectsByBatch = await Project.aggregate([
      { $group: { _id: '$batchId', count: { $sum: 1 } } }
    ]);

    res.json({
      success: true,
      data: {
        total: totalProjects,
        approved: approvedProjects,
        pending: pendingProjects,
        byCategory: projectsByCategory,
        byYear: projectsByYear,
        byBatch: projectsByBatch
      }
    });
  } catch (error: any) {
    console.error('Get project stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting project statistics'
    });
  }
};

export default {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  approveProject,
  deleteProject,
  getProjectStats
};