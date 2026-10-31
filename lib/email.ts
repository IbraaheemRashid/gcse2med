import "server-only";

import { Resend } from "resend";
import { site } from "@/content/site";

/**
 * Missing credentials return a failure so forms never claim an unsent message arrived.
 */
let resend: Resend | null | undefined;

function getResend(): Resend | null {
  if (resend !== undefined) return resend;
  const key = process.env.RESEND_API_KEY;
  resend = key ? new Resend(key) : null;
  if (!resend && process.env.NODE_ENV !== "production") {
    console.warn("[email] RESEND_API_KEY not set — email delivery is unavailable.");
  }
  return resend;
}

/** Verified sending identity. Must be on a domain verified in Resend. */
const FROM = process.env.EMAIL_FROM ?? `${site.name} <hello@mail.gcse2med.com>`;
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
    console.warn("[email] Delivery unavailable: RESEND_API_KEY is missing");
    return { ok: false, skipped: true, error: "Email delivery is not configured" };
  }

  try {
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
  } catch {
    console.error("[email] Delivery request failed");
    return { ok: false, error: "Email delivery failed" };
  }
}

export async function sendInternalEmail(options: {
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}): Promise<SendResult> {
  return sendEmail({ ...options, to: INTERNAL_TO });
}
