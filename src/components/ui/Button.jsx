import React from 'react';
import { cn } from '@/lib/utils';

export default function Button({ children, className, variant = 'primary', onClick, type = 'button', disabled = false, ...props }) {
  const baseStyle = 'inline-flex items-center justify-center gap-2 font-headline font-semibold text-[15px] cursor-pointer rounded-xl transition-all duration-200 select-none disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'border border-zinc-700 bg-transparent text-zinc-100 hover:border-emerald-500 hover:text-emerald-400 hover:bg-zinc-800/20 px-7 py-[14px]',
    ghost: 'bg-transparent text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/30 px-4 py-2',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      className={cn(baseStyle, variants[variant], className)}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
