import { useEffect, useRef } from 'react';

// Wraps a grabbable, throwable element. Drag it, fling it, it springs home.
export const Throwable = ({ children, style }) => {
  const ref = useRef(null);
  const s = useRef({
    dragging: false,
    startX: 0,
    startY: 0,
    baseX: 0,
    baseY: 0,
    curX: 0,
    curY: 0,
    lastX: 0,
    lastY: 0,
    lastT: 0,
    vx: 0,
    vy: 0,
    t1: null,
    t2: null,
  });
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current =
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const st = s.current;
    return () => {
      clearTimeout(st.t1);
      clearTimeout(st.t2);
    };
  }, []);

  const currentTranslate = () => {
    const el = ref.current;
    const m = new DOMMatrixReadOnly(getComputedStyle(el).transform);
    return { x: m.m41, y: m.m42 };
  };

  const onPointerDown = (e) => {
    if (reduced.current) return;
    const el = ref.current;
    el.setPointerCapture(e.pointerId);
    clearTimeout(s.current.t1);
    clearTimeout(s.current.t2);
    const cur = currentTranslate();
    s.current.dragging = true;
    s.current.startX = e.clientX;
    s.current.startY = e.clientY;
    s.current.baseX = cur.x;
    s.current.baseY = cur.y;
    s.current.curX = cur.x;
    s.current.curY = cur.y;
    s.current.lastX = e.clientX;
    s.current.lastY = e.clientY;
    s.current.lastT = performance.now();
    s.current.vx = 0;
    s.current.vy = 0;
    el.style.transition = 'none';
    el.style.position = 'relative';
    el.style.zIndex = '5';
  };

  const onPointerMove = (e) => {
    if (!s.current.dragging) return;
    const el = ref.current;
    const now = performance.now();
    const dt = Math.max(8, now - s.current.lastT);
    s.current.vx = ((e.clientX - s.current.lastX) / dt) * 14;
    s.current.vy = ((e.clientY - s.current.lastY) / dt) * 14;
    s.current.lastX = e.clientX;
    s.current.lastY = e.clientY;
    s.current.lastT = now;
    const tx = s.current.baseX + (e.clientX - s.current.startX);
    const ty = s.current.baseY + (e.clientY - s.current.startY);
    s.current.curX = tx;
    s.current.curY = ty;
    el.style.transform = `translate(${tx}px, ${ty}px)`;
  };

  const onPointerUp = () => {
    if (!s.current.dragging) return;
    s.current.dragging = false;
    const el = ref.current;
    const clamp = (v) => Math.max(-28, Math.min(28, v));
    const vx = clamp(s.current.vx);
    const vy = clamp(s.current.vy);
    const tx = s.current.curX + vx * 7;
    const ty = s.current.curY + vy * 7;
    el.style.transition = 'transform .18s ease-out';
    el.style.transform = `translate(${tx}px, ${ty}px)`;
    s.current.t1 = setTimeout(() => {
      el.style.transition = 'transform .55s cubic-bezier(.2,1.4,.3,1)';
      el.style.transform = 'translate(0px, 0px)';
      s.current.t2 = setTimeout(() => {
        el.style.transition = '';
        el.style.transform = '';
        el.style.zIndex = '';
        el.style.position = '';
      }, 600);
    }, 180);
  };

  return (
    <span
      ref={ref}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      style={{
        display: 'inline-block',
        cursor: 'grab',
        touchAction: 'none',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        ...style,
      }}
    >
      {children}
    </span>
  );
};
