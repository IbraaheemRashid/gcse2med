import type { QuestionBank } from "./types";

/** PLACEHOLDER BANK — see biology-gcse.ts. Replace `questions` with the real set. */
export const bank: QuestionBank = {
  subject: "chemistry",
  level: "a-level",
  intro:
    "Six questions across periodicity, shapes of molecules, equilibria, organic synthesis, kinetics and gas volumes.",
  questions: [
    {
      id: "chem-a-1",
      topic: "Periodicity",
      difficulty: "core",
      stem: "Which of these elements has the largest first ionisation energy?",
      options: [
        "Sodium",
        "Magnesium",
        "Aluminium",
        "Silicon",
      ],
      correctIndex: 3,
      explanation:
        "First ionisation energy generally increases across a period as nuclear charge rises and atomic radius falls, so silicon is highest of these four. Note the dip at aluminium, which is lower than magnesium because its outer electron is in a 3p sub-shell.",
      probes: "knowledge",
    },
    {
      id: "chem-a-2",
      topic: "Shapes of molecules",
      difficulty: "core",
      stem: "What are the shape and bond angle of an ammonia molecule, NH₃?",
      options: [
        "Trigonal planar, 120°",
        "Tetrahedral, 109.5°",
        "Trigonal pyramidal, 107°",
        "Bent, 104.5°",
      ],
      correctIndex: 2,
      explanation:
        "Nitrogen has three bonding pairs and one lone pair. The lone pair repels more strongly, closing the angle from 109.5° to about 107° and giving a trigonal pyramidal shape. 104.5° is water, which has two lone pairs.",
      probes: "knowledge",
    },
    {
      id: "chem-a-3",
      topic: "Equilibria",
      difficulty: "core",
      stem: "For a reaction where the forward direction is exothermic, what is the effect of increasing the temperature?",
      options: [
        "The equilibrium shifts left and the yield decreases",
        "The equilibrium shifts right and the yield increases",
        "The position of equilibrium is unchanged, but the rate increases",
        "The value of Kc increases",
      ],
      correctIndex: 0,
      explanation:
        "By Le Chatelier's principle the system opposes the change by favouring the endothermic direction — the reverse reaction — so yield falls and Kc decreases. The rate does increase, but that is a separate point from the position of equilibrium, and confusing the two is a very common way to lose marks here.",
      probes: "exam",
    },
    {
      id: "chem-a-4",
      topic: "Organic synthesis",
      difficulty: "core",
      stem: "Which reagent and conditions convert a primary alcohol into a carboxylic acid?",
      options: [
        "Acidified potassium dichromate(VI), distilled off immediately",
        "Sodium borohydride in aqueous solution",
        "Concentrated sulfuric acid at 170 °C",
        "Acidified potassium dichromate(VI), heated under reflux",
      ],
      correctIndex: 3,
      explanation:
        "Reflux keeps the mixture in contact with the oxidising agent so oxidation goes all the way to the carboxylic acid. Distilling immediately removes the aldehyde before it can be oxidised further — the conditions, not the reagent, decide the product.",
      probes: "exam",
    },
    {
      id: "chem-a-5",
      topic: "Kinetics",
      difficulty: "foundation",
      stem: "In a multi-step mechanism, the rate-determining step is:",
      options: [
        "The first step, whatever its rate",
        "The fastest step",
        "The slowest step",
        "The step that produces the most product",
      ],
      correctIndex: 2,
      explanation:
        "The slowest step limits the overall rate, and only species involved up to and including it appear in the rate equation. It is often but not always the first step.",
      probes: "knowledge",
    },
    {
      id: "chem-a-6",
      topic: "Amount of substance",
      difficulty: "core",
      stem: "What volume does 0.50 mol of a gas occupy at room temperature and pressure? (Molar gas volume = 24 dm³ mol⁻¹)",
      options: [
        "4.8 dm³",
        "12 dm³",
        "24 dm³",
        "48 dm³",
      ],
      correctIndex: 1,
      explanation:
        "volume = moles × molar gas volume = 0.50 × 24 = 12 dm³. Dividing instead of multiplying gives 48 — worth a quick sanity check that half a mole occupies less than a whole mole, not more.",
      probes: "careless",
    },
  ],
};
