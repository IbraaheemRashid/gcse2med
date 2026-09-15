import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Layout";
import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/content/site";
import { acceptingTiers, tiers } from "@/content/tiers";

export function Hero() {
  // Derived from the tiers a parent can actually enrol in, not every tier we
  // have defined: quoting the smallest group across all three would advertise a
  // group size that is closed to new students. Falls back to the full list so
  // the line never disappears if every tier is temporarily closed.
  const sized = acceptingTiers.length > 0 ? acceptingTiers : tiers;
  const smallestGroup = Math.min(...sized.map((tier) => tier.maxGroupSize));
  const largestGroup = Math.max(...sized.map((tier) => tier.maxGroupSize));

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 to-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-accent-200/40 blur-3xl"
      />
      <Container>
        {/* One CTA, above the fold on every breakpoint: the copy above it is
            kept deliberately tight and the image sits below the fold on small
            screens. Booking stays reachable from the sticky header. */}
        <div className="relative grid items-center gap-10 py-10 sm:py-16 lg:grid-cols-2 lg:gap-16 lg:py-24">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-brand-700 ring-1 ring-inset ring-brand-200">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent-400" />
              Small-group GCSE &amp; A-level tuition
            </p>

            <Link href="#founder-class" className="mt-4 block text-sm font-semibold text-brand-700 underline underline-offset-4">
              Founder Class: 5 free places per subject →
            </Link>

            <h1 className="mt-5 text-[2rem] font-extrabold leading-[1.08] sm:text-5xl lg:text-[3.4rem]">
              The Support that understands{" "}
              {/* Marker-pen highlight: a thick underline pulled up into the
                  glyphs. text-underline-offset is measured from the BASELINE, so
                  this stays put at any font size — a positioned bar or a
                  background gradient both drift with the font's descent metric.
                  Glyphs paint over their own decoration, so the text stays crisp. */}
              <span className="[text-decoration-color:var(--color-accent-300)] [text-decoration-line:underline] [text-decoration-skip-ink:none] [text-decoration-thickness:0.34em] [text-underline-offset:-0.22em]">
                YOUR
              </span>{" "}
              child.
            </h1>

            <p className="mt-4 text-lg font-semibold text-brand-800 sm:text-xl">
              {site.strapline}
            </p>

            <div className="mt-7 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-5">
              <ButtonLink href="/assessment" size="lg">
                Take the free assessment
              </ButtonLink>
              <p className="text-base font-semibold text-ink-800">
                Find out where your child stands.
              </p>
            </div>

            <p className="mt-5 text-sm text-ink-600">
              Free, no obligation, about fifteen minutes. Groups of{" "}
              {smallestGroup === largestGroup ? (
                <>{largestGroup} students</>
              ) : (
                <>
                  {smallestGroup}&ndash;{largestGroup} students
                </>
              )}
              , never more.
            </p>
          </div>

          <div className="relative lg:justify-self-end">
            <div className="overflow-hidden rounded-card shadow-lift ring-1 ring-ink-200">
              <Image
                src="/images/hero-graduation.jpg"
                alt="A graduation cap held up in the air outside a university building"
                width={1800}
                height={1200}
                priority
                sizes="(min-width: 1024px) 42rem, 100vw"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-5 left-4 hidden rounded-xl bg-white px-4 py-3 shadow-card ring-1 ring-ink-200 sm:block lg:-left-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-500">
                Every student starts here
              </p>
              <p className="mt-0.5 text-sm font-semibold text-ink-900">
                Diagnose &rarr; Expose &rarr; Action &rarr; Review
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
