'use client';

import React, { useState, useEffect, Component, ErrorInfo, ReactNode } from 'react';
import AdminPortalPage from '@/pages/AdminPortalPage';
import { fallbackServices } from '@/data/services';
import { fallbackBlogs } from '@/data/blogs';
import { fallbackSettings } from '@/data/settings';
import * as serviceService from '@/services/serviceService';
import * as blogService from '@/services/blogService';
import * as seoService from '@/services/seoService';
import * as settingService from '@/services/settingService';
import * as portfolioService from '@/services/portfolioService';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class AdminErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[ADMIN ERROR BOUNDARY]', error, errorInfo);
  }

  public handleReset = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('kts_admin_active_tab');
      localStorage.removeItem('kts_admin_user');
      localStorage.removeItem('kts_admin_token');
      window.location.href = '/admin';
    }
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#050811] flex items-center justify-center p-6 text-left text-white">
          <div className="max-w-md w-full bg-[#090d1a] border border-white/10 p-8 rounded-2xl shadow-2xl flex flex-col gap-5">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xl">
              ⚡
            </div>
            <div>
              <h2 className="text-xl font-bold font-headline text-zinc-100">Admin Console Recovery Engine</h2>
              <p className="text-xs text-zinc-400 font-mono mt-1 leading-relaxed">
                Click below to reset session storage and launch the Admin Console in clean mode.
              </p>
            </div>
            {this.state.error && (
              <div className="p-3 bg-red-950/40 border border-red-500/20 rounded-xl text-[11px] font-mono text-red-300 break-all max-h-32 overflow-y-auto">
                {this.state.error.message || String(this.state.error)}
              </div>
            )}
            <button
              onClick={this.handleReset}
              className="w-full py-3 px-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold font-mono text-xs rounded-xl transition-all cursor-pointer shadow-lg shadow-cyan-500/20"
            >
              🚀 Launch Fresh Admin Console
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function AdminClient() {
  const [services, setServices] = useState<any[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('kts_custom_services');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        } catch (e) {}
      }
    }
    return fallbackServices;
  });
  const [blogs, setBlogs] = useState<any[]>(fallbackBlogs);
  const [portfolios, setPortfolios] = useState<any[]>([]);
  const [seoPages, setSeoPages] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>(fallbackSettings);
  const [seoSettings, setSeoSettings] = useState<any>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [sRes, bRes, pRes, seoRes, stRes, seoStRes] = await Promise.allSettled([
          serviceService.getAllServices(),
          blogService.getAllBlogs(),
          portfolioService.getAllPortfolios(),
          seoService.getAllSeoPages(),
          settingService.getSettings(),
          seoService.getSeoSettings()
        ]);

        if (sRes.status === 'fulfilled' && Array.isArray(sRes.value) && sRes.value.length > 0) {
          const savedLocal = typeof window !== 'undefined' ? localStorage.getItem('kts_custom_services') : null;
          if (!savedLocal) {
            setServices(sRes.value);
          }
        }
        if (bRes.status === 'fulfilled' && Array.isArray(bRes.value) && bRes.value.length > 0) setBlogs(bRes.value);
        if (pRes.status === 'fulfilled' && Array.isArray(pRes.value)) setPortfolios(pRes.value);
        if (seoRes.status === 'fulfilled' && Array.isArray(seoRes.value)) setSeoPages(seoRes.value);
        if (stRes.status === 'fulfilled' && stRes.value) setSettings(stRes.value);
        if (seoStRes.status === 'fulfilled' && seoStRes.value) setSeoSettings(seoStRes.value);
      } catch (e) {
        console.warn('[ADMIN LOAD WARN]', e);
      }
    };
    loadData();
  }, []);

  return (
    <AdminErrorBoundary>
      <div className="min-h-screen bg-slate-950 text-white">
        <AdminPortalPage
          services={services as any}
          setServices={setServices}
          blogs={blogs as any}
          setBlogs={setBlogs}
          portfolios={portfolios as any}
          setPortfolios={setPortfolios}
          seoPages={seoPages as any}
          setSeoPages={setSeoPages}
          settings={settings}
          setSettings={setSettings}
          seoSettings={seoSettings}
          setSeoSettings={setSeoSettings}
        />
      </div>
    </AdminErrorBoundary>
  );
}
