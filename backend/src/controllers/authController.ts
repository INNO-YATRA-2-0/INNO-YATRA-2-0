import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';
import Batch from '../models/Batch';
import { AuthRequest } from '../middleware/auth';

// Generate JWT token
const generateToken = (id: string): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  } as jwt.SignOptions);
};

// Login function for both admin and student
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, batchId } = req.body;

    // Validation
    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
      return;
    }

    // Find user by email
    const user = await User.findOne({ 
      email: email.toLowerCase(),
      isActive: true 
    }).select('+password');

    if (!user || !(await user.comparePassword(password))) {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
      return;
    }

    // Additional validation for students
    if (user.role === 'student') {
      if (!batchId) {
        res.status(400).json({
          success: false,
          message: 'Batch ID is required for student login'
        });
        return;
      }

      if (user.batchId !== batchId.toUpperCase()) {
        res.status(401).json({
          success: false,
          message: 'Invalid batch ID for this user'
        });
        return;
      }

      // Check if batch is active
      const batch = await Batch.findOne({ 
        batchId: batchId.toUpperCase(),
        isActive: true 
      });

      if (!batch) {
        res.status(401).json({
          success: false,
          message: 'Batch is not active or does not exist'
        });
        return;
      }
    }

    // Generate token
    const token = generateToken(user._id);

    // Remove password from response
    const userResponse = user.toJSON();

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user: userResponse
      }
    });
  } catch (error: any) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
};

// Register new student (only admin can do this)
export const registerStudent = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { email, password, name, batchId, batch } = req.body;
    
    console.log('Register student request received:', {
      email,
      name,
      batchId,
      batch,
      hasPassword: !!password
    });

    // Validation
    if (!email || !password || !name || !batchId || !batch) {
      console.log('Validation failed - missing fields:', {
        hasEmail: !!email,
        hasPassword: !!password,
        hasName: !!name,
        hasBatchId: !!batchId,
        hasBatch: !!batch
      });
      res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
      return;
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      console.log('User already exists:', email);
      res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
      return;
    }

    // Verify batch exists or create new one if admin
    console.log('Checking if batch exists:', batchId.toUpperCase());
    let batchExists = await Batch.findOne({ 
      batchId: batchId.toUpperCase(),
      isActive: true 
    });
    
    if (!batchExists) {
      console.log('Batch not found, creating new batch:', batchId.toUpperCase());
      // Auto-create new batch for admin users
      const extractedYear = parseInt(batchId.substring(3, 7)) || new Date().getFullYear();
      const startYear = extractedYear - 4;
      const batchRange = `${startYear}-${extractedYear}`;
      
      const newBatch = new Batch({
        batchId: batchId.toUpperCase(),
        batch: batchRange,
        department: 'Information Science and Engineering',
        year: extractedYear,
        totalStudents: 1,
        description: `${batchId.toUpperCase()} - Auto-created by admin`,
        isActive: true,
        createdBy: req.user?._id || req.user?.id
      });
      
      try {
        await newBatch.save();
        console.log(`Auto-created new batch successfully: ${batchId.toUpperCase()}`);
        batchExists = newBatch;
      } catch (error) {
        console.error('Error creating new batch:', error);
        res.status(400).json({
          success: false,
          message: 'Failed to create new batch: ' + (error as Error).message
        });
        return;
      }
    } else {
      console.log('Batch already exists:', batchExists.batchId);
    }

    // Create new student
    console.log('Creating new student with data:', {
      email: email.toLowerCase(),
      name,
      batchId: batchId.toUpperCase(),
      batch
    });
    
    const newUser = new User({
      email: email.toLowerCase(),
      password,
      name,
      role: 'student',
      batchId: batchId.toUpperCase(),
      batch,
      isActive: true
    });

    try {
      await newUser.save();
      console.log('Student created successfully:', newUser._id);
    } catch (error) {
      console.error('Error creating student:', error);
      res.status(400).json({
        success: false,
        message: 'Failed to create student: ' + (error as Error).message
      });
      return;
    }

    // Update batch student count for existing batches
    const currentStudentCount = await User.countDocuments({ 
      batchId: batchId.toUpperCase(), 
      isActive: true 
    });
    
    await Batch.findOneAndUpdate(
      { batchId: batchId.toUpperCase() },
      { totalStudents: currentStudentCount }
    );

    res.status(201).json({
      success: true,
      message: 'Student registered successfully',
      data: {
        user: newUser.toJSON()
      }
    });
  } catch (error: any) {
    console.error('Student registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during student registration'
    });
  }
};

