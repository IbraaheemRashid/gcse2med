import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/ui/Legal";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "What data GCSE2MED collects through this website, why, how long it is kept, and how to have it deleted.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

/**
 * TODO(client): before launch this needs — the registered company name and
 * address, your ICO registration number, confirmed retention periods, and a
 * solicitor's review. The data flows described are accurate to the code.
 */
export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy policy"
      updated="21 August 2026"
      intro={
        <p>
          This policy covers the {site.name} website. Because most of our students are
          under eighteen, we have tried to describe what happens to their data in plain
          terms rather than in the usual boilerplate.
        </p>
      }
    >
      <LegalSection heading="Who we are">
        <p>
          {site.legalName} provides small-group online tuition to GCSE and A-level
          students in the UK. For data protection purposes we are the data controller
          for information collected through this website. You can reach us at{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
        <p>
          {/* TODO(client): registered company name, company number, registered
              address and ICO registration number. */}
          Our registered company details and ICO registration number will be published
          here before enrolment opens.
        </p>
      </LegalSection>

      <LegalSection heading="What we collect, and when">
        <ul>
          <li>
            <strong>Free assessment.</strong> The answers submitted, the resulting score
            and the topics identified. This is submitted anonymously &mdash; we do not
            ask who you are to mark it.
          </li>
          <li>
            <strong>Emailed reports.</strong> If you choose to have the report emailed,
            we collect that email address, an optional first name, and whether you
            opted in to further updates. Providing this is entirely optional; the
            results are shown on screen regardless.
          </li>
          <li>
            <strong>Enquiries.</strong> Name, email address, optional phone number, the
            subject you are interested in, and the message you send us.
          </li>
          <li>
            <strong>Consultation bookings.</strong> Handled by our scheduling provider,
            which collects the name, email address and time slot you give it.
          </li>
          <li>
            <strong>Technical data.</strong> Aggregate, anonymous page-view statistics.
            We do not use advertising cookies or cross-site trackers.
          </li>
        </ul>
      </LegalSection>

      <LegalSection heading="Why we use it, and our lawful basis">
        <ul>
          <li>
            <strong>To mark an assessment and send the report you asked for</strong> —
            performance of a service you requested, and your consent for the email.
          </li>
          <li>
            <strong>To reply to an enquiry or arrange a consultation</strong> —
            legitimate interests in responding to someone who contacted us.
          </li>
          <li>
            <strong>To send revision tips and updates</strong> — only where you ticked
            the box. You can withdraw that consent at any time using the unsubscribe
            link in any email, or by emailing us.
          </li>
          <li>
            <strong>To improve the assessments and the site</strong> — legitimate
            interests, using aggregated results rather than individual ones.
          </li>
        </ul>
      </LegalSection>

      <LegalSection heading="Children's data">
        <p>
          Our assessments are designed for students, many of whom are under eighteen. A
          student can complete an assessment and see their results without giving us any
          personal information at all.
        </p>
        <p>
          If a student is under 13, we ask that a parent or guardian enters the email
          address for the report. If you believe a child has given us personal data
          without a parent&apos;s knowledge, email us at{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a> and we will delete it.
        </p>
      </LegalSection>

      <LegalSection heading="Who we share it with">
        <p>
          We do not sell personal data, and we do not share it for advertising. We use a
          small number of processors to run the site:
        </p>
        <ul>
          <li>Our hosting provider, to serve the website.</li>
          <li>Our database provider, to store enquiries and assessment results.</li>
          <li>Our email provider, to deliver reports and reply to enquiries.</li>
          <li>Our scheduling provider, to run consultation bookings.</li>
          <li>Our anti-spam provider, to keep the forms from being abused.</li>
        </ul>
        <p>
          {/* TODO(client): name each provider explicitly once the accounts exist —
              a generic list is not sufficient under UK GDPR transparency rules. */}
          Each provider will be named individually here once the accounts are set up.
        </p>
      </LegalSection>

      <LegalSection heading="How long we keep it">
        <ul>
          <li>
            <strong>Assessment results without an email address:</strong> kept in
            aggregate to improve the questions.
          </li>
          <li>
            <strong>Enquiries and assessment reports:</strong> kept while we are in
            contact and for a reasonable period afterwards, then deleted.
          </li>
          <li>
            <strong>Marketing contacts:</strong> kept until you unsubscribe.
          </li>
        </ul>
        <p>
          {/* TODO(client): set concrete retention periods, e.g. 24 months. */}
          Exact retention periods are being finalised and will be stated here in months.
        </p>
      </LegalSection>

      <LegalSection heading="Your rights">
        <p>
          Under UK data protection law you can ask us for a copy of the personal data we
          hold about you, ask us to correct it, ask us to delete it, object to how we
          are using it, or ask us to restrict its use. Email{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a> and we will respond within
          one month.
        </p>
        <p>
          If you are unhappy with how we have handled your data you can complain to the
          Information Commissioner&apos;s Office at{" "}
          <a href="https://ico.org.uk" rel="noopener noreferrer" target="_blank">
            ico.org.uk
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection heading="Cookies">
        <p>
          This site does not set advertising or tracking cookies, and our analytics are
          collected without them. Your browser may store a small amount of data on your
          own device to remember an assessment you are part-way through &mdash; that
          never leaves your device and is cleared when you close the tab.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
