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
  },
};

export default function ProjectsPage() {
  return <ProjectsPageClient />;
}
