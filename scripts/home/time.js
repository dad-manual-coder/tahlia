const MELBOURNE = "Australia/Melbourne";

const WEATHER_MAP = {
  0: "Clear",
  1: "Mostly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Rime fog",
  51: "Light drizzle",
  61: "Rain",
  63: "Steady rain",
  65: "Heavy rain",
  71: "Snow",
  80: "Showers",
  95: "Thunder",
};

const WEEKDAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function firstSunday(year, monthIndex0) {
  const d = new Date(Date.UTC(year, monthIndex0, 1));
  return 1 + ((7 - d.getUTCDay()) % 7);
}

export function melbourneOffsetHours(date) {
  const y = date.getUTCFullYear();
  const start = Date.UTC(y, 9, firstSunday(y, 9), 16, 0, 0);
  const end = Date.UTC(y + 1, 3, firstSunday(y + 1, 3), 16, 0, 0);
  const prevStart = Date.UTC(y - 1, 9, firstSunday(y - 1, 9), 16, 0, 0);
  const thisEnd = Date.UTC(y, 3, firstSunday(y, 3), 16, 0, 0);
  const t = date.getTime();
  if (t >= start && t < end) return 11;
  if (t >= prevStart && t < thisEnd) return 11;
  return 10;
}

function partsFromOffset(date, offsetHours) {
  const shifted = new Date(date.getTime() + offsetHours * 3600000);
  return {
    weekday: WEEKDAYS[shifted.getUTCDay()],
    year: shifted.getUTCFullYear(),
    monthName: MONTHS[shifted.getUTCMonth()],
    monthIndex: shifted.getUTCMonth() + 1,
    day: shifted.getUTCDate(),
    hour: shifted.getUTCHours(),
    minute: shifted.getUTCMinutes(),
    second: shifted.getUTCSeconds(),
  };
}

function localParts(date) {
  return {
    weekday: WEEKDAYS[date.getDay()],
    year: date.getFullYear(),
    monthName: MONTHS[date.getMonth()],
    monthIndex: date.getMonth() + 1,
    day: date.getDate(),
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds(),
  };
}

export function formatH12(hour, minute) {
  const ampm = hour >= 12 ? "pm" : "am";
  const h = hour % 12 || 12;
  return `${h}:${String(minute).padStart(2, "0")} ${ampm}`;
}

export function formatLongDate(parts) {
  return `${parts.weekday}, ${parts.day} ${parts.monthName}`;
}

export function periodOf(hour, minute) {
  const t = hour * 60 + minute;
  if (t >= 5 * 60 && t < 7 * 60) return "dawn";
  if (t >= 7 * 60 && t < 9 * 60) return "morning";
  if (t >= 9 * 60 && t < 12 * 60) return "work";
  if (t >= 12 * 60 && t < 14 * 60) return "lunch";
  if (t >= 14 * 60 && t < 17 * 60) return "afternoon";
  if (t >= 17 * 60 && t < 19 * 60) return "arvo";
  if (t >= 19 * 60 && t < 21 * 60) return "evening";
  if (t >= 21 * 60 && t < 22 * 60 + 30) return "night";
  return "sleep";
}

export function themeOf(period) {
  if (period === "arvo" || period === "evening") return "dusk";
  if (period === "night" || period === "sleep" || period === "dawn") return "night";
  return "day";
}

function pick(list, seed) {
  return list[Math.abs(seed) % list.length];
}

function seedFrom(parts, extra = 0) {
  return parts.year * 10000 + parts.monthIndex * 100 + parts.day + extra * 17;
}

const GREETINGS = {
  dawn: ["You're up with the magpies.", "The sky is only just deciding."],
  morning: ["Good morning, Tahlia.", "Morning — the kettle's the first appointment."],
  work: ["It's work o'clock.", "The day has proper shoulders now."],
  lunch: ["Lunch hour, properly.", "Midday. Step away from the screen."],
  afternoon: ["Good afternoon.", "The arvo has arrived."],
  arvo: ["Late arvo.", "The light is going honey-coloured."],
  evening: ["Good evening, Tahlia.", "Evening — the city is putting jewellery on."],
  night: ["Night has settled in.", "The house can go quiet now."],
  sleep: ["It's time to sleep in.", "Midnight territory. Lights down."],
};

