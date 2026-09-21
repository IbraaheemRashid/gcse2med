import type { Metadata } from "next";
import Image from "next/image";
import { Container, Section, SectionHeading, Eyebrow } from "@/components/ui/Layout";
import { PageHeader } from "@/components/ui/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { VerticalVideo } from "@/components/ui/VerticalVideo";
import { BookButton } from "@/components/site/BookButton";
import { methodology, methodologyClosing, gapTypes } from "@/content/methodology";
import { tiers } from "@/content/tiers";
import { lessonVideo } from "@/content/video";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "Diagnose, Expose, Action, Review — the four steps behind every GCSE2MED student's plan, and how small-group lessons of 8, 6 or 4 make them possible.",
  alternates: { canonical: "/how-it-works" },
};

export default function HowItWorksPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our method"
        title="We don't guess what your child needs. We measure it."
        lead="Four steps, run in order, for every student. It is what lets us tell you precisely what is costing marks instead of reassuring you that everything is going fine."
      >
        <div className="flex flex-wrap gap-3">
          <BookButton source="how-it-works-header" size="lg" />
          <ButtonLink href="/assessment" variant="accent" size="lg">
            Start with the free assessment
          </ButtonLink>
        </div>
      </PageHeader>

      <Section className="bg-white">
        <Container>
          <ol className="space-y-12">
            {methodology.map((step, index) => (
              <li
                key={step.id}
                className="grid gap-6 border-b border-ink-200 pb-12 last:border-0 last:pb-0 lg:grid-cols-[auto_1fr] lg:gap-10"
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-600 text-xl font-extrabold text-white">
                  {index + 1}
                </span>
                <div>
                  <h2 className="text-2xl font-bold sm:text-3xl">{step.step}</h2>
                  <p className="mt-1 text-lg font-semibold text-brand-700">
                    {step.summary}
                  </p>
                  <p className="mt-4 max-w-3xl text-[17px] leading-relaxed text-ink-600">
                    {step.detail}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <p className="mt-14 rounded-card bg-brand-950 px-6 py-8 text-center text-2xl font-bold text-white sm:px-10 sm:text-3xl">
            {methodologyClosing}
          </p>
        </Container>
      </Section>

      {/* The payoff for "See what that looks like in a lesson" on the homepage,
          which has always linked here. Click-to-play rather than autoplay: it
          runs a minute and a half and deserves sound, so starting it should be
          the visitor's decision. */}
      <Section className="bg-ink-50">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[auto_1fr] lg:gap-16">
            <VerticalVideo video={lessonVideo} mode="click" />

            <div>
              <Eyebrow>Watch a lesson</Eyebrow>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                This is what the teaching actually looks like
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-ink-600">
                {lessonVideo.summary}
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-ink-600">
                Nothing here is staged for a prospectus. It is the same working, at
                the same pace, with the same checking that the student has followed
                it, that happens in a lesson your child would sit in.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <Eyebrow>In the lesson</Eyebrow>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                The lesson is shared. The learning journey isn&apos;t.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-ink-600">
                Everyone in the group covers the same topic in the same hour. What
                differs is what each student is asked, which questions they are set
                afterwards, and which flashcards land in their deck that week.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-ink-600">
                That is only possible because the groups are small enough for a tutor to
                hold every student in their head at once.
              </p>

              <dl className="mt-8 grid gap-4 sm:grid-cols-3">
                {tiers.map((tier) => (
                  <div
                    key={tier.id}
                    className="rounded-card border border-ink-200 bg-white p-5 text-center"
                  >
                    <dt className="text-sm font-semibold text-ink-600">{tier.name}</dt>
                    <dd className="mt-2 text-4xl font-extrabold tracking-tight text-brand-700">
                      {tier.maxGroupSize}
                    </dd>
                    <dd className="mt-1 text-xs font-medium uppercase tracking-wider text-ink-500">
                      students max
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="overflow-hidden rounded-card shadow-card ring-1 ring-ink-200">
              <Image
                src="/images/library.jpg"
                alt="Curved shelves of a library"
                width={1800}
                height={1201}
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
            eyebrow="Step 2, in practice"
            title="Three kinds of mistake, three different fixes"
            lead="This is the part most tuition skips. Telling a student they got a question wrong is not feedback — telling them why is."
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {gapTypes.map((gap) => (
              <div
                key={gap.id}
                className="flex flex-col rounded-card border border-ink-200 bg-white p-6 shadow-card"
              >
                <h3 className="text-xl font-bold">{gap.name}</h3>
                <p className="mt-1 text-sm font-semibold text-brand-700">{gap.summary}</p>
                <p className="mt-4 grow text-[15px] leading-relaxed text-ink-600">
                  {gap.detail}
                </p>
                <p className="mt-5 rounded-lg bg-accent-50 px-4 py-3 text-[15px] font-medium text-accent-900 ring-1 ring-inset ring-accent-200">
                  {gap.fix}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-3">
            <BookButton source="how-it-works-footer" size="lg" />
            <ButtonLink href="/subjects-pricing" variant="secondary" size="lg">
              See subjects and pricing
            </ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
