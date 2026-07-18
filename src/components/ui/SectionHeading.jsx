import React from 'react';
import { cn } from '@/lib/utils';
import Badge from './Badge';

export default function SectionHeading({ badge, title, subtitle, className }) {
  return (
    <div className={cn("text-center max-w-2xl mx-auto mb-16 flex flex-col items-center gap-4", className)}>
      {badge && <Badge>{badge}</Badge>}
      <h2 className="text-3xl sm:text-4xl font-headline font-bold text-zinc-100 tracking-tight leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base sm:text-lg text-zinc-400 leading-relaxed font-sans">
          {subtitle}
        </p>
      )}
    </div>
  );
}
