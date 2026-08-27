import { useState, useRef, useEffect, useCallback } from 'react';
import { Reveal } from '../Reveal';
import { MatrixRain } from './MatrixRain';
import { SnakeGame } from './SnakeGame';
import { site } from '../../data/site';
import { experience } from '../../data/experience';
import { projects, radiantsSystem } from '../../data/projects';

const BOOT = [
  {
    text: 'nabeel@portfolio v2 — type "help" and hit enter',
    color: 'var(--dim)',
  },
];

const OUTPUTS = {
  help: [
    {
      text: 'available commands:',
      color: 'var(--dim)',
    },
    {
      text: '  whoami · stack · experience · projects · contact · coffee',
      color: 'var(--ink)',
    },
    {
      text: '  ls · clear      (↑/↓ history · tab to complete)',
      color: 'var(--ink)',
    },
    {
      text: '  — plus a few hidden ones 👀',
      color: 'var(--dim)',
    },
  ],
  sudo: [
    {
      text: 'nice try. this incident will be reported (to absolutely no one).',
      color: 'var(--orange)',
    },
  ],
  whoami: [
    {
      text: 'Nabeel Munir — Full Stack Engineer, Riga, Latvia',
      color: 'var(--green)',
    },
    {
      text: 'I build web apps end to end, in web2 and on Solana (web3).',
      color: 'var(--dim)',
    },
  ],
  stack: [
    {
      text: 'web2: TypeScript, Java, React, Next.js, Node, NestJS',
      color: 'var(--blue)',
    },
    {
      text: 'web3: Rust, Anchor, Solana web3.js, smart contracts on Solana',
      color: 'var(--green)',
    },
    {
      text: 'infra: Docker, Kubernetes, AWS, GitHub Actions',
      color: 'var(--blue)',
    },
  ],
  experience: experience.map((job) => ({
    text: `${job.company.padEnd(10)} ${job.role} (${job.period})`,
    color: 'var(--dim)',
  })),
  projects: [
    { text: `RadOS — ${radiantsSystem.link}`, color: 'var(--blue)' },
    ...radiantsSystem.children.map((c) => ({
      text: `  └ ${c.name} — opens in RadOS`,
      color: 'var(--dim)',
    })),
    ...projects.map((p) => ({
      text: `${p.name} — ${p.link || 'shipped, no public link'}`,
      color: 'var(--blue)',
    })),
  ],
  contact: [
    { text: `email     ${site.email}`, color: 'var(--green)' },
    { text: 'github    github.com/Nabeel77', color: 'var(--blue)' },
    { text: 'linkedin  /in/nabeel-munir', color: 'var(--blue)' },
  ],
  ls: [
    {
      text: 'work/   skills/   experience/   about/   contact/',
      color: 'var(--ink)',
    },
  ],
  coffee: [
    { text: '☕ brewing... done. productivity +12%.', color: 'var(--orange)' },
  ],
};

const COMMANDS = [...Object.keys(OUTPUTS), 'clear', 'matrix', 'snake'];
const QUICK = ['whoami', 'stack', 'projects', 'coffee', 'snake'];

const Prompt = () => (
  <>
    <span style={{ color: 'var(--green)' }}>nabeel@portfolio</span>
    <span style={{ color: 'var(--dim)' }}>:</span>
    <span style={{ color: 'var(--blue)' }}>~</span>
    <span style={{ color: 'var(--dim)' }}>$&nbsp;</span>
  </>
);

