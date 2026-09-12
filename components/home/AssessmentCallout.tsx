import Image from "next/image";
import { Container, Section, Eyebrow } from "@/components/ui/Layout";
import { ButtonLink } from "@/components/ui/Button";

const included = [
  "A score, and what it actually means",
  "Every question they got wrong, with the correct answer explained",
  "The topics to work on first",
];

export function AssessmentCallout() {
  return (
    <Section id="assessment" className="bg-white">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 overflow-hidden rounded-card shadow-card ring-1 ring-ink-200 lg:order-1">
            <Image
              src="/images/assessment.jpg"
              alt="An open notebook and pen on a desk"
              width={1800}
              height={1352}
              sizes="(min-width: 1024px) 32rem, 100vw"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="order-1 lg:order-2">
            <Eyebrow>Start with the diagnosis</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Find out where your child actually stands. Free.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-600">
              A short multiple-choice assessment in the subject of your choice. It
              marks itself the moment it is submitted, and tells you what is
              missing rather than just how many they got right.
            </p>

            <ul className="mt-6 space-y-3">
              {included.map((item) => (
                <li key={item} className="flex gap-3 text-[15px] text-ink-700">
                  <span
                    aria-hidden="true"
                    className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent-400"
                  />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <ButtonLink href="/assessment" size="lg">
                Take the free assessment
              </ButtonLink>
            </div>
            <p className="mt-4 text-sm text-ink-500">
              No account needed. Results appear on screen straight away &mdash; an
              email copy is optional.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
