import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import GradientText from '@/components/ui/GradientText';
import LucideIcon from '@/components/ui/LucideIcon';

export default function ServicesPage({ services = [] }) {
  const navigate = useNavigate();

  const handleCardClick = (service) => {
    navigate(`/services/${service.id}`);
  };

  return (
    <div className="container mx-auto max-w-[1280px] px-6 py-20 relative z-[5] select-none text-left">
      
      {/* 1. Introductory Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24 border-b border-white/8 pb-20">
        <div>
          <Badge className="mb-4">Our Services</Badge>
          <h1 className="text-4xl sm:text-5xl font-headline font-bold text-zinc-100 mb-6 leading-tight">
            Capabilities <GradientText>Explorer</GradientText>
          </h1>
          <p className="text-zinc-400 text-base leading-relaxed mb-5">
            Studio Kvantum delivers custom web development, brand design, and search performance strategies. We do not use template page builders; we engineer fast, secure, and responsive web products.
          </p>
          <p className="text-zinc-400 text-base leading-relaxed">
            Select any capability block below to examine our development stack, workflow focus, and target metrics.
          </p>
        </div>

        <div className="flex justify-center">
          <img 
            src="https://bwdtxlosvptlqtixgcip.supabase.co/storage/v1/object/public/kvantumtechsolutions_storage/services_graphics.png" 
            alt="Services dashboard node illustration" 
            className="w-full max-w-[460px] rounded-2xl border border-white/8 shadow-[0_15px_40px_rgba(138,43,226,0.1)] object-cover"
          />
        </div>
      </div>

      {/* 2. Services Grid */}
      <div>
        <div className="mb-12 text-center">
          <h2 className="text-2xl sm:text-3xl text-zinc-100 font-bold font-headline">Select a Capability</h2>
          <p className="text-zinc-400 text-sm mt-2">
            Click on a service card to expand the details.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => (
            <Card
              key={service.id}
              onClick={() => handleCardClick(service)}
              className="p-10 cursor-pointer flex gap-6 border hover:-translate-y-1 transition-all duration-300"
              style={{
                hoverBorderColor: service.color || 'var(--accent-cyan)'
              }}
            >
              {/* Icon box */}
              <div 
                className="w-[60px] h-[60px] rounded-2xl bg-white/[0.02] border border-white/8 flex items-center justify-center shrink-0"
                style={{ color: service.color || 'var(--accent-cyan)' }}
              >
                <LucideIcon name={service.iconName} size={26} />
              </div>

              {/* Details */}
              <div className="flex flex-col gap-3">
                <h4 className="text-xl text-zinc-100 font-bold font-headline">
                  {service.title}
                </h4>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {service.shortDesc}
                </p>
                <div 
                  className="flex items-center gap-1.5 text-xs font-semibold mt-2 transition-colors duration-200"
                  style={{ color: service.color || 'var(--accent-cyan)' }}
                >
                  View Details <ArrowRight size={14} />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
