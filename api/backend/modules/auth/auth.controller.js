import { db, seedDefaultAdmin, seedDefaultSeoSettings, seedDefaultSiteSettings, seedDefaultPortfolios, seedDefaultServices } from '../../config/db.js';

export const login = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  const loginName = username || email;
  
  // Await the asynchronous database validation process
  const token = await authService.authenticateAdmin(loginName, password);

  // Decode user details from jwt token
  const decoded = jwt.decode(token);

  // Return both token and user object to support AdminPortalPage state
  res.status(200).json({ 
    token,
    user: {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
      name: decoded.role === 'admin' ? 'Kvantum Admin' : 'Staff Member'
    }
  });
});

// GET /api/admin/backup - Super Admin Download Database Backup
export const handleBackupDatabase = asyncHandler(async (req, res) => {
  try {
    const users = await db.query('SELECT "_id", "name", "email", "role", "created_at", "updated_at" FROM users');
    const leads = await db.query('SELECT * FROM leads ORDER BY "created_at" DESC');
    const services = await db.query('SELECT * FROM services ORDER BY "sortOrder" ASC, "created_at" ASC');
    const blogs = await db.query('SELECT * FROM blogs ORDER BY "created_at" DESC');
    const seoPages = await db.query('SELECT * FROM seo_pages ORDER BY "created_at" DESC');
    const seoSettings = await db.query('SELECT * FROM seo_settings');
    const siteSettings = await db.query('SELECT * FROM site_settings');
    const portfolios = await db.query('SELECT * FROM portfolios ORDER BY "created_at" DESC');

    const backupPayload = {
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      exportedBy: req.user?.email || 'admin@kvantumtechsolutions.com',
      tables: {
        users: users.rows,
        leads: leads.rows,
        services: services.rows,
        blogs: blogs.rows,
        seo_pages: seoPages.rows,
        seo_settings: seoSettings.rows,
        site_settings: siteSettings.rows,
        portfolios: portfolios.rows
      }
    };

    const fileName = `kts_db_backup_${new Date().toISOString().split('T')[0]}.json`;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.status(200).send(JSON.stringify(backupPayload, null, 2));
  } catch (err) {
    res.status(500).json({ error: 'Backup generation failed: ' + err.message });
  }
});

// POST /api/admin/reset-database - Super Admin Hard Reset Database
export const handleResetDatabase = asyncHandler(async (req, res) => {
  try {
    await db.query('TRUNCATE TABLE blogs, services, seo_pages, portfolios, leads RESTART IDENTITY CASCADE');
    await db.query('DELETE FROM seo_settings');
    await db.query('DELETE FROM site_settings');

    await seedDefaultAdmin();
    await seedDefaultSeoSettings();
    await seedDefaultSiteSettings();
    await seedDefaultPortfolios();
    await seedDefaultServices();

    res.status(200).json({ 
      message: 'Database reset successfully. Clean default seed templates reloaded.',
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    res.status(500).json({ error: 'Database reset failed: ' + err.message });
  }
});

// POST /api/admin/restore-backup - Super Admin Restore Database from Backup JSON
export const handleRestoreBackup = asyncHandler(async (req, res) => {
  try {
    const { backupData } = req.body;
    if (!backupData || !backupData.tables) {
      return res.status(400).json({ error: 'Invalid backup file payload format.' });
    }

    const { services, blogs } = backupData.tables;

    if (Array.isArray(services) && services.length > 0) {
      await db.query('DELETE FROM services');
      for (const s of services) {
        await db.query(
          `INSERT INTO services ("_id", "slug", "iconName", "title", "shortDesc", "longDesc", "color", "techStack", "metrics", "coverImage", "imageAlt", "imageTitle", "keywords", "canonical", "metaTitle", "metaDesc", "ogTitle", "ogDesc", "ogImage", "showInHome", "sortOrder", "created_at", "updated_at")
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23)
           ON CONFLICT ("_id") DO UPDATE SET "title" = EXCLUDED."title", "updated_at" = NOW()`,
          [
            s._id || `service_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
            s.slug || '', s.iconName || 'Code', s.title || 'Untitled Service',
            s.shortDesc || '', s.longDesc || '', s.color || 'var(--accent-cyan)',
            s.techStack || '', s.metrics || '', s.coverImage || '',
            s.imageAlt || '', s.imageTitle || '', s.keywords || '',
            s.canonical || '', s.metaTitle || '', s.metaDesc || '',
            s.ogTitle || '', s.ogDesc || '', s.ogImage || '',
            s.showInHome ?? 1, s.sortOrder ?? 0,
            s.created_at || new Date().toISOString(),
            new Date().toISOString()
          ]
        );
      }
    }

    if (Array.isArray(blogs) && blogs.length > 0) {
      await db.query('DELETE FROM blogs');
      for (const b of blogs) {
        await db.query(
          `INSERT INTO blogs ("_id", "title", "category", "date", "readTime", "author", "image", "summary", "content", "keywords", "canonical", "metaTitle", "metaDesc", "ogTitle", "ogDesc", "ogImage", "ogType", "twitterTitle", "twitterDesc", "twitterCard", "faqs", "imageAlt", "imageTitle", "schemaMarkup", "otherSeoTags", "created_at", "updated_at")
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27)
           ON CONFLICT ("_id") DO UPDATE SET "title" = EXCLUDED."title", "updated_at" = NOW()`,
          [
            b._id || b.id || `blog_${Date.now()}`, b.title || 'Untitled Post', b.category || 'Engineering',
            b.date || '', b.readTime || 'Just now', b.author || 'Kvantum Tech Team', b.image || '',
            b.summary || '', b.content || '', b.keywords || '', b.canonical || '',
            b.metaTitle || '', b.metaDesc || '', b.ogTitle || '', b.ogDesc || '',
            b.ogImage || '', b.ogType || 'article', b.twitterTitle || '', b.twitterDesc || '',
            b.twitterCard || 'summary_large_image', JSON.stringify(b.faqs || []),
            b.imageAlt || '', b.imageTitle || '', b.schemaMarkup || '', b.otherSeoTags || '',
            b.created_at || b.createdAt || new Date().toISOString(), new Date().toISOString()
          ]
        );
      }
    }

    res.status(200).json({ message: 'Database backup payload restored successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Restore failed: ' + err.message });
  }
});
