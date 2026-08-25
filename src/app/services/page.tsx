import React from 'react';
import type { Metadata } from 'next';
import ServicesPageClient from './ServicesPageClient';

export const metadata: Metadata = {
  title: 'IT Services | Web Development, SEO & AI Solutions | Kvantum Tech Solutions',
  description: "Explore Kvantum Tech Solutions' expert IT services, including web development, SEO, digital marketing, AI chatbots, app development, UI/UX design, and scalable business solutions.",
  alternates: {
    canonical: 'https://kvantumtechsolutions.com/services',
  },
  openGraph: {
    title: 'IT Services | Web Development, SEO & AI Solutions | Kvantum Tech Solutions',
    description: 'Discover enterprise-grade IT services from Kvantum Tech Solutions, including web development, SEO, AI chatbots, digital marketing, app development, and UI/UX design.',
    url: 'https://kvantumtechsolutions.com/services',
    type: 'website',
    siteName: 'Kvantum Tech Solutions',
    images: [
      {
        url: 'https://kvantumtechsolutions.com/og_banners/services.jpg',
        width: 1200,
        height: 630,
        type: 'image/jpeg',
        alt: 'IT Services Kvantum Tech Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IT Services | Web Development, SEO & AI Solutions | Kvantum Tech Solutions',
    description: 'Discover enterprise-grade IT services from Kvantum Tech Solutions, including web development, SEO, AI chatbots, digital marketing, app development, and UI/UX design.',
    images: ['https://kvantumtechsolutions.com/og_banners/services.jpg'],
  },
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}
