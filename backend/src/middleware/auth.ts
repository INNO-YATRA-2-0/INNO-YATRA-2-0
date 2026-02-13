import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';

// Extend Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export interface AuthRequest extends Request {
  user: IUser;
}

// Middleware to authenticate JWT token
export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      res.status(401).json({
        success: false,
        message: 'Access token is missing'
      });
      return;
    }

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    
    // Find user by ID
    const user = await User.findById(decoded.id).select('+isActive');
    
    if (!user || !user.isActive) {
      res.status(401).json({
        success: false,
        message: 'Invalid token or user is not active'
      });
      return;
    }

    req.user = user;
    next();
  } catch (error: any) {
    if (error.name === 'JsonWebTokenError') {
      res.status(401).json({
        success: false,
        message: 'Invalid token'
      });
    } else if (error.name === 'TokenExpiredError') {
      res.status(401).json({
        success: false,
        message: 'Token expired'
      });
    } else {
      console.error('Authentication error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error during authentication'
      });
    }
  }
};

// Middleware to check if user is admin
export const requireAdmin = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (req.user.role !== 'admin') {
      res.status(403).json({
        success: false,
        message: 'Admin access required'
      });
      return;
    }
    next();
  } catch (error) {
    console.error('Admin check error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during authorization'
    });
  }
};

// Middleware to check if user is student
export const requireStudent = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (req.user.role !== 'student') {
      res.status(403).json({
        success: false,
        message: 'Student access required'
      });
      return;
    }
    next();
  } catch (error) {
    console.error('Student check error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during authorization'
    });
  }
};

// Middleware to check if user can access batch resources
export const checkBatchAccess = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { batchId } = req.params;
    
    // Admin can access all batches
    if (req.user.role === 'admin') {
      next();
      return;
    }
    
    // Students can only access their own batch
    if (req.user.role === 'student' && req.user.batchId === batchId) {
      next();
      return;
    }
    
    res.status(403).json({
      success: false,
      message: 'Access denied for this batch'
    });
  } catch (error) {
    console.error('Batch access check error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during batch access check'
    });
  }
};

export default {
  authenticateToken,
  requireAdmin,
  requireStudent,
  checkBatchAccess
};