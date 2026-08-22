import "server-only";

import type { LevelId, SubjectId } from "../subjects";
import { assessmentKey } from "../subjects";
import type { QuestionBank } from "./types";

import { bank as biologyGcse } from "./biology-gcse";
import { bank as biologyALevel } from "./biology-a-level";
import { bank as chemistryGcse } from "./chemistry-gcse";
import { bank as chemistryALevel } from "./chemistry-a-level";
import { bank as physicsGcse } from "./physics-gcse";
import { bank as mathsGcse } from "./maths-gcse";

/**
 * Server-only registry of question banks.
 *
 * `import "server-only"` makes this a build error if a Client Component ever
 * imports it — which is the guarantee that `correctIndex` and `explanation`
 * never reach the browser before an attempt is submitted.
 */
const banks: QuestionBank[] = [
  biologyGcse,
  biologyALevel,
  chemistryGcse,
  chemistryALevel,
  physicsGcse,
  mathsGcse,
];

const byKey = new Map(
  banks.map((bank) => [assessmentKey(bank.subject, bank.level), bank]),
);

export function getBank(
  subject: SubjectId,
  level: LevelId,
): QuestionBank | undefined {
  return byKey.get(assessmentKey(subject, level));
}

export function listBankKeys(): string[] {
  return [...byKey.keys()];
}
