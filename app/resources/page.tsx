import type { Metadata } from "next";
import Image from "next/image";
import { Container, Section, SectionHeading, Badge, Eyebrow } from "@/components/ui/Layout";
import { PageHeader } from "@/components/ui/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { BookButton } from "@/components/site/BookButton";
import { resourceSamples, trackingPromise } from "@/content/resources";
import { tierById } from "@/content/tiers";
import { gapTypes, mistakeBankClosing, mistakeBankTagline } from "@/content/methodology";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Annotated lesson slides, topic summary sheets, knowledge checklists, tracked flashcards and the GCSE2MED mistake bank — what students get, and what parents get to see.",
  alternates: { canonical: "/resources" },
};

export default function ResourcesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Resources"
        title="Everything they revise from, and everything you get to see"
        lead="Resources are only half of it. The other half is that every one of them is tracked, so 'they have been revising' turns into something you can actually check."
      />

      <Section className="bg-white">
        <Container>
          <SectionHeading
            eyebrow="What's included"
            title="The materials"
            lead="Built by our tutors against the specification, and mapped to the exam board your child sits."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {resourceSamples.map((resource) => (
              <div
                key={resource.id}
                className="flex flex-col rounded-card border border-ink-200 bg-white p-6 shadow-card"
              >
                <h3 className="text-lg font-bold">{resource.name}</h3>
                <p className="mt-3 grow text-[15px] leading-relaxed text-ink-600">
                  {resource.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {resource.includedIn.map((tierId) => (
                    <Badge
                      key={tierId}
                      className="bg-brand-50 text-brand-800 ring-brand-200"
                    >
                      {tierById[tierId as keyof typeof tierById]?.name ?? tierId}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* TODO(client): swap this note for real downloadable samples once the
              slides, summary sheets and flashcard decks are exported. */}
          <p className="mt-8 rounded-card border border-dashed border-ink-300 bg-ink-50 px-6 py-5 text-[15px] leading-relaxed text-ink-600">
            Sample slides and flashcard decks are being prepared for download. If you
            would like to see a set before enrolling,{" "}
            <a
              href="/contact"
              className="font-semibold text-brand-700 underline underline-offset-4"
            >
              ask us
            </a>{" "}
            and we will send one over.
          </p>
        </Container>
      </Section>

      <Section className="bg-ink-50">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="overflow-hidden rounded-card shadow-card ring-1 ring-ink-200">
              <Image
                src="/images/resources.jpg"
                alt="Study notes, a laptop and glasses laid out on a desk"
                width={1800}
                height={1200}
                sizes="(min-width: 1024px) 32rem, 100vw"
                className="h-full w-full object-cover"
              />
            </div>

            <div>
              <Eyebrow>Tracked, not just handed out</Eyebrow>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                What the tracking gives you
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-ink-600">
                Every flashcard review and every practice question is logged against the
                student. That is what turns a parent update from an opinion into a
                number.
              </p>
              <ul className="mt-6 space-y-3">
                {trackingPromise.map((item) => (
                  <li key={item} className="flex gap-3 text-[15px] text-ink-700">
                    <span
                      aria-hidden="true"
                      className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent-400"
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-ink-500">
                The parent dashboard is included from the Success tier upwards.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section id="mistake-bank" className="scroll-mt-24 bg-brand-950 text-white">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow tone="accent">Our special feature</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
              {mistakeBankTagline}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-brand-100">
              Every mark a student drops is recorded and categorised. Not so we can
              point at it &mdash; so we know exactly what to do next.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {gapTypes.map((gap) => (
              <div
                key={gap.id}
                className="flex flex-col rounded-card bg-white/5 p-6 ring-1 ring-inset ring-white/10"
              >
                <h3 className="text-xl font-bold text-accent-300">{gap.name}</h3>
                <p className="mt-1 text-sm font-semibold text-brand-200">{gap.summary}</p>
                <p className="mt-4 grow text-[15px] leading-relaxed text-brand-100">
                  {gap.detail}
                </p>
                <p className="mt-5 border-t border-white/10 pt-4 text-[15px] font-medium text-white">
                  {gap.fix}
                </p>
              </div>
            ))}
          </div>

          <p className="mx-auto mt-12 max-w-2xl text-center text-xl font-semibold text-white">
            {mistakeBankClosing}
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <BookButton source="resources-mistake-bank" variant="inverse" size="lg" />
            <ButtonLink
              href="/assessment"
              size="lg"
              className="bg-white/10 text-white ring-1 ring-inset ring-white/25 hover:bg-white/15"
            >
              Try the free assessment
            </ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
