'use client';

import React from 'react';
import ServiceDetailPage from '@/pages/ServiceDetailPage';
import { fallbackServices } from '@/data/services';

export default function ServiceDetailClient({ slug }: { slug: string }) {
  return <ServiceDetailPage services={fallbackServices as any} serviceId={slug} />;
}
