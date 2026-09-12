"use client";

import { Container } from "@/components/ui/Layout";
import { ButtonLink } from "@/components/ui/Button";
import { BookButton } from "@/components/site/BookButton";
import { ReportForm } from "./ReportForm";
import type { AssessmentResult } from "./types";

const gapCopy: Record<string, string> = {
  knowledge: "the content wasn't there to recall",
  exam: "the content was there, but the answer didn't earn the marks",
  careless: "marks lost on things already known",
};

export function ResultsPanel({
  result,
  subject,
  level,
  subjectName,
  levelName,
  answers,
}: {
  result: AssessmentResult;
  subject: string;
  level: string;
  subjectName: string;
  levelName: string;
  answers: { questionId: string; selectedIndex: number | null }[];
}) {
  const wrong = result.questions.filter((question) => !question.correct);

  return (
    <>
      <div className="border-b border-ink-200 bg-gradient-to-b from-brand-50 to-white">
        <Container className="py-12 sm:py-16">
          <div className="mx-auto max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-600">
              {levelName} {subjectName} &middot; results
            </p>

            <div className="mt-4 flex flex-wrap items-end gap-x-6 gap-y-2">
              <p className="text-6xl font-extrabold tracking-tight text-brand-700">
                {result.score}
                <span className="text-3xl text-ink-500">/{result.total}</span>
              </p>
              <p className="pb-2 text-2xl font-bold text-ink-800">
                {result.percentage}%
              </p>
            </div>

            <h1 className="mt-5 text-3xl font-extrabold sm:text-4xl">{result.band}</h1>
            <p className="mt-3 text-lg leading-relaxed text-ink-600">
              {result.bandDetail}
            </p>
          </div>
        </Container>
      </div>

      <Container className="py-12 sm:py-16">
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-14">
          <div className="min-w-0">
            <h2 className="text-2xl font-bold">Areas to work on</h2>
            {result.focusTopics.length > 0 ? (
              <ul className="mt-4 flex flex-wrap gap-2">
                {result.focusTopics.map((topic) => (
                  <li
                    key={topic}
                    className="rounded-full bg-flag-50 px-4 py-1.5 text-sm font-semibold text-flag-800 ring-1 ring-inset ring-flag-200"
                  >
                    {topic}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-[15px] leading-relaxed text-ink-600">
                Full marks on every topic here. The next step is doing the same under
                timed exam conditions, on harder questions.
              </p>
            )}

            {result.gaps.length > 0 ? (
              <>
                <h2 className="mt-12 text-2xl font-bold">Why the marks were lost</h2>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-600">
                  Every mistake has a cause, and the cause decides the fix. This is what
                  goes into a student&apos;s mistake bank.
                </p>
                <ul className="mt-5 space-y-3">
                  {result.gaps.map((gap) => (
                    <li
                      key={gap.id}
                      className="flex items-start gap-4 rounded-card border border-ink-200 bg-white p-5"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-50 text-sm font-bold text-brand-700">
                        {gap.count}
                      </span>
                      <span>
                        <span className="block font-bold text-ink-900">{gap.name}</span>
                        <span className="mt-0.5 block text-[15px] text-ink-600">
                          {gapCopy[gap.id] ?? gap.summary}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}

            <h2 className="mt-12 text-2xl font-bold">Topic breakdown</h2>
            <ul className="mt-4 divide-y divide-ink-200 border-y border-ink-200">
              {result.topics.map((topic) => {
                const full = topic.correct === topic.total;
                return (
                  <li
                    key={topic.topic}
                    className="flex items-center justify-between gap-4 py-3"
                  >
                    <span className="text-[15px] text-ink-700">{topic.topic}</span>
                    <span
                      className={`text-sm font-bold tabular-nums ${
                        full ? "text-emerald-700" : "text-flag-700"
                      }`}
                    >
                      {topic.correct} / {topic.total}
                    </span>
                  </li>
                );
              })}
            </ul>

            {wrong.length > 0 ? (
              <>
                <h2 className="mt-12 text-2xl font-bold">
                  Questions to review ({wrong.length})
                </h2>
                <div className="mt-5 space-y-5">
                  {wrong.map((question) => (
                    <article
                      key={question.id}
                      className="rounded-card border border-ink-200 bg-white p-6 shadow-card"
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-500">
                        {question.topic}
                      </p>
                      <p className="mt-2 text-lg font-semibold leading-snug text-ink-900">
                        {question.stem}
                      </p>

                      <dl className="mt-4 space-y-2 text-[15px]">
                        <div className="flex flex-wrap gap-x-2 rounded-lg bg-flag-50 px-3 py-2">
                          <dt className="font-semibold text-flag-800">Your answer:</dt>
                          <dd className="text-flag-900">
                            {question.selectedIndex === null
                              ? "not answered"
                              : question.options[question.selectedIndex]}
                          </dd>
                        </div>
                        <div className="flex flex-wrap gap-x-2 rounded-lg bg-emerald-50 px-3 py-2">
                          <dt className="font-semibold text-emerald-800">
                            Correct answer:
                          </dt>
                          <dd className="text-emerald-900">
                            {question.options[question.correctIndex]}
                          </dd>
                        </div>
                      </dl>

                      <p className="mt-4 text-[15px] leading-relaxed text-ink-600">
                        {question.explanation}
                      </p>
                    </article>
                  ))}
                </div>
              </>
            ) : null}
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <ReportForm
              subject={subject}
              level={level}
              answers={answers}
              subjectName={subjectName}
              levelName={levelName}
            />

            <div className="mt-6 rounded-card bg-brand-950 p-6 text-white">
              <h2 className="text-lg font-bold text-white">
                Talk it through with us
              </h2>
              <p className="mt-2 text-[15px] leading-relaxed text-brand-100">
                Fifteen minutes, free, no obligation. We will go through what this
                result actually means and what we would do about it.
              </p>
              <div className="mt-5">
                <BookButton
                  source="assessment-results"
                  variant="inverse"
                  className="w-full"
                />
              </div>
            </div>

            <div className="mt-6 text-center">
              <ButtonLink href="/assessment" variant="ghost" size="sm">
                Take another subject
              </ButtonLink>
            </div>
          </aside>
        </div>
      </Container>
    </>
  );
}
