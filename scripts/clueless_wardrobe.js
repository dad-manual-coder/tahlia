/* Cher's Wardrobe — 1995 closet computer.
   Swap any file under ../images/{category}/filename.jpg and keep the id in CATALOG
   matching the filename (minus extension) so Dress Me still finds look photos. */

(function () {
  const IMG = "../images";

  const NEUTRALS = new Set([
    "black",
    "white",
    "cream",
    "navy",
    "khaki",
    "nude",
    "brown",
    "silver",
    "gold",
  ]);

  const CATALOG = [
    {
      id: "plaid-colorblock-jacket",
      name: "Colorblock Plaid Jacket",
      slot: "tops",
      src: `${IMG}/tops/plaid-colorblock-jacket.jpg`,
      colors: ["navy", "white", "black"],
      pattern: "colorblock",
      busy: 0.9,
      styles: ["preppy", "bold"],
      kind: "jacket",
    },
    {
      id: "black-crop-sweater",
      name: "Black Crop Sweater",
      slot: "sweaters",
      src: `${IMG}/sweaters/black-crop-sweater.jpg`,
      colors: ["black"],
      pattern: "solid",
      busy: 0.1,
      styles: ["minimal", "preppy", "evening"],
      kind: "sweater",
    },
    {
      id: "yellow-plaid-blazer",
      name: "Yellow Plaid Blazer",
      slot: "tops",
      src: `${IMG}/tops/yellow-plaid-blazer.jpg`,
      colors: ["yellow", "black"],
      pattern: "plaid",
      busy: 0.7,
      styles: ["preppy", "fall"],
      kind: "jacket",
    },
    {
      id: "white-oxford-shirt",
      name: "White Oxford Shirt",
      slot: "tops",
      src: `${IMG}/tops/white-oxford-shirt.jpg`,
      colors: ["white"],
      pattern: "solid",
      busy: 0.05,
      styles: ["preppy", "school"],
      kind: "shirt",
    },
    {
      id: "pink-angora-sweater",
      name: "Pink Angora Sweater",
      slot: "sweaters",
      src: `${IMG}/sweaters/pink-angora-sweater.jpg`,
      colors: ["pink"],
      pattern: "solid",
      busy: 0.2,
      styles: ["preppy", "soft"],
      kind: "sweater",
    },
    {
      id: "red-plaid-flannel",
      name: "Red Plaid Flannel",
      slot: "tops",
      src: `${IMG}/tops/red-plaid-flannel.jpg`,
      colors: ["red", "black"],
      pattern: "plaid",
      busy: 0.65,
      styles: ["grunge", "casual"],
      kind: "shirt",
    },
    {
      id: "denim-jacket",
      name: "Denim Jacket",
      slot: "tops",
      src: `${IMG}/tops/denim-jacket.jpg`,
      colors: ["denim", "navy"],
      pattern: "solid",
      busy: 0.2,
      styles: ["casual", "grunge"],
      kind: "jacket",
    },
    {
      id: "cream-cardigan",
      name: "Cream Cardigan",
      slot: "sweaters",
      src: `${IMG}/sweaters/cream-cardigan.jpg`,
      colors: ["cream"],
      pattern: "solid",
      busy: 0.1,
      styles: ["preppy", "soft"],
      kind: "sweater",
    },
    {
      id: "navy-blazer",
      name: "Navy Blazer",
      slot: "tops",
      src: `${IMG}/tops/navy-blazer.jpg`,
      colors: ["navy"],
      pattern: "solid",
      busy: 0.15,
      styles: ["preppy", "school"],
      kind: "jacket",
    },
    {
      id: "striped-sailor-top",
      name: "Striped Sailor Top",
      slot: "tops",
      src: `${IMG}/tops/striped-sailor-top.jpg`,
      colors: ["navy", "white"],
      pattern: "stripe",
      busy: 0.45,
      styles: ["sporty", "preppy"],
      kind: "shirt",
    },
    {
      id: "black-dress",
      name: "Black Dress",
      slot: "dresses",
      src: `${IMG}/dresses/black-dress.jpg`,
      colors: ["black"],
      pattern: "solid",
      busy: 0.1,
      styles: ["evening", "minimal"],
      kind: "dress",
      coversBottom: true,
    },
    {
      id: "yellow-plaid-dress",
      name: "Yellow Plaid Dress",
      slot: "dresses",
      src: `${IMG}/dresses/yellow-plaid-dress.jpg`,
      colors: ["yellow", "black"],
      pattern: "plaid",
      busy: 0.7,
      styles: ["preppy", "fall"],
      kind: "dress",
      coversBottom: true,
    },
    {
      id: "black-mini-skirt",
      name: "Black Mini Skirt",
      slot: "bottoms",
      src: `${IMG}/bottoms/black-mini-skirt.jpg`,
      colors: ["black"],
      pattern: "solid",
      busy: 0.1,
      styles: ["minimal", "evening", "preppy"],
      kind: "skirt",
    },
    {
      id: "red-plaid-mini",
      name: "Red Plaid Mini",
      slot: "bottoms",
      src: `${IMG}/bottoms/red-plaid-mini.jpg`,
      colors: ["red", "black"],
      pattern: "plaid",
      busy: 0.7,
      styles: ["preppy", "school"],
      kind: "skirt",
    },
    {
      id: "yellow-plaid-mini",
      name: "Yellow Plaid Mini",
      slot: "bottoms",
      src: `${IMG}/bottoms/yellow-plaid-mini.jpg`,
      colors: ["yellow", "black"],
      pattern: "plaid",
      busy: 0.7,
      styles: ["preppy", "fall"],
      kind: "skirt",
    },
    {
      id: "blue-jeans",
      name: "Blue Jeans",
      slot: "pants",
      src: `${IMG}/pants/blue-jeans.jpg`,
      colors: ["denim"],
      pattern: "solid",
      busy: 0.15,
      styles: ["casual", "grunge"],
      kind: "pants",
    },
    {
      id: "khaki-chinos",
      name: "Khaki Chinos",
      slot: "pants",
      src: `${IMG}/pants/khaki-chinos.jpg`,
      colors: ["khaki"],
      pattern: "solid",
      busy: 0.1,
      styles: ["preppy", "school"],
      kind: "pants",
    },
    {
      id: "leather-mini",
      name: "Leather Mini",
      slot: "bottoms",
      src: `${IMG}/bottoms/leather-mini.jpg`,
      colors: ["black"],
      pattern: "solid",
      busy: 0.2,
      styles: ["evening", "bold"],
      kind: "skirt",
    },
    {
      id: "navy-pleated-skirt",
      name: "Navy Pleated Skirt",
      slot: "bottoms",
      src: `${IMG}/bottoms/navy-pleated-skirt.jpg`,
      colors: ["navy"],
      pattern: "solid",
      busy: 0.2,
      styles: ["preppy", "school"],
      kind: "skirt",
    },
    {
      id: "white-tennis-skort",
      name: "White Tennis Skort",
      slot: "bottoms",
      src: `${IMG}/bottoms/white-tennis-skort.jpg`,
      colors: ["white"],
      pattern: "solid",
      busy: 0.15,
      styles: ["sporty", "preppy"],
      kind: "skirt",
    },
    {
      id: "black-mary-janes",
      name: "Black Mary Janes",
      slot: "shoes",
      src: `${IMG}/shoes/black-mary-janes.jpg`,
      colors: ["black"],
      pattern: "solid",
      busy: 0.1,
      styles: ["preppy", "school"],
      kind: "shoes",
    },
    {
      id: "white-sneakers",
      name: "White Sneakers",
      slot: "shoes",
      src: `${IMG}/shoes/white-sneakers.jpg`,
      colors: ["white"],
      pattern: "solid",
      busy: 0.1,
      styles: ["sporty", "casual"],
      kind: "shoes",
    },
    {
      id: "brown-loafers",
      name: "Brown Loafers",
      slot: "shoes",
      src: `${IMG}/shoes/brown-loafers.jpg`,
      colors: ["brown"],
      pattern: "solid",
      busy: 0.1,
      styles: ["preppy", "school"],
      kind: "shoes",
    },
    {
      id: "black-boots",
      name: "Black Boots",
      slot: "shoes",
      src: `${IMG}/shoes/black-boots.jpg`,
      colors: ["black"],
      pattern: "solid",
      busy: 0.15,
      styles: ["grunge", "evening"],
      kind: "shoes",
    },
    {
      id: "pearl-strand",
      name: "Pearl Strand",
      slot: "jewelry",
      src: `${IMG}/jewelry/pearl-strand.jpg`,
      colors: ["white", "cream"],
      pattern: "solid",
      busy: 0.1,
      styles: ["preppy", "evening"],
      kind: "jewelry",
    },
    {
      id: "gold-hoops",
      name: "Gold Hoops",
      slot: "jewelry",
      src: `${IMG}/jewelry/gold-hoops.jpg`,
      colors: ["gold"],
      pattern: "solid",
      busy: 0.15,
      styles: ["bold", "evening"],
      kind: "jewelry",
    },
    {
      id: "silver-locket",
      name: "Silver Locket",
      slot: "jewelry",
      src: `${IMG}/jewelry/silver-locket.jpg`,
      colors: ["silver"],
      pattern: "solid",
      busy: 0.1,
      styles: ["soft", "preppy"],
      kind: "jewelry",
    },
    {
      id: "printed-silk-scarf",
      name: "Printed Silk Scarf",
      slot: "scarves",
      src: `${IMG}/scarves/printed-silk-scarf.jpg`,
      colors: ["red", "cream", "navy"],
      pattern: "print",
      busy: 0.7,
      styles: ["preppy", "bold"],
      kind: "scarf",
    },
    {
      id: "solid-red-scarf",
      name: "Solid Red Scarf",
      slot: "scarves",
      src: `${IMG}/scarves/solid-red-scarf.jpg`,
      colors: ["red"],
      pattern: "solid",
      busy: 0.2,
      styles: ["preppy", "fall"],
      kind: "scarf",
    },
    {
      id: "black-tights",
      name: "Black Tights",
      slot: "pantyhose",
      src: `${IMG}/pantyhose/black-tights.jpg`,
      colors: ["black"],
      pattern: "solid",
      busy: 0.05,
      styles: ["preppy", "evening"],
      kind: "hose",
    },
    {
      id: "nude-sheer-tights",
      name: "Nude Sheer Tights",
      slot: "pantyhose",
      src: `${IMG}/pantyhose/nude-sheer-tights.jpg`,
      colors: ["nude"],
      pattern: "solid",
      busy: 0.05,
      styles: ["preppy", "school"],
      kind: "hose",
    },
    {
      id: "white-cami",
      name: "White Cami",
      slot: "underwear",
      src: `${IMG}/underwear/white-cami.jpg`,
      colors: ["white"],
      pattern: "solid",
      busy: 0.05,
      styles: ["minimal"],
      kind: "base",
    },
    {
      id: "black-cami",
      name: "Black Cami",
      slot: "underwear",
      src: `${IMG}/underwear/black-cami.jpg`,
      colors: ["black"],
      pattern: "solid",
      busy: 0.05,
      styles: ["minimal", "evening"],
      kind: "base",
    },
    {
      id: "black-belt",
      name: "Black Belt",
      slot: "more",
      src: `${IMG}/ui/black-belt.jpg`,
      colors: ["black"],
      pattern: "solid",
      busy: 0.05,
      styles: ["minimal", "preppy"],
      kind: "extra",
    },
    {
      id: "sunglasses",
      name: "Sunglasses",
      slot: "more",
      src: `${IMG}/ui/sunglasses.jpg`,
      colors: ["black"],
      pattern: "solid",
      busy: 0.15,
      styles: ["bold", "casual"],
      kind: "extra",
    },
  ];

  const MATCH_PAIRS = new Set([
    "black-crop-sweater|red-plaid-mini",
    "black-crop-sweater|black-mini-skirt",
    "black-crop-sweater|leather-mini",
    "black-crop-sweater|navy-pleated-skirt",
    "yellow-plaid-blazer|yellow-plaid-mini",
    "yellow-plaid-blazer|khaki-chinos",
    "white-oxford-shirt|khaki-chinos",
    "white-oxford-shirt|navy-pleated-skirt",
    "white-oxford-shirt|white-tennis-skort",
    "white-oxford-shirt|black-mini-skirt",
    "navy-blazer|navy-pleated-skirt",
    "navy-blazer|khaki-chinos",
    "navy-blazer|black-mini-skirt",
    "cream-cardigan|khaki-chinos",
    "cream-cardigan|navy-pleated-skirt",
    "cream-cardigan|white-tennis-skort",
    "pink-angora-sweater|white-tennis-skort",
    "pink-angora-sweater|khaki-chinos",
    "pink-angora-sweater|navy-pleated-skirt",
    "denim-jacket|blue-jeans",
    "denim-jacket|white-tennis-skort",
    "red-plaid-flannel|blue-jeans",
    "red-plaid-flannel|black-mini-skirt",
    "striped-sailor-top|white-tennis-skort",
    "striped-sailor-top|navy-pleated-skirt",
    "striped-sailor-top|khaki-chinos",
    "black-dress|",
    "black-dress|black-tights",
    "black-dress|nude-sheer-tights",
    "yellow-plaid-dress|",
    "yellow-plaid-dress|nude-sheer-tights",
  ]);

  const CLASH_PAIRS = new Set([
    "plaid-colorblock-jacket|black-mini-skirt",
    "plaid-colorblock-jacket|red-plaid-mini",
    "plaid-colorblock-jacket|yellow-plaid-mini",
    "plaid-colorblock-jacket|white-tennis-skort",
    "yellow-plaid-blazer|red-plaid-mini",
    "yellow-plaid-blazer|black-mini-skirt",
    "yellow-plaid-blazer|blue-jeans",
    "yellow-plaid-blazer|leather-mini",
    "red-plaid-flannel|yellow-plaid-mini",
    "red-plaid-flannel|white-tennis-skort",
    "pink-angora-sweater|leather-mini",
    "pink-angora-sweater|red-plaid-mini",
    "pink-angora-sweater|blue-jeans",
    "striped-sailor-top|leather-mini",
    "striped-sailor-top|yellow-plaid-mini",
    "striped-sailor-top|red-plaid-mini",
    "denim-jacket|yellow-plaid-mini",
    "denim-jacket|red-plaid-mini",
    "denim-jacket|leather-mini",
    "cream-cardigan|leather-mini",
    "cream-cardigan|blue-jeans",
    "navy-blazer|white-tennis-skort",
    "black-dress|blue-jeans",
    "black-dress|khaki-chinos",
    "black-dress|yellow-plaid-mini",
    "yellow-plaid-dress|red-plaid-mini",
    "yellow-plaid-dress|blue-jeans",
    "yellow-plaid-dress|leather-mini",
  ]);

  const CATEGORIES = {
    fall: { upper: "upper", lower: "lower", focus: "upper", upperLabel: "TOPS", lowerLabel: "BOTTOMS" },
    sweaters: { upper: "sweaters", lower: "lower", focus: "upper", upperLabel: "SWEATERS", lowerLabel: "BOTTOMS" },
    pants: { upper: "upper", lower: "pants", focus: "lower", upperLabel: "TOPS", lowerLabel: "PANTS" },
    shoes: { upper: "upper", lower: "shoes", focus: "lower", upperLabel: "TOPS", lowerLabel: "SHOES" },
    jewelry: { upper: "jewelry", lower: "lower", focus: "upper", upperLabel: "JEWELRY", lowerLabel: "BOTTOMS" },
    scarves: { upper: "scarves", lower: "lower", focus: "upper", upperLabel: "SCARVES", lowerLabel: "BOTTOMS" },
    pantyhose: { upper: "upper", lower: "pantyhose", focus: "lower", upperLabel: "TOPS", lowerLabel: "PANTYHOSE" },
    underwear: { upper: "upper", lower: "underwear", focus: "lower", upperLabel: "TOPS", lowerLabel: "UNDERWEAR" },
    more: { upper: "more", lower: "lower", focus: "upper", upperLabel: "MORE", lowerLabel: "BOTTOMS" },
  };

  const OUTFIT_KEY = {
    upper: "top",
    sweaters: "top",
    jewelry: "jewelry",
    scarves: "scarf",
    more: "extra",
    lower: "bottom",
    pants: "bottom",
    shoes: "shoes",
    pantyhose: "pantyhose",
    underwear: "underwear",
  };

  const CUSTOM_KEY = "clueless-wardrobe-custom-v1";
  const BROWSE_MS = 1100;

  const state = {
    items: [],
    category: "fall",
    focus: "upper",
    index: { upper: 0, lower: 0 },
    playing: { upper: false, lower: false },
    timers: { upper: 0, lower: 0 },
    outfit: {
      top: null,
      bottom: null,
      shoes: null,
      jewelry: null,
      scarf: null,
      pantyhose: null,
      underwear: null,
      extra: null,
    },
    musicOn: true,
    musicStarted: false,
  };

  const els = {};

  function bySlot(slot) {
    if (slot === "upper") {
      return state.items.filter((i) => i.slot === "tops" || i.slot === "sweaters" || i.slot === "dresses");
    }
    if (slot === "lower") {
      return state.items.filter((i) => i.slot === "bottoms" || i.slot === "pants");
    }
    return state.items.filter((i) => i.slot === slot);
  }

  function lists() {
    const cfg = CATEGORIES[state.category] || CATEGORIES.fall;
    return {
      cfg,
      upper: bySlot(cfg.upper),
      lower: bySlot(cfg.lower),
    };
  }

  function loadCustom() {
    try {
      const raw = JSON.parse(localStorage.getItem(CUSTOM_KEY) || "[]");
      return Array.isArray(raw) ? raw : [];
    } catch {
      return [];
    }
  }

  function saveCustom(list) {
    try {
      localStorage.setItem(CUSTOM_KEY, JSON.stringify(list));
      return true;
    } catch {
      return false;
    }
  }

  const SLOT_META = {
    tops: { kind: "shirt", styles: ["preppy", "custom"] },
    sweaters: { kind: "sweater", styles: ["preppy", "soft", "custom"] },
    dresses: { kind: "dress", styles: ["preppy", "evening", "custom"], coversBottom: true },
    bottoms: { kind: "skirt", styles: ["preppy", "custom"] },
    pants: { kind: "pants", styles: ["casual", "preppy", "custom"] },
    shoes: { kind: "shoes", styles: ["preppy", "custom"] },
    jewelry: { kind: "jewelry", styles: ["preppy", "custom"] },
    scarves: { kind: "scarf", styles: ["preppy", "custom"] },
    pantyhose: { kind: "hose", styles: ["preppy", "custom"] },
    underwear: { kind: "base", styles: ["minimal", "custom"] },
    more: { kind: "extra", styles: ["custom"] },
  };

  function showUploadError(msg) {
    if (!els.uploadError) return;
    if (!msg) {
      els.uploadError.hidden = true;
      els.uploadError.textContent = "";
      return;
    }
    els.uploadError.hidden = false;
    els.uploadError.textContent = msg;
  }

  function fileToClosetUrl(file) {
    return new Promise((resolve, reject) => {
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        const max = 900;
        const scale = Math.min(1, max / Math.max(img.width, img.height));
        const w = Math.max(1, Math.round(img.width * scale));
        const h = Math.max(1, Math.round(img.height * scale));
        const c = document.createElement("canvas");
        c.width = w;
        c.height = h;
        const ctx = c.getContext("2d");
        ctx.fillStyle = "#f3f1ec";
        ctx.fillRect(0, 0, w, h);
        ctx.drawImage(img, 0, 0, w, h);
        URL.revokeObjectURL(url);
        resolve(c.toDataURL("image/jpeg", 0.86));
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error("Could not read that photo."));
      };
      img.src = url;
    });
  }

  function previewUploadFile() {
    const file = els.uploadFile.files && els.uploadFile.files[0];
    if (!file || !els.uploadPreview) {
      if (els.uploadPreview) {
        els.uploadPreview.hidden = true;
        els.uploadPreview.removeAttribute("src");
      }
      return;
    }
    if (!file.type || !file.type.startsWith("image/")) {
      showUploadError("That file is not a photo.");
      els.uploadFile.value = "";
      return;
    }
    showUploadError("");
    const url = URL.createObjectURL(file);
    els.uploadPreview.hidden = false;
    els.uploadPreview.onload = () => URL.revokeObjectURL(url);
    els.uploadPreview.src = url;
  }

  async function onUpload(ev) {
    ev.preventDefault();
    showUploadError("");
    const file = els.uploadFile.files && els.uploadFile.files[0];
    const name = (els.uploadName.value || "").trim();
    const slot = els.uploadSlot.value;
    const color = els.uploadColor.value;
    const pattern = els.uploadPattern.value;
    if (!file) {
      showUploadError("Choose a photo first.");
      els.uploadFile.focus();
      return;
    }
    if (!name) {
      showUploadError("Name the piece so you can find it.");
      els.uploadName.focus();
      return;
    }
    let src;
    try {
      src = await fileToClosetUrl(file);
    } catch (err) {
      showUploadError(err && err.message ? err.message : "Could not read that photo.");
      return;
    }
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || `custom-${Date.now()}`;
    const meta = SLOT_META[slot] || SLOT_META.more;
    const item = {
      id: `${slug}-${Date.now()}`,
      name,
      slot,
      src,
      colors: [color],
      pattern,
      busy: pattern === "solid" ? 0.1 : 0.6,
      styles: meta.styles.slice(),
      kind: meta.kind,
      coversBottom: !!meta.coversBottom,
      custom: true,
    };
    const stored = loadCustom();
    stored.push(item);
    saveCustom(stored);
    state.items.push(item);
    state.category = slot === "sweaters" || slot === "dresses" || slot === "tops" ? "fall" : slot;
    if (!CATEGORIES[state.category]) state.category = "fall";
    const cfg = CATEGORIES[state.category];
    const row = cfg.focus;
    const list = lists()[row];
    const idx = list.findIndex((i) => i.id === item.id);
    state.index[row] = idx >= 0 ? idx : list.length - 1;
    applyRowToOutfit(row);
    els.moreDialog.close();
    els.uploadForm.reset();
    if (els.uploadPreview) {
      els.uploadPreview.hidden = true;
      els.uploadPreview.removeAttribute("src");
    }
    showUploadError("");
    paint();
  }

  function pairKey(a, b) {
    return `${a ? a.id : ""}|${b ? b.id : ""}`;
  }

  function share(a, b) {
    return a.colors.some((c) => b.colors.includes(c));
  }

  function allNeutral(item) {
    return item.colors.every((c) => NEUTRALS.has(c) || c === "denim");
  }

  function scorePair(top, bottom) {
    if (!top) return { ok: false, score: 0, why: "Pick something for the upper square first." };
    if (top.coversBottom) {
      if (bottom && (bottom.kind === "pants" || bottom.kind === "skirt")) {
        return { ok: false, score: 12, why: "A dress already covers the legs." };
      }
      const key = pairKey(top, bottom);
      if (CLASH_PAIRS.has(key)) return { ok: false, score: 10, why: "The computer says no." };
      return { ok: true, score: 82, why: "Dress does the work." };
    }
    if (!bottom) return { ok: false, score: 0, why: "Pick a lower piece." };

    const key = pairKey(top, bottom);
    if (CLASH_PAIRS.has(key)) return { ok: false, score: 8, why: "Classic clash." };
    if (MATCH_PAIRS.has(key)) return { ok: true, score: 94, why: "Known good pair." };

    let score = 48;
    if (share(top, bottom)) score += 14;
    if (allNeutral(top) || allNeutral(bottom)) score += 12;
    if (allNeutral(top) && allNeutral(bottom)) score += 6;

    const styles = top.styles.filter((s) => bottom.styles.includes(s));
    score += styles.length * 8;
    if (top.styles.includes("evening") && bottom.styles.includes("sporty")) score -= 28;
    if (top.styles.includes("sporty") && bottom.styles.includes("evening")) score -= 28;
    if (top.styles.includes("grunge") && bottom.styles.includes("preppy") && !share(top, bottom)) score -= 10;

    if (top.pattern === "plaid" && bottom.pattern === "plaid") {
      score += share(top, bottom) ? 18 : -32;
    } else if (top.pattern !== "solid" && bottom.pattern !== "solid" && top.pattern !== bottom.pattern) {
      score -= 26;
    } else if ((top.pattern === "solid") !== (bottom.pattern === "solid")) {
      score += 10;
    }

    if ((top.busy || 0) + (bottom.busy || 0) > 1.2 && top.pattern !== bottom.pattern) score -= 16;
    if (top.pattern === "colorblock") score -= 18;

    const extras = [state.outfit.shoes, state.outfit.jewelry, state.outfit.scarf, state.outfit.extra].filter(Boolean);
    extras.forEach((ex) => {
      if (ex.styles.some((s) => top.styles.includes(s) || bottom.styles.includes(s))) score += 3;
      if (ex.busy > 0.5 && (top.busy > 0.5 || bottom.busy > 0.5)) score -= 8;
      if (ex.slot === "shoes" && ex.styles.includes("sporty") && bottom.styles.includes("evening")) score -= 10;
      if (ex.slot === "shoes" && ex.styles.includes("preppy") && (top.styles.includes("preppy") || bottom.styles.includes("preppy")))
        score += 4;
    });

    if (state.outfit.pantyhose && (bottom.kind === "skirt" || top.coversBottom)) score += 4;
    if (top.custom || bottom.custom) score += 14;

    score = Math.max(0, Math.min(100, score));
    return { ok: score >= 58, score, why: score >= 58 ? "Color, pattern, and vibe agree." : "The pieces fight each other." };
  }

  function loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  }

  function probeImage(src) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = src;
    });
  }

  function lookSlug(item) {
    if (!item) return "none";
    const id = String(item.id || "");
    if (item.custom) return id.replace(/-\d{10,}$/, "") || id;
    return id;
  }

  function lookCandidates(top, bottom) {
    if (!top) return [];
    const topId = lookSlug(top);
    const botId = top.coversBottom ? "none" : lookSlug(bottom);
    const names = [`${topId}__${botId}`];
    if (top.coversBottom && botId !== "none") names.push(`${topId}__none`);
    const srcs = [];
    names.forEach((name) => {
      ["jpg", "png"].forEach((ext) => {
        srcs.push(`${IMG}/looks/${name}.${ext}`);
      });
    });
    return srcs;
  }

  async function findLookPhoto(top, bottom) {
    const srcs = lookCandidates(top, bottom);
    if (!srcs.length) return "";
    const hits = await Promise.all(srcs.map(async (src) => ((await probeImage(src)) ? src : "")));
    return hits.find(Boolean) || "";
  }

  function punchWhite(ctx, w, h) {
    const data = ctx.getImageData(0, 0, w, h);
    const d = data.data;
    for (let i = 0; i < d.length; i += 4) {
      const r = d[i];
      const g = d[i + 1];
      const b = d[i + 2];
      const mx = r > g ? (r > b ? r : b) : g > b ? g : b;
      const mn = r < g ? (r < b ? r : b) : g < b ? g : b;
      if (mx > 226 && mx - mn < 32) d[i + 3] = 0;
    }
    ctx.putImageData(data, 0, 0);
  }

  function fitRect(iw, ih, x, y, w, h) {
    const scale = Math.min(w / iw, h / ih);
    const dw = iw * scale;
    const dh = ih * scale;
    return { x: x + (w - dw) / 2, y: y + (h - dh) / 2, w: dw, h: dh };
  }

  function drawKnockout(ctx, img, x, y, w, h) {
    const tmp = document.createElement("canvas");
    tmp.width = img.width;
    tmp.height = img.height;
    const t = tmp.getContext("2d");
    t.drawImage(img, 0, 0);
    punchWhite(t, tmp.width, tmp.height);
    const r = fitRect(img.width, img.height, x, y, w, h);
    ctx.drawImage(tmp, r.x, r.y, r.w, r.h);
  }

  async function composeHologram(top, bottom) {
    const W = 900;
    const H = 1440;
    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");
    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, "#071018");
    bg.addColorStop(0.55, "#10263c");
    bg.addColorStop(1, "#081422");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    try {
      const fig = await loadImage(`${IMG}/looks/figure-base.png`);
      const r = fitRect(fig.width, fig.height, 40, 40, W - 80, H - 120);
      ctx.save();
      ctx.shadowColor = "rgba(120, 200, 255, 0.45)";
      ctx.shadowBlur = 28;
      ctx.drawImage(fig, r.x, r.y, r.w, r.h);
      ctx.restore();
    } catch {
      /* figure optional */
    }

    if (bottom && !(top && top.coversBottom)) {
      try {
        const b = await loadImage(bottom.src);
        drawKnockout(ctx, b, 210, 690, 480, 480);
      } catch {
        /* skip */
      }
    }
    if (top) {
      try {
        const t = await loadImage(top.src);
        if (top.coversBottom) drawKnockout(ctx, t, 170, 280, 560, 820);
        else drawKnockout(ctx, t, 180, 250, 540, 500);
      } catch {
        /* skip */
      }
    }

    ctx.fillStyle = "rgba(90, 180, 255, 0.1)";
    ctx.fillRect(0, 0, W, H);
    for (let y = 0; y < H; y += 3) {
      ctx.fillStyle = "rgba(180, 220, 255, 0.07)";
      ctx.fillRect(0, y, W, 1);
    }
    const vig = ctx.createRadialGradient(W / 2, H / 2, 220, W / 2, H / 2, 780);
    vig.addColorStop(0, "rgba(0,0,0,0)");
    vig.addColorStop(1, "rgba(4, 10, 18, 0.45)");
    ctx.fillStyle = vig;
    ctx.fillRect(0, 0, W, H);
    return canvas.toDataURL("image/png");
  }

  function currentItem(row) {
    const { upper, lower } = lists();
    const list = row === "upper" ? upper : lower;
    const idx = ((state.index[row] % list.length) + list.length) % list.length;
    return list[idx] || null;
  }

  function applyRowToOutfit(row) {
    const { cfg } = lists();
    const listKey = row === "upper" ? cfg.upper : cfg.lower;
    const outfitKey = OUTFIT_KEY[listKey];
    const item = currentItem(row);
    if (outfitKey && item) state.outfit[outfitKey] = item;
    if (item && item.coversBottom) state.outfit.bottom = null;
  }

  function step(row, dir) {
    const { upper, lower } = lists();
    const list = row === "upper" ? upper : lower;
    if (!list.length) return;
    state.index[row] = (state.index[row] + dir + list.length) % list.length;
    applyRowToOutfit(row);
    paint();
  }

  function stopRow(row) {
    state.playing[row] = false;
    if (state.timers[row]) {
      clearInterval(state.timers[row]);
      state.timers[row] = 0;
    }
  }

  function playRow(row) {
    stopRow(row === "upper" ? "lower" : "upper");
    state.focus = row;
    if (state.playing[row]) {
      stopRow(row);
      paint();
      return;
    }
    state.playing[row] = true;
    step(row, 1);
    state.timers[row] = window.setInterval(() => step(row, 1), BROWSE_MS);
    paint();
  }

  function setCategory(cat) {
    if (cat === "more") {
      els.moreDialog.showModal();
      document.querySelector('[data-cat="more"]').classList.add("is-active");
      return;
    }
    stopRow("upper");
    stopRow("lower");
    state.category = cat;
    const cfg = CATEGORIES[cat] || CATEGORIES.fall;
    state.focus = cfg.focus;
    const { upper, lower } = lists();
    const place = (row, list, outfitKey) => {
      const current = state.outfit[outfitKey];
      const idx = current ? list.findIndex((i) => i.id === current.id) : 0;
      state.index[row] = idx >= 0 ? idx : 0;
      applyRowToOutfit(row);
    };
    place("upper", upper, OUTFIT_KEY[cfg.upper]);
    place("lower", lower, OUTFIT_KEY[cfg.lower]);
    hideResults();
    paint();
  }

  function hideResults() {
    els.mismatchLayer.hidden = true;
    els.matchLayer.hidden = true;
    els.matchLayer.classList.remove("is-photo", "is-drawn");
  }

  function showLookImage(src, mode) {
    els.matchLayer.classList.toggle("is-photo", mode === "photo");
    els.matchLayer.classList.toggle("is-drawn", mode === "drawn");
    els.holoLook.style.animation = "none";
    els.holoLook.src = src;
    void els.holoLook.offsetWidth;
    els.holoLook.style.animation = "";
  }

  async function dressMe() {
    stopRow("upper");
    stopRow("lower");
    hideResults();
    const top = state.outfit.top;
    const bottom = state.outfit.bottom;
    const result = scorePair(top, bottom);
    if (!result.ok) {
      els.mismatchLayer.hidden = false;
      return;
    }
    els.matchCaption.textContent = "IT'S A MATCH";
    els.matchLayer.hidden = false;
    const scan = els.matchLayer.querySelector(".holo-scan");
    if (scan) scan.replaceWith(scan.cloneNode(true));

    const photo = await findLookPhoto(top, bottom);
    if (photo) {
      showLookImage(photo, "photo");
      return;
    }
    try {
      showLookImage(await composeHologram(top, bottom), "drawn");
    } catch {
      showLookImage(`${IMG}/looks/figure-base.png`, "drawn");
    }
  }

  function paint() {
    const { cfg, upper, lower } = lists();
    const topItem = currentItem("upper");
    const botItem = currentItem("lower");
    if (topItem) {
      els.topImg.src = topItem.src;
      els.topImg.alt = topItem.name;
    }
    if (botItem) {
      els.botImg.src = botItem.src;
      els.botImg.alt = botItem.name;
    }
    els.topLabel.textContent = cfg.upperLabel;
    els.botLabel.textContent = cfg.lowerLabel;

    document.querySelectorAll(".transport").forEach((bar) => {
      const row = bar.getAttribute("data-row");
      bar.querySelector(".play-btn").classList.toggle("is-playing", state.playing[row]);
    });
    els.browseBtn.classList.toggle("is-on", state.playing.upper || state.playing.lower);

    document.querySelectorAll("#catBar button").forEach((btn) => {
      btn.classList.toggle("is-active", btn.dataset.cat === state.category);
    });
    void upper;
    void lower;
  }

  function startMusic() {
    if (!state.musicOn || state.musicStarted) return;
    const audio = els.themeAudio;
    const play = audio.play();
    if (play && typeof play.then === "function") {
      play
        .then(() => {
          state.musicStarted = true;
        })
        .catch(() => {});
    }
  }

  function toggleMusic() {
    state.musicOn = !state.musicOn;
    els.muteBtn.classList.toggle("is-muted", !state.musicOn);
    if (!state.musicOn) {
      els.themeAudio.pause();
    } else {
      state.musicStarted = false;
      startMusic();
    }
  }

  function bind() {
    document.querySelectorAll(".transport").forEach((bar) => {
      bar.addEventListener("click", (ev) => {
        const btn = ev.target.closest("button");
        if (!btn) return;
        startMusic();
        hideResults();
        const row = bar.getAttribute("data-row");
        state.focus = row;
        const act = btn.dataset.act;
        if (act === "back") {
          stopRow(row);
          step(row, -1);
        } else if (act === "fwd") {
          stopRow(row);
          step(row, 1);
        } else if (act === "play") {
          playRow(row);
        }
      });
    });

    els.browseBtn.addEventListener("click", () => {
      startMusic();
      hideResults();
      playRow(state.focus);
    });

    els.dressBtn.addEventListener("click", () => {
      startMusic();
      dressMe();
    });

    els.mismatchLayer.addEventListener("click", hideResults);
    els.matchLayer.addEventListener("click", hideResults);

    els.catBar.addEventListener("click", (ev) => {
      const btn = ev.target.closest("button[data-cat]");
      if (!btn) return;
      startMusic();
      setCategory(btn.dataset.cat);
    });

    els.muteBtn.addEventListener("click", toggleMusic);
    els.uploadForm.addEventListener("submit", onUpload);
    if (els.cancelUpload) {
      els.cancelUpload.addEventListener("click", () => els.moreDialog.close());
    }
    if (els.uploadFile) {
      els.uploadFile.addEventListener("change", previewUploadFile);
    }
    els.moreDialog.addEventListener("close", () => {
      const moreBtn = document.querySelector('[data-cat="more"]');
      if (moreBtn) moreBtn.classList.remove("is-active");
      showUploadError("");
      paint();
    });

    window.addEventListener("keydown", (ev) => {
      const typing = ev.target && (ev.target.tagName === "INPUT" || ev.target.tagName === "SELECT" || ev.target.tagName === "TEXTAREA");
      if (ev.key === "Escape") {
        hideResults();
        return;
      }
      if (typing) return;
      if (ev.key === "ArrowLeft") {
        stopRow(state.focus);
        step(state.focus, -1);
      }
      if (ev.key === "ArrowRight") {
        stopRow(state.focus);
        step(state.focus, 1);
      }
      if (ev.key === " ") {
        ev.preventDefault();
        playRow(state.focus);
      }
    });
  }

  function init() {
    els.topImg = document.getElementById("topImg");
    els.botImg = document.getElementById("botImg");
    els.topLabel = document.getElementById("topLabel");
    els.botLabel = document.getElementById("botLabel");
    els.browseBtn = document.getElementById("browseBtn");
    els.dressBtn = document.getElementById("dressBtn");
    els.mismatchLayer = document.getElementById("mismatchLayer");
    els.matchLayer = document.getElementById("matchLayer");
    els.holoLook = document.getElementById("holoLook");
    els.matchCaption = document.getElementById("matchCaption");
    els.catBar = document.getElementById("catBar");
    els.muteBtn = document.getElementById("muteBtn");
    els.themeAudio = document.getElementById("themeAudio");
    els.moreDialog = document.getElementById("moreDialog");
    els.uploadForm = document.getElementById("uploadForm");
    els.uploadFile = document.getElementById("uploadFile");
    els.uploadName = document.getElementById("uploadName");
    els.uploadSlot = document.getElementById("uploadSlot");
    els.uploadColor = document.getElementById("uploadColor");
    els.uploadPattern = document.getElementById("uploadPattern");
    els.uploadError = document.getElementById("uploadError");
    els.uploadPreview = document.getElementById("uploadPreview");
    els.cancelUpload = document.getElementById("cancelUpload");

    state.items = CATALOG.concat(loadCustom());
    const up = bySlot("upper");
    const low = bySlot("lower");
    state.outfit.top = up[0] || null;
    state.outfit.bottom = low[0] || null;
    state.index.upper = 0;
    state.index.lower = 0;
    bind();
    paint();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
