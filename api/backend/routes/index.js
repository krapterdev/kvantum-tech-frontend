import { Router } from 'express';
import authRoutes from '../modules/auth/auth.routes.js';
import leadRoutes from '../modules/lead/lead.routes.js';
import serviceRoutes from '../modules/service/service.routes.js';
import blogRoutes from '../modules/blog/blog.routes.js';
import seoPageRoutes from '../modules/seopage/seopage.routes.js';
import assetRoutes from '../modules/asset/asset.routes.js';
import userRoutes from '../modules/user/user.routes.js';
import settingRoutes from '../modules/setting/setting.routes.js';
import portfolioRoutes from '../modules/portfolio/portfolio.routes.js';

const router = Router();

// Mount all feature modules onto their respective route prefixes
router.use('/admin', authRoutes);
router.use('/leads', leadRoutes);
router.use('/services', serviceRoutes);
router.use('/blogs', blogRoutes);
router.use('/seopages', seoPageRoutes);
router.use('/assets', assetRoutes);
router.use('/users', userRoutes); // Mount user management routes
router.use('/settings', settingRoutes);
router.use('/portfolios', portfolioRoutes);

export default router;
