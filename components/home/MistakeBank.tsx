import Image from "next/image";
import { Container, Section, Eyebrow } from "@/components/ui/Layout";
import { ButtonLink } from "@/components/ui/Button";
import { gapTypes, mistakeBankClosing, mistakeBankTagline } from "@/content/methodology";

export function MistakeBank() {
  return (
    <Section className="bg-brand-950 text-white">
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div>
            <Eyebrow tone="accent">The GCSE2MED difference</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
              {mistakeBankTagline}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-brand-100">
              Every mark a student drops goes into their mistake bank, and every
              mistake gets a cause. Three different causes, three different fixes
              &mdash; which is why &ldquo;just do more past papers&rdquo; so often
              changes nothing.
            </p>

            <dl className="mt-8 space-y-4">
              {gapTypes.map((gap) => (
                <div
                  key={gap.id}
                  className="rounded-card bg-white/5 p-5 ring-1 ring-inset ring-white/10"
                >
                  <dt className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="text-base font-bold text-accent-300">
                      {gap.name}
                    </span>
                    <span className="text-sm text-brand-200">{gap.summary}</span>
                  </dt>
                  <dd className="mt-2 text-[15px] leading-relaxed text-brand-100">
                    {gap.fix}
                  </dd>
                </div>
              ))}
            </dl>

            <p className="mt-8 border-l-2 border-accent-400 pl-4 text-lg font-semibold text-white">
              {mistakeBankClosing}
            </p>

            <div className="mt-8">
              <ButtonLink href="/resources#mistake-bank" variant="inverse" size="lg">
                How the mistake bank works
              </ButtonLink>
            </div>
          </div>

          <div className="overflow-hidden rounded-card ring-1 ring-white/15 lg:sticky lg:top-24">
            <Image
              src="/images/mistake-bank.jpg"
              alt="Sticky notes grouped on a wall"
              width={1800}
              height={1200}
              sizes="(min-width: 1024px) 28rem, 100vw"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
