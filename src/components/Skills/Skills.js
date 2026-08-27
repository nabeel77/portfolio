import { Reveal } from '../Reveal';
import { Throwable } from '../Throwable';
import { skillGroups } from '../../data/skills';

const accents = ['var(--blue)', 'var(--green)', 'var(--orange)'];

const chipBase = {
  border: '1px solid var(--line)',
  background: 'var(--bg)',
  padding: '10px 16px',
  fontSize: 14,
};

const primaryChip = {
  ...chipBase,
  border: '1px solid var(--green)',
  fontWeight: 600,
};

const Star = () => (
  <span aria-hidden="true" style={{ color: 'var(--green)', marginRight: 6 }}>
    ★
  </span>
);

export const Skills = () => {
  return (
    <section
      id="skills"
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
            Skills
          </h2>
        </Reveal>
        <Reveal>
          <p style={{ margin: '0 0 24px', fontSize: 13, color: 'var(--dim)' }}>
            <span style={{ color: 'var(--green)' }}>★</span> marks my core
            strengths. the rest are technologies I have worked with.
          </p>
        </Reveal>

        <Reveal>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns:
                'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
              gap: 'clamp(18px,3vw,32px)',
            }}
          >
            {skillGroups.map((group, i) => (
              <div key={group.title}>
                <div
                  style={{
                    fontSize: 12,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: accents[i % accents.length],
                    marginBottom: 12,
                  }}
                >
                  {group.title}
                </div>
                <div
                  style={{
                    display: 'flex',
                    gap: 8,
                    flexWrap: 'wrap',
                  }}
                >
                  {group.skills.map((s) => (
                    <Throwable
                      key={s.name}
                      style={s.primary ? primaryChip : chipBase}
                    >
                      {s.primary && <Star />}
                      {s.name}
                    </Throwable>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};
