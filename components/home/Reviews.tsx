import { Container, Section, SectionHeading } from "@/components/ui/Layout";
import { reviews, trustpilotUrl } from "@/content/reviews";

/**
 * Renders real reviews when `content/reviews.ts` has any, and an honest holding
 * state when it does not. The section is intentionally never populated with
 * invented testimonials.
 */
export function Reviews() {
  return (
    <Section className="bg-white">
      <Container>
        <SectionHeading
          eyebrow="What parents say"
          title="Reviews from the families we work with"
          lead={
            trustpilotUrl
              ? "Verified on Trustpilot, so you are reading from real people rather than a page we wrote about ourselves."
              : undefined
          }
          align="center"
        />

        {reviews.length === 0 ? (
          <div className="mx-auto mt-10 max-w-2xl rounded-card border border-dashed border-ink-300 bg-ink-50 p-8 text-center">
            <p className="text-lg font-semibold text-ink-800">
              We are a new company, and we would rather show you nothing than show
              you reviews we wrote ourselves.
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-600">
              Genuine reviews from parents and students will appear here as they
              come in, and will be verified through Trustpilot once our first
              cohort has finished a full term.
            </p>
          </div>
        ) : (
          <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review) => (
              <li
                key={review.id}
                className="flex flex-col rounded-card border border-ink-200 bg-white p-6 shadow-card"
              >
                {review.rating ? (
                  <p className="text-accent-500" aria-label={`${review.rating} out of 5`}>
                    <span aria-hidden="true">{"★".repeat(review.rating)}</span>
                  </p>
                ) : null}
                <blockquote className="mt-3 grow text-[15px] leading-relaxed text-ink-700">
                  &ldquo;{review.quote}&rdquo;
                </blockquote>
                <footer className="mt-5 border-t border-ink-200 pt-4 text-sm">
                  <p className="font-semibold text-ink-900">{review.author}</p>
                  <p className="text-ink-500">
                    {review.relation}
                    {review.subject ? ` · ${review.subject}` : ""}
                  </p>
                </footer>
              </li>
            ))}
          </ul>
        )}

        {trustpilotUrl ? (
          <p className="mt-8 text-center text-sm">
            <a
              href={trustpilotUrl}
              rel="noopener noreferrer"
              target="_blank"
              className="font-semibold text-brand-700 underline underline-offset-4"
            >
              Read every review on Trustpilot
            </a>
          </p>
        ) : null}
      </Container>
    </Section>
  );
}
