"use client";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { formatDate, type Topic } from "@/lib/paper-tracker";

export function TopicList({topics,dueOnly,onRevise,onRestore}: {
  topics:Topic[]; dueOnly:boolean; onRevise:(topic:Topic)=>void; onRestore:(topic:Topic)=>void;
}) {
  const [expanded,setExpanded]=useState(false);
  const active=topics.filter(t=>t.state!=="resting");
  const resting=topics.filter(t=>t.state==="resting");
  const visible=expanded?active:active.slice(0,5);
  return <div className="mt-5">
    {active.length>0 && <>
      <p className="mb-3 text-xs text-ink-500">{expanded?active.length:Math.min(5,active.length)} of {active.length} topics · due reviews first</p>
      <div id="active-review-topics" className={`space-y-2 ${expanded?"max-h-96 overflow-y-auto pr-2":""}`}>
        {visible.map(t=><div key={t.key} className={`flex flex-wrap items-center justify-between gap-2 rounded-lg p-3 ${t.state==="due"?"bg-accent-50":"bg-brand-50"}`}>
          <div className="min-w-0 flex-1"><p className="break-words text-sm font-semibold">{t.name}</p><p className="mt-1 text-xs text-ink-600">{t.subject} · {t.count} {t.count===1?"paper":"papers"}{t.state==="due"?" · Due now":""}</p></div>
          <Button size="sm" variant="secondary" aria-label={`Mark ${t.name} revised`} onClick={()=>onRevise(t)}>Revised ✓</Button>
        </div>)}
      </div>
      {active.length>5&&<Button variant="ghost" size="sm" className="mt-3" aria-expanded={expanded} aria-controls="active-review-topics" onClick={()=>setExpanded(!expanded)}>{expanded?"Show fewer topics":`View all ${active.length} topics`}</Button>}
    </>}
    {!active.length&&<p className="text-sm text-ink-500">{dueOnly?"Nothing is due for review right now.":resting.length?"You’re up to date. Your revised topics are resting below.":"No topics to revisit yet. Add the topics you lost marks on when logging a paper."}</p>}
    {resting.length>0&&<details className="mt-4 border-t border-ink-200 pt-3">
      <summary className="cursor-pointer py-2 text-sm font-semibold text-ink-600">Resting topics ({resting.length})</summary>
      <div className="mt-2 max-h-72 space-y-2 overflow-y-auto pr-2">{resting.map(t=><div key={t.key} className="rounded-lg border border-ink-200 p-3">
        <p className="break-words text-sm font-semibold">{t.name}</p><p className="mt-1 text-xs text-ink-500">{t.subject} · Next review: {t.next&&formatDate(t.next)}</p>
        <Button size="sm" variant="ghost" className="mt-1" onClick={()=>onRestore(t)}>Bring back now</Button>
      </div>)}</div>
    </details>}
  </div>;
}
