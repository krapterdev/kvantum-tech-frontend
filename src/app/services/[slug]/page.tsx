import React from 'react';
import type { Metadata } from 'next';
import ServiceDetailClient from './ServiceDetailClient';
import { fallbackServices } from '@/data/services';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = fallbackServices.find((s) => s.id === slug);

  const title = service?.metaTitle || `${slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} | Kvantum Tech Solutions`;
  const description = service?.metaDesc || service?.shortDesc || `Professional ${slug} services by Kvantum Tech Solutions.`;
  const canonicalUrl = `https://kvantumtechsolutions.com/services/${slug}`;

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

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  return <ServiceDetailClient slug={slug} />;
}
