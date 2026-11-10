(() => {
  'use strict';
  const data = window.QUIZ_DATA;
  const key = 'estacio-quiz-v1';
  const $ = id => document.getElementById(id);
  let saved = {}, group = 'all', mode = 'all', current = data[0].id, storageOK = true, pinned = false;
  try {
    const raw = JSON.parse(localStorage.getItem(key) || '{}');
    if (raw && typeof raw === 'object') {
      saved = raw.answers && typeof raw.answers === 'object' ? raw.answers : {};
      if (data.some(q => q.id === raw.current)) current = raw.current;
      if (['all','N','M','L','A','B'].includes(raw.group)) group = raw.group;
    }
  } catch { storageOK = false; }
  const state = id => saved[id] && typeof saved[id] === 'object' ? saved[id] : {};
  const scope = () => data.filter(q => group === 'all' || q.group === group);
  const list = () => scope().filter(q => mode === 'all' || (pinned && q.id === current) || (mode === 'pending' ? !state(q.id).result : state(q.id).result === 'review'));
  function persist() {
    try { localStorage.setItem(key, JSON.stringify({answers:saved,current,group})); }
    catch { storageOK = false; }
    $('save-status').textContent = storageOK ? 'Progresso salvo neste navegador' : 'Progresso apenas nesta sessão';
  }
  function button(label, cls, onClick) {
    const el = document.createElement('button'); el.type = 'button'; el.className = cls; el.textContent = label; el.onclick = onClick; return el;
  }
  function render(focus = false) {
    const questions = list(), total = scope(), done = total.filter(q => state(q.id).result).length;
    const correct = total.filter(q => state(q.id).result === 'correct').length;
    const review = total.filter(q => state(q.id).result === 'review').length;
    $('quiz-stats').textContent = `${done} de ${total.length} corrigidas · ${correct} ${correct===1?'acerto':'acertos'} · ${review} para revisar`;
    $('quiz-progress').max = total.length; $('quiz-progress').value = done;
    let idx = questions.findIndex(q => q.id === current);
    if (idx < 0) { idx = 0; if (questions[0]) current = questions[0].id; }
    const map = $('quiz-map'); map.replaceChildren();
    questions.forEach(q => {
      const s = state(q.id);
      const b = button(q.id, `quiz-dot ${q.id===current?'is-current ':''}${s.result || ''}`, () => { current=q.id; pinned=false; render(true); });
      b.setAttribute('aria-label', `${q.id}: ${s.result==='correct'?'acertou':s.result==='review'?'para revisar':'pendente'}`);
      if (q.id === current) b.setAttribute('aria-current','step');
      map.append(b);
    });
    const area = $('question-area'); area.replaceChildren();
    $('quiz-prev').disabled = idx <= 0;
    $('quiz-next').disabled = idx >= questions.length-1;
    $('quiz-position').textContent = questions.length ? `${idx+1} / ${questions.length}` : 'Nenhuma questão';
    if (!questions.length) {
      const empty=document.createElement('div'); empty.className='quiz-empty';
      const title=document.createElement('h3'); title.textContent=mode==='review'?'Nenhuma questão para revisar por aqui':'Tudo corrigido por aqui!';
      const p=document.createElement('p'); p.textContent='Mude a disciplina ou volte a todas as questões para continuar praticando.';
      empty.append(title,p,button('Ver todas as questões','quiz-primary',()=>{mode='all';$('quiz-filter').value=mode;render(true);}));area.append(empty);persist();return;
    }
    const q=questions[idx], s=state(q.id);
    const card=document.createElement('section');card.className='question-card';
    const meta=document.createElement('div');meta.className='question-meta';meta.textContent=`${q.subject} · ${q.id} · ${q.type==='choice'?'Selecione uma alternativa':'Resposta escrita'}`;
    const title=document.createElement('div');title.id='question-title';title.className='question-title';title.tabIndex=-1;title.setAttribute('role','heading');title.setAttribute('aria-level','3');title.innerHTML=q.html;
    card.setAttribute('aria-labelledby','question-title');card.append(meta,title);
    const controls=document.createElement('div');controls.className='question-controls';
    if(q.type==='choice') {
      const options=document.createElement('fieldset');options.className='quiz-options';
      const legend=document.createElement('legend');legend.className='sr-only';legend.textContent='Alternativas';options.append(legend);
      q.options.forEach((html,i)=>{
        const label=document.createElement('label');label.className='quiz-option';
        const input=document.createElement('input');input.type='radio';input.name='answer';input.value=i;input.checked=s.choice===i;input.disabled=!!s.revealed;
        const badge=document.createElement('span');badge.className='option-letter';badge.textContent=String.fromCharCode(65+i);
        const text=document.createElement('div');text.className='option-text';text.innerHTML=html;
        if(s.revealed && i===q.correct)label.classList.add('is-correct');
        if(s.revealed && s.choice===i && i!==q.correct)label.classList.add('is-wrong');
        input.onchange=()=>{saved[q.id]={...state(q.id),choice:i};persist();check.disabled=false;};
        label.append(input,badge,text);options.append(label);
      });card.append(options);
      const check=button('Conferir resposta','quiz-primary',()=>{
        const before=state(q.id); if(!Number.isInteger(before.choice))return;
        pinned=true; saved[q.id]={...before,revealed:true,result:before.choice===q.correct?'correct':'review'};render(true);
      });check.disabled=!Number.isInteger(s.choice);if(!s.revealed)controls.append(check);
    } else {
      const label=document.createElement('label');label.className='written-label';label.htmlFor='written-answer';label.textContent='Sua resposta';
      const input=document.createElement('textarea');input.id='written-answer';input.rows=5;input.readOnly=!!s.revealed;input.placeholder='Explique com suas palavras. Em cálculos, registre os passos.';input.value=typeof s.text==='string'?s.text:'';
      input.oninput=()=>{saved[q.id]={...state(q.id),text:input.value};persist();};card.append(label,input);
      if(!s.revealed)controls.append(button('Ver resposta comentada','quiz-primary',()=>{saved[q.id]={...state(q.id),revealed:true};render(true);}));
    }
    card.append(controls);
    if(s.revealed) {
      const feedback=document.createElement('div');feedback.className=`quiz-feedback ${s.result || 'neutral'}`;feedback.setAttribute('role','status');
      const heading=document.createElement('h4');heading.textContent=s.result==='correct'?'✓ Resposta correta':s.result==='review'?'↻ Vamos revisar': 'Compare com a resposta esperada';
      const explanation=document.createElement('div');explanation.innerHTML=q.answer;
      feedback.append(heading); if(q.type==='choice'){const right=document.createElement('p');right.className='correct-answer';right.innerHTML='Alternativa correta: <strong>'+String.fromCharCode(65+q.correct)+' · '+q.options[q.correct]+'</strong>';feedback.append(right);} feedback.append(explanation);
      if(q.type==='written'){
        const p=document.createElement('p');p.textContent='Como foi sua resposta? A marcação abaixo é uma autoavaliação.';
        const actions=document.createElement('div');actions.className='self-assessment';
        actions.append(button('Acertei','quiz-secondary',()=>{pinned=true; saved[q.id]={...state(q.id),result:'correct'};render(true);}),button('Preciso revisar','quiz-secondary',()=>{pinned=true; saved[q.id]={...state(q.id),result:'review'};render(true);}));feedback.append(p,actions);
      }
      feedback.append(button('Tentar esta questão de novo','quiz-link',()=>{pinned=false;saved[q.id]={};render(true);}));card.append(feedback);
    }
    area.append(card);persist();if(focus)title.focus({preventScroll:true});
  }
  $('quiz-subject').value=group;
  $('quiz-subject').onchange=e=>{pinned=false;group=e.target.value;render();};
  $('quiz-filter').onchange=e=>{pinned=false;mode=e.target.value;render();};
  $('quiz-prev').onclick=()=>{const qs=list(),i=qs.findIndex(q=>q.id===current);if(i>0){current=qs[i-1].id;pinned=false;render(true);}};
  $('quiz-next').onclick=()=>{const qs=list(),i=qs.findIndex(q=>q.id===current);if(i<qs.length-1){current=qs[i+1].id;pinned=false;render(true);}};
  $('quiz-reset').onclick=()=>$('reset-dialog').showModal();
  $('reset-cancel').onclick=()=>$('reset-dialog').close();
  $('reset-confirm').onclick=()=>{saved={};current=data[0].id;group='all';mode='all';$('quiz-subject').value='all';$('quiz-filter').value='all';$('reset-dialog').close();render(true);};
  render();
})();
