import React from 'react';
import { cn } from '@/lib/utils';

export default function Badge({ children, className, ...props }) {
  return (
    <div
      className={cn("tech-badge select-none hover:brightness-110 transition-all", className)}
      {...props}
    >
      {children}
    </div>
  );
}
