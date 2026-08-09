'use client';

import React from 'react';
import ContactPage from '@/pages/ContactPage';
import { fallbackSettings } from '@/data/settings';

export default function ContactPageClient() {
  return <ContactPage settings={fallbackSettings as any} />;
}
