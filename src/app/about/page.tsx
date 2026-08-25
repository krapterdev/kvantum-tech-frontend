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
    siteName: 'Kvantum Tech Solutions',
    images: [
      {
        url: 'https://kvantumtechsolutions.com/og_banners/about.jpg',
        width: 1200,
        height: 630,
        type: 'image/jpeg',
        alt: 'About Kvantum Tech Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Kvantum Tech Solutions | IT & AI Innovation Experts',
    description: 'Discover Kvantum Tech Solutions, delivering innovative AI, web development, digital marketing, and enterprise IT solutions for business growth.',
    images: ['https://kvantumtechsolutions.com/og_banners/about.jpg'],
  },
};

export default function AboutPage() {
  return (
    <>
      <head>
        <title>About Kvantum Tech Solutions | IT & AI Innovation Experts</title>
        <meta name="description" content="Learn about Kvantum Tech Solutions, a trusted IT company delivering AI-powered solutions, web development, digital marketing, and enterprise technology services." />
        <link rel="canonical" href="https://kvantumtechsolutions.com/about" />
        <meta property="og:title" content="About Kvantum Tech Solutions | IT & AI Innovation Experts" />
        <meta property="og:description" content="Discover Kvantum Tech Solutions, delivering innovative AI, web development, digital marketing, and enterprise IT solutions for business growth." />
        <meta property="og:image" content="https://kvantumtechsolutions.com/og_banners/about.jpg" />
        <meta property="og:image:secure_url" content="https://kvantumtechsolutions.com/og_banners/about.jpg" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="About Kvantum Tech Solutions" />
        <link rel="image_src" href="https://kvantumtechsolutions.com/og_banners/about.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Kvantum Tech Solutions | IT & AI Innovation Experts" />
        <meta name="twitter:description" content="Discover Kvantum Tech Solutions, delivering innovative AI, web development, digital marketing, and enterprise IT solutions for business growth." />
        <meta name="twitter:image" content="https://kvantumtechsolutions.com/og_banners/about.jpg" />
      </head>
      <AboutPageClient />
    </>
  );
}
