import { useState, useRef, useEffect } from 'react';
import { Reveal } from '../Reveal';
import { site } from '../../data/site';

const label = {
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  fontSize: 10,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'var(--dim)',
};

const field = {
  background: 'var(--bg2)',
  border: '1px solid var(--line)',
  color: 'var(--ink)',
  fontFamily: 'inherit',
  fontSize: 13,
  padding: 14,
  minHeight: 48,
  outline: 'none',
  boxSizing: 'border-box',
  width: '100%',
};

const social = [
  { label: 'github', href: 'https://github.com/Nabeel77' },
  {
    label: 'linkedin',
    href: 'https://www.linkedin.com/in/nabeel-munir-8a7a99134/',
  },
];

export const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
    company: '',
  });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState('');
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');
    setErrorMsg('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        throw new Error(data.error || 'Could not send. Try again later.');
      }
      setStatus('sent');
      setForm({ name: '', email: '', message: '', company: '' });
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message);
    }
  };

  const buttonLabel =
    status === 'sending'
      ? 'Sending…'
      : status === 'sent'
      ? '✓ Message sent'
      : status === 'error'
      ? 'Try again'
      : 'Send message';

  return (
    <section
      id="contact"
      style={{
        position: 'relative',
        zIndex: 1,
        padding: 'clamp(56px,11vh,130px) clamp(16px,4vw,48px)',
        textAlign: 'center',
      }}
    >
      <Reveal>
        <p
          style={{
            margin: '0 0 16px',
            fontSize: 11,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--dim)',
          }}
        >
          Get in touch
        </p>
      </Reveal>

      <Reveal>
        <a
          href={`mailto:${site.email}`}
          className="font-display"
          style={{
            display: 'inline-block',
            fontWeight: 700,
            textTransform: 'uppercase',
            fontSize: 'clamp(20px,4.5vw,64px)',
            lineHeight: 1.1,
            overflowWrap: 'anywhere',
          }}
        >
          {site.email}
          <span style={{ color: 'var(--green)' }}>_</span>
        </a>
      </Reveal>

      <Reveal>
        <form
          onSubmit={onSubmit}
          style={{
            maxWidth: 560,
            margin: '40px auto 0',
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
            textAlign: 'left',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns:
                'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
              gap: 14,
            }}
          >
            <label style={label}>
              Name
              <input
                value={form.name}
                onChange={set('name')}
                required
                autoComplete="name"
                placeholder="Your name"
                style={field}
              />
            </label>
            <label style={label}>
              Email
              <input
                type="email"
                value={form.email}
                onChange={set('email')}
                required
                autoComplete="email"
                placeholder="you@company.com"
                style={field}
              />
            </label>
          </div>
          <label style={label}>
            Message
            <textarea
              value={form.message}
              onChange={set('message')}
              required
              rows={5}
              placeholder="What are you building?"
              style={{ ...field, minHeight: 'auto', resize: 'vertical' }}
            />
          </label>

          {/* honeypot: hidden from people, tempting to bots */}
          <input
            type="text"
            name="company"
            value={form.company}
            onChange={set('company')}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: '-9999px',
              width: 1,
              height: 1,
              opacity: 0,
            }}
          />

          <button
            type="submit"
            className="font-display"
            disabled={status === 'sending'}
            style={{
              cursor: status === 'sending' ? 'default' : 'pointer',
              fontWeight: 700,
              fontSize: 13,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              background:
                status === 'sent'
                  ? 'var(--green)'
                  : status === 'error'
                  ? 'var(--orange)'
                  : 'var(--blue)',
              color: 'var(--bg)',
              border: 'none',
              padding: '17px 26px',
              minHeight: 48,
              opacity: status === 'sending' ? 0.7 : 1,
              transition: 'background .3s',
            }}
          >
            {buttonLabel}
          </button>

          {status === 'error' && errorMsg && (
            <p style={{ margin: 0, fontSize: 12, color: 'var(--orange)' }}>
              {errorMsg}
            </p>
          )}
          {status === 'sent' && (
            <p style={{ margin: 0, fontSize: 12, color: 'var(--green)' }}>
              Thanks, I will get back to you soon.
            </p>
          )}
        </form>
      </Reveal>

      <Reveal>
        <div
          style={{
            display: 'flex',
            gap: 8,
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginTop: 30,
            fontSize: 12,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}
        >
          {social.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="hover-link"
              style={{
                color: 'var(--dim)',
                border: '1px solid var(--line)',
                padding: '11px 18px',
                minHeight: 44,
                display: 'inline-flex',
                alignItems: 'center',
              }}
            >
              {s.label}
            </a>
          ))}
        </div>
      </Reveal>
    </section>
  );
};
