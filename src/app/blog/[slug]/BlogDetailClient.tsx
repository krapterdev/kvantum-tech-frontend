'use client';

import React from 'react';
import BlogPage from '@/pages/BlogPage';
import { fallbackBlogs } from '@/data/blogs';

export default function BlogDetailClient({ slug }: { slug: string }) {
  const singleBlog = fallbackBlogs.find((b: any) => b.slug === slug || b.id === slug) || fallbackBlogs[0];
  return <BlogPage blogs={[singleBlog] as any} loading={false} />;
}
