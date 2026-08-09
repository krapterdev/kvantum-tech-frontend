'use client';

import React from 'react';
import BlogPage from '@/pages/BlogPage';
import { fallbackBlogs } from '@/data/blogs';

export default function BlogPageClient() {
  return <BlogPage blogs={fallbackBlogs as any} loading={false} />;
}
