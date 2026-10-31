"use client";

import { useSyncExternalStore } from "react";
import { Container } from "@/components/ui/Layout";
import { examCountdown, examDate } from "@/lib/exam-countdown";

function subscribe(onChange: () => void) {
  const timer = window.setInterval(onChange, 1000);
  return () => window.clearInterval(timer);
}
const getSnapshot = () => Math.floor(Date.now() / 1000) * 1000;
const getServerSnapshot = () => null;

export function ExamCountdown() {
  const now = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const remaining = now === null ? null : examCountdown(now);
  const started = now !== null && now >= examDate;
  return <section aria-labelledby="exam-countdown-title" className="bg-brand-50 py-8 sm:py-10">
    <Container>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold text-brand-700">Every revision session counts</p>
          <h2 id="exam-countdown-title" className="mt-2 text-2xl font-bold text-brand-950">{started ? "Exam season is here. You’ve got this." : "The countdown to your first exam"}</h2>
          <p className="mt-2 text-sm text-ink-600">10 May 2027 · Check your school timetable for your subjects and start times.</p>
        </div>
        {!started && <div role="timer" aria-label="Time until 10 May 2027, midnight UK time" aria-live="off" className="grid grid-cols-5 gap-1.5 sm:gap-3">
          {(["months", "days", "hours", "minutes", "seconds"] as const).map(unit => <div key={unit} className="min-w-0 rounded-xl bg-white px-1.5 py-3 text-center ring-1 ring-brand-100 sm:min-w-16 sm:px-3">
            <span className="block text-2xl font-bold tabular-nums text-brand-900 sm:text-3xl">{remaining ? String(remaining[unit]).padStart(2, "0") : "–"}</span>
            <span className="mt-1 block text-[10px] font-semibold capitalize text-ink-600 sm:text-xs">{unit}</span>
          </div>)}
        </div>}
      </div>
    </Container>
  </section>;
}
