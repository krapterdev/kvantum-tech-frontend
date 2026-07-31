import React, { useEffect, useRef } from 'react';

export default function EarthGlobe() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = canvas.parentElement.clientWidth || 600);
    let height = (canvas.height = 420);
    const radius = Math.min(width, height) * 0.42;
    const centerX = width / 2;
    const centerY = height / 2;

    let rotationY = 0; // Continuous 360 rotation

    // High-resolution landmass points for realistic continents
    const points = [];
    const numLatitudes = 80;
    const numLongitudes = 160;

    for (let i = 0; i <= numLatitudes; i++) {
      const lat = (Math.PI * i) / numLatitudes - Math.PI / 2; // -90 to +90 deg
      const latDeg = (lat * 180) / Math.PI;

      for (let j = 0; j < numLongitudes; j++) {
        const lon = (2 * Math.PI * j) / numLongitudes; // 0 to 360 deg
        const lonDeg = (lon * 180) / Math.PI;

        // Accurate Earth continent shape bounding algorithms
        const isNorthAmerica = latDeg > 15 && latDeg < 72 && lonDeg > 190 && lonDeg < 310;
        const isSouthAmerica = latDeg > -56 && latDeg < 12 && lonDeg > 280 && lonDeg < 325;
        const isEurope = latDeg > 35 && latDeg < 71 && (lonDeg > 350 || lonDeg < 45);
        const isAfrica = latDeg > -35 && latDeg < 37 && lonDeg > 10 && lonDeg < 52;
        const isAsia = latDeg > 5 && latDeg < 75 && lonDeg >= 45 && lonDeg < 150;
        const isIndia = latDeg > 6 && latDeg < 35 && lonDeg >= 68 && lonDeg <= 89;
        const isAustralia = latDeg > -42 && latDeg < -10 && lonDeg > 112 && lonDeg < 154;
        const isUK = latDeg > 50 && latDeg < 60 && (lonDeg > 350 || lonDeg < 2);
        const isJapan = latDeg > 30 && latDeg < 45 && lonDeg > 129 && lonDeg < 145;

        const isLand = isNorthAmerica || isSouthAmerica || isEurope || isAfrica || isAsia || isIndia || isAustralia || isUK || isJapan;

        if (isLand) {
          points.push({ lat, lon, isLand: true });
        } else if (Math.random() < 0.04) {
          // Sparse ocean grid dots for depth
          points.push({ lat, lon, isLand: false });
        }
      }
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      rotationY += 0.007; // 360 degree rotation speed

      // 1. Atmosphere Blue Outer Glow
      const atmosphere = ctx.createRadialGradient(
        centerX, centerY, radius * 0.95,
        centerX, centerY, radius * 1.3
      );
      atmosphere.addColorStop(0, 'rgba(59, 130, 246, 0.4)');
      atmosphere.addColorStop(0.4, 'rgba(6, 182, 212, 0.2)');
      atmosphere.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = atmosphere;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.3, 0, Math.PI * 2);
      ctx.fill();

      // 2. Realistic 3D Blue Ocean Sphere
      const oceanGradient = ctx.createRadialGradient(
        centerX - radius * 0.35, centerY - radius * 0.35, radius * 0.1,
        centerX, centerY, radius
      );
      oceanGradient.addColorStop(0, '#1e3a8a');  // Deep ocean blue
      oceanGradient.addColorStop(0.6, '#0f172a'); // Mid ocean night blue
      oceanGradient.addColorStop(1, '#020617');   // Dark space edge

      ctx.fillStyle = oceanGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();

      // 3. Grid Lines (Latitude & Longitude)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;

      // Draw Lat Lines
      [-45, -23.5, 0, 23.5, 45, 66.5].forEach((latDeg) => {
        const lat = (latDeg * Math.PI) / 180;
        const r = radius * Math.cos(lat);
        const y = centerY - radius * Math.sin(lat);

        ctx.beginPath();
        ctx.ellipse(centerX, y, r, r * 0.2, 0, 0, Math.PI * 2);
        ctx.stroke();
      });

      // 4. Draw 3D Landmass Continents with Depth & Shading
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        const currentLon = p.lon + rotationY;

        // 3D Projection
        const x3d = radius * Math.cos(p.lat) * Math.sin(currentLon);
        const y3d = radius * Math.sin(p.lat);
        const z3d = radius * Math.cos(p.lat) * Math.cos(currentLon);

        if (z3d > 0) { // Front hemisphere only
          const screenX = centerX + x3d;
          const screenY = centerY - y3d;
          const alpha = Math.max(0.25, z3d / radius); // Depth shading

          ctx.beginPath();
          ctx.arc(screenX, screenY, p.isLand ? 1.6 : 0.8, 0, Math.PI * 2);

          if (p.isLand) {
            // Bright Cyan/Green continent dots
            ctx.fillStyle = `rgba(52, 211, 153, ${alpha * 0.9})`; // Emerald green
          } else {
            ctx.fillStyle = `rgba(147, 197, 253, ${alpha * 0.3})`; // Light blue ocean dot
          }
          ctx.fill();
        }
      }

      // 5. Specular Reflection Highlight (Sunlight reflection on top-left of Earth)
      const sunHighlight = ctx.createRadialGradient(
        centerX - radius * 0.4, centerY - radius * 0.4, 0,
        centerX - radius * 0.4, centerY - radius * 0.4, radius * 0.7
      );
      sunHighlight.addColorStop(0, 'rgba(255, 255, 255, 0.25)');
      sunHighlight.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = sunHighlight;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();

      // Outer Specular Rim
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
      ctx.lineWidth = 1.8;
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      if (canvas && canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth || 600;
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
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span>360° Real-Time Rotating Earth Planet</span>
      </div>
    </div>
  );
}
