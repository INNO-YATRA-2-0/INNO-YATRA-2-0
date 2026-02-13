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

// All routes require authentication
router.use(authenticateToken as any);

// Routes accessible by both admin and students
router.get('/', getAllProjects as any);
router.get('/:id', getProjectById as any);

// Student only routes
router.post('/', requireStudent as any, createProject as any);
router.put('/:id', requireStudent as any, updateProject as any);

// Admin only routes
router.post('/:id/approve', requireAdmin as any, approveProject as any);
router.delete('/:id', requireAdmin as any, deleteProject as any);
router.get('/admin/stats', requireAdmin as any, getProjectStats as any);

export default router;