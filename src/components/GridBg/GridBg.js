// Fixed full-page 1px grid texture behind everything.
export const GridBg = () => (
  <div
    aria-hidden="true"
    style={{
      position: 'fixed',
      inset: 0,
      zIndex: 0,
      pointerEvents: 'none',
      backgroundImage:
        'linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)',
      backgroundSize:
        'clamp(44px, 6vw, 72px) clamp(44px, 6vw, 72px)',
      opacity: 0.2,
    }}
  />
);
