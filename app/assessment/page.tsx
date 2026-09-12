import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container, Section, SectionHeading, Badge } from "@/components/ui/Layout";
import { PageHeader } from "@/components/ui/PageHeader";
import { Faqs } from "@/components/ui/Faqs";
import { ButtonLink } from "@/components/ui/Button";
import { subjects, levels, hasAssessment } from "@/content/subjects";
import { assessmentFaqs } from "@/content/faqs";
import { methodology } from "@/content/methodology";

export const metadata: Metadata = {
  title: "Free GCSE & A-level assessment",
  description:
    "A free, self-marking multiple-choice assessment in GCSE and A-level Biology, Chemistry, Physics and Maths. Get a score, every wrong answer explained, and the topics to work on first.",
  alternates: { canonical: "/assessment" },
};

const included = [
  "Your score, and what it actually means",
  "Every question you got wrong, with the correct answer explained",
  "A topic-by-topic breakdown of where the marks went",
  "Whether marks were lost to knowledge, exam technique, or carelessness",
];

export default function AssessmentIndexPage() {
  return (
    <>
      <PageHeader
        eyebrow={`Step 1: ${methodology[0].step}`}
        title="Find out where your child actually stands"
        lead="A short multiple-choice assessment that marks itself. Around ten minutes, completely free, and no account required."
      />

      <Section className="bg-white">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="Choose a subject"
                title="Which assessment would you like to take?"
              />

              <div className="mt-8 space-y-4">
                {subjects.map((subject) => (
                  <div
                    key={subject.id}
                    className="rounded-card border border-ink-200 bg-white p-6 shadow-card"
                  >
                    <h3 className="text-xl font-bold">{subject.name}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-ink-600">
                      {subject.blurb}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-3">
                      {subject.levels.map((level) => {
                        const levelName =
                          levels.find((entry) => entry.id === level)?.name ?? level;

                        return hasAssessment(subject.id, level) ? (
                          <ButtonLink
                            key={level}
                            href={`/assessment/${subject.id}/${level}`}
                          >
                            Start {levelName} &rarr;
                          </ButtonLink>
                        ) : (
                          <Badge
                            key={level}
                            className="bg-ink-100 text-ink-600 ring-ink-200"
                          >
                            {levelName} coming soon
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-6 text-sm text-ink-500">
                More subjects and levels are being written now. If the one you need is
                not here yet,{" "}
                <Link
                  href="/contact"
                  className="font-semibold text-brand-700 underline underline-offset-4"
                >
                  tell us
                </Link>{" "}
                and we will let you know when it goes live.
              </p>
            </div>

            <div>
              <div className="overflow-hidden rounded-card shadow-card ring-1 ring-ink-200">
                <Image
                  src="/images/writing.jpg"
                  alt="A student writing out an answer by hand"
                  width={1800}
                  height={1200}
                  sizes="(min-width: 1024px) 24rem, 100vw"
                  className="h-56 w-full object-cover"
                />
              </div>

              <div className="mt-6 rounded-card bg-ink-50 p-6">
                <h2 className="text-lg font-bold">What you get back</h2>
                <ul className="mt-4 space-y-3">
                  {included.map((item) => (
                    <li key={item} className="flex gap-3 text-[15px] text-ink-700">
                      <span
                        aria-hidden="true"
                        className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent-400"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-ink-50">
        <Container>
          <SectionHeading eyebrow="Questions" title="Before you start" />
          <div className="mt-12">
            <Faqs items={assessmentFaqs} />
          </div>
        </Container>
      </Section>
    </>
  );
}
