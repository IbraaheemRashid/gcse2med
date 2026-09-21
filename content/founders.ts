/** Founder biographies supplied by the founders; shared by Home and About. */

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

// Biographies supplied by the founders; **text** marks their chosen emphasis.
export const founders: Founder[] = [
  {
    id: "yahiya",
    name: "Yahiya",
    role: "Co-Founder · Third-year medical student",
    strapline: "Giving students the support, direction and belief I wish I’d had earlier.",
    bio: [
      "I didn’t have much guidance when it came to education, and going to university was rare where I grew up. I worked hard and did well at GCSE, but when I got to college, I struggled. I didn’t really know **how to study effectively**, and my grades started to slip.",
      "Over time, I learned what actually works, found my way into **medical school**, and have since spoken to and guided almost **1,000 students** on their academic journeys. **I created GCSE2MED to give students the guidance, support and confidence I wish I’d had earlier.**",
    ],
  },
  {
    id: "subayr",
    name: "Subayr",
    role: "Co-Founder",
    strapline: "Six years of tutoring, with guidance that helps every student reach their potential.",
    bio: [
      "Throughout school, I was fortunate to have great people around me who guided me, answered my questions and pushed me to believe I could achieve highly. That support played a huge role in helping me succeed academically and eventually make my way into medicine.",
      "I’ve been tutoring for around **six years**, working with students from different backgrounds and abilities. Over that time, I’ve learnt that every student learns differently, and sometimes the right explanation or guidance can make all the difference. **Now, as a medical student, I want to use what I’ve learnt from my own journey and years of tutoring to give students the guidance, support and confidence they need to reach their potential. That’s why I created GCSE2MED.**",
    ],
  },
];
