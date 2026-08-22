import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBank } from "@/content/assessments";
import { toPublicQuestion } from "@/content/assessments/types";
import {
  levelById,
  subjectById,
  subjects,
  type LevelId,
  type SubjectId,
} from "@/content/subjects";
import { QuizRunner } from "@/components/assessment/QuizRunner";

/** One page per bank, prerendered at build time. */
export function generateStaticParams() {
  return subjects.flatMap((subject) =>
    subject.assessmentLevels.map((level) => ({ subject: subject.id, level })),
  );
}

/** Anything not in generateStaticParams is a 404, not an on-demand render. */
export const dynamicParams = false;

function parseParams(subject: string, level: string) {
  const subjectEntry = subjects.find((entry) => entry.id === subject);
  if (!subjectEntry) return null;
  if (!subjectEntry.assessmentLevels.includes(level as LevelId)) return null;
  return { subject: subject as SubjectId, level: level as LevelId };
}

export async function generateMetadata(
  props: PageProps<"/assessment/[subject]/[level]">,
): Promise<Metadata> {
  const { subject, level } = await props.params;
  const parsed = parseParams(subject, level);
  if (!parsed) return {};

  const subjectName = subjectById[parsed.subject].name;
  const levelName = levelById[parsed.level].name;

  return {
    title: `Free ${levelName} ${subjectName} assessment`,
    description: `A free, self-marking ${levelName} ${subjectName} assessment. Get your score, every wrong answer explained, and the topics to focus on next.`,
    alternates: { canonical: `/assessment/${parsed.subject}/${parsed.level}` },
  };
}

export default async function AssessmentPage(
  props: PageProps<"/assessment/[subject]/[level]">,
) {
  const { subject, level } = await props.params;
  const parsed = parseParams(subject, level);
  if (!parsed) notFound();

  const bank = getBank(parsed.subject, parsed.level);
  if (!bank) notFound();

  // toPublicQuestion strips correctIndex and explanation — this is what keeps
  // the answer key out of the RSC payload and off the wire.
  const questions = bank.questions.map(toPublicQuestion);

  return (
    <QuizRunner
      subject={parsed.subject}
      level={parsed.level}
      subjectName={subjectById[parsed.subject].name}
      levelName={levelById[parsed.level].name}
      intro={bank.intro}
      questions={questions}
    />
  );
}
