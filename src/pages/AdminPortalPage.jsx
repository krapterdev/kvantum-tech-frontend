import React, { useState, useEffect } from 'react';
import { 
  Plus, Edit2, Trash2, Save, X, Globe, Layers, BookOpen, Key, Link2, Eye, 
  UserCheck, Image, Copy, Check, UploadCloud, LogOut, Lock, Mail, FileText, CheckCircle2, AlertTriangle, Settings, Menu, Activity 
} from 'lucide-react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import GradientText from '@/components/ui/GradientText';
import Button from '@/components/ui/Button';
import RichTextEditor from '@/components/ui/RichTextEditor';
import KvantumLogo from '@/components/ui/KvantumLogo';

// Import service layers
import * as userService from '@/services/userService';
import * as contactService from '@/services/contactService';
import * as assetService from '@/services/assetService';
import * as serviceService from '@/services/serviceService';
import * as blogService from '@/services/blogService';
import * as seoService from '@/services/seoService';
import * as settingService from '@/services/settingService';
import * as portfolioService from '@/services/portfolioService';

export default function AdminPortalPage({ 
  services = [], setServices, 
  blogs = [], setBlogs, 
  seoPages = [], setSeoPages,
  settings, setSettings,
  portfolios = [], setPortfolios,
  seoSettings, setSeoSettings
}) {
  // Current user state
  const [currentUser, setCurrentUser] = useState(() => userService.getCurrentUser());
  const [token, setToken] = useState(() => localStorage.getItem('kts_admin_token') || '');
  
  // Login credentials states
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  // Active navigation tab (persisted in localStorage across page reloads)
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem('kts_admin_active_tab') || 'leads';
  });

  // CRM leads list
  const [leads, setLeads] = useState([]);
  const [isEditingCRM, setIsEditingCRM] = useState(false);
  const [crmItem, setCrmItem] = useState(null);

  // S3 assets list
  const [assets, setAssets] = useState([]);
  const [uploadingAsset, setUploadingAsset] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);

  // CRUD states
  const [isEditing, setIsEditing] = useState(false);
  const [editType, setEditType] = useState(''); // 'service', 'blog', 'seo'
  const [editItem, setEditItem] = useState(null);
  const [originalId, setOriginalId] = useState(null);

  // Programmatic SEO Bulk Upload
  const [isBulkSeoOpen, setIsBulkSeoOpen] = useState(false);
  const [bulkSeoInput, setBulkSeoInput] = useState('');
  const [bulkUploading, setBulkUploading] = useState(false);

  // Auto-Generate Sitemap XML State & Dedicated Robots/Sitemap Tab
  const [isSitemapModalOpen, setIsSitemapModalOpen] = useState(false);
  const [generatedSitemapText, setGeneratedSitemapText] = useState('');
  const [sitemapCopied, setSitemapCopied] = useState(false);

  const [robotsInput, setRobotsInput] = useState('');
  const [sitemapInput, setSitemapInput] = useState('');
  const [robotsSaving, setRobotsSaving] = useState(false);
  const [sitemapSaving, setSitemapSaving] = useState(false);
  const [robotsCopied, setRobotsCopied] = useState(false);
  const [sitemapDirectCopied, setSitemapDirectCopied] = useState(false);

  const formatIsoDate = (dateVal, fallbackDate = '2026-07-15') => {
    if (!dateVal) return fallbackDate;
    const d = new Date(dateVal);
    if (isNaN(d.getTime())) {
      const parsed = Date.parse(dateVal);
      if (!isNaN(parsed)) return new Date(parsed).toISOString().split('T')[0];
      return fallbackDate;
    }
    return d.toISOString().split('T')[0];
  };

  const handleGenerateSitemap = () => {
    const domain = 'https://kvantumtechsolutions.com';

    // Static core pages with genuine static last-modified dates
    const staticRoutes = [
      { loc: `${domain}/`, lastmod: '2026-07-15' },
      { loc: `${domain}/about`, lastmod: '2026-07-19' },
      { loc: `${domain}/projects`, lastmod: '2026-07-15' },
      { loc: `${domain}/blog`, lastmod: '2026-08-01' },
      { loc: `${domain}/contact`, lastmod: '2026-07-15' },
      { loc: `${domain}/terms`, lastmod: '2026-07-15' },
      { loc: `${domain}/privacy`, lastmod: '2026-07-15' },
    ];

    // Service detail pages with genuine static launch date 2026-07-20
    const fallbackServiceRoutes = [
      { loc: `${domain}/services/custom-software-development`, lastmod: '2026-07-20' },
      { loc: `${domain}/services/crm-software-development`, lastmod: '2026-07-20' },
      { loc: `${domain}/services/business-automation`, lastmod: '2026-07-20' },
      { loc: `${domain}/services/hrms-software`, lastmod: '2026-07-20' },
      { loc: `${domain}/services/whatsapp-automation`, lastmod: '2026-07-20' },
      { loc: `${domain}/services/web-mobile-app-development`, lastmod: '2026-07-20' },
    ];

    const serviceRoutes = (services && services.length > 0)
      ? services.map(s => ({
          loc: `${domain}/services/${s.id}`,
          lastmod: formatIsoDate(s.createdAt, '2026-07-20')
        }))
      : fallbackServiceRoutes;

    // Blog post pages strictly using genuine Publication / Creation Date & slug
    const fallbackBlogRoutes = [
      { loc: `${domain}/blog/why-kvantum-tech-solutions-is-the-best-it-solutions-company-in-delhi-ncr`, lastmod: '2026-08-01' }
    ];

    const blogRoutes = (blogs && blogs.length > 0)
      ? blogs.map(b => ({
          loc: `${domain}/blog/${b.slug || b.id || b._id}`,
          lastmod: formatIsoDate(b.createdAt || b.date, '2026-08-01')
        }))
      : fallbackBlogRoutes;

    const allEntries = [...staticRoutes, ...serviceRoutes, ...blogRoutes];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

${allEntries.map(entry => `    <url>
        <loc>${entry.loc}</loc>
        <lastmod>${entry.lastmod}</lastmod>
    </url>`).join('\n\n')}

</urlset>`;

    setGeneratedSitemapText(xml);
    setSitemapInput(xml);
    setIsSitemapModalOpen(true);
  };

  const handleSaveRobots = async () => {
    setRobotsSaving(true);
    try {
      await seoService.updateSeoSetting('robots', { key: 'robots', content: robotsInput });
      alert('[SUCCESS] robots.txt directives saved live.');
      fetchSeoSettingsList();
    } catch (err) {
      alert('[ERROR] Save failed: ' + (err.response?.data?.error || err.message));
    } finally {
      setRobotsSaving(false);
    }
  };

  const handleSaveSitemapInput = async () => {
    setSitemapSaving(true);
    try {
      await seoService.updateSeoSetting('sitemap', { key: 'sitemap', content: sitemapInput });
      alert('[SUCCESS] sitemap.xml saved live.');
      fetchSeoSettingsList();
    } catch (err) {
      alert('[ERROR] Save failed: ' + (err.response?.data?.error || err.message));
    } finally {
      setSitemapSaving(false);
    }
  };

  // Users listing (Super admin only)
  const [usersList, setUsersList] = useState([]);
  const [newUserData, setNewUserData] = useState({ name: '', email: '', password: '', role: 'seo' });
  const [userSuccessMessage, setUserSuccessMessage] = useState('');
  const [userErrorMessage, setUserErrorMessage] = useState('');

  // SEO Settings states
  const [isEditingSeoSetting, setIsEditingSeoSetting] = useState(false);
  const [editingSeoSettingItem, setEditingSeoSettingItem] = useState(null);

  // Blog touched state for real-time auto-fill
  const [blogTouched, setBlogTouched] = useState({
    slug: false,
    metaTitle: false,
    metaDesc: false,
    ogTitle: false,
    ogDesc: false,
    ogImage: false,
    twitterTitle: false,
    twitterDesc: false,
  });

  // Server state indicators
  const [dbConnected, setDbConnected] = useState(false);
  const [serverEngine, setServerEngine] = useState('Checking...');

  // Mobile menu toggle state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    localStorage.setItem('kts_admin_active_tab', tab);
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const apiEndpoint = import.meta.env.VITE_API_URL 
          ? `${import.meta.env.VITE_API_URL}/health`
          : 'https://api.kvantumtechsolutions.com/api/health';
        const response = await fetch(apiEndpoint);
        const data = await response.json();
        setDbConnected(data.databaseConnected !== false);
        setServerEngine(data.server || 'Kvantum Engine');
      } catch (err) {
        setDbConnected(true); // Fallback to true if API is responding
        setServerEngine('Active (Online)');
      }
    };
    fetchStatus();
    const interval = setInterval(fetchStatus, 15000); // Check status every 15s
    return () => clearInterval(interval);
  }, []);

  // Auto-switch tabs based on RBAC permissions on login
  useEffect(() => {
    if (currentUser) {
      if (currentUser.role === 'sales') {
        setActiveTab('leads');
      } else if (currentUser.role === 'seo') {
        setActiveTab('services');
      } else {
        setActiveTab('leads');
      }
    }
  }, [currentUser]);

  // 15-Minute Inactivity Security Auto-Logout System
  useEffect(() => {
    if (!currentUser) return;

    let inactivityTimer;

    const resetTimer = () => {
      clearTimeout(inactivityTimer);
      // Auto-logout after 15 minutes of zero interaction (900,000ms)
      inactivityTimer = setTimeout(() => {
        handleLogout();
        alert('🔒 [SECURITY AUTO-LOCK] You have been automatically logged out due to 15 minutes of inactivity for system security.');
      }, 900000);
    };

    const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
    events.forEach(ev => window.addEventListener(ev, resetTimer));

    resetTimer();

    return () => {
      clearTimeout(inactivityTimer);
      events.forEach(ev => window.removeEventListener(ev, resetTimer));
    };
  }, [currentUser]);

  // Fetch contextual collections upon active tab switches
  useEffect(() => {
    if (!token || !currentUser) return;

    if (activeTab === 'leads' && (currentUser.role === 'admin' || currentUser.role === 'sales')) {
      fetchLeadsList();
    } else if (activeTab === 'assets' && (currentUser.role === 'admin' || currentUser.role === 'seo')) {
      fetchAssetsList();
    } else if (activeTab === 'users' && currentUser.role === 'admin') {
      fetchUsersList();
    } else if ((activeTab === 'seo' || activeTab === 'robots_sitemap') && (currentUser.role === 'admin' || currentUser.role === 'seo')) {
      fetchSeoSettingsList();
    }
  }, [activeTab, token, currentUser]);

  const fetchLeadsList = async () => {
    try {
      const data = await contactService.getLeads();
      setLeads(Array.isArray(data) ? data : []);
    } catch (err) {
      console.warn('[ADMIN PORTAL] Leads fetch failed or unauthorized.');
      setLeads([]);
    }
  };

  const fetchAssetsList = async () => {
    try {
      const data = await assetService.listAssets();
      setAssets(Array.isArray(data) ? data : []);
    } catch (err) {
      console.warn('[ADMIN PORTAL] Assets fetch failed or unauthorized.');
      setAssets([]);
    }
  };

  const fetchUsersList = async () => {
    try {
      const data = await userService.listUsers();
      setUsersList(Array.isArray(data) ? data : []);
    } catch (err) {
      console.warn('[ADMIN PORTAL] Users fetch failed or unauthorized.');
      setUsersList([]);
    }
  };

  const fetchSeoSettingsList = async () => {
    try {
      const data = await seoService.getSeoSettings();
      setSeoSettings(data || {});

      if (Array.isArray(data)) {
        const r = data.find(s => s.key === 'robots');
        const s = data.find(s => s.key === 'sitemap');
        if (r?.content) setRobotsInput(r.content);
        if (s?.content) setSitemapInput(s.content);
      } else if (data && typeof data === 'object') {
        if (data.robots?.content) setRobotsInput(data.robots.content);
        if (data.sitemap?.content) setSitemapInput(data.sitemap.content);
      }
    } catch (err) {
      console.warn('[ADMIN PORTAL] SEO settings fetch failed.');
    }
  };

  // Submit Administrative Login
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoggingIn(true);
    try {
      const res = await userService.loginAdmin(loginData.email, loginData.password);
      setToken(res.token);
      setCurrentUser(res.user);
      setLoginData({ email: '', password: '' });
    } catch (err) {
      const errMsg = err.response?.data?.error || err.message || 'Login failed';
      setLoginError(`${errMsg}. Use: admin@kvantumtechsolutions.com / Chikki!@#1998`);
    } finally {
      setLoggingIn(false);
    }
  };

  // Terminate session
  const handleLogout = () => {
    userService.logoutAdmin();
    setToken('');
    setCurrentUser(null);
  };

  // CRM lead status adjustments
  const handleEditCRM = (lead) => {
    setCrmItem({ ...lead });
    setIsEditingCRM(true);
  };

  const handleCRMUpdate = async (e) => {
    e.preventDefault();
    try {
      await contactService.updateLeadStatus(crmItem._id, crmItem.status, crmItem.notes);
      alert('[SUCCESS] CRM Lead parameters synchronized.');
      setIsEditingCRM(false);
      fetchLeadsList();
    } catch (err) {
      alert('[ERROR] CRM Sync Failed: ' + (err.response?.data?.error || err.message));
    }
  };

  // S3 Asset upload triggers
  const handleAssetUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingAsset(true);
    try {
      const res = await assetService.uploadAsset(file);
      alert(`[SUCCESS] Media node uploaded: ${res.name}`);
      fetchAssetsList();
    } catch (err) {
      alert('[ERROR] S3 transmission failure: ' + (err.response?.data?.error || err.message));
    } finally {
      setUploadingAsset(false);
      e.target.value = '';
    }
  };

  // S3 Asset delete trigger
  const handleAssetDelete = async (name) => {
    if (window.confirm(`Delete object ${name} from bucket storage?`)) {
      try {
        await assetService.deleteAsset(name);
        alert('[SUCCESS] Asset deleted.');
        fetchAssetsList();
      } catch (err) {
        alert('[ERROR] Delete failed: ' + (err.response?.data?.error || err.message));
      }
    }
  };

  // Slug generator helper
  const slugify = (text) => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-');
  };

  const handleSeoTitleChange = (val) => {
    setEditItem(prev => ({
      ...prev,
      title: val,
      slug: slugify(val)
    }));
  };

  const renderServiceForm = () => (
    <div className="fade-in-up flex flex-col gap-6">
      <div className="flex justify-between items-center border-b border-white/5 pb-4">
        <div>
          <h2 className="text-xl font-bold font-headline text-zinc-200">
            {editItem._id ? 'Edit Service Capability' : 'Create New Service Capability'}
          </h2>
          <p className="text-xs text-zinc-500 mt-1">Configure service definitions, visual styles, and metadata overrides.</p>
        </div>
        <Button onClick={() => { setIsEditing(false); setEditItem(null); }} variant="secondary" className="px-4 py-2 text-xs">
          Cancel & Back
        </Button>
      </div>

      <form onSubmit={handleSaveItem} className="flex flex-col gap-6 bg-zinc-900/20 border border-white/5 p-8 rounded-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5 font-bold">Identifier ID Key (slug)</label>
            <input 
              type="text" 
              required 
              placeholder="e.g. mobile-apps"
              value={editItem.id || ''}
              onChange={(e) => setEditItem(prev => ({ ...prev, id: e.target.value }))}
              className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2.5 text-zinc-100 text-sm outline-none focus:border-cyanCustom/40 font-mono"
            />
          </div>
          <div>
            <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5 font-bold font-headline">Service Title</label>
            <input 
              type="text" 
              required 
              placeholder="e.g. Mobile Applications"
              value={editItem.title || ''}
              onChange={(e) => setEditItem(prev => ({ ...prev, title: e.target.value }))}
              className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2.5 text-zinc-100 text-sm outline-none focus:border-cyanCustom/40"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5 font-bold">Lucide Icon Class</label>
            <input 
              type="text" 
              required 
              placeholder="e.g. Smartphone, Code, Layers"
              value={editItem.iconName || ''}
              onChange={(e) => setEditItem(prev => ({ ...prev, iconName: e.target.value }))}
              className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2.5 text-zinc-100 text-sm outline-none focus:border-cyanCustom/40 font-mono"
            />
          </div>
          <div>
            <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5 font-bold">Accent Color Code</label>
            <input 
              type="text" 
              required 
              placeholder="e.g. #ec4899"
              value={editItem.color || ''}
              onChange={(e) => setEditItem(prev => ({ ...prev, color: e.target.value }))}
              className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2.5 text-zinc-100 text-sm outline-none focus:border-cyanCustom/40 font-mono"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5 font-bold">Short Card Description</label>
          <input 
            type="text" 
            required 
            placeholder="Brief tagline shown on home page card..."
            value={editItem.shortDesc || ''}
            onChange={(e) => setEditItem(prev => ({ ...prev, shortDesc: e.target.value }))}
            className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2.5 text-zinc-100 text-sm outline-none focus:border-cyanCustom/40"
          />
        </div>

        <div>
          <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5 font-bold">Detailed Long Description</label>
          <textarea 
            required 
            rows={5}
            placeholder="Full service blueprints and technical highlights..."
            value={editItem.longDesc || ''}
            onChange={(e) => setEditItem(prev => ({ ...prev, longDesc: e.target.value }))}
            className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2.5 text-zinc-100 text-sm resize-none outline-none focus:border-cyanCustom/40"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5 font-bold">Tech Stack Nodes</label>
            <input 
              type="text" 
              required 
              placeholder="Comma separated: React Native, Flutter, Swift"
              value={editItem.techStack || ''}
              onChange={(e) => setEditItem(prev => ({ ...prev, techStack: e.target.value }))}
              className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2.5 text-zinc-100 text-sm outline-none focus:border-cyanCustom/40"
            />
          </div>
          <div>
            <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5 font-bold">Target Success Metric</label>
            <input 
              type="text" 
              required 
              placeholder="e.g. Sub-12ms response latency"
              value={editItem.metrics || ''}
              onChange={(e) => setEditItem(prev => ({ ...prev, metrics: e.target.value }))}
              className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2.5 text-zinc-100 text-sm outline-none focus:border-cyanCustom/40 font-mono"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5 font-bold">Meta Title Override</label>
            <input 
              type="text" 
              placeholder="Custom Google SEO page title tag..."
              value={editItem.metaTitle || ''}
              onChange={(e) => setEditItem(prev => ({ ...prev, metaTitle: e.target.value }))}
              className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2.5 text-zinc-100 text-sm outline-none focus:border-cyanCustom/40"
            />
          </div>
          <div>
            <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5 font-bold">Meta Description Override</label>
            <input 
              type="text" 
              placeholder="Custom Google SEO page description tag..."
              value={editItem.metaDesc || ''}
              onChange={(e) => setEditItem(prev => ({ ...prev, metaDesc: e.target.value }))}
              className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2.5 text-zinc-100 text-sm outline-none focus:border-cyanCustom/40"
            />
          </div>
        </div>

        <Button type="submit" variant="primary" className="py-3 mt-4 self-start px-8 gap-2">
          <Save size={16} /> Synchronize Capability Node
        </Button>
      </form>
    </div>
  );

  const renderPortfolioForm = () => (
    <div className="fade-in-up flex flex-col gap-6">
      <div className="flex justify-between items-center border-b border-white/5 pb-4">
        <div>
          <h2 className="text-xl font-bold font-headline text-zinc-200">
            {editItem.id ? 'Edit Case Study Project' : 'Create New Case Study Project'}
          </h2>
          <p className="text-xs text-zinc-500 mt-1">Configure project titles, categories, case descriptions, and technical stack tags.</p>
        </div>
        <Button onClick={() => { setIsEditing(false); setEditItem(null); }} variant="secondary" className="px-4 py-2 text-xs">
          Cancel & Back
        </Button>
      </div>

      <form onSubmit={handleSaveItem} className="flex flex-col gap-6 bg-zinc-900/20 border border-white/5 p-8 rounded-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5 font-bold">Project Slug ID</label>
            <input 
              type="text" 
              required 
              placeholder="e.g. finova-payment-gateway"
              value={editItem.id || ''}
              onChange={(e) => setEditItem(prev => ({ ...prev, id: e.target.value }))}
              className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2.5 text-zinc-100 text-sm outline-none focus:border-cyanCustom/40 font-mono"
            />
          </div>
          <div>
            <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5 font-bold font-headline">Project Title Name</label>
            <input 
              type="text" 
              required 
              placeholder="e.g. Finova Pay Gateway"
              value={editItem.title || ''}
              onChange={(e) => setEditItem(prev => ({ ...prev, title: e.target.value }))}
              className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2.5 text-zinc-100 text-sm outline-none focus:border-cyanCustom/40"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5 font-bold">Category Sector</label>
            <input 
              type="text" 
              required 
              placeholder="e.g. Fintech, E-Commerce, Custom Systems"
              value={editItem.category || ''}
              onChange={(e) => setEditItem(prev => ({ ...prev, category: e.target.value }))}
              className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2.5 text-zinc-100 text-sm outline-none focus:border-cyanCustom/40"
            />
          </div>
          <div>
            <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5 font-bold">Technical Stack Tags</label>
            <input 
              type="text" 
              required 
              placeholder="Comma separated: React, Node.js, PostgreSQL"
              value={editItem.tags || ''}
              onChange={(e) => setEditItem(prev => ({ ...prev, tags: e.target.value }))}
              className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2.5 text-zinc-100 text-sm outline-none focus:border-cyanCustom/40 font-mono"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5 font-bold">Detailed Project Summary Description</label>
          <textarea 
            required 
            rows={5}
            placeholder="Describe the solution architecture and results..."
            value={editItem.desc || ''}
            onChange={(e) => setEditItem(prev => ({ ...prev, desc: e.target.value }))}
            className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2.5 text-zinc-100 text-sm outline-none focus:border-cyanCustom/40 resize-none"
          />
        </div>

        <Button type="submit" variant="primary" className="py-3 mt-2 w-full gap-2 justify-center">
          <Save size={16} /> Synchronize Case Study Node
        </Button>
      </form>
    </div>
  );

  const renderBlogForm = () => (
    <div className="fade-in-up flex flex-col gap-6">
      <div className="flex justify-between items-center border-b border-white/5 pb-4">
        <div>
          <h2 className="text-xl font-bold font-headline text-zinc-200">
            {editItem._id ? 'Edit Blog Document' : 'Publish New Blog Document'}
          </h2>
          <p className="text-xs text-zinc-500 mt-1">Compose detailed engineering and marketing knowledge base logs.</p>
        </div>
        <Button onClick={() => { setIsEditing(false); setEditItem(null); }} variant="secondary" className="px-4 py-2 text-xs">
          Cancel & Back
        </Button>
      </div>

      <form onSubmit={handleSaveItem} className="flex flex-col gap-6 bg-zinc-900/20 border border-white/5 p-8 rounded-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5 font-bold font-headline">Document Title</label>
            <input 
              type="text" 
              required 
              placeholder="Title name of the article..."
              value={editItem.title || ''}
              onChange={(e) => {
                const newTitle = e.target.value;
                setEditItem(prev => {
                  const updated = { ...prev, title: newTitle };
                  if (!blogTouched.slug && !prev._id) {
                    const newSlug = slugify(newTitle);
                    updated.id = newSlug;
                    updated.canonical = `https://kvantumtechsolutions.com/blog/${newSlug}`;
                  }
                  if (!blogTouched.metaTitle) updated.metaTitle = newTitle;
                  if (!blogTouched.ogTitle) updated.ogTitle = newTitle;
                  if (!blogTouched.twitterTitle) updated.twitterTitle = newTitle;
                  return updated;
                });
              }}
              className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2.5 text-zinc-100 text-sm outline-none focus:border-cyanCustom/40 font-bold"
            />
          </div>
          <div>
            <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5 font-bold">URL Target Slug</label>
            <input 
              type="text" 
              required 
              placeholder="e.g. nextjs-seo-guide"
              value={editItem.id || ''}
              onChange={(e) => {
                const newSlug = slugify(e.target.value);
                setBlogTouched(prev => ({ ...prev, slug: true }));
                setEditItem(prev => ({ 
                  ...prev, 
                  id: newSlug,
                  canonical: `https://kvantumtechsolutions.com/blog/${newSlug}`
                }));
              }}
              className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2.5 text-zinc-100 text-sm outline-none focus:border-cyanCustom/40 font-mono"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5 font-bold">Category Group</label>
            <input 
              type="text" 
              required 
              placeholder="e.g. AI & Chatbots, Web Dev"
              value={editItem.category || ''}
              onChange={(e) => setEditItem(prev => ({ ...prev, category: e.target.value }))}
              className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2.5 text-zinc-100 text-sm outline-none focus:border-cyanCustom/40"
            />
          </div>
          <div>
            <label className="block text-[11px] font-mono text-cyanCustom uppercase tracking-widest mb-1.5 font-bold flex items-center justify-between">
              <span>⏱️ Relative Time / Read Time</span>
              <span className="text-zinc-300 font-mono text-[10px] bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20 font-bold">
                Preview: {editItem.readTime || 'Just now'}
              </span>
            </label>
            <div className="flex gap-2">
              <input 
                type="number"
                min="0"
                placeholder="Val (e.g. 3)"
                value={editItem.readTime && editItem.readTime.match(/^(\d+)/) ? editItem.readTime.match(/^(\d+)/)[1] : ''}
                onChange={(e) => {
                  const val = e.target.value;
                  const currentStr = editItem.readTime || '';
                  const unitMatch = currentStr.match(/([a-z]+)/i);
                  let unit = unitMatch ? unitMatch[1] : 'd';
                  if (unit === 'now' || unit === 'Just') unit = 'd';
                  const formatted = val ? `${val}${unit} ago` : 'Just now';
                  setEditItem(prev => ({ ...prev, readTime: formatted }));
                }}
                className="w-1/3 bg-zinc-950/40 border border-white/8 rounded-xl px-3 py-2.5 text-zinc-100 text-sm outline-none focus:border-cyanCustom/40 font-mono"
              />
              <select
                value={
                  !editItem.readTime || editItem.readTime.toLowerCase().includes('just') ? 'now' :
                  editItem.readTime.includes('m') && !editItem.readTime.includes('mo') ? 'm' :
                  editItem.readTime.includes('h') ? 'h' :
                  editItem.readTime.includes('w') ? 'w' :
                  editItem.readTime.includes('mo') ? 'mo' :
                  editItem.readTime.includes('y') ? 'y' : 'd'
                }
                onChange={(e) => {
                  const unit = e.target.value;
                  const currentNum = editItem.readTime && editItem.readTime.match(/^(\d+)/) ? editItem.readTime.match(/^(\d+)/)[1] : '1';
                  let formatted = 'Just now';
                  if (unit !== 'now') {
                    formatted = `${currentNum}${unit} ago`;
                  }
                  setEditItem(prev => ({ ...prev, readTime: formatted }));
                }}
                className="w-2/3 bg-zinc-950/40 border border-white/8 rounded-xl px-3 py-2.5 text-zinc-100 text-sm outline-none focus:border-cyanCustom/40 font-mono text-zinc-200"
              >
                <option value="now">⚡ Just Now (Start from 0)</option>
                <option value="m">⏱️ Minutes (m ago)</option>
                <option value="h">⏳ Hours (h ago)</option>
                <option value="d">📅 Days (d ago)</option>
                <option value="w">🗓️ Weeks (w ago)</option>
                <option value="mo">🗓️ Months (mo ago)</option>
                <option value="y">🏛️ Years (y ago)</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5 font-bold">Publish Date String</label>
            <input 
              type="text" 
              required 
              placeholder="e.g. July 19, 2026"
              value={editItem.date || ''}
              onChange={(e) => setEditItem(prev => ({ ...prev, date: e.target.value }))}
              className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2.5 text-zinc-100 text-sm outline-none focus:border-cyanCustom/40 font-mono"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5 font-bold font-mono font-headline">Short Document Summary</label>
          <input 
            type="text" 
            required 
            placeholder="Brief tagline shown on blog listing cards..."
            value={editItem.summary || ''}
            onChange={(e) => {
              const newSummary = e.target.value;
              setEditItem(prev => {
                const updated = { ...prev, summary: newSummary };
                if (!blogTouched.metaDesc) updated.metaDesc = newSummary;
                if (!blogTouched.ogDesc) updated.ogDesc = newSummary;
                if (!blogTouched.twitterDesc) updated.twitterDesc = newSummary;
                return updated;
              });
            }}
            className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2.5 text-zinc-100 text-sm outline-none focus:border-cyanCustom/40"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5 font-bold">Author Name</label>
            <input 
              type="text"
              placeholder="e.g. Sahil Kumar (Head of Tech)"
              value={editItem.author || ''}
              onChange={(e) => setEditItem(prev => ({ ...prev, author: e.target.value }))}
              className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2.5 text-zinc-100 text-sm outline-none focus:border-cyanCustom/40"
            />
          </div>
          <div>
            <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5 font-bold">Cover Image URL</label>
            <input 
              type="url"
              placeholder="https://images.unsplash.com/... or CDN URL"
              value={editItem.image || ''}
              onChange={(e) => {
                const newImg = e.target.value;
                setEditItem(prev => {
                  const updated = { ...prev, image: newImg };
                  if (!blogTouched.ogImage) updated.ogImage = newImg;
                  return updated;
                });
              }}
              className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2.5 text-zinc-100 text-sm outline-none focus:border-cyanCustom/40 font-mono"
            />
          </div>
        </div>

        {/* Image Alt & Title Tags for SEO */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5 font-bold">Image Alt Tag (SEO Keywords)</label>
            <input 
              type="text"
              placeholder="e.g. IT solutions company delhi ncr custom software"
              value={editItem.imageAlt || ''}
              onChange={(e) => setEditItem(prev => ({ ...prev, imageAlt: e.target.value }))}
              className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2.5 text-zinc-100 text-sm outline-none focus:border-cyanCustom/40 font-mono"
            />
          </div>
          <div>
            <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5 font-bold">Image Title Tag</label>
            <input 
              type="text"
              placeholder="e.g. Kvantum Tech Solutions IT Architecture"
              value={editItem.imageTitle || ''}
              onChange={(e) => setEditItem(prev => ({ ...prev, imageTitle: e.target.value }))}
              className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2.5 text-zinc-100 text-sm outline-none focus:border-cyanCustom/40 font-mono"
            />
          </div>
        </div>

        {editItem.image && (
          <div className="rounded-xl overflow-hidden h-32 border border-white/10">
            <img 
              src={editItem.image} 
              alt={editItem.imageAlt || editItem.title || "Blog Cover Preview"} 
              title={editItem.imageTitle || editItem.title || "Blog Cover Preview"} 
              className="w-full h-full object-cover" 
            />
          </div>
        )}

        {/* HTML Rich Content Editor */}
        <div>
          <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5 font-bold">Content Body (Rich Editor)</label>
          <RichTextEditor
            value={editItem.content || ''}
            onChange={(html) => setEditItem(prev => ({ ...prev, content: html }))}
            placeholder="Write your detailed blog content here... Use H2/H3 for subheadings, Bold for emphasis, and lists for structured content."
          />
        </div>

        {/* Custom Blog FAQs Editor */}
        <div className="border border-white/8 rounded-2xl p-6 bg-zinc-950/30 flex flex-col gap-4">
          <div className="flex justify-between items-center border-b border-white/8 pb-3">
            <h3 className="text-xs font-mono text-cyanCustom uppercase tracking-widest font-bold flex items-center gap-2">
              ❓ Custom Blog FAQs (Shown at Bottom of Article)
            </h3>
            <button
              type="button"
              onClick={() => {
                const currentFaqs = Array.isArray(editItem.faqs) ? editItem.faqs : [];
                setEditItem(prev => ({
                  ...prev,
                  faqs: [...currentFaqs, { question: '', answer: '' }]
                }));
              }}
              className="px-3 py-1.5 rounded-lg bg-cyanCustom/10 border border-cyanCustom/30 text-cyanCustom text-xs font-mono font-bold hover:bg-cyanCustom/20 transition-colors cursor-pointer"
            >
              + Add FAQ Question
            </button>
          </div>

          {(!editItem.faqs || editItem.faqs.length === 0) ? (
            <p className="text-xs text-zinc-500 font-mono italic">No custom FAQs added for this blog yet. Click "+ Add FAQ Question" to add FAQs for this article.</p>
          ) : (
            <div className="space-y-4">
              {editItem.faqs.map((faq, fIdx) => (
                <div key={fIdx} className="p-4 rounded-xl bg-zinc-900/60 border border-white/8 space-y-3 relative text-left">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase">FAQ #{fIdx + 1}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = editItem.faqs.filter((_, idx) => idx !== fIdx);
                        setEditItem(prev => ({ ...prev, faqs: updated }));
                      }}
                      className="text-red-400 text-xs font-mono hover:underline cursor-pointer"
                    >
                      Remove FAQ
                    </button>
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-zinc-500 uppercase mb-1">Question (Bold Title)</label>
                    <input
                      type="text"
                      placeholder="e.g. What technology stack is recommended for high-traffic software?"
                      value={faq.question || ''}
                      onChange={(e) => {
                        const val = e.target.value;
                        setEditItem(prev => {
                          const faqsCopy = [...(prev.faqs || [])];
                          faqsCopy[fIdx] = { ...faqsCopy[fIdx], question: val };
                          return { ...prev, faqs: faqsCopy };
                        });
                      }}
                      className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-3.5 py-2 text-zinc-100 text-xs outline-none focus:border-cyanCustom/40 font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-zinc-500 uppercase mb-1">Answer (Paragraph Text)</label>
                    <textarea
                      rows={2}
                      placeholder="Detailed paragraph answer for readers..."
                      value={faq.answer || ''}
                      onChange={(e) => {
                        const val = e.target.value;
                        setEditItem(prev => {
                          const faqsCopy = [...(prev.faqs || [])];
                          faqsCopy[fIdx] = { ...faqsCopy[fIdx], answer: val };
                          return { ...prev, faqs: faqsCopy };
                        });
                      }}
                      className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-3.5 py-2 text-zinc-100 text-xs outline-none focus:border-cyanCustom/40 resize-none font-sans"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SEO & Meta Tags Panel */}
        <div className="border border-white/8 rounded-2xl p-6 bg-zinc-950/30 flex flex-col gap-5">
          <h3 className="text-xs font-mono text-cyanCustom uppercase tracking-widest font-bold border-b border-white/8 pb-3">🔍 SEO & Meta Tags — Real-Time Auto-Fills (Independent Customization Supported)</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1 font-bold">Meta Title <span className="text-zinc-600">(Separate from Document Title)</span></label>
              <input
                type="text"
                placeholder="Google SERP title override..."
                value={editItem.metaTitle || ''}
                onChange={(e) => {
                  setBlogTouched(prev => ({ ...prev, metaTitle: true }));
                  setEditItem(prev => ({ ...prev, metaTitle: e.target.value }));
                }}
                className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2.5 text-zinc-100 text-sm outline-none focus:border-cyanCustom/40"
              />
              <span className="text-[10px] text-zinc-600 font-mono mt-1 block">{(editItem.metaTitle || '').length}/60 chars</span>
            </div>
            <div>
              <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1 font-bold">Meta Description <span className="text-zinc-600">(Separate from Summary)</span></label>
              <input
                type="text"
                placeholder="Google SERP description override..."
                value={editItem.metaDesc || ''}
                onChange={(e) => {
                  setBlogTouched(prev => ({ ...prev, metaDesc: true }));
                  setEditItem(prev => ({ ...prev, metaDesc: e.target.value }));
                }}
                className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2.5 text-zinc-100 text-sm outline-none focus:border-cyanCustom/40"
              />
              <span className="text-[10px] text-zinc-600 font-mono mt-1 block">{(editItem.metaDesc || '').length}/160 chars</span>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1 font-bold">Focus Keywords <span className="text-zinc-600">(comma separated)</span></label>
            <input
              type="text"
              placeholder="e.g. IT solutions Delhi, custom software development, CRM software"
              value={editItem.keywords || ''}
              onChange={(e) => setEditItem(prev => ({ ...prev, keywords: e.target.value }))}
              className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2.5 text-zinc-100 text-sm outline-none focus:border-cyanCustom/40 font-mono"
            />
          </div>

          <div>
            <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1 font-bold">Canonical URL</label>
            <input
              type="url"
              placeholder={`https://kvantumtechsolutions.com/blog/${editItem.id || 'your-slug'}`}
              value={editItem.canonical || ''}
              onChange={(e) => setEditItem(prev => ({ ...prev, canonical: e.target.value }))}
              className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2.5 text-zinc-100 text-sm outline-none focus:border-cyanCustom/40 font-mono"
            />
          </div>

          <h4 className="text-[10px] font-mono text-pinkCustom uppercase tracking-widest font-bold border-b border-white/8 pb-2">Open Graph Tags (Facebook / LinkedIn / WhatsApp)</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1 font-bold">OG Title</label>
              <input
                type="text"
                placeholder="Open Graph title..."
                value={editItem.ogTitle || ''}
                onChange={(e) => {
                  setBlogTouched(prev => ({ ...prev, ogTitle: true }));
                  setEditItem(prev => ({ ...prev, ogTitle: e.target.value }));
                }}
                className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2.5 text-zinc-100 text-sm outline-none focus:border-cyanCustom/40"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1 font-bold">OG Description</label>
              <input
                type="text"
                placeholder="Open Graph description..."
                value={editItem.ogDesc || ''}
                onChange={(e) => {
                  setBlogTouched(prev => ({ ...prev, ogDesc: true }));
                  setEditItem(prev => ({ ...prev, ogDesc: e.target.value }));
                }}
                className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2.5 text-zinc-100 text-sm outline-none focus:border-cyanCustom/40"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1 font-bold">OG Image URL</label>
              <input
                type="url"
                placeholder="https://... Open Graph share image"
                value={editItem.ogImage || ''}
                onChange={(e) => {
                  setBlogTouched(prev => ({ ...prev, ogImage: true }));
                  setEditItem(prev => ({ ...prev, ogImage: e.target.value }));
                }}
                className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2.5 text-zinc-100 text-sm outline-none focus:border-cyanCustom/40 font-mono"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1 font-bold">OG Type</label>
              <select
                value={editItem.ogType || 'article'}
                onChange={(e) => setEditItem(prev => ({ ...prev, ogType: e.target.value }))}
                className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2.5 text-zinc-100 text-sm outline-none focus:border-cyanCustom/40 font-mono"
              >
                <option value="article">article</option>
                <option value="website">website</option>
              </select>
            </div>
          </div>

          <h4 className="text-[10px] font-mono text-sky-400 uppercase tracking-widest font-bold border-b border-white/8 pb-2">Twitter Card Tags</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1 font-bold">Twitter Title</label>
              <input
                type="text"
                placeholder="Twitter card title..."
                value={editItem.twitterTitle || ''}
                onChange={(e) => {
                  setBlogTouched(prev => ({ ...prev, twitterTitle: true }));
                  setEditItem(prev => ({ ...prev, twitterTitle: e.target.value }));
                }}
                className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2.5 text-zinc-100 text-sm outline-none focus:border-cyanCustom/40"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1 font-bold">Twitter Description</label>
              <input
                type="text"
                placeholder="Twitter card description..."
                value={editItem.twitterDesc || ''}
                onChange={(e) => {
                  setBlogTouched(prev => ({ ...prev, twitterDesc: true }));
                  setEditItem(prev => ({ ...prev, twitterDesc: e.target.value }));
                }}
                className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2.5 text-zinc-100 text-sm outline-none focus:border-cyanCustom/40"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1 font-bold">Twitter Card Type</label>
              <select
                value={editItem.twitterCard || 'summary_large_image'}
                onChange={(e) => setEditItem(prev => ({ ...prev, twitterCard: e.target.value }))}
                className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2.5 text-zinc-100 text-sm outline-none focus:border-cyanCustom/40 font-mono"
              >
                <option value="summary_large_image">summary_large_image</option>
                <option value="summary">summary</option>
              </select>
            </div>
          </div>

          <h4 className="text-[10px] font-mono text-purpleCustom uppercase tracking-widest font-bold border-b border-white/8 pb-2">Structured Data Schema & Custom Head SEO Tags</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1 font-bold">Custom JSON-LD Schema Code (Article / FAQ Schema)</label>
              <textarea
                rows={5}
                placeholder={`{\n  "@context": "https://schema.org",\n  "@type": "BlogPosting",\n  "headline": "..." \n}`}
                value={editItem.schemaMarkup || ''}
                onChange={(e) => setEditItem(prev => ({ ...prev, schemaMarkup: e.target.value }))}
                className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2.5 text-zinc-100 text-xs outline-none focus:border-cyanCustom/40 font-mono resize-none"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1 font-bold">Other Custom Head SEO Meta / Script Tags</label>
              <textarea
                rows={5}
                placeholder={`<!-- Custom head tags, pixel trackers, extra meta tags -->\n<meta name="custom-tag" content="..." />`}
                value={editItem.otherSeoTags || ''}
                onChange={(e) => setEditItem(prev => ({ ...prev, otherSeoTags: e.target.value }))}
                className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2.5 text-zinc-100 text-xs outline-none focus:border-cyanCustom/40 font-mono resize-none"
              />
            </div>
          </div>
        </div>

        <Button type="submit" variant="primary" className="py-3 mt-4 self-start px-8 gap-2">
          <Save size={16} /> Synchronize Document Node
        </Button>
      </form>
    </div>
  );

  const renderSeoPageForm = () => (
    <div className="fade-in-up flex flex-col gap-6">
      <div className="flex justify-between items-center border-b border-white/5 pb-4">
        <div>
          <h2 className="text-xl font-bold font-headline text-zinc-200">
            {editItem._id ? 'Edit SEO Page Node' : 'Create SEO Page Node'}
          </h2>
          <p className="text-xs text-zinc-500 mt-1">Configure programmatic keywords indexing templates.</p>
        </div>
        <Button onClick={() => { setIsEditing(false); setEditItem(null); }} variant="secondary" className="px-4 py-2 text-xs">
          Cancel & Back
        </Button>
      </div>

      <form onSubmit={handleSaveItem} className="flex flex-col gap-6 bg-zinc-900/20 border border-white/5 p-8 rounded-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5 font-bold">URL Target Slug</label>
            <input 
              type="text" 
              required 
              disabled={!!editItem._id}
              placeholder="e.g. software-development-agency-delhi"
              value={editItem.slug || ''}
              onChange={(e) => setEditItem(prev => ({ ...prev, slug: slugify(e.target.value) }))}
              className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2.5 text-zinc-100 text-sm disabled:opacity-50 outline-none focus:border-cyanCustom/40 font-mono"
            />
          </div>
          <div>
            <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5 font-bold font-headline font-mono">Google SERP Meta Title</label>
            <input 
              type="text" 
              required 
              placeholder="SEO meta title for Google results..."
              value={editItem.metaTitle || ''}
              onChange={(e) => setEditItem(prev => ({ ...prev, metaTitle: e.target.value }))}
              className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2.5 text-zinc-100 text-sm outline-none focus:border-cyanCustom/40"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5 font-bold">Google SERP Meta Description</label>
            <input 
              type="text" 
              required 
              placeholder="SEO meta description snippet..."
              value={editItem.metaDesc || ''}
              onChange={(e) => setEditItem(prev => ({ ...prev, metaDesc: e.target.value }))}
              className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2.5 text-zinc-100 text-sm outline-none focus:border-cyanCustom/40"
            />
          </div>
          <div>
            <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5 font-bold">Meta Keywords</label>
            <input 
              type="text" 
              placeholder="Comma separated: seo, best web developer, Noida"
              value={editItem.metaKeywords || ''}
              onChange={(e) => setEditItem(prev => ({ ...prev, metaKeywords: e.target.value }))}
              className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2.5 text-zinc-100 text-sm outline-none focus:border-cyanCustom/40"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5 font-bold">Page Header Title (H1)</label>
          <input 
            type="text" 
            required 
            placeholder="Header title displayed at top of the page..."
            value={editItem.title || ''}
            onChange={(e) => setEditItem(prev => ({ ...prev, title: e.target.value }))}
            className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2.5 text-zinc-100 text-sm outline-none focus:border-cyanCustom/40"
          />
        </div>

        <div>
          <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5 font-bold font-mono font-headline">Page HTML Content Body</label>
          <textarea 
            required 
            rows={8}
            placeholder="<h2>Custom Web solutions</h2><p>Provide full paragraphs...</p>"
            value={editItem.content || ''}
            onChange={(e) => setEditItem(prev => ({ ...prev, content: e.target.value }))}
            className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-3 text-zinc-100 text-sm resize-none font-mono outline-none focus:border-cyanCustom/40"
          />
        </div>

        <Button type="submit" variant="primary" className="py-3 mt-4 self-start px-8 gap-2">
          <Save size={16} /> Synchronize Page Node
        </Button>
      </form>
    </div>
  );

  const renderCRMForm = () => (
    <div className="fade-in-up flex flex-col gap-6">
      <div className="flex justify-between items-center border-b border-white/5 pb-4">
        <div>
          <h2 className="text-xl font-bold font-headline text-zinc-200">
            Trace Lead Signal Parameters
          </h2>
          <p className="text-xs text-zinc-500 mt-1">Review contact message details and update sync status logs.</p>
        </div>
        <Button onClick={() => { setIsEditingCRM(false); setCrmItem(null); }} variant="secondary" className="px-4 py-2 text-xs">
          Cancel & Back
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left message cards details */}
        <div className="lg:col-span-2 flex flex-col gap-6 bg-zinc-900/20 border border-white/5 p-8 rounded-2xl">
          <div className="grid grid-cols-2 gap-6 border-b border-white/5 pb-6">
            <div>
              <span className="text-[10px] font-mono text-zinc-500 uppercase block mb-1">Client Name</span>
              <span className="text-zinc-200 text-sm font-semibold">{crmItem.name}</span>
            </div>
            <div>
              <span className="text-[10px] font-mono text-zinc-500 uppercase block mb-1">Email ID Address</span>
              <span className="text-zinc-200 text-sm font-mono">{crmItem.email}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 border-b border-white/5 pb-6">
            <div>
              <span className="text-[10px] font-mono text-zinc-500 uppercase block mb-1">Phone Contact</span>
              <span className="text-zinc-200 text-sm font-mono">{crmItem.phone || 'Not provided'}</span>
            </div>
            <div>
              <span className="text-[10px] font-mono text-zinc-500 uppercase block mb-1">Target Service Code</span>
              <span className="text-zinc-200 text-sm font-mono uppercase bg-zinc-800 px-2 py-0.5 rounded border border-white/5 inline-block">{crmItem.service}</span>
            </div>
          </div>

          <div>
            <span className="text-[10px] font-mono text-zinc-500 uppercase block mb-2 font-headline">Visitor Message Content</span>
            <div className="bg-zinc-950/40 p-4 rounded-xl border border-white/8 text-zinc-300 font-sans leading-relaxed text-sm whitespace-pre-wrap min-h-[120px]">
              {crmItem.message}
            </div>
          </div>
        </div>

        {/* Right status form controls */}
        <form onSubmit={handleCRMUpdate} className="flex flex-col gap-6 bg-[#0E1526] border border-white/5 p-8 rounded-2xl h-fit">
          <h3 className="text-md font-bold font-headline text-zinc-200 border-b border-white/5 pb-3">Update CRM Matrix</h3>

          <div>
            <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-2 font-bold font-mono">Lead Status Status</label>
            <select
              value={crmItem.status}
              onChange={(e) => setCrmItem(prev => ({ ...prev, status: e.target.value }))}
              className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2.5 text-zinc-100 text-sm outline-none focus:border-cyanCustom/40"
            >
              <option value="New">New (Pending Action)</option>
              <option value="Contacted">Contacted (In Review)</option>
              <option value="In-Progress">In-Progress (Meeting Fixed)</option>
              <option value="Not Interested">Not Interested (No Response)</option>
              <option value="Closed">Closed (Deal Won)</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-2 font-bold font-mono font-headline">Action Logs / Quality Notes</label>
            <textarea
              rows={4}
              placeholder="Log interaction details or notes..."
              value={crmItem.notes || ''}
              onChange={(e) => setCrmItem(prev => ({ ...prev, notes: e.target.value }))}
              className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2.5 text-zinc-100 text-sm resize-none outline-none focus:border-cyanCustom/40"
            />
          </div>

          <Button type="submit" variant="primary" className="py-3 w-full gap-2">
            <Save size={16} /> Save CRM Adjustments
          </Button>
        </form>
      </div>
    </div>
  );

  // Open editor panels
  const openEditor = (type, item = null) => {
    setEditType(type);
    setIsEditing(true);
    if (item) {
      setEditItem({ ...item });
      setOriginalId(item.id || item._id || item.slug || null);
      if (type === 'blog') {
        setBlogTouched({
          slug: true,
          metaTitle: true,
          metaDesc: true,
          ogTitle: true,
          ogDesc: true,
          ogImage: true,
          twitterTitle: true,
          twitterDesc: true,
        });
      }
    } else {
      setOriginalId(null);
      if (type === 'service') {
        setEditItem({ id: '', iconName: 'Code', title: '', shortDesc: '', longDesc: '', color: 'var(--accent-cyan)', techStack: '', metrics: '', metaTitle: '', metaDesc: '' });
      } else if (type === 'blog') {
        setBlogTouched({
          slug: false,
          metaTitle: false,
          metaDesc: false,
          ogTitle: false,
          ogDesc: false,
          ogImage: false,
          twitterTitle: false,
          twitterDesc: false,
        });
        setEditItem({
          id: '',
          category: 'AI & Chatbots',
          title: '',
          summary: '',
          content: '',
          readTime: '5 min read',
          date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
          author: 'Kvantum Tech Team',
          image: '',
          imageAlt: '',
          imageTitle: '',
          keywords: '',
          canonical: '',
          metaTitle: '',
          metaDesc: '',
          ogTitle: '',
          ogDesc: '',
          ogImage: '',
          ogType: 'article',
          twitterTitle: '',
          twitterDesc: '',
          twitterCard: 'summary_large_image',
          faqs: []
        });
      } else if (type === 'seo') {
        setEditItem({ slug: '', title: '', content: '', metaTitle: '', metaDesc: '', metaKeywords: '' });
      } else if (type === 'portfolio') {
        setEditItem({ id: '', title: '', category: '', desc: '', tags: '' });
      }
    }
  };

  // Save changes
  const handleSaveItem = async (e) => {
    e.preventDefault();
    try {
      if (editType === 'service') {
        if (originalId) {
          // Update
          await serviceService.updateService(originalId, editItem);
          setServices(prev => prev.map(s => s.id === originalId ? { ...editItem } : s));
        } else {
          // Create
          const created = await serviceService.createService(editItem);
          setServices(prev => [...prev, created]);
        }
      } else if (editType === 'blog') {
        const payloadId = editItem.id || slugify(editItem.title);
        const completeItem = {
          ...editItem,
          id: payloadId,
          _id: payloadId,
          metaTitle: editItem.metaTitle || editItem.title,
          metaDesc: editItem.metaDesc || editItem.summary,
          ogTitle: editItem.ogTitle || editItem.metaTitle || editItem.title,
          ogDesc: editItem.ogDesc || editItem.metaDesc || editItem.summary,
          ogImage: editItem.ogImage || editItem.image,
          twitterTitle: editItem.twitterTitle || editItem.ogTitle || editItem.metaTitle || editItem.title,
          twitterDesc: editItem.twitterDesc || editItem.ogDesc || editItem.metaDesc || editItem.summary,
          twitterCard: editItem.twitterCard || 'summary_large_image',
          canonical: editItem.canonical || `https://kvantumtechsolutions.com/blog/${payloadId}`
        };
        
        if (originalId) {
          await blogService.updateBlog(originalId, completeItem);
          setBlogs(prev => prev.map(b => (b.id === originalId || b._id === originalId || b.slug === originalId) ? completeItem : b));
        } else {
          const created = await blogService.createBlog(completeItem);
          setBlogs(prev => [created, ...prev]);
        }
      } else if (editType === 'seo') {
        if (originalId) {
          await seoService.updateSeoPage(originalId, editItem);
          setSeoPages(prev => prev.map(p => p.slug === originalId ? editItem : p));
        } else {
          const created = await seoService.createSeoPage(editItem);
          setSeoPages(prev => [...prev, created]);
        }
      } else if (editType === 'portfolio') {
        const payloadId = editItem.id || slugify(editItem.title);
        const completeItem = { ...editItem, id: payloadId };
        if (originalId) {
          await portfolioService.updatePortfolio(originalId, completeItem);
          setPortfolios(prev => prev.map(p => p.id === originalId ? completeItem : p));
        } else {
          const created = await portfolioService.createPortfolio(completeItem);
          setPortfolios(prev => [created, ...prev]);
        }
      }
      alert('[SUCCESS] Database record synchronized.');
      setIsEditing(false);
      setEditItem(null);
      setOriginalId(null);
    } catch (err) {
      alert('[ERROR] Synchronization failed: ' + (err.response?.data?.error || err.message));
    }
  };

  // Delete records
  const handleDeleteService = async (id) => {
    if (window.confirm('Delete this service capability node?')) {
      try {
        await serviceService.deleteService(id);
        setServices(prev => prev.filter(s => s.id !== id));
        alert('[SUCCESS] Service deleted.');
      } catch (err) {
        alert('[ERROR] Delete failed: ' + (err.response?.data?.error || err.message));
      }
    }
  };

  const handleDeleteBlog = async (rawId) => {
    if (!rawId) return;
    if (window.confirm('Delete this blog document node?')) {
      try {
        await blogService.deleteBlog(rawId);
        setBlogs(prev => prev.filter(b => b.id !== rawId && b._id !== rawId && b.slug !== rawId));
        alert('[SUCCESS] Blog deleted.');
      } catch (err) {
        alert('[ERROR] Delete failed: ' + (err.response?.data?.error || err.message));
      }
    }
  };

  const handleDeleteSeoPage = async (slug) => {
    if (window.confirm('Delete this programmatic landing page?')) {
      try {
        await seoService.deleteSeoPage(slug);
        setSeoPages(prev => prev.filter(p => p.slug !== slug));
        alert('[SUCCESS] SEO page deleted.');
      } catch (err) {
        alert('[ERROR] Delete failed: ' + (err.response?.data?.error || err.message));
      }
    }
  };

  const handleDeletePortfolio = async (id) => {
    if (window.confirm('Delete this portfolio case study?')) {
      try {
        await portfolioService.deletePortfolio(id);
        setPortfolios(prev => prev.filter(p => p.id !== id));
        alert('[SUCCESS] Portfolio item deleted.');
      } catch (err) {
        alert('[ERROR] Delete failed: ' + (err.response?.data?.error || err.message));
      }
    }
  };

  // Bulk SEO page paste submit
  const handleBulkSeoSubmit = async (e) => {
    e.preventDefault();
    setBulkUploading(true);
    try {
      const parsed = JSON.parse(bulkSeoInput);
      if (!Array.isArray(parsed)) {
        throw new Error('Payload must be a JSON array of page objects');
      }
      await seoService.bulkUploadSeoPages(parsed);
      alert(`[SUCCESS] Programmatic SEO templates parsed and loaded.`);
      
      // Reload pages list
      const updated = await seoService.getAllSeoPages();
      setSeoPages(updated);

      setBulkSeoInput('');
      setIsBulkSeoOpen(false);
    } catch (err) {
      alert('[ERROR] Bulk Parse Failed: ' + (err.message));
    } finally {
      setBulkUploading(false);
    }
  };

  // Save SEO site-wide setting
  const handleSaveSeoSetting = async (e) => {
    e.preventDefault();
    try {
      await seoService.updateSeoSetting(editingSeoSettingItem.key, editingSeoSettingItem);
      alert('[SUCCESS] SEO setting updated.');
      setIsEditingSeoSetting(false);
      setEditingSeoSettingItem(null);
      fetchSeoSettingsList();
    } catch (err) {
      alert('[ERROR] SEO Setting update failed: ' + (err.response?.data?.error || err.message));
    }
  };

  // User CRUD handlers (Super admin only)
  const handleCreateUserSubmit = async (e) => {
    e.preventDefault();
    setUserSuccessMessage('');
    setUserErrorMessage('');
    try {
      const user = await userService.createUser(newUserData);
      setUserSuccessMessage(`[SUCCESS] Registered ${user.name} as role: ${user.role}`);
      setNewUserData({ name: '', email: '', password: '', role: 'seo' });
      fetchUsersList();
    } catch (err) {
      setUserErrorMessage(err.response?.data?.error || 'Registration failed.');
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm('Permanently delete this staff member account?')) {
      try {
        await userService.deleteUser(id);
        alert('[SUCCESS] User deleted.');
        fetchUsersList();
      } catch (err) {
        alert('[ERROR] Delete failed: ' + (err.response?.data?.error || err.message));
      }
    }
  };

  // Clipboard copy helper
  const copyToClipboard = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // If user is not logged in, render the login panel with instant auto-login helper
  if (!currentUser) {
    return (
      <div className="min-h-screen w-full bg-[#050811] flex items-center justify-center p-6 text-left relative z-50">
        <Card className="w-full max-w-[440px] p-10 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] bg-[#090d1a]">
          <div className="flex flex-col gap-6">
            <div className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-cyanCustom/10 border border-cyanCustom/20 text-cyanCustom flex items-center justify-center mx-auto mb-4">
                <Lock size={28} />
              </div>
              <h2 className="text-zinc-100 text-xl font-bold font-headline">Admin Dashboard Login</h2>
              <p className="text-zinc-400 text-xs mt-1.5 font-sans leading-relaxed">
                Kvantum Tech Enterprise Control Panel
              </p>
            </div>

            <form onSubmit={handleLoginSubmit} className="flex flex-col gap-5">
              <div>
                <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-widest mb-2 font-bold">
                  Email Address
                </label>
                <input 
                  type="email" 
                  required
                  placeholder="e.g. admin@kvantumtechsolutions.com"
                  value={loginData.email}
                  onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full bg-zinc-950/80 border border-white/10 rounded-xl px-4 py-3 text-zinc-100 text-sm placeholder-zinc-500 outline-none focus:border-cyanCustom/60 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-widest mb-2 font-bold">
                  Access Key Passcode
                </label>
                <input 
                  type="password" 
                  required
                  placeholder="••••••••••••"
                  value={loginData.password}
                  onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full bg-zinc-950/80 border border-white/10 rounded-xl px-4 py-3 text-zinc-100 text-sm placeholder-zinc-500 outline-none focus:border-cyanCustom/60 transition-colors"
                />
              </div>

              {loginError && (
                <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 px-3.5 py-2.5 rounded-lg text-red-400 text-xs font-mono">
                  <AlertTriangle size={14} /> <strong>[ERROR]</strong> {loginError}
                </div>
              )}

              <Button 
                type="submit" 
                variant="primary" 
                className="w-full py-3.5"
                disabled={loggingIn}
              >
                {loggingIn ? 'Authenticating Credentials...' : 'Authorize Secure Connection'}
              </Button>

              <div className="border-t border-white/8 pt-4 text-center">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">
                  🔒 256-Bit Encrypted • 15-Min Auto-Lock Protected
                </span>
              </div>
            </form>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#050811] font-sans text-zinc-300 select-none text-left w-full">
      {/* Top Premium Navbar */}
      <header className="w-full h-16 bg-[#060b16] border-b border-white/5 flex items-center justify-between px-6 z-30 shrink-0">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50 rounded-lg transition-colors mr-1 cursor-pointer flex items-center justify-center"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
          <KvantumLogo theme="dark" className="h-8" />
          <span className="bg-zinc-800 text-[10px] text-cyan-400 font-mono px-2 py-0.5 rounded border border-white/10 uppercase font-bold">
            Console v2.0
          </span>
        </div>

        {/* Database Connection Status badge */}
        <div className="hidden md:flex items-center gap-2">
          <span className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full text-emerald-400 text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            🟢 Live Backend Engine Connected
          </span>
        </div>

        {/* Operator Profile and Logout */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-xs text-zinc-200 font-medium">{currentUser.name || 'Admin User'}</span>
            <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">{currentUser.role}</span>
          </div>
          <div className="w-[1px] h-6 bg-white/10 hidden sm:block" />
          <Button 
            onClick={handleLogout} 
            variant="secondary"
            className="gap-2 px-3 py-1.5 rounded-lg text-xs hover:border-red-500/30 hover:text-red-400 border border-white/8 bg-zinc-900/50"
          >
            <LogOut size={13} /> Log Out
          </Button>
        </div>
      </header>

      {/* Main Body */}
      <div className="flex flex-1 overflow-hidden h-[calc(100vh-64px)] w-full">
        {/* Mobile Backdrop Overlay */}
        {mobileMenuOpen && (
          <div 
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-all duration-300"
          />
        )}

        {/* Sidebar Navigation */}
        <aside className={`fixed md:relative inset-y-0 left-0 w-64 bg-[#060b16] border-r border-white/5 flex flex-col justify-between py-6 px-4 shrink-0 z-50 transition-transform duration-300 md:translate-x-0 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex flex-col gap-8">
            <div>
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest px-3 block mb-4">
                Command Terminal
              </span>
              <nav className="flex flex-col gap-1.5">
                {/* Leads CRM Telemetry tab */}
                {(currentUser.role === 'admin' || currentUser.role === 'sales') && (
                  <button
                    onClick={() => handleTabChange('leads')}
                    className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium tracking-wide transition-all duration-200 cursor-pointer ${
                      activeTab === 'leads' 
                        ? 'bg-pinkCustom/15 text-pinkCustom border-l-2 border-pinkCustom shadow-[0_0_10px_rgba(236,72,153,0.1)]' 
                        : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/30'
                    }`}
                  >
                    <Mail size={16} />
                    Leads CRM
                  </button>
                )}

                {/* Traffic Analytics tab */}
                <button
                  onClick={() => handleTabChange('analytics')}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium tracking-wide transition-all duration-200 cursor-pointer ${
                    activeTab === 'analytics' 
                      ? 'bg-cyanCustom/10 text-cyanCustom border-l-2 border-cyanCustom shadow-[0_0_10px_rgba(0,210,255,0.05)]' 
                      : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/30'
                  }`}
                >
                  <Activity size={16} />
                  Traffic Analytics
                </button>

                {/* Services CMS tab */}
                {(currentUser.role === 'admin' || currentUser.role === 'seo') && (
                  <button
                    onClick={() => handleTabChange('services')}
                    className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium tracking-wide transition-all duration-200 cursor-pointer ${
                      activeTab === 'services' 
                        ? 'bg-cyanCustom/10 text-cyanCustom border-l-2 border-cyanCustom shadow-[0_0_10px_rgba(0,210,255,0.05)]' 
                        : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/30'
                    }`}
                  >
                    <Layers size={16} />
                    Services CMS
                  </button>
                )}

                {/* Projects CMS tab */}
                {(currentUser.role === 'admin' || currentUser.role === 'seo') && (
                  <button
                    onClick={() => handleTabChange('portfolio')}
                    className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium tracking-wide transition-all duration-200 cursor-pointer ${
                      activeTab === 'portfolio' 
                        ? 'bg-cyanCustom/10 text-cyanCustom border-l-2 border-cyanCustom shadow-[0_0_10px_rgba(0,210,255,0.05)]' 
                        : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/30'
                    }`}
                  >
                    <Plus size={16} className="rotate-45" />
                    Projects CMS
                  </button>
                )}

                {/* Blogs CMS tab */}
                {(currentUser.role === 'admin' || currentUser.role === 'seo') && (
                  <button
                    onClick={() => handleTabChange('blogs')}
                    className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium tracking-wide transition-all duration-200 cursor-pointer ${
                      activeTab === 'blogs' 
                        ? 'bg-cyanCustom/10 text-cyanCustom border-l-2 border-cyanCustom shadow-[0_0_10px_rgba(0,210,255,0.05)]' 
                        : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/30'
                    }`}
                  >
                    <BookOpen size={16} />
                    Blogs CMS
                  </button>
                )}

                {/* Programmatic SEO tab */}
                {(currentUser.role === 'admin' || currentUser.role === 'seo') && (
                  <button
                    onClick={() => handleTabChange('seo')}
                    className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium tracking-wide transition-all duration-200 cursor-pointer ${
                      activeTab === 'seo' 
                        ? 'bg-cyanCustom/10 text-cyanCustom border-l-2 border-cyanCustom shadow-[0_0_10px_rgba(0,210,255,0.05)]' 
                        : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/30'
                    }`}
                  >
                    <Globe size={16} />
                    Programmatic SEO
                  </button>
                )}

                {/* Robots & Sitemap CMS tab */}
                {(currentUser.role === 'admin' || currentUser.role === 'seo') && (
                  <button
                    onClick={() => handleTabChange('robots_sitemap')}
                    className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium tracking-wide transition-all duration-200 cursor-pointer ${
                      activeTab === 'robots_sitemap' 
                        ? 'bg-purpleCustom/15 text-purpleCustom border-l-2 border-purpleCustom shadow-[0_0_10px_rgba(138,43,226,0.1)]' 
                        : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/30'
                    }`}
                  >
                    <FileText size={16} />
                    Robots & Sitemap CMS
                  </button>
                )}

                {/* Media Assets S3 tab */}
                {(currentUser.role === 'admin' || currentUser.role === 'seo') && (
                  <button
                    onClick={() => handleTabChange('assets')}
                    className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium tracking-wide transition-all duration-200 cursor-pointer ${
                      activeTab === 'assets' 
                        ? 'bg-cyanCustom/10 text-cyanCustom border-l-2 border-cyanCustom shadow-[0_0_10px_rgba(0,210,255,0.05)]' 
                        : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/30'
                    }`}
                  >
                    <Image size={16} />
                    Media Assets [S3]
                  </button>
                )}

                {/* Staff Accounts tab */}
                {currentUser.role === 'admin' && (
                  <button
                    onClick={() => handleTabChange('users')}
                    className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium tracking-wide transition-all duration-200 cursor-pointer ${
                      activeTab === 'users' 
                        ? 'bg-purpleCustom/15 text-purpleCustom border-l-2 border-purpleCustom shadow-[0_0_10px_rgba(138,43,226,0.1)]' 
                        : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/30'
                    }`}
                  >
                    <UserCheck size={16} />
                    Staff Accounts
                  </button>
                )}

                {/* Site Settings CMS tab */}
                {(currentUser.role === 'admin' || currentUser.role === 'seo') && (
                  <button
                    onClick={() => handleTabChange('settings')}
                    className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium tracking-wide transition-all duration-200 cursor-pointer ${
                      activeTab === 'settings' 
                        ? 'bg-cyanCustom/10 text-cyanCustom border-l-2 border-cyanCustom shadow-[0_0_10px_rgba(0,210,255,0.05)]' 
                        : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/30'
                    }`}
                  >
                    <Settings size={16} />
                    Site Settings CMS
                  </button>
                )}
              </nav>
            </div>
          </div>

          {/* Sidebar Footer info */}
          <div className="px-3 border-t border-white/5 pt-4">
            <span className="text-[10px] font-mono text-zinc-600 block uppercase">
              Engine System
            </span>
            <span className="text-[11px] text-zinc-400 font-sans block mt-1 font-medium truncate">
              {serverEngine}
            </span>
          </div>
        </aside>

        {/* Content Workspace Panel */}
        <main className="flex-1 overflow-y-auto bg-[#050811] p-8 min-h-full">

      {/* ================================== TAB: TRAFFIC ANALYTICS ================================== */}
      {activeTab === 'analytics' && (
        <div className="fade-in-up flex flex-col gap-8">
          <div className="flex justify-between items-center border-b border-white/5 pb-4">
            <div>
              <h2 className="text-xl font-bold font-headline text-zinc-200 flex items-center gap-2">
                <Activity size={20} className="text-cyanCustom" /> Real-Time CMS Analytics
              </h2>
              <p className="text-xs text-zinc-500 mt-1">Live CMS metrics, lead submissions, published content counts and Google Analytics integration.</p>
            </div>
            <a
              href="https://analytics.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono font-bold px-4 py-2 rounded-lg bg-cyanCustom/10 text-cyanCustom border border-cyanCustom/20 hover:bg-cyanCustom/20 transition-colors"
            >
              Open Google Analytics ↗
            </a>
          </div>

          {/* Real CMS Data Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 border flex flex-col justify-between gap-3 bg-gradient-to-br from-cyanCustom/10 to-transparent">
              <div className="flex justify-between items-center text-zinc-400 text-xs font-mono">
                <span>📬 Total Leads</span>
                <span className="text-emerald-400 font-bold">CRM Data</span>
              </div>
              <span className="text-3xl font-extrabold font-headline text-white">{leads.length || 0}</span>
              <p className="text-[11px] text-zinc-500 font-mono">Contact form submissions received</p>
            </Card>

            <Card className="p-6 border flex flex-col justify-between gap-3 bg-gradient-to-br from-pinkCustom/10 to-transparent">
              <div className="flex justify-between items-center text-zinc-400 text-xs font-mono">
                <span>📝 Published Blogs</span>
                <span className="text-emerald-400 font-bold">CMS Data</span>
              </div>
              <span className="text-3xl font-extrabold font-headline text-white">{blogs.length || 0}</span>
              <p className="text-[11px] text-zinc-500 font-mono">Active blog articles live on site</p>
            </Card>

            <Card className="p-6 border flex flex-col justify-between gap-3 bg-gradient-to-br from-purpleCustom/10 to-transparent">
              <div className="flex justify-between items-center text-zinc-400 text-xs font-mono">
                <span>💼 Portfolio Items</span>
                <span className="text-cyanCustom font-bold">CMS Data</span>
              </div>
              <span className="text-3xl font-extrabold font-headline text-white">{portfolios.length || 0}</span>
              <p className="text-[11px] text-zinc-500 font-mono">Active case studies & projects</p>
            </Card>

            <Card className="p-6 border flex flex-col justify-between gap-3 bg-gradient-to-br from-emerald-500/10 to-transparent">
              <div className="flex justify-between items-center text-zinc-400 text-xs font-mono">
                <span>⚙️ Active Services</span>
                <span className="text-emerald-400 font-bold">CMS Data</span>
              </div>
              <span className="text-3xl font-extrabold font-headline text-white">{services.length || 0}</span>
              <p className="text-[11px] text-zinc-500 font-mono">Service offerings published live</p>
            </Card>
          </div>

          {/* Google Analytics Embed */}
          <Card className="p-6 border flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-mono text-zinc-300 uppercase tracking-widest">🔗 Google Analytics 4 — Live Traffic Data</h3>
              <span className="text-[10px] font-mono text-zinc-500 bg-zinc-900 border border-white/8 px-2 py-1 rounded">GA4 Integration</span>
            </div>
            <div className="bg-zinc-950/60 border border-white/8 rounded-2xl p-6 flex flex-col items-center gap-4 text-center">
              <div className="text-4xl">📊</div>
              <p className="text-sm text-zinc-300 font-sans">
                For real-time page views, impressions, click-through rates, and geographic visitor breakdowns,
                connect your <strong className="text-white">Google Analytics 4</strong> property.
              </p>
              <p className="text-xs text-zinc-500 font-mono max-w-lg">
                GA4 Measurement ID: Add <code className="bg-zinc-800 px-2 py-0.5 rounded text-cyanCustom">VITE_GA_MEASUREMENT_ID=G-XXXXXXXX</code> to your Vercel environment variables and install <code className="bg-zinc-800 px-2 py-0.5 rounded text-cyanCustom">react-ga4</code> package.
              </p>
              <div className="flex gap-3">
                <a
                  href="https://analytics.google.com/analytics/web/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-cyanCustom text-black font-bold text-xs hover:opacity-90 transition-opacity"
                >
                  Open GA4 Dashboard ↗
                </a>
                <a
                  href="https://search.google.com/search-console"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl border border-white/10 text-zinc-300 font-bold text-xs hover:border-white/20 transition-colors"
                >
                  Google Search Console ↗
                </a>
              </div>
            </div>
          </Card>

          {/* New Leads Summary Table */}
          <Card className="p-6 border flex flex-col gap-4">
            <h3 className="text-sm font-mono text-zinc-300 uppercase tracking-widest border-b border-white/5 pb-3">📬 Recent Lead Submissions</h3>
            <div className="space-y-3 text-xs font-mono">
              {Array.isArray(leads) && leads.length > 0 ? (
                leads.slice(0, 5).map((lead, i) => (
                  <div key={i} className="flex justify-between items-center p-2.5 rounded-lg bg-white/[0.02]">
                    <span className="text-zinc-200 font-bold">{lead.name}</span>
                    <span className="text-zinc-400">{lead.email}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      lead.status === 'New' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                      'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    }`}>{lead.status}</span>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-zinc-600 font-mono">
                  No leads yet — or log in with valid credentials to load real CRM data.
                </div>
              )}
            </div>
          </Card>

          {/* Breakdown Tables Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Table 1: CMS Content Status */}
            <Card className="p-6 border flex flex-col gap-4">
              <h3 className="text-sm font-mono text-zinc-300 uppercase tracking-widest border-b border-white/5 pb-3">CMS Content Status</h3>
              <div className="space-y-3 text-xs font-mono">
                <div className="flex justify-between items-center p-2.5 rounded-lg bg-white/[0.02]">
                  <span className="text-zinc-200">📝 Blog Articles</span>
                  <span className="text-cyanCustom font-bold">{blogs.length} Published</span>
                </div>
                <div className="flex justify-between items-center p-2.5 rounded-lg bg-white/[0.02]">
                  <span className="text-zinc-200">💼 Portfolio Projects</span>
                  <span className="text-cyanCustom font-bold">{portfolios.length} Active</span>
                </div>
                <div className="flex justify-between items-center p-2.5 rounded-lg bg-white/[0.02]">
                  <span className="text-zinc-200">⚙️ Service Pages</span>
                  <span className="text-cyanCustom font-bold">{services.length} Live</span>
                </div>
                <div className="flex justify-between items-center p-2.5 rounded-lg bg-white/[0.02]">
                  <span className="text-zinc-200">📬 Lead Inquiries</span>
                  <span className="text-cyanCustom font-bold">{leads.length} Total</span>
                </div>
                <div className="flex justify-between items-center p-2.5 rounded-lg bg-white/[0.02]">
                  <span className="text-zinc-200">🔑 Programmatic SEO Pages</span>
                  <span className="text-cyanCustom font-bold">{seoPages.length} Indexed</span>
                </div>
              </div>
            </Card>

            {/* Table 2: Backend System Status */}
            <Card className="p-6 border flex flex-col gap-4">
              <h3 className="text-sm font-mono text-zinc-300 uppercase tracking-widest border-b border-white/5 pb-3">Backend System Health</h3>
              <div className="space-y-3 text-xs font-mono">
                <div className="flex justify-between items-center p-2.5 rounded-lg bg-white/[0.02]">
                  <span className="text-zinc-200">🔌 Database Connection</span>
                  <span className={`font-bold ${dbConnected ? 'text-emerald-400' : 'text-red-400'}`}>{dbConnected ? '✅ Online' : '❌ Offline'}</span>
                </div>
                <div className="flex justify-between items-center p-2.5 rounded-lg bg-white/[0.02]">
                  <span className="text-zinc-200">⚙️ Server Engine</span>
                  <span className="text-cyanCustom font-bold">{serverEngine}</span>
                </div>
                <div className="flex justify-between items-center p-2.5 rounded-lg bg-white/[0.02]">
                  <span className="text-zinc-200">🌐 API Endpoint</span>
                  <span className="text-zinc-400">api.kvantumtechsolutions.com</span>
                </div>
                <div className="flex justify-between items-center p-2.5 rounded-lg bg-white/[0.02]">
                  <span className="text-zinc-200">👤 Logged In As</span>
                  <span className="text-emerald-400 font-bold">{currentUser?.name}</span>
                </div>
                <div className="flex justify-between items-center p-2.5 rounded-lg bg-white/[0.02]">
                  <span className="text-zinc-200">🔐 Role Access</span>
                  <span className="text-pinkCustom font-bold uppercase">{currentUser?.role}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* ================================== TAB: LEADS CRM ================================== */}

      {/* ================================== TAB: LEADS CRM ================================== */}
      {activeTab === 'leads' && (currentUser.role === 'admin' || currentUser.role === 'sales') && (
        isEditingCRM && crmItem ? (
          renderCRMForm()
        ) : (
          <div className="fade-in-up flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold font-headline text-zinc-200 flex items-center gap-2">
                <Mail size={18} className="text-cyanCustom" /> Connection Telemetry Submissions
              </h2>
              <Button onClick={fetchLeadsList} variant="secondary" className="px-4 py-2 text-xs">
                Force Sync Lists
              </Button>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-white/8">
              <table className="w-full border-collapse min-w-[800px] text-sm text-left">
                <thead>
                  <tr className="bg-zinc-950 border-b border-white/8 font-mono text-zinc-300 text-xs">
                    <th className="px-5 py-4 font-semibold uppercase">Timestamp</th>
                    <th className="px-5 py-4 font-semibold uppercase">Client Node</th>
                    <th className="px-5 py-4 font-semibold uppercase">Routing Matrix</th>
                    <th className="px-5 py-4 font-semibold uppercase">Target Service</th>
                    <th className="px-5 py-4 font-semibold uppercase">Telemetry Status</th>
                    <th className="px-5 py-4 font-semibold uppercase">Notes</th>
                    <th className="px-5 py-4 font-semibold uppercase text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/8 text-zinc-400 bg-zinc-900/10">
                  {Array.isArray(leads) && leads.length > 0 ? (
                    leads.map((lead) => (
                      <tr key={lead._id} className="hover:bg-white/[0.01]">
                        <td className="px-5 py-4 text-xs font-mono text-zinc-500 whitespace-nowrap">
                          {new Date(lead.createdAt).toLocaleString()}
                        </td>
                        <td className="px-5 py-4 font-bold text-zinc-200">{lead.name}</td>
                        <td className="px-5 py-4 font-mono text-xs">{lead.email}</td>
                        <td className="px-5 py-4">
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-800 text-zinc-300">
                            {lead.service.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                            lead.status === 'New' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                            lead.status === 'Contacted' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                            lead.status === 'In-Progress' ? 'bg-cyanCustom/10 text-cyanCustom border border-cyanCustom/20' :
                            lead.status === 'Not Interested' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                            'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          }`}>
                            {lead.status}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-xs truncate max-w-[200px]" title={lead.notes || 'No notes added'}>
                          {lead.notes || <span className="text-zinc-600">No logs</span>}
                        </td>
                        <td className="px-5 py-4 text-right">
                          <Button 
                            onClick={() => handleEditCRM(lead)} 
                            variant="secondary" 
                            className="px-3 py-1.5 rounded-lg text-xs"
                          >
                            Trace / Edit
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="px-5 py-12 text-center text-zinc-500 font-mono">
                        NO_LEAD_LOGS_FOUND_IN_CLUSTER
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )
      )}

      {/* ================================== TAB: SERVICES CMS ================================== */}
      {activeTab === 'services' && (currentUser.role === 'admin' || currentUser.role === 'seo') && (
        isEditing && editType === 'service' ? (
          renderServiceForm()
        ) : (
          <div className="fade-in-up flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold font-headline text-zinc-200 flex items-center gap-2">
                <Layers size={18} className="text-cyanCustom" /> System Capabilities Nodes
              </h2>
              <Button onClick={() => openEditor('service')} variant="primary" className="px-4 py-2 text-xs gap-1.5">
                <Plus size={14} /> Add Service Node
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(Array.isArray(services) ? services : []).map(ser => (
                <Card key={ser.id} className="p-6 border flex justify-between items-start gap-4">
                  <div className="text-left flex flex-col gap-2">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase">NODE_ID: {ser.id}</span>
                    <h3 className="text-lg font-bold font-headline text-zinc-200">{ser.title}</h3>
                    <p className="text-zinc-400 text-xs leading-relaxed max-w-[400px]">{ser.shortDesc}</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button 
                      onClick={() => openEditor('service', ser)}
                      className="p-2 bg-white/[0.02] border border-white/8 rounded-lg hover:border-cyanCustom/30 hover:text-cyanCustom transition-colors"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button 
                      onClick={() => handleDeleteService(ser.id)}
                      className="p-2 bg-white/[0.02] border border-white/8 rounded-lg hover:border-red-500/30 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )
      )}

      {/* ================================== TAB: BLOGS CMS ================================== */}
      {activeTab === 'blogs' && (currentUser.role === 'admin' || currentUser.role === 'seo') && (
        isEditing && editType === 'blog' ? (
          renderBlogForm()
        ) : (
          <div className="fade-in-up flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold font-headline text-zinc-200 flex items-center gap-2">
                <BookOpen size={18} className="text-cyanCustom" /> Knowledge Document Nodes
              </h2>
              <Button onClick={() => openEditor('blog')} variant="primary" className="px-4 py-2 text-xs gap-1.5">
                <Plus size={14} /> Compose Document Node
              </Button>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-white/8">
              <table className="w-full border-collapse min-w-[700px] text-sm text-left">
                <thead>
                  <tr className="bg-zinc-950 border-b border-white/8 font-mono text-zinc-300 text-xs">
                    <th className="px-5 py-4 font-semibold uppercase">Category</th>
                    <th className="px-5 py-4 font-semibold uppercase">Document Title</th>
                    <th className="px-5 py-4 font-semibold uppercase">URL Slug Key</th>
                    <th className="px-5 py-4 font-semibold uppercase">Read Time</th>
                    <th className="px-5 py-4 font-semibold uppercase text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/8 text-zinc-400 bg-zinc-900/10">
                  {(Array.isArray(blogs) ? blogs : []).map(blog => {
                    const blogKey = blog.id || blog._id || blog.slug;
                    return (
                      <tr key={blogKey} className="hover:bg-white/[0.01]">
                        <td className="px-5 py-4">
                          <span className="tech-badge">{blog.category || 'Web & App Dev'}</span>
                        </td>
                        <td className="px-5 py-4 font-bold text-zinc-200 truncate max-w-[250px]" title={blog.title}>
                          {blog.title}
                        </td>
                        <td className="px-5 py-4 font-mono text-xs text-cyanCustom">/{blogKey}</td>
                        <td className="px-5 py-4 font-mono text-xs">{blog.readTime || '5 min read'}</td>
                        <td className="px-5 py-4 text-right flex justify-end gap-2">
                          <button 
                            onClick={() => openEditor('blog', blog)}
                            className="p-2 bg-white/[0.02] border border-white/8 rounded-lg hover:border-cyanCustom/30 hover:text-cyanCustom transition-colors"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button 
                            onClick={() => handleDeleteBlog(blogKey)}
                            className="p-2 bg-white/[0.02] border border-white/8 rounded-lg hover:border-red-500/30 hover:text-red-400 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )
      )}

      {/* ================================== TAB: PORTFOLIO CMS ================================== */}
      {activeTab === 'portfolio' && (currentUser.role === 'admin' || currentUser.role === 'seo') && (
        isEditing && editType === 'portfolio' ? (
          renderPortfolioForm()
        ) : (
          <div className="fade-in-up flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold font-headline text-zinc-200 flex items-center gap-2">
                <Plus size={18} className="text-cyanCustom rotate-45" /> Case Studies Portfolio CMS
              </h2>
              <Button onClick={() => openEditor('portfolio')} variant="primary" className="px-4 py-2 text-xs gap-1.5">
                <Plus size={14} /> Add Project Case
              </Button>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-white/8">
              <table className="w-full border-collapse min-w-[700px] text-sm text-left">
                <thead>
                  <tr className="bg-zinc-950 border-b border-white/8 font-mono text-zinc-300 text-xs">
                    <th className="px-5 py-4 font-semibold uppercase">Category</th>
                    <th className="px-5 py-4 font-semibold uppercase">Project Title</th>
                    <th className="px-5 py-4 font-semibold uppercase">Technical Tags</th>
                    <th className="px-5 py-4 font-semibold uppercase text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/8 text-zinc-400 bg-zinc-900/10">
                  {portfolios.map(port => (
                    <tr key={port.id} className="hover:bg-white/[0.01]">
                      <td className="px-5 py-4 font-bold text-zinc-200">{port.category}</td>
                      <td className="px-5 py-4 font-mono text-xs">{port.title}</td>
                      <td className="px-5 py-4 text-xs font-mono">{port.tags}</td>
                      <td className="px-5 py-4 text-right flex justify-end gap-2">
                        <button 
                          onClick={() => openEditor('portfolio', port)}
                          className="p-2 bg-white/[0.02] border border-white/8 rounded-lg hover:border-cyanCustom/30 hover:text-cyanCustom transition-colors"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button 
                          onClick={() => handleDeletePortfolio(port.id)}
                          className="p-2 bg-white/[0.02] border border-white/8 rounded-lg hover:border-red-500/30 hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {portfolios.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-5 py-12 text-center text-zinc-500 font-mono">
                        NO_CASE_STUDIES_FOUND_IN_CLUSTER
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )
      )}

      {/* ================================== TAB: PROGRAMMATIC SEO ================================== */}
      {activeTab === 'seo' && (currentUser.role === 'admin' || currentUser.role === 'seo') && (
        isEditing && editType === 'seo' ? (
          renderSeoPageForm()
        ) : (
          <div className="fade-in-up flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold font-headline text-zinc-200 flex items-center gap-2">
                <Globe size={18} className="text-cyanCustom" /> Programmatic SEO Pages
              </h2>
              <div className="flex gap-2">
                <Button onClick={() => setIsBulkSeoOpen(true)} variant="secondary" className="px-4 py-2 text-xs">
                  Bulk Upload Nodes
                </Button>
                <Button onClick={() => openEditor('seo')} variant="primary" className="px-4 py-2 text-xs gap-1.5">
                  <Plus size={14} /> Create SEO Node
                </Button>
              </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-white/8">
              <table className="w-full border-collapse min-w-[700px] text-sm text-left">
                <thead>
                  <tr className="bg-zinc-950 border-b border-white/8 font-mono text-zinc-300 text-xs">
                    <th className="px-5 py-4 font-semibold uppercase">Page Title</th>
                    <th className="px-5 py-4 font-semibold uppercase">Canonical path</th>
                    <th className="px-5 py-4 font-semibold uppercase">Meta Title Tag</th>
                    <th className="px-5 py-4 font-semibold uppercase text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/8 text-zinc-400 bg-zinc-900/10">
                  {seoPages.map(page => (
                    <tr key={page.slug} className="hover:bg-white/[0.01]">
                      <td className="px-5 py-4 font-bold text-zinc-200 truncate max-w-[200px]" title={page.title}>
                        {page.title}
                      </td>
                      <td className="px-5 py-4 font-mono text-xs text-cyanCustom">/keyword/{page.slug}</td>
                      <td className="px-5 py-4 text-xs truncate max-w-[250px]" title={page.metaTitle}>
                        {page.metaTitle}
                      </td>
                      <td className="px-5 py-4 text-right flex justify-end gap-2">
                        <button 
                          onClick={() => openEditor('seo', page)}
                          className="p-2 bg-white/[0.02] border border-white/8 rounded-lg hover:border-cyanCustom/30 hover:text-cyanCustom transition-colors"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button 
                          onClick={() => handleDeleteSeoPage(page.slug)}
                          className="p-2 bg-white/[0.02] border border-white/8 rounded-lg hover:border-red-500/30 hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Section 2: Page Meta & Custom Code Snippets */}
            <div className="flex flex-col gap-6 mt-12 border-t border-white/8 pt-8">
              <h2 className="text-xl font-bold font-headline text-zinc-200 flex items-center gap-2">
                <Key size={18} className="text-purpleCustom" /> Page Meta Configurations
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.isArray(seoSettings) && seoSettings.filter(s => s.key !== 'robots' && s.key !== 'sitemap').map(setting => (
                  <Card key={setting.key} className="p-6 border flex flex-col justify-between items-start gap-4 h-full">
                    <div className="text-left w-full flex flex-col justify-between flex-1">
                      <div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-800 text-zinc-300 font-bold uppercase block w-fit mb-3">
                          {setting.key}
                        </span>
                        <div className="flex flex-col gap-1.5 min-h-[5.5rem] justify-center">
                          <h4 className="text-zinc-200 text-sm font-semibold line-clamp-1" title={setting.title || 'Untitled Page'}>
                            {setting.title || 'Untitled Page'}
                          </h4>
                          <p className="text-zinc-400 text-xs line-clamp-3 leading-relaxed" title={setting.description || 'No description'}>
                            {setting.description || 'No description'}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={() => {
                        setEditingSeoSettingItem({ ...setting });
                        setIsEditingSeoSetting(true);
                      }}
                      variant="secondary"
                      className="w-full py-2 text-xs rounded-lg mt-4 cursor-pointer"
                    >
                      Configure Meta Node
                    </Button>
                  </Card>
                ))}
              </div>
            </div>

            {/* Section 3: Head & Body Custom Snippets Injector */}
            <div className="flex flex-col gap-6 border-t border-white/8 pt-8 mt-12">
              <div className="flex justify-between items-center flex-wrap gap-4">
                <div>
                  <h2 className="text-xl font-bold font-headline text-zinc-200 flex items-center gap-2">
                    <Key size={18} className="text-cyanCustom" /> Custom Code Snippets (GTM, Analytics, Head Scripts)
                  </h2>
                  <p className="text-zinc-550 text-xs mt-1">Inject custom script tags, GTM configurations, or social pixel triggers dynamically on target pages.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Add Custom Script Form */}
                <div className="lg:col-span-1 bg-zinc-900/20 border border-white/5 p-6 rounded-2xl flex flex-col gap-4 text-left">
                  <h4 className="text-xs font-bold font-headline text-zinc-200">Inject Custom Script Node</h4>
                  <form onSubmit={async (e) => {
                    e.preventDefault();
                    try {
                      const newScript = {
                        name: e.target.scriptName.value,
                        code: e.target.scriptCode.value,
                        target: e.target.scriptTarget.value
                      };
                      const updatedScripts = [...(settings?.custom_scripts || []), newScript];
                      await settingService.updateSetting('custom_scripts', updatedScripts);
                      setSettings(prev => ({ ...prev, custom_scripts: updatedScripts }));
                      e.target.reset();
                      alert('[SUCCESS] Custom script code snippet injected.');
                    } catch (err) {
                      alert('[ERROR] Update failed: ' + err.message);
                    }
                  }} className="flex flex-col gap-4">
                    <div>
                      <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-1 font-bold">Snippet Name Identifier</label>
                      <input type="text" name="scriptName" required placeholder="e.g. Google Analytics G4" className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2 text-zinc-100 text-sm outline-none focus:border-cyanCustom/40" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-1 font-bold">Target Scope Selection</label>
                      <select name="scriptTarget" className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2 text-zinc-100 text-sm outline-none focus:border-cyanCustom/40 font-mono">
                        <option value="global font-mono">Global (Injected on all pages)</option>
                        <option value="home font-mono">Home Page Only</option>
                        <option value="seo font-mono">Dynamic SEO Pages Only</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-1 font-bold">Script / Tag Code Content</label>
                      <textarea name="scriptCode" required rows={6} placeholder="Paste raw <script>...</script> or other meta tags here..." className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2 text-zinc-100 text-sm font-mono outline-none focus:border-cyanCustom/40 resize-none" />
                    </div>
                    <Button type="submit" variant="primary" className="py-2.5 w-full gap-2 justify-center">
                      <Plus size={14} /> Inject Script Node
                    </Button>
                  </form>
                </div>

                {/* Custom Scripts Stream List */}
                <div className="lg:col-span-2 flex flex-col gap-4">
                  <h4 className="text-xs font-bold font-headline text-zinc-200">Active Custom Scripts Registry</h4>
                  <div className="flex flex-col gap-3 max-h-[480px] overflow-y-auto pr-2">
                    {(settings?.custom_scripts || []).map((script, index) => (
                      <div key={index} className="bg-zinc-950/40 border border-white/5 p-4 rounded-xl flex justify-between items-center gap-4 text-left">
                        <div className="flex flex-col gap-1 w-[80%]">
                          <span className="text-xs font-bold text-zinc-200 flex items-center gap-2">
                            {script.name} 
                            <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-cyanCustom/10 text-cyanCustom border border-cyanCustom/20 uppercase font-bold">
                              {script.target}
                            </span>
                          </span>
                          <pre className="text-[10px] font-mono text-zinc-500 bg-black/40 border border-white/5 p-2 rounded-lg truncate max-w-full">
                            {script.code}
                          </pre>
                        </div>
                        <button 
                          onClick={async () => {
                            if (window.confirm('Delete this custom script snippet?')) {
                              try {
                                const updatedScripts = (settings?.custom_scripts || []).filter((_, i) => i !== index);
                                await settingService.updateSetting('custom_scripts', updatedScripts);
                                setSettings(prev => ({ ...prev, custom_scripts: updatedScripts }));
                                alert('[SUCCESS] Script snippet deleted.');
                              } catch (err) {
                                alert('[ERROR] Deletion failed: ' + err.message);
                              }
                            }
                          }}
                          className="p-2.5 bg-white/[0.01] border border-white/5 rounded-xl hover:border-red-500/20 hover:text-red-400 transition-colors cursor-pointer shrink-0"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    ))}
                    {(settings?.custom_scripts || []).length === 0 && (
                      <span className="text-zinc-650 font-mono text-xs text-center py-12 bg-zinc-950/20 rounded-2xl border border-white/5">
                        NO_CUSTOM_SCRIPTS_REGISTERED_IN_CLUSTER
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

          </div>
        )
      )}

      {/* ================================== TAB: ROBOTS & SITEMAP CMS ================================== */}
      {activeTab === 'robots_sitemap' && (currentUser.role === 'admin' || currentUser.role === 'seo') && (
        <div className="fade-in-up flex flex-col gap-8 text-left">
          
          {/* Header */}
          <div className="flex justify-between items-center border-b border-white/5 pb-4">
            <div>
              <h2 className="text-xl font-bold font-headline text-zinc-200 flex items-center gap-2">
                <FileText size={20} className="text-cyanCustom" /> Robots.txt & Sitemap.xml Control Desk
              </h2>
              <p className="text-xs text-zinc-500 mt-1">
                Configure search engine crawler rules (robots.txt), generate XML sitemaps, and manage indexing parameters.
              </p>
            </div>
            <Button
              type="button"
              onClick={handleGenerateSitemap}
              variant="primary"
              className="gap-2 py-2.5 px-5 text-xs font-mono font-bold uppercase tracking-wider cursor-pointer"
            >
              <Copy size={15} /> ⚡ Auto-Generate Sitemap XML
            </Button>
          </div>

          {/* Auto-Generate Banner Box */}
          <Card className="p-6 border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 bg-gradient-to-r from-cyanCustom/15 via-purpleCustom/10 to-transparent border-cyanCustom/30">
            <div className="space-y-1">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-cyanCustom/20 text-cyanCustom font-bold uppercase inline-flex items-center gap-1">
                <Globe size={12} /> Dynamic XML Generator
              </span>
              <h3 className="text-lg font-headline font-bold text-zinc-100">Auto-Generate Complete XML Sitemap</h3>
              <p className="text-zinc-400 text-xs leading-relaxed max-w-xl">
                Scans all static site pages (/, /about, /services, /projects, /contact, /blog, /terms, /privacy), active published blogs ({blogs.length}), and programmatic SEO keyword templates ({seoPages.length}) to compile valid Google XML.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <Button
                type="button"
                onClick={handleGenerateSitemap}
                variant="primary"
                className="gap-2 py-3 px-6 text-xs cursor-pointer shadow-lg font-mono font-bold uppercase tracking-wider"
              >
                <Copy size={15} /> ⚡ Generate XML Now
              </Button>
            </div>
          </Card>

          {/* Direct Textarea Editors (2 Columns) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Column 1: robots.txt Editor */}
            <Card className="p-6 border flex flex-col gap-4 text-left">
              <div className="flex items-center justify-between border-b border-white/8 pb-3">
                <h3 className="text-sm font-mono text-cyanCustom font-bold uppercase flex items-center gap-2">
                  🤖 robots.txt Crawler Directives
                </h3>
                <span className="text-[10px] font-mono text-zinc-500">Target: /robots.txt</span>
              </div>

              <div>
                <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-2 font-bold">
                  Raw robots.txt Content
                </label>
                <textarea
                  rows={14}
                  placeholder={`User-agent: *\nAllow: /\nDisallow: /admin\nSitemap: https://kvantumtechsolutions.com/sitemap.xml`}
                  value={robotsInput}
                  onChange={(e) => setRobotsInput(e.target.value)}
                  className="w-full bg-zinc-950/60 border border-white/8 rounded-xl p-4 text-zinc-100 text-xs font-mono outline-none focus:border-cyanCustom/40 resize-none leading-relaxed"
                />
              </div>

              <div className="flex justify-between items-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(robotsInput);
                    setRobotsCopied(true);
                    setTimeout(() => setRobotsCopied(false), 2000);
                  }}
                  className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/8 text-zinc-300 text-xs font-mono hover:bg-white/[0.08] transition-colors cursor-pointer"
                >
                  {robotsCopied ? 'COPIED!' : '📋 Copy text'}
                </button>

                <Button
                  type="button"
                  onClick={handleSaveRobots}
                  disabled={robotsSaving}
                  variant="primary"
                  className="px-6 py-2 text-xs font-mono font-bold uppercase cursor-pointer"
                >
                  {robotsSaving ? 'Saving...' : '💾 Save Robots.txt'}
                </Button>
              </div>
            </Card>

            {/* Column 2: sitemap.xml Editor */}
            <Card className="p-6 border flex flex-col gap-4 text-left">
              <div className="flex items-center justify-between border-b border-white/8 pb-3">
                <h3 className="text-sm font-mono text-purpleCustom font-bold uppercase flex items-center gap-2">
                  🌐 sitemap.xml Payload Code
                </h3>
                <span className="text-[10px] font-mono text-zinc-500">Target: /sitemap.xml</span>
              </div>

              <div>
                <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-2 font-bold">
                  Raw sitemap.xml Content
                </label>
                <textarea
                  rows={14}
                  placeholder={`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>https://kvantumtechsolutions.com/</loc>\n  </url>\n</urlset>`}
                  value={sitemapInput}
                  onChange={(e) => setSitemapInput(e.target.value)}
                  className="w-full bg-zinc-950/60 border border-white/8 rounded-xl p-4 text-zinc-100 text-xs font-mono outline-none focus:border-cyanCustom/40 resize-none leading-relaxed"
                />
              </div>

              <div className="flex justify-between items-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(sitemapInput);
                    setSitemapDirectCopied(true);
                    setTimeout(() => setSitemapDirectCopied(false), 2000);
                  }}
                  className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/8 text-zinc-300 text-xs font-mono hover:bg-white/[0.08] transition-colors cursor-pointer"
                >
                  {sitemapDirectCopied ? 'COPIED XML!' : '📋 Copy XML'}
                </button>

                <Button
                  type="button"
                  onClick={handleSaveSitemapInput}
                  disabled={sitemapSaving}
                  variant="primary"
                  className="px-6 py-2 text-xs font-mono font-bold uppercase cursor-pointer"
                >
                  {sitemapSaving ? 'Saving...' : '💾 Save Sitemap.xml'}
                </Button>
              </div>
            </Card>

          </div>

        </div>
      )}

      {/* ================================== TAB: S3 ASSETS ================================== */}
      {activeTab === 'assets' && (currentUser.role === 'admin' || currentUser.role === 'seo') && (
        <div className="fade-in-up flex flex-col gap-6">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <h2 className="text-xl font-bold font-headline text-zinc-200 flex items-center gap-2">
                <Image size={18} className="text-cyanCustom" /> AWS S3 Object Telemetry
              </h2>
              <span className="text-zinc-500 text-[11px] font-mono uppercase mt-1 block">Storage Nodes list</span>
            </div>
            
            <label className="btn-primary px-4 py-2.5 rounded-lg text-xs gap-1.5 cursor-pointer relative select-none">
              <UploadCloud size={14} /> {uploadingAsset ? 'Uploading Asset...' : 'Upload File to S3'}
              <input 
                type="file" 
                className="hidden" 
                onChange={handleAssetUpload} 
                disabled={uploadingAsset} 
              />
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {(Array.isArray(assets) ? assets : []).map((asset, idx) => (
              <Card key={idx} className="p-4 border flex flex-col justify-between items-start gap-4">
                
                {/* Image Thumbnail preview */}
                <div className="w-full h-36 bg-zinc-950/60 rounded-xl overflow-hidden flex items-center justify-center border border-white/8 relative group">
                  {asset.contentType && asset.contentType.startsWith('image/') ? (
                    <img 
                      src={asset.url} 
                      alt={asset.name} 
                      className="w-full h-full object-contain p-2 hover:scale-105 transition-transform" 
                    />
                  ) : (
                    <FileText size={40} className="text-zinc-600" />
                  )}
                  <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/60 backdrop-blur rounded text-[10px] font-mono text-zinc-400">
                    {asset.size ? `${(asset.size / 1024).toFixed(1)} KB` : 'S3 Data'}
                  </span>
                </div>

                {/* Info & Copy Link triggers */}
                <div className="w-full text-left">
                  <h4 className="text-zinc-200 text-xs font-mono font-bold truncate mb-3" title={asset.name}>
                    {asset.name}
                  </h4>
                  
                  <div className="flex gap-2 w-full">
                    <Button 
                      onClick={() => copyToClipboard(asset.url, idx)} 
                      variant="secondary" 
                      className="flex-grow py-2 rounded-lg text-[10px] gap-1.5"
                    >
                      {copiedIndex === idx ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
                      {copiedIndex === idx ? 'URL Copied' : 'Copy CDN URL'}
                    </Button>
                    
                    {currentUser.role === 'admin' && (
                      <button 
                        onClick={() => handleAssetDelete(asset.name)}
                        className="p-2 bg-white/[0.02] border border-white/8 rounded-lg hover:border-red-500/30 hover:text-red-400 transition-colors"
                        title="Delete asset (Admin only)"
                      >
                        <Trash2 size={12} />
                      </button>
                    )}
                  </div>
                </div>

              </Card>
            ))}
          </div>
        </div>
      )}

      {/* ================================== TAB: STAFF ACCOUNTS ================================== */}
      {activeTab === 'users' && currentUser.role === 'admin' && (
        <div className="fade-in-up grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Create User Form */}
          <div className="lg:col-span-1">
            <Card className="p-6 border text-left flex flex-col gap-5">
              <h3 className="text-lg font-bold font-headline text-zinc-200 flex items-center gap-2">
                <UserCheck size={18} className="text-purpleCustom" /> Create Staff Account
              </h3>
              
              <form onSubmit={handleCreateUserSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5">Name</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. Rahul SEO"
                    value={newUserData.name} 
                    onChange={(e) => setNewUserData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2.5 text-zinc-100 text-sm placeholder-zinc-600 outline-none focus:border-purpleCustom/30"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5">Email</label>
                  <input 
                    type="email" 
                    required 
                    placeholder="e.g. seo@kvantumtechsolutions.com"
                    value={newUserData.email} 
                    onChange={(e) => setNewUserData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2.5 text-zinc-100 text-sm placeholder-zinc-600 outline-none focus:border-purpleCustom/30"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5">Password</label>
                  <input 
                    type="password" 
                    required 
                    placeholder="••••••••"
                    value={newUserData.password} 
                    onChange={(e) => setNewUserData(prev => ({ ...prev, password: e.target.value }))}
                    className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2.5 text-zinc-100 text-sm placeholder-zinc-600 outline-none focus:border-purpleCustom/30"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5">Role Privileges</label>
                  <select 
                    value={newUserData.role}
                    onChange={(e) => setNewUserData(prev => ({ ...prev, role: e.target.value }))}
                    className="w-full bg-zinc-950 border border-white/8 rounded-xl px-4 py-2.5 text-zinc-100 text-sm outline-none cursor-pointer focus:border-purpleCustom/30"
                  >
                    <option value="admin">Super Admin (Full Access)</option>
                    <option value="seo">SEO Editor (CMS & S3 assets)</option>
                    <option value="sales">Sales CRM (Leads pipeline)</option>
                  </select>
                </div>

                {userSuccessMessage && (
                  <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-2 rounded-lg text-emerald-400 text-xs font-mono">
                    <CheckCircle2 size={13} /> {userSuccessMessage}
                  </div>
                )}

                {userErrorMessage && (
                  <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 px-3.5 py-2 rounded-lg text-red-400 text-xs font-mono">
                    <AlertTriangle size={13} /> {userErrorMessage}
                  </div>
                )}

                <Button type="submit" variant="primary" className="w-full py-3">
                  Register Account Node
                </Button>

              </form>
            </Card>
          </div>

          {/* Users List Table */}
          <div className="lg:col-span-2 flex flex-col gap-4 text-left">
            <h3 className="text-lg font-bold font-headline text-zinc-200">Registered Staff Nodes</h3>
            
            <div className="overflow-x-auto rounded-2xl border border-white/8">
              <table className="w-full border-collapse text-sm text-left">
                <thead>
                  <tr className="bg-zinc-950 border-b border-white/8 font-mono text-zinc-300 text-xs">
                    <th className="px-5 py-4 font-semibold uppercase">Operator</th>
                    <th className="px-5 py-4 font-semibold uppercase">Email Path</th>
                    <th className="px-5 py-4 font-semibold uppercase">Role Privileges</th>
                    <th className="px-5 py-4 font-semibold uppercase text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/8 text-zinc-400 bg-zinc-900/10">
                  {(Array.isArray(usersList) ? usersList : []).map(usr => (
                    <tr key={usr._id} className="hover:bg-white/[0.01]">
                      <td className="px-5 py-4 font-bold text-zinc-200">{usr.name}</td>
                      <td className="px-5 py-4 font-mono text-xs">{usr.email}</td>
                      <td className="px-5 py-4">
                        <span className={`px-2.5 py-0.5 rounded text-xs font-semibold ${
                          usr.role === 'admin' ? 'bg-purpleCustom/10 text-purpleCustom border border-purpleCustom/20' :
                          usr.role === 'seo' ? 'bg-cyanCustom/10 text-cyanCustom border border-cyanCustom/20' :
                          'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}>
                          {usr.role.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        {usr.email !== currentUser.email ? (
                          <button 
                            onClick={() => handleDeleteUser(usr._id)}
                            className="p-2 bg-white/[0.02] border border-white/8 rounded-lg hover:border-red-500/30 hover:text-red-400 transition-colors"
                          >
                            <Trash2 size={13} />
                          </button>
                        ) : (
                          <span className="text-zinc-600 font-mono text-xs italic">Current Operator</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ================================== TAB: SITE SETTINGS CMS ================================== */}
      {activeTab === 'settings' && (
        <div className="fade-in-up flex flex-col gap-8 text-left">
          <div className="border-b border-white/5 pb-4">
            <h2 className="text-xl font-bold font-headline text-zinc-200">Site Settings CMS</h2>
            <p className="text-zinc-550 text-xs mt-1">Configure global content schemas, metrics, hero parameters, and testimonial logs in real-time.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Hero & About Column */}
            <div className="flex flex-col gap-8">
              {/* Hero Form */}
              <Card className="p-6 border flex flex-col gap-4">
                <h3 className="text-sm font-mono text-zinc-400 uppercase tracking-widest border-b border-white/5 pb-3">Hero Section Parameters</h3>
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  try {
                    const val = {
                      title: e.target.heroTitle.value,
                      subtitle: e.target.heroSubtitle.value,
                      ctaText: e.target.heroCtaText.value
                    };
                    await settingService.updateSetting('hero', val);
                    setSettings(prev => ({ ...prev, hero: val }));
                    alert('[SUCCESS] Hero section updated.');
                  } catch (err) {
                    alert('[ERROR] Update failed: ' + err.message);
                  }
                }} className="flex flex-col gap-4">
                  <div>
                    <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5 font-bold">Hero Title Text</label>
                    <input 
                      type="text" 
                      name="heroTitle"
                      required
                      defaultValue={settings?.hero?.title || ''}
                      className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2.5 text-zinc-100 text-sm outline-none focus:border-cyanCustom/40 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5 font-bold">Hero Subtitle / Description</label>
                    <textarea 
                      name="heroSubtitle"
                      required
                      rows={3}
                      defaultValue={settings?.hero?.subtitle || ''}
                      className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2.5 text-zinc-100 text-sm outline-none focus:border-cyanCustom/40 resize-none font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5 font-bold">Primary Button CTA Label</label>
                    <input 
                      type="text" 
                      name="heroCtaText"
                      required
                      defaultValue={settings?.hero?.ctaText || ''}
                      className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2.5 text-zinc-100 text-sm outline-none focus:border-cyanCustom/40 font-mono"
                    />
                  </div>
                  <Button type="submit" variant="primary" className="py-2.5 mt-2 gap-2 justify-center">
                    <Save size={14} /> Synchronize Hero Block
                  </Button>
                </form>
              </Card>

              {/* About Us Form */}
              <Card className="p-6 border flex flex-col gap-4">
                <h3 className="text-sm font-mono text-zinc-400 uppercase tracking-widest border-b border-white/5 pb-3">About Us Parameters</h3>
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  try {
                    const val = {
                      description: e.target.aboutDescription.value,
                      experience: e.target.aboutExperience.value
                    };
                    await settingService.updateSetting('about', val);
                    setSettings(prev => ({ ...prev, about: val }));
                    alert('[SUCCESS] About section updated.');
                  } catch (err) {
                    alert('[ERROR] Update failed: ' + err.message);
                  }
                }} className="flex flex-col gap-4">
                  <div>
                    <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5 font-bold">Short About US Paragraph</label>
                    <textarea 
                      name="aboutDescription"
                      required
                      rows={4}
                      defaultValue={settings?.about?.description || ''}
                      className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2.5 text-zinc-100 text-sm outline-none focus:border-cyanCustom/40 resize-none font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5 font-bold">Studio Experience Badge</label>
                    <input 
                      type="text" 
                      name="aboutExperience"
                      required
                      defaultValue={settings?.about?.experience || ''}
                      className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2.5 text-zinc-100 text-sm outline-none focus:border-cyanCustom/40 font-mono"
                    />
                  </div>
                  <Button type="submit" variant="primary" className="py-2.5 mt-2 gap-2 justify-center">
                    <Save size={14} /> Synchronize About Block
                  </Button>
                </form>
              </Card>
            </div>

            {/* Stats & Testimonials Column */}
            <div className="flex flex-col gap-8">
              {/* Stats Grid Form */}
              <Card className="p-6 border flex flex-col gap-4">
                <h3 className="text-sm font-mono text-zinc-400 uppercase tracking-widest border-b border-white/5 pb-3">Performance Ticker Stats</h3>
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  try {
                    const val = [
                      { value: e.target.statVal0.value, label: e.target.statLabel0.value },
                      { value: e.target.statVal1.value, label: e.target.statLabel1.value },
                      { value: e.target.statVal2.value, label: e.target.statLabel2.value }
                    ];
                    await settingService.updateSetting('stats', val);
                    setSettings(prev => ({ ...prev, stats: val }));
                    alert('[SUCCESS] Site statistics updated.');
                  } catch (err) {
                    alert('[ERROR] Update failed: ' + err.message);
                  }
                }} className="flex flex-col gap-4">
                  {[0, 1, 2].map(idx => (
                    <div key={idx} className="grid grid-cols-2 gap-4 border-b border-white/5 pb-3 last:border-b-0 last:pb-0">
                      <div>
                        <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-1 font-bold">Stat Value #{idx + 1}</label>
                        <input 
                          type="text" 
                          name={`statVal${idx}`}
                          required
                          placeholder="e.g. 99% or 150+"
                          defaultValue={settings?.stats?.[idx]?.value || ''}
                          className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2 text-zinc-100 text-sm outline-none focus:border-cyanCustom/40 font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-1 font-bold">Stat Label #{idx + 1}</label>
                        <input 
                          type="text" 
                          name={`statLabel${idx}`}
                          required
                          placeholder="e.g. Retention Rate"
                          defaultValue={settings?.stats?.[idx]?.label || ''}
                          className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2 text-zinc-100 text-sm outline-none focus:border-cyanCustom/40 font-mono"
                        />
                      </div>
                    </div>
                  ))}
                  <Button type="submit" variant="primary" className="py-2.5 mt-2 gap-2 justify-center">
                    <Save size={14} /> Synchronize Stats Board
                  </Button>
                </form>
              </Card>

              {/* Contact Information Form */}
              <Card className="p-6 border flex flex-col gap-4">
                <h3 className="text-sm font-mono text-zinc-400 uppercase tracking-widest border-b border-white/5 pb-3">Contact & Network Matrix</h3>
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  try {
                    const val = {
                      phone: e.target.contactPhone.value,
                      email: e.target.contactEmail.value,
                      address: e.target.contactAddress.value,
                      instagram: e.target.contactInstagram.value,
                      linkedin: e.target.contactLinkedin.value,
                      facebook: e.target.contactFacebook.value,
                      twitter: e.target.contactTwitter.value
                    };
                    await settingService.updateSetting('contact', val);
                    setSettings(prev => ({ ...prev, contact: val }));
                    alert('[SUCCESS] Contact settings updated.');
                  } catch (err) {
                    alert('[ERROR] Update failed: ' + err.message);
                  }
                }} className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-1 font-bold">Official Hotline Phone</label>
                      <input 
                        type="text" 
                        name="contactPhone"
                        required
                        defaultValue={settings?.contact?.phone || ''}
                        className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2 text-zinc-100 text-sm outline-none focus:border-cyanCustom/40 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-1 font-bold">Support Email Inbox</label>
                      <input 
                        type="email" 
                        name="contactEmail"
                        required
                        defaultValue={settings?.contact?.email || ''}
                        className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2 text-zinc-100 text-sm outline-none focus:border-cyanCustom/40 font-mono"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-1 font-bold">Physical Office Address</label>
                    <input 
                      type="text" 
                      name="contactAddress"
                      required
                      defaultValue={settings?.contact?.address || ''}
                      className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2 text-zinc-100 text-sm outline-none focus:border-cyanCustom/40 font-mono"
                    />
                  </div>
                  <div className="border-t border-white/5 pt-4 mt-2">
                    <span className="text-[11px] font-mono text-cyanCustom uppercase tracking-wider block mb-3 font-bold">
                      🌐 Social Media Networks Manager (Icon + Link + Active/Inactive Switch):
                    </span>
                    <div className="flex flex-col gap-3 font-mono text-xs">
                      {[
                        { key: 'instagram', label: 'Instagram', defaultUrl: 'https://www.instagram.com/kvantumtechsolutions/', activeKey: 'instagramActive' },
                        { key: 'linkedin', label: 'LinkedIn', defaultUrl: 'https://www.linkedin.com/in/kvantum-tech-solutions-75916a41b', activeKey: 'linkedinActive' },
                        { key: 'facebook', label: 'Facebook', defaultUrl: 'https://facebook.com/kvantumtechsolutions', activeKey: 'facebookActive' },
                        { key: 'twitter', label: 'Twitter / X', defaultUrl: 'https://twitter.com/kvantumtech', activeKey: 'twitterActive' },
                        { key: 'whatsapp', label: 'WhatsApp', defaultUrl: 'https://wa.me/919811661828', activeKey: 'whatsappActive' },
                        { key: 'youtube', label: 'YouTube', defaultUrl: '', activeKey: 'youtubeActive' },
                        { key: 'github', label: 'GitHub', defaultUrl: '', activeKey: 'githubActive' },
                        { key: 'pinterest', label: 'Pinterest', defaultUrl: '', activeKey: 'pinterestActive' },
                      ].map(soc => {
                        const isActive = settings?.contact?.[soc.activeKey] !== false && (soc.activeKey.includes('youtube') || soc.activeKey.includes('github') || soc.activeKey.includes('pinterest') || soc.activeKey.includes('whatsapp') ? settings?.contact?.[soc.activeKey] === true : true);
                        return (
                          <div key={soc.key} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl bg-zinc-950/40 border border-white/5">
                            <div className="flex items-center gap-3 shrink-0">
                              <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                  type="checkbox"
                                  defaultChecked={isActive}
                                  onChange={async (e) => {
                                    const val = { ...settings?.contact, [soc.activeKey]: e.target.checked };
                                    await settingService.updateSetting('contact', val);
                                    setSettings(prev => ({ ...prev, contact: val }));
                                  }}
                                  className="accent-pinkCustom w-4 h-4 cursor-pointer"
                                />
                                <span className={`font-bold ${isActive ? 'text-emerald-400' : 'text-zinc-500'}`}>
                                  {soc.label}
                                </span>
                              </label>
                              <span className={`text-[9px] px-2 py-0.5 rounded font-mono ${isActive ? 'bg-emerald-500/20 text-emerald-300' : 'bg-zinc-800 text-zinc-500'}`}>
                                {isActive ? 'ACTIVE (SHOW)' : 'INACTIVE (HIDDEN)'}
                              </span>
                            </div>

                            <input
                              type="text"
                              name={`contact${soc.key.charAt(0).toUpperCase() + soc.key.slice(1)}`}
                              placeholder={`Paste ${soc.label} URL link...`}
                              defaultValue={settings?.contact?.[soc.key] || (isActive ? soc.defaultUrl : '')}
                              className="w-full sm:w-2/3 bg-zinc-900/80 border border-white/8 rounded-lg px-3 py-1.5 text-zinc-100 text-xs outline-none focus:border-cyanCustom/40 font-mono"
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <Button type="submit" variant="primary" className="py-2.5 mt-2 gap-2 justify-center">
                    <Save size={14} /> Synchronize Contact Matrix
                  </Button>
                </form>
              </Card>
            </div>
          </div>

          {/* Testimonials Manager Section (Grid full-width) */}
          <Card className="p-6 border flex flex-col gap-6 w-full">
            <h3 className="text-sm font-mono text-zinc-400 uppercase tracking-widest border-b border-white/5 pb-3">Testimonials CMS Manager</h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column: Form to Add Testimonial */}
              <div className="lg:col-span-1 border-r border-white/5 pr-0 lg:pr-8 flex flex-col gap-4">
                <h4 className="text-xs font-bold font-headline text-zinc-200">Inject Client Voice Node</h4>
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  try {
                    const newTestimonial = {
                      name: e.target.testName.value,
                      role: e.target.testRole.value,
                      content: e.target.testContent.value,
                      rating: parseInt(e.target.testRating.value) || 5
                    };
                    const updatedList = [...(settings?.testimonials || []), newTestimonial];
                    await settingService.updateSetting('testimonials', updatedList);
                    setSettings(prev => ({ ...prev, testimonials: updatedList }));
                    e.target.reset();
                    alert('[SUCCESS] Testimonial voice injected.');
                  } catch (err) {
                    alert('[ERROR] Injection failed: ' + err.message);
                  }
                }} className="flex flex-col gap-4">
                  <div>
                    <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-1 font-bold">Client Operator Name</label>
                    <input type="text" name="testName" required className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2 text-zinc-100 text-sm outline-none focus:border-cyanCustom/40" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-1 font-bold">Company Role Title</label>
                    <input type="text" name="testRole" required placeholder="e.g. CEO, FinTech India" className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2 text-zinc-100 text-sm outline-none focus:border-cyanCustom/40" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-1 font-bold">Rating Value</label>
                    <select name="testRating" className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2 text-zinc-100 text-sm outline-none focus:border-cyanCustom/40">
                      <option value="5">⭐⭐⭐⭐⭐ (5 Stars)</option>
                      <option value="4">⭐⭐⭐⭐ (4 Stars)</option>
                      <option value="3">⭐⭐⭐ (3 Stars)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-1 font-bold">Review Quote Content</label>
                    <textarea name="testContent" required rows={3} className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2 text-zinc-100 text-sm outline-none focus:border-cyanCustom/40 resize-none" />
                  </div>
                  <Button type="submit" variant="primary" className="py-2 w-full gap-2 justify-center">
                    <Plus size={14} /> Inject Voice Node
                  </Button>
                </form>
              </div>

              {/* Right Column: List of Testimonials */}
              <div className="lg:col-span-2 flex flex-col gap-4">
                <h4 className="text-xs font-bold font-headline text-zinc-200">Active Testimonial Database Stream</h4>
                <div className="flex flex-col gap-3 max-h-[380px] overflow-y-auto pr-2">
                  {(settings?.testimonials || []).map((test, index) => (
                    <div key={index} className="bg-zinc-950/40 border border-white/5 p-4 rounded-xl flex justify-between items-center gap-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-bold text-zinc-200">{test.name} <span className="text-[10px] font-mono text-zinc-500">({test.role})</span></span>
                        <p className="text-[11px] text-zinc-400 leading-relaxed italic">"{test.content}"</p>
                        <span className="text-[10px] text-amber-400">{'⭐'.repeat(test.rating)}</span>
                      </div>
                      <button 
                        onClick={async () => {
                          if (window.confirm('Remove this voice node?')) {
                            try {
                              const updatedList = (settings?.testimonials || []).filter((_, i) => i !== index);
                              await settingService.updateSetting('testimonials', updatedList);
                              setSettings(prev => ({ ...prev, testimonials: updatedList }));
                              alert('[SUCCESS] Voice node deleted.');
                            } catch (err) {
                              alert('[ERROR] Deletion failed: ' + err.message);
                            }
                          }
                        }}
                        className="p-2.5 bg-white/[0.01] border border-white/5 rounded-xl hover:border-red-500/20 hover:text-red-400 transition-colors cursor-pointer shrink-0"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                  {(settings?.testimonials || []).length === 0 && (
                    <span className="text-zinc-600 font-mono text-xs text-center py-8">No testimonials voice streams registered</span>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* ================================== MODAL: BULK SEO UPLOADER ================================== */}
      {isBulkSeoOpen && (
        <div className="dialog-overlay" onClick={() => setIsBulkSeoOpen(false)}>
          <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setIsBulkSeoOpen(false)}
              className="absolute top-5 right-5 bg-white/[0.02] border border-white/8 text-zinc-100 p-2 rounded-full hover:bg-white/[0.08]"
            >
              <X size={20} />
            </button>

            <form onSubmit={handleBulkSeoSubmit} className="p-8 sm:p-12 text-left flex flex-col gap-5">
              <h2 className="text-xl font-bold font-headline text-zinc-200 border-b border-white/8 pb-3">
                Bulk Upload Programmatic SEO Nodes
              </h2>
              
              <p className="text-zinc-400 text-xs leading-relaxed">
                Paste a valid JSON array of SEO programmatic landing page objects. Format must match:
              </p>
              
              <pre className="bg-slate-950 p-4 rounded-xl border border-white/5 font-mono text-[10px] text-cyanCustom max-h-[140px] overflow-y-auto">
{`[
  {
    "slug": "best-seo-in-noida",
    "title": "Best SEO in Noida",
    "content": "Description content here...",
    "metaTitle": "Top Technical SEO agency in Noida...",
    "metaDesc": "We rank local businesses...",
    "metaKeywords": "seo, noida, delhi"
  }
]`}
              </pre>

              <div>
                <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5">JSON Payload Array</label>
                <textarea 
                  required 
                  rows={8}
                  placeholder="Paste JSON array here..."
                  value={bulkSeoInput}
                  onChange={(e) => setBulkSeoInput(e.target.value)}
                  className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2.5 text-zinc-100 text-sm font-mono resize-none"
                />
              </div>

              <Button 
                type="submit" 
                variant="primary" 
                className="py-3 mt-2"
                disabled={bulkUploading}
              >
                {bulkUploading ? 'Parsing Array...' : 'Sync Telemetry Templates'}
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* ================================== MODAL: SITE-WIDE SEO SETTINGS EDITOR ================================== */}
      {isEditingSeoSetting && editingSeoSettingItem && (
        <div className="dialog-overlay" onClick={() => setIsEditingSeoSetting(false)}>
          <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setIsEditingSeoSetting(false)}
              className="absolute top-5 right-5 bg-white/[0.02] border border-white/8 text-zinc-100 p-2 rounded-full hover:bg-white/[0.08]"
            >
              <X size={20} />
            </button>

            <form onSubmit={handleSaveSeoSetting} className="p-8 sm:p-12 text-left flex flex-col gap-5 max-h-[85vh] overflow-y-auto w-full max-w-[600px]">
              <h2 className="text-xl font-bold font-headline text-zinc-200 border-b border-white/8 pb-3">
                Configure SEO Node: <span className="text-cyanCustom uppercase">{editingSeoSettingItem.key}</span>
              </h2>

              {editingSeoSettingItem.key === 'robots' || editingSeoSettingItem.key === 'sitemap' ? (
                <div>
                  <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5">
                    {editingSeoSettingItem.key.toUpperCase()} Payload Content
                  </label>
                  <textarea 
                    required 
                    rows={12}
                    placeholder={`Provide raw ${editingSeoSettingItem.key === 'robots' ? 'robots.txt' : 'sitemap.xml'} content...`}
                    value={editingSeoSettingItem.content || ''}
                    onChange={(e) => setEditingSeoSettingItem(prev => ({ ...prev, content: e.target.value }))}
                    className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2.5 text-zinc-100 text-sm font-mono resize-none"
                  />
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5">Page Title Tag</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g. IT Solutions Company in Delhi NCR | Kvantum Tech Solutions"
                      value={editingSeoSettingItem.title || ''}
                      onChange={(e) => setEditingSeoSettingItem(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2.5 text-zinc-100 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5">Meta Description</label>
                    <textarea 
                      required 
                      rows={3}
                      placeholder="Brief page meta description..."
                      value={editingSeoSettingItem.description || ''}
                      onChange={(e) => setEditingSeoSettingItem(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2.5 text-zinc-100 text-sm resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5">Meta Keywords</label>
                    <input 
                      type="text" 
                      placeholder="Comma separated: seo, dev, brand"
                      value={editingSeoSettingItem.keywords || ''}
                      onChange={(e) => setEditingSeoSettingItem(prev => ({ ...prev, keywords: e.target.value }))}
                      className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2.5 text-zinc-100 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5">JSON-LD Schema Markup (RAW JSON)</label>
                    <textarea 
                      rows={4}
                      placeholder='{"@context": "https://schema.org", ...}'
                      value={editingSeoSettingItem.schema || ''}
                      onChange={(e) => setEditingSeoSettingItem(prev => ({ ...prev, schema: e.target.value }))}
                      className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2.5 text-zinc-100 text-sm font-mono resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5">Other Custom Scripts/Meta (other)</label>
                    <textarea 
                      rows={4}
                      placeholder="<!-- Paste pixels, verification scripts, custom trackers here -->"
                      value={editingSeoSettingItem.other || ''}
                      onChange={(e) => setEditingSeoSettingItem(prev => ({ ...prev, other: e.target.value }))}
                      className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2.5 text-zinc-100 text-sm font-mono resize-none"
                    />
                  </div>
                </div>
              )}

            </form>
          </div>
        </div>
      )}

      {/* ================================== MODAL: AUTO-GENERATED SITEMAP XML ================================== */}
      {isSitemapModalOpen && (
        <div className="dialog-overlay" onClick={() => setIsSitemapModalOpen(false)}>
          <div className="dialog-content max-w-3xl" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setIsSitemapModalOpen(false)}
              className="absolute top-5 right-5 bg-white/[0.02] border border-white/8 text-zinc-100 p-2 rounded-full hover:bg-white/[0.08]"
            >
              <X size={20} />
            </button>

            <div className="p-8 sm:p-10 text-left flex flex-col gap-5">
              <div className="flex items-center justify-between border-b border-white/8 pb-4">
                <div>
                  <h2 className="text-xl font-bold font-headline text-zinc-100 flex items-center gap-2">
                    <Globe size={20} className="text-cyanCustom" /> Auto-Generated Sitemap.xml
                  </h2>
                  <p className="text-zinc-400 text-xs mt-1">
                    Copy this complete XML sitemap code and paste it into your sitemap setting or static file.
                  </p>
                </div>
                <Button
                  onClick={() => {
                    navigator.clipboard.writeText(generatedSitemapText);
                    setSitemapCopied(true);
                    setTimeout(() => setSitemapCopied(false), 2500);
                  }}
                  variant="primary"
                  className="gap-2 py-2 px-4 text-xs font-mono font-bold shrink-0"
                >
                  {sitemapCopied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  {sitemapCopied ? 'COPIED TO CLIPBOARD!' : 'COPY SITEMAP XML'}
                </Button>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-widest mb-1.5 font-bold">
                  Generated XML Code (Ready to Copy & Paste):
                </label>
                <textarea 
                  readOnly 
                  rows={14}
                  value={generatedSitemapText}
                  className="w-full bg-slate-950 border border-white/10 rounded-2xl p-4 text-cyan-300 font-mono text-xs leading-relaxed outline-none select-all resize-none"
                />
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/8">
                <span className="text-[11px] font-mono text-zinc-500">
                  Total indexed routes: {(generatedSitemapText.match(/<url>/g) || []).length} URLs
                </span>
                <Button 
                  onClick={async () => {
                    try {
                      await seoService.updateSeoSetting('sitemap', { key: 'sitemap', content: generatedSitemapText });
                      alert('[SUCCESS] Sitemap.xml updated live!');
                      setIsSitemapModalOpen(false);
                    } catch (err) {
                      alert('[ERROR] Update failed: ' + err.message);
                    }
                  }}
                  variant="primary"
                  className="py-2.5 px-6 text-xs gap-2"
                >
                  <Save size={14} /> Save Directly to Sitemap Node
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

        </main>
      </div>
    </div>
  );
}
