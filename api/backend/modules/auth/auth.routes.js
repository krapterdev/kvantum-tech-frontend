import { Router } from 'express';
import { login, handleBackupDatabase, handleResetDatabase, handleRestoreBackup } from './auth.controller.js';
import { validateLogin } from './auth.validator.js';
import { authenticateToken, authorizeRoles } from '../../middlewares/auth.middleware.js';

const router = Router();

// Will be mounted under /api/admin
router.post('/login', validateLogin, login);

// Secure Super Admin Database Operations
router.get('/backup', authenticateToken, authorizeRoles('admin'), handleBackupDatabase);
router.post('/reset-database', authenticateToken, authorizeRoles('admin'), handleResetDatabase);
router.post('/restore-backup', authenticateToken, authorizeRoles('admin'), handleRestoreBackup);

export default router;
