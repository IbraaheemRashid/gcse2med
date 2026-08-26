/**
 * Sample resources shown on /resources. Files live under /public/samples.
 * TODO(client): replace the placeholder previews with real exports of the
 * slides, summary sheets and flashcards.
 */

export type ResourceSample = {
  id: string;
  name: string;
  description: string;
  /** Which tiers include it — matched against content/tiers.ts ids. */
  includedIn: string[];
  /** Path under /public. Left blank until the real file exists. */
  file?: string;
  preview?: string;
};

export const resourceSamples: ResourceSample[] = [
  {
    id: "slides",
    name: "Annotated lesson slides",
    description:
      "The slides from the lesson, with the annotations the tutor made live on them. Students who miss a week are not left guessing what the cohort covered.",
    includedIn: ["essential", "success", "excellence"],
  },
  {
    id: "summary-sheets",
    name: "Topic summary sheets",
    description:
      "One page per topic. Everything the specification asks for, laid out to be revised from rather than read through.",
    includedIn: ["essential", "success", "excellence"],
  },
  {
    id: "checklists",
    name: "Knowledge checklists",
    description:
      "The specification turned into a list a student can honestly RAG-rate. It is also what tells us where to point the next lesson.",
    includedIn: ["essential", "success", "excellence"],
  },
  {
    id: "flashcards",
    name: "Core flashcards",
    description:
      "Spaced-repetition flashcards built from the specification. Every review is logged, so 'they have been revising' becomes a number you can see.",
    includedIn: ["essential", "success", "excellence"],
  },
  {
    id: "past-papers",
    name: "Past paper and question bank",
    description:
      "Questions filtered by topic and by command word, so practice targets the exact thing the student is weak at.",
    includedIn: ["success", "excellence"],
  },
  {
    id: "mocks",
    name: "Monthly mock exams",
    description:
      "Sat under timed conditions and marked with individual written feedback, then fed straight into the mistake bank.",
    includedIn: ["excellence"],
  },
];

/** Shown on /resources to explain what tracking gives parents. */
export const trackingPromise = [
  "Which flashcards a student has actually reviewed, and which they keep getting wrong",
  "Topic-level accuracy that moves as they work, not a single grade at the end of term",
  "Whether a wrong answer was a knowledge, exam or careless gap — and what we did about it",
];