const WEEKDAY_NOTICES = {
  dawn: [
    {
      title: "Too early, still yours",
      body: "If the house is quiet, keep it that way. Water, a jumper, and no emails until the sun actually means it.",
    },
    {
      title: "Dawn watch",
      body: "Melbourne dawns are thin and silver. If you're awake, let it be for a slow start — not a head start on stress.",
    },
  ],
  morning: [
    {
      title: "Good morning",
      body: "Trams are filling and the coffee machines are already loud. Eat something with protein before you leave the house.",
    },
    {
      title: "Open the day gently",
      body: "Lay out what you'll wear, check the weather once, then go. Melbourne will change its mind anyway.",
    },
  ],
  work: [
    {
      title: "Time for work",
      body: "If you're heading in, leave a buffer for Swanston Street. Phone on Do Not Disturb for the first deep hour.",
    },
    {
      title: "The useful middle of the morning",
      body: "This is the hour things actually get finished. One important task before you open the noisy apps.",
    },
  ],
  lunch: [
    {
      title: "Eat like you mean it",
      body: "Get out of your chair. Even a laneway loop counts. Melbourne lunches are better when they're not at the keyboard.",
    },
    {
      title: "Midday reset",
      body: "Step outside — four seasons in one day is not a myth. A bit of air now saves the 3pm slump.",
    },
  ],
  afternoon: [
    {
      title: "Arvo pace",
      body: "Useful hour: finish one thing, drink water, and don't start a new universe of tabs.",
    },
    {
      title: "The afternoon dip",
      body: "If your brain goes soft, that's normal. Stretch, a short walk, then the last block of work.",
    },
  ],
  arvo: [
    {
      title: "Knock-off light",
      body: "The commute is stacking. If you can leave on time, do. The Yarra looks better when you're not rushing it.",
    },
    {
      title: "Close the loop",
      body: "Write tomorrow's first task now so evening-you isn't still at work in your head.",
    },
  ],
  evening: [
    {
      title: "Evening in Melbourne",
      body: "Lights along the river, kitchens warming up. Put the day in a drawer. Dinner doesn't need to be a performance.",
    },
    {
      title: "Come home to yourself",
      body: "Change out of the day clothes. Music low. If you're going out, eat first and tell someone the plan.",
    },
  ],
  night: [
    {
      title: "Night mode",
      body: "Dim the brightness. No new conversations that need a lawyer. Herbal tea, a chapter, then bed.",
    },
    {
      title: "The city gets quiet",
      body: "This is the hour that decides tomorrow. Charge the phone in another room if you can.",
    },
  ],
  sleep: [
    {
      title: "Sleep in, Tahlia",
      body: "If this page is still open, that's your cue. The dashboard will be here in the morning. Lights down.",
    },
    {
      title: "It's late",
      body: "Nothing urgent lives after midnight. Water, sleep, door closed. Be kind to morning-you.",
    },
  ],
};

const SAT_NOTICES = {
  dawn: [
    {
      title: "Saturday is barely awake",
      body: "No alarms required. If you're up, make it for a quiet coffee on the balcony, not a to-do list.",
    },
  ],
  morning: [
    {
      title: "Saturday with the girls",
      body: "Coffee first — a proper one. Then decide: Chapel Street wander, a nail appointment, or the long way to the bay.",
    },
    {
      title: "Casual Saturday",
      body: "Text the group chat before 10 if you want a table. Melbourne brunch does not forgive lateness.",
    },
  ],
  work: [
    {
      title: "No office, still a day",
      body: "Markets, a slow shop, or a class. Keep the outfit easy — sneakers you'll actually walk in.",
    },
  ],
  lunch: [
    {
      title: "Saturday lunch",
      body: "Share plates, sparkling water, nowhere to be. If the sun's out, grab a courtyard before it disappears.",
    },
  ],
  afternoon: [
    {
      title: "Bay or blankets",
      body: "St Kilda or Brighton if the wind behaves. Otherwise a film, a second coffee, and no guilt about either.",
    },
  ],
  arvo: [
    {
      title: "Golden Saturday",
      body: "This is the pretty hour. Walk it off. If you're going out later, start getting ready without rushing.",
    },
  ],
  evening: [
    {
      title: "Saturday evening",
      body: "If you're going out with the girls, share your location, eat something, and pick a meeting spot that isn't a moving target.",
    },
  ],
  night: [
    {
      title: "Saturday night",
      body: "Stay with your people. Card for the tram. A plan for getting home that doesn't depend on a stranger's phone battery.",
    },
  ],
  sleep: [
    {
      title: "Let Saturday end",
      body: "The best nights finish at home. Kick the shoes, water, sleep. Church or a slow Sunday can wait until you wake.",
    },
  ],
};

