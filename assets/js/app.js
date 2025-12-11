/* APP.JS - LIARA PREMIUM */

// ===== CONFIG =====
const PHONE_NUMBER = "573217147358"; // reemplaza si quieres

// ===== SIDEBAR (hamburger) =====
const hamburger = document.querySelector('.hamburger');
const sidebar = document.querySelector('.sidebar');
const overlayEl = document.getElementById('overlay');

hamburger?.addEventListener('click', () => {
  sidebar.classList.toggle('active');
  overlayEl.style.display = sidebar.classList.contains('active') ? 'block' : 'none';
});

// close sidebar on overlay click
overlayEl.addEventListener('click', () => {
  sidebar.classList.remove('active');
  overlayEl.style.display = 'none';
});

// ===== DARK MODE TOGGLE =====
function toggleDark(){
  document.documentElement.classList.toggle('dark');
  localStorage.setItem('liara-dark', document.documentElement.classList.contains('dark'));
}
if(localStorage.getItem('liara-dark') === 'true') document.documentElement.classList.add('dark');

// ===== SLIDER =====
class Slider {
  constructor(containerSelector, opts = {}){
    this.container = document.querySelector(containerSelector);
    if(!this.container) return;
    this.slidesEl = this.container.querySelector('.slides');
    this.slides = Array.from(this.container.querySelectorAll('.slide'));
    this.index = 0;
    this.autoplay = opts.autoplay ?? true;
    this.delay = opts.delay ?? 4000;
    this.start();
    this.bindControls();
  }
  start(){
    if(this.autoplay) this.timer = setInterval(()=> this.next(), this.delay);
  }
  stop(){ clearInterval(this.timer); }
  go(i){
    if(!this.slidesEl) return;
    this.index = (i + this.slides.length) % this.slides.length;
    const w = this.container.clientWidth;
    this.slidesEl.style.transform = `translateX(-${this.index * w}px)`;
  }
  next(){ this.go(this.index + 1); }
  prev(){ this.go(this.index - 1); }
  bindControls(){
    const prevBtn = this.container.querySelector('.prev');
    const nextBtn = this.container.querySelector('.next');
    prevBtn?.addEventListener('click', ()=> { this.stop(); this.prev(); this.start(); });
    nextBtn?.addEventListener('click', ()=> { this.stop(); this.next(); this.start(); });
    window.addEventListener('resize', ()=> this.go(this.index));
  }
}
document.addEventListener('DOMContentLoaded', ()=> {
  new Slider('.slider', {autoplay:true, delay:4500});
});

// ===== WHATSAPP ORDER =====
function order(productName){
  const message = `Hola, quiero más info o hacer pedido del producto: ${productName}`;
  const url = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}

// floating whatsapp click
document.addEventListener('click', (e)=>{
  if(e.target.closest('.whatsapp')) {
    window.open(`https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent('Hola, quisiera más información')}`, '_blank');
  }
});

// Cierra sidebar al hacer click en un enlace
const sidebarLinks = document.querySelectorAll('.sidebar nav a');
sidebarLinks.forEach(link => {
  link.addEventListener('click', () => {
    sidebar.classList.remove('active');
    overlayEl.style.display = 'none';
  });
});
