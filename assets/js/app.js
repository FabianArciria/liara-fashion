/* ============================
   APP.JS - LIARA PREMIUM
============================ */

/* ===== CONFIG ===== */
const PHONE_NUMBER = "573217147358";

/* ============================
   SIDEBAR + OVERLAY
============================ */
const hamburger = document.querySelector(".hamburger");
const sidebar = document.querySelector(".sidebar");
const overlay = document.getElementById("overlay");

function toggleSidebar() {
  sidebar.classList.toggle("active");
  overlay.classList.toggle("active");
}

hamburger?.addEventListener("click", toggleSidebar);
overlay?.addEventListener("click", toggleSidebar);

// cerrar sidebar al hacer click en enlaces
document.querySelectorAll(".sidebar nav a").forEach(link => {
  link.addEventListener("click", () => {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
  });
});

/* ============================
   DARK MODE
============================ */
function toggleDark() {
  document.documentElement.classList.toggle("dark");
  localStorage.setItem(
    "liara-dark",
    document.documentElement.classList.contains("dark")
  );
}

// mantener preferencia
if (localStorage.getItem("liara-dark") === "true") {
  document.documentElement.classList.add("dark");
}

/* ============================
   WHATSAPP
============================ */
function order(product) {
  const msg = `Hola, estoy interesado en: ${product}`;
  window.open(
    `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(msg)}`,
    "_blank"
  );
}

// botón flotante
document.addEventListener("click", e => {
  if (e.target.closest(".whatsapp")) {
    window.open(
      `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(
        "Hola, quisiera más información"
      )}`,
      "_blank"
    );
  }
});

/* ============================
   SLIDER PREMIUM
============================ */
class Slider {
  constructor(selector, opts = {}) {
    this.container = document.querySelector(selector);
    if (!this.container) return;

    this.slidesEl = this.container.querySelector(".slides");
    this.slides = Array.from(this.container.querySelectorAll(".slide"));
    this.index = 0;
    this.autoplay = opts.autoplay ?? true;
    this.delay = opts.delay ?? 4500;

    this.bindControls();
    this.bindSwipe();
    this.start();
  }

  start() {
    if (this.autoplay) {
      this.timer = setInterval(() => this.next(), this.delay);
    }
  }

  stop() {
    clearInterval(this.timer);
  }

  go(i) {
    const width = this.container.clientWidth;
    this.index = (i + this.slides.length) % this.slides.length;
    this.slidesEl.style.transform = `translateX(-${this.index * width}px)`;
  }

  next() {
    this.go(this.index + 1);
  }

  prev() {
    this.go(this.index - 1);
  }

  bindControls() {
    this.container.querySelector(".prev")?.addEventListener("click", () => {
      this.stop();
      this.prev();
      this.start();
    });

    this.container.querySelector(".next")?.addEventListener("click", () => {
      this.stop();
      this.next();
      this.start();
    });

    window.addEventListener("resize", () => this.go(this.index));
  }

  /* ===== SWIPE TÁCTIL ===== */
  bindSwipe() {
    let startX = 0;

    this.container.addEventListener("touchstart", e => {
      startX = e.touches[0].clientX;
    });

    this.container.addEventListener("touchend", e => {
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;

      if (Math.abs(diff) > 50) {
        this.stop();
        diff > 0 ? this.next() : this.prev();
        this.start();
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new Slider(".slider", { autoplay: true, delay: 4500 });
});

/* ============================
   LAZY LOAD VISUAL
============================ */
document.querySelectorAll('img[loading="lazy"]').forEach(img => {
  if (img.complete) img.classList.add("loaded");
  img.addEventListener("load", () => img.classList.add("loaded"));
});

/* ============================
   SCROLL REVEAL
============================ */
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".card, .hero, .section-title").forEach(el => {
  el.classList.add("reveal");
  observer.observe(el);
});
