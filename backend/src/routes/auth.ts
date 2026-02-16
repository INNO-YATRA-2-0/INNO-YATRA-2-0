import express from 'express';
import {
  login,
  registerStudent,
  createBatch,
  deleteBatch,
  getProfile,
  getAllBatches,
  initializeAdmin
} from '../controllers/authController';
import { authenticateToken, requireAdmin } from '../middleware/auth';

const router = express.Router();

// Public routes
router.post('/login', login);
router.post('/init-admin', initializeAdmin);

// Protected routes - require authentication
router.get('/profile', authenticateToken, getProfile as any);

// Admin only routes
router.post('/register-student', authenticateToken as any, requireAdmin as any, registerStudent as any);
router.post('/create-batch', authenticateToken as any, requireAdmin as any, createBatch as any);
router.delete('/batches/:batchId', authenticateToken as any, requireAdmin as any, deleteBatch as any);
router.get('/batches', authenticateToken as any, requireAdmin as any, getAllBatches as any);

export default router;