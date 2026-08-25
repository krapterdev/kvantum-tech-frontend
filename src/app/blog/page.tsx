import React from 'react';
import type { Metadata } from 'next';
import BlogPageClient from './BlogPageClient';

export const metadata: Metadata = {
  title: 'Tech Blog | AI, SEO, Web Development & Digital Marketing | Kvantum Tech Solutions',
  description: 'Explore the Kvantum Tech Solutions blog for expert insights on AI, SEO, web development, digital marketing, software solutions, and the latest technology trends to grow your business.',
  alternates: {
    canonical: 'https://kvantumtechsolutions.com/blog',
  },
  openGraph: {
    title: 'Tech Blog | AI, SEO, Web Development & Digital Marketing | Kvantum Tech Solutions',
    description: 'Read the latest articles from Kvantum Tech Solutions covering AI, SEO, web development, digital marketing, software innovation, and business technology.',
    url: 'https://kvantumtechsolutions.com/blog',
    type: 'website',
    siteName: 'Kvantum Tech Solutions',
    images: [
      {
        url: 'https://bwdtxlosvptlqtixgcip.supabase.co/storage/v1/object/public/kvantumtechsolutions_storage/og_img_1787118518420_og_blog_page_banner.png',
        width: 1200,
        height: 630,
        type: 'image/jpeg',
        alt: 'Tech Blog Kvantum Tech Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tech Blog | AI, SEO, Web Development & Digital Marketing | Kvantum Tech Solutions',
    description: 'Explore the Kvantum Tech Solutions blog for expert insights on AI, SEO, web development, digital marketing, software solutions, and the latest technology trends to grow your business.',
    images: ['https://bwdtxlosvptlqtixgcip.supabase.co/storage/v1/object/public/kvantumtechsolutions_storage/og_img_1787118518420_og_blog_page_banner.png'],
  },
};

export default function BlogPage() {
  return (
    <>
      <head>
        <title>Tech Blog | AI, SEO, Web Development & Digital Marketing | Kvantum Tech Solutions</title>
        <meta name="description" content="Explore the Kvantum Tech Solutions blog for expert insights on AI, SEO, web development, digital marketing, software solutions, and the latest technology trends to grow your business." />
        <link rel="canonical" href="https://kvantumtechsolutions.com/blog" />
        <meta property="og:title" content="Tech Blog | AI, SEO, Web Development & Digital Marketing | Kvantum Tech Solutions" />
        <meta property="og:description" content="Read the latest articles from Kvantum Tech Solutions covering AI, SEO, web development, digital marketing, software innovation, and business technology." />
        <meta property="og:image" content="https://bwdtxlosvptlqtixgcip.supabase.co/storage/v1/object/public/kvantumtechsolutions_storage/og_img_1787118518420_og_blog_page_banner.png" />
        <meta property="og:image:secure_url" content="https://bwdtxlosvptlqtixgcip.supabase.co/storage/v1/object/public/kvantumtechsolutions_storage/og_img_1787118518420_og_blog_page_banner.png" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Tech Blog Kvantum Tech Solutions" />
        <link rel="image_src" href="https://bwdtxlosvptlqtixgcip.supabase.co/storage/v1/object/public/kvantumtechsolutions_storage/og_img_1787118518420_og_blog_page_banner.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Tech Blog | AI, SEO, Web Development & Digital Marketing | Kvantum Tech Solutions" />
        <meta name="twitter:description" content="Explore the Kvantum Tech Solutions blog for expert insights on AI, SEO, web development, digital marketing, software solutions, and the latest technology trends to grow your business." />
        <meta name="twitter:image" content="https://bwdtxlosvptlqtixgcip.supabase.co/storage/v1/object/public/kvantumtechsolutions_storage/og_img_1787118518420_og_blog_page_banner.png" />
      </head>
      <BlogPageClient />
    </>
  );
}
