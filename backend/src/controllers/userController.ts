import { Request, Response } from 'express';
import User, { IUser } from '../models/User';
import Project from '../models/Project';
import Batch from '../models/Batch';
import { AuthRequest } from '../middleware/auth';

// Get all users (admin only)
export const getAllUsers = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { page = 1, limit = 10, role, batchId, search } = req.query;

    // Build query
    let query: any = { isActive: true };

    if (role && role !== 'all') {
      query.role = role;
    }

    if (batchId && batchId !== 'all') {
      query.batchId = batchId;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    // Calculate pagination
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    // Get users with pagination
    const users = await User.find(query)
      .sort({ createdAt: -1 })
      .limit(limitNum)
      .skip(skip);

    // Get total count
    const total = await User.countDocuments(query);

    // Calculate pagination info
    const totalPages = Math.ceil(total / limitNum);
    const hasNext = pageNum < totalPages;
    const hasPrev = pageNum > 1;

    res.json({
      success: true,
      data: {
        users,
        pagination: {
          currentPage: pageNum,
          totalPages,
          totalUsers: total,
          hasNext,
          hasPrev,
          limit: limitNum
        }
      }
    });
  } catch (error: any) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting users'
    });
  }
};

// Get user by ID
export const getUserById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found'
      });
      return;
    }

    // Students can only see their own profile
    if (req.user.role === 'student' && user._id.toString() !== req.user._id.toString()) {
      res.status(403).json({
        success: false,
        message: 'Access denied'
      });
      return;
    }

    // Get user's projects count
    const projectCount = await Project.countDocuments({
      createdBy: user._id,
      isApproved: true
    });

    res.json({
      success: true,
      data: {
        user,
        projectCount
      }
    });
  } catch (error: any) {
    console.error('Get user by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting user'
    });
  }
};

// Update user profile
export const updateUser = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    const user = await User.findById(id);

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found'
      });
      return;
    }

    // Users can only update their own profile, admins can update any profile
    if (req.user.role === 'student' && user._id.toString() !== req.user._id.toString()) {
      res.status(403).json({
        success: false,
        message: 'You can only update your own profile'
      });
      return;
    }

    // Check if email is already taken by another user
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ 
        email: email.toLowerCase(), 
        _id: { $ne: id } 
      });
      
      if (existingUser) {
        res.status(400).json({
          success: false,
          message: 'Email is already taken'
        });
        return;
      }
    }

    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        ...(name && { name }),
        ...(email && { email: email.toLowerCase() }),
        updatedAt: new Date()
      },
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'User updated successfully',
      data: {
        user: updatedUser
      }
    });
  } catch (error: any) {
    console.error('Update user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating user'
    });
  }
};

// Deactivate user (admin only)
export const deactivateUser = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found'
      });
      return;
    }

    // Cannot deactivate the logged-in admin
    if (user._id.toString() === req.user._id.toString()) {
      res.status(400).json({
        success: false,
        message: 'Cannot deactivate your own account'
      });
      return;
    }

    // Deactivate user
    user.isActive = false;
    await user.save();

    res.json({
      success: true,
      message: 'User deactivated successfully'
    });
  } catch (error: any) {
    console.error('Deactivate user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error deactivating user'
    });
  }
};

// Reactivate user (admin only)
export const reactivateUser = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found'
      });
      return;
    }

    // Reactivate user
    user.isActive = true;
    await user.save();

    res.json({
      success: true,
      message: 'User reactivated successfully'
    });
  } catch (error: any) {
    console.error('Reactivate user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error reactivating user'
    });
  }
};

// Get user statistics (admin only)
export const getUserStats = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const totalUsers = await User.countDocuments({ isActive: true });
    const totalStudents = await User.countDocuments({ role: 'student', isActive: true });
    const totalAdmins = await User.countDocuments({ role: 'admin', isActive: true });
    const inactiveUsers = await User.countDocuments({ isActive: false });

    // Users by batch
    const usersByBatch = await User.aggregate([
      { $match: { role: 'student', isActive: true } },
      { $group: { _id: '$batchId', count: { $sum: 1 } } }
    ]);

    // Recent registrations (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const recentRegistrations = await User.countDocuments({
      createdAt: { $gte: thirtyDaysAgo },
      isActive: true
    });

    res.json({
      success: true,
      data: {
        total: totalUsers,
        students: totalStudents,
        admins: totalAdmins,
        inactive: inactiveUsers,
        byBatch: usersByBatch,
        recentRegistrations
      }
    });
  } catch (error: any) {
    console.error('Get user stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting user statistics'
    });
  }
};

// Change password
export const changePassword = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      res.status(400).json({
        success: false,
        message: 'Current password and new password are required'
      });
      return;
    }

    // Get user with password
    const user = await User.findById(req.user._id).select('+password');

    if (!user || !(await user.comparePassword(currentPassword))) {
      res.status(400).json({
        success: false,
        message: 'Current password is incorrect'
      });
      return;
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (error: any) {
    console.error('Change password error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error changing password'
    });
  }
};

export default {
  getAllUsers,
  getUserById,
  updateUser,
  deactivateUser,
  reactivateUser,
  getUserStats,
  changePassword
};