/* ═══════════════════════════════════════════════════════════
   ARTISAN — art_page.js
   Theme switching · Welcome · Collection CRUD · Draw Studio
   Lightbox · Movement filter · Toast · Scroll animations
   All state: localStorage (device-only, never sent anywhere)
═══════════════════════════════════════════════════════════ */
"use strict";

/* ─── KEYS ──────────────────────────────────────────────── */
const K = {
  USER:       "art_user",
  THEME:      "art_theme",
  COLLECTION: "art_coll_v2",
  COLL_NAME:  "art_coll_name",
};

/* ─── DEFAULTS ──────────────────────────────────────────── */
const DEFAULT_USER      = "Guest";
const DEFAULT_COLL_NAME = "Tahlia's Collection";

/* ─── STATE ─────────────────────────────────────────────── */
let state = {
  user:       localStorage.getItem(K.USER)      || null,
  theme:      localStorage.getItem(K.THEME)     || "dark",
  collection: [],
  collName:   localStorage.getItem(K.COLL_NAME) || DEFAULT_COLL_NAME,
};

try {
  const raw = localStorage.getItem(K.COLLECTION);
  if (raw) state.collection = JSON.parse(raw);
} catch(_) { state.collection = []; }

/* ─── DOM ───────────────────────────────────────────────── */
const $ = id => document.getElementById(id);
const $$ = sel => document.querySelectorAll(sel);

/* ─── THEME ENGINE ──────────────────────────────────────── */
const themeLink = document.getElementById("theme-link");

function setTheme(t, save = true) {
  state.theme = t;
  if (save) localStorage.setItem(K.THEME, t);
  themeLink.href = `../styles/art_page/${t}.css`;
  $$(".theme-btn").forEach(b => b.classList.toggle("on", b.dataset.theme === t));
  // mobile buttons too
  $$("[data-mob-theme]").forEach(b => b.classList.toggle("on", b.dataset.mobTheme === t));
}

/* ─── WELCOME ───────────────────────────────────────────── */
function bootWelcome() {
  if (state.user) {
    $("welcome-screen").style.display = "none";
    syncUserUI();
    return;
  }
  $("welcome-screen").style.display = "flex";
}

function enterGallery() {
  const raw = $("w-input").value.trim();
  state.user = raw || DEFAULT_USER;
  localStorage.setItem(K.USER, state.user);
  dismissWelcome();
}

function dismissWelcome() {
  const s = $("welcome-screen");
  s.classList.add("out");
  setTimeout(() => { s.style.display = "none"; }, 750);
  syncUserUI();
  showToast(`Welcome, ${state.user} ✦`);
}

function syncUserUI() {
  const n = state.user || DEFAULT_USER;
  $$(".js-username").forEach(el => el.textContent = n);
}

/* ─── COLLECTION NAME ───────────────────────────────────── */
function syncCollName() {
  $$(".js-coll-name").forEach(el => el.textContent = state.collName);
}

function startRename() {
  const form = $("coll-rename-form");
  $("coll-rename-input").value = state.collName;
  form.classList.add("show");
  $("coll-rename-input").focus();
}

function saveRename() {
  const v = $("coll-rename-input").value.trim();
  if (v) {
    state.collName = v;
    localStorage.setItem(K.COLL_NAME, v);
    syncCollName();
    showToast("Collection renamed.");
  }
  $("coll-rename-form").classList.remove("show");
}

/* ─── COLLECTION CRUD ───────────────────────────────────── */
function saveCollection() {
  try {
    localStorage.setItem(K.COLLECTION, JSON.stringify(state.collection));
  } catch(_) {
    showToast("⚠ Storage full — remove some pieces.");
  }
}

function addPiece(src, name, type = "photo") {
  const piece = {
    id:   `${Date.now()}_${Math.random().toString(36).slice(2,7)}`,
    src,
    name: name || "Untitled",
    type,
    date: new Date().toLocaleDateString("en-GB", { day:"numeric", month:"short", year:"numeric" }),
  };
  state.collection.unshift(piece);
  saveCollection();
  renderCollection();
  return piece;
}

function removePiece(id) {
  state.collection = state.collection.filter(p => p.id !== id);
  saveCollection();
  renderCollection();
  showToast("Removed from collection.");
}

