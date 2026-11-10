const assert=require('node:assert/strict');const fs=require('node:fs');const vm=require('node:vm');const path=require('node:path');
const repo=path.resolve(__dirname,'..');const ctx={window:{}};vm.runInNewContext(fs.readFileSync(path.join(repo,'quiz-data.js'),'utf8'),ctx);
const data=JSON.parse(JSON.stringify(ctx.window.QUIZ_DATA));const E=require('../quiz-engine.js');
const now=2000000000000;let seed=42;const rng=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};
assert.equal(data.length,165);assert.equal(new Set(data.map(q=>q.id)).size,165);
for(const g of ['N','M','L','A','B']){
 assert.equal(data.filter(q=>q.group===g).length,33);
 for(let t=0;t<5;t++){
  const bank=data.filter(q=>q.group===g&&q.topic===t);assert.ok(bank.length>=5);
  for(const q of bank){assert.equal(q.options.length,4);assert.equal(new Set(q.options).size,4);assert.ok(q.correct>=0&&q.correct<4);assert.ok(q.explain.length>15);assert.equal(q.type,'choice');}
  const cfg={group:g,topic:String(t),mode:'random',size:3};const a=E.pickRound(data,{},cfg,[],rng,now);const b=E.pickRound(data,{},cfg,a.map(x=>x.id),rng,now);
  assert.equal(a.length,3);assert.notDeepEqual([...a.map(x=>x.id)].sort(),[...b.map(x=>x.id)].sort());
 }
 const round=E.pickRound(data,{}, {group:g,topic:'all',mode:'smart',size:10},[],rng,now);assert.equal(round.length,10);assert.equal(new Set(round.map(x=>x.id)).size,10);assert.equal(new Set(round.map(x=>data.find(q=>q.id===x.id).topic)).size,5);
 for(const item of round)assert.deepEqual([...item.order].sort(),[0,1,2,3]);
}
let h=E.record({},'N1',false,false,now);assert.ok(E.weak(h.N1));assert.equal(h.N1.nextDue,now+600000);
h=E.record(h,'N1',true,true,now+1000);assert.ok(E.weak(h.N1));h=E.record(h,'N1',true,false,now+602000);assert.ok(!E.weak(h.N1));assert.equal(h.N1.attempts,3);
const filtered=E.pickRound(data,{'N2':{lastCorrect:false,lastSeen:now,nextDue:now+600000}}, {group:'N',topic:'all',mode:'errors',size:10},[],rng,now);assert.equal(filtered.length,1);assert.equal(filtered[0].id,'N2');
const shuffled=new Set();for(let i=0;i<25;i++)shuffled.add(E.shuffle([0,1,2,3],rng).join(''));assert.ok(shuffled.size>5);
console.log('OK: 165 itens/25 temas, integridade de alternativas, conjuntos diferentes por tentativa, cobertura, sorteio, prioridade de erros e agendamento.');
