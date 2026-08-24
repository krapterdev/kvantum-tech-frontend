'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function EarthGlobe() {
  const canvasRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, { rootMargin: '150px' });

    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let isDragging = false;
    let previousMouseX = 0;

    const updateDimensions = () => {
      const containerWidth = canvas.parentElement?.clientWidth || 550;
      const displayWidth = Math.min(containerWidth, 600);
      const isSmall = window.innerWidth < 640;
      const displayHeight = isSmall ? 320 : 420;

      canvas.width = displayWidth;
      canvas.height = displayHeight;
      return { width: displayWidth, height: displayHeight };
    };

    let { width, height } = updateDimensions();

    let rotationY = 1.8;
    let time = 0;

    // Major Global Tech Hubs
    const globalHubs = [
      { name: 'India (Delhi HQ)', lat: (28.6 * Math.PI) / 180, lon: (77.2 * Math.PI) / 180, color: '#38bdf8', isHQ: true },
      { name: 'Dubai', lat: (25.2 * Math.PI) / 180, lon: (55.2 * Math.PI) / 180, color: '#ec4899' },
      { name: 'London', lat: (51.5 * Math.PI) / 180, lon: (-0.1 * Math.PI) / 180, color: '#a855f7' },
      { name: 'New York', lat: (40.7 * Math.PI) / 180, lon: (-74.0 * Math.PI) / 180, color: '#38bdf8' },
      { name: 'Singapore', lat: (1.3 * Math.PI) / 180, lon: (103.8 * Math.PI) / 180, color: '#4ade80' },
      { name: 'Tokyo', lat: (35.6 * Math.PI) / 180, lon: (139.6 * Math.PI) / 180, color: '#fbbf24' },
      { name: 'Sydney', lat: (-33.8 * Math.PI) / 180, lon: (151.2 * Math.PI) / 180, color: '#38bdf8' },
    ];

    // High Density Vector Continents
    const mapPoints = [];
    const step = 0.055;

    for (let lat = -Math.PI / 2 + 0.12; lat <= Math.PI / 2 - 0.12; lat += step) {
      const latDeg = (lat * 180) / Math.PI;

      for (let lon = -Math.PI; lon <= Math.PI; lon += step) {
        const lonDeg = (lon * 180) / Math.PI;

        const isIndia = latDeg >= 6 && latDeg <= 36 && lonDeg >= 68 && lonDeg <= 90;
        const isAsia = latDeg > 5 && latDeg < 75 && lonDeg >= 45 && lonDeg < 150;
        const isEurope = latDeg > 35 && latDeg < 72 && lonDeg >= -10 && lonDeg < 45;
        const isAfrica = latDeg > -35 && latDeg < 37 && lonDeg >= -18 && lonDeg < 52;
        const isNAmerica = latDeg > 15 && latDeg < 72 && lonDeg >= -170 && lonDeg < -50;
        const isSAmerica = latDeg > -56 && latDeg < 15 && lonDeg >= -85 && lonDeg < -35;
        const isAustralia = latDeg > -42 && latDeg < -10 && lonDeg >= 110 && lonDeg < 155;

        if (isIndia || isAsia || isEurope || isAfrica || isNAmerica || isSAmerica || isAustralia) {
          mapPoints.push({ lat, lon, isIndia });
        }
      }
    }

    // Mouse & Touch Drag Controls
    const onMouseDown = (e) => {
      isDragging = true;
      previousMouseX = e.clientX;
    };
    const onMouseMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMouseX;
      rotationY += deltaX * 0.006;
      previousMouseX = e.clientX;
    };
    const onMouseUp = () => { isDragging = false; };

    const onTouchStart = (e) => {
      if (e.touches && e.touches[0]) {
        isDragging = true;
        previousMouseX = e.touches[0].clientX;
      }
    };
    const onTouchMove = (e) => {
      if (!isDragging || !e.touches || !e.touches[0]) return;
      const deltaX = e.touches[0].clientX - previousMouseX;
      rotationY += deltaX * 0.006;
      previousMouseX = e.touches[0].clientX;
    };
    const onTouchEnd = () => { isDragging = false; };

    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    const render = () => {
      try {
        const radius = Math.min(canvas.width, canvas.height) * 0.38;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (!isDragging) {
          rotationY += 0.0035; // Smooth continuous 360 rotation
        }
        time += 0.03;

        // 1. Atmosphere Holographic Glow
        const glow = ctx.createRadialGradient(
          centerX, centerY, radius * 0.95,
          centerX, centerY, radius * 1.3
        );
        glow.addColorStop(0, 'rgba(56, 189, 248, 0.35)');
        glow.addColorStop(0.5, 'rgba(37, 99, 235, 0.12)');
        glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius * 1.3, 0, Math.PI * 2);
        ctx.fill();

        // 2. 3D Planet Base Sphere (Deep Ocean)
        const oceanGrad = ctx.createRadialGradient(
          centerX - radius * 0.35, centerY - radius * 0.35, radius * 0.05,
          centerX, centerY, radius
        );
        oceanGrad.addColorStop(0, '#1e3a8a');
        oceanGrad.addColorStop(0.5, '#0f172a');
        oceanGrad.addColorStop(0.9, '#020617');
        oceanGrad.addColorStop(1, '#000000');

        ctx.fillStyle = oceanGrad;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.fill();

        // 3. Render Landmass Points
        for (let i = 0; i < mapPoints.length; i++) {
          const pt = mapPoints[i];
          const currentLon = pt.lon + rotationY;

          const x3d = radius * Math.cos(pt.lat) * Math.sin(currentLon);
          const y3d = radius * Math.sin(pt.lat);
          const z3d = radius * Math.cos(pt.lat) * Math.cos(currentLon);

          if (z3d > 0) {
            const screenX = centerX + x3d;
            const screenY = centerY - y3d;
            const alpha = (z3d / radius) ** 0.85;

            ctx.beginPath();
            ctx.arc(screenX, screenY, pt.isIndia ? 2.2 : 1.5, 0, Math.PI * 2);
            ctx.fillStyle = pt.isIndia 
              ? `rgba(56, 189, 248, ${alpha * 0.95})` 
              : `rgba(34, 197, 94, ${alpha * 0.75})`;
            ctx.fill();
          }
        }

        // 4. Global Hubs & Arc Lines
        const projectedHubs = [];
        globalHubs.forEach((hub) => {
          const currentLon = hub.lon + rotationY;
          const x3d = radius * Math.cos(hub.lat) * Math.sin(currentLon);
          const y3d = radius * Math.sin(hub.lat);
          const z3d = radius * Math.cos(hub.lat) * Math.cos(currentLon);

          if (z3d > 0) {
            const screenX = centerX + x3d;
            const screenY = centerY - y3d;
            projectedHubs.push({ ...hub, screenX, screenY, z3d });
          }
        });

        // Connected Glowing Arcs
        for (let i = 0; i < projectedHubs.length; i++) {
          for (let j = i + 1; j < projectedHubs.length; j++) {
            const h1 = projectedHubs[i];
            const h2 = projectedHubs[j];
            const dx = h1.screenX - h2.screenX;
            const dy = h1.screenY - h2.screenY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < radius * 1.35) {
              ctx.beginPath();
              ctx.moveTo(h1.screenX, h1.screenY);
              const midX = (h1.screenX + h2.screenX) / 2;
              const midY = (h1.screenY + h2.screenY) / 2 - 25;
              ctx.quadraticCurveTo(midX, midY, h2.screenX, h2.screenY);
              ctx.strokeStyle = `rgba(56, 189, 248, ${0.45 * (1 - dist / (radius * 1.35))})`;
              ctx.lineWidth = 1.2;
              ctx.stroke();
            }
          }
        }

        // Hub Pulsing Nodes
        projectedHubs.forEach((h) => {
          ctx.beginPath();
          ctx.arc(h.screenX, h.screenY, h.isHQ ? 5 : 4, 0, Math.PI * 2);
          ctx.fillStyle = h.color;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(h.screenX, h.screenY, 7 + Math.sin(time * 3) * 3, 0, Math.PI * 2);
          ctx.strokeStyle = h.color;
          ctx.lineWidth = 1.3;
          ctx.stroke();
        });

        // 5. Specular Sunlight Shading Layer
        const sun = ctx.createRadialGradient(
          centerX - radius * 0.35, centerY - radius * 0.35, 0,
          centerX - radius * 0.35, centerY - radius * 0.35, radius * 0.9
        );
        sun.addColorStop(0, 'rgba(255, 255, 255, 0.35)');
        sun.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = sun;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.fill();

        // Edge Rim
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.5)';
        ctx.lineWidth = 2;
        ctx.stroke();

        animationFrameId = requestAnimationFrame(render);
      } catch (err) {
        console.warn('[EarthGlobe] animation frame error:', err);
      }
    };

    render();

    const handleResize = () => {
      updateDimensions();
    };

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      canvas.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('resize', handleResize);
    };
  }, [isVisible]);

  return (
    <div className="w-full flex flex-col items-center justify-center relative py-4 select-none overflow-hidden">
      <canvas 
        ref={canvasRef} 
        className="max-w-full cursor-grab active:cursor-grabbing touch-none" 
      />
      <div className="text-[11px] font-mono tracking-[0.2em] uppercase text-cyanCustom font-bold mt-2 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        <span>Global IT Network & Delivery Presence (Drag to Rotate)</span>
      </div>
    </div>
  );
}