export const Terminal = () => {
  const [lines, setLines] = useState(BOOT);
  const [value, setValue] = useState('');
  const [history, setHistory] = useState([]);
  const [hIndex, setHIndex] = useState(null);
  const [matrixOn, setMatrixOn] = useState(false);
  const [snakeOn, setSnakeOn] = useState(false);
  const bodyRef = useRef(null);
  const inputRef = useRef(null);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current =
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffect(() => {
    if (bodyRef.current)
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [lines, snakeOn]);

  const push = (arr) => setLines((prev) => [...prev, ...arr].slice(-60));

  const endMatrix = useCallback(() => setMatrixOn(false), []);

  const endSnake = useCallback((score) => {
    setSnakeOn(false);
    setLines((prev) =>
      [
        ...prev,
        {
          text: `game over — score ${score}. type 'snake' for a rematch.`,
          color: 'var(--orange)',
        },
      ].slice(-60)
    );
    if (inputRef.current) inputRef.current.focus();
  }, []);

  const runCmd = (raw) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    setHistory((h) =>
      h[h.length - 1] === raw.trim() ? h : [...h, raw.trim()]
    );
    setHIndex(null);
    if (cmd === 'clear') {
      setLines([]);
      return;
    }
    const echo = {
      text: raw.trim(),
      color: 'var(--ink)',
      prompt: true,
    };
    if (cmd === 'matrix') {
      push([echo, { text: 'wake up, neo…', color: 'var(--green)' }]);
      if (!reduced.current) setMatrixOn(true);
      return;
    }
    if (cmd === 'snake') {
      push([echo]);
      setSnakeOn(true);
      return;
    }
    const out = OUTPUTS[cmd] || [
      {
        text: `command not found: ${raw.trim()} — try "help"`,
        color: 'var(--orange)',
      },
    ];
    push([echo, ...out]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    runCmd(value);
    setValue('');
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!history.length) return;
      const idx =
        hIndex === null ? history.length - 1 : Math.max(0, hIndex - 1);
      setHIndex(idx);
      setValue(history[idx]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (hIndex === null) return;
      const idx = hIndex + 1;
      if (idx >= history.length) {
        setHIndex(null);
        setValue('');
      } else {
        setHIndex(idx);
        setValue(history[idx]);
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const frag = value.trim().toLowerCase();
      if (!frag) return;
      const match = COMMANDS.find((c) => c.startsWith(frag));
      if (match) setValue(match);
    }
  };

  const focusInput = () => inputRef.current && inputRef.current.focus();

  return (
    <section
      id="terminal"
      style={{
        position: 'relative',
        zIndex: 1,
        padding: 'clamp(40px,8vh,90px) clamp(16px,4vw,48px)',
        borderBottom: '1px solid var(--line)',
        background: 'var(--bg2)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <Reveal>
          <h2
            className="font-display"
            style={{
              margin: '0 0 8px',
              fontWeight: 700,
              textTransform: 'uppercase',
              fontSize: 'clamp(24px,4vw,48px)',
            }}
          >
            About — interactive
          </h2>
        </Reveal>
        <Reveal>
          <p style={{ margin: '0 0 6px', fontSize: 14, color: 'var(--dim)' }}>
            a real terminal — click it, type a command, hit enter. try{' '}
            <span style={{ color: 'var(--green)' }}>help</span>.
          </p>
        </Reveal>
        <Reveal>
          <p
            style={{
              margin: '0 0 24px',
              fontSize: 12,
              fontStyle: 'italic',
              color: 'var(--dim)',
            }}
          >
            rumor has it there are hidden commands… one of them is a game 🐍
          </p>
        </Reveal>

        <Reveal>
          <div
            onClick={focusInput}
            style={{
              maxWidth: 840,
              border: '1px solid var(--line)',
              background: 'var(--bg)',
              cursor: 'text',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '10px 14px',
                borderBottom: '1px solid var(--line)',
                fontSize: 13,
                color: 'var(--dim)',
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  width: 9,
                  height: 9,
                  borderRadius: '50%',
                  background: 'var(--orange)',
                }}
              />
              <span
                aria-hidden="true"
                style={{
                  width: 9,
                  height: 9,
                  borderRadius: '50%',
                  background: 'var(--green)',
                }}
              />
              <span
                aria-hidden="true"
                style={{
                  width: 9,
                  height: 9,
                  borderRadius: '50%',
                  background: 'var(--blue)',
                }}
              />
              <span style={{ marginLeft: 8 }}>nabeel@portfolio:~</span>
            </div>

            <div
              ref={bodyRef}
              role="log"
              aria-live="polite"
              style={{
                padding: 18,
                minHeight: 230,
                maxHeight: 360,
                overflowY: 'auto',
                fontSize: 16,
                lineHeight: 1.85,
              }}
            >
              {lines.map((ln, i) => (
                <div
                  key={i}
                  style={{ whiteSpace: 'pre-wrap', color: ln.color }}
                >
                  {ln.prompt && <Prompt />}
                  {ln.text}
                </div>
              ))}
              {snakeOn ? (
                <SnakeGame onEnd={endSnake} />
              ) : (
                <form
                  onSubmit={onSubmit}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginTop: 4,
                  }}
                >
                  <Prompt />
                  <input
                    ref={inputRef}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={onKeyDown}
                    aria-label="Terminal command input"
                    spellCheck="false"
                    autoComplete="off"
                    autoCapitalize="off"
                    autoCorrect="off"
                    style={{
                      flex: 1,
                      minWidth: 0,
                      background: 'none',
                      border: 'none',
                      outline: 'none',
                      color: 'var(--ink)',
                      fontFamily: 'inherit',
                      fontSize: 16,
                      caretColor: 'var(--green)',
                    }}
                  />
                </form>
              )}
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div
            style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 14 }}
          >
            {QUICK.map((c) => {
              const isSnake = c === 'snake';
              return (
                <button
                  key={c}
                  onClick={() => runCmd(c)}
                  disabled={snakeOn}
                  style={{
                    cursor: snakeOn ? 'default' : 'pointer',
                    background: 'none',
                    border: `1px solid ${
                      isSnake ? 'var(--green)' : 'var(--line)'
                    }`,
                    color: isSnake ? 'var(--green)' : 'var(--dim)',
                    fontFamily: 'inherit',
                    fontSize: 14,
                    padding: '12px 18px',
                    minHeight: 44,
                    opacity: snakeOn ? 0.5 : 1,
                  }}
                >
                  {isSnake ? '🐍 play snake' : c}
                </button>
              );
            })}
          </div>
        </Reveal>
      </div>

      {matrixOn && <MatrixRain onDone={endMatrix} />}
    </section>
  );
};
