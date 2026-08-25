import React from 'react';
import type { Metadata } from 'next';
import ContactPageClient from './ContactPageClient';

export const metadata: Metadata = {
  title: "Contact Kvantum Tech Solutions | Let's Build Your Digital Future",
  description: 'Get in touch with Kvantum Tech Solutions for web development, AI solutions, SEO, digital marketing, mobile apps, and enterprise IT services. Contact our experts today.',
  alternates: {
    canonical: 'https://kvantumtechsolutions.com/contact',
  },
  openGraph: {
    title: "Contact Kvantum Tech Solutions | Let's Build Your Digital Future",
    description: 'Contact Kvantum Tech Solutions to discuss your next digital project. Our experts deliver innovative web, AI, SEO, app development, and digital marketing solutions.',
    url: 'https://kvantumtechsolutions.com/contact',
    type: 'website',
    siteName: 'Kvantum Tech Solutions',
    images: [
      {
        url: 'https://bwdtxlosvptlqtixgcip.supabase.co/storage/v1/object/public/kvantumtechsolutions_storage/og_img_1787118530037_og_contact_page_banner.png',
        width: 1200,
        height: 630,
        type: 'image/jpeg',
        alt: 'Contact Kvantum Tech Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Contact Kvantum Tech Solutions | Let's Build Your Digital Future",
    description: 'Contact Kvantum Tech Solutions to discuss your next digital project. Our experts deliver innovative web, AI, SEO, app development, and digital marketing solutions.',
    images: ['https://bwdtxlosvptlqtixgcip.supabase.co/storage/v1/object/public/kvantumtechsolutions_storage/og_img_1787118530037_og_contact_page_banner.png'],
  },
};

export default function ContactPage() {
  return (
    <>
      <head>
        <title>Contact Kvantum Tech Solutions | Let's Build Your Digital Future</title>
        <meta name="description" content="Get in touch with Kvantum Tech Solutions for web development, AI solutions, SEO, digital marketing, mobile apps, and enterprise IT services. Contact our experts today." />
        <link rel="canonical" href="https://kvantumtechsolutions.com/contact" />
        <meta property="og:title" content="Contact Kvantum Tech Solutions | Let's Build Your Digital Future" />
        <meta property="og:description" content="Contact Kvantum Tech Solutions to discuss your next digital project. Our experts deliver innovative web, AI, SEO, app development, and digital marketing solutions." />
        <meta property="og:image" content="https://bwdtxlosvptlqtixgcip.supabase.co/storage/v1/object/public/kvantumtechsolutions_storage/og_img_1787118530037_og_contact_page_banner.png" />
        <meta property="og:image:secure_url" content="https://bwdtxlosvptlqtixgcip.supabase.co/storage/v1/object/public/kvantumtechsolutions_storage/og_img_1787118530037_og_contact_page_banner.png" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Contact Kvantum Tech Solutions" />
        <link rel="image_src" href="https://bwdtxlosvptlqtixgcip.supabase.co/storage/v1/object/public/kvantumtechsolutions_storage/og_img_1787118530037_og_contact_page_banner.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Kvantum Tech Solutions | Let's Build Your Digital Future" />
        <meta name="twitter:description" content="Contact Kvantum Tech Solutions to discuss your next digital project. Our experts deliver innovative web, AI, SEO, app development, and digital marketing solutions." />
        <meta name="twitter:image" content="https://bwdtxlosvptlqtixgcip.supabase.co/storage/v1/object/public/kvantumtechsolutions_storage/og_img_1787118530037_og_contact_page_banner.png" />
      </head>
      <ContactPageClient />
    </>
  );
}
