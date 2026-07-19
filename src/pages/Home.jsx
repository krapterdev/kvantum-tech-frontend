import React from 'react';
import Hero from '@/components/sections/Hero';
import TrustedBy from '@/components/sections/TrustedBy';
import About from '@/components/sections/About';
import Services from '@/components/sections/Services';
import HowWeWork from '@/components/sections/HowWeWork';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import Stats from '@/components/sections/Stats';
import Testimonials from '@/components/sections/Testimonials';
import CTA from '@/components/sections/CTA';
import BlogPreview from '@/components/sections/BlogPreview';
import HomeContact from '@/components/sections/HomeContact';

export default function Home({ services = [], blogs = [], settings }) {
  return (
    <div className="fade-in-up">
      {/* 1. Hero Section */}
      <Hero settings={settings} />
      
      {/* 2. Trusted By Client Logos (Marquee) */}
      <TrustedBy />
      
      {/* 3. About Us (Short version) */}
      <About settings={settings} />
      
      {/* 4. Services Grid (6 cards) */}
      <Services services={services} />
      
      {/* 5. How We Work (Process Timeline) */}
      <HowWeWork />
      
      {/* 6. Why Choose Us */}
      <WhyChooseUs />
      
      {/* 7. Stats / Numbers */}
      <Stats settings={settings} />
      
      {/* 8. Testimonials */}
      <Testimonials settings={settings} />
      
      {/* 9. CTA Banner */}
      <CTA />
      
      {/* 10. Blog Preview */}
      <BlogPreview blogs={blogs} />
      
      {/* 11. Contact Section */}
      <HomeContact />
    </div>
  );
}
