import { Router } from 'express';
import { handleGetAssets, handleUploadAsset, handleDeleteAsset } from './asset.controller.js';
import { upload } from '../../middlewares/upload.middleware.js';
import { authenticateToken, authorizeRoles } from '../../middlewares/auth.middleware.js';

const router = Router();

// Mounted under /api/assets
router.get('/', authenticateToken, authorizeRoles('admin', 'seo'), handleGetAssets);
router.post('/upload', authenticateToken, authorizeRoles('admin', 'seo'), upload.single('file'), handleUploadAsset);
router.delete('/:name', authenticateToken, authorizeRoles('admin'), handleDeleteAsset);

export default router;
