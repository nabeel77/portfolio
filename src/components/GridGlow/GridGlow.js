import { useEffect, useRef } from 'react';

// Palette: theme vars (resolved at draw time) plus fixed hex accents.
const PALETTE = [
  '--blue',
  '--green',
  '--orange',
  '#a06bff',
  '#00e5ff',
  '#ffe14d',
  '#ff4d4d',
];

const cellSize = () => Math.min(72, Math.max(44, window.innerWidth * 0.06));

export const GridGlow = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const reduced =
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const cells = new Map();
    let raf = null;
    let running = false;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const cssVar = (name) =>
      getComputedStyle(document.documentElement)
        .getPropertyValue(name)
        .trim() || '#8888ff';

    const resolve = (token, cache) => {
      if (token[0] === '-') {
        if (!(token in cache)) cache[token] = cssVar(token);
        return cache[token];
      }
      return token;
    };

    const draw = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      const size = cellSize();
      const cache = {};
      for (const [key, cell] of cells) {
        cell.life -= 0.014;
        if (cell.life <= 0) {
          cells.delete(key);
          continue;
        }
        const [col, row] = key.split(':').map(Number);
        const x = col * size;
        const y = row * size;
        const color = resolve(cell.color, cache);
        ctx.save();
        if (cell.treat === 'glow') {
          ctx.shadowColor = color;
          ctx.shadowBlur = 22;
          ctx.globalAlpha = Math.min(0.6, cell.life);
          ctx.fillStyle = color;
          ctx.fillRect(x + 1, y + 1, size - 2, size - 2);
        } else if (cell.treat === 'neon') {
          ctx.globalAlpha = Math.min(0.55, cell.life);
          ctx.fillStyle = color;
          ctx.fillRect(x + 1, y + 1, size - 2, size - 2);
          ctx.globalAlpha = Math.min(0.9, cell.life + 0.3);
          ctx.lineWidth = 1.5;
          ctx.strokeStyle = color;
          ctx.strokeRect(x + 1.5, y + 1.5, size - 3, size - 3);
        } else {
          ctx.globalAlpha = Math.min(0.3, cell.life * 0.5);
          ctx.fillStyle = color;
          ctx.fillRect(x + 1, y + 1, size - 2, size - 2);
        }
        ctx.restore();
      }
      if (cells.size > 0) {
        raf = requestAnimationFrame(draw);
      } else {
        running = false;
      }
    };

    const startLoop = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(draw);
      }
    };

    const onMove = (e) => {
      const size = cellSize();
      const col = Math.floor(e.clientX / size);
      const row = Math.floor(e.clientY / size);
      const r = Math.random();
      let treat = 'default';
      let life = 0.6;
      if (r < 0.15) {
        treat = 'glow';
        life = 0.9;
      } else if (r < 0.3) {
        treat = 'neon';
      }
      cells.set(`${col}:${row}`, {
        life,
        treat,
        color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
      });
      startLoop();
    };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('resize', resize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    />
  );
};
