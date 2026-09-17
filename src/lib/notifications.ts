import { GrowthAudit } from './db';

const ADMIN_NOTIFICATION_EMAIL = process.env.ADMIN_NOTIFICATION_EMAIL || 'raselrehman222@gmail.com';

export async function sendAuditNotification(audit: GrowthAudit): Promise<{ success: boolean; error?: string }> {
  console.log(`[Notification] Dispatching growth audit alert for ${audit.name} (${audit.company || 'N/A'}) to ${ADMIN_NOTIFICATION_EMAIL}`);

  // 1. Dispatch Webhook if configured (Discord, Slack, Make, Zapier)
  const webhookUrl = process.env.NOTIFICATION_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      const webhookPayload = {
        username: 'J38 Growth Engine',
        content: `🚨 **New Free Growth Audit Request Received!**\n` +
          `**Prospect:** ${audit.name} (${audit.company || 'Individual'})\n` +
          `**Email:** ${audit.email} | **Phone:** ${audit.phone || 'N/A'}\n` +
          `**Service Needed:** ${audit.service}\n` +
          `**Monthly Budget:** ${audit.budget} | **Timeline:** ${audit.timeline}\n` +
          `**Target Market:** ${audit.market}\n` +
          `**Primary Goal:** ${audit.goal}\n` +
          `**Time:** ${new Date(audit.createdAt).toLocaleString()}`
      };

      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(webhookPayload)
      });
      console.log('[Notification] Webhook dispatched successfully');
    } catch (err) {
      console.warn('[Notification] Webhook dispatch failed (non-critical):', err);
    }
  }

  // 2. Email Dispatch (Resend / SendGrid / SMTP / Console fallback)
  const resendApiKey = process.env.RESEND_API_KEY;
  if (resendApiKey) {
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'J38 Corporation <growth@j38.co>',
          to: [ADMIN_NOTIFICATION_EMAIL],
          subject: `Growth Audit Request: ${audit.company || audit.name} [${audit.service}]`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #0A0A0A; background: #FAFAF7; border-radius: 12px; border: 1px solid #E5E7EB;">
              <h2 style="font-size: 22px; font-weight: 800; margin-bottom: 4px; color: #0A0A0A;">New Growth Audit Request</h2>
              <p style="font-size: 14px; color: #55575A; margin-top: 0;">Submitted via J38 Corporation Interactive Growth Engine</p>
              
              <div style="background: #FFFFFF; padding: 20px; border-radius: 8px; border: 1px solid #E5E7EB; margin: 20px 0;">
                <h3 style="font-size: 15px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #0C4137; margin-top: 0;">Contact Details</h3>
                <p style="margin: 6px 0;"><strong>Name:</strong> ${audit.name}</p>
                <p style="margin: 6px 0;"><strong>Company:</strong> ${audit.company || 'N/A'}</p>
                <p style="margin: 6px 0;"><strong>Email:</strong> <a href="mailto:${audit.email}">${audit.email}</a></p>
                <p style="margin: 6px 0;"><strong>Phone / WhatsApp:</strong> ${audit.phone || 'N/A'}</p>
              </div>

              <div style="background: #FFFFFF; padding: 20px; border-radius: 8px; border: 1px solid #E5E7EB; margin: 20px 0;">
                <h3 style="font-size: 15px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #0C4137; margin-top: 0;">Project Parameters</h3>
                <p style="margin: 6px 0;"><strong>Service Needed:</strong> ${audit.service}</p>
                <p style="margin: 6px 0;"><strong>Monthly Ad Budget:</strong> ${audit.budget}</p>
                <p style="margin: 6px 0;"><strong>Timeline:</strong> ${audit.timeline}</p>
                <p style="margin: 6px 0;"><strong>Target Market:</strong> ${audit.market}</p>
                <p style="margin: 6px 0;"><strong>Primary Goal:</strong></p>
                <blockquote style="background: #F9FAFB; padding: 12px; border-left: 4px solid #06D6A0; margin: 8px 0; font-style: italic;">
                  ${audit.goal}
                </blockquote>
              </div>

              <p style="font-size: 12px; color: #888888; text-align: center; margin-top: 30px;">
                © J38 Corporation • Built for What's Next
              </p>
            </div>
          `
        })
      });
      console.log('[Notification] Resend email dispatched successfully');
    } catch (err) {
      console.warn('[Notification] Email API dispatch failed:', err);
    }
  }

  return { success: true };
}
