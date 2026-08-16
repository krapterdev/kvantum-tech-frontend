'use client';

import React from 'react';
import ServicesPage from '@/pages/ServicesPage';
import { fallbackServices } from '@/data/services';

export default function ServicesPageClient() {
  const [services, setServices] = React.useState<any[]>(fallbackServices);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('kts_custom_services');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setServices(parsed);
          }
        } catch (e) {}
      }
    }
  }, []);

  return <ServicesPage services={services as any} />;
}
