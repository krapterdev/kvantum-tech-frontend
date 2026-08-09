import React from 'react';
import type { Metadata } from 'next';
import AboutPageClient from './AboutPageClient';

export const metadata: Metadata = {
  title: 'About Kvantum Tech Solutions | IT & AI Innovation Experts',
  description: 'Learn about Kvantum Tech Solutions, a trusted IT company delivering AI-powered solutions, web development, digital marketing, and enterprise technology services.',
  alternates: {
    canonical: 'https://kvantumtechsolutions.com/about',
  },
  openGraph: {
    title: 'About Kvantum Tech Solutions | IT & AI Innovation Experts',
    description: 'Discover Kvantum Tech Solutions, delivering innovative AI, web development, digital marketing, and enterprise IT solutions for business growth.',
    url: 'https://kvantumtechsolutions.com/about',
    type: 'website',
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
