import type { Metadata } from "next";
import Link from "next/link";
import { Container, Section } from "@/components/ui/Layout";
import { PageHeader } from "@/components/ui/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { bookingUrl, site } from "@/content/site";
import { methodology } from "@/content/methodology";

export const metadata: Metadata = {
  title: "Book a free consultation",
  description:
    "Book a free fifteen-minute consultation with GCSE2MED to talk through where your child is and what would move them forward.",
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
        title="Fifteen minutes. No obligation."
        lead="A short call to understand your child's situation before anyone commits to anything."
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
                /* Shown until NEXT_PUBLIC_BOOKING_URL points at a real Cal.com or
                   Calendly event — an honest route to a human beats a dead iframe. */
                <div className="rounded-card border border-dashed border-ink-300 bg-ink-50 p-8">
                  <h2 className="text-xl font-bold">Online booking is being set up</h2>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink-600">
                    In the meantime, send us a message and we will come back with times
                    that work around your child&apos;s school day &mdash; usually the
                    same day.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <ButtonLink href="/contact" size="lg">
                      Send a message
                    </ButtonLink>
                    <Link
                      href={`mailto:${site.email}`}
                      className="inline-flex items-center px-4 py-3.5 font-semibold text-brand-700 underline underline-offset-4"
                    >
                      {site.email}
                    </Link>
                  </div>
                </div>
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
                  <ButtonLink href="/assessment" className="w-full">
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
