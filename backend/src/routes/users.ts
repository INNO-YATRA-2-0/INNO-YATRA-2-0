import express from 'express';
import {
  getAllUsers,
  getUserById,
  updateUser,
  deactivateUser,
  reactivateUser,
  getUserStats,
  changePassword
} from '../controllers/userController';
import { authenticateToken, requireAdmin } from '../middleware/auth';

const router = express.Router();

// All routes require authentication
router.use(authenticateToken as any);

// Routes accessible by both admin and authenticated users
router.get('/:id', getUserById as any);
router.put('/:id', updateUser as any);
router.post('/change-password', changePassword as any);

// Admin only routes
router.get('/', requireAdmin as any, getAllUsers as any);
router.post('/:id/deactivate', requireAdmin as any, deactivateUser as any);
router.post('/:id/reactivate', requireAdmin as any, reactivateUser as any);
router.get('/admin/stats', requireAdmin as any, getUserStats as any);

export default router;