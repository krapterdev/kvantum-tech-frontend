import React from 'react';

export default function SeoSchema() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Kvantum Tech Solutions',
    url: 'https://kvantumtechsolutions.com',
    logo: 'https://kvantumtechsolutions.com/logo.png',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-9811661828',
      contactType: 'customer service',
      areaServed: 'IN',
      availableLanguage: ['en', 'hi'],
    },
    sameAs: [
      'https://www.linkedin.com/company/kvantumtechsolutions',
      'https://www.facebook.com/kvantumtechsolutions',
      'https://www.instagram.com/kvantumtechsolutions',
    ],
  };

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Kvantum Tech Solutions',
    image: 'https://kvantumtechsolutions.com/og-image.png',
    '@id': 'https://kvantumtechsolutions.com/#localbusiness',
    url: 'https://kvantumtechsolutions.com',
    telephone: '+91-9811661828',
    priceRange: '₹₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'A33, 64, Tahirpur Rd, Priyadarshini Vihar, Taharpur Village, Dilshad Garden',
      addressLocality: 'Delhi',
      postalCode: '110095',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 28.6836,
      longitude: 77.3134,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '10:00',
      closes: '19:00',
    },
  };

  const softwareAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Kvantum Business Automation & CRM Suite',
    operatingSystem: 'All Web Browsers, Android, iOS',
    applicationCategory: 'BusinessApplication',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '100',
    },
    offers: {
      '@type': 'Offer',
      price: '25000',
      priceCurrency: 'INR',
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What software development services do you offer?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We provide custom software development, CRM software, HRMS software, ERP solutions, business automation, web application development, mobile app development, SaaS platforms, and enterprise software solutions.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you provide CRM software?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. We develop fully customized CRM systems for sales management, lead tracking, customer support, follow-ups, quotations, pipeline management, and detailed reporting dashboards.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is Business Automation?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Business automation eliminates repetitive manual work by automating workflows, approvals, notifications, customer communication, reporting, invoice generation, and business processes.',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
