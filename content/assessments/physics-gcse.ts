import type { QuestionBank } from "./types";

/** PLACEHOLDER BANK — see biology-gcse.ts. Replace `questions` with the real set. */
export const bank: QuestionBank = {
  subject: "physics",
  level: "gcse",
  intro:
    "Six questions across energy, electricity, forces, waves, units and radioactivity.",
  questions: [
    {
      id: "phys-g-1",
      topic: "Energy",
      difficulty: "foundation",
      stem: "Which equation gives the kinetic energy of a moving object?",
      options: [
        "E = mv",
        "E = mgh",
        "E = ½mv²",
        "E = ½kx²",
      ],
      correctIndex: 2,
      explanation:
        "Kinetic energy = ½ × mass × speed². E = mgh is gravitational potential energy and ½kx² is elastic potential energy — knowing which is which is half the marks on an energy question.",
      probes: "knowledge",
    },
    {
      id: "phys-g-2",
      topic: "Electricity",
      difficulty: "foundation",
      stem: "In a series circuit, which quantity is the same at every point?",
      options: [
        "Current",
        "Potential difference",
        "Resistance",
        "Power",
      ],
      correctIndex: 0,
      explanation:
        "Current is the same everywhere in a series circuit; potential difference is shared between the components. In a parallel circuit it is the other way round.",
      probes: "knowledge",
    },
    {
      id: "phys-g-3",
      topic: "Forces and motion",
      difficulty: "core",
      stem: "A car travels 150 m in 10 s. What is its average speed?",
      options: [
        "1.5 m/s",
        "15 m/s",
        "150 m/s",
        "1500 m/s",
      ],
      correctIndex: 1,
      explanation:
        "speed = distance ÷ time = 150 ÷ 10 = 15 m/s.",
      probes: "knowledge",
    },
    {
      id: "phys-g-4",
      topic: "Waves",
      difficulty: "core",
      stem: "A wave has a frequency of 50 Hz and a wavelength of 2 m. What is its speed?",
      options: [
        "0.04 m/s",
        "25 m/s",
        "52 m/s",
        "100 m/s",
      ],
      correctIndex: 3,
      explanation:
        "wave speed = frequency × wavelength = 50 × 2 = 100 m/s. Dividing instead of multiplying gives 25, which is the most common wrong answer here.",
      probes: "careless",
    },
    {
      id: "phys-g-5",
      topic: "Units",
      difficulty: "core",
      stem: "A student calculates a power of 2 kW and writes the answer as '2000 J'. What is wrong?",
      options: [
        "Nothing — joules and watts are interchangeable",
        "The conversion is wrong; 2 kW is 200 J",
        "Power is measured in watts, not joules — it should be 2000 W",
        "Power should be given in newtons",
      ],
      correctIndex: 2,
      explanation:
        "The number is right and the unit is wrong: 2 kW = 2000 W. A joule is energy; a watt is a joule per second. Marks lost this way are careless marks, and they are the easiest ones to stop losing.",
      probes: "careless",
    },
    {
      id: "phys-g-6",
      topic: "Radioactivity",
      difficulty: "stretch",
      stem: "An isotope has a half-life of 5 years. What fraction of the original nuclei remain after 15 years?",
      options: [
        "1/2",
        "1/3",
        "1/8",
        "1/16",
      ],
      correctIndex: 2,
      explanation:
        "15 years is three half-lives: 1 → ½ → ¼ → ⅛. Answering 1/3 comes from dividing 15 by 5 and using it directly, rather than counting halvings.",
      probes: "exam",
    },
  ],
};
