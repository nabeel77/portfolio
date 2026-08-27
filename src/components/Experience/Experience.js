import { Reveal } from '../Reveal';
import { experience } from '../../data/experience';

const accents = ['var(--green)', 'var(--blue)', 'var(--orange)'];

const tag = {
  border: '1px solid var(--line)',
  background: 'var(--bg2)',
  padding: '7px 12px',
  fontSize: 13,
  color: 'var(--dim)',
};

export const Experience = () => {
  return (
    <section
      id="experience"
      style={{
        position: 'relative',
        zIndex: 1,
        padding: 'clamp(40px,8vh,90px) clamp(16px,4vw,48px)',
        borderBottom: '1px solid var(--line)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <Reveal>
          <h2
            className="font-display"
            style={{
              margin: '0 0 24px',
              fontWeight: 700,
              textTransform: 'uppercase',
              fontSize: 'clamp(24px,4vw,48px)',
            }}
          >
            Experience
          </h2>
        </Reveal>

        <div
          style={{
            display: 'grid',
            gap: 1,
            background: 'var(--line)',
            border: '1px solid var(--line)',
          }}
        >
          {experience.map((job, i) => (
            <Reveal key={job.company} delay={i * 0.05}>
              <div
                style={{
                  background: 'var(--bg)',
                  padding: 'clamp(18px,3vw,30px)',
                  borderLeft: `3px solid ${accents[i % accents.length]}`,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: 8,
                    fontSize: 10,
                    color: 'var(--dim)',
                    marginBottom: 12,
                  }}
                >
                  <span>{String(i + 1).padStart(3, '0')}</span>
                  <span>{job.period}</span>
                </div>

                <div
                  className="font-display"
                  style={{
                    fontWeight: 700,
                    fontSize: 'clamp(18px,2.2vw,24px)',
                    textTransform: 'uppercase',
                  }}
                >
                  {job.role}{' '}
                  <span style={{ color: accents[i % accents.length] }}>
                    / {job.company}
                  </span>
                </div>

                <div
                  style={{ fontSize: 11, color: 'var(--dim)', marginTop: 6 }}
                >
                  {job.location}
                </div>

                <p
                  style={{
                    margin: '12px 0 16px',
                    fontSize: 14,
                    lineHeight: 1.75,
                    color: 'var(--dim)',
                    maxWidth: 720,
                  }}
                >
                  {job.summary}
                </p>

                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {job.tech.map((t) => (
                    <span key={t} style={tag}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
