import { buildContactEmail } from '../../emails/contactTemplate';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const clean = (value) => (typeof value === 'string' ? value.trim() : '');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const body = req.body || {};

  // Honeypot: real people never fill this hidden field. Bots do.
  if (clean(body.company)) {
    return res.status(200).json({ ok: true });
  }

  const name = clean(body.name);
  const email = clean(body.email);
  const message = clean(body.message);

  if (!name || name.length > 100) {
    return res.status(400).json({ ok: false, error: 'Please add your name.' });
  }
  if (!email || email.length > 200 || !EMAIL_RE.test(email)) {
    return res
      .status(400)
      .json({ ok: false, error: 'Please add a valid email.' });
  }
  if (!message || message.length > 5000) {
    return res
      .status(400)
      .json({ ok: false, error: 'Please add a message.' });
  }

  const token = process.env.POSTMARK_SERVER_TOKEN;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL;
  const stream = process.env.POSTMARK_MESSAGE_STREAM || 'outbound';

  if (!token || !from || !to) {
    console.error('Contact form is missing Postmark configuration.');
    return res
      .status(500)
      .json({ ok: false, error: 'Email is not configured yet.' });
  }

  const { html, text } = buildContactEmail({ name, email, message });

  try {
    const response = await fetch('https://api.postmarkapp.com/email', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Postmark-Server-Token': token,
      },
      body: JSON.stringify({
        From: from,
        To: to,
        ReplyTo: `${name} <${email}>`,
        Subject: `New portfolio message from ${name}`,
        HtmlBody: html,
        TextBody: text,
        MessageStream: stream,
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error('Postmark send failed:', response.status, detail);
      return res
        .status(502)
        .json({ ok: false, error: 'Could not send right now. Try again later.' });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Postmark request error:', err);
    return res
      .status(502)
      .json({ ok: false, error: 'Could not send right now. Try again later.' });
  }
}
