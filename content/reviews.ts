/**
 * Excerpts transcribed from the student messages supplied on 15 September 2026.
 * These are direct-message testimonials, not Trustpilot-verified reviews.
 * Screenshots 1 and 4 are the same student; represented once below.
 * Screenshots 6 and 8 report results or ask for advice, so are not testimonials.
 * Original screenshots are not published: they include avatars and unrelated chats.
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
  {
    id: "marva-gcse",
    author: "Marva",
    relation: "GCSE student · tuition feedback",
    quote: "You made learning enjoyable and gave me the confidence I needed to succeed.",
  },
  {
    id: "physics-lives",
    author: "Mr Barry",
    relation: "Student · TikTok live sessions",
    subject: "Physics",
    quote: "5 stars, genuinely those physics sessions made me fall in love with physics and caused me to revise it more leading to why I got a 9 in physics thx so much",
    rating: 5,
  },
  {
    id: "fati-science",
    author: "Fati",
    relation: "Student · teaching feedback",
    subject: "Science",
    quote: "They explained everything clearly and patiently, which helped me understand topics that I previously found difficult. Their way of teaching made complicated concepts much easier to understand, and I felt more confident with my science work.",
  },
  {
    id: "bea-edexcel",
    author: "Bea",
    relation: "Student · live revision sessions",
    subject: "Edexcel Science",
    quote: "Sir I got a 99, thank you for all the lives, I used to watch them before revising and while walking home from school they were super helpful!",
  },
  {
    id: "maths-science-lives",
    author: "Student",
    relation: "Live revision sessions",
    subject: "Maths & Science",
    quote: "I am very thankful for the lives that gcse2med did where they went through past papers and explained each part thoroughly. It allowed me to go up over 30 marks in maths and 25 on average in each science allowing me to push for higher grades.",
  },
];

/** Optional link to the business profile when available. */
export const trustpilotUrl = "";

/**
 * Trustpilot business unit ID. Set this and the live Trustpilot widget replaces
 * the holding state — no code change needed, which is the point: the widget is
 * already wired up and waiting for the ID.
 *
 * Find it in the Trustpilot Business dashboard under Integrations > TrustBox.
 */
export const trustpilotBusinessUnitId =
  process.env.NEXT_PUBLIC_TRUSTPILOT_BUSINESS_UNIT_ID ?? "";
