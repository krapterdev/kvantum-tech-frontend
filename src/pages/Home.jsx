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

function LazySection({ children, minHeight = "200px" }) {
  const [isVisible, setIsVisible] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { rootMargin: '300px' });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ minHeight: isVisible ? 'auto' : minHeight }}>
      {isVisible ? children : null}
    </div>
  );
}

export default function Home({ services = [], blogs = [], blogsLoading = false, settings }) {
  return (
    <div className="fade-in-up">
      {/* Rich Snippet JSON-LD SEO Schema */}
      <SeoSchema />

      {/* 1. Hero Banner (Eager) */}
      <Hero settings={settings} />

      {/* 2. Trusted By / Social Proof Marquee (Eager) */}
      <TrustedBy />

      {/* 3. About Kvantum Tech Solutions (Eager) */}
      <About settings={settings} />

      {/* 4. Core Services & Custom Software (Eager) */}
      <Services services={services} />

      {/* 5. Business Automation Highlight (Lazy) */}
      <LazySection minHeight="250px">
        <BusinessAutomationHighlight />
      </LazySection>

      {/* 6. Interactive ROI & Time-Saved Calculator (Lazy) */}
      <LazySection minHeight="300px">
        <AutomationCalculator />
      </LazySection>

      {/* 7. Software Products Suite (Lazy) */}
      <LazySection minHeight="300px">
        <SoftwareProducts />
      </LazySection>

      {/* 8. Interactive System Dashboard Previews (Lazy) */}
      <LazySection minHeight="300px">
        <InteractiveDashboardMockup />
      </LazySection>

      {/* 9. Industries We Serve (Lazy) */}
      <LazySection minHeight="250px">
        <Industries />
      </LazySection>

      {/* 10. Why Choose Us (Lazy) */}
      <LazySection minHeight="250px">
        <WhyChooseUs />
      </LazySection>

      {/* 11. Technologies We Use (Lazy) */}
      <LazySection minHeight="250px">
        <Technologies />
      </LazySection>

      {/* 12. How We Work (Lazy) */}
      <LazySection minHeight="250px">
        <HowWeWork />
      </LazySection>

      {/* 13. Portfolio Showcase (Lazy) */}
      <LazySection minHeight="300px">
        <Projects />
      </LazySection>

      {/* 14. Live System Interactive Demo (Lazy) */}
      <LazySection minHeight="250px">
        <LiveDemo />
      </LazySection>

      {/* 15. Key Metrics & Stats (Lazy) */}
      <LazySection minHeight="150px">
        <Stats settings={settings} />
      </LazySection>

      {/* 16. Client Testimonials (Lazy) */}
      <LazySection minHeight="250px">
        <Testimonials settings={settings} />
      </LazySection>

      {/* 17. Transparent Pricing (Lazy) */}
      <LazySection minHeight="250px">
        <Pricing />
      </LazySection>

      {/* 18. Frequently Asked Questions (Lazy) */}
      <LazySection minHeight="250px">
        <FAQ />
      </LazySection>

      {/* 19. Latest Articles & Tech Insights (Lazy) */}
      <LazySection minHeight="250px">
        <BlogPreview blogs={blogs} blogsLoading={blogsLoading} />
      </LazySection>

      {/* 20. Full SEO Content Section (Lazy) */}
      <LazySection minHeight="300px">
        <HomeSeoContentSection />
      </LazySection>

      {/* 21. Live Counter Odometer (Lazy) */}
      <LazySection minHeight="100px">
        <VisitorOdometerCounter />
      </LazySection>

      {/* 22. Quick Consultation Form (Lazy) */}
      <LazySection minHeight="250px">
        <HomeContact settings={settings} />
      </LazySection>
    </div>
  );
}
