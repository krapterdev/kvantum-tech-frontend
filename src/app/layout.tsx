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
  alternates: {
    canonical: './',
  },
  title: {
    default: 'IT Solutions Company in Delhi NCR | Kvantum Tech Solutions',
    template: '%s',
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
  icons: {
    icon: [
      { url: '/icon-16.svg', sizes: '16x16', type: 'image/svg+xml' },
      { url: '/icon-32.svg', sizes: '32x32', type: 'image/svg+xml' },
      { url: '/icon-192.svg', sizes: '192x192', type: 'image/svg+xml' },
      { url: '/icon-512.svg', sizes: '512x512', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-icon.svg', sizes: '180x180', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.svg',
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
        url: 'https://kvantumtechsolutions.com/og_banners/home.jpg',
        width: 1200,
        height: 630,
        type: 'image/jpeg',
        alt: 'Kvantum Tech Solutions Banner',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IT Solutions Company in Delhi NCR | Kvantum Tech Solutions',
    description: 'Kvantum Tech Solutions offers reliable IT services, software development, cloud solutions, web development, and digital transformation services across Delhi NCR.',
    images: ['https://kvantumtechsolutions.com/og_banners/home.jpg'],
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
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/icon-32.svg" sizes="32x32" type="image/svg+xml" />
        <link rel="icon" href="/icon-16.svg" sizes="16x16" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-icon.svg" />
        <meta name="theme-color" content="#0f172a" />
      </head>
      <body className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased selection:bg-cyan-500 selection:text-white min-h-screen flex flex-col transition-colors duration-300">
        <ClientLayoutWrapper>
          {children}
        </ClientLayoutWrapper>
      </body>
    </html>
  );
}
