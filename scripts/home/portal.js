export function runPortal({ target, duration = 4200 }) {
  const bar = document.getElementById("bar");
  const skip = document.getElementById("skip");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const total = reduce ? 700 : duration;
  const started = performance.now();
  let done = false;

  function go() {
    if (done) return;
    done = true;
    window.location.href = target;
  }

  function frame(now) {
    const t = Math.min(1, (now - started) / total);
    if (bar) bar.style.width = `${Math.round(t * 100)}%`;
    if (t < 1) requestAnimationFrame(frame);
    else go();
  }

  skip?.addEventListener("click", go);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") go();
  });
  requestAnimationFrame(frame);
}
