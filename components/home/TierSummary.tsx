import { Container, Section, SectionHeading, Badge } from "@/components/ui/Layout";
import { ButtonLink } from "@/components/ui/Button";
import { tiers } from "@/content/tiers";
import { formatGBP } from "@/content/pricing";

export function TierSummary() {
  return (
    <Section className="bg-ink-50">
      <Container>
        <SectionHeading
          eyebrow="Tiers"
          title="Three levels of support"
          lead="Every tier includes expert tutors, weekly lessons and the resources to revise from. What changes is how small the group gets, and how closely we track the student."
          align="center"
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`relative flex flex-col rounded-card border bg-white p-7 ${
                tier.featured
                  ? "border-brand-300 shadow-lift ring-1 ring-inset ring-brand-300"
                  : "border-ink-200 shadow-card"
              }`}
            >
              {/* Accent yellow is the affirmative badge and stays reserved for
                  it; a closed tier gets neutral ink so the two never read as
                  variations on the same status. */}
              {tier.featured ? (
                <Badge className="absolute -top-3 left-7 bg-accent-300 text-ink-900 ring-accent-400">
                  Most popular
                </Badge>
              ) : !tier.accepting ? (
                <Badge className="absolute -top-3 left-7 bg-ink-100 text-ink-700 ring-ink-300">
                  Not currently accepting
                </Badge>
              ) : null}

              <h3 className="text-xl font-bold">{tier.name}</h3>
              <p className="mt-2 min-h-[3rem] text-[15px] leading-relaxed text-ink-600">
                {tier.pitch}
              </p>

              <p className="mt-5 flex items-baseline gap-1.5">
                <span className="text-sm font-medium text-ink-500">from</span>
                <span className="text-4xl font-extrabold tracking-tight text-ink-900">
                  {formatGBP(tier.monthlyFrom)}
                </span>
                <span className="text-sm font-medium text-ink-500">/month</span>
              </p>

              <p className="mt-4 rounded-lg bg-brand-50 px-3 py-2 text-sm font-semibold text-brand-800">
                {tier.groupLabel}
              </p>

              <div className="mt-6 grow" />

              {/* A closed tier still links through — parents should be able to
                  read what they would be growing into. Only the enrolment
                  language changes. */}
              <ButtonLink
                href={`/subjects-pricing#${tier.id}`}
                variant={tier.featured ? "primary" : "secondary"}
                className="w-full"
              >
                See what&apos;s included
              </ButtonLink>

              {!tier.accepting ? (
                <p className="mt-3 text-center text-sm text-ink-500">
                  Closed to new students
                </p>
              ) : null}
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-ink-600">
          Taking more than one subject brings the price down.{" "}
          <a
            href="/subjects-pricing"
            className="font-semibold text-brand-700 underline underline-offset-4"
          >
            See multi-subject and annual pricing
          </a>
          .
        </p>
      </Container>
    </Section>
  );
}
