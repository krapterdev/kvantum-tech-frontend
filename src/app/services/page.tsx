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
  return (
    <>
      <head>
        <title>IT Services | Web Development, SEO & AI Solutions | Kvantum Tech Solutions</title>
        <meta name="description" content="Explore Kvantum Tech Solutions' expert IT services, including web development, SEO, digital marketing, AI chatbots, app development, UI/UX design, and scalable business solutions." />
        <link rel="canonical" href="https://kvantumtechsolutions.com/services" />
        <meta property="og:title" content="IT Services | Web Development, SEO & AI Solutions | Kvantum Tech Solutions" />
        <meta property="og:description" content="Discover enterprise-grade IT services from Kvantum Tech Solutions, including web development, SEO, AI chatbots, digital marketing, app development, and UI/UX design." />
        <meta property="og:image" content="https://kvantumtechsolutions.com/og_banners/services.jpg" />
        <meta property="og:image:secure_url" content="https://kvantumtechsolutions.com/og_banners/services.jpg" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="IT Services Kvantum Tech Solutions" />
        <link rel="image_src" href="https://kvantumtechsolutions.com/og_banners/services.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="IT Services | Web Development, SEO & AI Solutions | Kvantum Tech Solutions" />
        <meta name="twitter:description" content="Discover enterprise-grade IT services from Kvantum Tech Solutions, including web development, SEO, AI chatbots, digital marketing, app development, and UI/UX design." />
        <meta name="twitter:image" content="https://kvantumtechsolutions.com/og_banners/services.jpg" />
      </head>
      <ServicesPageClient />
    </>
  );
}
