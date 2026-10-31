import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { compactExamples, trackerSchema, reviewTopics, encodeBackup, decodeBackup, mergeBackup, dueDate, topicOptions } from '../lib/paper-tracker.ts';
const paper={id:1,subj:'Biology',board:'AQA',series:'June 2026',paper:'Paper 1',tier:'Higher',date:'2026-10-01',score:40,total:70,topics:['Cells 🧬'],redo:0};
test('legacy dates, examples and Unicode backup codes survive migration',async()=>{
  const examples=JSON.parse(await readFile(new URL('../content/paper-tracker-examples.json',import.meta.url),'utf8'));
  assert.ok(trackerSchema.parse(examples).papers.length);
  const data=trackerSchema.parse({papers:[paper],mastered:{'Biology|cells 🧬':'2026-10-02'}});
  assert.deepEqual(data.mastered['Biology|cells 🧬'],{last:'2026-10-02',stage:0});
  assert.deepEqual(decodeBackup(encodeBackup(data)),data);
});
test('review dates cross month/year boundaries and new mistakes resurface',()=>{
  assert.equal(dueDate('2026-12-30',0),'2027-01-02');
  const data={papers:[paper],mastered:{'Biology|cells 🧬':{last:'2026-10-02',stage:0}}};
  assert.equal(reviewTopics(data,'2026-10-04')[0].state,'resting');
  assert.equal(reviewTopics(data,'2026-10-05')[0].state,'due');
  assert.equal(reviewTopics({...data,papers:[{...paper,date:'2026-10-03'}]},'2026-10-04')[0].state,'fresh');
  assert.equal(reviewTopics({...data,papers:[{...paper,redo:1}]},'2026-10-05').length,0);
});
test('restoring merges missing papers and newer reviews without replacing local scores',()=>{
  const current={papers:[paper,{...paper,id:99,ex:1}],mastered:{x:{last:'2026-10-01',stage:0}}};
  const backup={papers:[{...paper,score:20},{...paper,id:2}],mastered:{x:{last:'2026-10-02',stage:1}}};
  const merged=mergeBackup(current,backup);
  assert.equal(merged.papers.length,2);
  assert.equal(merged.papers[0].score,40);
  assert.equal(merged.mastered.x.stage,1);
  assert.equal(current.papers.length,2);
});
test('invalid dates, impossible scores, duplicate IDs and corrupt backups are rejected',()=>{
  for(const invalid of [{...paper,date:'2026-02-30'},{...paper,total:0},{...paper,score:71},{...paper,redoScore:71}]){
    assert.equal(trackerSchema.safeParse({papers:[invalid],mastered:{}}).success,false);
  }
  assert.equal(trackerSchema.safeParse({papers:[paper,{...paper,id:'1'}],mastered:{}}).success,false);
  assert.throws(()=>decodeBackup('G2M1:not a backup'));
  assert.throws(()=>decodeBackup('unexpected format'));
});
test('combined science retains separate subject topic names',()=>{
  const names=topicOptions('Combined Science','AQA').flatMap(g=>g.options);
  for(const subject of ['Biology','Chemistry','Physics']) assert.ok(names.some(n=>n.startsWith(subject+': ')));
});

test('old demo papers are reduced without changing personal papers or review history',()=>{
  const own={...paper,id:'personal',score:55};
  const data={papers:[{...paper,ex:1},{...paper,id:2,ex:1},own],mastered:{x:{last:'2026-10-02',stage:2}},lastBackup:'2026-10-03'};
  const result=compactExamples(data);
  assert.deepEqual(result.papers,[data.papers[0],own]);
  assert.deepEqual(result.mastered,data.mastered);
  assert.equal(result.lastBackup,data.lastBackup);
  assert.equal(data.papers.length,3);
  assert.deepEqual(compactExamples({papers:[],mastered:{}}).papers,[]);
});
