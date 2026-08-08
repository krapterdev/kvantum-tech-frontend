import { Router } from 'express';
import { 
  handleGetSeoPages, 
  handleCreateSeoPage, 
  handleCreateBulkSeoPages, 
  handleUpdateSeoPage, 
  handleDeleteSeoPage,
  handleGetSeoSettings,
  handleGetSeoSettingByKey,
  handleUpdateSeoSetting
} from './seopage.controller.js';
import { validateSeoPage, validateBulkSeoPages } from './seopage.validator.js';
import { authenticateToken, authorizeRoles } from '../../middlewares/auth.middleware.js';

const router = Router();

// SEO settings routes (must be defined before /:slug to prevent Express path-matching conflicts)
router.get('/settings', handleGetSeoSettings);
router.get('/settings/:key', handleGetSeoSettingByKey);
router.put('/settings/:key', authenticateToken, authorizeRoles('admin', 'seo'), handleUpdateSeoSetting);

// Programmatic SEO page routes
router.get('/', handleGetSeoPages);
router.post('/', authenticateToken, authorizeRoles('admin', 'seo'), validateSeoPage, handleCreateSeoPage);
router.post('/bulk', authenticateToken, authorizeRoles('admin', 'seo'), validateBulkSeoPages, handleCreateBulkSeoPages);
router.put('/:slug', authenticateToken, authorizeRoles('admin', 'seo'), validateSeoPage, handleUpdateSeoPage);
router.delete('/:slug', authenticateToken, authorizeRoles('admin', 'seo'), handleDeleteSeoPage);

export default router;
