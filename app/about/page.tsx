import type { Metadata } from "next";
import Image from "next/image";
import { Container, Section, SectionHeading, Eyebrow } from "@/components/ui/Layout";
import { PageHeader } from "@/components/ui/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { BookButton } from "@/components/site/BookButton";
import { methodologyClosing } from "@/content/methodology";
import { tiers } from "@/content/tiers";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Why GCSE2MED exists: small-group GCSE and A-level tuition built around measuring progress rather than assuring parents that everything is fine.",
  alternates: { canonical: "/about" },
};

/**
 * NOTE(client): the founder story, tutor credentials and safeguarding statement
 * below are the three blocks only you can write — they make factual claims about
 * real people and we will not invent them. Each is marked with a TODO. Everything
 * else on this page is drawn from the brief.
 */
const values = [
  {
    title: "Measure, don't reassure",
    body: "Every student is assessed before they are taught, and re-assessed after. If a parent asks how their child is doing, the answer is a number and a plan, not a feeling.",
  },
  {
    title: "Small enough to be noticed",
    body: "Groups are capped at eight, six or four. A student who goes quiet for two weeks gets picked up, because there is nowhere in a group that size to go quiet.",
  },
  {
    title: "Fix the cause, not the symptom",
    body: "A wrong answer is only useful if you know why it happened. Knowledge, exam technique and carelessness are three different problems and we treat them as such.",
  },
  {
    title: "Say it straight",
    body: "If we are not the right fit for a family, we say so on the first call. If a student is not doing the work, we tell you that too.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title="Built for the students who are trying, and still stuck"
        lead="Most students who miss the grade they wanted were not lazy. They were revising the wrong things, in the wrong way, without anyone measuring whether it was working."
      />

      <Section className="bg-white">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <Eyebrow>Why we exist</Eyebrow>
              {/* TODO(client): replace with the founders' own story — why GCSE2MED
                  was started, and what you saw that made it necessary. */}
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                &ldquo;They&apos;re doing fine&rdquo; is not information
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-ink-600">
                Parents pay for tuition and then spend the year with no real idea
                whether it is working. Reports come back positive, mock results come
                back mixed, and nobody can say which topics are actually the problem.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-ink-600">
                GCSE2MED is built the other way round. We diagnose first, we categorise
                every mistake, and we show you the movement &mdash; topic by topic, week
                by week.
              </p>
              <p className="mt-6 border-l-4 border-accent-400 pl-5 text-xl font-bold text-ink-900">
                {methodologyClosing}
              </p>
            </div>

            <div className="overflow-hidden rounded-card shadow-card ring-1 ring-ink-200">
              <Image
                src="/images/graduation.jpg"
                alt="A graduate in cap and gown facing the ceremony"
                width={1800}
                height={1200}
                sizes="(min-width: 1024px) 32rem, 100vw"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-ink-50">
        <Container>
          <SectionHeading
            eyebrow="What we stand on"
            title="Four things we will not compromise"
            align="center"
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-card border border-ink-200 bg-white p-7 shadow-card"
              >
                <h3 className="text-xl font-bold">{value.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-600">
                  {value.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionHeading eyebrow="Our tutors" title="Who teaches the lessons" />
              {/* TODO(client): tutor credentials — degrees, exam boards examined for,
                  years teaching, subjects. These are factual claims about real people,
                  so they need to come from you. */}
              <p className="mt-5 text-[17px] leading-relaxed text-ink-600">
                Every lesson is taught by a subject specialist who teaches that
                specification at both GCSE and A-level. Full tutor profiles &mdash;
                qualifications, experience and the boards they know best &mdash; are
                published here as the team grows, and we will always tell you who your
                child&apos;s tutor is before you commit.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {tiers.map((tier) => (
                  <div
                    key={tier.id}
                    className="rounded-card border border-ink-200 bg-ink-50 p-5 text-center"
                  >
                    <p className="text-sm font-semibold text-ink-600">{tier.name}</p>
                    <p className="mt-2 text-3xl font-extrabold text-brand-700">
                      {tier.maxGroupSize}
                    </p>
                    <p className="mt-1 text-xs font-medium uppercase tracking-wider text-ink-500">
                      students max
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <SectionHeading eyebrow="Safeguarding" title="Working with under-18s" />
              {/* TODO(client): confirm your actual safeguarding position — DBS checks,
                  designated safeguarding lead, recording policy, parent access to
                  lessons — before this goes live. Parents look for this. */}
              <p className="mt-5 text-[17px] leading-relaxed text-ink-600">
                Most of our students are under eighteen, and we take that seriously.
                Our safeguarding policy, DBS position and the rules around recorded
                lessons and parent access are published in full here before enrolment
                opens, and we are happy to talk through any of it on the consultation
                call.
              </p>

              <div className="mt-8 rounded-card bg-brand-50 p-6">
                <p className="text-[15px] leading-relaxed text-brand-900">
                  Have a question about how lessons run, who teaches them, or how your
                  child&apos;s data is handled? Ask us directly &mdash; we would rather
                  answer it before you enrol than after.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <BookButton source="about-safeguarding" />
                  <ButtonLink href="/contact" variant="secondary">
                    Send a message
                  </ButtonLink>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
