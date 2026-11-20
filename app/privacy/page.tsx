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
      updated="20 November 2026"
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
          {site.legalName} provides small-group online tuition to GCSE
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
            <strong>Website visits.</strong> We collect aggregate page-view statistics.
            If you allow advertising cookies, we also share page visits with Meta.
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
          <li>
            <strong>To measure our advertising.</strong> We use the Meta Pixel with your consent.
            You can change your choice in Cookie settings at the bottom of every page.
          </li>
        </ul>
      </LegalSection>

      <LegalSection heading="Children's data">
        <p>
          Our assessments are designed for students, many of whom are under eighteen. A
          student can complete an assessment and see their results without entering a
          name or email address, or allowing advertising cookies.
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
          We do not sell personal data. We use the following providers to run the site.
        </p>
        <ul>
          <li>Our hosting provider, to serve the website.</li>
          <li>Our database provider, to store enquiries and assessment results.</li>
          <li>Our email provider, to deliver reports and reply to enquiries.</li>
          <li>Our scheduling provider, to run consultation bookings.</li>
          <li>Our anti-spam provider, to keep the forms from being abused.</li>
        </ul>
        <p>
          If you allow advertising cookies, Meta receives the address of the page you visit,
          browser information, your IP address and cookie identifiers. Meta may match the
          visit to a Facebook or Instagram account to measure and personalise advertising.
          See <a href="https://www.facebook.com/privacy/policy/">Meta’s privacy policy</a>.
        </p>
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
        <p id="advertising-cookies">
          Advertising cookies start switched off. If you are 13 or older, you can
          allow the Meta Pixel to count page visits, including visits to an assessment.
          We send a page-view event. Assessment answers, scores and email addresses
          are excluded from that event. You can use the whole site with the pixel off.
        </p>
        <p>
          A cookie remembers your choice in this browser for 180 days. To switch the
          pixel on or off, open Cookie settings at the bottom of any page. Switching it
          off stops future page-view events. You can also clear cookies in your browser.
        </p>
        <p>
          Your browser may also store progress on your device so you can return to an
          assessment you have started.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
