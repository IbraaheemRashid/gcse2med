/**
 * Parent and student reviews.
 *
 * DELIBERATELY EMPTY. Testimonials must be real — inventing them would mislead
 * parents and, since the DMCC Act 2024, fake reviews are unlawful in the UK.
 * Add genuine ones here as they come in; the section renders a holding state
 * until then and appears in full as soon as this array is non-empty.
 *
 * Later this array is replaced by the Trustpilot feed. `ReviewsSection` reads
 * only from this shape, so that swap is a data change, not a layout change.
 */

export type Review = {
  id: string;
  quote: string;
  /** e.g. "Sarah T." — first name and initial is enough, and safer for minors. */
  author: string;
  /** e.g. "Parent of a Year 11 student" */
  relation: string;
  subject?: string;
  rating?: 1 | 2 | 3 | 4 | 5;
  /** Path under /public for a screenshot of the original message. */
  screenshot?: string;
};

export const reviews: Review[] = [
  // {
  //   id: "1",
  //   quote: "…",
  //   author: "Sarah T.",
  //   relation: "Parent of a Year 11 student",
  //   subject: "GCSE Biology",
  //   rating: 5,
  // },
];

/** Set once the Trustpilot business unit exists; shows the "verified" line. */
export const trustpilotUrl = "";
