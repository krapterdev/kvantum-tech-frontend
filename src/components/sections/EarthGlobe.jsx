import React, { useEffect, useRef } from 'react';

export default function EarthGlobe() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Globe dimensions
    let width = (canvas.width = canvas.parentElement.clientWidth || 600);
    let height = (canvas.height = 420);
    const radius = Math.min(width, height) * 0.42;
    const centerX = width / 2;
    const centerY = height / 2;

    let rotationY = 0; // Continuous 360 rotation angle

    // Generate latitude/longitude dot matrix points for Earth landmasses
    const points = [];
    const numLatitudes = 36;
    const numLongitudes = 72;

    for (let i = 0; i <= numLatitudes; i++) {
      const lat = (Math.PI * i) / numLatitudes - Math.PI / 2; // -90 to +90 deg
      for (let j = 0; j < numLongitudes; j++) {
        const lon = (2 * Math.PI * j) / numLongitudes; // 0 to 360 deg

        // Approximate Earth landmass check (North America, South America, Europe, Asia, Africa, Australia)
        const latDeg = (lat * 180) / Math.PI;
        const lonDeg = (lon * 180) / Math.PI;

        const isLand =
          (latDeg > 15 && latDeg < 70 && lonDeg > 230 && lonDeg < 300) || // N. America
          (latDeg > -55 && latDeg < 12 && lonDeg > 280 && lonDeg < 320) || // S. America
          (latDeg > 35 && latDeg < 70 && lonDeg > 350) || (latDeg > 35 && latDeg < 70 && lonDeg < 45) || // Europe
          (latDeg > 5 && latDeg < 75 && lonDeg >= 45 && lonDeg < 150) || // Asia / India
          (latDeg > -35 && latDeg < 35 && lonDeg > 10 && lonDeg < 50) || // Africa
          (latDeg > -40 && latDeg < -10 && lonDeg > 110 && lonDeg < 155); // Australia

        if (isLand || Math.random() < 0.08) { // Add land dots + sparse ocean dots
          points.push({ lat, lon, isLand });
        }
      }
    }

    // Connection Arcs across major tech hubs (India, USA, Europe, East Asia)
    const arcs = [
      { from: { lat: 0.49, lon: 1.35 }, to: { lat: 0.65, lon: -1.3 }, color: 'rgba(236, 72, 153, ' }, // India to USA
      { from: { lat: 0.49, lon: 1.35 }, to: { lat: 0.89, lon: 0.15 }, color: 'rgba(6, 182, 212, ' },  // India to Europe
      { from: { lat: 0.65, lon: -1.3 }, to: { lat: 0.89, lon: 0.15 }, color: 'rgba(168, 85, 247, ' }, // USA to Europe
      { from: { lat: 0.49, lon: 1.35 }, to: { lat: 0.61, lon: 2.44 }, color: 'rgba(236, 72, 153, ' }, // India to E.Asia
    ];

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      rotationY += 0.006; // Smooth 360 degree rotation speed

      // 1. Draw outer ambient atmosphere glow halo
      const atmosphereGlow = ctx.createRadialGradient(
        centerX, centerY, radius * 0.85,
        centerX, centerY, radius * 1.35
      );
      atmosphereGlow.addColorStop(0, 'rgba(6, 182, 212, 0.25)');
      atmosphereGlow.addColorStop(0.5, 'rgba(236, 72, 153, 0.12)');
      atmosphereGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = atmosphereGlow;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.35, 0, Math.PI * 2);
      ctx.fill();

      // 2. Draw 3D Globe Base Sphere (Dark semi-transparent deep space globe)
      const globeGradient = ctx.createRadialGradient(
        centerX - radius * 0.3, centerY - radius * 0.3, radius * 0.1,
        centerX, centerY, radius
      );
      globeGradient.addColorStop(0, '#0f172a');
      globeGradient.addColorStop(0.7, '#020617');
      globeGradient.addColorStop(1, '#000000');

      ctx.fillStyle = globeGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();

      // Outer rim ring
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.3)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // 3. Project & Draw 3D Points (Rotating 360 Earth Surface)
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        const currentLon = p.lon + rotationY;

        // 3D Spherical to Cartesian Coordinates
        const x3d = radius * Math.cos(p.lat) * Math.sin(currentLon);
        const y3d = radius * Math.sin(p.lat);
        const z3d = radius * Math.cos(p.lat) * Math.cos(currentLon); // Z depth

        // Only draw points on the front hemisphere (z3d > 0)
        if (z3d > 0) {
          const screenX = centerX + x3d;
          const screenY = centerY - y3d;
          const alpha = Math.max(0.1, z3d / radius); // Depth fading effect

          ctx.beginPath();
          ctx.arc(screenX, screenY, p.isLand ? 1.8 : 1.0, 0, Math.PI * 2);

          if (p.isLand) {
            ctx.fillStyle = `rgba(6, 182, 212, ${alpha * 0.95})`; // Cyan glowing land dots
          } else {
            ctx.fillStyle = `rgba(236, 72, 153, ${alpha * 0.4})`; // Pink ocean dots
          }
          ctx.fill();
        }
      }

      // 4. Draw Animated 3D Connection Arcs between global hubs
      arcs.forEach((arc) => {
        const fromLon = arc.from.lon + rotationY;
        const toLon = arc.to.lon + rotationY;

        const x1 = radius * Math.cos(arc.from.lat) * Math.sin(fromLon);
        const y1 = radius * Math.sin(arc.from.lat);
        const z1 = radius * Math.cos(arc.from.lat) * Math.cos(fromLon);

        const x2 = radius * Math.cos(arc.to.lat) * Math.sin(toLon);
        const y2 = radius * Math.sin(arc.to.lat);
        const z2 = radius * Math.cos(arc.to.lat) * Math.cos(toLon);

        // Render arc if both endpoints are reasonably visible
        if (z1 > -radius * 0.2 || z2 > -radius * 0.2) {
          const sx1 = centerX + x1;
          const sy1 = centerY - y1;
          const sx2 = centerX + x2;
          const sy2 = centerY - y2;

          const midX = (sx1 + sx2) / 2;
          const midY = (sy1 + sy2) / 2 - radius * 0.35; // Curve arc upwards

          ctx.beginPath();
          ctx.moveTo(sx1, sy1);
          ctx.quadraticCurveTo(midX, midY, sx2, sy2);
          ctx.strokeStyle = `${arc.color} 0.7)`;
          ctx.lineWidth = 1.8;
          ctx.setLineDash([4, 4]); // Dashed glowing flight line
          ctx.stroke();
          ctx.setLineDash([]); // Reset dash
        }
      });

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
    <div className="w-full flex flex-col items-center justify-center relative py-6 select-none overflow-hidden">
      {/* 360 Degree Earth Canvas */}
      <canvas ref={canvasRef} className="max-w-full cursor-grab active:cursor-grabbing" />
      <div className="text-[11px] font-mono tracking-[0.25em] uppercase text-cyanCustom/80 mt-2 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-cyanCustom animate-pulse" />
        <span>360° Rotating Global Network</span>
      </div>
    </div>
  );
}
