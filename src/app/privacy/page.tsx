import React from 'react';
import type { Metadata } from 'next';
import PrivacyClient from './PrivacyClient';

export const metadata: Metadata = {
  title: 'Privacy Policy | Kvantum Tech Solutions',
  description: 'Privacy Policy for Kvantum Tech Solutions. Read how we collect, store, and protect user data.',
  alternates: {
    canonical: 'https://kvantumtechsolutions.com/privacy',
  },
};

export default function PrivacyRoute() {
  return <PrivacyClient />;
}
