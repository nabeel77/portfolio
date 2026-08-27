import { useEffect, useRef } from 'react';

// 6 seconds of Matrix code rain on a fixed full-viewport canvas.
export const MatrixRain = ({ onDone }) => {
  const canvasRef = useRef(null);
  const onDoneRef = useRef(onDone);
  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const fontSize = 16;
    let w = 0;
    let h = 0;
    let columns = 0;
    let drops = [];

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      columns = Math.floor(w / fontSize);
      drops = Array(columns)
        .fill(0)
        .map(() => Math.floor((Math.random() * h) / fontSize));
    };
    resize();
    window.addEventListener('resize', resize);

    let raf = null;
    let stopped = false;
    const green = 'oklch(0.8 0.19 145)';

    const frame = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.06)';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = green;
      ctx.font = `${fontSize}px monospace`;
      for (let i = 0; i < columns; i++) {
        const ch = String.fromCharCode(0x30a0 + Math.floor(Math.random() * 96));
        ctx.fillText(ch, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > h && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
      if (!stopped) raf = requestAnimationFrame(frame);
    };

    requestAnimationFrame(() => {
      canvas.style.opacity = '1';
    });
    raf = requestAnimationFrame(frame);

    const tFade = setTimeout(() => {
      canvas.style.opacity = '0';
    }, 5400);
    const tEnd = setTimeout(() => {
      stopped = true;
      if (raf) cancelAnimationFrame(raf);
      onDoneRef.current && onDoneRef.current();
    }, 6000);

    return () => {
      stopped = true;
      if (raf) cancelAnimationFrame(raf);
      clearTimeout(tFade);
      clearTimeout(tEnd);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 90,
        pointerEvents: 'none',
        opacity: 0,
        transition: 'opacity .6s',
      }}
    />
  );
};
