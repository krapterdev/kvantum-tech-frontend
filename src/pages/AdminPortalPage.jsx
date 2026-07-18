import React, { useState, useEffect } from 'react';
import { 
  Plus, Edit2, Trash2, Save, X, Globe, Layers, BookOpen, Key, Link2, Eye, 
  UserCheck, Image, Copy, Check, UploadCloud, LogOut, Lock, Mail, FileText, CheckCircle2 
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

export default function AdminPortalPage({ 
  services = [], setServices, 
  blogs = [], setBlogs, 
  seoPages = [], setSeoPages 
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
  const [seoSettings, setSeoSettings] = useState([]);
  const [isEditingSeoSetting, setIsEditingSeoSetting] = useState(false);
  const [editingSeoSettingItem, setEditingSeoSettingItem] = useState(null);

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
      setLeads(data);
    } catch (err) {
      console.warn('[ADMIN PORTAL] Leads fetch failed or unauthorized.');
    }
  };

  const fetchAssetsList = async () => {
    try {
      const data = await assetService.listAssets();
      setAssets(data);
    } catch (err) {
      console.warn('[ADMIN PORTAL] Assets fetch failed or unauthorized.');
    }
  };

  const fetchUsersList = async () => {
    try {
      const data = await userService.listUsers();
      setUsersList(data);
    } catch (err) {
      console.warn('[ADMIN PORTAL] Users fetch failed or unauthorized.');
    }
  };

  const fetchSeoSettingsList = async () => {
    try {
      const data = await seoService.getSeoSettings();
      setSeoSettings(data);
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

  // Open editor panels
  const openEditor = (type, item = null) => {
    setEditType(type);
    setIsEditing(true);
    if (item) {
      setEditItem({ ...item });
    } else {
      if (type === 'service') {
        setEditItem({ id: '', iconName: 'Code', title: '', shortDesc: '', longDesc: '', color: '#00d2ff', techStack: '', metrics: '' });
      } else if (type === 'blog') {
        setEditItem({ id: '', category: 'AI & Chatbots', title: '', summary: '', content: '', readTime: '5 min read', date: new Date().toLocaleDateString() });
      } else if (type === 'seo') {
        setEditItem({ slug: '', title: '', content: '', metaTitle: '', metaDesc: '', metaKeywords: '' });
      }
    }
  };

  // Save changes
  const handleSaveItem = async (e) => {
    e.preventDefault();
    try {
      if (editType === 'service') {
        if (services.some(s => s.id === editItem.id)) {
          // Update
          await serviceService.updateService(editItem.id, editItem);
          setServices(prev => prev.map(s => s.id === editItem.id ? editItem : s));
        } else {
          // Create
          await serviceService.createService(editItem);
          setServices(prev => [...prev, editItem]);
        }
      } else if (editType === 'blog') {
        const payloadId = editItem.id || slugify(editItem.title);
        const completeItem = { ...editItem, id: payloadId };
        
        if (blogs.some(b => b.id === completeItem.id)) {
          await blogService.updateBlog(completeItem.id, completeItem);
          setBlogs(prev => prev.map(b => b.id === completeItem.id ? completeItem : b));
        } else {
          await blogService.createBlog(completeItem);
          setBlogs(prev => [...prev, completeItem]);
        }
      } else if (editType === 'seo') {
        if (seoPages.some(p => p.slug === editItem.slug)) {
          await seoService.updateSeoPage(editItem.slug, editItem);
          setSeoPages(prev => prev.map(p => p.slug === editItem.slug ? editItem : p));
        } else {
          await seoService.createSeoPage(editItem);
          setSeoPages(prev => [...prev, editItem]);
        }
      }
      alert('[SUCCESS] Database record synchronized.');
      setIsEditing(false);
      setEditItem(null);
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

  // If user is not logged in, render the login panel
  if (!currentUser) {
    return (
      <div className="container mx-auto max-w-[1280px] px-6 py-20 relative z-10 flex flex-col items-center select-none text-left">
        <Badge className="mb-4">CMS Gateway</Badge>
        
        <Card className="w-full max-w-[420px] p-10 border shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
          <div className="flex flex-col gap-6">
            <div className="text-center">
              <Lock size={36} className="text-cyanCustom mx-auto mb-4" />
              <h2 className="text-zinc-100 text-xl font-bold font-headline">Secure Handshake Console</h2>
              <p className="text-zinc-500 text-xs mt-1.5 font-sans leading-relaxed">
                Provide database administrative credentials to open management ports.
              </p>
            </div>

            <form onSubmit={handleLoginSubmit} className="flex flex-col gap-5">
              <div>
                <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-2">
                  System E-Mail Address
                </label>
                <input 
                  type="email" 
                  required
                  placeholder="e.g. admin@kvantumtech.com"
                  value={loginData.email}
                  onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-3 text-zinc-100 text-sm placeholder-zinc-600 outline-none focus:border-cyanCustom/40 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-2">
                  Access Key Passcode
                </label>
                <input 
                  type="password" 
                  required
                  placeholder="••••••••••••"
                  value={loginData.password}
                  onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-3 text-zinc-100 text-sm placeholder-zinc-600 outline-none focus:border-cyanCustom/40 transition-colors"
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
            </form>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-[1280px] px-6 py-12 relative z-10 select-none text-left">
      
      {/* Console Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 pb-6 border-b border-white/8 gap-4">
        <div>
          <Badge className="mb-2">Admin Panel Active</Badge>
          <h1 className="text-3xl font-headline font-bold text-zinc-100">
            Console <GradientText>Control</GradientText>
          </h1>
          <span className="text-zinc-500 text-xs font-mono block mt-1 uppercase">
            OPERATOR: {currentUser.name} | Role: <span className="text-cyanCustom">{currentUser.role}</span>
          </span>
        </div>
        
        <Button 
          onClick={handleLogout} 
          variant="secondary"
          className="gap-2 px-4 py-2.5 rounded-lg text-xs hover:border-red-500/30 hover:text-red-400"
        >
          <LogOut size={13} /> Terminate Port Sync
        </Button>
      </div>

      {/* Tabs Switcher Navigation */}
      <div className="flex flex-wrap gap-2 mb-10 border-b border-white/8 pb-4">
        
        {/* Leads: accessible to admin & sales */}
        {(currentUser.role === 'admin' || currentUser.role === 'sales') && (
          <button
            onClick={() => setActiveTab('leads')}
            className={`px-5 py-3.5 rounded-xl text-sm font-semibold tracking-wide border transition-all duration-200 cursor-pointer ${
              activeTab === 'leads' 
                ? 'bg-cyanCustom/10 text-cyanCustom border-cyanCustom/30 shadow-[0_0_10px_rgba(0,210,255,0.15)]' 
                : 'bg-zinc-900/40 text-zinc-400 border-white/8 hover:text-zinc-100'
            }`}
          >
            Leads CRM
          </button>
        )}

        {/* CMS: accessible to admin & seo */}
        {(currentUser.role === 'admin' || currentUser.role === 'seo') && (
          <>
            <button
              onClick={() => setActiveTab('services')}
              className={`px-5 py-3.5 rounded-xl text-sm font-semibold tracking-wide border transition-all duration-200 cursor-pointer ${
                activeTab === 'services' 
                  ? 'bg-cyanCustom/10 text-cyanCustom border-cyanCustom/30 shadow-[0_0_10px_rgba(0,210,255,0.15)]' 
                  : 'bg-zinc-900/40 text-zinc-400 border-white/8 hover:text-zinc-100'
              }`}
            >
              Services CMS
            </button>
            <button
              onClick={() => setActiveTab('blogs')}
              className={`px-5 py-3.5 rounded-xl text-sm font-semibold tracking-wide border transition-all duration-200 cursor-pointer ${
                activeTab === 'blogs' 
                  ? 'bg-cyanCustom/10 text-cyanCustom border-cyanCustom/30 shadow-[0_0_10px_rgba(0,210,255,0.15)]' 
                  : 'bg-zinc-900/40 text-zinc-400 border-white/8 hover:text-zinc-100'
              }`}
            >
              Blogs CMS
            </button>
            <button
              onClick={() => setActiveTab('seo')}
              className={`px-5 py-3.5 rounded-xl text-sm font-semibold tracking-wide border transition-all duration-200 cursor-pointer ${
                activeTab === 'seo' 
                  ? 'bg-cyanCustom/10 text-cyanCustom border-cyanCustom/30 shadow-[0_0_10px_rgba(0,210,255,0.15)]' 
                  : 'bg-zinc-900/40 text-zinc-400 border-white/8 hover:text-zinc-100'
              }`}
            >
              Programmatic SEO
            </button>
            <button
              onClick={() => setActiveTab('assets')}
              className={`px-5 py-3.5 rounded-xl text-sm font-semibold tracking-wide border transition-all duration-200 cursor-pointer ${
                activeTab === 'assets' 
                  ? 'bg-cyanCustom/10 text-cyanCustom border-cyanCustom/30 shadow-[0_0_10px_rgba(0,210,255,0.15)]' 
                  : 'bg-zinc-900/40 text-zinc-400 border-white/8 hover:text-zinc-100'
              }`}
            >
              Media Assets [S3]
            </button>
          </>
        )}

        {/* Staff accounts management: accessible to admin only */}
        {currentUser.role === 'admin' && (
          <button
            onClick={() => setActiveTab('users')}
            className={`px-5 py-3.5 rounded-xl text-sm font-semibold tracking-wide border transition-all duration-200 cursor-pointer ${
              activeTab === 'users' 
                ? 'bg-purpleCustom/15 text-purpleCustom border-purpleCustom/35 shadow-[0_0_10px_rgba(138,43,226,0.2)]' 
                : 'bg-zinc-900/40 text-zinc-400 border-white/8 hover:text-zinc-100'
            }`}
          >
            Staff Accounts
          </button>
        )}

      </div>

      {/* ================================== TAB: LEADS CRM ================================== */}
      {activeTab === 'leads' && (currentUser.role === 'admin' || currentUser.role === 'sales') && (
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
                {leads.length > 0 ? (
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
      )}

      {/* ================================== TAB: SERVICES CMS ================================== */}
      {activeTab === 'services' && (currentUser.role === 'admin' || currentUser.role === 'seo') && (
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
            {services.map(ser => (
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
      )}

      {/* ================================== TAB: BLOGS CMS ================================== */}
      {activeTab === 'blogs' && (currentUser.role === 'admin' || currentUser.role === 'seo') && (
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
      )}

      {/* ================================== TAB: PROGRAMMATIC SEO ================================== */}
      {activeTab === 'seo' && (currentUser.role === 'admin' || currentUser.role === 'seo') && (
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
          <div className="flex flex-col gap-6">
            <h2 className="text-xl font-bold font-headline text-zinc-200 flex items-center gap-2 border-t border-white/8 pt-8">
              <Key size={18} className="text-purpleCustom" /> Dynamic SEO Configurations (Robots, Sitemap, Page Meta)
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {seoSettings.map(setting => (
                <Card key={setting.key} className="p-6 border flex flex-col justify-between items-start gap-4">
                  <div className="text-left w-full">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-800 text-zinc-300 font-bold uppercase block w-fit mb-3">
                      {setting.key}
                    </span>
                    {setting.key === 'robots' || setting.key === 'sitemap' ? (
                      <div className="text-xs text-zinc-400 font-mono truncate w-full">
                        {setting.content ? setting.content.substring(0, 100) : 'Standard defaults active'}
                      </div>
                    ) : (
                      <div className="flex flex-col gap-1">
                        <h4 className="text-zinc-200 text-sm font-semibold truncate">{setting.title || 'Untitled Page'}</h4>
                        <p className="text-zinc-400 text-xs truncate">{setting.description || 'No description'}</p>
                      </div>
                    )}
                  </div>
                  
                  <Button 
                    onClick={() => {
                      setEditingSeoSettingItem({ ...setting });
                      setIsEditingSeoSetting(true);
                    }}
                    variant="secondary"
                    className="w-full py-2 text-xs rounded-lg mt-2"
                  >
                    Configure Node
                  </Button>
                </Card>
              ))}
            </div>
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
            {assets.map((asset, idx) => (
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
                    placeholder="e.g. seo@kvantumtech.com"
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
                  {usersList.map(usr => (
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

      {/* ================================== MODAL: DYNAMIC CRUD EDITOR ================================== */}
      {isEditing && editItem && (
        <div className="dialog-overlay" onClick={() => setIsEditing(false)}>
          <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setIsEditing(false)}
              className="absolute top-5 right-5 bg-white/[0.02] border border-white/8 text-zinc-100 p-2 rounded-full hover:bg-white/[0.08]"
            >
              <X size={20} />
            </button>

            <form onSubmit={handleSaveItem} className="p-8 sm:p-12 text-left flex flex-col gap-6 max-h-[85vh] overflow-y-auto">
              <h2 className="text-xl font-bold font-headline text-zinc-200 border-b border-white/8 pb-3">
                {editItem._id || editItem.id || editItem.slug ? 'Sync Existing Database Node' : 'Initialize New Database Node'}
              </h2>

              {/* SERVICE EDITOR */}
              {editType === 'service' && (
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5">Identifier ID Key</label>
                      <input 
                        type="text" 
                        required 
                        disabled={!!editItem._id}
                        placeholder="e.g. mobile-apps"
                        value={editItem.id}
                        onChange={(e) => setEditItem(prev => ({ ...prev, id: e.target.value }))}
                        className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2.5 text-zinc-100 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5">Title Name</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="e.g. Mobile Applications"
                        value={editItem.title}
                        onChange={(e) => setEditItem(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2.5 text-zinc-100 text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5">Lucide Icon Class</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="e.g. Smartphone, Code, Layers"
                        value={editItem.iconName}
                        onChange={(e) => setEditItem(prev => ({ ...prev, iconName: e.target.value }))}
                        className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2.5 text-zinc-100 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5">Display Color Code</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="e.g. #00d2ff or var(--accent-cyan)"
                        value={editItem.color}
                        onChange={(e) => setEditItem(prev => ({ ...prev, color: e.target.value }))}
                        className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2.5 text-zinc-100 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5">Short Card Description</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="Brief card tagline..."
                      value={editItem.shortDesc}
                      onChange={(e) => setEditItem(prev => ({ ...prev, shortDesc: e.target.value }))}
                      className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2.5 text-zinc-100 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5">Detailed Long Description</label>
                    <textarea 
                      required 
                      rows={4}
                      placeholder="Complete service blueprints..."
                      value={editItem.longDesc}
                      onChange={(e) => setEditItem(prev => ({ ...prev, longDesc: e.target.value }))}
                      className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2.5 text-zinc-100 text-sm resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5">Tech Stack Nodes</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="Comma separated: React, Expo, SQLite"
                        value={editItem.techStack}
                        onChange={(e) => setEditItem(prev => ({ ...prev, techStack: e.target.value }))}
                        className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2.5 text-zinc-100 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5">Target Success Metric</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="e.g. Sub-12ms processing latency"
                        value={editItem.metrics}
                        onChange={(e) => setEditItem(prev => ({ ...prev, metrics: e.target.value }))}
                        className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2.5 text-zinc-100 text-sm"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* BLOG EDITOR */}
              {editType === 'blog' && (
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5">URL Identifier Slug</label>
                      <input 
                        type="text" 
                        required 
                        disabled={!!editItem._id}
                        placeholder="e.g. nextjs-seo-guide"
                        value={editItem.id}
                        onChange={(e) => setEditItem(prev => ({ ...prev, id: slugify(e.target.value) }))}
                        className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2.5 text-zinc-100 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5">Display Category</label>
                      <select 
                        value={editItem.category}
                        onChange={(e) => setEditItem(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full bg-zinc-950 border border-white/8 rounded-xl px-4 py-2.5 text-zinc-100 text-sm"
                      >
                        <option value="AI & Chatbots">AI & Chatbots</option>
                        <option value="SEO & Marketing">SEO & Marketing</option>
                        <option value="Web & App Dev">Web & App Dev</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5">Document Title</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="Title of the article..."
                      value={editItem.title}
                      onChange={(e) => setEditItem(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2.5 text-zinc-100 text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5">Read Time Estimation</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="e.g. 5 min read"
                        value={editItem.readTime}
                        onChange={(e) => setEditItem(prev => ({ ...prev, readTime: e.target.value }))}
                        className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2.5 text-zinc-100 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5">Date Node</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="e.g. 18/07/2026"
                        value={editItem.date}
                        onChange={(e) => setEditItem(prev => ({ ...prev, date: e.target.value }))}
                        className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2.5 text-zinc-100 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5">Brief Summary</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="One sentence description of the content..."
                      value={editItem.summary}
                      onChange={(e) => setEditItem(prev => ({ ...prev, summary: e.target.value }))}
                      className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2.5 text-zinc-100 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5">Document Body Content (Markdown Supported)</label>
                    <textarea 
                      required 
                      rows={6}
                      placeholder="Write article details using Markdown headers (##), blocks (>), lists (*)..."
                      value={editItem.content}
                      onChange={(e) => setEditItem(prev => ({ ...prev, content: e.target.value }))}
                      className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2.5 text-zinc-100 text-sm font-sans resize-none"
                    />
                  </div>
                </div>
              )}

              {/* SEO PAGE EDITOR */}
              {editType === 'seo' && (
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5">Landing Page Title</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="e.g. Best SEO in India"
                        value={editItem.title}
                        onChange={(e) => handleSeoTitleChange(e.target.value)}
                        className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2.5 text-zinc-100 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5">URL Target Slug</label>
                      <input 
                        type="text" 
                        required 
                        disabled={!!editItem._id}
                        placeholder="e.g. best-seo-in-india"
                        value={editItem.slug}
                        onChange={(e) => setEditItem(prev => ({ ...prev, slug: slugify(e.target.value) }))}
                        className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2.5 text-zinc-100 text-sm font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5">Google SERP Meta Title</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="Title tag displayed on search engines..."
                      value={editItem.metaTitle}
                      onChange={(e) => setEditItem(prev => ({ ...prev, metaTitle: e.target.value }))}
                      className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2.5 text-zinc-100 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5">Google SERP Meta Description</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="Snippet description displayed on search results..."
                      value={editItem.metaDesc}
                      onChange={(e) => setEditItem(prev => ({ ...prev, metaDesc: e.target.value }))}
                      className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2.5 text-zinc-100 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5">Meta Keywords</label>
                    <input 
                      type="text" 
                      placeholder="Comma separated: seo, best web developer, Noida"
                      value={editItem.metaKeywords}
                      onChange={(e) => setEditItem(prev => ({ ...prev, metaKeywords: e.target.value }))}
                      className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2.5 text-zinc-100 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5">Landing Page Description Content</label>
                    <textarea 
                      required 
                      rows={5}
                      placeholder="Provide full description paragraphs (separate paragraphs with double-newlines)..."
                      value={editItem.content}
                      onChange={(e) => setEditItem(prev => ({ ...prev, content: e.target.value }))}
                      className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2.5 text-zinc-100 text-sm resize-none"
                    />
                  </div>
                </div>
              )}

              <Button type="submit" variant="primary" className="py-3 mt-2">
                <Save size={16} /> Synchronize Node Data
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* ================================== MODAL: CRM TRACE & EDIT ================================== */}
      {isEditingCRM && crmItem && (
        <div className="dialog-overlay" onClick={() => setIsEditingCRM(false)}>
          <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setIsEditingCRM(false)}
              className="absolute top-5 right-5 bg-white/[0.02] border border-white/8 text-zinc-100 p-2 rounded-full hover:bg-white/[0.08]"
            >
              <X size={20} />
            </button>

            <form onSubmit={handleCRMUpdate} className="p-8 sm:p-12 text-left flex flex-col gap-5">
              <h2 className="text-xl font-bold font-headline text-zinc-200 border-b border-white/8 pb-3">
                Trace Lead Signal Parameters
              </h2>

              <div className="bg-zinc-950/60 p-4 rounded-xl border border-white/5 font-mono text-xs flex flex-col gap-2.5 text-zinc-400">
                <div><span className="text-zinc-500">CLIENT_ID:</span> {crmItem._id}</div>
                <div><span className="text-zinc-500">NAME:</span> {crmItem.name}</div>
                <div><span className="text-zinc-500">EMAIL:</span> {crmItem.email}</div>
                <div><span className="text-zinc-500">SERVICE:</span> {crmItem.service.toUpperCase()}</div>
                <div>
                  <span className="text-zinc-500 block mb-1">PAYLOAD_MESSAGE:</span>
                  <div className="bg-black/40 p-3 rounded border border-white/5 font-sans leading-relaxed text-zinc-300 whitespace-pre-wrap">
                    {crmItem.message}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5">CRM Telemetry Status</label>
                <select 
                  value={crmItem.status}
                  onChange={(e) => setCrmItem(prev => ({ ...prev, status: e.target.value }))}
                  className="w-full bg-zinc-950 border border-white/8 rounded-xl px-4 py-2.5 text-zinc-100 text-sm"
                >
                  <option value="New">New (Pending Action)</option>
                  <option value="Contacted">Contacted (E-Mail Transmitted)</option>
                  <option value="In-Progress">In-Progress (Design / Call active)</option>
                  <option value="Closed">Closed (Handshake Complete)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5">Action logs / Quality notes</label>
                <textarea 
                  rows={3}
                  placeholder="e.g. Shared portfolio links via mail. Scheduled meeting."
                  value={crmItem.notes || ''}
                  onChange={(e) => setCrmItem(prev => ({ ...prev, notes: e.target.value }))}
                  className="w-full bg-zinc-950/40 border border-white/8 rounded-xl px-4 py-2.5 text-zinc-100 text-sm resize-none"
                />
              </div>

              <Button type="submit" variant="primary" className="py-3 mt-2">
                Save CRM Adjustments
              </Button>
            </form>
          </div>
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

    </div>
  );
}
