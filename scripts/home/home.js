import {
  buildMoment,
  detectPlace,
  fetchWeather,
  syncMelbourneOffset,
} from "./time.js";

const $ = (id) => document.getElementById(id);

const MOODS = ["Calm", "Bright", "Focused", "Tender", "Tired"];
const PLAN_KEYS = ["Morning", "Midday", "Afternoon", "Night"];

function save(key, value) {
  localStorage.setItem(`tahlia:${key}`, value);
}
function load(key, fallback = "") {
  return localStorage.getItem(`tahlia:${key}`) ?? fallback;
}

function renderClocks(moment, place) {
  $("you-time").textContent = moment.visitorClock;
  $("you-place").textContent = place.city;
  $("mel-time").textContent = moment.melbourneClock;
  $("mel-date").textContent = moment.melbourneDate;
  $("you-date").textContent = moment.visitorDate;
}

function renderMoment(moment, weatherMel) {
  document.documentElement.dataset.theme = moment.theme;
  document.documentElement.dataset.weekend = moment.isSat
    ? "sat"
    : moment.isSun
      ? "sun"
      : "week";
  document.body.classList.toggle("is-sleep", moment.isSleep);

  $("eyebrow").textContent = moment.isSat
    ? "Saturday in Melbourne"
    : moment.isSun
      ? "Sunday in Melbourne"
      : `${moment.mel.weekday} in Melbourne`;
  $("hello").textContent = moment.greeting;
  $("notice-title").textContent = moment.notice.title;
  $("notice-body").textContent = moment.notice.body;
  $("beat").textContent = `In Melbourne it's ${moment.melbourneClock} — ${moment.melbourneBeat}`;
  $("season").textContent = moment.seasonal;
  $("quote").textContent = moment.quote.text;
  $("quote-by").textContent = moment.quote.by;

  const chips = [];
  chips.push(moment.melbourneDate);
  if (weatherMel) chips.push(`${weatherMel.temp}° ${weatherMel.label} in Melbourne`);
  if (moment.isSleep) chips.push("Sleepy mode");
  if (moment.isSat) chips.push("Girls / coffee / bay");
  if (moment.isSun) chips.push("Church morning energy");
  $("chips").innerHTML = chips.map((c) => `<span class="chip">${c}</span>`).join("");
}

function maybeNotify(moment) {
  const key = `note:${moment.mel.year}-${moment.mel.monthIndex}-${moment.mel.day}-${moment.period}`;
  if (load(key)) return;
  save(key, "1");
  if (!("Notification" in window) || Notification.permission !== "granted") return;
  try {
    new Notification(moment.notice.title, { body: moment.notice.body });
  } catch {
    /* ignore */
  }
}

function bindNotes() {
  const notes = $("notes");
  notes.value = load("notes");
  notes.addEventListener("input", () => save("notes", notes.value));

  PLAN_KEYS.forEach((slot) => {
    const input = $(`plan-${slot.toLowerCase()}`);
    input.value = load(`plan-${slot}`, "");
    input.addEventListener("input", () => save(`plan-${slot}`, input.value));
  });

  const moodWrap = $("moods");
  const current = load("mood", "Calm");
  MOODS.forEach((mood) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = mood;
    btn.className = mood === current ? "is-on" : "";
    btn.addEventListener("click", () => {
      save("mood", mood);
      [...moodWrap.children].forEach((b) => b.classList.toggle("is-on", b === btn));
    });
    moodWrap.append(btn);
  });
}

function bindChrome(place) {
  $("dismiss").addEventListener("click", () => {
    $("notice").hidden = true;
  });
  $("theme-toggle").addEventListener("click", () => {
    const order = ["day", "dusk", "night"];
    const now = document.documentElement.dataset.theme || "day";
    const next = order[(order.indexOf(now) + 1) % order.length];
    document.documentElement.dataset.theme = next;
    save("theme-lock", next);
  });
  $("theme-auto").addEventListener("click", () => {
    localStorage.removeItem("tahlia:theme-lock");
  });
  $("notify-btn").addEventListener("click", async () => {
    if (!("Notification" in window)) return;
    const perm = await Notification.requestPermission();
    $("notify-btn").textContent = perm === "granted" ? "Alerts on" : "Alerts blocked";
  });
  $("where").textContent = place.timezone.replace(/_/g, " ");
}

let lastPeriod = "";

async function main() {
  bindNotes();
  const place = detectPlace();
  const [offsetHours, weatherMel] = await Promise.all([
    syncMelbourneOffset(),
    fetchWeather(),
  ]);
  bindChrome(place);

  const tick = () => {
    const moment = buildMoment(new Date(), offsetHours);
    const lock = load("theme-lock");
    renderClocks(moment, place);
    renderMoment(moment, weatherMel);
    if (lock) document.documentElement.dataset.theme = lock;
    if (moment.period !== lastPeriod) {
      lastPeriod = moment.period;
      $("notice").hidden = false;
      maybeNotify(moment);
    }
  };

  tick();
  setInterval(tick, 1000);
}

main();
