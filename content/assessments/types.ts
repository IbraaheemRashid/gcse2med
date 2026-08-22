import type { LevelId, SubjectId } from "../subjects";

/**
 * Which kind of mistake a question is designed to catch. This is the seam the
 * Mistake Bank plugs into later — tag questions properly now and the Phase 2
 * work is a join, not a re-tagging exercise.
 */
export type GapId = "knowledge" | "exam" | "careless";

export type Question = {
  /** Stable within a bank; used as the key in stored attempts. */
  id: string;
  /** Free text, but keep it consistent within a bank — it drives the
   *  "areas to improve" grouping on the results screen. */
  topic: string;
  difficulty: "foundation" | "core" | "stretch";
  stem: string;
  options: string[];
  /** Index into `options`. NEVER sent to the browser before submission. */
  correctIndex: number;
  /** Shown in the results review. Also never sent early. */
  explanation: string;
  probes: GapId;
};

export type QuestionBank = {
  subject: SubjectId;
  level: LevelId;
  /** One line shown above the quiz. */
  intro: string;
  questions: Question[];
};

/** The safe projection sent to the browser — no answer, no explanation. */
export type PublicQuestion = {
  id: string;
  topic: string;
  difficulty: Question["difficulty"];
  stem: string;
  options: string[];
};

export function toPublicQuestion(question: Question): PublicQuestion {
  return {
    id: question.id,
    topic: question.topic,
    difficulty: question.difficulty,
    stem: question.stem,
    options: question.options,
  };
}
