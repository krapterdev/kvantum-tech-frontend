import React from 'react';
import type { Metadata } from 'next';
import BlogDetailClient from './BlogDetailClient';
import { fallbackBlogs } from '@/data/blogs';
import { Pool } from 'pg';

interface Props {
  params: Promise<{ slug: string }>;
}

const DB_URL = process.env.DATABASE_URL || 'postgresql://postgres.bwdtxlosvptlqtixgcip:kEM3onWoT9AT82mr@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres';

let poolInstance: Pool | null = null;
function getPool() {
  if (!poolInstance) {
    try {
      poolInstance = new Pool({
        connectionString: DB_URL,
        ssl: { rejectUnauthorized: false },
        connectionTimeoutMillis: 3000,
      });
    } catch (e) {}
  }
  return poolInstance;
}

async function getBlog(slug: string): Promise<any> {
  // 1. Attempt DB query for fully dynamic real-time SEO data
  try {
    const pool = getPool();
    if (pool) {
      const res = await pool.query('SELECT * FROM blogs WHERE id = $1', [slug]);
      if (res.rows && res.rows.length > 0) {
        return res.rows[0];
      }
    }
  } catch (e) {}

  // 2. Fallback to fallbackBlogs array
  const found = fallbackBlogs.find((b: any) => b.slug === slug || b.id === slug || b._id === slug);
  if (found) return found;

  // 3. Attempt HTTP fetch fallback
  try {
    const res = await fetch(`https://kvantumtechsolutions.com/api/blogs/${slug}`, { next: { revalidate: 60 } });
    if (res.ok) return await res.json();
  } catch (err) {}

  return null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlog(slug);

  // Extract clean title and avoid duplicate '| Kvantum Tech Solutions'
  let rawTitle = blog?.meta_title || blog?.metaTitle || blog?.ogTitle || blog?.title || slug.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const cleanTitleOnly = rawTitle.replace(/\s*\|\s*Kvantum Tech Solutions\s*/gi, '').trim();
  const fullTitle = `${cleanTitleOnly} | Kvantum Tech Solutions`;

  const description = blog?.meta_desc || blog?.metaDesc || blog?.ogDesc || blog?.summary || blog?.excerpt || `Read about ${cleanTitleOnly} on Kvantum Tech Solutions.`;
  const canonicalUrl = `https://kvantumtechsolutions.com/blog/${slug}`;

  // Extract true dynamic cover image
  let rawImage = blog?.ogImage || blog?.image || blog?.coverImage || blog?.cover_image;

  if (!rawImage || rawImage.startsWith('data:image') || rawImage.includes('logo-2-FINAL-DM') || rawImage.includes('unsplash')) {
    if (blog?.schemaMarkup) {
      const imgMatch = blog.schemaMarkup.match(/"image":\s*"([^"]+)"/);
      if (imgMatch && imgMatch[1] && !imgMatch[1].startsWith('data:image') && !imgMatch[1].includes('unsplash')) {
        rawImage = imgMatch[1];
      }
    }
  }

  if (!rawImage || rawImage.startsWith('data:image') || rawImage.includes('unsplash')) {
    rawImage = 'https://kvantumtechsolutions.com/api/img/blogs_1787035311661_Why_Custom_Software_Services__Kvantum_Tech_Solutions.jpg';
  } else if (rawImage.includes('supabase.co/storage/v1/object/public/kvantumtechsolutions_storage/')) {
    const parts = rawImage.split('kvantumtechsolutions_storage/');
    const fileName = parts[parts.length - 1];
    rawImage = `https://kvantumtechsolutions.com/api/img/${fileName}`;
  } else if (rawImage.startsWith('/')) {
    rawImage = `https://kvantumtechsolutions.com${rawImage}`;
  }

  const keywords = blog?.keywords || blog?.tags || 'Custom Software Development, IT Solutions, Business Growth, Kvantum Tech Solutions';

  return {
    title: {
      absolute: fullTitle,
    },
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: 'Kvantum Tech Solutions',
      locale: 'en_US',
      type: 'article',
      images: [
        {
          url: rawImage,
          secureUrl: rawImage,
          width: 1200,
          height: 630,
          alt: cleanTitleOnly,
          type: rawImage.endsWith('.png') ? 'image/png' : 'image/jpeg',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [rawImage],
      creator: '@kvantumtech',
    },
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  return <BlogDetailClient slug={slug} />;
}
