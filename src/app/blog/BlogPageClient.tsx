'use client';

import React, { useState, useEffect } from 'react';
import BlogPage from '@/pages/BlogPage';
import { fallbackBlogs } from '@/data/blogs';
import * as blogService from '@/services/blogService';

export default function BlogPageClient() {
  const [blogs, setBlogs] = useState<any[]>(fallbackBlogs as any[]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      let localSaved: any[] = [];
      if (typeof window !== 'undefined') {
        try { localSaved = JSON.parse(localStorage.getItem('kts_saved_blogs') || '[]'); } catch(e) {}
      }

      try {
        const data = await (blogService as any).getAllBlogs();
        const map = new Map();
        (fallbackBlogs as any[]).forEach((b: any) => map.set(b.id || b.slug || b._id, b));
        (Array.isArray(data) ? data : []).forEach((b: any) => {
          const key = b.id || b.slug || b._id;
          const img = b.image || b.coverImage || b.ogImage;
          map.set(key, { ...b, image: img, coverImage: img });
        });
        localSaved.forEach((b: any) => {
          const key = b.id || b.slug || b._id;
          const img = b.image || b.coverImage || b.ogImage;
          map.set(key, { ...b, image: img, coverImage: img });
        });
        const merged = Array.from(map.values());
        if (merged.length > 0) setBlogs(merged);
      } catch (err) {
        if (localSaved.length > 0) {
          const map = new Map();
          (fallbackBlogs as any[]).forEach((b: any) => map.set(b.id || b.slug || b._id, b));
          localSaved.forEach((b: any) => {
            const key = b.id || b.slug || b._id;
            const img = b.image || b.coverImage || b.ogImage;
            map.set(key, { ...b, image: img, coverImage: img });
          });
          setBlogs(Array.from(map.values()));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return <BlogPage blogs={blogs as any} loading={loading} />;
}