function renderCollection() {
  const grid = $("coll-grid");
  if (!grid) return;
  syncCollName();

  if (!state.collection.length) {
    grid.innerHTML = `<div class="coll-empty">Your collection is waiting — upload a photo or create a drawing above.</div>`;
    return;
  }

  grid.innerHTML = state.collection.map(p => `
    <div class="art-piece" data-id="${p.id}">
      <img class="art-piece-img" src="${p.src}"
           alt="${esc(p.name)}"
           loading="lazy"
           data-lb="${p.src}"
           data-lbcap="${esc(p.name)}">
      <div class="art-piece-body">
        <div class="art-piece-type">${p.type === "drawing" ? "✏ Drawing" : "📷 Photo"}</div>
        <div class="art-piece-title" title="${esc(p.name)}">${esc(p.name)}</div>
        <div class="art-piece-meta">${p.date}</div>
      </div>
      <button class="art-del" data-del="${p.id}" aria-label="Remove">✕</button>
    </div>
  `).join("");

  grid.querySelectorAll("[data-lb]").forEach(img => {
    img.addEventListener("click", () => openLightbox(img.dataset.lb, img.dataset.lbcap));
  });
  grid.querySelectorAll("[data-del]").forEach(btn => {
    btn.addEventListener("click", e => { e.stopPropagation(); removePiece(btn.dataset.del); });
  });
}

/* ─── FILE UPLOAD ───────────────────────────────────────── */
function handleFiles(files) {
  const allowed = ["image/jpeg","image/png","image/gif","image/webp","image/svg+xml"];
  let count = 0;
  Array.from(files).forEach(f => {
    if (!allowed.includes(f.type)) return;
    if (f.size > 12 * 1024 * 1024) { showToast("⚠ Max 12 MB per file."); return; }
    const reader = new FileReader();
    reader.onload = e => {
      addPiece(e.target.result, f.name.replace(/\.[^.]+$/, ""), "photo");
      count++;
      if (count === 1) showToast("✦ Added to your collection!");
    };
    reader.readAsDataURL(f);
  });
}

