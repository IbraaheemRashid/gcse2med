import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, LegalSection } from "@/components/ui/Legal";
import { site } from "@/content/site";
import { tierById } from "@/content/tiers";

export const metadata: Metadata = {
  title: "Grade guarantee terms",
  description:
    "The conditions attached to the GCSE2MED Grade A guarantee, included with the Excellence tier.",
  alternates: { canonical: "/guarantee-terms" },
};

/**
 * TODO(client): this is the one page on the site making a commercial promise, and
 * every condition below is a PROPOSAL, not a decision. Nothing here should be
 * advertised as final until you have signed off the qualifying grade, the minimum
 * enrolment period, the attendance and homework thresholds, and the remedy.
 */
export default function GuaranteeTermsPage() {
  const excellence = tierById.excellence;

  return (
    <LegalPage
      title="Grade guarantee terms"
      updated="21 August 2026"
      intro={
        <p>
          The {excellence.guarantee} is included with the{" "}
          <Link href="/subjects-pricing#excellence">Excellence tier</Link>. Because it is
          a promise about an exam result, it comes with conditions &mdash; and we would
          rather you read them before enrolling than after.
        </p>
      }
    >
      <LegalSection heading="These terms are being finalised">
        <p>
          We are not going to publish conditions we have not settled. The clauses below
          set out the shape of the guarantee as it stands; the exact thresholds are
          confirmed in writing before you enrol, and nothing is charged until you have
          seen them.
        </p>
        <p>
          If you want the current position now, ask us on the{" "}
          <Link href="/book">consultation call</Link> or email{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a> and we will send it to you.
        </p>
      </LegalSection>

      <LegalSection heading="Who it applies to">
        <ul>
          <li>Students enrolled on the Excellence tier for the subject in question.</li>
          <li>
            Students who have been with us for a minimum continuous period before the
            exam, so that there is enough time for the teaching to have any effect.
          </li>
          <li>The specific subject enrolled on, not every subject a student sits.</li>
        </ul>
      </LegalSection>

      <LegalSection heading="What the student has to do">
        <p>
          The guarantee rests on the student doing the work. It applies where they have:
        </p>
        <ul>
          <li>Attended at least an agreed proportion of their weekly lessons.</li>
          <li>Completed at least an agreed proportion of homework set.</li>
          <li>Sat the monthly mock exams included in the tier.</li>
          <li>
            Followed the personal study timetable agreed with their tutor, or told us
            why it needed changing.
          </li>
        </ul>
        <p>
          We track all of this anyway, so neither side is relying on memory at the end of
          the year.
        </p>
      </LegalSection>

      <LegalSection heading="What happens if the grade is not achieved">
        <p>
          {/* TODO(client): decide the remedy — free continued tuition until resit,
              a partial refund, or something else — and state it plainly. */}
          Where the conditions above have been met and the grade is not achieved, we put
          it right. The specific remedy is confirmed in writing at enrolment.
        </p>
      </LegalSection>

      <LegalSection heading="What is outside the guarantee">
        <ul>
          <li>Exam results affected by circumstances outside anyone&apos;s control.</li>
          <li>Subjects the student is not enrolled with us for.</li>
          <li>
            Students who joined too close to the exam for the conditions above to be met.
          </li>
        </ul>
      </LegalSection>

      <LegalSection heading="How to make a claim">
        <p>
          Email <a href={`mailto:${site.email}`}>{site.email}</a> with the results slip
          within a reasonable period of results day. We will check the attendance and
          homework record from our own system and come back to you.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
