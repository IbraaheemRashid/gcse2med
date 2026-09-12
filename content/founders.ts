/**
 * The founders.
 *
 * DELIBERATELY EMPTY. These are factual claims about real people — their
 * background, their teaching, why they started this — and they are not ours to
 * invent. Yahiya and Weero are writing their own; paste them in here and both
 * the About page section and the homepage strip appear on their own.
 *
 * Until then every founder surface renders nothing at all, so the site reads as
 * complete rather than half-built.
 */

export type Founder = {
  id: string;
  name: string;
  /** e.g. "Co-founder" or "Co-founder & Biology lead". */
  role: string;
  /** One line, used on the compact homepage card. */
  strapline: string;
  /** Two or three short paragraphs, in their own words. */
  bio: string[];
  /**
   * Path under /public, e.g. "/images/yahiya.jpg". Left blank until a real
   * headshot exists — the card drops the image rather than showing a gap.
   */
  photo?: string;
  /** e.g. ["BSc Biomedical Science", "5 years teaching GCSE Biology"] */
  credentials?: string[];
};

// TODO(client): Yahiya and Weero are writing their own bios and sending headshots.
export const founders: Founder[] = [
  // {
  //   id: "yahiya",
  //   name: "Yahiya …",
  //   role: "Co-founder",
  //   strapline: "…",
  //   bio: ["…", "…"],
  //   photo: "/images/yahiya.jpg",
  //   credentials: ["…"],
  // },
];
