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

// Subayr's full biography and founder portraits can be added when supplied.
export const founders: Founder[] = [
  {
    id: "yahiya",
    name: "Yahiya",
    role: "Co-Founder · Third-year medical student",
    strapline: "Giving students the support, direction and belief I wish I’d had earlier.",
    bio: [
      "I’m Yahiya, Co-Founder of GCSE2Med. I grew up in an area where going to university isn’t the norm, and I attended a school with limited resources. I worked hard and did well in my GCSEs, but when I moved to college, things changed. Despite being in a much better academic environment, my grades started to slip. I lost motivation, struggled to believe that I was capable of achieving highly and, honestly, didn’t really know how to revise properly.",
      "But I never gave up. I kept working, kept learning and eventually found my way into medicine. Now, as a third-year medical student, I’ve spent years learning about what actually makes studying effective, speaking to some of the highest-achieving students in the country and, alongside my studies, talking to and guiding almost 1,000 students about how they can make their own academic journey smoother.",
      "I’ve made plenty of mistakes along the way, and that’s taught me that doing well isn’t just about working harder. It’s about believing you’re capable, knowing how to work effectively and having someone there to guide you when you don’t know what to do next. That’s why I created GCSE2Med — to give students the support, direction and belief that I wish I’d had earlier.",
    ],
  },
  {
    id: "subayr",
    name: "Subayr",
    role: "Co-Founder",
    strapline: "I’m Subayr, the other half of GCSE2Med.",
    bio: ["I’m Subayr, the other half of GCSE2Med."],
  },
];
