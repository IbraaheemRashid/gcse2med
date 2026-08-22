/**
 * Subjects and levels we teach. `assessmentSlug` links a subject/level pair to a
 * question bank in `content/assessments/` — pairs without one render as
 * "assessment coming soon" rather than 404ing.
 */

export type LevelId = "gcse" | "a-level";
export type SubjectId = "biology" | "chemistry" | "physics" | "maths";

export const levels: { id: LevelId; name: string; shortName: string }[] = [
  { id: "gcse", name: "GCSE", shortName: "GCSE" },
  { id: "a-level", name: "A-level", shortName: "A-level" },
];

export type Subject = {
  id: SubjectId;
  name: string;
  blurb: string;
  /** Exam boards our resources are mapped to. */
  boards: string[];
  /** Levels we currently teach this subject at. */
  levels: LevelId[];
  /** Levels with a live assessment. Everything else shows "coming soon". */
  assessmentLevels: LevelId[];
  /** Tailwind classes for the subject chip. */
  accent: string;
};

export const subjects: Subject[] = [
  {
    id: "biology",
    name: "Biology",
    blurb:
      "The subject students most often lose marks on for the wrong reason — recall is fine, but the answer never quite says what the mark scheme wants.",
    boards: ["AQA", "Edexcel", "OCR"],
    levels: ["gcse", "a-level"],
    assessmentLevels: ["gcse", "a-level"],
    accent: "bg-emerald-50 text-emerald-800 ring-emerald-200",
  },
  {
    id: "chemistry",
    name: "Chemistry",
    blurb:
      "Moles, equations and required practicals, taught until the method is automatic and the calculation stops being the scary part.",
    boards: ["AQA", "Edexcel", "OCR"],
    levels: ["gcse", "a-level"],
    assessmentLevels: ["gcse", "a-level"],
    accent: "bg-brand-50 text-brand-800 ring-brand-200",
  },
  {
    id: "physics",
    name: "Physics",
    blurb:
      "Equation selection, unit conversion and the long-answer questions that separate a grade 6 from a grade 8.",
    boards: ["AQA", "Edexcel", "OCR"],
    levels: ["gcse", "a-level"],
    assessmentLevels: ["gcse"],
    accent: "bg-violet-50 text-violet-800 ring-violet-200",
  },
  {
    id: "maths",
    name: "Maths",
    blurb:
      "From securing the foundations to the multi-step problem solving that carries the top grades.",
    boards: ["AQA", "Edexcel", "OCR"],
    levels: ["gcse", "a-level"],
    assessmentLevels: ["gcse"],
    accent: "bg-accent-50 text-accent-800 ring-accent-200",
  },
];

export const subjectById = Object.fromEntries(
  subjects.map((subject) => [subject.id, subject]),
) as Record<SubjectId, Subject>;

export const levelById = Object.fromEntries(
  levels.map((level) => [level.id, level]),
) as Record<LevelId, (typeof levels)[number]>;

/** Stable key used for assessment banks, URLs and analytics. */
export function assessmentKey(subject: SubjectId, level: LevelId): string {
  return `${subject}-${level}`;
}

export function hasAssessment(subject: SubjectId, level: LevelId): boolean {
  return subjectById[subject].assessmentLevels.includes(level);
}
