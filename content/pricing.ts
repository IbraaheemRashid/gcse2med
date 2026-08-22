import { tierById, type TierId } from "./tiers";

/**
 * Prices come straight from the brief (monthly bundles) and from the annual
 * pricing table embedded in it.
 *
 * Savings are always DERIVED, never written into copy — a price edit here can
 * never leave a stale "save £28" elsewhere on the site.
 */

export type BillingPeriod = "monthly" | "annual";

/** Index 0 = 1 subject, index 3 = 4 subjects. */
export const SUBJECT_COUNTS = [1, 2, 3, 4] as const;
export type SubjectCount = (typeof SUBJECT_COUNTS)[number];

const monthly: Record<TierId, number[]> = {
  essential: [59, 109, 149, 199],
  success: [99, 179, 249, 329],
  excellence: [179, 329, 469, 599],
};

const annual: Record<TierId, number[]> = {
  essential: [659, 1219, 1649, 2199],
  success: [1099, 1999, 2769, 3659],
  excellence: [1999, 3659, 5199, 6699],
};

export function priceFor(
  tier: TierId,
  subjects: SubjectCount,
  period: BillingPeriod,
): number {
  const table = period === "annual" ? annual : monthly;
  return table[tier][subjects - 1];
}

/**
 * Bundle saving against buying each subject on its own at the single-subject
 * monthly rate. Returns 0 for a single subject.
 */
export function bundleSaving(tier: TierId, subjects: SubjectCount): number {
  return subjects * tierById[tier].monthlyFrom - priceFor(tier, subjects, "monthly");
}

/** What paying annually saves against twelve monthly payments. */
export function annualSaving(tier: TierId, subjects: SubjectCount): number {
  return priceFor(tier, subjects, "monthly") * 12 - priceFor(tier, subjects, "annual");
}

/** Saving relevant to the currently selected billing period. */
export function savingFor(
  tier: TierId,
  subjects: SubjectCount,
  period: BillingPeriod,
): { amount: number; label: string } | null {
  if (period === "annual") {
    const amount = annualSaving(tier, subjects);
    return amount > 0 ? { amount, label: "a year vs paying monthly" } : null;
  }
  const amount = bundleSaving(tier, subjects);
  return amount > 0 ? { amount, label: "a month vs single subjects" } : null;
}

export const periodSuffix: Record<BillingPeriod, string> = {
  monthly: "/month",
  annual: "/year",
};

export function formatGBP(amount: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(amount);
}
