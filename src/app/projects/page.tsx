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
        url: 'https://kvantumtechsolutions.com/og_banners/projects.jpg',
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
    images: ['https://kvantumtechsolutions.com/og_banners/projects.jpg'],
  },
};

export default function ProjectsPage() {
  return <ProjectsPageClient />;
}
