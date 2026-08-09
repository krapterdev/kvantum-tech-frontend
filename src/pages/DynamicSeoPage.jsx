import React, { useEffect } from 'react';
import Link from '@/components/ui/SafeLink';
import { Link2, ShieldCheck, Cpu, ArrowRight, Server, Key, AlertTriangle } from 'lucide-react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { setPageSeoStatus } from '@/utils/seoUtils';

export default function DynamicSeoPage({ seoPages = [], keywordSlug }) {
  const slug = keywordSlug;
  const page = seoPages.find(p => p.slug === slug);

  useEffect(() => {
    if (page) {
      setPageSeoStatus({
        status: 200,
        title: page.metaTitle || page.title,
        description: page.metaDesc || page.content.substring(0, 160)
      });
    } else {
      setPageSeoStatus({
        status: 404,
        title: '404 Keyword Page Not Found | Kvantum Tech Solutions',
        description: 'The requested keyword page does not exist.'
      });
    }
  }, [page]);

  if (!page) {
    return (
      <div className="container mx-auto max-w-[1280px] px-6 py-24 text-center relative z-10 select-none text-left">
        <Card className="max-w-[500px] mx-auto p-12 border text-center shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
          <AlertTriangle size={48} className="text-red-400 mx-auto mb-6" />
          <h2 className="text-zinc-100 text-xl font-bold font-headline mb-3">Page Not Found</h2>
          <p className="text-zinc-500 font-mono text-[13px] mb-8">
            The keyword page you are looking for does not exist.
          </p>
          <Link to="/">
            <Button variant="primary">Return to Home</Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-[1280px] px-6 py-20 relative z-[5] select-none text-left">
      
      {/* 1. Header Banner */}
      <div className="mb-12">
        <Badge className="mb-4">
          <ShieldCheck size={12} className="text-cyanCustom" /> SEO Optimization
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-headline font-bold text-zinc-100 mb-5 leading-tight">
          {page.title}
        </h1>
        <div className="flex gap-2 items-center text-xs sm:text-sm font-mono text-zinc-500">
          <Key size={14} className="text-cyanCustom" /> URL Path: 
          <span className="text-zinc-200">/keyword/{page.slug}</span>
        </div>
      </div>

      {/* 2. Split Content Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        
        {/* Left: Content Copy */}
        <Card className="p-9 sm:p-10 border text-left">
          <h3 className="text-zinc-100 text-lg font-bold font-headline mb-6 flex items-center gap-2">
            <Cpu size={16} className="text-cyanCustom" /> Overview
          </h3>
          <div className="text-zinc-400 text-sm sm:text-base leading-relaxed flex flex-col gap-5">
            {page.content.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 mt-10 border-t border-white/8 pt-8">
            <Link to="/contact">
              <Button variant="primary">
                Contact Us <Link2 size={16} />
              </Button>
            </Link>
            <Link to="/services">
              <Button variant="secondary">
                Our Services
              </Button>
            </Link>
          </div>
        </Card>

        {/* Right: Technical Metadata Diagnostics Card */}
        <div className="flex flex-col gap-6 w-full">
          
          {/* Metadata info */}
          <Card className="p-8 sm:p-9 border text-left">
            <h3 className="text-zinc-100 text-base font-bold font-headline border-b border-white/8 pb-3 mb-6 flex items-center gap-2">
              <Server size={16} className="text-purpleCustom" /> SEO Index Metadata
            </h3>
            
            <div className="flex flex-col gap-6 text-[13px] font-mono">
              <div>
                <span className="text-zinc-500 block uppercase mb-1.5 text-xs">Meta Title</span>
                <span className="text-zinc-200 block break-all font-sans text-sm">{page.metaTitle}</span>
              </div>
              
              <div>
                <span className="text-zinc-500 block uppercase mb-1.5 text-xs">Meta Description</span>
                <span className="text-zinc-300 block font-sans leading-relaxed text-sm">{page.metaDesc}</span>
              </div>

              {page.metaKeywords && (
                <div>
                  <span className="text-zinc-500 block uppercase mb-1.5 text-xs">Meta Keywords</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {page.metaKeywords.split(',').map((kw, idx) => (
                      <span key={idx} className="px-2.5 py-1 bg-white/[0.02] border border-white/8 rounded-md text-[11px] text-cyanCustom font-mono">
                        {kw.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="border-t border-white/8 pt-5 text-zinc-500 text-[11px] leading-relaxed">
                STATUS: programmatically injected into active DOM head nodes. Crawlers parsing enabled.
              </div>
            </div>
          </Card>

          {/* Quick FAQ info block */}
          <Card className="p-8 border text-left">
            <h4 className="text-sm font-semibold text-zinc-200 mb-2 font-headline">Dynamic Connectivity</h4>
            <p className="text-zinc-400 text-xs leading-relaxed font-sans">
              This landing page is generated programmatically from the Admin CMS. The path routes dynamically matching SEO schema indexations, loading assets through lightweight serverless delivery networks.
            </p>
          </Card>

        </div>

      </div>

    </div>
  );
}
