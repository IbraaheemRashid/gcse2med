"use client";
import { useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Field, inputClasses, checkboxClasses } from "@/components/ui/Field";
import { boardsFor, paperSchema, tiers, today, topicOptions, trackerSubjects, type Paper } from "@/lib/paper-tracker";

export function PaperForm({paper, onSave, onCancel}: {paper?:Paper; onSave:(paper:Paper)=>void; onCancel:()=>void}) {
  const [subject,setSubject] = useState(paper?.subj ?? "Maths");
  const [board,setBoard] = useState(paper?.board ?? "AQA");
  const [selected,setSelected] = useState<string[]>(paper?.topics ?? []);
  const [query,setQuery] = useState("");
  const [expanded,setExpanded] = useState(false);
  const [error,setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const groups = topicOptions(subject,board).map(g => ({...g,options:g.options.filter(t=>t.toLowerCase().includes(query.toLowerCase()))})).filter(g=>g.options.length);
  function toggle(value:string) { setSelected(previous=>previous.includes(value)?previous.filter(t=>t!==value):[...previous,value]); }
  function submit(event:FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const topicList = [...selected];
    const total = Number(form.get("total"));
    const parsed = paperSchema.safeParse({
      ...paper, id:paper?.id ?? crypto.randomUUID(),subj:subject,board,
      series:String(form.get("series")||"Past paper").trim() || "Past paper",
      paper:String(form.get("paper")||"Paper").trim() || "Paper",
      tier:form.get("tier"),date:form.get("date"),score:Number(form.get("score")),total,topics:topicList,
      redo:paper?.redo ?? 0, ex:undefined,
      ...(paper?.redoScore !== undefined ? {redoScore:Math.min(paper.redoScore,total)} : {}),
    });
    if(!parsed.success) {setError("Check your marks: the total must be positive and your mark cannot exceed it. Use a valid date and keep topic names under 200 characters.");return;}
    if(parsed.data.date>today()){setError("Choose today or an earlier date.");return;}
    onSave(parsed.data);setError("");setSelected([]);setQuery("");setExpanded(false);
    if(!paper) {formRef.current?.reset();setSubject("Maths");setBoard("AQA");}
  }
  return <section id="log-paper" aria-labelledby="paper-form-title" className="scroll-mt-24 rounded-card border border-ink-200 bg-white p-5 sm:p-7">
    <h2 id="paper-form-title" className="text-2xl font-bold">{paper ? "Edit paper" : "Log a paper"}</h2>
    <p className="mt-2 text-sm text-ink-600">Mark it with the official mark scheme, then record how it went.</p>
    <form ref={formRef} onSubmit={submit} className="mt-6 space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Subject"><select value={subject} onChange={e=>{setSubject(e.target.value);setBoard("AQA");setSelected([]);setQuery("");}} className={inputClasses}>{[...new Set([...trackerSubjects,subject])].map(s=><option key={s}>{s}</option>)}</select></Field>
        <Field label="Exam board"><select value={board} onChange={e=>{setBoard(e.target.value);setSelected([]);setQuery("");}} className={inputClasses}>{[...new Set([...boardsFor(subject),board])].map(b=><option key={b}>{b}</option>)}</select></Field>
        <Field label="Exam series" optional><input name="series" defaultValue={paper?.series} maxLength={200} placeholder="June 2026" className={inputClasses}/></Field>
        <Field label="Paper" optional><input name="paper" defaultValue={paper?.paper} maxLength={200} placeholder="Paper 1" className={inputClasses}/></Field>
        <Field label="Tier"><select name="tier" defaultValue={paper?.tier ?? "Higher"} className={inputClasses}>{[...new Set([...tiers,...(paper?[paper.tier]:[])])].map(t=><option key={t}>{t}</option>)}</select></Field>
        <Field label="Date completed"><input type="date" name="date" required max={today()} defaultValue={paper?.date ?? today()} className={inputClasses}/></Field>
        <Field label="Your mark"><input name="score" type="number" inputMode="decimal" step="any" min="0" required defaultValue={paper?.score} className={inputClasses}/></Field>
        <Field label="Total marks"><input name="total" type="number" inputMode="decimal" step="any" min="0.01" required defaultValue={paper?.total} placeholder="80" className={inputClasses}/></Field>
      </div>
      <div>
        <Field label="Topics to revisit" optional><input value={query} onChange={e=>{setQuery(e.target.value);setExpanded(true);}} onFocus={()=>setExpanded(true)} maxLength={200} placeholder="Search topics or add your own" className={inputClasses} onKeyDown={e=>{if(e.key==="Enter"){e.preventDefault();if(query.trim()){if(!selected.some(t=>t.toLowerCase()===query.trim().toLowerCase()))setSelected([...selected,query.trim()]);setQuery("");}}if(e.key==="Escape")setExpanded(false);}}/></Field>
        <div className="mt-3 flex flex-wrap gap-2">{selected.map(t=><button key={t} type="button" onClick={()=>toggle(t)} aria-label={`Remove topic ${t}`} className="min-h-10 max-w-full break-words rounded-full bg-brand-50 px-3 py-2 text-left text-sm text-brand-900">{t} <span aria-hidden="true">×</span></button>)}</div>
        <Button type="button" variant="ghost" size="sm" className="mt-2" aria-expanded={expanded} aria-controls="topic-choices" onClick={()=>setExpanded(!expanded)}>{expanded?"Hide topic choices":"Browse topic choices"}</Button>
        {expanded && <div id="topic-choices" className="mt-2 max-h-64 space-y-4 overflow-y-auto rounded-lg border border-ink-200 p-4">
          {query.trim() && !selected.some(t=>t.toLowerCase()===query.trim().toLowerCase()) && <Button type="button" variant="secondary" size="sm" onClick={()=>{setSelected([...selected,query.trim()]);setQuery("");}}>Add “{query.trim()}”</Button>}
          {groups.map(g=><fieldset key={g.label}><legend className="mb-2 text-sm font-bold text-brand-900">{g.label}</legend>{g.options.map(t=><label key={t} className="flex min-h-10 items-start gap-3 py-2 text-sm"><input type="checkbox" checked={selected.includes(t)} onChange={()=>toggle(t)} className={checkboxClasses}/><span>{t}</span></label>)}</fieldset>)}
          {!groups.length && <p className="text-sm text-ink-500">Type a topic name to add your own.</p>}
        </div>}
      </div>
      {error && <p role="alert" className="rounded-lg bg-flag-50 p-3 text-sm text-flag-800">{error}</p>}
      <div className="flex flex-wrap gap-3"><Button type="submit" variant="accent">{paper?"Update paper":"Add paper"}</Button>{paper && <Button type="button" variant="secondary" onClick={onCancel}>Cancel edit</Button>}</div>
    </form>
  </section>;
}