// Create new batch (only admin can do this)
export const createBatch = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { batchId, batch, department, year, totalStudents, description } = req.body;

    // Validation
    if (!batchId || !batch || !department || !year) {
      res.status(400).json({
        success: false,
        message: 'Batch ID, batch, department, and year are required'
      });
      return;
    }

    // Check if batch already exists
    const existingBatch = await Batch.findOne({ batchId: batchId.toUpperCase() });
    if (existingBatch) {
      res.status(400).json({
        success: false,
        message: 'Batch with this ID already exists'
      });
      return;
    }

    // Create new batch
    const newBatch = new Batch({
      batchId: batchId.toUpperCase(),
      batch,
      department,
      year,
      totalStudents,
      description,
      createdBy: req.user._id,
      isActive: true
    });

    await newBatch.save();

    res.status(201).json({
      success: true,
      message: 'Batch created successfully',
      data: {
        batch: newBatch
      }
    });
  } catch (error: any) {
    console.error('Batch creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during batch creation'
    });
  }
};

// Get current user profile
export const getProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    res.json({
      success: true,
      data: {
        user: req.user.toJSON()
      }
    });
  } catch (error: any) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting profile'
    });
  }
};

// Get all batches (admin only)
export const getAllBatches = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const batches = await Batch.find({ isActive: true })
      .populate('createdBy', 'name email')
      .sort({ year: -1, batchId: 1 });

    res.json({
      success: true,
      data: {
        batches
      }
    });
  } catch (error: any) {
    console.error('Get batches error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting batches'
    });
  }
};

// Initialize admin user (run once)
export const initializeAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    // Check if admin already exists
    const existingAdmin = await User.findOne({ role: 'admin' });
    if (existingAdmin) {
      res.status(400).json({
        success: false,
        message: 'Admin user already exists'
      });
      return;
    }

    // Create admin user
    const adminUser = new User({
      email: process.env.ADMIN_EMAIL || 'admin@university.ac.in',
      password: process.env.ADMIN_PASSWORD || 'admin123',
      name: 'System Administrator',
      role: 'admin',
      isActive: true
    });

    await adminUser.save();

    res.status(201).json({
      success: true,
      message: 'Admin user created successfully',
      data: {
        user: adminUser.toJSON()
      }
    });
  } catch (error: any) {
    console.error('Admin initialization error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during admin initialization'
    });
  }
};

// Delete batch (admin only)
export const deleteBatch = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { batchId } = req.params;

    if (!batchId) {
      res.status(400).json({
        success: false,
        message: 'Batch ID is required'
      });
      return;
    }

    // Check if batch exists
    const batch = await Batch.findOne({ batchId: batchId.toUpperCase() });
    if (!batch) {
      res.status(404).json({
        success: false,
        message: 'Batch not found'
      });
      return;
    }

    // Check if there are students assigned to this batch
    const studentsInBatch = await User.countDocuments({
      batchId: batchId.toUpperCase(),
      role: 'student',
      isActive: true
    });

    if (studentsInBatch > 0) {
      res.status(400).json({
        success: false,
        message: `Cannot delete batch. There are ${studentsInBatch} active student(s) in this batch. Remove or reassign them first.`
      });
      return;
    }

    // Delete the batch
    await Batch.findOneAndDelete({ batchId: batchId.toUpperCase() });

    res.json({
      success: true,
      message: `Batch ${batchId.toUpperCase()} deleted successfully`
    });
  } catch (error: any) {
    console.error('Delete batch error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during batch deletion'
    });
  }
};

export default {
  login,
  registerStudent,
  createBatch,
  deleteBatch,
  getProfile,
  getAllBatches,
  initializeAdmin
};