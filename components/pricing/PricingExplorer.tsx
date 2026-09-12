"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Layout";
import { ButtonLink } from "@/components/ui/Button";
import { BookButton } from "@/components/site/BookButton";
import { tiers } from "@/content/tiers";
import {
  SUBJECT_COUNTS,
  formatGBP,
  periodSuffix,
  priceFor,
  savingFor,
  type BillingPeriod,
  type SubjectCount,
} from "@/content/pricing";

/**
 * Prices and savings are read from content/pricing.ts on every render, so a
 * price change can never leave a stale "save £X" behind.
 */
export function PricingExplorer() {
  const [period, setPeriod] = useState<BillingPeriod>("monthly");
  const [subjects, setSubjects] = useState<SubjectCount>(1);

  return (
    <div>
      <div className="flex flex-col gap-6 rounded-card border border-ink-200 bg-white p-5 shadow-card sm:flex-row sm:items-end sm:justify-between sm:p-6">
        <Fieldset legend="How many subjects?">
          <div className="flex flex-wrap gap-2">
            {SUBJECT_COUNTS.map((count) => (
              <Choice
                key={count}
                name="subject-count"
                checked={subjects === count}
                onChange={() => setSubjects(count)}
                label={`${count} ${count === 1 ? "subject" : "subjects"}`}
              />
            ))}
          </div>
        </Fieldset>

        <Fieldset legend="Billing">
          <div className="flex flex-wrap gap-2">
            <Choice
              name="billing-period"
              checked={period === "monthly"}
              onChange={() => setPeriod("monthly")}
              label="Monthly"
            />
            <Choice
              name="billing-period"
              checked={period === "annual"}
              onChange={() => setPeriod("annual")}
              label="Annually"
              hint="save more"
            />
          </div>
        </Fieldset>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {tiers.map((tier) => {
          const price = priceFor(tier.id, subjects, period);
          const saving = savingFor(tier.id, subjects, period);

          return (
            <div
              key={tier.id}
              className={`flex flex-col rounded-card border bg-white p-7 ${
                tier.featured
                  ? "border-brand-300 shadow-lift ring-1 ring-inset ring-brand-300"
                  : "border-ink-200 shadow-card"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-xl font-bold">{tier.name}</h3>
                {tier.featured ? (
                  <Badge className="bg-accent-300 text-ink-900 ring-accent-400">
                    Most popular
                  </Badge>
                ) : !tier.accepting ? (
                  <Badge className="bg-ink-100 text-ink-700 ring-ink-300">
                    Not currently accepting
                  </Badge>
                ) : null}
              </div>

              <p className="mt-2 min-h-[3rem] text-[15px] leading-relaxed text-ink-600">
                {tier.pitch}
              </p>

              <p className="mt-5 flex items-baseline gap-1.5">
                <span
                  className="text-4xl font-extrabold tracking-tight text-ink-900"
                  aria-label={`${formatGBP(price)} ${period === "annual" ? "per year" : "per month"}`}
                >
                  {formatGBP(price)}
                </span>
                <span className="text-sm font-medium text-ink-500">
                  {periodSuffix[period]}
                </span>
              </p>

              <p className="mt-1.5 min-h-[1.5rem] text-sm font-semibold text-brand-700">
                {saving ? `Save ${formatGBP(saving.amount)} ${saving.label}` : " "}
              </p>

              <p className="mt-4 rounded-lg bg-brand-50 px-3 py-2 text-sm font-semibold text-brand-800">
                {tier.groupLabel}
              </p>

              <div className="mt-6 grow" />

              <div className="flex flex-col gap-2">
                {/* Static text rather than a disabled button: a disabled
                    control is still announced and still takes a tab stop, so
                    it promises an action that will never happen. */}
                {tier.accepting ? (
                  <BookButton
                    source={`pricing-${tier.id}`}
                    variant={tier.featured ? "primary" : "secondary"}
                    className="w-full"
                  >
                    Book a free consultation
                  </BookButton>
                ) : (
                  <p className="rounded-full bg-ink-100 px-5 py-2.5 text-center text-[15px] font-semibold leading-6 text-ink-600">
                    Closed to new students
                  </p>
                )}
                <ButtonLink
                  href={`#${tier.id}`}
                  variant="ghost"
                  size="sm"
                  className="w-full"
                >
                  Full details
                </ButtonLink>
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-6 text-sm text-ink-500">
        {period === "annual"
          ? "Annual plans are paid up front and cover twelve months of lessons."
          : "Monthly plans roll month to month. Subjects can be added at any point."}
      </p>
    </div>
  );
}

function Fieldset({ legend, children }: { legend: string; children: React.ReactNode }) {
  return (
    <fieldset>
      <legend className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-ink-500">
        {legend}
      </legend>
      {children}
    </fieldset>
  );
}

function Choice({
  name,
  checked,
  onChange,
  label,
  hint,
}: {
  name: string;
  checked: boolean;
  onChange: () => void;
  label: string;
  hint?: string;
}) {
  return (
    <label
      className={`cursor-pointer select-none rounded-full px-5 py-2 text-sm font-semibold leading-5 ring-1 ring-inset transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent-400 ${
        checked
          ? "bg-brand-600 text-white ring-brand-600"
          : "bg-white text-ink-700 ring-ink-300 hover:bg-ink-50"
      }`}
    >
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      {label}
      {hint ? (
        <span className={checked ? "ml-1.5 text-brand-100" : "ml-1.5 text-brand-600"}>
          {hint}
        </span>
      ) : null}
    </label>
  );
}
