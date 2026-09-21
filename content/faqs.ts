export type Faq = { question: string; answer: string };

export const pricingFaqs: Faq[] = [
  {
    question: "How big are the groups, really?",
    answer:
      "Eight students on Essential, six on Success, four on Excellence — those are hard caps, not averages. It is the single biggest reason a student gets noticed in a lesson rather than sitting quietly at the back of a webinar with two hundred others.",
  },
  {
    question: "Can we change tier or subject later?",
    answer:
      "Please speak to us about changing subjects or support. Places are limited, and Success and Excellence are not currently accepting new students. We can discuss availability during your consultation.",
  },
  {
    question: "What happens in the free consultation?",
    answer:
      "A free 30-minute video call with the founders, student and parent. We ask about where your child is now, what they find hardest, and what you want by results day. If we are not the right fit, we will say so.",
  },
  {
    question: "Do you cover our exam board?",
    answer:
      "We teach AQA, Edexcel and OCR. Lesson slides and summary sheets are mapped to the board your child sits, so nothing they are given is off-specification.",
  },
  {
    question: "How do you report progress to parents?",
    answer:
      "Success and Excellence include a parent dashboard and regular progress reviews. You see assessment scores, topic-level strengths and weaknesses, and what we are doing about the weak areas — not a one-line 'doing well'.",
  },
  {
    question: "What does the Grade A guarantee actually cover?",
    // NOTE(client): Excellence is closed to new students, so this has to say so
    // — the guarantee is real but not currently purchasable. Reword when the
    // tier reopens (content/tiers.ts, `accepting`).
    answer:
      "It applies to the Excellence tier, and is subject to conditions on attendance, homework completion and how long the student has been with us. Excellence is not taking new students at the moment, so the guarantee is not something you can buy into today — we would rather say that plainly than let it read as an offer. The full terms are set out on our grade guarantee page.",
  },
  {
    question: "Is there a contract or a minimum term?",
    answer:
      "We will explain the available payment options and any minimum term during your consultation, before you decide to enrol.",
  },
];

export const assessmentFaqs: Faq[] = [
  {
    question: "How long does the assessment take?",
    answer:
      "Around ten minutes. It is multiple choice, and it is designed to find the gaps quickly rather than to be an exam.",
  },
  {
    question: "Is it really free?",
    answer:
      "Yes. You get the score, every question your child got wrong with the correct answer explained, and the topics to work on — whether or not you ever book a lesson with us.",
  },
  {
    question: "Do I have to give an email address?",
    answer:
      "No. The results appear on screen the moment the assessment is submitted. The email is only there so you can keep a copy of the report.",
  },
];
