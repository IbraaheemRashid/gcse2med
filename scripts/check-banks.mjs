/**
 * Validates the assessment question banks.
 *
 * Run by `npm run check` alongside lint and typecheck. TypeScript proves the
 * shape is right; this proves the CONTENT is usable — the kind of thing that
 * type-checks perfectly and still makes the assessment worthless, such as every
 * correct answer sitting in the same position.
 *
 *   node --experimental-strip-types scripts/check-banks.mjs
 */
import { readdir } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const DIR = "content/assessments";
const SKIP = new Set(["types.ts", "index.ts"]);

const files = (await readdir(DIR)).filter((f) => f.endsWith(".ts") && !SKIP.has(f));
const problems = [];
const positions = new Map();
let questionCount = 0;

for (const file of files) {
  const { bank } = await import(pathToFileURL(path.resolve(DIR, file)).href);
  const label = `${bank.subject}/${bank.level}`;
  const seen = new Set();

  if (bank.questions.length === 0) problems.push(`${label}: bank is empty`);

  for (const question of bank.questions) {
    questionCount += 1;

    if (seen.has(question.id)) problems.push(`${label}: duplicate question id ${question.id}`);
    seen.add(question.id);

    if (question.options.length < 2) {
      problems.push(`${question.id}: needs at least two options`);
    }
    if (new Set(question.options).size !== question.options.length) {
      problems.push(`${question.id}: has duplicate options`);
    }
    if (
      !Number.isInteger(question.correctIndex) ||
      question.correctIndex < 0 ||
      question.correctIndex >= question.options.length
    ) {
      problems.push(`${question.id}: correctIndex ${question.correctIndex} is out of range`);
    }
    if (!question.explanation?.trim()) {
      problems.push(`${question.id}: missing an explanation — the report is built from these`);
    }
    if (!["knowledge", "exam", "careless"].includes(question.probes)) {
      problems.push(`${question.id}: probes must be knowledge, exam or careless`);
    }

    positions.set(question.correctIndex, (positions.get(question.correctIndex) ?? 0) + 1);
  }
}

// The failure that types cannot catch: if the correct answer is nearly always in
// the same slot, a student can score full marks without reading a question.
const worst = Math.max(...positions.values());
const share = worst / questionCount;
if (share > 0.5) {
  problems.push(
    `answer key is predictable: ${Math.round(share * 100)}% of correct answers sit in the same option position (max 50%)`,
  );
}

const spread = [...positions.entries()]
  .sort(([a], [b]) => a - b)
  .map(([index, count]) => `${index}:${count}`)
  .join("  ");

console.log(`${files.length} banks, ${questionCount} questions`);
console.log(`correct-answer positions  ${spread}`);

if (problems.length > 0) {
  console.error(`\n${problems.length} problem(s):`);
  for (const problem of problems) console.error(`  - ${problem}`);
  process.exit(1);
}
console.log("all banks OK");
