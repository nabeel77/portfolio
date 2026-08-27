import { useTheme } from '../theme/ThemeContext';

const linkStyle = {
  color: 'var(--dim)',
  padding: '10px 8px',
  minHeight: 44,
  display: 'inline-flex',
  alignItems: 'center',
};

const navLinks = [
  { label: 'work', href: '#work' },
  { label: 'skills', href: '#skills' },
  { label: 'experience', href: '#experience' },
  { label: 'terminal', href: '#terminal' },
  { label: 'contact', href: '#contact' },
];

export const Nav = () => {
  const { theme, toggle } = useTheme();

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
        flexWrap: 'wrap',
        padding: '8px clamp(16px, 4vw, 48px)',
        minHeight: 54,
        background: 'color-mix(in oklab, var(--bg) 88%, transparent)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--line)',
      }}
    >
      <a
        href="#top"
        className="font-display"
        style={{
          fontWeight: 700,
          fontSize: 15,
          letterSpacing: '0.06em',
          display: 'flex',
          alignItems: 'center',
          gap: 9,
          minHeight: 44,
        }}
      >
        <img
          src="/logo/favicon-64x64.png"
          alt=""
          width={26}
          height={26}
          style={{ display: 'block' }}
        />
        NABEEL MUNIR
      </a>

      <nav
        aria-label="Primary"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'clamp(4px, 1.2vw, 16px)',
          fontSize: 13,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          flexWrap: 'wrap',
        }}
      >
        {navLinks.map((l) => (
          <a key={l.href} href={l.href} style={linkStyle}>
            {l.label}
          </a>
        ))}
        <button
          onClick={toggle}
          aria-label="Toggle color theme"
          style={{
            cursor: 'pointer',
            background: 'var(--bg2)',
            border: '1px solid var(--line)',
            color: 'var(--ink)',
            fontFamily: 'inherit',
            fontSize: 11,
            letterSpacing: '0.08em',
            padding: '10px 16px',
            minHeight: 44,
          }}
        >
          {theme === 'light' ? 'LIGHT' : 'DARK'}
        </button>
      </nav>
    </header>
  );
};
