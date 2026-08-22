import "server-only";

import { getBank } from "@/content/assessments";
import type { GapId, Question } from "@/content/assessments/types";
import type { LevelId, SubjectId } from "@/content/subjects";
import { gapTypes } from "@/content/methodology";

export type SubmittedAnswer = {
  questionId: string;
  /** null when the student skipped the question. */
  selectedIndex: number | null;
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
  probes: GapId;
};

export type TopicBreakdown = {
  topic: string;
  correct: number;
  total: number;
};

export type GapBreakdown = {
  id: GapId;
  name: string;
  summary: string;
  count: number;
};

export type AssessmentResult = {
  subject: SubjectId;
  level: LevelId;
  score: number;
  total: number;
  percentage: number;
  /** Short human verdict shown above the score. */
  band: string;
  bandDetail: string;
  questions: MarkedQuestion[];
  topics: TopicBreakdown[];
  /** Topics the student did not get full marks on — the "areas to improve". */
  focusTopics: string[];
  /** Which kinds of mistake showed up, most frequent first. */
  gaps: GapBreakdown[];
};

function band(percentage: number): { band: string; bandDetail: string } {
  if (percentage >= 85) {
    return {
      band: "Strong across the board",
      bandDetail:
        "Very little is missing here. The next gains come from exam technique and consistency under timed conditions rather than from more content.",
    };
  }
  if (percentage >= 65) {
    return {
      band: "Solid, with clear gaps",
      bandDetail:
        "The foundations are there. A small number of specific topics are costing marks — which is exactly the situation targeted support fixes fastest.",
    };
  }
  if (percentage >= 40) {
    return {
      band: "Some real gaps to close",
      bandDetail:
        "Enough is in place to build on, but there are topics that need re-teaching rather than revising. Worth acting on now rather than in the spring.",
    };
  }
  return {
    band: "Significant gaps",
    bandDetail:
      "There is meaningful ground to make up. That is very doable with the right plan, but it needs a structured one — not more of the same revision.",
  };
}

/**
 * Marks a submitted attempt against the server-side answer key.
 *
 * Returns `null` when the subject/level pair has no bank, so callers can send a
 * 404 rather than a half-formed result.
 */
export function markAttempt(
  subject: SubjectId,
  level: LevelId,
  answers: SubmittedAnswer[],
): AssessmentResult | null {
  const bank = getBank(subject, level);
  if (!bank) return null;

  const selectedById = new Map(
    answers.map((answer) => [answer.questionId, answer.selectedIndex]),
  );

  const marked: MarkedQuestion[] = bank.questions.map((question: Question) => {
    const raw = selectedById.get(question.id);
    const selectedIndex =
      typeof raw === "number" && raw >= 0 && raw < question.options.length
        ? raw
        : null;

    return {
      id: question.id,
      topic: question.topic,
      stem: question.stem,
      options: question.options,
      selectedIndex,
      correctIndex: question.correctIndex,
      correct: selectedIndex === question.correctIndex,
      explanation: question.explanation,
      probes: question.probes,
    };
  });

  const score = marked.filter((question) => question.correct).length;
  const total = marked.length;
  const percentage = total === 0 ? 0 : Math.round((score / total) * 100);

  const topicMap = new Map<string, TopicBreakdown>();
  for (const question of marked) {
    const entry = topicMap.get(question.topic) ?? {
      topic: question.topic,
      correct: 0,
      total: 0,
    };
    entry.total += 1;
    if (question.correct) entry.correct += 1;
    topicMap.set(question.topic, entry);
  }
  const topics = [...topicMap.values()];

  const gapCounts = new Map<GapId, number>();
  for (const question of marked) {
    if (question.correct) continue;
    gapCounts.set(question.probes, (gapCounts.get(question.probes) ?? 0) + 1);
  }

  const gaps: GapBreakdown[] = gapTypes
    .map((gap) => ({
      id: gap.id,
      name: gap.name,
      summary: gap.summary,
      count: gapCounts.get(gap.id) ?? 0,
    }))
    .filter((gap) => gap.count > 0)
    .sort((a, b) => b.count - a.count);

  return {
    subject,
    level,
    score,
    total,
    percentage,
    ...band(percentage),
    questions: marked,
    topics,
    focusTopics: topics
      .filter((topic) => topic.correct < topic.total)
      .map((topic) => topic.topic),
    gaps,
  };
}
