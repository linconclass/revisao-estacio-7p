(() => {
'use strict';
const data=window.QUIZ_DATA, topics=window.QUIZ_TOPICS, engine=window.StudyEngine;
const $=id=>document.getElementById(id), byId=new Map(data.map(q=>[q.id,q]));
const KEY='estacio-study-v2';
const base={history:{},session:null,previous:[],config:{group:'N',topic:'all',mode:'smart',size:10}};
let store=base,storageOK=true,migrated=false,focusNext=false;
try{
 const raw=JSON.parse(localStorage.getItem(KEY)||'null');
 if(raw && raw.history && typeof raw.history==='object')store={...base,...raw,config:{...base.config,...raw.config}};
 else {
  const legacy=JSON.parse(localStorage.getItem('estacio-quiz-v1')||'null');
  if(legacy){
   const valid=new Set(['N1','N2','N3','N8','N10','M7','L5','L8','A6','B6','B10']);
   const history={};for(const [id,s]of Object.entries(legacy.answers||{}))if(valid.has(id)&&['correct','review'].includes(s.result))history[id]={attempts:1,correct:s.result==='correct'?1:0,lastCorrect:s.result==='correct',uncertain:false,lastSeen:0,nextDue:0,streak:s.result==='correct'?1:0};
   store={...base,history,config:{...base.config,group:topics[legacy.group]?legacy.group:'N'}};migrated=Object.keys(history).length>0;
  }
 }
}catch{storageOK=false;}
if(!topics[store.config.group])store.config.group='N';
if(!['all','0','1','2','3','4'].includes(String(store.config.topic)))store.config.topic='all';
if(!['smart','random','exam','errors'].includes(store.config.mode))store.config.mode='smart';
if(![3,5,10].includes(Number(store.config.size)))store.config.size=10;
if(store.session && (!Array.isArray(store.session.items)||!store.session.items.length||!store.session.items.every(x=>byId.has(x.id)&&Array.isArray(x.order)&&x.order.length===4&&new Set(x.order).size===4&&x.order.every(n=>[0,1,2,3].includes(n)))))store.session=null;
if(store.session && (!Number.isInteger(store.session.index)||store.session.index<0||store.session.index>=store.session.items.length))store.session.index=0;
function save(){try{localStorage.setItem(KEY,JSON.stringify(store));}catch{storageOK=false;}$('save-status').textContent=storageOK?'Progresso salvo neste navegador':'Progresso só nesta sessão';}
function btn(text,cls,fn){const b=document.createElement('button');b.type='button';b.className=cls;b.textContent=text;b.onclick=fn;return b;}
function paragraph(text,cls=''){const p=document.createElement('p');p.className=cls;p.textContent=text;return p;}
function pendingConfig(){return {group:$('quiz-subject').value,topic:$('quiz-topic').value,mode:$('quiz-mode').value,size:Number($('quiz-size').value)};}
function fillTopics(){const g=$('quiz-subject').value;const select=$('quiz-topic');select.replaceChildren();const all=new Option('Revisão da matéria · todos os temas','all');select.add(all);topics[g].forEach((t,i)=>select.add(new Option(`Exercício ${i+1} · ${t}`,String(i))));}
function restoreSettings(){const c=store.config;$('quiz-subject').value=c.group;fillTopics();$('quiz-topic').value=String(c.topic);$('quiz-mode').value=c.mode;$('quiz-size').value=String(c.size);}
function settingHint(){const c=pendingConfig(),pool=data.filter(q=>q.group===c.group&&(c.topic==='all'||q.topic===Number(c.topic)));const eligible=c.mode==='errors'?pool.filter(q=>engine.weak(store.history[q.id])):pool;const n=Math.min(c.size,eligible.length);$('round-hint').textContent=`${pool.length} perguntas neste recorte · próxima rodada: ${n} questões. Novas configurações entram ao tocar em “Nova rodada”.`;
 if(c.mode==='errors'&&!eligible.length)$('round-hint').textContent='Não há erros ou dúvidas registrados neste recorte. Faça um treino ou um sorteio livre para começar.';
}
function startRound(){
 const c=pendingConfig();store.config=c;
 const previous=store.session?store.session.items.map(x=>x.id):store.previous;
 const items=engine.pickRound(data,store.history,c,previous);
 store.previous=previous;
 store.session=items.length?{config:{...c},items,index:0,started:Date.now(),finished:false,summary:false,reinforcedTopics:[]}:null;
 $('round-setup').open=!items.length;save();render(true);
}
function requestRound(){const s=store.session;if(s&&!s.finished&&s.items.some(x=>x.selected!==null)&&s.items.some(x=>!x.checked))$('round-dialog').showModal();else startRound();}
function stats(){const s=store.session,g=s?s.config.group:store.config.group;const bank=data.filter(q=>q.group===g),seen=bank.filter(q=>store.history[q.id]),weak=seen.filter(q=>engine.weak(store.history[q.id]));
 const panel=$('study-topics');panel.replaceChildren();
 topics[g].forEach((name,t)=>{const qs=bank.filter(q=>q.topic===t),hs=qs.filter(q=>store.history[q.id]);const w=hs.filter(q=>engine.weak(store.history[q.id]));const b=btn(`${name} · ${hs.length}/${qs.length} vistas${w.length?' · '+w.length+' a reforçar':''}`,'topic-chip'+(w.length?' weak':''),()=>{$('quiz-subject').value=g;fillTopics();$('quiz-topic').value=String(t);$('quiz-size').value='3';$('round-setup').open=true;settingHint();$('quiz-start').focus();});b.title='Preparar um exercício deste tema';panel.append(b);});
 return {seen:seen.length,total:bank.length,weak:weak.length};
}
function addReinforcement(q){
 const s=store.session;if(s.config.mode!=='smart'||s.reinforcedTopics.includes(q.topic))return;
 const at=s.index+4;if(at>=s.items.length||s.items[at].checked||s.items[at].selected!==null)return;
 const used=new Set(s.items.map(x=>x.id));const candidates=data.filter(x=>x.group===q.group&&x.topic===q.topic&&!used.has(x.id));if(!candidates.length)return;
 const next=engine.shuffle(candidates)[0];s.items[at]={id:next.id,order:engine.shuffle([0,1,2,3]),selected:null,confidence:null,checked:false,reinforcement:true};s.reinforcedTopics.push(q.topic);
}
function grade(item,q){if(item.checked||item.selected===null)return;item.checked=true;item.correct=item.selected===q.correct;store.history=engine.record(store.history,q.id,item.correct,item.confidence==='unsure');if(!item.correct||item.confidence==='unsure')addReinforcement(q);}
function finishExam(){const s=store.session;s.items.forEach(x=>grade(x,byId.get(x.id)));s.finished=true;s.summary=true;save();render(true);}
function renderSummary(){
 const s=store.session,area=$('question-area'),correct=s.items.filter(x=>x.correct).length,uncertain=s.items.filter(x=>x.confidence==='unsure').length;
 const box=document.createElement('section');box.className='round-summary';const h=document.createElement('h3');h.tabIndex=-1;h.textContent=`Rodada concluída: ${correct} de ${s.items.length} acertos`;
 box.append(h,paragraph(`${s.items.length-correct} erros · ${uncertain} respostas marcadas com dúvida. Este resultado é do treino, não uma previsão de nota.`));
 const table=document.createElement('div');table.className='summary-topics';
 const present=[...new Set(s.items.map(x=>byId.get(x.id).topic))];present.forEach(t=>{const xs=s.items.filter(x=>byId.get(x.id).topic===t),hits=xs.filter(x=>x.correct).length;table.append(paragraph(`${topics[s.config.group][t]}: ${hits}/${xs.length} acertos`));});box.append(table);
 const actions=document.createElement('div');actions.className='summary-actions';
 actions.append(btn('Nova rodada variada','quiz-primary',()=>{$('quiz-mode').value='smart';startRound();}),btn('Reforçar erros e dúvidas','quiz-secondary',()=>{$('quiz-mode').value='errors';startRound();}),btn('Conferir esta rodada','quiz-secondary',()=>{s.summary=false;s.index=0;save();render(true);}));box.append(actions);
 box.append(paragraph('Faça uma pausa e tente recuperar as ideias novamente. Os erros e as dúvidas voltam com prioridade no treino inteligente; as alternativas mudam de posição.','summary-advice'));
 const link=document.createElement('a');link.href='#'+({N:'nosql',M:'metodos',L:'lps',A:'android',B:'backend'}[s.config.group]);link.textContent='Revisar o resumo desta matéria';box.append(link);area.append(box);if(focusNext){box.scrollIntoView({block:'start'});h.focus({preventScroll:true});}
}
function render(focus=false){focusNext=focus;const status=stats(),s=store.session,area=$('question-area');$('quiz-notice').textContent='';const active=s?s.config:store.config;$('setup-label').textContent=`${data.find(q=>q.group===active.group).subject} · ${active.topic==='all'?'todos os temas':topics[active.group][Number(active.topic)]} · ${active.mode==='exam'?'modo prova':active.mode==='errors'?'reforço':active.mode==='random'?'sorteio livre':'treino inteligente'} — configurar`;area.replaceChildren();$('quiz-map').replaceChildren();settingHint();
 $('quiz-bottom')?.removeAttribute('hidden');
 if(!s){$('quiz-stats').textContent=`${status.seen}/${status.total} perguntas vistas · ${status.weak} para reforçar`;$('quiz-progress').value=0;$('quiz-prev').disabled=true;$('quiz-next').disabled=true;$('quiz-position').textContent='Escolha sua rodada';area.append(paragraph('Escolha uma matéria, um tema ou a revisão completa. Toque em “Nova rodada” para começar.','quiz-empty'));save();return;}
 const answered=s.items.filter(x=>x.selected!==null).length,checked=s.items.filter(x=>x.checked).length,exam=s.config.mode==='exam';
 $('quiz-stats').textContent=exam&&!s.finished?`${answered}/${s.items.length} respondidas · gabarito oculto até finalizar`:`${checked}/${s.items.length} corrigidas · ${s.items.filter(x=>x.checked&&x.correct).length} ${s.items.filter(x=>x.checked&&x.correct).length===1?'acerto':'acertos'} nesta rodada · ${status.weak} a reforçar na matéria`;
 $('quiz-progress').max=s.items.length;$('quiz-progress').value=exam&&!s.finished?answered:checked;
 $('quiz-position').textContent=s.summary?'Resultado':`${s.index+1} / ${s.items.length}`;
 $('quiz-prev').disabled=s.summary||s.index===0;
 $('quiz-next').disabled=s.summary;
 $('quiz-next').textContent=s.index===s.items.length-1?(exam&&!s.finished?'Finalizar prova':'Ver resultado'):'Próxima →';
 if(s.summary){renderSummary();save();return;}
 s.items.forEach((item,i)=>{const show=item.checked&&(!exam||s.finished);const b=btn(String(i+1),`quiz-dot ${i===s.index?'is-current ':''}${show?(item.correct?'correct':'review'):item.selected!==null?'answered':''}`,()=>{s.index=i;save();render(true);});b.setAttribute('aria-label',`Questão ${i+1}: ${show?(item.correct?'correta':'revisar'):item.selected!==null?'respondida':'pendente'}`);if(i===s.index)b.setAttribute('aria-current','step');$('quiz-map').append(b);});
 const item=s.items[s.index],q=byId.get(item.id),locked=item.checked;
 const card=document.createElement('section');card.className='question-card';card.setAttribute('aria-labelledby','question-title');
 const meta=document.createElement('div');meta.className='question-meta';meta.textContent=`${q.subject} · ${topics[q.group][q.topic]}${item.reinforcement?' · retomada do tema':''}`;
 const title=document.createElement('div');title.id='question-title';title.className='question-title';title.tabIndex=-1;title.setAttribute('role','heading');title.setAttribute('aria-level','3');title.innerHTML=q.html;card.append(meta,title);
 const options=document.createElement('fieldset');options.className='quiz-options';const legend=document.createElement('legend');legend.className='sr-only';legend.textContent='Escolha uma alternativa';options.append(legend);
 item.order.forEach((original,pos)=>{const label=document.createElement('label');label.className='quiz-option';const radio=document.createElement('input');radio.type='radio';radio.name='answer';radio.value=String(original);radio.checked=item.selected===original;radio.disabled=locked;const letter=document.createElement('span');letter.className='option-letter';letter.textContent=String.fromCharCode(65+pos);const text=document.createElement('div');text.className='option-text';text.innerHTML=q.options[original];
 if(locked&&original===q.correct)label.classList.add('is-correct');if(locked&&item.selected===original&&!item.correct)label.classList.add('is-wrong');
 radio.onchange=()=>{item.selected=original;save();const check=$('check-answer');if(check)check.disabled=false;};label.append(radio,letter,text);options.append(label);});card.append(options);
 if(!locked){const confidence=document.createElement('div');confidence.className='confidence-row';confidence.append(paragraph('Como você está? (opcional)'));['sure','unsure'].forEach(value=>{const b=btn(value==='sure'?'Tenho certeza':'Estou em dúvida','confidence-button',()=>{item.confidence=item.confidence===value?null:value;save();confidence.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',String(x.dataset.value===item.confidence)));});b.dataset.value=value;b.setAttribute('aria-pressed',String(item.confidence===value));confidence.append(b);});card.append(confidence);
 if(!exam){const check=btn('Confirmar resposta','quiz-primary',()=>{grade(item,q);save();render(true);});check.id='check-answer';check.disabled=item.selected===null;const controls=document.createElement('div');controls.className='question-controls';controls.append(check);card.append(controls);}}
 if(locked){const feedback=document.createElement('div');feedback.className='quiz-feedback '+(item.correct?'correct':'review');feedback.setAttribute('role','status');const h=document.createElement('h4');h.textContent=item.correct?(item.confidence==='unsure'?'Acertou, mas vale retomar a dúvida':'Resposta correta'):'Vamos corrigir a ideia';feedback.append(h);const right=document.createElement('div');right.className='correct-answer';right.innerHTML='<strong>Correta: '+String.fromCharCode(65+item.order.indexOf(q.correct))+' · </strong>'+q.options[q.correct];feedback.append(right);
 if(!item.correct){const chosen=document.createElement('div');chosen.className='chosen-answer';chosen.innerHTML='<strong>Sua escolha: </strong>'+q.options[item.selected];feedback.append(chosen);}
 feedback.append(paragraph(q.explain));if(!item.correct||item.confidence==='unsure')feedback.append(paragraph(item.reinforcement?'Revise a regra, não a posição da alternativa.':'Este tema terá prioridade em outra pergunta. Faça uma nova tentativa depois de uma pausa.','feedback-next'));
 const reviewLink=document.createElement('a');reviewLink.href='#'+({N:'nosql',M:'metodos',L:'lps',A:'android',B:'backend'}[q.group]);reviewLink.textContent='Consultar resumo da matéria';feedback.append(reviewLink);card.append(feedback);}
 area.append(card);save();if(focus){card.scrollIntoView({block:'start'});title.focus({preventScroll:true});}
}
$('quiz-subject').onchange=()=>{fillTopics();$('quiz-size').value='10';settingHint();};
$('quiz-topic').onchange=()=>{$('quiz-size').value=$('quiz-topic').value==='all'?'10':'3';settingHint();};
$('quiz-mode').onchange=settingHint;$('quiz-size').onchange=settingHint;$('quiz-start').onclick=requestRound;
$('round-cancel').onclick=()=>{$('round-dialog').close();restoreSettings();settingHint();};$('round-confirm').onclick=()=>{$('round-dialog').close();startRound();};
$('quiz-prev').onclick=()=>{const s=store.session;if(s&&s.index>0){s.index--;save();render(true);}};
$('quiz-next').onclick=()=>{const s=store.session;if(!s)return;if(s.index<s.items.length-1){s.index++;save();render(true);return;}
 if(s.config.mode==='exam'&&!s.finished){const missing=s.items.findIndex(x=>x.selected===null);if(missing>=0){s.index=missing;render(true);$('quiz-notice').textContent='Responda todas as questões antes de finalizar. Você foi levado à primeira pendente.';return;}finishExam();}
 else {const pending=s.items.findIndex(x=>!x.checked);if(pending>=0){s.index=pending;render(true);$('quiz-notice').textContent='Confirme as respostas pendentes para ver o resultado completo.';return;}s.finished=true;s.summary=true;save();render(true);}};
$('quiz-reset').onclick=()=>$('reset-dialog').showModal();$('reset-cancel').onclick=()=>$('reset-dialog').close();$('reset-confirm').onclick=()=>{store={history:{},session:null,previous:[],config:{group:'N',topic:'all',mode:'smart',size:10}};try{localStorage.removeItem('estacio-quiz-v1');}catch{}$('reset-dialog').close();restoreSettings();startRound();};
restoreSettings();if(!store.session)startRound();else render();if(migrated)$('quiz-notice').textContent='Histórico anterior de múltipla escolha recuperado. Autoavaliações escritas não foram contadas como acertos.';
})();
