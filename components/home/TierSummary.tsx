import Link from "next/link";
import { Container, Section, SectionHeading } from "@/components/ui/Layout";
import { BookButton } from "@/components/site/BookButton";

export function TierSummary() {
  return (
    <Section id="pricing" className="bg-white">
      <Container>
        <SectionHeading title="The right subjects. The support they need." lead="Maths, Biology, Chemistry and Physics. GCSE and A-level tuition that fits around the school week." align="center" />
        <div className="mt-7 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:justify-center">
          {["Maths", "Biology", "Chemistry", "Physics"].map((name) => <Link key={name} href={`/subjects-pricing#subject-${name.toLowerCase()}`} className="rounded-full border border-brand-200 px-4 py-3 text-center text-base font-semibold text-brand-950 transition-colors hover:bg-brand-50">{name} <span aria-hidden="true">↗</span></Link>)}
        </div>
        <div className="mx-auto mt-8 max-w-3xl rounded-3xl bg-brand-50 p-6 sm:p-10">
          <h3 className="text-2xl font-bold text-brand-950 sm:text-3xl">Personal support. Limited places.</h3>
          <p className="mt-4 text-base leading-relaxed text-ink-600">To give every student the time, care and high-quality support they deserve, we keep our places limited. Book a consultation to find out whether we can support your child right away. If all places are filled, students will need to join our waiting list.</p>
          <BookButton source="home-limited-places" size="lg" className="mt-6 w-full sm:w-auto">Book a consultation</BookButton>
        </div>
        <p className="mt-5 text-center text-sm text-ink-600">Success and Excellence are not currently accepting new students.</p>
      </Container>
    </Section>
  );
}
