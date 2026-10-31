import { z } from "zod";
import catalogue from "../content/paper-tracker-catalogue.json" with { type: "json" };

export const STORAGE_KEY = "gcse2med-papers-v1";
export const trackerSubjects = ["Maths", "Biology", "Chemistry", "Physics", "Combined Science", "English Language", "Other"];
export const tiers = ["Higher", "Foundation", "No tier"];
export const intervals = [3, 7, 16, 35, 70, 120];
const dateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine(s => {
  const d = new Date(s + "T12:00:00Z");
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === s;
});
const text = z.string().trim().min(1).max(200);
export const paperSchema = z.object({
  id: z.union([z.number().finite(), z.string().min(1).max(100)]),
  subj: text, board: text, series: text, paper: text, tier: text, date: dateSchema,
  score: z.number().finite().min(0), total: z.number().finite().positive(),
  topics: z.array(text).max(200), redo: z.union([z.literal(0), z.literal(1)]).default(0),
  redoScore: z.number().finite().min(0).optional(), ex: z.literal(1).optional(),
}).refine(p => p.score <= p.total && (p.redoScore === undefined || p.redoScore <= p.total), "Marks cannot exceed the total.");
const reviewSchema = z.union([dateSchema.transform(last => ({ last, stage: 0 })), z.object({last: dateSchema, stage: z.number().int().min(0).max(1000)})]);
export const trackerSchema = z.object({
  papers: z.array(paperSchema).max(10000),
  mastered: z.record(z.string(), reviewSchema).default({}),
  lastBackup: dateSchema.optional(),
}).refine(d => new Set(d.papers.map(p => String(p.id))).size === d.papers.length, "Duplicate paper IDs.");
export type Paper = z.infer<typeof paperSchema>;
export type TrackerData = z.infer<typeof trackerSchema>;
export type Topic = {key: string; name: string; subject: string; count: number; last: string; state: "fresh" | "due" | "resting"; next: string | null; stage: number};

export function today() { return new Intl.DateTimeFormat("en-CA", {timeZone: "Europe/London"}).format(new Date()); }
export function formatDate(date: string) { return new Date(date + "T12:00:00Z").toLocaleDateString("en-GB", {day: "numeric", month: "short", year: "numeric", timeZone: "Europe/London"}); }
export function percent(p: Paper) { return Math.round(p.score / p.total * 100); }
export function scoreClasses(score: number) { return score >= 70 ? "bg-emerald-50 text-emerald-800 ring-emerald-200" : score >= 50 ? "bg-accent-50 text-accent-900 ring-accent-200" : "bg-flag-50 text-flag-800 ring-flag-200"; }
export function boardsFor(subject: string) { return ["AQA", "Edexcel", "OCR", ...(subject === "English Language" ? ["WJEC / Eduqas"] : []), "Other"]; }
type TopicGroup = {g: string; t: string[]};
const topics = catalogue as Record<string, Record<string, TopicGroup[]>>;
export function topicOptions(subject: string, board: string) {
  const forSubject = (s: string) => topics[s]?.[board] ?? topics[s]?._ ?? [];
  return (subject === "Combined Science" ? ["Biology", "Chemistry", "Physics"] : [subject]).flatMap(s => forSubject(s).map(group => ({
    label: subject === "Combined Science" ? `${s} · ${group.g}` : group.g,
    options: group.t.map(t => subject === "Combined Science" ? `${s}: ${t}` : t),
  })));
}
export function dueDate(last: string, stage: number) {
  const date = new Date(last + "T12:00:00Z");
  date.setUTCDate(date.getUTCDate() + intervals[Math.min(stage, intervals.length - 1)]);
  return date.toISOString().slice(0,10);
}
export function reviewTopics(data: TrackerData, day = today()): Topic[] {
  const found = new Map<string, Topic>();
  for (const paper of data.papers.filter(p => !p.redo)) for (const name of new Set(paper.topics)) {
    const key = `${paper.subj}|${name.toLowerCase()}`;
    const entry = found.get(key) ?? {key, name, subject: paper.subj, count: 0, last: "", state: "fresh", next: null, stage: 0};
    entry.count++;
    if (paper.date > entry.last) entry.last = paper.date;
    found.set(key, entry);
  }
  for (const topic of found.values()) {
    const review = data.mastered[topic.key];
    if (!review || topic.last > review.last) continue;
    topic.next = dueDate(review.last, review.stage);
    topic.state = day >= topic.next ? "due" : "resting";
    topic.stage = review.stage + 1;
  }
  return [...found.values()].sort((a,b) => Number(b.state === "due") - Number(a.state === "due") || b.count - a.count || a.name.localeCompare(b.name));
}
export function progressSummary(data: TrackerData) {
  const topics = reviewTopics(data);
  const due = topics.filter(t => t.state === "due").length;
  return ["My GCSE2MED past paper progress", ...(due ? [`${due} topics due for review`] : []), ...[...new Set(data.papers.map(p => p.subj))].map(subject => {
    const list = data.papers.filter(p => p.subj === subject).sort((a,b) => a.date.localeCompare(b.date));
    const latest = list[list.length-1];
    const fix = topics.filter(t => t.subject === subject && t.state !== "resting").slice(0,4);
    return `${subject}: ${list.length} papers, latest ${percent(latest)}% (${latest.series} ${latest.paper})${fix.length ? "\n  To revisit: " + fix.map(t => t.name + (t.state === "due" ? " (due)" : "")).join(", ") : ""}`;
  })].join("\n");
}
export function encodeBackup(data: TrackerData) {
  const bytes = new TextEncoder().encode(JSON.stringify(data));
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return "G2M1:" + btoa(binary);
}
export function decodeBackup(code: string): TrackerData {
  if (!code.startsWith("G2M1:") || code.length > 12_000_000) throw new Error("Paste a complete GCSE2MED backup code.");
  const bytes = Uint8Array.from(atob(code.slice(5)), c => c.charCodeAt(0));
  return trackerSchema.parse(JSON.parse(new TextDecoder("utf-8", {fatal:true}).decode(bytes)));
}
export function mergeBackup(current: TrackerData, backup: TrackerData): TrackerData {
  const papers = current.papers.filter(p => !p.ex);
  const ids = new Set(papers.map(p => String(p.id)));
  for (const paper of backup.papers) if (!ids.has(String(paper.id))) { papers.push(paper); ids.add(String(paper.id)); }
  const mastered = {...current.mastered};
  for (const [key, review] of Object.entries(backup.mastered)) if (!mastered[key] || review.last > mastered[key].last) mastered[key] = review;
  return trackerSchema.parse({papers, mastered, lastBackup: today()});
}
