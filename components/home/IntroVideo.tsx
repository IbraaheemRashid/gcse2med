import { Container, Section, Eyebrow } from "@/components/ui/Layout";
import { ButtonLink } from "@/components/ui/Button";
import { VerticalVideo } from "@/components/ui/VerticalVideo";
import { introVideo } from "@/content/video";

/**
 * The founders, in their own words, straight after the social proof and before
 * the method. Copy sits beside the clip rather than under it: the summary is
 * the accessible equivalent of the burned-in captions, so it needs to read as
 * content in its own right, not as a caption to a video.
 */
export function IntroVideo() {
  return (
    <Section className="bg-white">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-16">
          <div>
            <Eyebrow>Meet us</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              We teach the lessons ourselves
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-600">
              {introVideo.summary}
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-600">
              You are not being matched with whoever is free this week. The people
              in this video are the people in the lesson, and they are the ones who
              will tell you what your child needs.
            </p>
            <div className="mt-8">
              <ButtonLink href="/assessment" size="lg">
                Take the free assessment
              </ButtonLink>
            </div>
          </div>

          <VerticalVideo video={introVideo} mode="feed" />
        </div>
      </Container>
    </Section>
  );
}
