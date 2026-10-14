/* ═══════════════════════════════════════════════════════════
   CHELSEA FC — sport_page.js
   Features: particles · ticker · legend reveal · stat bars ·
   quiz · lightbox · scroll animations · nav effects
═══════════════════════════════════════════════════════════ */
"use strict";

/* ─── HELPERS ───────────────────────────────────────────── */
const $ = id => document.getElementById(id);
const $$ = sel => document.querySelectorAll(sel);

/* ─── SCROLL ANIMATIONS ─────────────────────────────────── */
function initScrollAnim() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("vis");
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  $$(".anim").forEach(el => obs.observe(el));
}

/* ─── STAT BARS ─────────────────────────────────────────── */
function initStatBars() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll(".sb-fill").forEach(fill => {
          fill.classList.add("animated");
        });
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  const statsSection = $("stats");
  if (statsSection) obs.observe(statsSection);
}

/* ─── PARTICLES ─────────────────────────────────────────── */
function initParticles() {
  const container = $("particles");
  if (!container) return;
  const count = window.innerWidth < 768 ? 18 : 36;
  for (let i = 0; i < count; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    const size = Math.random() * 4 + 1.5;
    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${Math.random() * 100}%;
      bottom: ${Math.random() * 40}%;
      --dur: ${4 + Math.random() * 6}s;
      --delay: ${Math.random() * 6}s;
    `;
    container.appendChild(p);
  }
}

/* ─── NAV SCROLL EFFECT ─────────────────────────────────── */
function initNav() {
  const nav = $("nav");
  if (!nav) return;
  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 60);
  }, { passive: true });

  // hamburger
  const burger = $("nav-burger");
  const mobMenu = $("mob-menu");
  const mobClose = $("mob-close");

  burger?.addEventListener("click", () => {
    burger.classList.toggle("open");
    mobMenu?.classList.add("open");
    document.body.style.overflow = "hidden";
  });
  mobClose?.addEventListener("click", closeMobMenu);
  mobMenu?.querySelectorAll("a").forEach(a => a.addEventListener("click", closeMobMenu));

  function closeMobMenu() {
    burger?.classList.remove("open");
    mobMenu?.classList.remove("open");
    document.body.style.overflow = "";
  }
}

/* ─── DROGBA LEGEND REVEAL ──────────────────────────────── */
function initLegendReveal() {
  const lockBtn = $("legend-lock-btn");
  const pre     = $("legend-pre");
  const reveal  = $("drogba-reveal");
  if (!lockBtn || !pre || !reveal) return;

  lockBtn.addEventListener("click", () => {
    pre.style.display = "none";
    reveal.style.display = "block";
    reveal.style.animation = "revealIn .7s cubic-bezier(.4,0,.2,1) forwards";
    showToast("⚽ The Legend is Revealed!");

    // animate drogba stats counter
    reveal.querySelectorAll(".dstat-n[data-target]").forEach(el => {
      animateCounter(el, +el.dataset.target, 1600);
    });
  });
}

function animateCounter(el, target, duration) {
  const start = performance.now();
  const step = now => {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(eased * target);
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

/* ─── GALLERY LIGHTBOX ──────────────────────────────────── */
function initGallery() {
  const lb    = $("lightbox");
  const lbImg = $("lb-img");
  const lbCap = $("lb-cap");
  const lbClose = $("lb-close");

  $$("[data-lb-src]").forEach(el => {
    el.addEventListener("click", () => {
      const src = el.dataset.lbSrc;
      const cap = el.dataset.lbCap || "";
      if (!src) return;
      lbImg.src = src;
      lbCap.textContent = cap;
      lb.classList.add("open");
      document.body.style.overflow = "hidden";
    });
  });

  lbClose?.addEventListener("click", closeLb);
  lb?.addEventListener("click", e => { if (e.target === lb) closeLb(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeLb(); });

  function closeLb() {
    lb.classList.remove("open");
    document.body.style.overflow = "";
    setTimeout(() => { if (lbImg) lbImg.src = ""; }, 300);
  }
}

/* ─── QUIZ ──────────────────────────────────────────────── */
const QUESTIONS = [
  {
    q:  "What year was Chelsea FC founded?",
    opts: ["1895", "1905", "1912", "1920"],
    ans: 1,
  },
  {
    q:  "Which stadium is Chelsea's home ground?",
    opts: ["Anfield", "Old Trafford", "Stamford Bridge", "The Emirates"],
    ans: 2,
  },
  {
    q:  "How many Premier League titles had Chelsea won by 2023?",
    opts: ["3", "5", "6", "8"],
    ans: 2,
  },
  {
    q:  "What is Chelsea's nickname?",
    opts: ["The Blues", "The Lions", "The Hammers", "The Gunners"],
    ans: 0,
  },
  {
    q:  "Didier Drogba scored his famous equaliser in the 2012 Champions League final in which minute?",
    opts: ["82nd", "85th", "88th", "90th+2"],
    ans: 2,
  },
  {
    q:  "Who was Chelsea's manager when they won their first Champions League in 2012?",
    opts: ["José Mourinho", "Roberto Di Matteo", "Carlo Ancelotti", "Claudio Ranieri"],
    ans: 1,
  },
  {
    q:  "Which country does Didier Drogba represent internationally?",
    opts: ["Ghana", "Nigeria", "Ivory Coast", "Cameroon"],
    ans: 2,
  },
  {
    q:  "Chelsea's club colours are royal blue and what other colour?",
    opts: ["Red", "Gold", "White", "Yellow"],
    ans: 2,
  },
];

let quizState = { idx: 0, score: 0, answered: false };

function initQuiz() {
  renderQuestion();
  $("quiz-next")?.addEventListener("click", nextQuestion);
  $("quiz-restart")?.addEventListener("click", restartQuiz);
}

function renderQuestion() {
  const total = QUESTIONS.length;
  const qi    = quizState.idx;
  if (qi >= total) { showResult(); return; }

  const q = QUESTIONS[qi];
  $("quiz-q-num").textContent = `Question ${qi + 1} of ${total}`;
  $("quiz-question").textContent = q.q;
  $("quiz-feedback").textContent = "";
  $("quiz-next").style.display = "none";
  $("quiz-progress-fill").style.width = `${(qi / total) * 100}%`;

  const optsEl = $("quiz-options");
  optsEl.innerHTML = q.opts.map((opt, i) => `
    <button class="quiz-opt" data-idx="${i}">${opt}</button>
  `).join("");

  optsEl.querySelectorAll(".quiz-opt").forEach(btn => {
    btn.addEventListener("click", () => handleAnswer(+btn.dataset.idx, q.ans));
  });
  quizState.answered = false;
}

function handleAnswer(chosen, correct) {
  if (quizState.answered) return;
  quizState.answered = true;

  const btns = $$(".quiz-opt");
  btns.forEach(b => b.disabled = true);
  btns[correct].classList.add("correct");

  if (chosen === correct) {
    quizState.score++;
    $("quiz-feedback").textContent = "✅ Correct! You know your Chelsea.";
    $("quiz-feedback").style.color = "#2ed573";
  } else {
    btns[chosen].classList.add("wrong");
    $("quiz-feedback").textContent = `❌ Not quite — the answer was "${QUESTIONS[quizState.idx].opts[correct]}".`;
    $("quiz-feedback").style.color = "#ff4757";
  }
  $("quiz-next").style.display = "inline-block";
}

function nextQuestion() {
  quizState.idx++;
  renderQuestion();
}

function showResult() {
  const total = QUESTIONS.length;
  const score = quizState.score;
  $("quiz-progress-fill").style.width = "100%";
  $("quiz-q-num").textContent = "";
  $("quiz-question").style.display = "none";
  $("quiz-options").style.display = "none";
  $("quiz-feedback").style.display = "none";
  $("quiz-next").style.display = "none";
  $("quiz-result").style.display = "block";
  $("result-score").textContent = `${score}/${total}`;

  const msgs = [
    ["0-3", "Don't worry — every Blue fan had to start somewhere. Study up!", "#ff4757"],
    ["4-5", "Decent effort! You know the basics, but there's more to learn.", "#ffe44d"],
    ["6-7", "Great work! You clearly bleed blue. Stamford Bridge would be proud.", "#2ed573"],
    ["8-8", "PERFECT SCORE! You're a true Chelsea legend. Drogba himself would approve!", "#FFD700"],
  ];
  let [, msg, color] = score <= 3 ? msgs[0] : score <= 5 ? msgs[1] : score <= 7 ? msgs[2] : msgs[3];
  $("result-msg").textContent = msg;
  $("result-score").style.color = color;
  $("result-label").textContent = score === total ? "⭐ Perfect Score!" : score >= 6 ? "Blue to the core!" : "Keep learning!";
  showToast(`Quiz done! You scored ${score}/${total} 🏆`);
}

function restartQuiz() {
  quizState = { idx: 0, score: 0, answered: false };
  $("quiz-question").style.display = "";
  $("quiz-options").style.display = "";
  $("quiz-feedback").style.display = "";
  $("quiz-result").style.display = "none";
  renderQuestion();
}

/* ─── TOAST ─────────────────────────────────────────────── */
let toastTimer;
function showToast(msg) {
  const t = $("toast");
  if (!t) return;
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 3200);
}

/* ─── HONOURS COUNTER ANIMATION ─────────────────────────── */
function initHonourCounters() {
  const band = $("honours-band");
  if (!band) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        band.querySelectorAll(".honour-count[data-target]").forEach(el => {
          animateCounter(el, +el.dataset.target, 1200);
        });
        obs.unobserve(e.target);
      }
    });
  }, { threshold: .4 });
  obs.observe(band);
}

/* ─── SCORE TICKER DUPLICATE ────────────────────────────── */
function initTicker() {
  const inner = document.querySelector(".ticker-inner");
  if (!inner) return;
  const clone = inner.cloneNode(true);
  inner.parentElement.appendChild(clone);
}

/* ─── BOOT ──────────────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  initParticles();
  initNav();
  initScrollAnim();
  initStatBars();
  initLegendReveal();
  initGallery();
  initQuiz();
  initHonourCounters();
  initTicker();
});
