import { Router } from 'express';
import { handleGetPortfolios, handleCreatePortfolio, handleUpdatePortfolio, handleDeletePortfolio } from './portfolio.controller.js';
import { authenticateToken, authorizeRoles } from '../../middlewares/auth.middleware.js';

const router = Router();

// Mounted under /api/portfolios
router.get('/', handleGetPortfolios);
router.post('/', authenticateToken, authorizeRoles('admin', 'seo'), handleCreatePortfolio);
router.put('/:id', authenticateToken, authorizeRoles('admin', 'seo'), handleUpdatePortfolio);
router.delete('/:id', authenticateToken, authorizeRoles('admin', 'seo'), handleDeletePortfolio);

export default router;
