import React from 'react';
import Card from '../ui/Card';
import SectionHeading from '../ui/SectionHeading';

export default function HowWeWork() {
  const steps = [
    {
      num: "01",
      title: "We Listen First",
      text: "You tell us what's broken, what you need, or what you're dreaming about. We ask questions. Lots of them. No pitch, just understanding."
    },
    {
      num: "02",
      title: "We Map It Out",
      text: "We create a clear plan — timeline, tech stack, costs, milestones. You see everything before we write a single line of code. No surprises."
    },
    {
      num: "03",
      title: "We Build It Right",
      text: "Regular updates, weekly demos, your feedback looped in at every stage. You're not waiting months to see what we've been doing."
    },
    {
      num: "04",
      title: "We Stick Around",
      text: "Launch is just the beginning. We handle bugs, updates, and optimizations because a good relationship doesn't end at delivery."
    }
  ];

  return (
    <section className="container mx-auto max-w-[1280px] px-6 py-20 select-none">
      <SectionHeading
        badge="Our Process"
        title="How Things Work Around Here"
        subtitle="It's pretty simple. We don't hide behind managers or build in secret."
      />
      
      {/* Steps layout grid: 4 columns on desktop, timeline connector lines */}
      <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
        {steps.map((step, idx) => (
          <div key={idx} className="relative flex flex-col items-start text-left group">
            
            {/* Step card container */}
            <Card className="p-8 border h-full w-full flex flex-col gap-4.5 relative z-10 hover:-translate-y-1.5 transition-all duration-300">
              <span className="text-4xl font-black font-headline text-pinkCustom/20 group-hover:text-pinkCustom transition-colors duration-300">
                {step.num}
              </span>
              <h4 className="text-xl font-headline font-bold text-zinc-150">{step.title}</h4>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">{step.text}</p>
            </Card>

            {/* Connecting dot timeline connectors for desktop (rendered on all except last) */}
            {idx < 3 && (
              <div className="hidden lg:block absolute top-[10%] left-[90%] w-[40%] h-[1px] border-t-2 border-dashed border-white/8 z-0 group-hover:border-pinkCustom/30 transition-colors" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