/* ─── LIGHTBOX ──────────────────────────────────────────── */
function openLightbox(src, cap) {
  $("lb-img").src = src;
  $("lb-caption").textContent = cap || "";
  $("lightbox").classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeLightbox() {
  $("lightbox").classList.remove("open");
  document.body.style.overflow = "";
}

/* ─── FEATURED WORKS LIGHTBOX ───────────────────────────── */
function initFeaturedLB() {
  $$(".mw-card").forEach(card => {
    const img    = card.querySelector(".mw-img");
    const title  = card.querySelector(".mw-title");
    const artist = card.querySelector(".mw-artist");
    if (!img) return;
    card.addEventListener("click", () => {
      const cap = artist ? `${artist.textContent} — ${title?.textContent}` : (title?.textContent || "");
      openLightbox(img.src, cap);
    });
  });
}

/* ─── MOVEMENT FILTER ───────────────────────────────────── */
function initMovements() {
  $$(".pill").forEach(pill => {
    pill.addEventListener("click", () => {
      $$(".pill").forEach(p => p.classList.remove("on"));
      pill.classList.add("on");
      const f = pill.dataset.mv;
      $$(".mv-card").forEach(c => {
        c.style.display = (f === "all" || c.dataset.mv === f) ? "" : "none";
      });
    });
  });
}

/* ─── DRAW STUDIO ───────────────────────────────────────── */
let drawing = false;
let drawCtx;
let lastX = 0, lastY = 0;
let currentTool = "pen"; // pen | eraser | fill
let brushColor  = "#ffffff";
let brushSize   = 6;
let brushOpacity = 1;

function initDrawStudio() {
  const canvas = $("draw-canvas");
  if (!canvas) return;
  canvas.width  = Math.min(800, window.innerWidth - 48);
  canvas.height = Math.round(canvas.width * .65);
  drawCtx = canvas.getContext("2d");
  fillCanvas("#1a1a22"); // default bg

  /* tool buttons */
  $$(".tool-btn[data-tool]").forEach(btn => {
    btn.addEventListener("click", () => {
      currentTool = btn.dataset.tool;
      $$(".tool-btn[data-tool]").forEach(b => b.classList.remove("on"));
      btn.classList.add("on");
      canvas.style.cursor = currentTool === "eraser" ? "cell"
                          : currentTool === "fill"   ? "crosshair"
                          : "crosshair";
    });
  });

  /* colour swatches */
  $$(".color-dot").forEach(dot => {
    dot.addEventListener("click", () => {
      brushColor = dot.dataset.color;
      $$(".color-dot").forEach(d => d.classList.remove("on"));
      dot.classList.add("on");
      const cp = $("brush-color");
      if (cp) cp.value = brushColor;
    });
  });

  /* custom colour picker */
  const cp = $("brush-color");
  if (cp) {
    cp.addEventListener("input", () => {
      brushColor = cp.value;
      $$(".color-dot").forEach(d => d.classList.remove("on"));
    });
  }

  /* size */
  const bs = $("brush-size");
  if (bs) bs.addEventListener("input", () => { brushSize = +bs.value; });

  /* opacity */
  const bo = $("brush-opacity");
  if (bo) bo.addEventListener("input", () => { brushOpacity = +bo.value; });

  /* clear */
  $("draw-clear")?.addEventListener("click", () => {
    fillCanvas("#1a1a22");
    showToast("Canvas cleared.");
  });

  /* mouse */
  canvas.addEventListener("mousedown",  e => startDraw(e));
  canvas.addEventListener("mousemove",  e => draw(e));
  canvas.addEventListener("mouseup",    () => { drawing = false; });
  canvas.addEventListener("mouseleave", () => { drawing = false; });

  /* touch */
  canvas.addEventListener("touchstart", e => { e.preventDefault(); startDraw(e.touches[0]); }, { passive: false });
  canvas.addEventListener("touchmove",  e => { e.preventDefault(); draw(e.touches[0]);      }, { passive: false });
  canvas.addEventListener("touchend",   () => { drawing = false; });
}

function fillCanvas(color) {
  if (!drawCtx) return;
  const c = $("draw-canvas");
  drawCtx.fillStyle = color;
  drawCtx.fillRect(0, 0, c.width, c.height);
}

function getPos(e, canvas) {
  const r = canvas.getBoundingClientRect();
  return {
    x: (e.clientX - r.left) * (canvas.width  / r.width),
    y: (e.clientY - r.top)  * (canvas.height / r.height),
  };
}

function startDraw(e) {
  const canvas = $("draw-canvas");
  const { x, y } = getPos(e, canvas);

  if (currentTool === "fill") {
    floodFill(Math.round(x), Math.round(y), brushColor);
    return;
  }
  drawing = true;
  lastX = x; lastY = y;
  drawCtx.beginPath();
  drawCtx.arc(x, y, brushSize / 2, 0, Math.PI * 2);
  drawCtx.fillStyle = currentTool === "eraser" ? "#1a1a22" : hexToRgba(brushColor, brushOpacity);
  drawCtx.fill();
}

function draw(e) {
  if (!drawing) return;
  const canvas = $("draw-canvas");
  const { x, y } = getPos(e, canvas);

  drawCtx.globalCompositeOperation = currentTool === "eraser" ? "destination-out" : "source-over";
  drawCtx.strokeStyle = hexToRgba(brushColor, brushOpacity);
  drawCtx.lineWidth   = brushSize;
  drawCtx.lineCap     = "round";
  drawCtx.lineJoin    = "round";
  drawCtx.globalAlpha = brushOpacity;
  drawCtx.beginPath();
  drawCtx.moveTo(lastX, lastY);
  drawCtx.lineTo(x, y);
  drawCtx.stroke();
  drawCtx.globalAlpha = 1;
  drawCtx.globalCompositeOperation = "source-over";
  lastX = x; lastY = y;
}

/* simple scanline flood fill */
function floodFill(startX, startY, fillColor) {
  const canvas = $("draw-canvas");
  const ctx = drawCtx;
  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imgData.data;
  const w = canvas.width, h = canvas.height;
  const idx = (x, y) => (y * w + x) * 4;

  const target = [data[idx(startX,startY)], data[idx(startX,startY)+1], data[idx(startX,startY)+2], data[idx(startX,startY)+3]];
  const fill   = hexToArr(fillColor);

  if (colorsMatch(target, fill)) return;

  const stack = [[startX, startY]];
  const visited = new Uint8Array(w * h);

  while (stack.length) {
    const [x, y] = stack.pop();
    if (x < 0 || x >= w || y < 0 || y >= h) continue;
    const i = y * w + x;
    if (visited[i]) continue;
    const ci = i * 4;
    if (!colorsMatch([data[ci],data[ci+1],data[ci+2],data[ci+3]], target)) continue;
    visited[i] = 1;
    data[ci]=fill[0]; data[ci+1]=fill[1]; data[ci+2]=fill[2]; data[ci+3]=255;
    stack.push([x+1,y],[x-1,y],[x,y+1],[x,y-1]);
  }
  ctx.putImageData(imgData, 0, 0);
}

function colorsMatch(a, b, tol = 30) {
  return Math.abs(a[0]-b[0]) < tol && Math.abs(a[1]-b[1]) < tol &&
         Math.abs(a[2]-b[2]) < tol && Math.abs(a[3]-b[3]) < tol;
}
function hexToArr(hex) {
  const h = hex.replace("#","");
  return [parseInt(h.slice(0,2),16), parseInt(h.slice(2,4),16), parseInt(h.slice(4,6),16), 255];
}
function hexToRgba(hex, alpha = 1) {
  const [r,g,b] = hexToArr(hex);
  return `rgba(${r},${g},${b},${alpha})`;
}

/* save drawing */
function saveDrawing() {
  const canvas = $("draw-canvas");
  const name   = ($("draw-name-input")?.value.trim()) || "My Drawing";
  const src    = canvas.toDataURL("image/png");
  addPiece(src, name, "drawing");
  closeDrawModal();
  showToast(`"${name}" saved to collection!`);
}

function openDrawModal() {
  $("draw-modal").classList.add("open");
  document.body.style.overflow = "hidden";
  if (!drawCtx) initDrawStudio();
}
function closeDrawModal() {
  $("draw-modal").classList.remove("open");
  document.body.style.overflow = "";
}

/* ─── TOAST ─────────────────────────────────────────────── */
let toastTimer;
function showToast(msg) {
  const t = $("toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 3000);
}

/* ─── HELPERS ───────────────────────────────────────────── */
function esc(str) {
  return String(str)
    .replace(/&/g,"&amp;").replace(/</g,"&lt;")
    .replace(/>/g,"&gt;").replace(/"/g,"&quot;");
}

/* ─── SCROLL ANIMATIONS ─────────────────────────────────── */
function initScroll() {
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

/* ─── BIND ALL EVENTS ───────────────────────────────────── */
function bindEvents() {

  /* Welcome */
  $("w-enter")?.addEventListener("click", enterGallery);
  $("w-input")?.addEventListener("keydown", e => { if (e.key === "Enter") enterGallery(); });
  $("w-skip")?.addEventListener("click", () => {
    state.user = DEFAULT_USER;
    localStorage.setItem(K.USER, state.user);
    dismissWelcome();
  });

  /* Theme buttons */
  $$(".theme-btn").forEach(btn => {
    btn.addEventListener("click", () => setTheme(btn.dataset.theme));
  });
  $$("[data-mob-theme]").forEach(btn => {
    btn.addEventListener("click", () => setTheme(btn.dataset.mobTheme));
  });

  /* Collection rename */
  $("coll-name-display")?.addEventListener("click", startRename);
  $("coll-rename-save")?.addEventListener("click", saveRename);
  $("coll-rename-input")?.addEventListener("keydown", e => {
    if (e.key === "Enter") saveRename();
    if (e.key === "Escape") $("coll-rename-form").classList.remove("show");
  });

  /* Upload */
  const dz  = $("drop-zone");
  const fi  = $("file-input");
  dz?.addEventListener("click", () => fi?.click());
  dz?.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); fi?.click(); }});
  fi?.addEventListener("change", () => handleFiles(fi.files));
  dz?.addEventListener("dragover",  e => { e.preventDefault(); dz.classList.add("over"); });
  dz?.addEventListener("dragleave", () => dz.classList.remove("over"));
  dz?.addEventListener("drop", e => {
    e.preventDefault(); dz.classList.remove("over");
    handleFiles(e.dataTransfer.files);
  });
  $("btn-upload-art")?.addEventListener("click", () => fi?.click());

  /* Draw studio */
  $("btn-open-draw")?.addEventListener("click", openDrawModal);
  $("draw-save")?.addEventListener("click", saveDrawing);
  $("draw-cancel")?.addEventListener("click", closeDrawModal);
  $("draw-modal")?.addEventListener("click", e => { if (e.target === $("draw-modal")) closeDrawModal(); });

  /* Lightbox */
  $("lb-close")?.addEventListener("click", closeLightbox);
  $("lightbox")?.addEventListener("click", e => { if (e.target === $("lightbox")) closeLightbox(); });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") { closeLightbox(); closeDrawModal(); }
  });

  /* Mobile nav */
  $("nav-burger")?.addEventListener("click", () => $("mob-menu")?.classList.add("open"));
  $("mob-close")?.addEventListener("click",  () => $("mob-menu")?.classList.remove("open"));
  $$("#mob-menu a").forEach(a => a.addEventListener("click", () => $("mob-menu")?.classList.remove("open")));
}

/* ─── BOOT ──────────────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  setTheme(state.theme, false);
  bootWelcome();
  syncCollName();
  renderCollection();
  initFeaturedLB();
  initMovements();
  initScroll();
  bindEvents();
});
