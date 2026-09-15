"use client";

import { useState } from "react";
import Link from "next/link";
import { Container, Section, SectionHeading } from "@/components/ui/Layout";
import { BookButton } from "@/components/site/BookButton";
import { tierById, tiers } from "@/content/tiers";
import { SUBJECT_COUNTS, formatGBP, priceFor, savingFor, periodSuffix, type BillingPeriod, type SubjectCount } from "@/content/pricing";

export function TierSummary() {
  const [count, setCount] = useState<SubjectCount>(1);
  const [period, setPeriod] = useState<BillingPeriod>("monthly");
  const saving = savingFor("essential", count, period);
  return (
    <Section id="pricing" className="bg-white">
      <Container>
        <SectionHeading title="The right subjects. The support they need." lead="Maths, Biology, Chemistry and Physics. GCSE and A-level tuition that fits around the school week." align="center" />
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          {["Maths", "Biology", "Chemistry", "Physics"].map((name) => <Link key={name} href={`/subjects-pricing#subject-${name.toLowerCase()}`} className="rounded-full border border-brand-200 px-6 py-3 text-sm font-semibold text-brand-950 transition-colors hover:bg-brand-50">{name} <span aria-hidden="true">↗</span></Link>)}
        </div>
        <div className="mx-auto mt-10 grid max-w-5xl overflow-hidden rounded-3xl bg-brand-50 lg:grid-cols-[1.1fr_1fr]">
          <div className="p-6 sm:p-10">
            <span className="rounded-full bg-accent-300 px-3 py-1 text-xs font-bold text-brand-950">Accepting students</span>
            <h3 className="mt-5 text-3xl font-bold text-brand-950">Essential</h3>
            <p className="mt-3 text-ink-600">A regular lesson. A small group. A clearer way forward.</p>
            <ul className="mt-6 grid gap-3 text-sm text-brand-950">
              {tierById.essential.features.map((feature) => <li key={feature} className="flex gap-3"><span aria-hidden="true" className="text-brand-600">✓</span>{feature}</li>)}
            </ul>
            <Link href="/subjects-pricing#essential" className="mt-6 inline-block text-sm font-semibold text-brand-700 underline underline-offset-4">Explore Essential →</Link>
          </div>
          <div className="border-t border-brand-200 bg-white/60 p-6 sm:p-10 lg:border-l lg:border-t-0">
            <fieldset><legend className="mb-3 text-sm font-semibold text-brand-950">How many subjects?</legend><div className="flex flex-wrap gap-2">{SUBJECT_COUNTS.map((value) => <label key={value} className={`cursor-pointer rounded-full px-4 py-2 text-sm font-semibold ring-1 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-4 has-[:focus-visible]:outline-brand-600 ${count === value ? "bg-brand-950 text-white ring-brand-950" : "bg-white text-brand-950 ring-brand-200"}`}><input className="sr-only" type="radio" name="home-subjects" value={value} checked={count === value} onChange={() => setCount(value)} /><span>{value} {value === 1 ? "subject" : "subjects"}</span></label>)}</div></fieldset>
            <fieldset className="mt-6"><legend className="mb-3 text-sm font-semibold text-brand-950">Choose your billing</legend><div className="flex gap-2">{(["monthly", "annual"] as const).map((value) => <label key={value} className={`cursor-pointer rounded-full px-5 py-2 text-sm font-semibold ring-1 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-4 has-[:focus-visible]:outline-brand-600 ${period === value ? "bg-brand-950 text-white ring-brand-950" : "bg-white text-brand-950 ring-brand-200"}`}><input className="sr-only" type="radio" name="home-billing" value={value} checked={period === value} onChange={() => setPeriod(value)} />{value === "monthly" ? "Monthly" : "Annually"}</label>)}</div></fieldset>
            <div className="mt-8" aria-live="polite" aria-atomic="true"><p className="text-brand-950"><strong className="text-5xl tracking-tight">{formatGBP(priceFor("essential", count, period))}</strong><span className="ml-2 text-ink-600">{periodSuffix[period]}</span></p><p className="mt-2 text-sm text-ink-600">For {count} {count === 1 ? "subject" : "subjects"}</p><p className="mt-3 min-h-6 text-sm font-semibold text-brand-700">{saving ? `Save ${formatGBP(saving.amount)} ${saving.label}` : "Weekly lessons. Resources included."}</p></div>
            <BookButton source="home-essential" size="lg" className="mt-5 w-full">Book a free consultation</BookButton>
            <p className="mt-3 text-xs leading-relaxed text-ink-500">{period === "annual" ? "Paid up front for twelve months of lessons." : "Monthly plans roll month to month."} Start with a free 30-minute video call.</p>
          </div>
        </div>
        <p className="mt-5 text-center text-sm text-ink-500">{tiers.filter((tier) => !tier.accepting).map((tier) => tier.name).join(" & ")} — not currently accepting students.</p>
      </Container>
    </Section>
  );
}
