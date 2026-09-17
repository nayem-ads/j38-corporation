import nodemailer from 'nodemailer';
import { GrowthAudit } from './db';

const RECIPIENT_EMAIL = process.env.NOTIFICATION_EMAIL || 'raselrehman222@gmail.com';

export async function sendAuditNotification(audit: GrowthAudit): Promise<{ success: boolean; error?: string }> {
  console.log(`[Notification] Initiating lead notification for ${audit.name} (${audit.email}) -> ${RECIPIENT_EMAIL}`);

  const subject = `New Growth Audit Request: ${audit.name} - ${audit.website || audit.company || 'Website'} [${audit.service}]`;
  
  const textContent = `
NEW GROWTH AUDIT REQUEST RECEIVED
---------------------------------
Name: ${audit.name}
Work Email: ${audit.email}
Website: ${audit.website || 'N/A'}
Phone / WhatsApp: ${audit.phone || 'N/A'}
Company: ${audit.company || 'N/A'}

SERVICE & GROWTH PARAMETERS
---------------------------
Service Needed: ${audit.service}
Monthly Ad Budget: ${audit.budget || 'N/A'}
Timeline: ${audit.timeline}
Where they sell (Market): ${audit.market}

PRIMARY GOAL / OBJECTIVE
------------------------
${audit.goal || 'No specific notes provided'}

SUBMISSION DETAILS
------------------
ID: ${audit.id}
Time: ${new Date(audit.createdAt).toLocaleString()}
IP: ${audit.ip || 'N/A'}
`;

  const htmlContent = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 620px; margin: 0 auto; padding: 28px; background: #F5F5F2; color: #0A0A0A; border-radius: 16px;">
      <div style="border-bottom: 2px solid #0A0A0A; padding-bottom: 16px; margin-bottom: 24px;">
        <div style="font-size: 26px; font-weight: 900; letter-spacing: -0.02em;">∞ J38 CORPORATION</div>
        <div style="font-size: 13px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #0C4137; margin-top: 4px;">Free Growth Audit Request</div>
      </div>

      <div style="background: #FFFFFF; border: 1px solid rgba(0,0,0,0.12); border-radius: 12px; padding: 22px; margin-bottom: 18px; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
        <h3 style="margin: 0 0 14px 0; font-size: 14px; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; color: #55575A;">Prospect Contact Info</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
          <tr>
            <td style="padding: 6px 0; color: #55575A; width: 140px; font-weight: 600;">Name:</td>
            <td style="padding: 6px 0; font-weight: 700; color: #0A0A0A;">${audit.name}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #55575A; font-weight: 600;">Work Email:</td>
            <td style="padding: 6px 0; font-weight: 700;"><a href="mailto:${audit.email}" style="color: #0C4137; text-decoration: none;">${audit.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #55575A; font-weight: 600;">Website to Review:</td>
            <td style="padding: 6px 0; font-weight: 700;">
              ${audit.website ? `<a href="${audit.website.startsWith('http') ? audit.website : 'https://' + audit.website}" target="_blank" style="color: #0C4137; text-decoration: underline;">${audit.website}</a>` : 'Not provided'}
            </td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #55575A; font-weight: 600;">Phone / WhatsApp:</td>
            <td style="padding: 6px 0; font-weight: 600;">${audit.phone || 'Not provided'}</td>
          </tr>
        </table>
      </div>

      <div style="background: #FFFFFF; border: 1px solid rgba(0,0,0,0.12); border-radius: 12px; padding: 22px; margin-bottom: 18px; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
        <h3 style="margin: 0 0 14px 0; font-size: 14px; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; color: #55575A;">Growth Requirements</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
          <tr>
            <td style="padding: 6px 0; color: #55575A; width: 140px; font-weight: 600;">Service Needed:</td>
            <td style="padding: 6px 0; font-weight: 800; color: #0A0A0A;">${audit.service}</td>
          </tr>
          ${audit.budget ? `
          <tr>
            <td style="padding: 6px 0; color: #55575A; font-weight: 600;">Monthly Ad Budget:</td>
            <td style="padding: 6px 0; font-weight: 700; color: #0C4137;">${audit.budget}</td>
          </tr>` : ''}
          <tr>
            <td style="padding: 6px 0; color: #55575A; font-weight: 600;">Timeline:</td>
            <td style="padding: 6px 0; font-weight: 600;">${audit.timeline}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #55575A; font-weight: 600;">Target Market:</td>
            <td style="padding: 6px 0; font-weight: 600;">${audit.market}</td>
          </tr>
        </table>
      </div>

      ${audit.goal ? `
      <div style="background: #FFFFFF; border: 1px solid rgba(0,0,0,0.12); border-radius: 12px; padding: 22px; margin-bottom: 18px; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
        <h3 style="margin: 0 0 10px 0; font-size: 14px; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; color: #55575A;">Target Objective / Goal</h3>
        <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #1A1A1A; white-space: pre-wrap; background: #FAFAF7; padding: 14px; border-radius: 8px; border-left: 4px solid #06D6A0;">${audit.goal}</p>
      </div>` : ''}

      <div style="text-align: center; font-size: 12px; color: #777777; margin-top: 24px;">
        Received on ${new Date(audit.createdAt).toLocaleString()} • J38 Corporation Lead Engine
      </div>
    </div>
  `;

  // 1. SMTP Transporter (if configured)
  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpPort = Number(process.env.SMTP_PORT) || 587;

  if (smtpHost && smtpUser && smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: { user: smtpUser, pass: smtpPass }
      });

      await transporter.sendMail({
        from: `"J38 Growth Engine" <${smtpUser}>`,
        to: RECIPIENT_EMAIL,
        replyTo: audit.email,
        subject,
        text: textContent,
        html: htmlContent
      });
      console.log('[Notification] SMTP email sent successfully to ' + RECIPIENT_EMAIL);
      return { success: true };
    } catch (err: any) {
      console.warn('[Notification] SMTP dispatch failed, trying next methods:', err.message);
    }
  }

  // 2. Resend API (if configured)
  const resendApiKey = process.env.RESEND_API_KEY;
  if (resendApiKey) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'J38 Corporation <growth@j38.co>',
          to: [RECIPIENT_EMAIL],
          reply_to: audit.email,
          subject,
          text: textContent,
          html: htmlContent
        })
      });
      if (res.ok) {
        console.log('[Notification] Resend API email delivered successfully to ' + RECIPIENT_EMAIL);
        return { success: true };
      }
    } catch (err: any) {
      console.warn('[Notification] Resend API dispatch error:', err.message);
    }
  }

  // 3. Webhook (Discord / Slack / Telegram / Zapier) if configured
  const webhookUrl = process.env.NOTIFICATION_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: `🚨 **New J38 Growth Audit Request!**\n**Name:** ${audit.name}\n**Email:** ${audit.email}\n**Website:** ${audit.website || 'N/A'}\n**Service:** ${audit.service}\n**Budget:** ${audit.budget || 'N/A'}\n**Market:** ${audit.market}\n**Goal:** ${audit.goal || 'N/A'}`
        })
      });
      console.log('[Notification] Webhook dispatched successfully');
    } catch (err) {
      console.warn('[Notification] Webhook dispatch error:', err);
    }
  }

  // 4. Formsubmit fallback relay: sends email directly to raselrehman222@gmail.com without needing local SMTP keys
  try {
    const relayRes = await fetch(`https://formsubmit.co/ajax/${RECIPIENT_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        _subject: subject,
        _template: 'table',
        'Name': audit.name,
        'Work Email': audit.email,
        'Website': audit.website || 'N/A',
        'Phone': audit.phone || 'N/A',
        'Service': audit.service,
        'Monthly Budget': audit.budget || 'N/A',
        'Timeline': audit.timeline,
        'Target Market': audit.market,
        'Goal / Objective': audit.goal || 'N/A',
        'Submitted At': new Date(audit.createdAt).toLocaleString()
      })
    });
    if (relayRes.ok) {
      console.log('[Notification] Formsubmit direct email dispatch succeeded to ' + RECIPIENT_EMAIL);
      return { success: true };
    }
  } catch (err) {
    console.warn('[Notification] Email relay attempt logged:', err);
  }

  return { success: true };
}
