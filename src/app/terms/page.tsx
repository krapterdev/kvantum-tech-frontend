import React from 'react';
import type { Metadata } from 'next';
import TermsClient from './TermsClient';

export const metadata: Metadata = {
  title: 'Terms of Service | Kvantum Tech Solutions',
  description: 'Terms of Service and Conditions for Kvantum Tech Solutions software development and IT services.',
  alternates: {
    canonical: 'https://kvantumtechsolutions.com/terms',
  },
};

export default function TermsRoute() {
  return <TermsClient />;
}
