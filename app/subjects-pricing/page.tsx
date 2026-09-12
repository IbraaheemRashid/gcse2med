import type { Metadata } from "next";
import Link from "next/link";
import { Container, Section, SectionHeading, Badge } from "@/components/ui/Layout";
import { PageHeader } from "@/components/ui/PageHeader";
import { Faqs, FaqJsonLd } from "@/components/ui/Faqs";
import { ButtonLink } from "@/components/ui/Button";
import { BookButton } from "@/components/site/BookButton";
import { PricingExplorer } from "@/components/pricing/PricingExplorer";
import { tiers, inheritsLabel } from "@/content/tiers";
import { subjects, levels, hasAssessment } from "@/content/subjects";
import { pricingFaqs } from "@/content/faqs";

export const metadata: Metadata = {
  title: "Subjects & pricing",
  description:
    "GCSE and A-level Biology, Chemistry, Physics and Maths in groups of 8, 6 or 4. Essential from £59/month, Success from £99, Excellence from £179, with multi-subject and annual savings.",
  alternates: { canonical: "/subjects-pricing" },
};

export default function SubjectsPricingPage() {
  return (
    <>
      <FaqJsonLd items={pricingFaqs} />

      <PageHeader
        eyebrow="Subjects & pricing"
        title="Pick the subjects. Pick how closely we track them."
        lead="Four subjects, two levels, three tiers. The tier decides how small the group is and how much of your child's progress you actually get to see."
      />

      <Section className="bg-white">
        <Container>
          <SectionHeading
            eyebrow="Subjects"
            title="What we teach"
            lead="Every subject is taught at both GCSE and A-level, and our slides and summary sheets are mapped to the board your child sits."
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {subjects.map((subject) => (
              <div
                key={subject.id}
                className="flex flex-col rounded-card border border-ink-200 bg-white p-6 shadow-card"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-xl font-bold">{subject.name}</h3>
                  {subject.levels.map((level) => (
                    <Badge key={level} className={subject.accent}>
                      {levels.find((entry) => entry.id === level)?.shortName}
                    </Badge>
                  ))}
                </div>

                <p className="mt-3 grow text-[15px] leading-relaxed text-ink-600">
                  {subject.blurb}
                </p>

                <p className="mt-4 text-sm text-ink-500">
                  Exam boards: {subject.boards.join(", ")}
                </p>

                <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm">
                  {subject.levels.map((level) =>
                    hasAssessment(subject.id, level) ? (
                      <Link
                        key={level}
                        href={`/assessment?subject=${subject.id}&level=${level}`}
                        className="font-semibold text-brand-700 underline underline-offset-4 hover:text-brand-800"
                      >
                        Free {levels.find((entry) => entry.id === level)?.shortName}{" "}
                        assessment &rarr;
                      </Link>
                    ) : (
                      <span key={level} className="text-ink-500">
                        {levels.find((entry) => entry.id === level)?.shortName}{" "}
                        assessment coming soon
                      </span>
                    ),
                  )}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="pricing" className="bg-ink-50">
        <Container>
          <SectionHeading
            eyebrow="Pricing"
            title="Work out your price"
            lead="Choose how many subjects and how you would like to pay. Multi-subject and annual savings are applied automatically."
          />
          <div className="mt-12">
            <PricingExplorer />
          </div>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container>
          <SectionHeading
            eyebrow="In detail"
            title="What each tier includes"
            lead="Every tier builds on the one before it, so nothing is taken away as you move up."
          />

          <div className="mt-12 space-y-8">
            {tiers.map((tier) => {
              const inherits = inheritsLabel(tier);
              return (
                <div
                  key={tier.id}
                  id={tier.id}
                  className={`scroll-mt-28 rounded-card border bg-white p-7 sm:p-9 ${
                    tier.featured
                      ? "border-brand-300 shadow-lift ring-1 ring-inset ring-brand-300"
                      : "border-ink-200 shadow-card"
                  }`}
                >
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                    <div className="lg:max-w-sm">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-2xl font-bold">{tier.name}</h3>
                        {tier.featured ? (
                          <Badge className="bg-accent-300 text-ink-900 ring-accent-400">
                            Most popular
                          </Badge>
                        ) : !tier.accepting ? (
                          <Badge className="bg-ink-100 text-ink-700 ring-ink-300">
                            Not currently accepting
                          </Badge>
                        ) : null}
                      </div>
                      <p className="mt-3 text-[15px] leading-relaxed text-ink-600">
                        {tier.pitch}
                      </p>
                      <p className="mt-4 text-3xl font-extrabold tracking-tight">
                        £{tier.monthlyFrom}
                        <span className="text-base font-medium text-ink-500">
                          {" "}
                          /month, one subject
                        </span>
                      </p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {tier.accepting ? (
                          <BookButton
                            source={`tier-detail-${tier.id}`}
                            variant={tier.featured ? "primary" : "secondary"}
                          />
                        ) : (
                          <p className="text-[15px] leading-relaxed text-ink-600">
                            <span className="font-semibold text-ink-800">
                              Not currently accepting new students.
                            </span>{" "}
                            <Link
                              href="/contact"
                              className="font-semibold text-brand-700 underline underline-offset-4"
                            >
                              Ask to be told when it reopens
                            </Link>
                            .
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="lg:min-w-0 lg:flex-1">
                      {inherits ? (
                        <p className="mb-4 text-sm font-semibold text-brand-700">
                          {inherits}
                        </p>
                      ) : null}
                      <ul className="grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                        {tier.features.map((feature) => (
                          <li
                            key={feature}
                            className="flex gap-2.5 text-[15px] text-ink-700"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500"
                            />
                            {feature}
                          </li>
                        ))}
                      </ul>

                      {tier.guarantee ? (
                        <p className="mt-5 rounded-lg bg-accent-50 px-4 py-3 text-[15px] font-semibold text-accent-900 ring-1 ring-inset ring-accent-200">
                          {tier.guarantee} &mdash;{" "}
                          <Link
                            href="/guarantee-terms"
                            className="font-semibold underline underline-offset-4"
                          >
                            subject to terms and conditions
                          </Link>
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section className="bg-ink-50">
        <Container>
          <SectionHeading eyebrow="Questions" title="Before you decide" />
          <div className="mt-12">
            <Faqs items={pricingFaqs} />
          </div>

          <div className="mt-12 flex flex-col items-start gap-4 rounded-card bg-brand-600 px-6 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-10">
            <p className="text-xl font-bold text-white">
              Not sure which tier fits? That is exactly what the consultation is for.
            </p>
            <div className="flex shrink-0 flex-wrap gap-3">
              <BookButton source="pricing-footer" variant="inverse" />
              <ButtonLink href="/assessment" variant="onBrand">
                Free assessment
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
