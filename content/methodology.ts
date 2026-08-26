/** "How we roll here at GCSE2MED" — Diagnose → Expose → Action → Review. */

export type MethodStep = {
  id: string;
  step: string;
  /** The one-liner from the brief. */
  summary: string;
  /** Longer explanation, used on /how-it-works. */
  detail: string;
  /** Optional extra line, rendered under the summary on the homepage card. */
  note?: string;
};

export const methodology: MethodStep[] = [
  {
    id: "diagnose",
    step: "Diagnose",
    summary: "Know where they stand",
    detail:
      "Every student starts with an assessment, not an assumption. We establish the actual starting point — topic by topic — so nobody spends a term revising what they already know.",
  },
  {
    id: "expose",
    step: "Expose",
    summary: "Find what's holding them back",
    note: "Identify knowledge gaps, misconceptions and the mistakes costing them marks.",
    detail:
      "We identify knowledge gaps, misconceptions and the mistakes costing them marks. A wrong answer is a symptom, so we work out the cause: missing knowledge, weak exam technique, or careless marks thrown away. Three very different problems, three very different fixes.",
  },
  {
    id: "action",
    step: "Action",
    summary: "Target what they need",
    detail:
      "Lessons, flashcards, homework and past-paper practice are pointed at the specific gaps we found — not at a generic scheme of work that treats every student in the room the same.",
  },
  {
    id: "review",
    step: "Review",
    summary: "Measure their progress",
    detail:
      "We re-test, and we show you the numbers. You see what has moved, what hasn't, and what we're doing about it — instead of being told your child is 'doing well'.",
  },
];

export const methodologyClosing = "We don't guess what you need. We measure it.";

/** The three error types behind the Mistake Bank. */
export type GapType = {
  id: "knowledge" | "exam" | "careless";
  name: string;
  summary: string;
  detail: string;
  fix: string;
};

export const gapTypes: GapType[] = [
  {
    id: "knowledge",
    name: "Knowledge gap",
    summary: "They didn't know the content",
    detail:
      "The information wasn't there to recall. Common early in a topic, and the easiest gap to close once it is actually identified.",
    fix: "Targeted flashcards and a re-teach of the specific point — then re-tested.",
  },
  {
    id: "exam",
    name: "Exam gap",
    summary: "Poor technique, or couldn't apply what they knew",
    detail:
      "They knew the content but the answer didn't earn the marks — the wrong command word, no working shown, or an application question they couldn't get into.",
    fix: "Mark-scheme drills and exam technique workshops on that exact question type.",
  },
  {
    id: "careless",
    name: "Careless gap",
    summary: "Knew it, and still lost easy marks",
    detail:
      "Units dropped, a sign flipped, a question misread. The most frustrating marks to lose and the ones most likely to be dismissed as 'silly'.",
    fix: "A personal checklist of their own repeat slips, drilled until the habit changes.",
  },
];

export const mistakeBankTagline = "Never lose a mark twice";
export const mistakeBankClosing =
  "Other tutors will tell you what you got wrong. We make sure you don't get it wrong again.";
