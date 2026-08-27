import Image from 'next/image';
import Nabeel from '../../../public/images/Nabeel.jpg';
import { Pipeline } from '../Pipeline';

const headlineLine = (delay) => ({
  display: 'inline-block',
  animation: `slideup .8s ${delay}s cubic-bezier(.2,.8,.2,1) both`,
});

export const Hero = () => {
  return (
    <section
      id="top"
      style={{
        position: 'relative',
        zIndex: 1,
        padding:
          'clamp(40px,8vh,90px) clamp(16px,4vw,48px) clamp(36px,6vh,72px)',
        borderBottom: '1px solid var(--line)',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns:
            'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
          gap: 'clamp(28px,5vw,64px)',
          alignItems: 'center',
          maxWidth: 1280,
          margin: '0 auto',
        }}
      >
        <div>
          <div
            style={{
              fontSize: 11,
              color: 'var(--dim)',
              display: 'flex',
              flexWrap: 'wrap',
              gap: 14,
              marginBottom: 22,
              animation: 'fadein .8s .1s both',
            }}
          >
            <span style={{ color: 'var(--green)' }}>▲ ONLINE</span>
            <span>OPEN TO OPPORTUNITIES</span>
          </div>

          <h1
            className="font-display"
            style={{
              margin: 0,
              fontWeight: 700,
              textTransform: 'uppercase',
              fontSize: 'clamp(38px,6.5vw,84px)',
              lineHeight: 1,
              letterSpacing: '-0.02em',
            }}
          >
            <span style={{ display: 'block', overflow: 'clip' }}>
              <span style={headlineLine(0.1)}>Full stack</span>
            </span>
            <span style={{ display: 'block', overflow: 'clip' }}>
              <span style={headlineLine(0.25)}>engineer who</span>
            </span>
            <span style={{ display: 'block', overflow: 'clip' }}>
              <span style={headlineLine(0.4)}>
                ships <span style={{ color: 'var(--green)' }}>end</span> to{' '}
                <span style={{ color: 'var(--blue)' }}>end</span>.
              </span>
            </span>
          </h1>

          <p
            style={{
              margin: '24px 0 0',
              fontSize: 15,
              lineHeight: 1.85,
              color: 'var(--dim)',
              animation: 'fadein .8s .6s both',
            }}
          >
            I build web applications from the interface people see to the
            services running behind it. Currently an engineer at Swisscom in
            Riga, Latvia.
            <span
              aria-hidden="true"
              style={{
                display: 'inline-block',
                width: 7,
                height: 14,
                background: 'var(--green)',
                verticalAlign: '-2px',
                marginLeft: 6,
                animation: 'blink 1.1s step-end infinite',
              }}
            />
          </p>

          <div style={{ marginTop: 26, animation: 'fadein .8s .7s both' }}>
            <Pipeline />
          </div>
        </div>

        <div
          style={{
            animation: 'fadein .8s .4s both',
            justifySelf: 'center',
            width: 'min(100%, 420px)',
          }}
        >
          <div
            style={{
              position: 'relative',
              border: '1px solid var(--line)',
              background: 'var(--bg2)',
              padding: 10,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 7,
                padding: '0 2px 10px',
                fontSize: 10,
                color: 'var(--dim)',
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: 'var(--orange)',
                }}
              />
              <span
                aria-hidden="true"
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: 'var(--green)',
                }}
              />
              <span
                aria-hidden="true"
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: 'var(--blue)',
                }}
              />
              <span style={{ marginLeft: 6 }}>nabeel.jpg</span>
            </div>
            <div style={{ position: 'relative', width: '100%', aspectRatio: '4 / 5' }}>
              <Image
                alt="Nabeel Munir"
                src={Nabeel}
                fill
                sizes="420px"
                priority
                style={{ objectFit: 'cover', objectPosition: 'top' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
