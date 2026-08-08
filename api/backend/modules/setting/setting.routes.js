import { Router } from 'express';
import { getSettings, updateSetting, getSeoSettings, updateSeoSetting } from './setting.controller.js';
import { authenticateToken, authorizeRoles } from '../../middlewares/auth.middleware.js';

const router = Router();

// Mounted under /api/settings
router.get('/seo', getSeoSettings);
router.put('/seo/:key', authenticateToken, authorizeRoles('admin', 'seo'), updateSeoSetting);

router.get('/', getSettings);
router.put('/:key', authenticateToken, authorizeRoles('admin', 'seo'), updateSetting);

export default router;
