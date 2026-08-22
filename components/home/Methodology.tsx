import Link from "next/link";
import { Container, Section, SectionHeading } from "@/components/ui/Layout";
import { methodology, methodologyClosing } from "@/content/methodology";

export function Methodology() {
  return (
    <Section className="bg-white">
      <Container>
        <SectionHeading
          eyebrow="How we work"
          title="Diagnose. Expose. Take Action. Review."
          lead="Four steps, in that order, for every student. It is the reason we can tell you what your child needs instead of guessing at it."
        />

        <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {methodology.map((step, index) => (
            <li
              key={step.id}
              className="relative rounded-card border border-ink-200 bg-white p-6 shadow-card"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
                {index + 1}
              </span>
              <h3 className="mt-4 text-lg font-bold">{step.step}</h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-ink-600">
                {step.summary}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex flex-col items-start gap-4 rounded-card bg-brand-950 px-6 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <p className="text-xl font-bold text-white sm:text-2xl">
            {methodologyClosing}
          </p>
          <Link
            href="/how-it-works"
            className="shrink-0 text-sm font-semibold text-accent-300 underline-offset-4 hover:underline"
          >
            See what that looks like in a lesson &rarr;
          </Link>
        </div>
      </Container>
    </Section>
  );
}
