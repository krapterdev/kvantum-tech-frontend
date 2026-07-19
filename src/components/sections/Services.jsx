import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import LucideIcon from '../ui/LucideIcon';

export default function Services({ services = [] }) {
  const navigate = useNavigate();
  // Display all 6 services defined in our list
  const servicesPreview = services.slice(0, 6);

  return (
    <section className="container mx-auto max-w-[1280px] px-6 py-20 select-none bg-white/[0.002]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
        <div className="text-left">
          <span className="tech-badge mb-4">What We Do</span>
          <h2 className="text-3xl sm:text-4xl font-headline font-bold text-zinc-100 leading-tight">
            What We Actually Do <br />
            <span className="gradient-text">(No Buzzwords, We Promise)</span>
          </h2>
        </div>
        <Button
          onClick={() => navigate('/services')}
          variant="primary"
          className="text-sm px-6 py-3 rounded-lg bg-pinkCustom text-white hover:bg-pink-600 transition-colors shadow-[0_0_15px_rgba(236,72,153,0.3)] border-none"
        >
          Explore All Services <ArrowRight size={15} />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {servicesPreview.map(ser => (
          <Card
            key={ser.id}
            onClick={() => navigate('/services')}
            className="p-9 flex flex-col justify-between min-h-[300px] border hover:-translate-y-1.5 transition-all duration-300 text-left cursor-pointer"
          >
            <div className="flex flex-col gap-5">
              <div 
                className="w-11 h-11 rounded-lg bg-white/[0.02] border border-white/8 flex items-center justify-center"
                style={{ color: ser.color || 'var(--accent-cyan)' }}
              >
                <LucideIcon name={ser.iconName} size={20} />
              </div>
              <div>
                <h3 className="text-xl text-zinc-100 font-bold mb-2.5 font-headline">{ser.title}</h3>
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">{ser.shortDesc}</p>
              </div>
            </div>
            
            <div className="text-xs font-bold text-pinkCustom mt-6 flex items-center gap-1">
              Learn more <ArrowRight size={12} />
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
