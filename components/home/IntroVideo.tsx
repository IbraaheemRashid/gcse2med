import { Container, Section, SectionHeading } from "@/components/ui/Layout";
import { introVideoUrl } from "@/content/site";

/**
 * Introductory video. Renders nothing until `introVideoUrl` is set, the same
 * contract the booking modal uses for `bookingUrl` — a section heading above an
 * empty frame reads worse than no section at all.
 *
 * `aspect-video` on the wrapper rather than width/height on the iframe: the
 * frame then scales with the container instead of letterboxing inside a fixed
 * box on narrow screens.
 */
export function IntroVideo() {
  if (!introVideoUrl) return null;

  return (
    <Section className="bg-white">
      <Container>
        <SectionHeading
          eyebrow="Meet us"
          title="How we teach, in two minutes"
          lead="The method above, explained by the people who will be teaching your child."
          align="center"
        />

        <div className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-card border border-ink-200 shadow-card">
          <div className="aspect-video">
            <iframe
              src={introVideoUrl}
              title="Introduction to GCSE2MED"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full border-0"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