const SUN_NOTICES = {
  dawn: [
    {
      title: "Sunday hush",
      body: "The whole city sleeps in. You can too. If you're going to church, that's later — this hour is still yours.",
    },
  ],
  morning: [
    {
      title: "Sunday morning",
      body: "If you're heading to church, leave a little early — the trams are half-asleep too. Quiet clothes, phone on silent.",
    },
    {
      title: "Church hour",
      body: "A slow breakfast if you're not going out, or a tidy departure if you are. Sunday mornings like a little ceremony.",
    },
  ],
  work: [
    {
      title: "After service, still Sunday",
      body: "Lunch with family, a walk, or a gallery hour at the NGV. Keep the day unhurried on purpose.",
    },
  ],
  lunch: [
    {
      title: "Sunday table",
      body: "Roast, leftovers, or a pub garden. Put the phone face down and let the conversation be the event.",
    },
  ],
  afternoon: [
    {
      title: "Sunday arvo",
      body: "Laundry that doesn't feel like punishment. A park. A nap that you actually take. Protect the softness.",
    },
  ],
  arvo: [
    {
      title: "The Sunday scaries can wait",
      body: "Write three things for Monday, then stop. The week does not get extra points for being rehearsed tonight.",
    },
  ],
  evening: [
    {
      title: "Sunday evening reset",
      body: "Lay out Monday's clothes in the Digital Closet headspace. Bag, keys, charger. Future-you will be grateful.",
    },
  ],
  night: [
    {
      title: "Close the weekend",
      body: "Lights warmer, screen dimmer. A shower, a chapter, bed at a decent hour so Monday isn't a cliff.",
    },
  ],
  sleep: [
    {
      title: "Sleep in for the week ahead",
      body: "Monday is coming either way. Meeting it rested is the only strategy that works.",
    },
  ],
};

const MELBOURNE_BEATS = {
  dawn: [
    "The first trains rattle under the CBD. Bakers on Brunswick Street have been up for hours.",
    "Fog sometimes sits on the bay. If you can see the West Gate lights, it's a clear one.",
  ],
  morning: [
    "Peak hour on the 96 and the 86. Flat whites migrating across the grid.",
    "School drop-offs, hi-vis on the roads, and the laneways smelling like coffee and rain.",
  ],
  work: [
    "Collins Street in office mode. If you're WFH, pretend the tram bells aren't a clock.",
    "Desks on, meetings stacking. The useful hours of an Australian weekday.",
  ],
  lunch: [
    "Fed Square steps fill with paper bags. The NGV lawn is a legitimate meeting room.",
    "Hardware Lane at a clip. Don't eat at your laptop if you can help it.",
  ],
  afternoon: [
    "The wind comes up off the bay. Jacket even if the morning was warm.",
    "School pickup weather. Trams louder. The CBD starts leaking toward the suburbs.",
  ],
  arvo: [
    "Golden hour on the Yarra. Runners on the Tan, commuters on the bridge.",
    "Knock-off pints start appearing in rooftop corners. You don't have to join them.",
  ],
  evening: [
    "The Arts Centre spire is lit. Kitchens in Fitzroy and Richmond going full send.",
    "Trams glow. If you're crossing the city, this is the pretty way home.",
  ],
  night: [
    "Chapel Street finds a second wind. The river goes black and mirrored.",
    "Late trams, kebab lights, someone laughing too loud on a platform. Normal.",
  ],
  sleep: [
    "Even King Street gives up eventually. The city is for sleeping now.",
    "Freight on the West Gate, a taxi, a possum. That's the whole soundtrack.",
  ],
};

const SAT_BEATS = [
  "Queen Vic Market mornings, then the rest of Saturday as a choose-your-own.",
  "Beach bags on the 16 tram. Sunglasses even when the sky is indecisive.",
  "AFL suburbs still wearing last night's colours. Let them.",
];

const SUN_BEATS = [
  "Church bells in the older suburbs. Slow breakfast everywhere else.",
  "Op shops in the afternoon, gardens if the sun holds, early dinner.",
  "Sunday reset: bags packed, clothes chosen, phone charging out of reach.",
];

