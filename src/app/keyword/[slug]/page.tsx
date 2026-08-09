import React from 'react';
import type { Metadata } from 'next';
import KeywordClient from './KeywordClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const keyword = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  const title = `${keyword} | Kvantum Tech Solutions`;
  const description = `${keyword} solutions, custom software, and enterprise technology services by Kvantum Tech Solutions.`;
  const canonicalUrl = `https://kvantumtechsolutions.com/keyword/${slug}`;

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
      type: 'website',
    },
  };
}

export default async function KeywordSeoPage({ params }: Props) {
  const { slug } = await params;
  return <KeywordClient slug={slug} />;
}
