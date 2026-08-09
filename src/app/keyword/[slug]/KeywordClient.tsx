'use client';

import React from 'react';
import DynamicSeoPage from '@/pages/DynamicSeoPage';

export default function KeywordClient({ slug }: { slug: string }) {
  return <DynamicSeoPage keywordSlug={slug} seoPages={[]} />;
}
