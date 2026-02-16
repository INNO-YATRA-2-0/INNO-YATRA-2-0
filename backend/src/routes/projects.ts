import express from 'express';
import {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  approveProject,
  deleteProject,
  getProjectStats
} from '../controllers/projectController';
import { authenticateToken, requireAdmin, requireStudent } from '../middleware/auth';

const router = express.Router();

// Public endpoint for approved projects (no authentication required)
router.get('/public', async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 12, 
      category, 
      year, 
      batch,
      search
    } = req.query;

    // Build query for public access - only approved projects
    let query: any = { isApproved: true };

    // Add filters
    if (category && category !== 'all') {
      query.category = category;
    }

    if (year && year !== 'all') {
      query.year = parseInt(year as string);
    }

    if (batch && batch !== 'all') {
      // Handle ISE batch grouping (only 2026 batches)
      if (batch === 'ise2026') {
        query.batch = { $regex: '^ISE2026', $options: 'i' };
      } else {
        // Exact batch match
        query.batch = batch;
      }
    }

    if (search) {
      query.$text = { $search: search as string };
    }

    // Calculate pagination
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    // Import Project model here to avoid circular dependency
    const Project = (await import('../models/Project')).default;

    // Get projects with pagination
    const projects = await Project.find(query)
      .populate('createdBy', 'name batchId batch')
      .sort({ createdAt: -1 })
      .limit(limitNum)
      .skip(skip);

    // Get total count
    const total = await Project.countDocuments(query);

    // Calculate pagination info
    const totalPages = Math.ceil(total / limitNum);
    const hasNextPage = pageNum < totalPages;
    const hasPrevPage = pageNum > 1;

    res.json({
      success: true,
      data: {
        projects,
        pagination: {
          currentPage: pageNum,
          totalPages,
          totalItems: total,
          itemsPerPage: limitNum,
          hasNextPage,
          hasPrevPage
        }
      }
    });

  } catch (error: any) {
    console.error('Error fetching public projects:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching projects',
      error: error.message
    });
  }
});

// Public endpoint to get all active batches (no authentication required)
router.get('/public/batches', async (req, res) => {
  try {
    const Batch = (await import('../models/Batch')).default;
    const batches = await Batch.find({ isActive: true })
      .select('batchId batch department year')
      .sort({ batchId: 1 });

    res.json({
      success: true,
      data: batches
    });
  } catch (error: any) {
    console.error('Error fetching public batches:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching batches',
      error: error.message
    });
  }
});

// All other routes require authentication
router.use(authenticateToken as any);

// Routes accessible by both admin and students
router.get('/', getAllProjects as any);
router.get('/:id', getProjectById as any);

// Routes for creating and updating projects (both admin and students)
router.post('/', createProject as any);
router.put('/:id', updateProject as any);

// Admin only routes
router.post('/:id/approve', requireAdmin as any, approveProject as any);
router.delete('/:id', requireAdmin as any, deleteProject as any);
router.get('/admin/stats', requireAdmin as any, getProjectStats as any);

export default router;