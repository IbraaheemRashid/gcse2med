/**
 * The three tiers, verbatim from the client brief. Single source of truth for
 * the homepage cards, the pricing page and any comparison table.
 */

export type TierId = "essential" | "success" | "excellence";

export type Tier = {
  id: TierId;
  name: string;
  /** Monthly price for a single subject, in whole pounds. */
  monthlyFrom: number;
  maxGroupSize: number;
  /** Who the tier is for — shown under the name. */
  pitch: string;
  /** Short label for the group-size feature strip. */
  groupLabel: string;
  /** What this tier adds. Earlier tiers are inherited via `inherits`. */
  features: string[];
  inherits: TierId[];
  /**
   * False while the tier is closed to new students. The card still shows the
   * price and everything included — parents should see the ladder they grow
   * into — but the CTA is replaced by a "not currently accepting" note.
   *
   * Required rather than optional so a new tier cannot silently default to
   * open: opening a tier to enrolment should be a deliberate edit here.
   */
  accepting: boolean;
  /**
   * Highlighted as the recommended option in the UI. Only ever set this on a
   * tier that is `accepting` — "Most popular" on something nobody can buy
   * reads as a bug, and it drives the button variant as well as the badge.
   */
  featured?: boolean;
  /** Rendered with a link to /guarantee-terms. */
  guarantee?: string;
};

export const tiers: Tier[] = [
  {
    id: "essential",
    name: "Essential",
    monthlyFrom: 59,
    maxGroupSize: 8,
    pitch: "For students who want support to boost their grade.",
    groupLabel: "Max 8 students per group",
    inherits: [],
    features: [
      "Expert GCSE & A-level tutors",
      "1hr lesson every week",
      "8 students max per group",
      "Annotated lesson slides",
      "Topic summary sheets",
      "Knowledge checklist",
      "Core flashcards",
      "Email support (48hr response)",
    ],
    accepting: true,
    featured: true,
  },
  {
    id: "success",
    name: "Success",
    monthlyFrom: 99,
    maxGroupSize: 6,
    // NOTE(copy): the brief had "striving for grades 7-9" here and "committed to
    // achieving grades 7-9" on Excellence — near-identical, so the tiers did not
    // differentiate on outcome. Reworded to separate them; see the plan's copy flag.
    pitch: "For students pushing from a solid grade into the top bands.",
    groupLabel: "Max 6 students per group",
    inherits: ["essential"],
    features: [
      "6 students max per group",
      "Revision support",
      "Homework",
      "Bank of past papers and questions",
      "Exam technique workshops",
      "Regular student progress reviews",
      "Parent dashboard (to check student progress)",
      "Regular parent meetings (termly)",
      "Exclusive Discord access (24hr response)",
    ],
    accepting: false,
  },
  {
    id: "excellence",
    name: "Excellence",
    monthlyFrom: 179,
    maxGroupSize: 4,
    pitch: "For students committed to grades 7-9, with nothing left to chance.",
    groupLabel: "Max 4 students per group",
    inherits: ["essential", "success"],
    features: [
      "4 students max per group",
      "More frequent student progress reviews (1-to-1)",
      "Personal study timetable, aligned to what the student needs",
      "Monthly mock exams with individual feedback",
      "Future application advice where applicable",
      "WhatsApp support (fastest response)",
    ],
    accepting: false,
    guarantee: "Grade A guarantee",
  },
];

/** The tiers a parent can actually enrol in today. */
export const acceptingTiers = tiers.filter((tier) => tier.accepting);

export const tierById = Object.fromEntries(
  tiers.map((tier) => [tier.id, tier]),
) as Record<TierId, Tier>;

/** "Includes everything in Essential and Success, plus:" */
export function inheritsLabel(tier: Tier): string | null {
  if (tier.inherits.length === 0) return null;
  const names = tier.inherits.map((id) => tierById[id].name);
  const list =
    names.length === 1
      ? names[0]
      : `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
  return `Includes everything in ${list}, plus:`;
}
