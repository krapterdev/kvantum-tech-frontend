import React from 'react';
import type { Metadata } from 'next';
import BlogPageClient from './BlogPageClient';

export const metadata: Metadata = {
  title: 'Tech Blog | AI, SEO, Web Development & Digital Marketing | Kvantum Tech Solutions',
  description: 'Read the latest articles from Kvantum Tech Solutions covering AI, SEO, web development, digital marketing, software innovation, and business technology.',
  alternates: {
    canonical: 'https://kvantumtechsolutions.com/blog',
  },
  openGraph: {
    title: 'Tech Blog | AI, SEO, Web Development & Digital Marketing | Kvantum Tech Solutions',
    description: 'Read the latest articles from Kvantum Tech Solutions covering AI, SEO, web development, digital marketing, software innovation, and business technology.',
    url: 'https://kvantumtechsolutions.com/blog',
    type: 'website',
  },
};

export default function BlogPage() {
  return <BlogPageClient />;
}
