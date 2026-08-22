import type { QuestionBank } from "./types";

/**
 * PLACEHOLDER BANK — the client is finalising the real questions. The engine
 * reads banks purely as data, so replacing the `questions` array below is the
 * whole job; no code changes are needed.
 */
export const bank: QuestionBank = {
  subject: "biology",
  level: "gcse",
  intro:
    "Six questions across cells, enzymes, transport, homeostasis, inheritance and ecology.",
  questions: [
    {
      id: "bio-g-1",
      topic: "Cell biology",
      difficulty: "foundation",
      stem: "Which structure controls what enters and leaves an animal cell?",
      options: [
        "Nucleus",
        "Cell wall",
        "Mitochondrion",
        "Cell membrane",
      ],
      correctIndex: 3,
      explanation:
        "The cell membrane is partially permeable and controls movement in and out of the cell. Animal cells do not have a cell wall — that is a plant, algal, fungal and bacterial feature.",
      probes: "knowledge",
    },
    {
      id: "bio-g-2",
      topic: "Enzymes",
      difficulty: "core",
      stem: "An enzyme stops working after being heated to 70 °C. What has happened to it?",
      options: [
        "It has been used up in the reaction",
        "It has been converted into its substrate",
        "Its active site has changed shape, so the substrate no longer fits",
        "It has run out of activation energy",
      ],
      correctIndex: 2,
      explanation:
        "High temperature breaks the bonds holding the enzyme's tertiary structure, so the active site changes shape — the enzyme is denatured and the substrate is no longer complementary to it. Enzymes are catalysts, so they are never used up.",
      probes: "knowledge",
    },
    {
      id: "bio-g-3",
      topic: "Transport in cells",
      difficulty: "core",
      stem: "Which of these best describes osmosis?",
      options: [
        "The movement of water from a dilute to a concentrated solution through a partially permeable membrane",
        "The movement of any substance from a high to a low concentration",
        "The movement of dissolved minerals against a concentration gradient",
        "The movement of water from a concentrated to a dilute solution using energy from respiration",
      ],
      correctIndex: 0,
      explanation:
        "Osmosis is specifically the movement of water, down its own concentration gradient — from a dilute solution (high water concentration) to a concentrated one — across a partially permeable membrane. It is passive, so no energy from respiration is needed; that would be active transport.",
      probes: "exam",
    },
    {
      id: "bio-g-4",
      topic: "Homeostasis",
      difficulty: "foundation",
      stem: "Which hormone lowers blood glucose concentration?",
      options: [
        "Glucagon",
        "Adrenaline",
        "Insulin",
        "Thyroxine",
      ],
      correctIndex: 2,
      explanation:
        "Insulin, released from the pancreas, causes body cells to take up glucose and the liver to store it as glycogen — lowering blood glucose. Glucagon does the opposite. The two are easy to mix up because the names are so similar, so this is a mark worth protecting.",
      probes: "careless",
    },
    {
      id: "bio-g-5",
      topic: "Inheritance",
      difficulty: "core",
      stem: "Two parents are both heterozygous for a characteristic (Bb × Bb). What proportion of the offspring would be expected to show the recessive phenotype?",
      options: [
        "0%",
        "25%",
        "50%",
        "75%",
      ],
      correctIndex: 1,
      explanation:
        "A Punnett square for Bb × Bb gives BB, Bb, Bb, bb. Only bb shows the recessive phenotype — 1 in 4, so 25%. The common slip is answering 75%, which is the proportion showing the dominant phenotype.",
      probes: "exam",
    },
    {
      id: "bio-g-6",
      topic: "Ecology",
      difficulty: "stretch",
      stem: "Only about 10% of the energy in one trophic level is transferred to the next. Which is the best explanation?",
      options: [
        "Predators only ever eat around a tenth of the animals available to them",
        "Energy is destroyed as it passes along the food chain",
        "Producers convert only 10% of the light energy that falls on them",
        "Energy is lost as heat from respiration, and in waste and uneaten parts of the organism",
      ],
      correctIndex: 3,
      explanation:
        "Most of the energy taken in is used in respiration and lost as heat, with more lost in faeces, urine and parts that are not eaten. Energy cannot be destroyed, so that option is never right — a good example of a question where the wording of the answer is what earns the mark.",
      probes: "exam",
    },
  ],
};
