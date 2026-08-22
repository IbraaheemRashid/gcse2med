import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/schemas";
import { recordLead } from "@/lib/supabase";
import { sendInternalEmail } from "@/lib/email";
import { internalNotificationEmail } from "@/lib/email-templates";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { verifyTurnstile } from "@/lib/turnstile";

export async function POST(request: Request) {
  const ip = clientIp(request);
  const limit = rateLimit(`contact:${ip}`, { limit: 5, windowMs: 60_000 });
  if (!limit.allowed) {
    return NextResponse.json(
      { error: "Too many messages. Please wait a moment and try again." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Please check the form and try again." },
      { status: 400 },
    );
  }

  const { name, email, phone, subject, message, marketingConsent, turnstileToken, website } =
    parsed.data;

  // Honeypot: silently accept so a bot gets no signal that it was caught.
  if (website) return NextResponse.json({ ok: true });

  if (!(await verifyTurnstile(turnstileToken, ip))) {
    return NextResponse.json(
      { error: "We could not verify that you are human. Please try again." },
      { status: 400 },
    );
  }

  const sent = await sendInternalEmail({
    ...internalNotificationEmail("New website enquiry", {
      Name: name,
      Email: email,
      Phone: phone || "—",
      "Subject of interest": subject || "—",
      Message: message,
      "Marketing consent": marketingConsent ? "yes" : "no",
    }),
    replyTo: email,
  });

  if (!sent.ok) {
    return NextResponse.json(
      { error: "We couldn't send your message just now. Please email us directly." },
      { status: 502 },
    );
  }

  await recordLead({
    email,
    name,
    phone: phone ?? null,
    source: "contact",
    message,
    marketingConsent: marketingConsent ?? false,
    metadata: { subject: subject ?? null },
  });

  return NextResponse.json({ ok: true });
}
