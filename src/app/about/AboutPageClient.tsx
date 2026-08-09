'use client';

import React from 'react';
import AboutPage from '@/pages/AboutPage';
import { fallbackSettings } from '@/data/settings';

export default function AboutPageClient() {
  return <AboutPage settings={fallbackSettings as any} theme="dark" />;
}
