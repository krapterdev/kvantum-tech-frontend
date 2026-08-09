import React from 'react';
import type { Metadata } from 'next';
import BlogDetailClient from './BlogDetailClient';
import { fallbackBlogs } from '@/pages/BlogPage';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = fallbackBlogs.find((b) => b.slug === slug || b.id === slug);

  const title = blog?.title ? `${blog.title} | Kvantum Tech Blog` : `${slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} | Kvantum Tech Blog`;
  const description = blog?.summary || `Read about ${slug} on Kvantum Tech Solutions blog.`;
  const canonicalUrl = `https://kvantumtechsolutions.com/blog/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      images: [blog?.image || 'https://bwdtxlosvptlqtixgcip.supabase.co/storage/v1/object/public/kvantumtechsolutions_storage/logo-2-FINAL-DM.jpg'],
      type: 'article',
    },
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  return <BlogDetailClient slug={slug} />;
}
