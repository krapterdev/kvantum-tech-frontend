import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Building2, Users, Code } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

const highlights = [
  { label: 'Custom Software Development', color: 'text-cyanCustom' },
  { label: 'CRM & HRMS Software', color: 'text-pinkCustom' },
  { label: 'Business Process Automation', color: 'text-purpleCustom' },
  { label: 'WhatsApp API Integration', color: 'text-cyanCustom' },
  { label: 'Web & Mobile App Development', color: 'text-pinkCustom' },
  { label: 'ERP & Enterprise Solutions', color: 'text-purpleCustom' },
];

export default function About({ settings }) {
  const navigate = useNavigate();
  const about = settings?.about || {};

  return (
    <section className="bg-zinc-950/10 py-24 px-6 select-none">
      <div className="container mx-auto max-w-[1280px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center text-left">

          {/* Left Side: Company Introduction */}
          <div className="flex flex-col items-start">
            <Badge className="mb-5 bg-pinkCustom/10 border-pinkCustom/20 text-pinkCustom">
              About Kvantum Tech Solutions
            </Badge>

            <h2 className="text-3xl sm:text-4xl font-headline font-bold text-zinc-100 mb-4 leading-tight">
              Software Built Around Your Business
            </h2>

            <p className="text-sky-500 dark:text-cyanCustom font-semibold text-base sm:text-lg mb-4">
              Every business operates differently. Your software should too.
            </p>

            <div className="text-zinc-400 text-sm sm:text-base leading-relaxed flex flex-col gap-4 mb-6">
              <p>
                Kvantum Tech Solutions is a <strong>custom software development company</strong> focused on building technology that solves real operational challenges. Instead of forcing businesses to adapt to rigid, off-the-shelf tools, we develop solutions around your workflows, users, processes, and long-term goals.
              </p>
              <p>
                Our <strong>custom software development services</strong> cover everything from internal business systems and customer portals to CRM, HRMS, ERP, web applications, mobile apps, and workflow automation.
              </p>
              <p>
                Whether you're replacing spreadsheets, connecting disconnected systems, automating repetitive work, or turning a new software idea into a scalable product, our team works with you from planning and architecture through development, deployment, and ongoing improvement.
              </p>
              <p className="text-zinc-300 font-medium">
                The result is not just another application. It's software designed to make your business simpler to manage and easier to scale.
              </p>
            </div>

            {/* Service Highlights */}
            <div className="flex flex-wrap gap-3 mb-8">
              {highlights.map((h, idx) => (
                <div key={idx} className={`flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/8 ${h.color}`}>
                  <CheckCircle2 size={12} />
                  <span>{h.label}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate('/about')}
              className="group text-sm font-bold text-cyanCustom hover:text-cyan-400 flex items-center gap-1.5 cursor-pointer transition-colors duration-200"
            >
              About Kvantum Tech Solutions <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Right Side: Key Stats / Achievements Card */}
          <div className="flex justify-center w-full">
            <div className="relative w-full max-w-[440px]">
              <div className="absolute inset-0 bg-gradient-to-tr from-pinkCustom/10 via-purpleCustom/10 to-transparent blur-2xl -z-10 rounded-3xl" />

              <Card className="w-full p-8 border flex flex-col gap-5 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.4)]">

                {[
                  {
                    icon: Building2,
                    iconClass: 'text-pinkCustom bg-pinkCustom/10 border-pinkCustom/20',
                    badge: 'Scale',
                    title: '250+ Projects Delivered Across 15+ Industries'
                  },
                  {
                    icon: Code,
                    iconClass: 'text-cyanCustom bg-cyanCustom/10 border-cyanCustom/20',
                    badge: 'Technology',
                    title: '100% Custom-Built — No Templates, No License Lock-in'
                  },
                  {
                    icon: Users,
                    iconClass: 'text-purpleCustom bg-purpleCustom/10 border-purpleCustom/20',
                    badge: 'Partnership',
                    title: 'Dedicated Team — In-house Developers & Automation Experts'
                  },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="flex items-center gap-4">
                      <div className={`p-2.5 ${item.iconClass} border rounded-xl shrink-0`}>
                        <Icon size={20} />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">{item.badge}</span>
                        <h4 className="text-zinc-100 font-semibold text-sm font-headline leading-snug">{item.title}</h4>
                      </div>
                    </div>
                  );
                })}

                <div className="border-t border-white/8 pt-4 mt-1 flex justify-between items-center text-xs font-mono text-zinc-500">
                  <span>Delhi NCR, India</span>
                  <span className="text-pinkCustom">SOFTWARE DEVELOPMENT</span>
                </div>
              </Card>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
