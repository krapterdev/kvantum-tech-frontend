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
        type: 'image/jpeg',
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
  return (
    <>
      <head>
        <title>Featured Software & Engineering Projects | Kvantum Tech Solutions</title>
        <meta name="description" content="Explore web products, apps, and custom platforms built for our clients by Kvantum Tech Solutions." />
        <link rel="canonical" href="https://kvantumtechsolutions.com/projects" />
        <meta property="og:title" content="Featured Software & Engineering Projects | Kvantum Tech Solutions" />
        <meta property="og:description" content="Explore web products, apps, and custom platforms built for our clients by Kvantum Tech Solutions." />
        <meta property="og:image" content="https://bwdtxlosvptlqtixgcip.supabase.co/storage/v1/object/public/kvantumtechsolutions_storage/og_img_1787118540771_og_project_page_banner.png" />
        <meta property="og:image:secure_url" content="https://bwdtxlosvptlqtixgcip.supabase.co/storage/v1/object/public/kvantumtechsolutions_storage/og_img_1787118540771_og_project_page_banner.png" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Featured Projects Kvantum Tech Solutions" />
        <link rel="image_src" href="https://bwdtxlosvptlqtixgcip.supabase.co/storage/v1/object/public/kvantumtechsolutions_storage/og_img_1787118540771_og_project_page_banner.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Featured Software & Engineering Projects | Kvantum Tech Solutions" />
        <meta name="twitter:description" content="Explore web products, apps, and custom platforms built for our clients by Kvantum Tech Solutions." />
        <meta name="twitter:image" content="https://bwdtxlosvptlqtixgcip.supabase.co/storage/v1/object/public/kvantumtechsolutions_storage/og_img_1787118540771_og_project_page_banner.png" />
      </head>
      <ProjectsPageClient />
    </>
  );
}
