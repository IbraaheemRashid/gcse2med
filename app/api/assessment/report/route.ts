import { NextResponse } from "next/server";
import { reportRequestSchema } from "@/lib/schemas";
import { markAttempt } from "@/lib/marking";
import { recordLead } from "@/lib/supabase";
import { sendEmail, sendInternalEmail } from "@/lib/email";
import { assessmentReportEmail, internalNotificationEmail } from "@/lib/email-templates";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { verifyTurnstile } from "@/lib/turnstile";
import { subjectById, levelById } from "@/content/subjects";

/**
 * Emails a copy of the assessment report.
 *
 * The result is re-marked here from the submitted answers rather than trusting
 * anything the client sends back, so a tampered payload cannot produce a report
 * that disagrees with our own marking.
 */
export async function POST(request: Request) {
  const ip = clientIp(request);
  const limit = rateLimit(`assessment-report:${ip}`, { limit: 5, windowMs: 60_000 });
  if (!limit.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment and try again." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = reportRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Please check the form and try again." },
      { status: 400 },
    );
  }

  const { subject, level, answers, email, name, marketingConsent, turnstileToken } =
    parsed.data;

  if (!(await verifyTurnstile(turnstileToken, ip))) {
    return NextResponse.json(
      { error: "We could not verify that you are human. Please try again." },
      { status: 400 },
    );
  }

  const result = markAttempt(subject, level, answers);
  if (!result) {
    return NextResponse.json(
      { error: "No assessment exists for that subject and level yet." },
      { status: 404 },
    );
  }

  const report = assessmentReportEmail(result);
  const sent = await sendEmail({ to: email, ...report });

  if (!sent.ok) {
    return NextResponse.json(
      { error: "We couldn't send the report just now. Please try again shortly." },
      { status: 502 },
    );
  }

  await recordLead({
    email,
    name: name ?? null,
    source: "assessment",
    marketingConsent: marketingConsent ?? false,
    metadata: {
      subject,
      level,
      score: result.score,
      total: result.total,
      percentage: result.percentage,
      focusTopics: result.focusTopics,
    },
  });

  // Notify the team so a new lead is never sitting unseen in a database.
  await sendInternalEmail(
    internalNotificationEmail("New assessment completed", {
      Email: email,
      Name: name ?? "—",
      Assessment: `${levelById[level].name} ${subjectById[subject].name}`,
      Score: `${result.score}/${result.total} (${result.percentage}%)`,
      "Areas to improve": result.focusTopics.join(", ") || "none",
      "Marketing consent": marketingConsent ? "yes" : "no",
    }),
  );

  return NextResponse.json({ ok: true });
}
