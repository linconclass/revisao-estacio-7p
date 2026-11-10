/* Selection and scheduling rules are pure functions so the study behavior can be checked independently. */
(function(root){
  const shuffle=(items,rng=Math.random)=>{const a=[...items];for(let i=a.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
  const weak=h=>!!h && (h.lastCorrect===false || h.uncertain===true);
  function pickRound(bank,history,config,previous=[],rng=Math.random,now=Date.now()){
    let pool=bank.filter(q=>q.group===config.group && (config.topic==='all'||q.topic===Number(config.topic)));
    if(config.mode==='errors')pool=pool.filter(q=>weak(history[q.id]));
    const n=Math.min(config.size,pool.length),prev=new Set(previous);
    const ranked=shuffle(pool,rng).map(q=>{
      const h=history[q.id];let score=rng();
      if(config.mode==='smart'){
        score+=!h?8:weak(h)?14:h.nextDue<=now?10:1;
        if(h && now-h.lastSeen<120000)score-=10;
      }
      if(prev.has(q.id))score-=30;
      return {q,score};
    }).sort((a,b)=>b.score-a.score);
    let picked=[];
    if(config.topic==='all'){
      const bins=shuffle([...new Set(ranked.map(x=>x.q.topic))],rng).map(t=>ranked.filter(x=>x.q.topic===t));
      while(picked.length<n){let added=false;for(const bin of bins){if(bin.length && picked.length<n){picked.push(bin.shift().q);added=true;}}if(!added)break;}
    }else picked=ranked.slice(0,n).map(x=>x.q);
    // Rotate the set whenever there is an unused alternative, even when a weak item has high priority.
    if(previous.length && picked.length && pool.length>picked.length && picked.every(q=>prev.has(q.id))){
      const fresh=ranked.find(x=>!prev.has(x.q.id));if(fresh)picked[picked.length-1]=fresh.q;
    }
    return shuffle(picked,rng).map(q=>({id:q.id,order:shuffle(q.options.map((_,i)=>i),rng),selected:null,confidence:null,checked:false}));
  }
  function record(history,id,isCorrect,uncertain,now=Date.now()){
    const old=history[id]||{};
    const spaced=isCorrect && !uncertain && old.lastCorrect===true && !old.uncertain && now-(old.lastSeen||0)>=600000;
    const streak=isCorrect && !uncertain?(old.streak||0)+1:0;
    return {...history,[id]:{attempts:(old.attempts||0)+1,correct:(old.correct||0)+(isCorrect?1:0),lastCorrect:isCorrect,uncertain:!!uncertain,lastSeen:now,streak,nextDue:now+(!isCorrect||uncertain?600000:spaced?14400000:3600000)}};
  }
  const api={shuffle,pickRound,record,weak};root.StudyEngine=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
