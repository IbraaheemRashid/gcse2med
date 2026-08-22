/** Client-safe mirrors of the marking result. Kept separate from lib/marking.ts
 *  (which is server-only) so client components can type the API response. */

export type PublicQuestion = {
  id: string;
  topic: string;
  difficulty: "foundation" | "core" | "stretch";
  stem: string;
  options: string[];
};

export type MarkedQuestion = {
  id: string;
  topic: string;
  stem: string;
  options: string[];
  selectedIndex: number | null;
  correctIndex: number;
  correct: boolean;
  explanation: string;
  probes: "knowledge" | "exam" | "careless";
};

export type AssessmentResult = {
  subject: string;
  level: string;
  score: number;
  total: number;
  percentage: number;
  band: string;
  bandDetail: string;
  questions: MarkedQuestion[];
  topics: { topic: string; correct: number; total: number }[];
  focusTopics: string[];
  gaps: { id: string; name: string; summary: string; count: number }[];
};
