import React from 'react';
import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import '../index.css';
import ClientLayoutWrapper from './ClientLayoutWrapper';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://kvantumtechsolutions.com'),
  title: {
    default: 'IT Solutions Company in Delhi NCR | Kvantum Tech Solutions',
    template: '%s | Kvantum Tech Solutions',
  },
  description: 'Kvantum Tech Solutions offers reliable IT services, software development, cloud solutions, web development, and digital transformation services across Delhi NCR.',
  keywords: [
    'IT Solutions Delhi NCR',
    'AI Development Company',
    'Web Development Delhi',
    'Custom Software Development',
    'Digital Transformation Services',
  ],
  authors: [{ name: 'Kvantum Tech Solutions' }],
  creator: 'Kvantum Tech Solutions',
  publisher: 'Kvantum Tech Solutions',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://kvantumtechsolutions.com',
    siteName: 'Kvantum Tech Solutions',
    title: 'IT Solutions Company in Delhi NCR | Kvantum Tech Solutions',
    description: 'Kvantum Tech Solutions offers reliable IT services, software development, cloud solutions, web development, and digital transformation services across Delhi NCR.',
    images: [
      {
        url: 'https://bwdtxlosvptlqtixgcip.supabase.co/storage/v1/object/public/kvantumtechsolutions_storage/logo-2-FINAL-DM.jpg',
        width: 1200,
        height: 630,
        alt: 'Kvantum Tech Solutions Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IT Solutions Company in Delhi NCR | Kvantum Tech Solutions',
    description: 'Kvantum Tech Solutions offers reliable IT services, software development, cloud solutions, web development, and digital transformation services across Delhi NCR.',
    images: ['https://bwdtxlosvptlqtixgcip.supabase.co/storage/v1/object/public/kvantumtechsolutions_storage/logo-2-FINAL-DM.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable} dark`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500 selection:text-white min-h-screen flex flex-col">
        <ClientLayoutWrapper>
          {children}
        </ClientLayoutWrapper>
      </body>
    </html>
  );
}
