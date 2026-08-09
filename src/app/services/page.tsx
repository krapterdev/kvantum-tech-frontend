import React from 'react';
import type { Metadata } from 'next';
import ServicesPageClient from './ServicesPageClient';

export const metadata: Metadata = {
  title: 'IT & Software Development Services | Kvantum Tech Solutions',
  description: 'Explore comprehensive IT services including custom software development, mobile app creation, web development, cloud solutions, and digital marketing.',
  alternates: {
    canonical: 'https://kvantumtechsolutions.com/services',
  },
  openGraph: {
    title: 'IT & Software Development Services | Kvantum Tech Solutions',
    description: 'Explore comprehensive IT services including custom software development, mobile app creation, web development, cloud solutions, and digital marketing.',
    url: 'https://kvantumtechsolutions.com/services',
    type: 'website',
  },
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}
