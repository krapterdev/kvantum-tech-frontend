import React, { useEffect, useRef, useState } from 'react';

export default function EarthGlobe() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = canvas.parentElement.clientWidth || 650);
    let height = (canvas.height = 460);
    const radius = Math.min(width, height) * 0.42;
    const centerX = width / 2;
    const centerY = height / 2;

    let rotationY = 1.6; // Positioned focused on Asia/India
    let isDragging = false;
    let previousMouseX = 0;

    // Load Photorealistic NASA Earth Map Texture
    const earthTexture = new Image();
    earthTexture.crossOrigin = 'anonymous';
    earthTexture.src = 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg';

    const textureCanvas = document.createElement('canvas');
    const textureCtx = textureCanvas.getContext('2d');
    let textureData = null;
    let texWidth = 0;
    let texHeight = 0;

    earthTexture.onload = () => {
      texWidth = textureCanvas.width = earthTexture.width;
      texHeight = textureCanvas.height = earthTexture.height;
      textureCtx.drawImage(earthTexture, 0, 0);
      try {
        textureData = textureCtx.getImageData(0, 0, texWidth, texHeight).data;
      } catch (e) {
        console.warn('Texture CORS fallback mode active');
      }
    };

    // Tech Hub Coordinates (Lat, Lon in Radians)
    const globalHubs = [
      { name: 'India (Delhi HQ)', lat: (28.6 * Math.PI) / 180, lon: (77.2 * Math.PI) / 180, color: '#38bdf8' },
      { name: 'Dubai', lat: (25.2 * Math.PI) / 180, lon: (55.2 * Math.PI) / 180, color: '#ec4899' },
      { name: 'London', lat: (51.5 * Math.PI) / 180, lon: (-0.1 * Math.PI) / 180, color: '#a855f7' },
      { name: 'New York', lat: (40.7 * Math.PI) / 180, lon: (-74.0 * Math.PI) / 180, color: '#38bdf8' },
      { name: 'Singapore', lat: (1.3 * Math.PI) / 180, lon: (103.8 * Math.PI) / 180, color: '#4ade80' },
      { name: 'Tokyo', lat: (35.6 * Math.PI) / 180, lon: (139.6 * Math.PI) / 180, color: '#fbbf24' },
      { name: 'Sydney', lat: (-33.8 * Math.PI) / 180, lon: (151.2 * Math.PI) / 180, color: '#38bdf8' },
    ];

    // High Density World Map Points
    const mapPoints = [];
    const step = 0.04;

    for (let lat = -Math.PI / 2 + 0.1; lat <= Math.PI / 2 - 0.1; lat += step) {
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
          mapPoints.push({ lat, lon, isIndia, isAsia });
        }
      }
    }

    // Drag Interaction Listeners
    const onMouseDown = (e) => {
      isDragging = true;
      previousMouseX = e.clientX;
    };
    const onMouseMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMouseX;
      rotationY += deltaX * 0.005;
      previousMouseX = e.clientX;
    };
    const onMouseUp = () => { isDragging = false; };

    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      if (!isDragging) {
        rotationY += 0.004; // Smooth continuous 360-degree rotation
      }
      time += 0.035;

      // 1. Atmosphere Holographic Outer Glow
      const glow = ctx.createRadialGradient(
        centerX, centerY, radius * 0.95,
        centerX, centerY, radius * 1.35
      );
      glow.addColorStop(0, 'rgba(56, 189, 248, 0.4)');
      glow.addColorStop(0.5, 'rgba(37, 99, 235, 0.15)');
      glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.35, 0, Math.PI * 2);
      ctx.fill();

      // 2. Photorealistic NASA 3D Ocean Base Sphere
      const oceanGrad = ctx.createRadialGradient(
        centerX - radius * 0.35, centerY - radius * 0.35, radius * 0.05,
        centerX, centerY, radius
      );
      oceanGrad.addColorStop(0, '#1d4ed8');   // NASA Ocean Blue
      oceanGrad.addColorStop(0.45, '#0f172a'); // Deep Sea Night
      oceanGrad.addColorStop(0.85, '#030712'); // Space Rim
      oceanGrad.addColorStop(1, '#020617');

      ctx.fillStyle = oceanGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();

      // 3. Render Photorealistic NASA Texture Map or High-Density Landmesh
      if (textureData && texWidth > 0) {
        const sampleStep = 3.5;
        for (let py = -radius; py <= radius; py += sampleStep) {
          const lat = Math.asin(py / radius);
          const r = Math.sqrt(radius * radius - py * py);
          if (r <= 0) continue;

          for (let px = -r; px <= r; px += sampleStep) {
            const lon = Math.atan2(px, Math.sqrt(r * r - px * px));
            const z3d = Math.sqrt(r * r - px * px);

            if (z3d > 0) {
              let adjustedLon = (lon - rotationY) % (2 * Math.PI);
              if (adjustedLon < 0) adjustedLon += 2 * Math.PI;

              const u = adjustedLon / (2 * Math.PI);
              const v = 0.5 - lat / Math.PI;

              const tx = Math.floor(u * texWidth) % texWidth;
              const ty = Math.floor(v * texHeight) % texHeight;
              const index = (ty * texWidth + tx) * 4;

              const rCol = textureData[index];
              const gCol = textureData[index + 1];
              const bCol = textureData[index + 2];

              const alpha = Math.max(0.2, z3d / radius);
              ctx.fillStyle = `rgba(${rCol},${gCol},${bCol},${alpha})`;
              ctx.fillRect(centerX + px, centerY - py, sampleStep, sampleStep);
            }
          }
        }
      } else {
        // High Precision Vector Map Points
        for (let i = 0; i < mapPoints.length; i++) {
          const pt = mapPoints[i];
          const currentLon = pt.lon + rotationY;

          const x3d = radius * Math.cos(pt.lat) * Math.sin(currentLon);
          const y3d = radius * Math.sin(pt.lat);
          const z3d = radius * Math.cos(pt.lat) * Math.cos(currentLon);

          if (z3d > 0) {
            const screenX = centerX + x3d;
            const screenY = centerY - y3d;
            const alpha = (z3d / radius) ** 0.8;

            ctx.beginPath();
            ctx.arc(screenX, screenY, pt.isIndia ? 2.3 : 1.6, 0, Math.PI * 2);
            ctx.fillStyle = pt.isIndia ? `rgba(56, 189, 248, ${alpha * 0.95})` : `rgba(34, 197, 94, ${alpha * 0.8})`;
            ctx.fill();
          }
        }
      }

      // 4. Constellation Cyber Network Hubs & Arc Lines (NO RED/BLUE RINGS)
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

      // Curved Arc Lines between Hubs
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
            const midY = (h1.screenY + h2.screenY) / 2 - 30;
            ctx.quadraticCurveTo(midX, midY, h2.screenX, h2.screenY);
            ctx.strokeStyle = `rgba(56, 189, 248, ${0.4 * (1 - dist / (radius * 1.35))})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();
          }
        }
      }

      // Hub Pulsing Nodes
      projectedHubs.forEach((h) => {
        ctx.beginPath();
        ctx.arc(h.screenX, h.screenY, 5.5, 0, Math.PI * 2);
        ctx.fillStyle = h.color;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(h.screenX, h.screenY, 9.5 + Math.sin(time * 4) * 3, 0, Math.PI * 2);
        ctx.strokeStyle = h.color;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      // 5. Specular Sunlight Shading Layer
      const sun = ctx.createRadialGradient(
        centerX - radius * 0.4, centerY - radius * 0.4, 0,
        centerX - radius * 0.4, centerY - radius * 0.4, radius * 0.85
      );
      sun.addColorStop(0, 'rgba(255, 255, 255, 0.42)');
      sun.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = sun;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();

      // Outer Edge Rim
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.65)';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      if (canvas && canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth || 650;
        height = canvas.height = 460;
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center relative py-4 select-none overflow-hidden">
      <canvas ref={canvasRef} className="max-w-full cursor-grab active:cursor-grabbing" />
      <div className="text-[11px] font-mono tracking-[0.25em] uppercase text-cyanCustom font-bold mt-2 flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
        <span>360° Real 3D Photorealistic Earth Planet (Drag to Rotate)</span>
      </div>
    </div>
  );
}
