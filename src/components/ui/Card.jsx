import React, { useRef } from 'react';
import { cn } from '@/lib/utils';

export default function Card({ children, className, scanline = false, tilt = false, ...props }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!tilt || !cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    const rotateX = -y / 15;
    const rotateY = x / 15;
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    if (!tilt || !cardRef.current) return;
    const card = cardRef.current;
    card.style.transform = 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  return (
    <div className={cn(tilt && 'tilt-wrapper')} {...props}>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={cn(
          'glass-card p-6 border relative transition-all duration-300',
          scanline && 'scanline-card',
          tilt && 'tilt-card cursor-pointer',
          className
        )}
      >
        <div className={cn(tilt && 'tilt-inner')}>
          {children}
        </div>
      </div>
    </div>
  );
}
