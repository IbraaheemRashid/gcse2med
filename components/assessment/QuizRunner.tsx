"use client";

import { useCallback, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { Container } from "@/components/ui/Layout";
import { Button, ButtonLink } from "@/components/ui/Button";
import { ResultsPanel } from "./ResultsPanel";
import {
  clearAttempt,
  getServerSnapshot,
  getSnapshot,
  parseSavedAttempt,
  saveAttempt,
  subscribe,
  type SavedAttempt,
} from "./savedAttempt";
import type { AssessmentResult, PublicQuestion } from "./types";

type Props = {
  subject: string;
  level: string;
  subjectName: string;
  levelName: string;
  intro: string;
  questions: PublicQuestion[];
};

type Answers = Record<string, number | null>;

type Stage = "quiz" | "submitting" | "results";

export function QuizRunner({
  subject,
  level,
  subjectName,
  levelName,
  intro,
  questions,
}: Props) {
  const storageKey = `gcse2med:attempt:${subject}-${level}`;

  // Anything the student has done in THIS render pass. Null until they touch
  // something, at which point it takes over from the restored attempt.
  const [draft, setDraft] = useState<SavedAttempt | null>(null);
  const [stage, setStage] = useState<Stage>("quiz");
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const savedRaw = useSyncExternalStore(
    subscribe,
    () => getSnapshot(storageKey),
    getServerSnapshot,
  );
  const saved = useMemo(
    () => parseSavedAttempt(savedRaw, questions.length),
    [savedRaw, questions.length],
  );

  const answers: Answers = draft?.answers ?? saved.answers;
  const index = draft?.index ?? saved.index;

  const update = useCallback(
    (next: Partial<SavedAttempt>) => {
      setDraft((current) => {
        const base = current ?? saved;
        return { answers: next.answers ?? base.answers, index: next.index ?? base.index };
      });
    },
    [saved],
  );

  // Persist as they go. Guarding on `draft` matters: on the hydration render
  // `saved` is still the empty server snapshot, so writing unconditionally here
  // would overwrite a real saved attempt with {} before it is ever read back.
  // There is nothing worth saving until the student has actually changed
  // something, and `draft` is exactly that signal.
  useEffect(() => {
    if (stage !== "quiz" || draft === null) return;
    saveAttempt(storageKey, draft);
  }, [draft, stage, storageKey]);

  const question = questions[index];
  const answeredCount = questions.filter(
    (item) => typeof answers[item.id] === "number",
  ).length;
  const isLast = index === questions.length - 1;

  const submit = useCallback(async () => {
    setStage("submitting");
    setError(null);
    try {
      const response = await fetch("/api/assessment/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject,
          level,
          answers: questions.map((item) => ({
            questionId: item.id,
            selectedIndex: answers[item.id] ?? null,
          })),
        }),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => ({}))) as { error?: string };
        throw new Error(payload.error ?? "Something went wrong marking your answers.");
      }

      const payload = (await response.json()) as { result: AssessmentResult };
      setResult(payload.result);
      setStage("results");
      clearAttempt(storageKey);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (caught) {
      setError(
        caught instanceof Error ? caught.message : "Something went wrong. Please try again.",
      );
      setStage("quiz");
    }
  }, [answers, level, questions, storageKey, subject]);

  if (stage === "results" && result) {
    return (
      <ResultsPanel
        result={result}
        subject={subject}
        level={level}
        subjectName={subjectName}
        levelName={levelName}
        answers={questions.map((item) => ({
          questionId: item.id,
          selectedIndex: answers[item.id] ?? null,
        }))}
      />
    );
  }

  return (
    <Container className="py-12 sm:py-16">
      <div className="mx-auto max-w-2xl">
        <div className="flex items-center justify-between gap-4 text-sm font-medium text-ink-600">
          <p>
            {levelName} {subjectName}
          </p>
          <p aria-live="polite">
            Question {index + 1} of {questions.length}
          </p>
        </div>

        <div
          className="mt-3 h-2 overflow-hidden rounded-full bg-ink-200"
          role="progressbar"
          aria-valuenow={answeredCount}
          aria-valuemin={0}
          aria-valuemax={questions.length}
          aria-label="Questions answered"
        >
          <div
            className="h-full rounded-full bg-brand-600 transition-[width] duration-300"
            style={{ width: `${(answeredCount / questions.length) * 100}%` }}
          />
        </div>

        {index === 0 ? (
          <p className="mt-6 rounded-lg bg-brand-50 px-4 py-3 text-sm text-brand-900">
            {intro} There is no time limit, and a wrong answer here is useful &mdash;
            it is exactly what we are looking for.
          </p>
        ) : null}

        <fieldset className="mt-8">
          <legend className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-600">
            {question.topic}
          </legend>
          <p className="mt-3 text-xl font-semibold leading-snug text-ink-900 sm:text-2xl">
            {question.stem}
          </p>

          <div className="mt-6 space-y-3">
            {question.options.map((option, optionIndex) => {
              const checked = answers[question.id] === optionIndex;
              return (
                <label
                  key={option}
                  className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 text-[15px] transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent-400 ${
                    checked
                      ? "border-brand-500 bg-brand-50 ring-1 ring-brand-300"
                      : "border-ink-200 bg-white hover:border-ink-300 hover:bg-ink-50"
                  }`}
                >
                  <input
                    type="radio"
                    name={question.id}
                    checked={checked}
                    onChange={() =>
                      update({ answers: { ...answers, [question.id]: optionIndex } })
                    }
                    className="sr-only"
                  />
                  <span
                    aria-hidden="true"
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                      checked ? "border-brand-600 bg-brand-600" : "border-ink-300"
                    }`}
                  >
                    {checked ? <span className="h-1.5 w-1.5 rounded-full bg-white" /> : null}
                  </span>
                  <span className="text-ink-800">{option}</span>
                </label>
              );
            })}
          </div>
        </fieldset>

        {error ? (
          <p role="alert" className="mt-6 rounded-lg bg-flag-50 px-4 py-3 text-sm text-flag-800">
            {error}
          </p>
        ) : null}

        <div className="mt-8 flex items-center justify-between gap-4">
          <Button
            variant="ghost"
            onClick={() => update({ index: Math.max(0, index - 1) })}
            disabled={index === 0}
          >
            &larr; Back
          </Button>

          {isLast ? (
            <Button onClick={submit} size="lg" disabled={stage === "submitting"}>
              {stage === "submitting" ? "Marking…" : "See my results"}
            </Button>
          ) : (
            <Button onClick={() => update({ index: index + 1 })} size="lg">
              Next &rarr;
            </Button>
          )}
        </div>

        {answeredCount < questions.length && isLast ? (
          <p className="mt-4 text-center text-sm text-ink-500">
            {questions.length - answeredCount} question
            {questions.length - answeredCount === 1 ? "" : "s"} unanswered &mdash; you can
            still submit, they will simply be marked as incorrect.
          </p>
        ) : null}

        <p className="mt-10 text-center text-sm text-ink-500">
          Changed your mind?{" "}
          <ButtonLink href="/assessment" variant="ghost" size="sm">
            Pick a different subject
          </ButtonLink>
        </p>
      </div>
    </Container>
  );
}
