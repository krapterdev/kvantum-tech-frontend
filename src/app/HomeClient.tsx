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

export default function HomeClient() {
  return (
    <div className="fade-in-up">
      <SeoSchema />
      <Hero settings={fallbackSettings as any} />
      <TrustedBy />
      <About settings={fallbackSettings as any} />
      <Services services={fallbackServices as any} />
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
      <BlogPreview blogs={fallbackBlogs as any} blogsLoading={false} />
      <FAQ />
      <CTA />
      <VisitorOdometerCounter />
      <HomeContact settings={fallbackSettings as any} />
    </div>
  );
}
