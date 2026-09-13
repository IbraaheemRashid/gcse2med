import Script from "next/script";
import { Container, Section, SectionHeading } from "@/components/ui/Layout";
import { ReviewMessages } from "./ReviewMessages";
import {
  reviews,
  trustpilotBusinessUnitId,
  trustpilotUrl,
} from "@/content/reviews";

/**
 * Three states, in precedence order:
 *
 *   1. Trustpilot business unit ID set — the live widget, which is the real
 *      answer: reviews Trustpilot has verified, not a page we wrote about
 *      ourselves.
 *   2. Reviews typed into `content/reviews.ts` — the manual path from the
 *      brief, for screenshots and messages that arrive before Trustpilot does.
 *   3. Neither — an honest holding state.
 *
 * The section is intentionally never populated with invented testimonials; see
 * `content/reviews.ts` for the legal reason as well as the honest one.
 */
export function Reviews() {
  const hasTrustpilot = Boolean(trustpilotBusinessUnitId);

  return (
    <Section className="bg-ink-50">
      <Container>
        <SectionHeading
          eyebrow="What parents say"
          title="Reviews from the families we work with"
          lead={
            hasTrustpilot || trustpilotUrl
              ? "Verified on Trustpilot, so you are reading from real people rather than a page we wrote about ourselves."
              : undefined
          }
          align="center"
        />

        {hasTrustpilot ? (
          <>
            {/* lazyOnload: the widget is third-party and below the hero, so it
                must not compete with the page's own JS for the first paint. */}
            <Script
              src="//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
              strategy="lazyOnload"
            />
            <div
              className="trustpilot-widget mt-12"
              data-locale="en-GB"
              data-template-id="539adbd6dec7e10e686debee"
              data-businessunit-id={trustpilotBusinessUnitId}
              data-style-height="500px"
              data-style-width="100%"
              data-theme="light"
            >
              <a
                href={trustpilotUrl || "https://uk.trustpilot.com"}
                rel="noopener noreferrer"
                target="_blank"
              >
                Trustpilot
              </a>
            </div>
          </>
        ) : reviews.length === 0 ? (
          <div className="mx-auto mt-12 max-w-2xl rounded-card border border-dashed border-ink-300 bg-white p-8 text-center">
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
          <ReviewMessages reviews={reviews} />
        )}

        {trustpilotUrl && !hasTrustpilot ? (
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
