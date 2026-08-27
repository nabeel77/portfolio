// Builds the HTML and plain text bodies for the contact email.
// All user supplied values are escaped before they touch the HTML.

const escapeHtml = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

export const buildContactEmail = ({ name, email, message }) => {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br />');

  const html = `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:0;background:#0b0f16;font-family:'Segoe UI',Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0b0f16;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#121826;border:1px solid #232c3d;border-radius:14px;overflow:hidden;">
            <tr>
              <td style="padding:22px 28px;border-bottom:1px solid #232c3d;">
                <div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#7ee3a6;font-family:monospace;">new message</div>
                <div style="font-size:20px;font-weight:700;color:#e8ecf5;margin-top:6px;">from your portfolio</div>
              </td>
            </tr>
            <tr>
              <td style="padding:26px 28px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#8a93a6;font-family:monospace;padding-bottom:4px;">Name</td>
                  </tr>
                  <tr>
                    <td style="font-size:16px;color:#e8ecf5;padding-bottom:20px;">${safeName}</td>
                  </tr>
                  <tr>
                    <td style="font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#8a93a6;font-family:monospace;padding-bottom:4px;">Email</td>
                  </tr>
                  <tr>
                    <td style="font-size:16px;padding-bottom:20px;">
                      <a href="mailto:${safeEmail}" style="color:#6ba8ff;text-decoration:none;">${safeEmail}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#8a93a6;font-family:monospace;padding-bottom:8px;">Message</td>
                  </tr>
                  <tr>
                    <td style="font-size:16px;line-height:1.65;color:#c7cede;background:#0d1320;border:1px solid #232c3d;border-radius:10px;padding:16px 18px;">${safeMessage}</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 28px;border-top:1px solid #232c3d;font-family:monospace;font-size:12px;color:#8a93a6;">
                Reply straight to this email to reach ${safeName}.
              </td>
            </tr>
          </table>
          <div style="max-width:560px;margin-top:16px;font-family:monospace;font-size:11px;color:#556074;">
            Sent from the contact form on nabeelmunir.com
          </div>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  const text = [
    'New message from your portfolio',
    '',
    `Name: ${name}`,
    `Email: ${email}`,
    '',
    'Message:',
    message,
    '',
    'Reply straight to this email to reach them.',
  ].join('\n');

  return { html, text };
};
