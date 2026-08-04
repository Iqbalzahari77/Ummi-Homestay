const header=document.querySelector('.site-header');
const menuButton=document.querySelector('.menu-button');
const nav=document.querySelector('.nav-links');
window.addEventListener('scroll',()=>header.classList.toggle('scrolled',window.scrollY>40));
menuButton.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

document.getElementById('year').textContent=new Date().getFullYear();

const dialog=document.querySelector('.lightbox');
const dialogImg=dialog.querySelector('img');
const items=[...document.querySelectorAll('.gallery-item img')];
let current=0;
function showImage(index){current=(index+items.length)%items.length;dialogImg.src=items[current].src;dialogImg.alt=items[current].alt;if(!dialog.open)dialog.showModal();}
items.forEach((img,index)=>img.parentElement.addEventListener('click',()=>showImage(index)));
dialog.querySelector('.lightbox-close').addEventListener('click',()=>dialog.close());
dialog.querySelector('.lightbox-prev').addEventListener('click',()=>showImage(current-1));
dialog.querySelector('.lightbox-next').addEventListener('click',()=>showImage(current+1));
dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
document.addEventListener('keydown',e=>{if(!dialog.open)return;if(e.key==='ArrowLeft')showImage(current-1);if(e.key==='ArrowRight')showImage(current+1)});
