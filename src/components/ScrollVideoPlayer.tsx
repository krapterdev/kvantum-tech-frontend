'use client';

import React, { useRef, useEffect, useState } from 'react';

export default function ScrollVideoPlayer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDark, setIsDark] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const totalFrames = 150;

  // Detect Mobile screens and theme
  useEffect(() => {
    const checkState = () => {
      const root = document.documentElement;
      setIsDark(root.classList.contains('dark') && !root.classList.contains('light-mode'));
      setIsMobile(window.innerWidth < 768);
    };
    checkState();

    const observer = new MutationObserver(checkState);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    window.addEventListener('resize', checkState);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', checkState);
    };
  }, []);

  // Preload scroller frames ONLY on Desktop AFTER initial page load (FCP/LCP completed)
  useEffect(() => {
    if (isMobile) return;

    let timer: any;
    const loadFrames = () => {
      let loadedCount = 0;
      const preloadedImages: HTMLImageElement[] = [];

      for (let i = 1; i <= totalFrames; i += 2) {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        const paddedIndex = String(i).padStart(3, '0');
        img.src = `https://bwdtxlosvptlqtixgcip.supabase.co/storage/v1/object/public/kvantumtechsolutions_storage/scroller-images/ezgif-frame-${paddedIndex}.jpg`;

        const handleLoadOrError = () => {
          loadedCount++;
          if (loadedCount >= 5) {
            setLoading(false);
          }
        };

        img.onload = handleLoadOrError;
        img.onerror = handleLoadOrError;
        preloadedImages.push(img);
      }
      setImages(preloadedImages);
    };

    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(() => loadFrames(), { timeout: 3000 });
    } else {
      timer = setTimeout(loadFrames, 2500);
    }

    return () => clearTimeout(timer);
  }, [isMobile]);

  // Handle canvas drawing on scroll and resize
  useEffect(() => {
    if (isMobile || loading || images.length === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrame();
    };

    const drawFrame = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;

      let scrollFraction = 0;
      if (scrollHeight > 0) {
        scrollFraction = scrollTop / scrollHeight;
      }

      const frameIndex = Math.min(images.length - 1, Math.max(0, Math.floor(scrollFraction * images.length)));
      const img = images[frameIndex];

      if (!img || !img.complete) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const imgRatio = img.width / img.height;
      const canvasRatio = canvas.width / canvas.height;

      let drawWidth, drawHeight, drawX, drawY;

      if (canvasRatio > imgRatio) {
        drawWidth = canvas.width;
        drawHeight = canvas.width / imgRatio;
        drawX = 0;
        drawY = (canvas.height - drawHeight) / 2;
      } else {
        drawWidth = canvas.height * imgRatio;
        drawHeight = canvas.height;
        drawX = (canvas.width - drawWidth) / 2;
        drawY = 0;
      }

      ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', drawFrame, { passive: true });
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', drawFrame);
    };
  }, [isMobile, loading, images]);

  if (isMobile || !isDark) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{
        zIndex: -20,
        opacity: 0.35,
        filter: 'blur(1px)',
      }}
    />
  );
}
