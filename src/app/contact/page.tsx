import React from 'react';
import type { Metadata } from 'next';
import ContactPageClient from './ContactPageClient';

export const metadata: Metadata = {
  title: "Contact Kvantum Tech Solutions | Let's Build Your Digital Future",
  description: 'Get in touch with Kvantum Tech Solutions for web development, AI solutions, SEO, digital marketing, mobile apps, and enterprise IT services. Contact our experts today.',
  alternates: {
    canonical: 'https://kvantumtechsolutions.com/contact',
  },
  openGraph: {
    title: "Contact Kvantum Tech Solutions | Let's Build Your Digital Future",
    description: 'Contact Kvantum Tech Solutions to discuss your next digital project. Our experts deliver innovative web, AI, SEO, app development, and digital marketing solutions.',
    url: 'https://kvantumtechsolutions.com/contact',
    type: 'website',
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
