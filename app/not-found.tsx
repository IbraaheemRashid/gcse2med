import { Container } from "@/components/ui/Layout";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="py-24 sm:py-32">
      <div className="mx-auto max-w-lg text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-600">
          404
        </p>
        <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">
          That page isn&apos;t here
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-600">
          The link may be out of date, or the assessment you were looking for may not be
          live yet.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/" size="lg">
            Back to the homepage
          </ButtonLink>
          <ButtonLink href="/assessment" variant="secondary" size="lg">
            Free assessment
          </ButtonLink>
        </div>
      </div>
    </Container>
  );
}
