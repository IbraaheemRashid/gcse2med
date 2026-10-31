import examples from "@/content/paper-tracker-examples.json";
import { compactExamples, STORAGE_KEY, trackerSchema, type TrackerData } from "@/lib/paper-tracker";

type Snapshot = { ready: boolean; data: TrackerData; warning: string; blocked: boolean };
const server: Snapshot = {ready: false, data: {papers: [], mastered: {}}, warning: "", blocked: false};
let cache: Snapshot | undefined;
const listeners = new Set<() => void>();
function read(): Snapshot {
  let raw: string | null;
  try { raw = localStorage.getItem(STORAGE_KEY); }
  catch { return {ready:true, data: trackerSchema.parse(examples), warning:"This browser cannot save your progress. Keep a backup before closing the page.", blocked:false}; }
  if (!raw) return {ready:true, data:trackerSchema.parse(examples), warning:"", blocked:false};
  try { return {ready:true, data:compactExamples(trackerSchema.parse(JSON.parse(raw))), warning:"", blocked:false}; }
  catch { return {ready:true, data:{papers:[],mastered:{}}, warning:"We couldn’t read the saved tracker data. It has been left untouched. Restore a valid backup to continue.", blocked:true}; }
}
export function getSnapshot() { return cache ??= read(); }
export function getServerSnapshot() { return server; }
export function subscribe(listener: () => void) {
  listeners.add(listener);
  const storage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY || event.key === null) { cache = read(); listeners.forEach(fn => fn()); }
  };
  window.addEventListener("storage", storage);
  return () => { listeners.delete(listener); window.removeEventListener("storage", storage); };
}
export function save(data: TrackerData) {
  const validated = compactExamples(trackerSchema.parse(data));
  let warning = "";
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(validated)); }
  catch { warning = "Your changes are only in memory: this browser could not save them. Copy or download a backup before leaving."; }
  cache = {ready:true, data:validated, warning, blocked:false};
  listeners.forEach(fn => fn());
}
