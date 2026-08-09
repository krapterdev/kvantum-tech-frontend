'use client';

import React from 'react';
import BlogPage, { fallbackBlogs } from '@/pages/BlogPage';

export default function BlogPageClient() {
  return <BlogPage blogs={fallbackBlogs as any} loading={false} />;
}
