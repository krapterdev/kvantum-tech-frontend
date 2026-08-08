import { Router } from 'express';
import { handleGetBlogs, handleCreateBlog, handleUpdateBlog, handleDeleteBlog } from './blog.controller.js';
import { validateBlog } from './blog.validator.js';
import { authenticateToken, authorizeRoles } from '../../middlewares/auth.middleware.js';

const router = Router();

// Mounted under /api/blogs
router.get('/', handleGetBlogs);
router.post('/', authenticateToken, authorizeRoles('admin', 'seo'), validateBlog, handleCreateBlog);
router.put('/:id', authenticateToken, authorizeRoles('admin', 'seo'), validateBlog, handleUpdateBlog);
router.delete('/:id', authenticateToken, authorizeRoles('admin', 'seo'), handleDeleteBlog);

export default router;
