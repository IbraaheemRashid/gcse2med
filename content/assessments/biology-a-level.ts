import type { QuestionBank } from "./types";

/** PLACEHOLDER BANK — see biology-gcse.ts. Replace `questions` with the real set. */
export const bank: QuestionBank = {
  subject: "biology",
  level: "a-level",
  intro:
    "Six questions across biological molecules, water potential, exchange, genetics, enzymes and respiration.",
  questions: [
    {
      id: "bio-a-1",
      topic: "Biological molecules",
      difficulty: "foundation",
      stem: "Which bond joins two amino acids together?",
      options: [
        "Glycosidic bond",
        "Ester bond",
        "Hydrogen bond",
        "Peptide bond",
      ],
      correctIndex: 3,
      explanation:
        "A condensation reaction between the amine group of one amino acid and the carboxyl group of another forms a peptide bond, releasing water. Glycosidic bonds join monosaccharides and ester bonds join glycerol to fatty acids.",
      probes: "knowledge",
    },
    {
      id: "bio-a-2",
      topic: "Water potential",
      difficulty: "core",
      stem: "What is the water potential of pure water at standard temperature and pressure?",
      options: [
        "+100 kPa",
        "−100 kPa",
        "0 kPa",
        "It depends on the volume",
      ],
      correctIndex: 2,
      explanation:
        "Pure water is defined as 0 kPa — the highest possible value. Adding solute always lowers it, which is why every solution has a negative water potential. Remembering that the scale runs downwards from zero prevents most sign errors here.",
      probes: "careless",
    },
    {
      id: "bio-a-3",
      topic: "Exchange surfaces",
      difficulty: "core",
      stem: "According to Fick's law, the rate of diffusion is proportional to which of the following?",
      options: [
        "Surface area × concentration difference ÷ thickness of the exchange surface",
        "Surface area × thickness of the exchange surface ÷ concentration difference",
        "Concentration difference ÷ (surface area × thickness)",
        "Surface area ÷ (concentration difference × thickness)",
      ],
      correctIndex: 0,
      explanation:
        "Rate ∝ (surface area × concentration difference) / thickness of the exchange surface. Thickness is on the bottom — a thinner surface means faster diffusion, which is why alveoli and villi are one cell thick.",
      probes: "exam",
    },
    {
      id: "bio-a-4",
      topic: "Genetics",
      difficulty: "core",
      stem: "Two organisms heterozygous at two unlinked loci are crossed (AaBb × AaBb). What phenotypic ratio is expected in the offspring?",
      options: [
        "3 : 1",
        "1 : 2 : 1",
        "1 : 1 : 1 : 1",
        "9 : 3 : 3 : 1",
      ],
      correctIndex: 3,
      explanation:
        "A dihybrid cross between two double heterozygotes gives 9 : 3 : 3 : 1 when the genes are unlinked and both show complete dominance. 1 : 2 : 1 is the genotypic ratio of a monohybrid cross.",
      probes: "knowledge",
    },
    {
      id: "bio-a-5",
      topic: "Enzymes",
      difficulty: "stretch",
      stem: "The effect of a competitive inhibitor on the rate of an enzyme-controlled reaction can be reduced by:",
      options: [
        "Lowering the temperature",
        "Increasing the inhibitor concentration",
        "Increasing the substrate concentration",
        "Lowering the enzyme concentration",
      ],
      correctIndex: 2,
      explanation:
        "A competitive inhibitor binds the active site, so more substrate makes it more likely that substrate rather than inhibitor occupies it. This is the key distinction from a non-competitive inhibitor, whose effect cannot be overcome this way.",
      probes: "exam",
    },
    {
      id: "bio-a-6",
      topic: "Respiration",
      difficulty: "core",
      stem: "Where in the cell does the link reaction take place?",
      options: [
        "The mitochondrial matrix",
        "The cytoplasm",
        "The inner mitochondrial membrane",
        "The outer mitochondrial membrane",
      ],
      correctIndex: 0,
      explanation:
        "Glycolysis is in the cytoplasm; the link reaction and Krebs cycle are in the mitochondrial matrix; oxidative phosphorylation happens on the inner membrane. Locating each stage correctly is often worth a mark on its own.",
      probes: "knowledge",
    },
  ],
};
