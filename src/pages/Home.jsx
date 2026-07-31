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
import AutomationFeatures from '@/components/sections/AutomationFeatures';
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
import HomeContact from '@/components/sections/HomeContact';
import SeoSchema from '@/components/sections/SeoSchema';

export default function Home({ services = [], blogs = [], settings }) {
  return (
    <div className="fade-in-up">
      {/* JSON-LD Rich Snippet SEO Schema */}
      <SeoSchema />

      {/* 1. Hero Banner */}
      <Hero settings={settings} />

      {/* 2. Trusted By / Social Proof */}
      <TrustedBy />

      {/* 3. About Kvantum Tech Solutions */}
      <About settings={settings} />

      {/* 4. Core Services */}
      <Services services={services} />

      {/* 5. Business Automation Solutions (Main Highlight) */}
      <BusinessAutomationHighlight />

      {/* 6. Interactive ROI & Time-Saved Calculator */}
      <AutomationCalculator />

      {/* 7. Software Products */}
      <SoftwareProducts />

      {/* 8. Interactive Live Dashboard Previews */}
      <InteractiveDashboardMockup />

      {/* 9. Interactive 3D Card Stack Fan-Out Showcase */}
      <CardStackShowcase />

      {/* 10. Automation Features Checklist */}
      <AutomationFeatures />

      {/* 11. Industries We Serve */}
      <Industries />

      {/* 12. Why Choose Kvantum Tech Solutions */}
      <WhyChooseUs />

      {/* 13. Technologies We Use */}
      <Technologies />

      {/* 14. Our Process / How We Work */}
      <HowWeWork />

      {/* 15. Portfolio / Case Studies */}
      <Projects />

      {/* 16. Live Demo */}
      <LiveDemo />

      {/* 17. Success Metrics */}
      <Stats settings={settings} />

      {/* 18. Client Testimonials */}
      <Testimonials settings={settings} />

      {/* 19. Pricing Plans */}
      <Pricing />

      {/* 20. FAQs (15 Questions) */}
      <FAQ />

      {/* 21. Latest Blogs */}
      <BlogPreview blogs={blogs} />

      {/* 22. Free Consultation CTA */}
      <CTA />

      {/* 23. Contact Form */}
      <HomeContact />

    </div>
  );
}
