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
        url: 'https://bwdtxlosvptlqtixgcip.supabase.co/storage/v1/object/public/kvantumtechsolutions_storage/og_img_1787118547861_og_services_page_banner.png',
        width: 1200,
        height: 630,
        alt: 'IT Services Kvantum Tech Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IT Services | Web Development, SEO & AI Solutions | Kvantum Tech Solutions',
    description: 'Discover enterprise-grade IT services from Kvantum Tech Solutions, including web development, SEO, AI chatbots, digital marketing, app development, and UI/UX design.',
    images: ['https://bwdtxlosvptlqtixgcip.supabase.co/storage/v1/object/public/kvantumtechsolutions_storage/og_img_1787118547861_og_services_page_banner.png'],
  },
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}
