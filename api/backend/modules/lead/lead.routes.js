import { Router } from 'express';
import { handleLeadSubmit, handleGetLeads, handleUpdateLead } from './lead.controller.js';
import { validateLeadSubmit, validateLeadUpdate } from './lead.validator.js';
import { authenticateToken, authorizeRoles } from '../../middlewares/auth.middleware.js';

const router = Router();

// Mounted under /api/leads
router.get('/', authenticateToken, authorizeRoles('admin', 'sales'), handleGetLeads);
router.post('/', validateLeadSubmit, handleLeadSubmit);
router.put('/:id', authenticateToken, authorizeRoles('admin', 'sales'), validateLeadUpdate, handleUpdateLead);

export default router;
