import React from 'react';
import Hero from '@/components/sections/Hero';
import TrustedBy from '@/components/sections/TrustedBy';
import Services from '@/components/sections/Services';
import About from '@/components/sections/About';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import Projects from '@/components/sections/Projects';
import Testimonials from '@/components/sections/Testimonials';
import CTA from '@/components/sections/CTA';
import Newsletter from '@/components/sections/Newsletter';

export default function Home({ services = [] }) {
  return (
    <div className="fade-in-up">
      <Hero />
      <TrustedBy />
      <Services services={services} />
      <About />
      <WhyChooseUs />
      <Projects />
      <Testimonials />
      <CTA />
      <Newsletter />
    </div>
  );
}
