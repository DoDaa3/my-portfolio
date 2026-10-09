// HTML email sent to the site owner for each contact form submission.
// Email clients ignore <style> blocks and modern CSS, so everything is
// table-based with inline styles.

const escapeHtml = (str: string) =>
  String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

interface ContactEmailInput {
  name: string;
  email: string;
  message: string;
  date?: Date;
}

export function contactEmail({ name, email, message, date = new Date() }: ContactEmailInput) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br>');
  const initial = escapeHtml(name.trim().charAt(0).toUpperCase() || '?');
  const sentAt = date.toLocaleString('en-US', {
    timeZone: 'Africa/Casablanca',
    dateStyle: 'medium',
    timeStyle: 'short',
  });
  const replyHref = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent('Re: Your message on my portfolio')}`;

  const subject = `New message from ${name}`;

  const text = `New message from your portfolio\n\nName: ${name}\nEmail: ${email}\nSent: ${sentAt}\n\n${message}`;

  const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light">
<title>${escapeHtml(subject)}</title>
</head>
<body style="margin:0;padding:0;background-color:#f1f5f9;">
<span style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(message.slice(0, 120))}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f1f5f9;padding:32px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <tr>
    <td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(15,23,42,0.08);">

        <!-- Header -->
        <tr>
          <td style="background-color:#1e3a8a;background-image:linear-gradient(135deg,#1e3a8a 0%,#2563eb 60%,#3b82f6 100%);padding:32px 32px 28px;">
            <table role="presentation" cellpadding="0" cellspacing="0">
              <tr>
                <td style="background-color:rgba(255,255,255,0.15);border-radius:10px;padding:8px 12px;font-family:'SFMono-Regular',Menlo,Consolas,monospace;font-size:18px;font-weight:700;color:#ffffff;">&lt;/&gt;</td>
              </tr>
            </table>
            <p style="margin:20px 0 4px;font-size:13px;letter-spacing:1.5px;text-transform:uppercase;color:#bfdbfe;font-weight:600;">Portfolio contact form</p>
            <h1 style="margin:0;font-size:24px;line-height:1.3;color:#ffffff;font-weight:700;">You've got a new message 📬</h1>
          </td>
        </tr>

        <!-- Sender -->
        <tr>
          <td style="padding:28px 32px 8px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td width="52" valign="middle">
                  <div style="width:44px;height:44px;border-radius:50%;background-color:#dbeafe;color:#1d4ed8;font-size:20px;font-weight:700;line-height:44px;text-align:center;">${initial}</div>
                </td>
                <td valign="middle">
                  <p style="margin:0;font-size:17px;font-weight:700;color:#0f172a;">${safeName}</p>
                  <a href="mailto:${safeEmail}" style="font-size:14px;color:#2563eb;text-decoration:none;">${safeEmail}</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Message -->
        <tr>
          <td style="padding:20px 32px 8px;">
            <div style="background-color:#f8fafc;border-left:4px solid #3b82f6;border-radius:8px;padding:20px 22px;font-size:15px;line-height:1.7;color:#334155;">${safeMessage}</div>
          </td>
        </tr>

        <!-- Reply button -->
        <tr>
          <td style="padding:24px 32px 8px;">
            <a href="${replyHref}" style="display:inline-block;background-color:#2563eb;color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;padding:12px 28px;border-radius:10px;">Reply to ${safeName} &rarr;</a>
          </td>
        </tr>

        <!-- Meta -->
        <tr>
          <td style="padding:20px 32px 28px;">
            <p style="margin:0;font-size:13px;color:#94a3b8;">Received ${escapeHtml(sentAt)} (Casablanca time)</p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background-color:#f8fafc;border-top:1px solid #e2e8f0;padding:18px 32px;text-align:center;">
            <p style="margin:0;font-size:12px;color:#94a3b8;">Sent from the contact form on your portfolio &middot; Omar Amine</p>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body>
</html>`;

  return { subject, text, html };
}
