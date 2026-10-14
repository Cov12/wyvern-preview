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
// v6 motion: scroll reveal (staggered), parallax; all disabled for prefers-reduced-motion
(()=>{const rm=matchMedia('(prefers-reduced-motion: reduce)').matches;if(rm||!('IntersectionObserver'in window))return;
document.documentElement.classList.add('js');
const groups=[['.intro .center>*'],['.bento>.tile'],['.products .head-row','.pgrid>li','.products .note'],['.band-inner'],['.industries .center','.igrid>li'],['.inuse .center','.umosaic>li'],['.rental .wrap>*','.steps>div'],['.iso-in'],['.case-media','.case-text'],['.cta-inner']];
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{rootMargin:'0px 0px -8% 0px'});
groups.forEach(g=>g.forEach(sel=>document.querySelectorAll(sel).forEach((el,i)=>{el.classList.add('reveal');el.style.transitionDelay=Math.min(i%6,5)*70+'ms';io.observe(el)})));
const sl=document.querySelector('.slides'),band=document.querySelector('.band'),bi=band&&band.querySelector('img');let tk=false;
const par=()=>{tk=false;const y=scrollY;if(y<innerHeight)sl.style.transform=`translate3d(0,${y*.25}px,0)`;
if(bi){const r=band.getBoundingClientRect();if(r.bottom>0&&r.top<innerHeight){const c=(r.top+r.height/2-innerHeight/2);bi.style.transform=`translate3d(0,${c*-.12}px,0)`}}};
addEventListener('scroll',()=>{if(!tk){tk=true;requestAnimationFrame(par)}},{passive:true});par();})();
