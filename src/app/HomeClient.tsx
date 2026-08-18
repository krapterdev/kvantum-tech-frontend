'use client';

import React from 'react';
import Hero from '@/components/sections/Hero';
import TrustedBy from '@/components/sections/TrustedBy';
import About from '@/components/sections/About';
import Services from '@/components/sections/Services';
import BusinessAutomationHighlight from '@/components/sections/BusinessAutomationHighlight';
import AutomationCalculator from '@/components/sections/AutomationCalculator';
import SoftwareProducts from '@/components/sections/SoftwareProducts';
import InteractiveDashboardMockup from '@/components/sections/InteractiveDashboardMockup';
import CardStackShowcase from '@/components/sections/CardStackShowcase';
import Industries from '@/components/sections/Industries';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import Technologies from '@/components/sections/Technologies';
import HowWeWork from '@/components/sections/HowWeWork';
import Projects from '@/components/sections/Projects';
import LiveDemo from '@/components/sections/LiveDemo';
import Stats from '@/components/sections/Stats';
import Testimonials from '@/components/sections/Testimonials';
import Pricing from '@/components/sections/Pricing';
import FAQ from '@/components/sections/FAQ';
import BlogPreview from '@/components/sections/BlogPreview';
import CTA from '@/components/sections/CTA';
import VisitorOdometerCounter from '@/components/sections/VisitorOdometerCounter';
import HomeContact from '@/components/sections/HomeContact';
import HomeSeoContentSection from '@/components/sections/HomeSeoContentSection';
import SeoSchema from '@/components/sections/SeoSchema';
import { fallbackServices } from '@/data/services';
import { fallbackBlogs } from '@/pages/BlogPage';
import { fallbackSettings } from '@/data/settings';
import { getAllBlogs } from '@/services/blogService';

export default function HomeClient() {
  const [services, setServices] = React.useState<any[]>(fallbackServices);
  const [blogs, setBlogs] = React.useState<any[]>(fallbackBlogs);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedServices = localStorage.getItem('kts_custom_services');
      if (savedServices) {
        try {
          const parsed = JSON.parse(savedServices);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setServices(parsed);
          }
        } catch (e) {}
      }

      const savedBlogs = localStorage.getItem('kts_saved_admin_blogs');
      if (savedBlogs) {
        try {
          const parsed = JSON.parse(savedBlogs);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setBlogs(parsed);
          }
        } catch (e) {}
      }

      getAllBlogs()
        .then((fetched) => {
          if (Array.isArray(fetched) && fetched.length > 0) {
            setBlogs(fetched);
          }
        })
        .catch(() => {});
    }
  }, []);

  return (
    <div className="fade-in-up">
      <SeoSchema />
      <Hero settings={fallbackSettings as any} />
      <TrustedBy />
      <About settings={fallbackSettings as any} />
      <Services services={services as any} />
      <BusinessAutomationHighlight />
      <AutomationCalculator />
      <SoftwareProducts />
      <InteractiveDashboardMockup />
      <Industries />
      <WhyChooseUs />
      <Technologies />
      <HowWeWork />
      <CardStackShowcase />
      <Projects />
      <LiveDemo />
      <Stats settings={fallbackSettings as any} />
      <Testimonials settings={fallbackSettings as any} />
      <Pricing />
      <HomeSeoContentSection />
      <BlogPreview blogs={blogs as any} blogsLoading={false} />
      <FAQ />
      <CTA />
      <VisitorOdometerCounter />
      <HomeContact settings={fallbackSettings as any} />
    </div>
  );
}
