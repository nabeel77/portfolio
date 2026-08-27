import { Reveal } from '../Reveal';
import { projects, radiantsSystem } from '../../data/projects';

const accents = ['var(--blue)', 'var(--green)', 'var(--orange)', 'var(--blue)'];

const statusColor = (status) =>
  status === 'LIVE' ? 'var(--green)' : 'var(--orange)';

const WorkCard = ({ project, index }) => {
  const accent = accents[index % accents.length];
  const isLink = Boolean(project.link);
  const Tag = isLink ? 'a' : 'div';
  const linkProps = isLink
    ? { href: project.link, target: '_blank', rel: 'noreferrer' }
    : {};

  return (
    <Tag
      {...linkProps}
      className="work-card"
      style={{
        '--card-accent': accent,
        display: 'block',
        padding: 'clamp(18px,3vw,30px)',
        color: 'var(--ink)',
        cursor: isLink ? 'pointer' : 'default',
        border: '1px solid var(--line)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 10,
          color: 'var(--dim)',
          marginBottom: 16,
        }}
      >
        <span>{String(index + 1).padStart(3, '0')}</span>
        <span style={{ color: statusColor(project.status) }}>
          ● {project.status}
        </span>
      </div>

      <div
        className="font-display"
        style={{
          fontWeight: 700,
          fontSize: 'clamp(20px,2.4vw,26px)',
          textTransform: 'uppercase',
        }}
      >
        {project.name}
      </div>

      {project.meta && (
        <div style={{ fontSize: 10, color: 'var(--dim)', marginTop: 6 }}>
          {project.meta}
        </div>
      )}

      <p
        style={{
          margin: '8px 0 16px',
          fontSize: 14,
          lineHeight: 1.75,
          color: 'var(--dim)',
        }}
      >
        {project.contributions}
      </p>

      <span style={{ fontSize: 12, color: accent }}>
        {project.tech.slice(0, 5).join(' · ')}
        {isLink ? ' →' : ''}
      </span>
    </Tag>
  );
};

const ChildApp = ({ app, accent, last }) => (
  <div style={{ display: 'flex', gap: 'clamp(8px,2vw,14px)' }}>
    <span
      aria-hidden="true"
      style={{
        color: 'var(--dim)',
        fontSize: 18,
        lineHeight: 1.3,
        userSelect: 'none',
      }}
    >
      {last ? '└─' : '├─'}
    </span>
    <div
      style={{
        flex: 1,
        minWidth: 0,
        borderLeft: `2px solid ${accent}`,
        paddingLeft: 'clamp(12px,2vw,18px)',
        paddingBottom: last ? 0 : 'clamp(16px,3vw,24px)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          gap: 8,
          flexWrap: 'wrap',
        }}
      >
        <span
          className="font-display"
          style={{
            fontWeight: 700,
            fontSize: 'clamp(16px,2vw,20px)',
            textTransform: 'uppercase',
          }}
        >
          {app.name}
        </span>
        <span style={{ fontSize: 10, color: 'var(--green)' }}>
          ● LIVE · opens in RadOS
        </span>
      </div>
      <p style={{ margin: '6px 0 0', fontSize: 13, color: 'var(--ink)' }}>
        {app.blurb}
      </p>
      <p
        style={{
          margin: '8px 0 12px',
          fontSize: 13,
          lineHeight: 1.7,
          color: 'var(--dim)',
        }}
      >
        {app.contributions}
      </p>
      <span style={{ fontSize: 12, color: accent }}>
        {app.tech.slice(0, 5).join(' · ')}
      </span>
    </div>
  </div>
);

const SystemBlock = () => {
  const sys = radiantsSystem;
  return (
    <Reveal>
      <div
        style={{
          border: '1px solid var(--line)',
          background: 'var(--bg)',
          marginBottom: 'clamp(24px,4vw,40px)',
        }}
      >
        <div style={{ padding: 'clamp(18px,3vw,30px)' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: 10,
              color: 'var(--dim)',
              marginBottom: 16,
            }}
          >
            <span>radiant.nexus</span>
            <span style={{ color: 'var(--green)' }}>● LIVE</span>
          </div>

          <div
            className="font-display"
            style={{
              fontWeight: 700,
              fontSize: 'clamp(24px,3vw,34px)',
              textTransform: 'uppercase',
            }}
          >
            {sys.name}
          </div>
          <div style={{ fontSize: 10, color: 'var(--dim)', marginTop: 6 }}>
            {sys.meta}
          </div>

          <p
            style={{
              margin: '12px 0 16px',
              fontSize: 14,
              lineHeight: 1.75,
              color: 'var(--dim)',
              maxWidth: 760,
            }}
          >
            {sys.contributions}
          </p>

          <a
            href={sys.link}
            target="_blank"
            rel="noreferrer"
            className="hover-link"
            style={{ fontSize: 12, color: 'var(--green)' }}
          >
            {sys.tech.slice(0, 5).join(' · ')} →
          </a>
        </div>

        <div
          style={{
            borderTop: '1px dashed var(--line)',
            background: 'var(--bg2)',
            padding: 'clamp(16px,3vw,26px)',
          }}
        >
          <div
            style={{
              fontSize: 10,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--dim)',
              marginBottom: 18,
            }}
          >
            apps running inside RadOS
          </div>
          {sys.children.map((app, i) => (
            <ChildApp
              key={app.name}
              app={app}
              accent={i === 0 ? 'var(--orange)' : 'var(--blue)'}
              last={i === sys.children.length - 1}
            />
          ))}
        </div>
      </div>
    </Reveal>
  );
};

export const Projects = () => {
  return (
    <section
      id="work"
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
            Selected work
          </h2>
        </Reveal>

        <SystemBlock />

        <Reveal>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns:
                'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gap: 'clamp(12px,2vw,18px)',
            }}
          >
            {projects.map((project, i) => (
              <WorkCard key={project.name} project={project} index={i} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};
