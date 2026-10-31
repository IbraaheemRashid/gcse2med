"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Field, checkboxClasses, inputClasses } from "@/components/ui/Field";
import { Turnstile } from "@/components/site/Turnstile";
import { site } from "@/content/site";
import { subjects, levels } from "@/content/subjects";

const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

const options = subjects.flatMap((subject) =>
  subject.levels.map((level) => {
    const levelName = levels.find((entry) => entry.id === level)?.name ?? level;
    return `${levelName} ${subject.name}`;
  }),
);

export function ContactForm({ consultation = false }: { consultation?: boolean }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState("");
  const [emailFallback, setEmailFallback] = useState(`mailto:${site.email}`);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError(null);

    const form = new FormData(event.currentTarget);
    const emailBody = `Name: ${form.get("name")}\nEmail: ${form.get("email")}\nPhone: ${form.get("phone") || "Not provided"}\nSubject: ${form.get("subject") || "Not sure yet"}\n${consultation ? `Preferred day: ${form.get("preferredDate") || "Flexible"}\nPreferred time (UK): ${form.get("preferredTime") || "Flexible"}\n` : ""}${form.get("message") || "Please contact me to arrange a consultation."}`;
    setEmailFallback(`mailto:${site.email}?subject=${encodeURIComponent(consultation ? "Free consultation request" : "Website enquiry")}&body=${encodeURIComponent(emailBody)}`);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(form.get("name") ?? ""),
          email: String(form.get("email") ?? ""),
          phone: String(form.get("phone") ?? "") || undefined,
          subject: String(form.get("subject") ?? "") || undefined,
          message: consultation ? `Consultation request (not confirmed). Preferred date: ${form.get("preferredDate") || "Flexible"}. Preferred time (UK): ${form.get("preferredTime") || "Flexible"}.\n${form.get("message") || "Please contact me to arrange a consultation."}` : String(form.get("message") ?? ""),
          marketingConsent: form.get("marketingConsent") === "on",
          website: String(form.get("website") ?? ""),
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
      <div className="rounded-card border border-emerald-200 bg-emerald-50 p-8">
        <h2 className="text-xl font-bold text-emerald-900">{consultation ? "Consultation request sent" : "Message sent"}</h2>
        <p className="mt-3 text-[15px] leading-relaxed text-emerald-800">
          Thank you — we’ll reply by email. {consultation ? "Your preferred time is a request; we’ll confirm an appointment with you." : "We look forward to hearing more about your child."}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-card border border-ink-200 bg-white p-6 shadow-card sm:p-8"
    >
      {consultation ? <p className="mb-5 text-sm text-ink-600">Choose a preferred day and time, or leave them blank if you’re flexible. Times are UK time. We’ll contact you to confirm availability.</p> : null}
      <div className="grid gap-5 sm:grid-cols-2">
        {consultation ? <><Field label="Preferred day" optional><input type="date" name="preferredDate" min={new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/London" }).format(new Date())} className={inputClasses}/></Field><Field label="Preferred time (UK)" optional><input type="time" name="preferredTime" className={inputClasses}/></Field></> : null}
        <Field label="Your name" className="sm:col-span-1">
          <input name="name" required autoComplete="name" className={inputClasses} />
        </Field>

        <Field label="Email address" className="sm:col-span-1">
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className={inputClasses}
          />
        </Field>

        <Field label="Phone" optional className="sm:col-span-1">
          <input name="phone" type="tel" autoComplete="tel" className={inputClasses} />
        </Field>

        <Field label="Subject of interest" optional className="sm:col-span-1">
          <select name="subject" defaultValue="" className={inputClasses}>
            <option value="">Not sure yet</option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>

        <Field label="How can we help?" className="sm:col-span-2">
          <textarea
            name="message"
            required={!consultation}
            rows={5}
            className={inputClasses}
            placeholder="Which year group is your child in, and what are you finding hardest at the moment?"
          />
        </Field>
      </div>

      {/* Honeypot — hidden from people, irresistible to bots. */}
      <div aria-hidden="true" className="h-0 w-0 overflow-hidden">
        <label>
          Website
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <label className="mt-5 flex items-start gap-3 text-sm text-ink-600">
        <input
          name="marketingConsent"
          type="checkbox"
          className={checkboxClasses}
        />
        <span>
          Send me occasional revision tips and updates from GCSE2MED. You can
          unsubscribe at any time.
        </span>
      </label>

      <Turnstile siteKey={siteKey} onToken={setToken} />

      {error ? (
        <p role="alert" className="mt-4 rounded-lg bg-flag-50 px-3 py-2 text-sm text-flag-800">
          {error} <a className="underline" href={emailFallback}>Open your email app to send these details to {site.email}</a>. Your request has not been sent.
        </p>
      ) : null}

      <Button type="submit" size="lg" className="mt-6" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : consultation ? "Request a consultation" : "Send message"}
      </Button>

      <p className="mt-4 text-xs leading-relaxed text-ink-500">
        We use your details to reply to your enquiry, and for updates only if you opt in. See our{" "}
        <Link href="/privacy" className="underline underline-offset-2 hover:text-brand-700">
          privacy policy
        </Link>
        .
      </p>
    </form>
  );
}

