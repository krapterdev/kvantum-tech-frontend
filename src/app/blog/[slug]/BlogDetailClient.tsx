'use client';

import React from 'react';
import BlogPage, { fallbackBlogs } from '@/pages/BlogPage';

export default function BlogDetailClient({ slug }: { slug: string }) {
  const singleBlog = fallbackBlogs.find((b) => b.slug === slug || b.id === slug) || fallbackBlogs[0];
  return <BlogPage blogs={[singleBlog] as any} loading={false} />;
}
