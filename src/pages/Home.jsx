import React from 'react';
import Hero from '@/components/sections/Hero';
import TrustedBy from '@/components/sections/TrustedBy';
import About from '@/components/sections/About';
import Services from '@/components/sections/Services';
import BusinessAutomationHighlight from '@/components/sections/BusinessAutomationHighlight';
import SoftwareProducts from '@/components/sections/SoftwareProducts';
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

export default function Home({ services = [], blogs = [], settings }) {
  return (
    <div className="fade-in-up">

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

      {/* 6. Software Products */}
      <SoftwareProducts />

      {/* 7. Automation Features */}
      <AutomationFeatures />

      {/* 8. Industries We Serve */}
      <Industries />

      {/* 9. Why Choose Kvantum Tech Solutions */}
      <WhyChooseUs />

      {/* 10. Technologies We Use */}
      <Technologies />

      {/* 11. Our Process / How We Work */}
      <HowWeWork />

      {/* 12. Portfolio / Case Studies */}
      <Projects />

      {/* 13. Live Demo */}
      <LiveDemo />

      {/* 14. Success Metrics */}
      <Stats settings={settings} />

      {/* 15. Client Testimonials */}
      <Testimonials settings={settings} />

      {/* 16. Pricing Plans */}
      <Pricing />

      {/* 17. FAQs (15 Questions) */}
      <FAQ />

      {/* 18. Latest Blogs */}
      <BlogPreview blogs={blogs} />

      {/* 19. Free Consultation CTA */}
      <CTA />

      {/* 20. Contact Form */}
      <HomeContact />

    </div>
  );
}
