import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const STAGES = ['LINT', 'BUILD', 'TEST', 'SHIP'];
const RED = 'oklch(0.62 0.21 25)';
const CONFETTI_COLORS = ['var(--green)', 'var(--blue)', 'var(--orange)', RED];

const STAGE_STYLE = {
  pending: { sym: '○', color: 'var(--dim)' },
  running: { sym: '●', color: 'var(--blue)' },
  passed: { sym: '✓', color: 'var(--green)' },
  bug: { sym: '!', color: 'var(--orange)' },
  failed: { sym: '✗', color: RED },
};

const FRESH = () => ['pending', 'pending', 'pending', 'pending'];

const rand = (min, max) => min + Math.random() * (max - min);

export const Pipeline = () => {
  const [btn, setBtn] = useState('idle'); // idle | running | ok | failed
  const [stages, setStages] = useState(FRESH());
  const [log, setLog] = useState('');
  const [action, setAction] = useState(null); // null | fix | squash
  const [shipped, setShipped] = useState(0);
  const [confetti, setConfetti] = useState([]);

  const timers = useRef([]);
  const bugTimer = useRef(null);
  const activeIndex = useRef(0);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  const add = (fn, ms) => {
    const id = setTimeout(fn, ms);
    timers.current.push(id);
    return id;
  };

  const setStage = (i, s) =>
    setStages((prev) => prev.map((v, idx) => (idx === i ? s : v)));

  const startStage = (i) => {
    activeIndex.current = i;
    setStage(i, 'running');
    add(() => resolveStage(i), rand(700, 1200));
  };

  const resolveStage = (i) => {
    const name = STAGES[i];
    if (name === 'BUILD' && Math.random() < 0.25) {
      return failStage(i, 'build failed: missing semicolon (classic). fix it to continue.');
    }
    if (name === 'TEST') {
      if (Math.random() < 0.35) {
        return failStage(i, 'tests failed: 3 assertions unhappy. fix it to continue.');
      }
      if (Math.random() < 0.4) {
        return bugStage(i);
      }
    }
    passStage(i);
  };

  const passStage = (i) => {
    setStage(i, 'passed');
    if (i === STAGES.length - 1) return succeed();
    startStage(i + 1);
  };

  const failStage = (i, msg) => {
    activeIndex.current = i;
    setStage(i, 'failed');
    setBtn('failed');
    setLog(msg);
    setAction('fix');
  };

  const fixIt = () => {
    setLog('patched. re-running…');
    setAction(null);
    setBtn('running');
    const i = activeIndex.current;
    add(() => startStage(i), 800);
  };

  const bugStage = (i) => {
    activeIndex.current = i;
    setStage(i, 'bug');
    setLog('flaky test detected! squash it before it reaches prod!');
    setAction('squash');
    bugTimer.current = add(() => resolveBug(false), 4000);
  };

  const squashIt = () => {
    clearTimeout(bugTimer.current);
    resolveBug(true);
  };

  const resolveBug = (squashed) => {
    setLog(
      squashed
        ? 'bug squashed mid-flight. +10 street cred.'
        : 'bug escaped to the backlog… shipping anyway.'
    );
    setAction(null);
    passStage(activeIndex.current);
  };

  const succeed = () => {
    setBtn('ok');
    setLog('deployed to prod — zero downtime.');
    setShipped((n) => n + 1);
    if (!reduced.current) burstConfetti();
    add(resetIdle, 2600);
  };

  const resetIdle = () => {
    setBtn('idle');
    setStages(FRESH());
    setLog('');
    setAction(null);
  };

  const burstConfetti = () => {
    const parts = Array.from({ length: 28 }, (_, i) => ({
      id: `${Date.now()}-${i}`,
      x: rand(-180, 180),
      y: rand(-200, 120),
      r: rand(-220, 220),
      s: rand(6, 11),
      c: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      d: rand(1, 1.5),
    }));
    setConfetti(parts);
    add(() => setConfetti([]), 1600);
  };

  const run = () => {
    if (btn === 'running') return;
    setStages(FRESH());
    setLog('');
    setAction(null);
    setBtn('running');
    startStage(0);
  };

  const btnLabel =
    btn === 'idle'
      ? shipped > 0
        ? `▶ Run pipeline (${shipped} shipped)`
        : '▶ Run pipeline'
      : btn === 'running'
      ? '⣾ Pipeline running…'
      : btn === 'ok'
      ? '✓ Shipped!'
      : '✗ Pipeline failed';

  const btnBg =
    btn === 'ok'
      ? 'var(--green)'
      : btn === 'running'
      ? 'var(--blue)'
      : btn === 'failed'
      ? RED
      : 'var(--orange)';

  const actionStyle = (color) => ({
    cursor: 'pointer',
    background: 'none',
    border: `1px solid ${color}`,
    color,
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: '0.04em',
    padding: '11px 14px',
    minHeight: 44,
    whiteSpace: 'nowrap',
    animation: 'blink 1s step-start infinite',
  });

  return (
    <div style={{ width: '100%', maxWidth: '100%' }}>
      {confetti.length > 0 && (
        <div
          aria-hidden="true"
          style={{
            position: 'fixed',
            inset: 0,
            pointerEvents: 'none',
            overflow: 'clip',
            zIndex: 80,
          }}
        >
          {confetti.map((p) => (
            <motion.div
              key={p.id}
              initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
              animate={{ x: p.x, y: p.y, opacity: 0, rotate: p.r }}
              transition={{ duration: p.d, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                left: '50%',
                top: '45%',
                width: p.s,
                height: p.s,
                background: p.c,
              }}
            />
          ))}
        </div>
      )}

      <button
        onClick={run}
        className="font-display pipe-run"
        style={{
          cursor: btn === 'idle' ? 'pointer' : 'default',
          fontWeight: 700,
          fontSize: 13,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          background: btnBg,
          color: 'var(--bg)',
          border: 'none',
          padding: '17px 26px',
          minHeight: 48,
          whiteSpace: 'nowrap',
          transition: 'background .3s',
        }}
      >
        {btnLabel}
      </button>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 8,
          alignItems: 'center',
          marginTop: 'clamp(12px, 2vw, 18px)',
        }}
      >
        {STAGES.map((name, i) => {
          const st = STAGE_STYLE[stages[i]];
          const border = stages[i] === 'pending' ? 'var(--line)' : st.color;
          return (
            <span
              key={name}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                fontSize: 11,
                fontFamily: "'JetBrains Mono', monospace",
                border: `1px solid ${border}`,
                color: st.color,
                padding: '7px 10px',
                whiteSpace: 'nowrap',
                transition: 'color .2s, border-color .2s',
              }}
            >
              <span aria-hidden="true">{st.sym}</span>
              {name}
            </span>
          );
        })}

        {action === 'fix' && (
          <button onClick={fixIt} style={actionStyle(RED)}>
            🔧 FIX IT
          </button>
        )}
        {action === 'squash' && (
          <button onClick={squashIt} style={actionStyle('var(--orange)')}>
            🐛 SQUASH IT
          </button>
        )}
      </div>

      <div
        aria-live="polite"
        style={{
          minHeight: 42,
          marginTop: 'clamp(10px, 1.6vw, 14px)',
          fontSize: 12,
          lineHeight: 1.6,
          color: 'var(--dim)',
          fontFamily: "'JetBrains Mono', monospace",
        }}
      >
        {log && <span>&gt; {log}</span>}
      </div>
    </div>
  );
};
