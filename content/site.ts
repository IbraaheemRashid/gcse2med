/**
 * Site-wide constants. Everything a non-developer is likely to want changed
 * lives in `content/` — this file holds the identity and contact details.
 */

export const site = {
  name: "GCSE2MED",
  /** Used in <title> templates and structured data. */
  legalName: "GCSE2MED",
  tagline: "The Support that understands YOUR child.",
  strapline: "Small groups. Expert tutors. Targeted support. Measurable progress.",
  description:
    "Small-group GCSE and A-level tuition in Biology, Chemistry, Physics and Maths. We diagnose what is holding your child back, target it, and measure the progress.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://gcse2med.com",
  email: "hello@gcse2med.com", // TODO(client): confirm
  /** Optional — omitted from the UI when blank. */
  phone: "",
  socials: {
    instagram: "",
    tiktok: "",
  },
  // Not `as const`: optional fields like `phone` are meant to be filled in, and
  // literal-narrowing an empty string to `""` makes every `site.phone ? …` check
  // collapse to `never`.
};

/**
 * Booking is provider-agnostic: point this at a Cal.com or Calendly event URL
 * and both the /book page and the global modal embed it. When unset (local dev
 * before the account exists) the UI degrades to the enquiry form instead of
 * rendering a broken iframe.
 */
export const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL ?? "";

export const primaryNav = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/subjects-pricing", label: "Subjects & pricing" },
  { href: "/assessment", label: "Free assessment" },
  { href: "/resources", label: "Resources" },
  { href: "/about", label: "About" },
] as const;

export const footerNav = {
  Learn: [
    { href: "/how-it-works", label: "How it works" },
    { href: "/subjects-pricing", label: "Subjects & pricing" },
    { href: "/resources", label: "Resources" },
    { href: "/assessment", label: "Free assessment" },
  ],
  Company: [
    { href: "/about", label: "About us" },
    { href: "/contact", label: "Contact" },
    { href: "/book", label: "Book a consultation" },
  ],
  Legal: [
    { href: "/privacy", label: "Privacy policy" },
    { href: "/terms", label: "Terms of service" },
    { href: "/guarantee-terms", label: "Grade guarantee terms" },
  ],
} as const;
