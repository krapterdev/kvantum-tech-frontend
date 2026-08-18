import React from 'react';
import type { Metadata } from 'next';
import BlogDetailClient from './BlogDetailClient';
import { fallbackBlogs } from '@/data/blogs';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  
  let blog: any = fallbackBlogs.find((b: any) => b.slug === slug || b.id === slug || b._id === slug);

  if (!blog) {
    try {
      const res = await fetch(`https://kvantumtechsolutions.com/api/blogs/${slug}`, {
        next: { revalidate: 60 },
      });
      if (res.ok) {
        blog = await res.json();
      }
    } catch (e) {
      try {
        const res2 = await fetch(`https://ktswfb.vercel.app/api/blogs/${slug}`, {
          next: { revalidate: 60 },
        });
        if (res2.ok) {
          blog = await res2.json();
        }
      } catch (err) {}
    }
  }

  const title = blog?.metaTitle || blog?.title || `${slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} | Kvantum Tech Solutions`;
  const description = blog?.metaDesc || blog?.summary || blog?.excerpt || `Read about ${slug} on Kvantum Tech Solutions blog.`;
  const canonicalUrl = `https://kvantumtechsolutions.com/blog/${slug}`;

  let rawImage = blog?.ogImage || blog?.image || blog?.coverImage || 'https://bwdtxlosvptlqtixgcip.supabase.co/storage/v1/object/public/kvantumtechsolutions_storage/logo-2-FINAL-DM.jpg';
  
  if (rawImage.startsWith('/')) {
    rawImage = `https://kvantumtechsolutions.com${rawImage}`;
  } else if (rawImage.startsWith('data:image')) {
    rawImage = 'https://bwdtxlosvptlqtixgcip.supabase.co/storage/v1/object/public/kvantumtechsolutions_storage/logo-2-FINAL-DM.jpg';
  }

  return {
    title,
    description,
    keywords: blog?.tags || 'Custom Software Development, IT Solutions, Business Growth, Kvantum Tech Solutions',
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
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
          alt: title,
          type: rawImage.endsWith('.png') ? 'image/png' : 'image/jpeg',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
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

