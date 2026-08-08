import { Router } from 'express';
import { handleGetServices, handleCreateService, handleUpdateService, handleDeleteService, handleReorderServices } from './service.controller.js';
import { validateService } from './service.validator.js';
import { authenticateToken, authorizeRoles } from '../../middlewares/auth.middleware.js';

const router = Router();

// Mounted under /api/services
router.get('/', handleGetServices);
router.put('/reorder', authenticateToken, authorizeRoles('admin', 'seo'), handleReorderServices);
router.post('/', authenticateToken, authorizeRoles('admin', 'seo'), validateService, handleCreateService);
router.put('/:id', authenticateToken, authorizeRoles('admin', 'seo'), validateService, handleUpdateService);
router.delete('/:id', authenticateToken, authorizeRoles('admin', 'seo'), handleDeleteService);

export default router;
