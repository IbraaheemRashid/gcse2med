import Link from "next/link";
import { Container, Section, SectionHeading } from "@/components/ui/Layout";
import { Faqs } from "@/components/ui/Faqs";
import { pricingFaqs, assessmentFaqs } from "@/content/faqs";

/**
 * The objections a parent has before they will book anything: how big the
 * groups are, whether they are tied in, whether we do their exam board, and
 * what the guarantee is worth. Answer them here, then ask for the booking —
 * FinalCta follows this section.
 *
 * Selected by question rather than by slicing the arrays: the full lists live
 * on /subjects-pricing and /assessment, and reordering them there should not
 * silently change what the homepage asks.
 */
const WANTED = [
  "How big are the groups, really?",
  "Is there a contract or a minimum term?",
  "Do you cover our exam board?",
  "How do you report progress to parents?",
  "What does the Grade A guarantee actually cover?",
  "Is it really free?",
];

const pool = [...pricingFaqs, ...assessmentFaqs];
const items = WANTED.map((question) => {
  const faq = pool.find((entry) => entry.question === question);
  if (!faq) throw new Error(`Homepage FAQ "${question}" is no longer in content/faqs.ts`);
  return faq;
});

export function HomeFaqs() {
  return (
    <Section className="bg-white">
      <Container>
        <SectionHeading
          eyebrow="Before you ask"
          title="The questions parents ask us first"
          lead="If yours is not here, ask it — we would rather answer it now than have you guess."
          align="center"
        />

        <div className="mx-auto mt-12 max-w-3xl">
          <Faqs items={items} />
          <p className="mt-8 text-center text-sm text-ink-600">
            More on{" "}
            <Link
              href="/subjects-pricing#pricing"
              className="font-semibold text-brand-700 underline underline-offset-4"
            >
              pricing
            </Link>{" "}
            and{" "}
            <Link
              href="/assessment"
              className="font-semibold text-brand-700 underline underline-offset-4"
            >
              the free assessment
            </Link>
            .
          </p>
        </div>

        {/* Deliberately no FaqJsonLd here. /subjects-pricing already emits
            FAQPage markup for the whole of pricingFaqs, and five of the six
            below come from that list — repeating them on a second URL is
            duplicate structured data, not extra coverage. */}
      </Container>
    </Section>
  );
}
