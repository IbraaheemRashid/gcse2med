"use client";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Field, inputClasses } from "@/components/ui/Field";
import { formatDate, percent, scoreClasses, type Paper } from "@/lib/paper-tracker";

function PaperEntry({paper:p,onEdit,onUpdate,onDelete}: {paper:Paper;onEdit:(p:Paper)=>void;onUpdate:(p:Paper)=>void;onDelete:(p:Paper)=>void}) {
  const [redo,setRedo] = useState(false);
  const [deleting,setDeleting] = useState(false);
  function saveRedo(event:FormEvent<HTMLFormElement>) {
    event.preventDefault();const raw = String(new FormData(event.currentTarget).get("redoScore") ?? "");
    onUpdate({...p,redo:1,redoScore:raw===""?undefined:Number(raw)});setRedo(false);
  }
  return <article aria-label={`${p.subj}: ${p.series} ${p.paper}`} className="border-t border-ink-200 py-5 first:border-t-0">
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><h3 className="font-bold text-brand-950">{p.subj}</h3>{p.ex===1 && <span className="rounded-full bg-accent-50 px-2 py-1 text-xs text-accent-900">Example</span>}</div><p className="mt-1 break-words text-sm">{p.board} · {p.series} · {p.paper}</p><p className="mt-1 text-xs text-ink-500">{formatDate(p.date)} · {p.tier}</p></div>
      <div className="flex items-center gap-3"><span className="text-sm tabular-nums text-ink-600">{p.score} / {p.total}</span><span className={`rounded-full px-3 py-1.5 text-lg font-bold ring-1 ring-inset ${scoreClasses(percent(p))}`}>{percent(p)}%</span></div>
    </div>
    <div className="mt-3 flex flex-wrap gap-2">{p.topics.map(t=><span key={t} className="max-w-full break-words rounded-lg bg-ink-50 px-2.5 py-1.5 text-xs text-ink-700">{t}</span>)}{!p.topics.length && <span className="text-xs text-ink-500">No topics flagged</span>}</div>
    <div className="mt-4 flex flex-wrap items-center gap-2">
      <Button size="sm" variant="secondary" aria-pressed={Boolean(p.redo)} onClick={()=>{if(p.redo)onUpdate({...p,redo:0,redoScore:undefined});else setRedo(!redo);}}>{p.redo?`Redone${p.redoScore!==undefined?` · ${Math.round(p.redoScore/p.total*100)}%`:""} — undo`:"Record a redo"}</Button>
      {p.redoScore!==undefined && <span className="text-xs text-ink-600">{Math.round(p.redoScore/p.total*100)-percent(p)>=0?"+":""}{Math.round(p.redoScore/p.total*100)-percent(p)} percentage points</span>}
      <Button size="sm" variant="ghost" onClick={()=>onEdit(p)}>Edit</Button>
      <Button size="sm" variant="ghost" onClick={()=>setDeleting(!deleting)}>Remove</Button>
    </div>
    {redo && !p.redo && <form onSubmit={saveRedo} className="mt-4 flex flex-wrap items-end gap-3 rounded-lg bg-brand-50 p-4"><Field label={`Redo mark (out of ${p.total})`} optional><input name="redoScore" type="number" step="any" min="0" max={p.total} className={inputClasses}/></Field><Button type="submit" size="sm">Save redo</Button><Button type="button" size="sm" variant="secondary" onClick={()=>setRedo(false)}>Cancel</Button></form>}
    {deleting && <div className="mt-4 rounded-lg bg-flag-50 p-4"><p className="text-sm text-flag-900">Remove this paper from your tracker?</p><div className="mt-3 flex flex-wrap gap-2"><Button size="sm" variant="secondary" onClick={()=>onDelete(p)}>Remove paper</Button><Button size="sm" variant="ghost" onClick={()=>setDeleting(false)}>Keep paper</Button></div></div>}
  </article>;
}
export function PaperLog({papers,subject,onEdit,onUpdate,onDelete}: {papers:Paper[];subject:string;onEdit:(p:Paper)=>void;onUpdate:(p:Paper)=>void;onDelete:(p:Paper)=>void}) {
  const [showAll,setShowAll] = useState(false);
  const sorted = [...papers].sort((a,b)=>b.date.localeCompare(a.date));
  return <section className="rounded-card border border-ink-200 bg-white p-5 sm:p-7" aria-labelledby="paper-log-title"><div className="flex flex-wrap justify-between gap-3"><h2 id="paper-log-title" className="text-2xl font-bold">Your papers</h2><p className="text-sm text-ink-500">{subject === "All" ? "All subjects" : subject} · {papers.length} papers</p></div><p className="mt-2 text-sm text-ink-600">Green: 70% or more. Yellow: 50–69%. Red: below 50%. Grade boundaries vary by paper.</p><div className="mt-4">{(showAll?sorted:sorted.slice(0,8)).map(p=><PaperEntry key={p.id} paper={p} onEdit={onEdit} onUpdate={onUpdate} onDelete={onDelete}/>)}</div>{!papers.length&&<p className="py-8 text-ink-500">No papers yet. Add your first paper above.</p>}{papers.length>8&&<Button variant="secondary" className="mt-4" onClick={()=>setShowAll(!showAll)}>{showAll?"Show latest 8":"Show all "+papers.length+" papers"}</Button>}</section>;
}
