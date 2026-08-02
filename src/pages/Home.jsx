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

export default function Home({ services = [], blogs = [], settings }) {
  return (
    <div className="fade-in-up">
      {/* Rich Snippet JSON-LD SEO Schema */}
      <SeoSchema />

      {/* 1. Hero Banner */}
      <Hero settings={settings} />

      {/* 2. Trusted By / Social Proof Marquee */}
      <TrustedBy />

      {/* 3. About Kvantum Tech Solutions */}
      <About settings={settings} />

      {/* 4. Core Services & Custom Software */}
      <Services services={services} />

      {/* 5. Business Automation Highlight */}
      <BusinessAutomationHighlight />

      {/* 6. Interactive ROI & Time-Saved Calculator */}
      <AutomationCalculator />

      {/* 7. Software Products Suite */}
      <SoftwareProducts />

      {/* 8. Interactive System Dashboard Previews */}
      <InteractiveDashboardMockup />

      {/* 9. Industries We Serve */}
      <Industries />

      {/* 10. Why Choose Kvantum Tech Solutions */}
      <WhyChooseUs />

      {/* 11. Technologies We Use */}
      <Technologies />

      {/* 12. Our Development Process */}
      <HowWeWork />

      {/* 13. Meet Our Leadership & Core Team */}
      <CardStackShowcase />

      {/* 14. Portfolio & Case Studies */}
      <Projects />

      {/* 15. Live Demo CTA */}
      <LiveDemo />

      {/* 16. Success Metrics */}
      <Stats settings={settings} />

      {/* 17. Client Testimonials */}
      <Testimonials settings={settings} />

      {/* 18. Pricing Plans */}
      <Pricing />

      {/* 19. Rich SEO Enterprise Solutions Content */}
      <HomeSeoContentSection />

      {/* 20. Latest Blogs & Resources */}
      <BlogPreview blogs={blogs} />

      {/* 21. FAQs (15 SEO Questions at bottom) */}
      <FAQ />

      {/* 22. Free Consultation CTA */}
      <CTA />

      {/* 22. Live Visitor Speedometer & Odometer Counter */}
      <VisitorOdometerCounter />

      {/* 23. Contact Form */}
      <HomeContact />

    </div>
  );
}
