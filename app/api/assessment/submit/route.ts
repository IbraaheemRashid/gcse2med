import { NextResponse } from "next/server";
import { submitAssessmentSchema } from "@/lib/schemas";
import { markAttempt } from "@/lib/marking";
import { recordAttempt } from "@/lib/supabase";
import { clientIp, rateLimit } from "@/lib/rate-limit";

/**
 * Marks a submitted attempt.
 *
 * All marking happens here, against the server-only question banks — the
 * browser never receives `correctIndex` or `explanation` until it has committed
 * to its answers.
 */
export async function POST(request: Request) {
  const ip = clientIp(request);
  const limit = rateLimit(`assessment-submit:${ip}`, { limit: 20, windowMs: 60_000 });
  if (!limit.allowed) {
    return NextResponse.json(
      { error: "Too many submissions. Please wait a moment and try again." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = submitAssessmentSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  }

  const { subject, level, answers } = parsed.data;
  const result = markAttempt(subject, level, answers);
  if (!result) {
    return NextResponse.json(
      { error: "No assessment exists for that subject and level yet." },
      { status: 404 },
    );
  }

  // Persistence is best-effort: the student gets their result either way.
  await recordAttempt({
    subject,
    level,
    score: result.score,
    total: result.total,
    percentage: result.percentage,
    focusTopics: result.focusTopics,
    outcomes: Object.fromEntries(
      result.questions.map((question) => [question.id, question.correct]),
    ),
    gaps: Object.fromEntries(result.gaps.map((gap) => [gap.id, gap.count])),
  });

  return NextResponse.json({ result });
}
