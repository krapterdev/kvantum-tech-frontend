import React from 'react';
import { cn } from '@/lib/utils';

export default function GradientText({ children, className }) {
  return (
    <span className={cn("gradient-text font-bold", className)}>
      {children}
    </span>
  );
}
