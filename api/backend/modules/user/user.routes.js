import { Router } from 'express';
import { handleRegisterUser, handleGetUsersList, handleDeleteUser } from './user.controller.js';
import { authenticateToken, authorizeRoles } from '../../middlewares/auth.middleware.js';

const router = Router();

// Only admin users can manage user configurations
router.post('/', authenticateToken, authorizeRoles('admin'), handleRegisterUser);
router.get('/', authenticateToken, authorizeRoles('admin'), handleGetUsersList);
router.delete('/:id', authenticateToken, authorizeRoles('admin'), handleDeleteUser);

export default router;
