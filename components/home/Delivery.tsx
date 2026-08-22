import { Container, Section, SectionHeading } from "@/components/ui/Layout";
import { tiers } from "@/content/tiers";

export function Delivery() {
  return (
    <Section className="bg-white">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <SectionHeading
            eyebrow="How it's delivered"
            title="You're not just another student"
            lead="Small groups. Individual attention. Personal progress. The lesson is shared &mdash; the learning journey isn't."
          />

          <div>
            <p className="text-lg leading-relaxed text-ink-700">
              A group is big enough that students learn from each other&apos;s
              questions, and small enough that a tutor knows within a fortnight
              exactly which student is quietly stuck on which topic. That is not
              possible in a room of thirty, and it is not possible in a webinar of
              two hundred.
            </p>

            <dl className="mt-8 grid gap-4 sm:grid-cols-3">
              {tiers.map((tier) => (
                <div
                  key={tier.id}
                  className="rounded-card border border-ink-200 bg-ink-50 p-5 text-center"
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
        </div>
      </Container>
    </Section>
  );
}
