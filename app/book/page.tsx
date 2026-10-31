import type { Metadata } from "next";
import { ContactForm } from "@/components/site/ContactForm";
import { Container, Section } from "@/components/ui/Layout";
import { PageHeader } from "@/components/ui/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { bookingUrl } from "@/content/site";
import { methodology } from "@/content/methodology";

export const metadata: Metadata = {
  title: "Book a free consultation",
  description:
    "Book a free 30-minute video consultation with GCSE2MED to talk through where your child is and what would move them forward.",
  alternates: { canonical: "/book" },
};

const agenda = [
  "Where your child is now, in their words and yours",
  "What is actually costing them marks — and whether it is knowledge, technique or carelessness",
  "What we would do about it, and which tier fits",
  "Whether we are the right fit at all. If we are not, we will say so",
];

export default function BookPage() {
  return (
    <>
      <PageHeader
        eyebrow="Free consultation"
        title="30 minutes. Face to face. No obligation."
        lead="A video call with the founders, student and parent to understand what is going wrong and see whether GCSE2MED can help."
      />

      <Section className="bg-white">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
            <div>
              {bookingUrl ? (
                <div className="overflow-hidden rounded-card border border-ink-200 shadow-card">
                  <iframe
                    src={bookingUrl}
                    title="Consultation booking calendar"
                    className="h-[720px] w-full border-0"
                    loading="lazy"
                  />
                </div>
              ) : (
                <ContactForm consultation />
              )}
            </div>

            <div>
              <h2 className="text-xl font-bold">What we will cover</h2>
              <ul className="mt-5 space-y-4">
                {agenda.map((item) => (
                  <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-ink-700">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent-400"
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8 rounded-card bg-brand-50 p-6">
                <h2 className="text-lg font-bold text-brand-900">
                  Want something concrete to talk about?
                </h2>
                <p className="mt-2 text-[15px] leading-relaxed text-brand-800">
                  Take the free assessment first. {methodology[0].step} comes before
                  everything else, and the call is far more useful when we already know
                  where the gaps are.
                </p>
                <div className="mt-5">
                  <ButtonLink variant="accent" href="/assessment" className="w-full">
                    Take the free assessment
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
