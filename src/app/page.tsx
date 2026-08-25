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
    siteName: 'Kvantum Tech Solutions',
    images: [
      {
        url: 'https://kvantumtechsolutions.com/og_banners/home.jpg',
        width: 1200,
        height: 630,
        type: 'image/jpeg',
        alt: 'Kvantum Tech Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IT Solutions Company in Delhi NCR | Kvantum Tech Solutions',
    description: 'Kvantum Tech Solutions offers reliable IT services, software development, cloud solutions, web development, and digital transformation services across Delhi NCR.',
    images: ['https://kvantumtechsolutions.com/og_banners/home.jpg'],
  },
};

export default function HomePage() {
  return <HomeClient />;
}
