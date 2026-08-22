import type { QuestionBank } from "./types";

/** PLACEHOLDER BANK — see biology-gcse.ts. Replace `questions` with the real set. */
export const bank: QuestionBank = {
  subject: "maths",
  level: "gcse",
  intro:
    "Six questions across ratio, algebra, percentages, angles, negatives and expanding brackets.",
  questions: [
    {
      id: "maths-g-1",
      topic: "Ratio and proportion",
      difficulty: "foundation",
      stem: "Write the ratio 24 : 36 in its simplest form.",
      options: [
        "12 : 18",
        "4 : 6",
        "3 : 2",
        "2 : 3",
      ],
      correctIndex: 3,
      explanation:
        "Divide both parts by the highest common factor, 12, to get 2 : 3. Stopping at 4 : 6 or 12 : 18 means the ratio has been simplified but not fully — and 'simplest form' means fully.",
      probes: "exam",
    },
    {
      id: "maths-g-2",
      topic: "Algebra",
      difficulty: "foundation",
      stem: "Solve 3x + 7 = 22.",
      options: [
        "x = 3",
        "x = 5",
        "x = 7",
        "x = 9",
      ],
      correctIndex: 1,
      explanation: "Subtract 7 from both sides to get 3x = 15, then divide by 3 to get x = 5.",
      probes: "knowledge",
    },
    {
      id: "maths-g-3",
      topic: "Percentages",
      difficulty: "core",
      stem: "A jacket costs £80 and is reduced by 15% in a sale. What is the sale price?",
      options: [
        "£12",
        "£65",
        "£68",
        "£92",
      ],
      correctIndex: 2,
      explanation:
        "15% of £80 is £12, so the sale price is £80 − £12 = £68. Answering £12 means the discount was found but not subtracted — the question asked for the price, not the reduction.",
      probes: "exam",
    },
    {
      id: "maths-g-4",
      topic: "Angles",
      difficulty: "core",
      stem: "What is the size of each interior angle of a regular pentagon?",
      options: [
        "72°",
        "108°",
        "120°",
        "540°",
      ],
      correctIndex: 1,
      explanation:
        "The exterior angles sum to 360°, so each is 360 ÷ 5 = 72°, and each interior angle is 180 − 72 = 108°. 540° is the sum of all five interior angles, not one of them.",
      probes: "exam",
    },
    {
      id: "maths-g-5",
      topic: "Negative numbers",
      difficulty: "foundation",
      stem: "Work out −3 − (−8).",
      options: [
        "−11",
        "−5",
        "5",
        "11",
      ],
      correctIndex: 2,
      explanation:
        "Subtracting a negative is the same as adding: −3 + 8 = 5. Getting −11 means both signs were treated as subtractions — a classic careless mark.",
      probes: "careless",
    },
    {
      id: "maths-g-6",
      topic: "Expanding brackets",
      difficulty: "stretch",
      stem: "Expand and simplify (x + 3)(x − 5).",
      options: [
        "x² − 2x − 15",
        "x² − 15",
        "x² + 2x − 15",
        "x² − 8x − 15",
      ],
      correctIndex: 0,
      explanation:
        "x² − 5x + 3x − 15 = x² − 2x − 15. Forgetting the middle terms gives x² − 15; adding the x terms instead of combining their signs gives x² + 2x − 15.",
      probes: "knowledge",
    },
  ],
};
