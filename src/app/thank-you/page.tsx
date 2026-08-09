import React from 'react';
import type { Metadata } from 'next';
import ThankYouClient from './ThankYouClient';

export const metadata: Metadata = {
  title: 'Thank You | Kvantum Tech Solutions',
  description: 'Thank you for contacting Kvantum Tech Solutions. Our technical team will reach out shortly.',
  alternates: {
    canonical: 'https://kvantumtechsolutions.com/thank-you',
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function ThankYouRoute() {
  return <ThankYouClient />;
}
