const h=document.querySelector('.site-header'),b=document.querySelector('.menu-btn');
addEventListener('scroll',()=>h.classList.toggle('scrolled',scrollY>40),{passive:true});
b.addEventListener('click',()=>{const o=h.classList.toggle('open');b.setAttribute('aria-expanded',o)});
document.querySelectorAll('#menu a').forEach(a=>a.addEventListener('click',()=>{h.classList.remove('open');b.setAttribute('aria-expanded',false)}));
// hero carousel: auto-advance, pause button, pause on hover/focus, respects reduced motion
(()=>{const s=[...document.querySelectorAll('.slide')],d=[...document.querySelectorAll('.dots button')],p=document.querySelector('.pause'),hero=document.querySelector('.hero');
let i=0,t=null,user=false;const rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
const go=n=>{s[i].classList.remove('is-active');d[i].removeAttribute('aria-current');i=(n+s.length)%s.length;s[i].classList.add('is-active');d[i].setAttribute('aria-current','true')};
const start=()=>{if(!t&&!user)t=setInterval(()=>go(i+1),6000)},stop=()=>{clearInterval(t);t=null};
const label=()=>{const on=user;p.setAttribute('aria-pressed',on);p.querySelector('.sr').textContent=on?'Play slideshow':'Pause slideshow';p.lastElementChild.textContent=on?'▶':'❚❚'};
d.forEach((x,n)=>x.addEventListener('click',()=>{go(n);stop();start()}));
p.addEventListener('click',()=>{user=!user;user?stop():start();label()});
hero.addEventListener('mouseenter',stop);hero.addEventListener('mouseleave',start);hero.addEventListener('focusin',stop);hero.addEventListener('focusout',start);
if(rm)user=true;label();start();})();
