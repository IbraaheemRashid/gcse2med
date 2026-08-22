import type { QuestionBank } from "./types";

/** PLACEHOLDER BANK — see biology-gcse.ts. Replace `questions` with the real set. */
export const bank: QuestionBank = {
  subject: "chemistry",
  level: "gcse",
  intro:
    "Six questions across atomic structure, bonding, quantitative chemistry, rates and acids.",
  questions: [
    {
      id: "chem-g-1",
      topic: "Atomic structure",
      difficulty: "foundation",
      stem: "What is the relative charge on a neutron?",
      options: [
        "+2",
        "+1",
        "0",
        "−1",
      ],
      correctIndex: 2,
      explanation:
        "Neutrons are neutral — relative charge 0, relative mass 1. Protons are +1 and electrons −1.",
      probes: "knowledge",
    },
    {
      id: "chem-g-2",
      topic: "Bonding",
      difficulty: "foundation",
      stem: "What type of bonding holds sodium chloride together?",
      options: [
        "Metallic",
        "Hydrogen",
        "Covalent",
        "Ionic",
      ],
      correctIndex: 3,
      explanation:
        "Sodium is a metal and chlorine a non-metal, so electrons are transferred rather than shared. The resulting Na⁺ and Cl⁻ ions are held in a giant lattice by strong electrostatic forces — ionic bonding.",
      probes: "knowledge",
    },
    {
      id: "chem-g-3",
      topic: "Quantitative chemistry",
      difficulty: "core",
      stem: "What is the relative formula mass (Mr) of carbon dioxide, CO₂? (Ar: C = 12, O = 16)",
      options: [
        "28",
        "32",
        "44",
        "56",
      ],
      correctIndex: 2,
      explanation:
        "12 + (2 × 16) = 44. The usual slip is forgetting that the subscript 2 applies to the oxygen, giving 28.",
      probes: "careless",
    },
    {
      id: "chem-g-4",
      topic: "Rates of reaction",
      difficulty: "core",
      stem: "Why does increasing the temperature increase the rate of a reaction?",
      options: [
        "Particles collide more frequently, and a greater proportion of collisions have energy above the activation energy",
        "The activation energy of the reaction is lowered",
        "There are more particles present in the same volume",
        "The concentration of the reactants increases",
      ],
      correctIndex: 0,
      explanation:
        "Two things happen: particles move faster so collide more often, and more of them exceed the activation energy. Only a catalyst lowers activation energy — swapping those two explanations is one of the most common ways to lose this mark.",
      probes: "exam",
    },
    {
      id: "chem-g-5",
      topic: "Acids and bases",
      difficulty: "core",
      stem: "What is produced when a metal carbonate reacts with a dilute acid?",
      options: [
        "A salt and hydrogen only",
        "A salt and water only",
        "A salt, hydrogen and carbon dioxide",
        "A salt, water and carbon dioxide",
      ],
      correctIndex: 3,
      explanation:
        "Metal carbonate + acid → salt + water + carbon dioxide. It is the metal + acid reaction that gives off hydrogen, and metal oxide or hydroxide + acid that gives just a salt and water.",
      probes: "knowledge",
    },
    {
      id: "chem-g-6",
      topic: "Moles",
      difficulty: "stretch",
      stem: "How many moles are there in 4.0 g of sodium hydroxide, NaOH? (Mr = 40)",
      options: [
        "0.01 mol",
        "0.1 mol",
        "1.0 mol",
        "10 mol",
      ],
      correctIndex: 1,
      explanation:
        "moles = mass ÷ Mr = 4.0 ÷ 40 = 0.1 mol. Getting 10 means the division was done the other way up — worth checking every time before writing the answer down.",
      probes: "careless",
    },
  ],
};
