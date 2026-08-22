import "server-only";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase client using the service role key.
 *
 * Everything is optional: with no credentials configured the app still runs and
 * every write becomes a no-op that logs. That keeps local development and the
 * first deploy working before the project exists, and means a Supabase outage
 * degrades lead capture rather than breaking the assessment.
 */
let cached: SupabaseClient | null | undefined;

export function getSupabase(): SupabaseClient | null {
  if (cached !== undefined) return cached;

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[supabase] SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY not set — persistence disabled.",
      );
    }
    cached = null;
    return cached;
  }

  cached = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}

export type LeadSource =
  | "assessment"
  | "contact"
  | "consultation"
  | "resources";

export type LeadInput = {
  email: string;
  name?: string | null;
  phone?: string | null;
  source: LeadSource;
  message?: string | null;
  /** Whether the person ticked the marketing consent box. */
  marketingConsent?: boolean;
  metadata?: Record<string, unknown>;
};

export async function recordLead(lead: LeadInput): Promise<void> {
  const supabase = getSupabase();
  if (!supabase) return;

  const { error } = await supabase.from("leads").insert({
    email: lead.email.toLowerCase().trim(),
    name: lead.name ?? null,
    phone: lead.phone ?? null,
    source: lead.source,
    message: lead.message ?? null,
    marketing_consent: lead.marketingConsent ?? false,
    metadata: lead.metadata ?? {},
  });

  // A failed lead write must never fail the user's request — they still get
  // their result or their confirmation. Log loudly instead.
  if (error) console.error("[supabase] recordLead failed:", error.message);
}

export type AttemptInput = {
  subject: string;
  level: string;
  score: number;
  total: number;
  percentage: number;
  focusTopics: string[];
  /** questionId -> whether it was answered correctly */
  outcomes: Record<string, boolean>;
  gaps: Record<string, number>;
  email?: string | null;
};

/** Returns the stored row id, or null when persistence is off or failed. */
export async function recordAttempt(attempt: AttemptInput): Promise<string | null> {
  const supabase = getSupabase();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("assessment_attempts")
    .insert({
      subject: attempt.subject,
      level: attempt.level,
      score: attempt.score,
      total: attempt.total,
      percentage: attempt.percentage,
      focus_topics: attempt.focusTopics,
      outcomes: attempt.outcomes,
      gaps: attempt.gaps,
      email: attempt.email ? attempt.email.toLowerCase().trim() : null,
    })
    .select("id")
    .single();

  if (error) {
    console.error("[supabase] recordAttempt failed:", error.message);
    return null;
  }
  return data?.id ?? null;
}

/** Attaches an email to an attempt after the fact, when the report is requested. */
export async function attachEmailToAttempt(
  attemptId: string,
  email: string,
): Promise<void> {
  const supabase = getSupabase();
  if (!supabase) return;

  const { error } = await supabase
    .from("assessment_attempts")
    .update({ email: email.toLowerCase().trim() })
    .eq("id", attemptId);

  if (error) console.error("[supabase] attachEmailToAttempt failed:", error.message);
}
