import React, { useEffect, useRef } from 'react';

export default function EarthGlobe() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = canvas.parentElement.clientWidth || 650);
    let height = (canvas.height = 420);
    const radius = Math.min(width, height) * 0.42;
    const centerX = width / 2;
    const centerY = height / 2;

    let rotationY = 0;

    // Load Realistic 3D Earth Texture map image
    const earthImage = new Image();
    earthImage.crossOrigin = 'anonymous';
    // High resolution NASA Earth continent map texture
    earthImage.src = 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=800&auto=format&fit=crop&q=80';

    let imageLoaded = false;
    earthImage.onload = () => { imageLoaded = true; };

    // Fallback high-density Realistic Continents
    const continentPoints = [];
    const numLats = 90;
    const numLons = 180;

    for (let i = 0; i <= numLats; i++) {
      const lat = (Math.PI * i) / numLats - Math.PI / 2;
      const latDeg = (lat * 180) / Math.PI;

      for (let j = 0; j < numLons; j++) {
        const lon = (2 * Math.PI * j) / numLons;
        const lonDeg = (lon * 180) / Math.PI;

        const isNAmerica = latDeg > 15 && latDeg < 72 && lonDeg > 190 && lonDeg < 310;
        const isSAmerica = latDeg > -56 && latDeg < 12 && lonDeg > 280 && lonDeg < 325;
        const isEurope = latDeg > 35 && latDeg < 71 && (lonDeg > 350 || lonDeg < 45);
        const isAfrica = latDeg > -35 && latDeg < 37 && lonDeg > 10 && lonDeg < 52;
        const isAsia = latDeg > 5 && latDeg < 75 && lonDeg >= 45 && lonDeg < 150;
        const isIndia = latDeg > 6 && latDeg < 35 && lonDeg >= 68 && lonDeg <= 89;
        const isAustralia = latDeg > -42 && latDeg < -10 && lonDeg > 112 && lonDeg < 154;

        if (isNAmerica || isSAmerica || isEurope || isAfrica || isAsia || isIndia || isAustralia) {
          continentPoints.push({ lat, lon });
        }
      }
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      rotationY += 0.006;

      // 1. Atmosphere Blue Outer Glow Ring
      const glow = ctx.createRadialGradient(
        centerX, centerY, radius * 0.9,
        centerX, centerY, radius * 1.3
      );
      glow.addColorStop(0, 'rgba(56, 189, 248, 0.45)');
      glow.addColorStop(0.5, 'rgba(37, 99, 235, 0.2)');
      glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.3, 0, Math.PI * 2);
      ctx.fill();

      // 2. Base Real Deep Blue Ocean Planet Sphere
      const planetGradient = ctx.createRadialGradient(
        centerX - radius * 0.35, centerY - radius * 0.35, radius * 0.1,
        centerX, centerY, radius
      );
      planetGradient.addColorStop(0, '#1d4ed8');   // Vivid Ocean Blue
      planetGradient.addColorStop(0.5, '#0f172a');  // Night Ocean
      planetGradient.addColorStop(1, '#020617');    // Deep Space Rim

      ctx.fillStyle = planetGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();

      // 3. Render Real 3D Rotating Continents Surface
      for (let i = 0; i < continentPoints.length; i++) {
        const p = continentPoints[i];
        const currentLon = p.lon + rotationY;

        const x3d = radius * Math.cos(p.lat) * Math.sin(currentLon);
        const y3d = radius * Math.sin(p.lat);
        const z3d = radius * Math.cos(p.lat) * Math.cos(currentLon);

        if (z3d > 0) {
          const screenX = centerX + x3d;
          const screenY = centerY - y3d;
          const alpha = Math.max(0.3, z3d / radius);

          ctx.beginPath();
          ctx.arc(screenX, screenY, 1.8, 0, Math.PI * 2);

          // Realistic emerald green & cyan continent shading
          ctx.fillStyle = `rgba(34, 197, 94, ${alpha * 0.95})`; // Emerald Green
          ctx.fill();
        }
      }

      // 4. Latitude/Longitude Grid Lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      [-45, 0, 45].forEach((latDeg) => {
        const lat = (latDeg * Math.PI) / 180;
        const r = radius * Math.cos(lat);
        const y = centerY - radius * Math.sin(lat);
        ctx.beginPath();
        ctx.ellipse(centerX, y, r, r * 0.2, 0, 0, Math.PI * 2);
        ctx.stroke();
      });

      // 5. Specular Sunlight Reflection Layer
      const sun = ctx.createRadialGradient(
        centerX - radius * 0.4, centerY - radius * 0.4, 0,
        centerX - radius * 0.4, centerY - radius * 0.4, radius * 0.8
      );
      sun.addColorStop(0, 'rgba(255, 255, 255, 0.35)');
      sun.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = sun;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();

      // Outer Specular Rim Ring
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.5)';
      ctx.lineWidth = 2;
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      if (canvas && canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth || 650;
        height = canvas.height = 420;
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center relative py-4 select-none overflow-hidden">
      <canvas ref={canvasRef} className="max-w-full cursor-grab active:cursor-grabbing" />
      <div className="text-[11px] font-mono tracking-[0.25em] uppercase text-cyanCustom font-bold mt-2 flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
        <span>360° Real 3D Rotating Earth Planet</span>
      </div>
    </div>
  );
}
