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
        url: 'https://bwdtxlosvptlqtixgcip.supabase.co/storage/v1/object/public/kvantumtechsolutions_storage/og_img_1787116160287_og_home_page_banner.png',
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
    images: ['https://bwdtxlosvptlqtixgcip.supabase.co/storage/v1/object/public/kvantumtechsolutions_storage/og_img_1787116160287_og_home_page_banner.png'],
  },
};

export default function HomePage() {
  return (
    <>
      <head>
        <title>IT Solutions Company in Delhi NCR | Kvantum Tech Solutions</title>
        <meta name="description" content="Kvantum Tech Solutions offers reliable IT services, software development, cloud solutions, web development, and digital transformation services across Delhi NCR." />
        <link rel="canonical" href="https://kvantumtechsolutions.com/" />
        <meta property="og:title" content="IT Solutions Company in Delhi NCR | Kvantum Tech Solutions" />
        <meta property="og:description" content="Kvantum Tech Solutions offers reliable IT services, software development, cloud solutions, web development, and digital transformation services across Delhi NCR." />
        <meta property="og:image" content="https://bwdtxlosvptlqtixgcip.supabase.co/storage/v1/object/public/kvantumtechsolutions_storage/og_img_1787116160287_og_home_page_banner.png" />
        <meta property="og:image:secure_url" content="https://bwdtxlosvptlqtixgcip.supabase.co/storage/v1/object/public/kvantumtechsolutions_storage/og_img_1787116160287_og_home_page_banner.png" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Kvantum Tech Solutions" />
        <link rel="image_src" href="https://bwdtxlosvptlqtixgcip.supabase.co/storage/v1/object/public/kvantumtechsolutions_storage/og_img_1787116160287_og_home_page_banner.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="IT Solutions Company in Delhi NCR | Kvantum Tech Solutions" />
        <meta name="twitter:description" content="Kvantum Tech Solutions offers reliable IT services, software development, cloud solutions, web development, and digital transformation services across Delhi NCR." />
        <meta name="twitter:image" content="https://bwdtxlosvptlqtixgcip.supabase.co/storage/v1/object/public/kvantumtechsolutions_storage/og_img_1787116160287_og_home_page_banner.png" />
      </head>
      <HomeClient />
    </>
  );
}
