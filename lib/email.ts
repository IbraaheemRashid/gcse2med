import "server-only";

import { Resend } from "resend";
import { site } from "@/content/site";

/**
 * Email sending, degrading gracefully when RESEND_API_KEY is absent: the
 * message is logged instead of sent so local development and the first deploy
 * work end to end without credentials.
 */
let resend: Resend | null | undefined;

function getResend(): Resend | null {
  if (resend !== undefined) return resend;
  const key = process.env.RESEND_API_KEY;
  resend = key ? new Resend(key) : null;
  if (!resend && process.env.NODE_ENV !== "production") {
    console.warn("[email] RESEND_API_KEY not set — emails will be logged, not sent.");
  }
  return resend;
}

/** Verified sending identity. Must be on a domain verified in Resend. */
const FROM = process.env.EMAIL_FROM ?? `${site.name} <hello@gcse2med.co.uk>`;
/** Where enquiry and lead notifications land. */
const INTERNAL_TO = process.env.EMAIL_INTERNAL_TO ?? site.email;

export type SendResult = { ok: boolean; skipped?: boolean; error?: string };

export async function sendEmail(options: {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}): Promise<SendResult> {
  const client = getResend();

  if (!client) {
    console.info(`[email] (not sent — no API key) to=${options.to} subject=${options.subject}`);
    return { ok: true, skipped: true };
  }

  const { error } = await client.emails.send({
    from: FROM,
    to: options.to,
    subject: options.subject,
    html: options.html,
    text: options.text,
    ...(options.replyTo ? { replyTo: options.replyTo } : {}),
  });

  if (error) {
    console.error("[email] send failed:", error.message);
    return { ok: false, error: error.message };
  }
  return { ok: true };
}

export async function sendInternalEmail(options: {
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}): Promise<SendResult> {
  return sendEmail({ ...options, to: INTERNAL_TO });
}
