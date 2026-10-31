"use client";
import { useState } from "react";
import { formatDate, percent, type Paper } from "@/lib/paper-tracker";

export function Sparkline({papers}: {papers: Paper[]}) {
  if (papers.length < 2) return <p className="mt-4 text-xs text-ink-500">Log another paper to see your trend.</p>;
  const values = [...papers].sort((a,b) => a.date.localeCompare(b.date)).map(percent);
  return <svg aria-label={`Score trend from ${values[0]}% to ${values[values.length-1]}%`} role="img" viewBox="0 0 200 40" className="mt-3 h-10 w-full text-brand-600"><polyline points={values.map((v,i) => `${3+i*194/(values.length-1)},${37-v*.34}`).join(" ")} fill="none" stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke" /></svg>;
}

export function ScoreChart({papers,subject}: {papers:Paper[]; subject:string}) {
  const [active, setActive] = useState<Paper["id"] | null>(null);
  const sorted = [...papers].sort((a,b) => a.date.localeCompare(b.date));
  const times = sorted.map(p => Date.parse(p.date + "T12:00:00Z"));
  const min = Math.min(...times), max = Math.max(...times);
  const points = sorted.map((paper,i) => ({paper,x:max===min?380:45+(times[i]-min)/(max-min)*690,y:20+(100-percent(paper))*2.2}));
  const selected = points.find(p => p.paper.id === active);
  if (!papers.length) return null;
  return <section aria-label={`${subject} score chart`} className="rounded-card border border-ink-200 bg-white p-5 sm:p-7">
    <div className="flex flex-wrap items-center justify-between gap-3"><h2 className="text-2xl font-bold">Score over time</h2><span className="text-sm font-semibold text-brand-700">{subject}</span></div>
    <p className="mt-2 text-sm text-ink-600">Select a point to see the paper. The dashed line marks 70%.</p>
    <svg viewBox="0 0 760 280" className="mt-5 w-full overflow-visible" aria-label={`${subject} scores from ${formatDate(sorted[0].date)} to ${formatDate(sorted[sorted.length-1].date)}`}>
      {[0,25,50,75,100].map(v => <g key={v}><line x1="45" x2="735" y1={20+(100-v)*2.2} y2={20+(100-v)*2.2} className="stroke-ink-200"/><text x="35" y={25+(100-v)*2.2} textAnchor="end" className="fill-ink-500 text-[12px]">{v}%</text></g>)}
      <line x1="45" x2="735" y1="86" y2="86" strokeDasharray="5 5" className="stroke-emerald-600"/>
      <polyline points={points.map(p=>`${p.x},${p.y}`).join(" ")} fill="none" className="stroke-brand-600" strokeWidth="2.5" vectorEffect="non-scaling-stroke"/>
      {points.map(({paper,x,y})=><g key={paper.id} role="button" tabIndex={0} aria-label={`${paper.series} ${paper.paper}, ${formatDate(paper.date)}, ${percent(paper)}%`} onFocus={()=>setActive(paper.id)} onPointerEnter={()=>setActive(paper.id)} onClick={()=>setActive(paper.id)} onKeyDown={e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();setActive(paper.id);}}} className="cursor-pointer focus:outline-none"><circle cx={x} cy={y} r="12" fill="transparent"/><circle cx={x} cy={y} r={active===paper.id?7:4} className={active===paper.id?"fill-accent-300 stroke-brand-700":"fill-brand-600 stroke-white"} strokeWidth="2"/></g>)}
      <text x="45" y="270" className="fill-ink-600 text-[12px]">{formatDate(sorted[0].date)}</text><text x="735" y="270" textAnchor="end" className="fill-ink-600 text-[12px]">{formatDate(sorted[sorted.length-1].date)}</text>
    </svg>
    <p aria-live="polite" className="mt-2 min-h-12 rounded-lg bg-brand-50 px-4 py-3 text-sm text-brand-950">{selected ? `${selected.paper.board} · ${selected.paper.series} · ${selected.paper.paper} — ${percent(selected.paper)}% (${selected.paper.score}/${selected.paper.total}), ${formatDate(selected.paper.date)}` : "Tap or focus a point for the score and paper details."}</p>
  </section>;
}
