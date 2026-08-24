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

export default function Home({ services = [], blogs = [], blogsLoading = false, settings }) {
  return (
    <div className="fade-in-up">
      {/* Rich Snippet JSON-LD SEO Schema */}
      <SeoSchema />

      {/* 1. Hero Banner (Eager Above-The-Fold) */}
      <Hero settings={settings} />

      {/* 2. Trusted By / Social Proof Marquee (Eager) */}
      <TrustedBy />

      {/* 3. About Kvantum Tech Solutions (Eager) */}
      <About settings={settings} />

      {/* 4. Core Services & Custom Software (Eager) */}
      <Services services={services} />

      {/* 5. Business Automation Highlight (Native CSS Deferred) */}
      <div className="content-visibility-auto">
        <BusinessAutomationHighlight />
      </div>

      {/* 6. Interactive ROI & Time-Saved Calculator (Native CSS Deferred) */}
      <div className="content-visibility-auto">
        <AutomationCalculator />
      </div>

      {/* 7. Software Products Suite (Native CSS Deferred) */}
      <div className="content-visibility-auto">
        <SoftwareProducts />
      </div>

      {/* 8. Interactive System Dashboard Previews (Native CSS Deferred) */}
      <div className="content-visibility-auto">
        <InteractiveDashboardMockup />
      </div>

      {/* 9. Industries We Serve (Native CSS Deferred) */}
      <div className="content-visibility-auto">
        <Industries />
      </div>

      {/* 10. Why Choose Us (Native CSS Deferred) */}
      <div className="content-visibility-auto">
        <WhyChooseUs />
      </div>

      {/* 11. Technologies We Use (Native CSS Deferred) */}
      <div className="content-visibility-auto">
        <Technologies />
      </div>

      {/* 12. How We Work (Native CSS Deferred) */}
      <div className="content-visibility-auto">
        <HowWeWork />
      </div>

      {/* 13. Portfolio Showcase (Native CSS Deferred) */}
      <div className="content-visibility-auto">
        <Projects />
      </div>

      {/* 14. Live System Interactive Demo (Native CSS Deferred) */}
      <div className="content-visibility-auto">
        <LiveDemo />
      </div>

      {/* 15. Key Metrics & Stats (Native CSS Deferred) */}
      <div className="content-visibility-auto">
        <Stats settings={settings} />
      </div>

      {/* 16. Client Testimonials (Native CSS Deferred) */}
      <div className="content-visibility-auto">
        <Testimonials settings={settings} />
      </div>

      {/* 17. Transparent Pricing (Native CSS Deferred) */}
      <div className="content-visibility-auto">
        <Pricing />
      </div>

      {/* 18. Frequently Asked Questions (Native CSS Deferred) */}
      <div className="content-visibility-auto">
        <FAQ />
      </div>

      {/* 19. Latest Articles & Tech Insights (Native CSS Deferred) */}
      <div className="content-visibility-auto">
        <BlogPreview blogs={blogs} blogsLoading={blogsLoading} />
      </div>

      {/* 20. Full SEO Content Section (Native CSS Deferred) */}
      <div className="content-visibility-auto">
        <HomeSeoContentSection />
      </div>

      {/* 21. Live Counter Odometer (Native CSS Deferred) */}
      <div className="content-visibility-auto">
        <VisitorOdometerCounter />
      </div>

      {/* 22. Quick Consultation Form (Native CSS Deferred) */}
      <div className="content-visibility-auto">
        <HomeContact settings={settings} />
      </div>
    </div>
  );
}
