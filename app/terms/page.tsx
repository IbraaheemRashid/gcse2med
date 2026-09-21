import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, LegalSection } from "@/components/ui/Legal";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Terms of service",
  description:
    "The terms on which GCSE2MED provides small-group GCSE and A-level tuition, including payment, cancellation and conduct.",
  alternates: { canonical: "/terms" },
};

/**
 * TODO(client): needs a solicitor's review and your commercial decisions on
 * notice periods, refunds and missed lessons. The structure reflects how the
 * service is described on the rest of the site.
 */
export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of service"
      updated="21 August 2026"
      intro={
        <p>
          These terms cover tuition provided by {site.legalName}. Enrolling on any tier
          means agreeing to them.
        </p>
      }
    >
      <LegalSection heading="The service">
        <p>
          We provide online small-group tuition in GCSE and A-level Biology, Chemistry,
          Physics and Maths. Each tier includes a weekly one-hour lesson per subject and
          the resources set out on our{" "}
          <Link href="/subjects-pricing">subjects and pricing page</Link>.
        </p>
        <p>
          Group sizes are capped at eight students on Essential, six on Success and four
          on Excellence. These are maximums, not targets.
        </p>
      </LegalSection>

      <LegalSection heading="Fees and payment">
        <p>
          Fees and payment options are explained during your consultation and confirmed
          before enrolment.
        </p>
        <p>
          Multi-subject prices apply from the month a subject is added. Tier changes take
          effect from the start of the next billing cycle.
        </p>
        <p>
          {/* TODO(client): payment provider, billing date, failed-payment handling
              and any late-payment terms. */}
          Payment method and billing dates are confirmed at enrolment.
        </p>
      </LegalSection>

      <LegalSection heading="Cancellation and refunds">
        <p>
          {/* TODO(client): decide and state the notice period, the position on
              part-used months, and the refund position on annual plans. Consumer
              cancellation rights under the Consumer Contracts Regulations also need
              covering here. */}
          Notice periods and the refund position on monthly and annual plans are being
          finalised and will be set out here in full. Until then, we will confirm them
          to you in writing before you pay anything.
        </p>
      </LegalSection>

      <LegalSection heading="Missed and cancelled lessons">
        <p>
          {/* TODO(client): your policy on student absence, tutor absence, and whether
              lessons are recorded and made available afterwards. */}
          Where we have to cancel a lesson, we will either rearrange it or credit it.
          Our policy on student absence and lesson recordings is confirmed at enrolment.
        </p>
      </LegalSection>

      <LegalSection heading="What we expect from students">
        <ul>
          <li>Attend lessons, and arrive ready to work.</li>
          <li>Complete homework where the tier includes it.</li>
          <li>Treat tutors and other students in the group with respect.</li>
        </ul>
        <p>
          Persistent disruption to a small group affects every other student in it. We
          will always raise concerns with parents first, but we reserve the right to
          remove a student from a group where behaviour does not change.
        </p>
      </LegalSection>

      <LegalSection heading="Resources and intellectual property">
        <p>
          Lesson slides, summary sheets, checklists, flashcards and question banks are
          provided for the enrolled student&apos;s personal use. They may not be shared,
          resold or republished.
        </p>
      </LegalSection>

      <LegalSection heading="Results">
        <p>
          Except where the Excellence grade guarantee applies, we do not guarantee any
          particular grade. Outcomes depend on the work a student puts in as well as the
          teaching they receive. The guarantee and its conditions are set out on our{" "}
          <Link href="/guarantee-terms">grade guarantee page</Link>.
        </p>
      </LegalSection>

      <LegalSection heading="Liability">
        <p>
          {/* TODO(client): solicitor to draft. Nothing here should attempt to exclude
              liability that cannot lawfully be excluded. */}
          Nothing in these terms limits liability for death or personal injury caused by
          negligence, for fraud, or for anything else that cannot lawfully be limited.
          The remainder of this clause is being drafted.
        </p>
      </LegalSection>

      <LegalSection heading="Governing law">
        <p>
          These terms are governed by the law of England and Wales, and disputes will be
          dealt with by the courts of England and Wales.
        </p>
      </LegalSection>

      <LegalSection heading="Contact">
        <p>
          Questions about these terms: <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
