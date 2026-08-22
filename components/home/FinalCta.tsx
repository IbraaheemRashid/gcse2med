import { Container, Section } from "@/components/ui/Layout";
import { ButtonLink } from "@/components/ui/Button";
import { BookButton } from "@/components/site/BookButton";

export function FinalCta() {
  return (
    <Section className="bg-ink-50">
      <Container>
        <div className="rounded-card bg-brand-600 px-6 py-12 text-center sm:px-12">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Start with a conversation, not a commitment
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-brand-50">
            Fifteen minutes on the phone. We will ask where your child is now and
            what you want by results day &mdash; and if we are not the right fit,
            we will tell you.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <BookButton source="final-cta" variant="inverse" size="lg" />
            <ButtonLink
              href="/assessment"
              size="lg"
              className="bg-brand-700 text-white hover:bg-brand-800"
            >
              Take the free assessment first
            </ButtonLink>
          </div>
        </div>
      </Container>
    </Section>
  );
}
