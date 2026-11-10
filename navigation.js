(() => {
 const nav=document.querySelector('.topbar'),menu=nav.querySelector('.nav-mobile');
 const links=[...nav.querySelectorAll('a[href^="#"]')];
 function active(id){links.forEach(a=>{if(a.hash==='#'+id)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}
 nav.addEventListener('click',e=>{const a=e.target.closest('a[href^="#"]');if(!a)return;menu.open=false;active(a.hash.slice(1));});
 document.addEventListener('click',e=>{if(menu.open&&!menu.contains(e.target))menu.open=false;});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.open){menu.open=false;menu.querySelector('summary').focus();}});
 window.addEventListener('hashchange',()=>active(location.hash.slice(1)));
 if('IntersectionObserver'in window){const obs=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting)active(entry.target.id);},{rootMargin:'-80px 0px -65% 0px',threshold:0});['inicio','nosql','metodos','lps','android','backend','treino','pesquisa','fontes'].forEach(id=>{const el=document.getElementById(id);if(el)obs.observe(el);});}
 active(location.hash.slice(1));
})();
