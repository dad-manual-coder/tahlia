const STAGES = [
  "Warming the lights",
  "Hanging the wardrobe",
  "Mixing the palette",
  "Taking the field",
  "Opening your day",
];

const bar = document.getElementById("bar");
const status = document.getElementById("status");
const stage = document.getElementById("stage");
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const total = reduce ? 900 : 6200;
const started = performance.now();
let done = false;

function go() {
  if (done) return;
  done = true;
  stage.classList.add("is-leaving");
  setTimeout(() => {
    window.location.href = "../home.html";
  }, reduce ? 50 : 520);
}

function frame(now) {
  const t = Math.min(1, (now - started) / total);
  bar.style.width = `${Math.round(t * 100)}%`;
  const i = Math.min(STAGES.length - 1, Math.floor(t * STAGES.length));
  status.textContent = STAGES[i];
  if (t < 1) requestAnimationFrame(frame);
  else go();
}

document.getElementById("skip").addEventListener("click", go);
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") go();
});

requestAnimationFrame(frame);
