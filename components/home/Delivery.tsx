import { Container, Section, SectionHeading } from "@/components/ui/Layout";
import { tiers } from "@/content/tiers";

export function Delivery() {
  // The cluster widths step down with the caps so the shrink is visible before
  // anyone reads a number. Driven off the tier order, not hard-coded per tier.
  const clusterWidth = ["max-w-[9rem]", "max-w-[7rem]", "max-w-[5rem]"];

  return (
    <Section className="bg-white">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <SectionHeading
            eyebrow="How it's delivered"
            title="Small groups. Individual attention. Limited places."
            lead="Your child isn't just another face on a screen. Our groups are deliberately kept small so tutors can know every student, understand their weaknesses and track their progress."
          />

          <div>
            <p className="text-lg leading-relaxed text-ink-700">
              We don&apos;t fill cohorts to the maximum number of students we can
              fit on a screen. We cap every group deliberately, and we hold to
              that cap.
            </p>

            <p className="mt-5 border-l-4 border-flag-600 pl-5 text-lg font-bold text-ink-900">
              Once a group is full, enrolment for that group closes.
            </p>

            <dl className="mt-8 grid gap-4 sm:grid-cols-3">
              {tiers.map((tier, index) => (
                <div
                  key={tier.id}
                  className="flex flex-col items-center rounded-card border border-ink-200 bg-ink-50 p-5 text-center"
                >
                  <dt className="text-sm font-semibold text-ink-600">{tier.name}</dt>

                  {/* Decorative: the seat count is announced by the <dd> below. */}
                  <div
                    aria-hidden="true"
                    className={`mt-4 flex flex-wrap justify-center gap-1.5 ${clusterWidth[index] ?? "max-w-[9rem]"}`}
                  >
                    {Array.from({ length: tier.maxGroupSize }, (_, seat) => (
                      <span
                        key={seat}
                        className="h-3 w-3 rounded-full bg-brand-600"
                      />
                    ))}
                  </div>

                  <dd className="mt-4 text-4xl font-extrabold tracking-tight text-brand-700">
                    {tier.maxGroupSize}
                  </dd>
                  <dd className="mt-1 text-xs font-medium uppercase tracking-wider text-ink-500">
                    students max
                  </dd>
                </div>
              ))}
            </dl>

            <p className="mt-5 text-center text-[15px] font-semibold text-ink-700">
              The more support they need, the smaller the group.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
