'use client';

import React, { useState, useEffect } from 'react';
import AdminPortalPage from '@/pages/AdminPortalPage';
import { fallbackServices } from '@/data/services';
import { fallbackBlogs } from '@/data/blogs';
import { fallbackSettings } from '@/data/settings';
import * as serviceService from '@/services/serviceService';
import * as blogService from '@/services/blogService';
import * as seoService from '@/services/seoService';
import * as settingService from '@/services/settingService';
import * as portfolioService from '@/services/portfolioService';

export default function AdminClient() {
  const [services, setServices] = useState<any[]>(fallbackServices);
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

        if (sRes.status === 'fulfilled' && Array.isArray(sRes.value) && sRes.value.length > 0) setServices(sRes.value);
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
  );
}
