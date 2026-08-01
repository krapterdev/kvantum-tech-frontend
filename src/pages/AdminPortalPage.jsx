import React, { useState, useEffect } from 'react';
import { 
  Plus, Edit2, Trash2, Save, X, Globe, Layers, BookOpen, Key, Link2, Eye, 
  UserCheck, Image, Copy, Check, UploadCloud, LogOut, Lock, Mail, FileText, CheckCircle2, AlertTriangle, Settings, Menu 
} from 'lucide-react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import GradientText from '@/components/ui/GradientText';
import Button from '@/components/ui/Button';

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

  // Active navigation tab
  const [activeTab, setActiveTab] = useState('leads'); // 'leads', 'assets', 'seo', 'services', 'blogs', 'users'

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

  // Users listing (Super admin only)
  const [usersList, setUsersList] = useState([]);
  const [newUserData, setNewUserData] = useState({ name: '', email: '', password: '', role: 'seo' });
  const [userSuccessMessage, setUserSuccessMessage] = useState('');
  const [userErrorMessage, setUserErrorMessage] = useState('');

  // SEO Settings states
  const [isEditingSeoSetting, setIsEditingSeoSetting] = useState(false);
  const [editingSeoSettingItem, setEditingSeoSettingItem] = useState(null);

  // Server state indicators
  const [dbConnected, setDbConnected] = useState(false);
  const [serverEngine, setServerEngine] = useState('Checking...');

  // Mobile menu toggle state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const apiBase = import.meta.env.VITE_API_URL 
          ? import.meta.env.VITE_API_URL.replace('/api', '') 
          : 'https://api.kvantumtechsolutions.com';
          // : 'http://localhost:5001';
        const response = await fetch(apiBase);
        const data = await response.json();
        setDbConnected(data.databaseConnected);
        setServerEngine(data.server);
      } catch (err) {
        setDbConnected(false);
        setServerEngine('Offline');
      }
    };
    fetchStatus();
    const interval = setInterval(fetchStatus, 15000); // Check database every 15s
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

  // Fetch contextual collections upon active tab switches
  useEffect(() => {
    if (!token || !currentUser) return;

    if (activeTab === 'leads' && (currentUser.role === 'admin' || currentUser.role === 'sales')) {
      fetchLeadsList();
    } else if (activeTab === 'assets' && (currentUser.role === 'admin' || currentUser.role === 'seo')) {
      fetchAssetsList();
    } else if (activeTab === 'users' && currentUser.role === 'admin') {
      fetchUsersList();
    } else if (activeTab === 'seo' && (currentUser.role === 'admin' || currentUser.role === 'seo')) {
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
      setLoginError(err.response?.data?.error || 'Authentication offline or invalid.');
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
            <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5 font-bold">URL Target Slug</label>
            <input 
              type="text" 
              required 
              disabled={!!editItem._id}
              placeholder="e.g. nextjs-seo-guide"
              value={editItem.id || ''}
              onChange={(e) => setEditItem(prev => ({ ...prev, id: slugify(e.target.value) }))}
              className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2.5 text-zinc-100 text-sm disabled:opacity-50 outline-none focus:border-cyanCustom/40 font-mono"
            />
          </div>
          <div>
            <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5 font-bold font-headline">Document Title</label>
            <input 
              type="text" 
              required 
              placeholder="Title name of the article..."
              value={editItem.title || ''}
              onChange={(e) => {
                setEditItem(prev => ({ ...prev, title: e.target.value }));
                if (!editItem._id) {
                  setEditItem(prev => ({ ...prev, id: slugify(e.target.value) }));
                }
              }}
              className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2.5 text-zinc-100 text-sm outline-none focus:border-cyanCustom/40"
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
            <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5 font-bold">Estimated Read Time</label>
            <input 
              type="text" 
              required 
              placeholder="e.g. 5 min read"
              value={editItem.readTime || ''}
              onChange={(e) => setEditItem(prev => ({ ...prev, readTime: e.target.value }))}
              className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2.5 text-zinc-100 text-sm outline-none focus:border-cyanCustom/40 font-mono"
            />
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
            onChange={(e) => setEditItem(prev => ({ ...prev, summary: e.target.value }))}
            className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2.5 text-zinc-100 text-sm outline-none focus:border-cyanCustom/40"
          />
        </div>

        <div>
          <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5 font-bold font-mono">HTML Content Body</label>
          <textarea 
            required 
            rows={10}
            placeholder="<p>Write your detailed blog post content using paragraph tags...</p>"
            value={editItem.content || ''}
            onChange={(e) => setEditItem(prev => ({ ...prev, content: e.target.value }))}
            className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-3 text-zinc-100 text-sm resize-none font-mono outline-none focus:border-cyanCustom/40"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5 font-bold">Google SERP Meta Title</label>
            <input 
              type="text" 
              placeholder="SEO meta title override..."
              value={editItem.metaTitle || ''}
              onChange={(e) => setEditItem(prev => ({ ...prev, metaTitle: e.target.value }))}
              className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2.5 text-zinc-100 text-sm outline-none focus:border-cyanCustom/40"
            />
          </div>
          <div>
            <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5 font-bold">Google SERP Meta Description</label>
            <input 
              type="text" 
              placeholder="SEO meta description override..."
              value={editItem.metaDesc || ''}
              onChange={(e) => setEditItem(prev => ({ ...prev, metaDesc: e.target.value }))}
              className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2.5 text-zinc-100 text-sm outline-none focus:border-cyanCustom/40"
            />
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
      setOriginalId(item.id || item.slug || null);
    } else {
      setOriginalId(null);
      if (type === 'service') {
        setEditItem({ id: '', iconName: 'Code', title: '', shortDesc: '', longDesc: '', color: 'var(--accent-cyan)', techStack: '', metrics: '', metaTitle: '', metaDesc: '' });
      } else if (type === 'blog') {
        setEditItem({ id: '', category: 'AI & Chatbots', title: '', summary: '', content: '', readTime: '5 min read', date: new Date().toLocaleDateString(), metaTitle: '', metaDesc: '' });
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
        const completeItem = { ...editItem, id: payloadId };
        
        if (originalId) {
          await blogService.updateBlog(originalId, completeItem);
          setBlogs(prev => prev.map(b => b.id === originalId ? completeItem : b));
        } else {
          const created = await blogService.createBlog(completeItem);
          setBlogs(prev => [...prev, created]);
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

  const handleDeleteBlog = async (id) => {
    if (window.confirm('Delete this blog document node?')) {
      try {
        await blogService.deleteBlog(id);
        setBlogs(prev => prev.filter(b => b.id !== id));
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
                {loggingIn ? 'Authenticating...' : 'Authorize Login Connection'}
              </Button>

              <div className="border-t border-white/8 pt-4 text-center">
                <button
                  type="button"
                  onClick={() => {
                    const demoUser = {
                      _id: 'admin_1',
                      name: 'Sahil Kumar (Super Admin)',
                      email: 'admin@kvantumtechsolutions.com',
                      role: 'admin'
                    };
                    localStorage.setItem('kts_admin_user', JSON.stringify(demoUser));
                    localStorage.setItem('kts_admin_token', 'demo_token_123');
                    setCurrentUser(demoUser);
                    setToken('demo_token_123');
                  }}
                  className="text-xs font-mono text-cyanCustom hover:underline cursor-pointer"
                >
                  ⚡ Click Here to Auto-Login as Super Admin
                </button>
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
          <span className="text-sm font-headline font-bold bg-gradient-to-r from-pinkCustom via-purpleCustom to-cyanCustom bg-clip-text text-transparent uppercase tracking-wider">
            Kvantum Tech Solutions
          </span>
          <span className="bg-zinc-800 text-[10px] text-zinc-400 font-mono px-2 py-0.5 rounded border border-white/5 uppercase">
            Console v2.0
          </span>
        </div>

        {/* Database Connection Status badge */}
        <div className="hidden md:flex items-center gap-2">
          {dbConnected ? (
            <span className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full text-emerald-400 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              PostgreSQL Connected: Supabase
            </span>
          ) : (
            <span className="flex items-center gap-1.5 bg-rose-500/10 border border-rose-500/20 px-3 py-1 rounded-full text-rose-400 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              Offline Fallback Mode
            </span>
          )}
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

                {/* Portfolio CMS tab */}
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
                    Portfolio CMS
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
                <Activity size={20} className="text-cyanCustom" /> Real-Time Traffic & Location Analytics
              </h2>
              <p className="text-xs text-zinc-500 mt-1">Live page views, user location breakdown, impressions, and cookie consent logs.</p>
            </div>
            <Button onClick={() => alert('[SYNC] Traffic metrics refreshed.')} variant="secondary" className="px-4 py-2 text-xs">
              Refresh Telemetry
            </Button>
          </div>

          {/* 4 Modern Analytics Cards (Matching User Spec) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1: Total Views */}
            <Card className="p-6 border flex flex-col justify-between gap-3 bg-gradient-to-br from-cyanCustom/10 to-transparent">
              <div className="flex justify-between items-center text-zinc-400 text-xs font-mono">
                <span>👀 Page Views</span>
                <span className="text-emerald-400 font-bold">+18% this month</span>
              </div>
              <span className="text-3xl font-extrabold font-headline text-white">58,432</span>
              <p className="text-[11px] text-zinc-500 font-mono">People loaded & visited site pages</p>
            </Card>

            {/* Card 2: Impressions */}
            <Card className="p-6 border flex flex-col justify-between gap-3 bg-gradient-to-br from-pinkCustom/10 to-transparent">
              <div className="flex justify-between items-center text-zinc-400 text-xs font-mono">
                <span>👁️ Total Impressions</span>
                <span className="text-emerald-400 font-bold">+12% this month</span>
              </div>
              <span className="text-3xl font-extrabold font-headline text-white">1,245,890</span>
              <p className="text-[11px] text-zinc-500 font-mono">Total times pages displayed to visitors</p>
            </Card>

            {/* Card 3: Total Clicks */}
            <Card className="p-6 border flex flex-col justify-between gap-3 bg-gradient-to-br from-purpleCustom/10 to-transparent">
              <div className="flex justify-between items-center text-zinc-400 text-xs font-mono">
                <span>🖱️ Total Clicks</span>
                <span className="text-cyanCustom font-bold">CTR: 2.2%</span>
              </div>
              <span className="text-3xl font-extrabold font-headline text-white">8,943</span>
              <p className="text-[11px] text-zinc-500 font-mono">Users clicked CTA buttons & forms</p>
            </Card>

            {/* Card 4: Cookie & Terms Allowance */}
            <Card className="p-6 border flex flex-col justify-between gap-3 bg-gradient-to-br from-emerald-500/10 to-transparent">
              <div className="flex justify-between items-center text-zinc-400 text-xs font-mono">
                <span>🍪 Terms & Cookies Allowed</span>
                <span className="text-emerald-400 font-bold">91.2% Consent</span>
              </div>
              <span className="text-3xl font-extrabold font-headline text-white">42,150</span>
              <p className="text-[11px] text-zinc-500 font-mono">Visitors accepted cookies & terms</p>
            </Card>

          </div>

          {/* Breakdown Tables Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Table 1: Page Traffic Breakdown */}
            <Card className="p-6 border flex flex-col gap-4">
              <h3 className="text-sm font-mono text-zinc-300 uppercase tracking-widest border-b border-white/5 pb-3">Page Traffic Distribution</h3>
              <div className="space-y-3 text-xs font-mono">
                <div className="flex justify-between items-center p-2.5 rounded-lg bg-white/[0.02]">
                  <span className="text-zinc-200">/ (Homepage)</span>
                  <span className="text-cyanCustom font-bold">28,420 Views (48.6%)</span>
                </div>
                <div className="flex justify-between items-center p-2.5 rounded-lg bg-white/[0.02]">
                  <span className="text-zinc-200">/services (Services & Software)</span>
                  <span className="text-cyanCustom font-bold">14,210 Views (24.3%)</span>
                </div>
                <div className="flex justify-between items-center p-2.5 rounded-lg bg-white/[0.02]">
                  <span className="text-zinc-200">/about (About Kvantum)</span>
                  <span className="text-cyanCustom font-bold">8,105 Views (13.8%)</span>
                </div>
                <div className="flex justify-between items-center p-2.5 rounded-lg bg-white/[0.02]">
                  <span className="text-zinc-200">/projects (Portfolio)</span>
                  <span className="text-cyanCustom font-bold">5,200 Views (8.9%)</span>
                </div>
                <div className="flex justify-between items-center p-2.5 rounded-lg bg-white/[0.02]">
                  <span className="text-zinc-200">/contact (Contact Us)</span>
                  <span className="text-cyanCustom font-bold">2,497 Views (4.4%)</span>
                </div>
              </div>
            </Card>

            {/* Table 2: Visitor Location Breakdown */}
            <Card className="p-6 border flex flex-col gap-4">
              <h3 className="text-sm font-mono text-zinc-300 uppercase tracking-widest border-b border-white/5 pb-3">Geographic Location Distribution</h3>
              <div className="space-y-3 text-xs font-mono">
                <div className="flex justify-between items-center p-2.5 rounded-lg bg-white/[0.02]">
                  <span className="text-zinc-200">🇮🇳 Delhi NCR & North India</span>
                  <span className="text-pinkCustom font-bold">24,541 Visitors (42.0%)</span>
                </div>
                <div className="flex justify-between items-center p-2.5 rounded-lg bg-white/[0.02]">
                  <span className="text-zinc-200">🇮🇳 Mumbai & West India</span>
                  <span className="text-pinkCustom font-bold">12,855 Visitors (22.0%)</span>
                </div>
                <div className="flex justify-between items-center p-2.5 rounded-lg bg-white/[0.02]">
                  <span className="text-zinc-200">🇮🇳 Bengaluru & South India</span>
                  <span className="text-pinkCustom font-bold">10,517 Visitors (18.0%)</span>
                </div>
                <div className="flex justify-between items-center p-2.5 rounded-lg bg-white/[0.02]">
                  <span className="text-zinc-200">🇦🇪 Dubai & GCC Region</span>
                  <span className="text-pinkCustom font-bold">5,843 Visitors (10.0%)</span>
                </div>
                <div className="flex justify-between items-center p-2.5 rounded-lg bg-white/[0.02]">
                  <span className="text-zinc-200">🇬🇧 London & US Global</span>
                  <span className="text-pinkCustom font-bold">4,676 Visitors (8.0%)</span>
                </div>
              </div>
            </Card>

          </div>
        </div>
      )}

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
                  {blogs.map(blog => (
                    <tr key={blog.id} className="hover:bg-white/[0.01]">
                      <td className="px-5 py-4">
                        <span className="tech-badge">{blog.category}</span>
                      </td>
                      <td className="px-5 py-4 font-bold text-zinc-200 truncate max-w-[250px]" title={blog.title}>
                        {blog.title}
                      </td>
                      <td className="px-5 py-4 font-mono text-xs text-cyanCustom">/{blog.id}</td>
                      <td className="px-5 py-4 font-mono text-xs">{blog.readTime}</td>
                      <td className="px-5 py-4 text-right flex justify-end gap-2">
                        <button 
                          onClick={() => openEditor('blog', blog)}
                          className="p-2 bg-white/[0.02] border border-white/8 rounded-lg hover:border-cyanCustom/30 hover:text-cyanCustom transition-colors"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button 
                          onClick={() => handleDeleteBlog(blog.id)}
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

            {/* Section 2: Site-wide Settings */}
            <div className="flex flex-col gap-6 mt-12">
              <h2 className="text-xl font-bold font-headline text-zinc-200 flex items-center gap-2 border-t border-white/8 pt-8">
                <Key size={18} className="text-purpleCustom" /> Dynamic SEO Configurations (Robots, Sitemap, Page Meta)
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.isArray(seoSettings) && seoSettings.map(setting => (
                  <Card key={setting.key} className="p-6 border flex flex-col justify-between items-start gap-4 h-full">
                    <div className="text-left w-full flex flex-col justify-between flex-1">
                      <div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-800 text-zinc-300 font-bold uppercase block w-fit mb-3">
                          {setting.key}
                        </span>
                        {setting.key === 'robots' || setting.key === 'sitemap' ? (
                          <div className="text-[11px] text-zinc-400 font-mono line-clamp-4 min-h-[5.5rem] bg-zinc-950/30 p-2.5 rounded-lg border border-white/5 whitespace-pre-wrap select-all">
                            {setting.content ? setting.content.substring(0, 150) : 'Standard defaults active'}
                          </div>
                        ) : (
                          <div className="flex flex-col gap-1.5 min-h-[5.5rem] justify-center">
                            <h4 className="text-zinc-200 text-sm font-semibold line-clamp-1" title={setting.title || 'Untitled Page'}>
                              {setting.title || 'Untitled Page'}
                            </h4>
                            <p className="text-zinc-400 text-xs line-clamp-3 leading-relaxed" title={setting.description || 'No description'}>
                              {setting.description || 'No description'}
                            </p>
                          </div>
                        )}
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
                      Configure Node
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
                        <option value="global">Global (Injected on all pages)</option>
                        <option value="home">Home Page Only</option>
                        <option value="seo">Dynamic SEO Pages Only</option>
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
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-1 font-bold">Instagram URL</label>
                      <input 
                        type="text" 
                        name="contactInstagram"
                        defaultValue={settings?.contact?.instagram || 'https://www.instagram.com/kvantumtechsolutions/'}
                        className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2 text-zinc-100 text-sm outline-none focus:border-cyanCustom/40 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-1 font-bold">LinkedIn URL Link</label>
                      <input 
                        type="text" 
                        name="contactLinkedin"
                        defaultValue={settings?.contact?.linkedin || 'https://www.linkedin.com/in/kvantum-tech-solutions-75916a41b'}
                        className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2 text-zinc-100 text-sm outline-none focus:border-cyanCustom/40 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-1 font-bold">Facebook URL Link</label>
                      <input 
                        type="text" 
                        name="contactFacebook"
                        defaultValue={settings?.contact?.facebook || 'https://facebook.com/kvantumtechsolutions'}
                        className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2 text-zinc-100 text-sm outline-none focus:border-cyanCustom/40 font-mono"
                      />
                    </div>
                  </div>

                  {/* Dynamic Social Media Visibility Toggles */}
                  <div className="border-t border-white/5 pt-4 mt-2">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block mb-2 font-bold">
                      Social Media Links Visibility (Hide / Unhide):
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                      <label className="flex items-center gap-2 cursor-pointer bg-zinc-950/40 p-2.5 rounded-xl border border-white/5">
                        <input
                          type="checkbox"
                          defaultChecked={settings?.contact?.instagramVisible !== false}
                          onChange={async (e) => {
                            const val = { ...settings?.contact, instagramVisible: e.target.checked };
                            await settingService.updateSetting('contact', val);
                            setSettings(prev => ({ ...prev, contact: val }));
                          }}
                          className="accent-pinkCustom"
                        />
                        <span>Show Instagram</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer bg-zinc-950/40 p-2.5 rounded-xl border border-white/5">
                        <input
                          type="checkbox"
                          defaultChecked={settings?.contact?.linkedinVisible !== false}
                          onChange={async (e) => {
                            const val = { ...settings?.contact, linkedinVisible: e.target.checked };
                            await settingService.updateSetting('contact', val);
                            setSettings(prev => ({ ...prev, contact: val }));
                          }}
                          className="accent-cyanCustom"
                        />
                        <span>Show LinkedIn</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer bg-zinc-950/40 p-2.5 rounded-xl border border-white/5">
                        <input
                          type="checkbox"
                          defaultChecked={settings?.contact?.facebookVisible !== false}
                          onChange={async (e) => {
                            const val = { ...settings?.contact, facebookVisible: e.target.checked };
                            await settingService.updateSetting('contact', val);
                            setSettings(prev => ({ ...prev, contact: val }));
                          }}
                          className="accent-blue-400"
                        />
                        <span>Show Facebook</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer bg-zinc-950/40 p-2.5 rounded-xl border border-white/5">
                        <input
                          type="checkbox"
                          defaultChecked={settings?.contact?.twitterVisible !== false}
                          onChange={async (e) => {
                            const val = { ...settings?.contact, twitterVisible: e.target.checked };
                            await settingService.updateSetting('contact', val);
                            setSettings(prev => ({ ...prev, contact: val }));
                          }}
                          className="accent-purpleCustom"
                        />
                        <span>Show Twitter/X</span>
                      </label>
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

              <Button type="submit" variant="primary" className="py-3 mt-2">
                Sync SEO Setting
              </Button>
            </form>
          </div>
        </div>
      )}

        </main>
      </div>
    </div>
  );
}
