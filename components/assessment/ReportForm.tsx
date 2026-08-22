"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Turnstile } from "@/components/site/Turnstile";

const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

/**
 * Optional email capture, shown BELOW the results — the brief asks for the
 * prompt, not for the results to be held hostage behind it.
 */
export function ReportForm({
  subject,
  level,
  subjectName,
  levelName,
  answers,
}: {
  subject: string;
  level: string;
  subjectName: string;
  levelName: string;
  answers: { questionId: string; selectedIndex: number | null }[];
}) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [token, setToken] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError(null);

    try {
      const response = await fetch("/api/assessment/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject,
          level,
          answers,
          email,
          name: name || undefined,
          marketingConsent,
          turnstileToken: token || undefined,
        }),
      });

      const payload = (await response.json().catch(() => ({}))) as { error?: string };
      if (!response.ok) throw new Error(payload.error ?? "Something went wrong.");

      setStatus("sent");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Something went wrong.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-card border border-emerald-200 bg-emerald-50 p-6">
        <h2 className="text-lg font-bold text-emerald-900">Report on its way</h2>
        <p className="mt-2 text-[15px] leading-relaxed text-emerald-800">
          We have emailed the full {levelName} {subjectName} report to{" "}
          <strong className="font-semibold">{email}</strong>. If it has not arrived in a
          couple of minutes, it is worth checking the junk folder.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-card border border-ink-200 bg-white p-6 shadow-card"
    >
      <h2 className="text-lg font-bold">Email a copy of this report</h2>
      <p className="mt-2 text-[15px] leading-relaxed text-ink-600">
        Optional &mdash; everything is already on this page. Parents usually want a copy
        they can come back to.
      </p>

      <div className="mt-5 space-y-4">
        <Field label="Your name" optional>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            autoComplete="name"
            className={inputClasses}
            placeholder="Sam"
          />
        </Field>

        <Field label="Email address">
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            className={inputClasses}
            placeholder="you@example.com"
          />
        </Field>

        <label className="flex items-start gap-3 text-sm text-ink-600">
          <input
            type="checkbox"
            checked={marketingConsent}
            onChange={(event) => setMarketingConsent(event.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-ink-300 text-brand-600"
          />
          <span>
            Send me occasional revision tips and updates from GCSE2MED. You can
            unsubscribe at any time.
          </span>
        </label>
      </div>

      <Turnstile siteKey={siteKey} onToken={setToken} />

      {error ? (
        <p role="alert" className="mt-4 rounded-lg bg-flag-50 px-3 py-2 text-sm text-flag-800">
          {error}
        </p>
      ) : null}

      <Button type="submit" className="mt-5 w-full" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Email me the report"}
      </Button>

      <p className="mt-3 text-xs leading-relaxed text-ink-500">
        We only use this address to send the report and, if you ticked the box, our
        updates. If the student is under 13, please ask a parent to enter their address.
        See our{" "}
        <Link href="/privacy" className="underline underline-offset-2 hover:text-brand-700">
          privacy policy
        </Link>
        .
      </p>
    </form>
  );
}

const inputClasses =
  "mt-1.5 block w-full rounded-lg border border-ink-300 bg-white px-3.5 py-2.5 text-[15px] text-ink-900 placeholder:text-ink-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200";

function Field({
  label,
  optional,
  children,
}: {
  label: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-ink-800">
        {label}
        {optional ? <span className="ml-1.5 font-normal text-ink-500">optional</span> : null}
      </span>
      {children}
    </label>
  );
}
