import type { Metadata } from "next";
import { Container, Section } from "@/components/ui/Layout";
import { PageHeader } from "@/components/ui/PageHeader";
import { ContactForm } from "@/components/site/ContactForm";
import { BookButton } from "@/components/site/BookButton";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact us",
  description:
    "Get in touch with GCSE2MED about small-group GCSE and A-level tuition in Biology, Chemistry, Physics and Maths.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Talk to a person, not a chatbot"
        lead="Tell us where your child is and what you are worried about. We read every message ourselves and reply within one working day."
      />

      <Section className="bg-white">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
            <ContactForm />

            <div className="space-y-6">
              <div className="rounded-card bg-ink-50 p-6">
                <h2 className="text-lg font-bold">Would rather just talk?</h2>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-600">
                  Book a free 30-minute video consultation at a time that suits you.
                  No obligation, and no sales script.
                </p>
                <div className="mt-5">
                  <BookButton source="contact-page" className="w-full" />
                </div>
              </div>

              <div className="rounded-card border border-ink-200 p-6">
                <h2 className="text-lg font-bold">Direct</h2>
                <p className="mt-3 text-[15px] text-ink-600">
                  <a
                    href={`mailto:${site.email}`}
                    className="font-semibold text-brand-700 underline underline-offset-4"
                  >
                    {site.email}
                  </a>
                </p>
                {site.phone ? (
                  <p className="mt-2 text-[15px] text-ink-600">
                    <a
                      href={`tel:${site.phone.replace(/\s/g, "")}`}
                      className="font-semibold text-brand-700 underline underline-offset-4"
                    >
                      {site.phone}
                    </a>
                  </p>
                ) : null}
                <p className="mt-4 text-sm leading-relaxed text-ink-500">
                  Tuition is delivered online, so we work with families across the UK.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
