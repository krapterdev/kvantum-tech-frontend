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

  // Extract clean title and avoid duplicate '| Kvantum Tech Solutions'
  let rawTitle = blog?.metaTitle || blog?.ogTitle || blog?.title || slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const cleanTitleOnly = rawTitle.replace(/\s*\|\s*Kvantum Tech Solutions\s*/gi, '').trim();
  const fullTitle = `${cleanTitleOnly} | Kvantum Tech Solutions`;

  const description = blog?.metaDesc || blog?.ogDesc || blog?.summary || blog?.excerpt || `Read about ${cleanTitleOnly} on Kvantum Tech Solutions blog.`;
  const canonicalUrl = `https://kvantumtechsolutions.com/blog/${slug}`;

  // Extract the true high-resolution blog cover image for openGraph and twitter
  let rawImage = blog?.ogImage || blog?.image || blog?.coverImage;

  if (!rawImage || rawImage.startsWith('data:image') || rawImage.includes('logo-2-FINAL-DM')) {
    if (blog?.schemaMarkup) {
      const imgMatch = blog.schemaMarkup.match(/"image":\s*"([^"]+)"/);
      if (imgMatch && imgMatch[1] && !imgMatch[1].startsWith('data:image')) {
        rawImage = imgMatch[1];
      }
    }
  }

  if (!rawImage || rawImage.startsWith('data:image')) {
    rawImage = 'https://bwdtxlosvptlqtixgcip.supabase.co/storage/v1/object/public/kvantumtechsolutions_storage/1785578098053_Why_Kvantum_Tech_Solutions_Is_the_Best_IT_Solutions_Company_in_Delhi_NCR.jpeg';
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

