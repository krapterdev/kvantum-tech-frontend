import React from 'react';
import type { Metadata } from 'next';
import ProjectsPageClient from './ProjectsPageClient';

export const metadata: Metadata = {
  title: 'Featured Software & Engineering Projects | Kvantum Tech Solutions',
  description: 'Explore web products, apps, and custom platforms built for our clients by Kvantum Tech Solutions.',
  alternates: {
    canonical: 'https://kvantumtechsolutions.com/projects',
  },
  openGraph: {
    title: 'Featured Software & Engineering Projects | Kvantum Tech Solutions',
    description: 'Explore web products, apps, and custom platforms built for our clients by Kvantum Tech Solutions.',
    url: 'https://kvantumtechsolutions.com/projects',
    type: 'website',
    siteName: 'Kvantum Tech Solutions',
    images: [
      {
        url: 'https://bwdtxlosvptlqtixgcip.supabase.co/storage/v1/object/public/kvantumtechsolutions_storage/og_img_1787118540771_og_project_page_banner.png',
        width: 1200,
        height: 630,
        alt: 'Featured Projects Kvantum Tech Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Featured Software & Engineering Projects | Kvantum Tech Solutions',
    description: 'Explore web products, apps, and custom platforms built for our clients by Kvantum Tech Solutions.',
    images: ['https://bwdtxlosvptlqtixgcip.supabase.co/storage/v1/object/public/kvantumtechsolutions_storage/og_img_1787118540771_og_project_page_banner.png'],
  },
};

export default function ProjectsPage() {
  return <ProjectsPageClient />;
}
