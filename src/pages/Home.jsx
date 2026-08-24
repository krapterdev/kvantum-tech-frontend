import React, { Suspense, lazy } from 'react';
import Hero from '@/components/sections/Hero';
import TrustedBy from '@/components/sections/TrustedBy';
import About from '@/components/sections/About';
import Services from '@/components/sections/Services';
import SeoSchema from '@/components/sections/SeoSchema';

// Lazy load below-the-fold sections so mobile initial payload is lightweight and instant
const BusinessAutomationHighlight = lazy(() => import('@/components/sections/BusinessAutomationHighlight'));
const AutomationCalculator = lazy(() => import('@/components/sections/AutomationCalculator'));
const SoftwareProducts = lazy(() => import('@/components/sections/SoftwareProducts'));
const InteractiveDashboardMockup = lazy(() => import('@/components/sections/InteractiveDashboardMockup'));
const CardStackShowcase = lazy(() => import('@/components/sections/CardStackShowcase'));
const Industries = lazy(() => import('@/components/sections/Industries'));
const WhyChooseUs = lazy(() => import('@/components/sections/WhyChooseUs'));
const Technologies = lazy(() => import('@/components/sections/Technologies'));
const HowWeWork = lazy(() => import('@/components/sections/HowWeWork'));
const Projects = lazy(() => import('@/components/sections/Projects'));
const LiveDemo = lazy(() => import('@/components/sections/LiveDemo'));
const Stats = lazy(() => import('@/components/sections/Stats'));
const Testimonials = lazy(() => import('@/components/sections/Testimonials'));
const Pricing = lazy(() => import('@/components/sections/Pricing'));
const FAQ = lazy(() => import('@/components/sections/FAQ'));
const BlogPreview = lazy(() => import('@/components/sections/BlogPreview'));
const VisitorOdometerCounter = lazy(() => import('@/components/sections/VisitorOdometerCounter'));
const HomeContact = lazy(() => import('@/components/sections/HomeContact'));
const HomeSeoContentSection = lazy(() => import('@/components/sections/HomeSeoContentSection'));

export default function Home({ services = [], blogs = [], blogsLoading = false, settings }) {
  return (
    <div className="fade-in-up">
      {/* Rich Snippet JSON-LD SEO Schema */}
      <SeoSchema />

      {/* 1. Hero Banner (Eager Above-The-Fold) */}
      <Hero settings={settings} />

      {/* 2. Trusted By / Social Proof Marquee (Eager Above-The-Fold) */}
      <TrustedBy />

      {/* 3. About Kvantum Tech Solutions (Eager) */}
      <About settings={settings} />

      {/* 4. Core Services & Custom Software (Eager) */}
      <Services services={services} />

      {/* Below-the-fold lazy loaded sections */}
      <Suspense fallback={<div className="h-40 w-full" />}>
        {/* 5. Business Automation Highlight */}
        <div className="content-visibility-auto">
          <BusinessAutomationHighlight />
        </div>

        {/* 6. Interactive ROI & Time-Saved Calculator */}
        <div className="content-visibility-auto">
          <AutomationCalculator />
        </div>

        {/* 7. Software Products Suite */}
        <div className="content-visibility-auto">
          <SoftwareProducts />
        </div>

        {/* 8. Interactive System Dashboard Previews */}
        <div className="content-visibility-auto">
          <InteractiveDashboardMockup />
        </div>

        {/* 9. Leadership & Core Department Heads */}
        <div className="content-visibility-auto">
          <CardStackShowcase />
        </div>

        {/* 10. Industries We Serve */}
        <div className="content-visibility-auto">
          <Industries />
        </div>

        {/* 11. Why Choose Us */}
        <div className="content-visibility-auto">
          <WhyChooseUs />
        </div>

        {/* 12. Technologies We Use */}
        <div className="content-visibility-auto">
          <Technologies />
        </div>

        {/* 13. How We Work */}
        <div className="content-visibility-auto">
          <HowWeWork />
        </div>

        {/* 14. Portfolio Showcase */}
        <div className="content-visibility-auto">
          <Projects />
        </div>

        {/* 15. Live System Interactive Demo */}
        <div className="content-visibility-auto">
          <LiveDemo />
        </div>

        {/* 16. Key Metrics & Stats */}
        <div className="content-visibility-auto">
          <Stats settings={settings} />
        </div>

        {/* 17. Client Testimonials */}
        <div className="content-visibility-auto">
          <Testimonials settings={settings} />
        </div>

        {/* 18. Transparent Pricing */}
        <div className="content-visibility-auto">
          <Pricing />
        </div>

        {/* 19. Frequently Asked Questions */}
        <div className="content-visibility-auto">
          <FAQ />
        </div>

        {/* 20. Latest Articles & Tech Insights */}
        <div className="content-visibility-auto">
          <BlogPreview blogs={blogs} blogsLoading={blogsLoading} />
        </div>

        {/* 21. Full SEO Content Section */}
        <div className="content-visibility-auto">
          <HomeSeoContentSection />
        </div>

        {/* 22. Live Counter Odometer */}
        <div className="content-visibility-auto">
          <VisitorOdometerCounter />
        </div>

        {/* 23. Quick Consultation Form */}
        <div className="content-visibility-auto">
          <HomeContact settings={settings} />
        </div>
      </Suspense>
    </div>
  );
}

