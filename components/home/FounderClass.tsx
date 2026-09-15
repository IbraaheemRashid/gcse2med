import { Container, Section, Eyebrow } from "@/components/ui/Layout";
import { ButtonLink } from "@/components/ui/Button";

export function FounderClass() {
  return (
    <Section id="founder-class" className="scroll-mt-24 bg-brand-950 text-white">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          <div>
            <Eyebrow tone="accent">The Founder Class · selection underway</Eyebrow>
            <h2 className="mt-4 text-3xl font-bold text-white sm:text-5xl">Five free places.<br />In every core subject.</h2>
            <p className="mt-6 text-lg leading-relaxed text-brand-100">
              Free tuition in Maths, Chemistry, Biology and Physics, with five students
              per subject supported through to the end of the academic year.
            </p>
            <p className="mt-4 leading-relaxed text-brand-100">
              We are currently choosing our students. It is a chance to give something
              back while refining how we teach, support and guide each learner.
            </p>
            <div className="mt-7"><ButtonLink href="/contact" variant="inverse">Ask about the Founder Class</ButtonLink></div>
          </div>
          <div className="rounded-card border border-white/20 bg-white/5 p-7 sm:p-9">
            <p className="text-sm font-semibold uppercase tracking-wider text-accent-300">A closer look at GCSE2MED</p>
            <h3 className="mt-3 text-2xl font-bold text-white">Follow the learning, as it happens.</h3>
            <p className="mt-4 leading-relaxed text-brand-100">
              As the year progresses, we will document some of our students’ journeys:
              what they find difficult, how we work on it together, and the progress they make.
              Stories will be shared with the student’s and parent’s permission.
            </p>
            <ul className="mt-6 grid grid-cols-2 gap-3">
              {["Maths", "Chemistry", "Biology", "Physics"].map((subject) => (
                <li key={subject} className="rounded-xl bg-white/10 p-4"><span className="block font-semibold">{subject}</span><span className="mt-1 block text-sm text-brand-100">5 free places</span></li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}
