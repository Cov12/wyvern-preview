const b=document.querySelector('.menu-btn'),h=document.querySelector('.site-header');
b.addEventListener('click',()=>{const o=h.classList.toggle('open');b.setAttribute('aria-expanded',o)});
document.querySelectorAll('#menu a').forEach(a=>a.addEventListener('click',()=>{h.classList.remove('open');b.setAttribute('aria-expanded',false)}));
addEventListener('scroll',()=>h.classList.toggle('scrolled',scrollY>20),{passive:true});
