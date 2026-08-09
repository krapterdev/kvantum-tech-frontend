'use client';

import dynamic from 'next/dynamic';
import { fallbackServices } from '@/data/services';
import { fallbackBlogs } from '@/pages/BlogPage';
import { fallbackSettings } from '@/data/settings';

const AdminPortalPage = dynamic(() => import('@/pages/AdminPortalPage'), { ssr: false });

export default function AdminPage() {
  const dummyStateSetter = () => {};
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <AdminPortalPage
        services={fallbackServices as any}
        blogs={fallbackBlogs as any}
        portfolios={[]}
        seoPages={[]}
        settings={fallbackSettings as any}
        seoSettings={null}
        setServices={dummyStateSetter}
        setBlogs={dummyStateSetter}
        setPortfolios={dummyStateSetter}
        setSeoPages={dummyStateSetter}
        setSettings={dummyStateSetter}
        setSeoSettings={dummyStateSetter}
      />
    </div>
  );
}