const QUOTES = [
  ["The details are not the details. They make the design.", "Charles Eames"],
  ["Style is a way to say who you are without having to speak.", "Rachel Zoe"],
  ["A girl should be two things: who and what she wants.", "Coco Chanel"],
  ["Give me a museum and I'll fill it.", "Pablo Picasso"],
  ["The body says what words cannot.", "Martha Graham"],
  ["Melbourne is the city of lanes, weather, and second coffees.", "Local wisdom"],
  ["Dress like you're already invited.", "Anonymous"],
  ["Art washes away from the soul the dust of everyday life.", "Picasso"],
  ["You can't put a limit on anything. The more you dream, the farther you get.", "Michael Phelps"],
  ["Elegance is not standing out, but being remembered.", "Giorgio Armani"],
];

const SEASONAL = {
  1: "High summer. Sunscreen, a bottle of water, and never trust a cloudless noon.",
  2: "Still summer, with a hint of school-year machinery starting up again.",
  3: "March light. Festival season, longer shadows, jackets in the evening.",
  4: "Autumn. The best weather Melbourne has, and it knows it.",
  5: "Proper autumn. Leaves in the gardens, footy talk everywhere.",
  6: "Winter. Layers, soup, and leaving a spare umbrella on the tram by accident.",
  7: "Deep winter. Blue-grey afternoons. Lights on at 5.",
  8: "Late winter trying to be spring and failing with charm.",
  9: "Spring footy finals energy, blossom, and everyone pretending it's warm.",
  10: "Spring racing is warming up. Jacarandas incoming. A good month to dress up a little.",
  11: "Melbourne Cup week energy even on ordinary days. Hats, traffic, sparkling water.",
  12: "December. Christmas in the heat, carols by candlelight, linen instead of wool.",
};

export function buildMoment(date, offsetHours) {
  const local = localParts(date);
  const mel = partsFromOffset(date, offsetHours);
  const period = periodOf(mel.hour, mel.minute);
  const weekday = mel.weekday;
  const isSat = weekday === "Saturday";
  const isSun = weekday === "Sunday";
  const bank = isSat ? SAT_NOTICES : isSun ? SUN_NOTICES : WEEKDAY_NOTICES;
  const seed = seedFrom(mel, period.length);
  const greeting = pick(GREETINGS[period], seed);
  const notice = pick(bank[period], seed + 3);
  let beat = pick(MELBOURNE_BEATS[period], seed + 9);
  if (isSat) beat = pick(SAT_BEATS, seed);
  if (isSun) beat = pick(SUN_BEATS, seed);
  const quote = QUOTES[seedFrom(mel) % QUOTES.length];
  return {
    local,
    mel,
    period,
    theme: themeOf(period),
    isSat,
    isSun,
    isSleep: period === "sleep" || period === "night",
    greeting,
    notice,
    melbourneBeat: beat,
    seasonal: SEASONAL[mel.monthIndex],
    quote: { text: quote[0], by: quote[1] },
    visitorClock: formatH12(local.hour, local.minute),
    melbourneClock: formatH12(mel.hour, mel.minute),
    visitorDate: formatLongDate(local),
    melbourneDate: formatLongDate(mel),
  };
}

export function detectPlace() {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
  const city = timezone.split("/").pop()?.replace(/_/g, " ") || "Here";
  return {
    city: city === "UTC" ? "This device" : city,
    country: "",
    timezone,
  };
}

export async function syncMelbourneOffset() {
  try {
    const res = await fetch(
      "https://timeapi.io/api/Time/current/zone?timeZone=Australia/Melbourne",
      { signal: AbortSignal.timeout(3500) },
    );
    if (!res.ok) return melbourneOffsetHours(new Date());
    const data = await res.json();
    if (typeof data.dstActive === "boolean") return data.dstActive ? 11 : 10;
  } catch {
    /* computed offset is enough */
  }
  return melbourneOffsetHours(new Date());
}

export async function fetchWeather() {
  const key = "tahlia:weather";
  try {
    const cached = sessionStorage.getItem(key);
    if (cached) return JSON.parse(cached);
  } catch {
    /* ignore */
  }
  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.searchParams.set("latitude", "-37.8136");
  url.searchParams.set("longitude", "144.9631");
  url.searchParams.set("current", "temperature_2m,weather_code,wind_speed_10m");
  url.searchParams.set("timezone", MELBOURNE);
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(3500) });
    if (!res.ok) return null;
    const data = await res.json();
    const cur = data.current || {};
    const weather = {
      temp: Math.round(cur.temperature_2m),
      label: WEATHER_MAP[cur.weather_code] || "Mixed",
      wind: Math.round(cur.wind_speed_10m),
    };
    try {
      sessionStorage.setItem(key, JSON.stringify(weather));
    } catch {
      /* ignore */
    }
    return weather;
  } catch {
    return null;
  }
}
