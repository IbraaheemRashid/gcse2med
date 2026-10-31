import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  async redirects() { return [
  {
    "source": "/resources/tools/past-paper-tracker.html",
    "destination": "/resources/past-paper-tracker",
    "permanent": false
  },
  {
    "source": "/resources/tools/maths-question-generator.html",
    "destination": "/resources/maths/question-generator",
    "permanent": false
  },
  {
    "source": "/resources/flashcards/biology.html",
    "destination": "/resources/biology/flashcards",
    "permanent": false
  },
  {
    "source": "/resources/flashcards/chemistry.html",
    "destination": "/resources/chemistry/flashcards",
    "permanent": false
  },
  {
    "source": "/resources/flashcards/physics.html",
    "destination": "/resources/physics/flashcards",
    "permanent": false
  },
  {
    "source": "/assessments/biology.html",
    "destination": "/assessment/biology/gcse",
    "permanent": false
  },
  {
    "source": "/assessments/chemistry.html",
    "destination": "/assessment/chemistry/gcse",
    "permanent": false
  },
  {
    "source": "/assessments/physics.html",
    "destination": "/assessment/physics/gcse",
    "permanent": false
  },
  {
    "source": "/assessments/maths.html",
    "destination": "/assessment/maths/gcse",
    "permanent": false
  }
]; },
};
export default nextConfig;
