"use client";
import { useState, useSyncExternalStore } from "react";
import { Button, buttonClasses } from "@/components/ui/Button";
import { Container } from "@/components/ui/Layout";
import { Field, inputClasses } from "@/components/ui/Field";
import { PaperForm } from "./PaperForm";
import { TopicList } from "./TopicList";
import { PaperLog } from "./PaperLog";
import { ScoreChart, Sparkline } from "./ScoreChart";
import { getSnapshot, getServerSnapshot, subscribe, save } from "./tracker-store";
import { decodeBackup, encodeBackup, formatDate, mergeBackup, percent, progressSummary, reviewTopics, today, trackerSubjects, type Paper, type TrackerData } from "@/lib/paper-tracker";

export function PastPaperTracker() {
  const snapshot = useSyncExternalStore(subscribe,getSnapshot,getServerSnapshot);
  const {data} = snapshot;
  const [subject,setSubject] = useState("All");
  const [dueOnly,setDueOnly] = useState(false);
  const [editing,setEditing] = useState<Paper>();
  const [notice,setNotice] = useState("");
  const [backup,setBackup] = useState("");
  const [restore,setRestore] = useState("");
  const [restoreError,setRestoreError] = useState("");
  const [formVersion,setFormVersion] = useState(0);
  if(!snapshot.ready) return <Container className="py-12"><p role="status">Loading your tracker…</p></Container>;
  const progressData = {...data, papers:data.papers.filter(p=>!p.ex)};
  const topics = reviewTopics(progressData);
  const due = topics.filter(t=>t.state==="due").length;
  const subjects = [...new Set(progressData.papers.map(p=>p.subj))].sort((a,b)=>trackerSubjects.indexOf(a)-trackerSubjects.indexOf(b));
  const filtered = data.papers.filter(p=>subject==="All"||p.subj===subject);
  const shownTopics = topics.filter(t=>dueOnly?t.state==="due":subject==="All"||t.subject===subject);
  const staleBackup = data.papers.some(p=>!p.ex) && (!data.lastBackup || Date.parse(today())-Date.parse(data.lastBackup)>14*86400000);
  function update(next:TrackerData,message:string) { save(next);setNotice(message); }
  function savePaper(paper:Paper) {
    const exists=data.papers.some(p=>p.id===paper.id);
    update({...data,papers:exists?data.papers.map(p=>p.id===paper.id?paper:p):[...data.papers,paper]},exists?"Paper updated.":"Paper added.");
    setEditing(undefined);setFormVersion(v=>v+1);
  }
  function editPaper(paper:Paper) { setEditing(paper);document.getElementById("log-paper")?.scrollIntoView({block:"start",behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth"}); }
  async function copyProgress() {
    if(!progressData.papers.length){setNotice("Log a paper first.");return;}
    try{await navigator.clipboard.writeText(progressSummary(progressData));setNotice("Progress copied. Paste it into a message to your tutor.");}
    catch{setNotice("Copy was unavailable. Use the email link or select the progress text below.");}
  }
  async function makeBackup(download=false) {
    const next={...data,lastBackup:today()};
    const code=encodeBackup(next);setBackup(code);
    if(download) {
      const url=URL.createObjectURL(new Blob([code],{type:"text/plain;charset=utf-8"}));
      const a=document.createElement("a");a.href=url;a.download=`gcse2med-papers-${today()}.txt`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
      update(next,"Backup download started. Keep it somewhere safe.");return;
    }
    try{await navigator.clipboard.writeText(code);update(next,"Backup code copied. Keep it somewhere safe.");}
    catch{setNotice("Select and copy the backup code shown below, or download it.");}
  }
  function restoreBackup() {
    try {const next=mergeBackup(data,decodeBackup(restore.trim()));const added=next.papers.filter(p=>!data.papers.some(old=>!old.ex&&String(old.id)===String(p.id))).length;update(next,`${added} papers restored. Existing papers kept.`);setRestore("");setRestoreError("");setSubject("All");}
    catch{setRestoreError("That backup could not be read. Paste the complete G2M1: code. Your current papers have not changed.");}
  }
  return <Container className="space-y-8 py-8 sm:py-12">
    <div role="status" aria-live="polite" className={notice?"rounded-lg bg-emerald-50 p-4 text-sm text-emerald-900":"sr-only"}>{notice}</div>
    {snapshot.warning&&<p role="alert" className="rounded-lg bg-accent-50 p-4 text-sm text-accent-900">{snapshot.warning}</p>}
    {data.papers.some(p=>p.ex)&&<div className="flex flex-col gap-4 rounded-card border border-accent-200 bg-accent-50 p-5 sm:flex-row sm:items-center sm:justify-between"><p className="max-w-xl text-sm text-accent-900"><strong>Start with one example.</strong> See how a paper is logged, then add your own. The example does not count towards your progress. You can remove the example whenever you’re ready.</p><Button variant="secondary" onClick={()=>{update({...data,papers:data.papers.filter(p=>!p.ex)},"Example removed. Your own papers are unchanged.");setSubject("All");setEditing(undefined);}}>Remove example</Button></div>}
    <p className="text-sm text-slate-600">Your papers save automatically in this browser. Use a backup to move them to another device or keep a copy before clearing browser data.</p>
    <section aria-label="Tracker overview" className="rounded-2xl bg-brand-700 p-6 text-white sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-5"><div><p className="text-sm font-semibold text-accent-300">Small steps. Visible progress.</p><h2 className="mt-2 text-2xl font-bold text-white">Make every paper count.</h2></div><a href="#log-paper" className={buttonClasses({variant:"accent"})}>Log a paper ↓</a></div>
      <dl className="mt-7 grid grid-cols-3 gap-3 border-t border-white/20 pt-6"><div><dt className="text-xs text-white/80 sm:text-sm">Papers logged</dt><dd className="mt-2 text-3xl font-bold tabular-nums">{progressData.papers.length}</dd></div><div><dt className="text-xs text-white/80 sm:text-sm">Subjects practised</dt><dd className="mt-2 text-3xl font-bold tabular-nums">{subjects.length}</dd></div><div><dt className="text-xs text-white/80 sm:text-sm">Reviews due</dt><dd className="mt-2 text-3xl font-bold tabular-nums">{due}</dd></div></dl>
    </section>
    <section aria-labelledby="tracker-subjects"><div className="flex flex-wrap items-center justify-between gap-3"><h2 id="tracker-subjects" className="text-2xl font-bold">Your subjects</h2><Button variant={subject==="All"?"primary":"secondary"} size="sm" aria-pressed={subject==="All"} onClick={()=>setSubject("All")}>All subjects</Button></div><p className="mt-2 text-sm text-ink-600">Choose a subject to see its score chart, papers and revision topics.</p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{subjects.map(name=>{
        const papers=progressData.papers.filter(p=>p.subj===name).sort((a,b)=>a.date.localeCompare(b.date));
        const scores=papers.map(percent),latest=scores[scores.length-1],average=Math.round(scores.reduce((a,b)=>a+b,0)/scores.length);
        return <button key={name} aria-pressed={subject===name} onClick={()=>setSubject(name)} className={`rounded-card border p-5 text-left transition ${subject===name?"border-brand-600 bg-brand-50 ring-1 ring-brand-600":"border-ink-200 bg-white hover:border-brand-400"}`}><span className="block font-bold text-brand-950">{name}</span><span className="mt-2 block text-3xl font-bold tabular-nums text-brand-700">{latest}% <span className="text-xs font-medium text-ink-500">latest score</span></span><Sparkline papers={papers}/><span className="mt-3 flex flex-wrap justify-between gap-2 text-xs text-ink-600"><span>{papers.length} papers · average {average}%</span><span>Best {Math.max(...scores)}%</span></span></button>;
      })}</div>{!subjects.length&&<p className="mt-4 rounded-lg bg-brand-50 p-5 text-ink-600">Your first paper starts the story. Log it below to see your progress here.</p>}
    </section>
    {subject!=="All"&&<ScoreChart key={`chart-${subject}`} papers={filtered.filter(p=>!p.ex)} subject={subject}/>}
    <div className="grid items-start gap-6 lg:grid-cols-2">
      {!snapshot.blocked&&<PaperForm key={editing?.id ?? `new-${formVersion}`} paper={editing} onSave={savePaper} onCancel={()=>setEditing(undefined)}/>}
      <section aria-labelledby="tracker-topics" className="rounded-card border border-ink-200 bg-white p-5 sm:p-7"><h2 id="tracker-topics" className="text-2xl font-bold">Topics to revisit</h2><p className="mt-2 text-sm leading-relaxed text-ink-600">Focus on a few topics at a time. Mark one revised and we’ll remind you when it’s due again.</p><Button variant={dueOnly?"primary":"secondary"} size="sm" className="mt-4" aria-pressed={dueOnly} onClick={()=>setDueOnly(!dueOnly)}>Due for review ({due})</Button>{dueOnly&&<p className="mt-3 text-xs text-ink-500">Showing due reviews across all subjects.</p>}
        <TopicList key={subject+String(dueOnly)} topics={shownTopics} dueOnly={dueOnly}
          onRevise={t=>update({...data,mastered:{...data.mastered,[t.key]:{last:today(),stage:t.stage}}},`${t.name} marked revised.`)}
          onRestore={t=>{const mastered={...data.mastered};delete mastered[t.key];update({...data,mastered},`${t.name} is back on your list.`);}}/>
      </section>
    </div>
    <PaperLog key={`log-${subject}`} papers={filtered} subject={subject} onEdit={editPaper} onUpdate={savePaper} onDelete={p=>{update({...data,papers:data.papers.filter(x=>x.id!==p.id)},"Paper removed.");if(editing?.id===p.id)setEditing(undefined);if(!data.papers.some(x=>x.id!==p.id&&x.subj===subject))setSubject("All");}}/>
    <section id="tracker-backup" className="scroll-mt-24 rounded-card border border-brand-200 bg-brand-50 p-5 sm:p-7"><h2 className="text-2xl font-bold">Share your progress. Keep a backup.</h2><p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-600">Your tracker saves in this browser only. Send a progress summary to your tutor and keep a backup before changing devices or clearing browser data.</p>
      {staleBackup&&<p className="mt-4 rounded-lg bg-accent-50 p-3 text-sm text-accent-900">{data.lastBackup?`Your last backup was ${formatDate(data.lastBackup)}.`:"You haven’t backed up your papers yet."} Save a fresh copy below.</p>}
      <div className="mt-5 flex flex-wrap gap-3"><Button onClick={copyProgress} disabled={!progressData.papers.length}>Copy progress</Button><a className={buttonClasses({variant:"secondary"})} href={`mailto:?subject=${encodeURIComponent("My past paper progress")}&body=${encodeURIComponent(progressSummary(progressData))}`}>Email progress</a></div>
      <details className="mt-5"><summary className="cursor-pointer py-2 text-sm font-semibold text-brand-800">View progress summary</summary><textarea aria-label="Progress summary" readOnly value={progressSummary(progressData)} rows={7} className={inputClasses}/></details>
      <div className="mt-6 border-t border-brand-200 pt-6"><h3 className="font-bold">Back up or move to another device</h3><div className="mt-4 flex flex-wrap gap-3"><Button variant="secondary" disabled={snapshot.blocked} onClick={()=>makeBackup()}>Copy backup code</Button><Button variant="secondary" disabled={snapshot.blocked} onClick={()=>makeBackup(true)}>Download backup</Button></div>{backup&&<div className="mt-4"><Field label="Your backup code"><textarea readOnly value={backup} rows={3} className={inputClasses} onFocus={e=>e.target.select()}/></Field></div>}
        <div className="mt-5"><Field label="Restore from a backup"><textarea value={restore} onChange={e=>setRestore(e.target.value)} rows={3} placeholder="Paste your G2M1: backup code" className={inputClasses}/></Field><p className="mt-2 text-xs text-ink-500">Restores missing papers and review reminders. Existing papers are kept; example papers are replaced by the backup.</p>{restoreError&&<p role="alert" className="mt-3 text-sm text-flag-800">{restoreError}</p>}<Button variant="secondary" className="mt-3" onClick={restoreBackup} disabled={!restore.trim()}>Restore backup</Button></div>
      </div>
    </section>
  </Container>;
}
