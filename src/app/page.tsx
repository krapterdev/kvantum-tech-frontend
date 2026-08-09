import React from 'react';
import type { Metadata } from 'next';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
  title: 'IT Solutions Company in Delhi NCR | Kvantum Tech Solutions',
  description: 'Kvantum Tech Solutions offers reliable IT services, software development, cloud solutions, web development, and digital transformation services across Delhi NCR.',
  alternates: {
    canonical: 'https://kvantumtechsolutions.com/',
  },
  openGraph: {
    title: 'IT Solutions Company in Delhi NCR | Kvantum Tech Solutions',
    description: 'Kvantum Tech Solutions offers reliable IT services, software development, cloud solutions, web development, and digital transformation services across Delhi NCR.',
    url: 'https://kvantumtechsolutions.com/',
    type: 'website',
  },
};

export default function HomePage() {
  return <HomeClient />;
}
