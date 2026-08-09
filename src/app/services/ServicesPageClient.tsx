'use client';

import React from 'react';
import ServicesPage from '@/pages/ServicesPage';
import { fallbackServices } from '@/data/services';

export default function ServicesPageClient() {
  return <ServicesPage services={fallbackServices as any} />;
}
