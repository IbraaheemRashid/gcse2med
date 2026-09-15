import Link from "next/link";
import { Container, Section, SectionHeading } from "@/components/ui/Layout";
import { methodology, methodologyClosing } from "@/content/methodology";

export function Methodology() {
  return (
    <Section className="bg-white">
      <Container>
        <SectionHeading
          eyebrow="How we work"
          title="A clear plan, from the first lesson."
          lead="Four steps, in that order, for every student. It is the reason we can tell you what your child needs instead of guessing at it."
        />

        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {methodology.map((step, index) => (
            <li
              key={step.id}
              className="relative border-t-2 border-brand-200 py-6"
            >
              <span className="text-4xl font-bold text-brand-200">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-lg font-bold">{step.step}</h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-ink-600">
                {step.summary}
              </p>
              {step.note ? (
                <p className="mt-3 border-t border-ink-200 pt-3 text-sm leading-relaxed text-ink-500">
                  {step.note}
                </p>
              ) : null}
            </li>
          ))}
        </ol>

        <div className="mt-12 flex flex-col items-start gap-4 rounded-card bg-brand-950 px-6 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-10">
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
