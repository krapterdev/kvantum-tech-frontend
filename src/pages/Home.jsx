import React from 'react';
import Hero from '@/components/sections/Hero';
import TrustedBy from '@/components/sections/TrustedBy';
import Services from '@/components/sections/Services';
import BusinessAutomationHighlight from '@/components/sections/BusinessAutomationHighlight';
import SoftwareProducts from '@/components/sections/SoftwareProducts';
import AutomationFeatures from '@/components/sections/AutomationFeatures';
import Industries from '@/components/sections/Industries';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import HowWeWork from '@/components/sections/HowWeWork';
import LiveDemo from '@/components/sections/LiveDemo';
import Stats from '@/components/sections/Stats';
import Testimonials from '@/components/sections/Testimonials';
import Technologies from '@/components/sections/Technologies';
import Pricing from '@/components/sections/Pricing';
import FAQ from '@/components/sections/FAQ';
import CTA from '@/components/sections/CTA';
import BlogPreview from '@/components/sections/BlogPreview';
import HomeContact from '@/components/sections/HomeContact';

export default function Home({ services = [], blogs = [], settings }) {
  return (
    <div className="fade-in-up">
      {/* 1. Hero Section */}
      <Hero settings={settings} />

      {/* 2. Trusted By / Social Proof Banner */}
      <TrustedBy />

      {/* 3. Core Services Grid (6 cards) */}
      <Services services={services} />

      {/* 4. Business Automation Highlight */}
      <BusinessAutomationHighlight />

      {/* 5. Software Products Grid */}
      <SoftwareProducts />

      {/* 6. Automation Features Checklist */}
      <AutomationFeatures />

      {/* 7. Industries We Serve */}
      <Industries />

      {/* 8. Why Choose Us */}
      <WhyChooseUs />

      {/* 9. How We Work (Process Timeline) */}
      <HowWeWork />

      {/* 10. Live Demo CTA Banner */}
      <LiveDemo />

      {/* 11. Stats / Counters */}
      <Stats settings={settings} />

      {/* 12. Testimonials */}
      <Testimonials settings={settings} />

      {/* 13. Technology Stack */}
      <Technologies />

      {/* 14. Pricing Cards */}
      <Pricing />

      {/* 15. FAQ Accordion */}
      <FAQ />

      {/* 16. Final CTA Banner */}
      <CTA />

      {/* 17. Blog Preview */}
      <BlogPreview blogs={blogs} />

      {/* 18. Contact Section */}
      <HomeContact />
    </div>
  );
}
