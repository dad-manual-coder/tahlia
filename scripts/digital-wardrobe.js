'use strict';

/* ================================================================
   DIGITAL CLOSET — JAVASCRIPT ENGINE
   ES6+ Class-based, localStorage-backed, fully modular
   ================================================================ */


const SAMPLE_CLOTHES = [
  {
    id: 'sample-1',
    title: 'Silk Cream Blouse',
    category: 'tops',
    color: 'Cream White',
    vibe: 'Clean Girl',
    image: '../images/DigitalCloset/silk_cream_blouse.jpg',
    emoji: '',
    wornCount: 5,
    isFavorite: false,
    dateAdded: '2026-25-9'
  },
  {
    id: 'sample-2',
    title: 'Dusty Rose Mini Dress',
    category: 'dresses',
    color: 'Dusty Rose',
    vibe: 'Coquette & Sweet',
    image: '../images/DigitalCloset/dusty_rose_mini.jpg',
    emoji: '',
    wornCount: 8,
    isFavorite: true,
    dateAdded: '2026-25-9'
  },
  {
    id: 'sample-3',
    title: 'Ivory Linen Trousers',
    category: 'bottoms',
    color: 'Ivory',
    vibe: 'Preppy Paris',
    image: '../images/DigitalCloset/ivory_linen_trousers.jpg',
    emoji: '',
    wornCount: 3,
    isFavorite: false,
    dateAdded: '2026-25-9'
  },
  {
    id: 'sample-4',
    title: 'Camel Wrap Coat',
    category: 'outerwear',
    color: 'Camel',
    vibe: 'It-Girl Luxe',
    image: '../images/DigitalCloset/camel_wrap_coat.png',
    emoji: '',
    wornCount: 6,
    isFavorite: false,
    dateAdded: '2026-25-9'
  },
  {
    id: 'sample-5',
    title: 'Ballet Pink Satin Heels',
    category: 'shoes',
    color: 'Ballet Pink',
    vibe: 'Coquette & Sweet',
    image: '../images/DigitalCloset/ballet_pink_satin.jpg',
    emoji: '',
    wornCount: 7,
    isFavorite: false,
    dateAdded: '2026-25-9'
  },
  {
    id: 'sample-6',
    title: 'Pearl Quilted Mini Bag',
    category: 'bags',
    color: 'Pearl White',
    vibe: 'It-Girl Luxe',
    image: '../images/DigitalCloset/parl_quilted_mini.jpg',
    emoji: '',
    wornCount: 10,
    isFavorite: true,
    dateAdded: '2026-25-9'
  },
  {
    id: 'sample-7',
    title: 'Lavender Knit Cardigan',
    category: 'tops',
    color: 'Lavender',
    vibe: 'Coquette & Sweet',
    image: '../images/DigitalCloset/lavender_knit_kardigan.jpg',
    emoji: '',
    wornCount: 4,
    isFavorite: true,
    dateAdded: '2026-25-9'
  },
  {
    id: 'sample-8',
    title: 'Black Leather Micro Skirt',
    category: 'bottoms',
    color: 'Jet Black',
    vibe: 'Night Out Glam',
    image: '../images/DigitalCloset/black_leather_micro.jpg',
    emoji: '',
    wornCount: 9,
    isFavorite: false,
    dateAdded: '2026-25-9'
  },
  {
    id: 'sample-9',
    title: 'Gold Chain Layered Necklace',
    category: 'accessories',
    color: 'Gold',
    vibe: 'Night Out Glam',
    image: '../images/DigitalCloset/gold_chain.jpg',
    emoji: '',
    wornCount: 12,
    isFavorite: false,
    dateAdded: '2026-25-9'
  },
  {
    id: 'sample-10',
    title: 'Nude Strappy Sandals',
    category: 'shoes',
    color: 'Nude Beige',
    vibe: 'Clean Girl',
    image: '../images/DigitalCloset/nude_strappy_sandals.jpg',
    emoji: '',
    wornCount: 6,
    isFavorite: false,
    dateAdded: '2026-25-9'
  },
  {
    id: 'sample-11',
    title: 'Blush Satin Slip Dress',
    category: 'dresses',
    color: 'Blush Pink',
    vibe: 'Night Out Glam',
    image: '../images/DigitalCloset/blush_satin_slip.jpg',
    emoji: '',
    wornCount: 5,
    isFavorite: false,
    dateAdded: '2026-25-9'
  },
  {
    id: 'sample-12',
    title: 'Tortoise Shell Sunglasses',
    category: 'accessories',
    color: 'Tortoise',
    vibe: 'Off-Duty Model',
    image: '../images/DigitalCloset/tortoise_shell_glass.jpg',
    emoji: '',
    wornCount: 14,
    isFavorite: false,
    dateAdded: '2026-25-9'
  },
  {
    id: 'sample-13',
    title: 'Cobalt Blue Blazer',
    category: 'outerwear',
    color: 'Cobalt Blue',
    vibe: 'Preppy Paris',
    image: '../images/DigitalCloset/cobalt_blue_blazer.jpg',
    emoji: '',
    wornCount: 2,
    isFavorite: false,
    dateAdded: '2026-25-9'
  },
  {
    id: 'sample-14',
    title: 'Tan Leather Tote',
    category: 'bags',
    color: 'Tan',
    vibe: 'Clean Girl',
    image: '../images/DigitalCloset/tan_leather_tote.jpg',
    emoji: '',
    wornCount: 8,
    isFavorite: false,
    dateAdded: '2024-02-10'
  }
];

// ── Category → Canvas Slot Map ────────────────────────────────────
const CATEGORY_SLOT_MAP = {
  tops:        'top',
  dresses:     'top',
  bottoms:     'bottom',
  outerwear:   'outerwear',
  shoes:       'shoes',
  bags:        'bag',
  accessories: 'accessories'
};

// ── Color Harmony Palette ─────────────────────────────────────────
const COLOR_GROUPS = {
  pink:    ['pink', 'rose', 'blush', 'dusty rose', 'ballet', 'coquette'],
  neutral: ['cream', 'ivory', 'nude', 'beige', 'tan', 'white', 'pearl', 'camel'],
  dark:    ['black', 'charcoal', 'jet', 'midnight', 'navy'],
  warm:    ['gold', 'caramel', 'amber', 'cognac', 'brown'],
  cool:    ['lavender', 'lilac', 'blue', 'cobalt', 'mint', 'sage'],
  glam:    ['silver', 'chrome', 'sequin', 'metallic']
};

// ── Utility ───────────────────────────────────────────────────────
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const uid = () => 'item-' + Date.now() + '-' + Math.floor(Math.random() * 9999);
const today = () => new Date().toLocaleDateString('en-US', { year:'numeric', month:'short', day:'numeric' });
const cap = str => str ? str.charAt(0).toUpperCase() + str.slice(1) : '';

function getColorGroup(colorStr) {
  if (!colorStr) return 'neutral';
  const lower = colorStr.toLowerCase();
  for (const [group, keywords] of Object.entries(COLOR_GROUPS)) {
    if (keywords.some(k => lower.includes(k))) return group;
  }
  return 'neutral';
}

function colorGroupsMatch(colorA, colorB) {
  const gA = getColorGroup(colorA);
  const gB = getColorGroup(colorB);
  const compatible = {
    pink:    ['pink','neutral','cool','glam'],
    neutral: ['pink','neutral','warm','cool','dark','glam'],
    dark:    ['neutral','glam','warm'],
    warm:    ['neutral','dark','warm'],
    cool:    ['pink','neutral','cool'],
    glam:    ['pink','neutral','dark','glam']
  };
  return compatible[gA] && compatible[gA].includes(gB);
}

// ================================================================
// CLASS: WardrobeStore — localStorage state management
// ================================================================
class WardrobeStore {
  constructor() {
    this.CLOTHES_KEY = 'aura_clothes';
    this.DIARY_KEY   = 'aura_diary';
    this._clothes = this._loadClothes();
    this._diary   = this._loadDiary();
  }

  _loadClothes() {
    try {
      const raw = localStorage.getItem(this.CLOTHES_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) { /* fall through */ }
    // Seed with sample data
    const seed = SAMPLE_CLOTHES.map(c => ({ ...c }));
    this._saveClothes(seed);
    return seed;
  }

  _loadDiary() {
    try {
      const raw = localStorage.getItem(this.DIARY_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) { /* fall through */ }
    return [];
  }

  _saveClothes(data) {
    try { localStorage.setItem(this.CLOTHES_KEY, JSON.stringify(data || this._clothes)); }
    catch (e) { console.warn('Storage full or unavailable', e); }
  }

  _saveDiary(data) {
    try { localStorage.setItem(this.DIARY_KEY, JSON.stringify(data || this._diary)); }
    catch (e) { console.warn('Storage full or unavailable', e); }
  }

  get clothes() { return this._clothes; }
  get diary()   { return this._diary; }

  addItem(item) {
    this._clothes.unshift(item);
    this._saveClothes();
  }

  removeItem(id) {
    this._clothes = this._clothes.filter(c => c.id !== id);
    this._saveClothes();
  }

  toggleFavorite(id) {
    const item = this._clothes.find(c => c.id === id);
    if (item) { item.isFavorite = !item.isFavorite; this._saveClothes(); }
    return item;
  }

  incrementWorn(id) {
    const item = this._clothes.find(c => c.id === id);
    if (item) { item.wornCount = (item.wornCount || 0) + 1; this._saveClothes(); }
    return item;
  }

  addDiaryEntry(entry) {
    this._diary.unshift(entry);
    this._saveDiary();
  }

  removeDiaryEntry(id) {
    this._diary = this._diary.filter(e => e.id !== id);
    this._saveDiary();
  }

  getByCategory(cat) {
    if (!cat || cat === 'all') return this._clothes;
    return this._clothes.filter(c => c.category === cat);
  }

  search(query) {
    if (!query) return this._clothes;
    const q = query.toLowerCase();
    return this._clothes.filter(c =>
      (c.title  || '').toLowerCase().includes(q) ||
      (c.color  || '').toLowerCase().includes(q) ||
      (c.vibe   || '').toLowerCase().includes(q) ||
      (c.category || '').toLowerCase().includes(q)
    );
  }
}

// ================================================================
// CLASS: ToastManager
// ================================================================
class ToastManager {
  constructor() {
    this.el = $('#toast');
    this._timer = null;
  }

  show(msg, type = 'default', duration = 2800) {
    if (!this.el) return;
    clearTimeout(this._timer);
    this.el.textContent = msg;
    this.el.className = 'toast';
    if (type === 'success') this.el.classList.add('success');
    // Force reflow
    void this.el.offsetWidth;
    this.el.classList.add('show');
    this._timer = setTimeout(() => {
      this.el.classList.remove('show');
    }, duration);
  }
}

// ================================================================
// CLASS: ModalManager
// ================================================================
class ModalManager {
  constructor(overlayId, onClose) {
    this.overlay = $(`#${overlayId}`);
    this.onClose = onClose || (() => {});
    this._bindClose();
  }

  _bindClose() {
    if (!this.overlay) return;
    // Click outside closes
    this.overlay.addEventListener('click', e => {
      if (e.target === this.overlay) this.close();
    });
    // ESC key
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && !this.overlay.classList.contains('hidden')) this.close();
    });
  }

  open() {
    if (!this.overlay) return;
    this.overlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    // Focus first focusable
    setTimeout(() => {
      const focusable = this.overlay.querySelector('input, select, textarea, button:not(.modal-close)');
      if (focusable) focusable.focus();
    }, 100);
  }

  close() {
    if (!this.overlay) return;
    this.overlay.classList.add('hidden');
    document.body.style.overflow = '';
    this.onClose();
  }
}

// ================================================================
// CLASS: ClosetModule — MODULE A
// ================================================================
class ClosetModule {
  constructor(store, toast, dressingRoom) {
    this.store = store;
    this.toast = toast;
    this.dressingRoom = dressingRoom;
    this.currentCat  = 'all';
    this.currentView = 'grid';
    this.searchQuery = '';

    this.grid        = $('#wardrobeGrid');
    this.railItems   = $('#railItems');
    this.railContainer = $('#railContainer');
    this.emptyState  = $('#closetEmpty');

    this._bindFilters();
    this._bindSearch();
    this._bindViewToggle();
  }

  _bindFilters() {
    $$('.category-pills .pill').forEach(pill => {
      pill.addEventListener('click', () => {
        $$('.category-pills .pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        this.currentCat = pill.dataset.cat;
        this.render();
      });
    });
  }

  _bindSearch() {
    const searchEl = $('#closetSearch');
    if (!searchEl) return;
    searchEl.addEventListener('input', e => {
      this.searchQuery = e.target.value.trim();
      this.render();
    });
  }

  _bindViewToggle() {
    $('#btnGrid')?.addEventListener('click', () => this.setView('grid'));
    $('#btnRail')?.addEventListener('click', () => this.setView('rail'));
  }

  setView(view) {
    this.currentView = view;
    $('#btnGrid')?.classList.toggle('active', view === 'grid');
    $('#btnRail')?.classList.toggle('active', view === 'rail');
    if (view === 'grid') {
      this.grid?.classList.remove('hidden');
      this.railContainer?.classList.add('hidden');
    } else {
      this.grid?.classList.add('hidden');
      this.railContainer?.classList.remove('hidden');
    }
    this.render();
  }

  _getFilteredItems() {
    let items = this.searchQuery
      ? this.store.search(this.searchQuery)
      : this.store.getByCategory(this.currentCat);
    return items;
  }

  render() {
    const items = this._getFilteredItems();
    const isEmpty = items.length === 0;

    this.emptyState?.classList.toggle('hidden', !isEmpty);
    this.grid?.classList.toggle('hidden', isEmpty || this.currentView !== 'grid');
    this.railContainer?.classList.toggle('hidden', isEmpty || this.currentView !== 'rail');

    if (this.currentView === 'grid') this._renderGrid(items);
    else this._renderRail(items);
  }

  _renderGrid(items) {
    if (!this.grid) return;
    this.grid.innerHTML = items.map(item => this._cardHTML(item)).join('');
    // Bind events on cards
    this.grid.querySelectorAll('.wardrobe-card').forEach(card => {
      const id = card.dataset.id;
      // Fav button
      card.querySelector('.card-fav')?.addEventListener('click', e => {
        e.stopPropagation();
        const updated = this.store.toggleFavorite(id);
        const btn = card.querySelector('.card-fav');
        if (btn) {
          btn.classList.toggle('active', updated?.isFavorite);
          btn.textContent = updated?.isFavorite ? '♥' : '♡';
          btn.setAttribute('aria-label', updated?.isFavorite ? 'Remove from favorites' : 'Add to favorites');
        }
        this.toast.show(updated?.isFavorite ? '♥ Added to favourites' : 'Removed from favourites');
      });
      // Snap to canvas
      card.querySelector('.card-snap')?.addEventListener('click', e => {
        e.stopPropagation();
        const item = this.store.clothes.find(c => c.id === id);
        if (item && this.dressingRoom) {
          this.dressingRoom.snapItem(item);
          this.toast.show(`✦ ${item.title} snapped to canvas`, 'success');
        }
      });
    });
  }

  _renderRail(items) {
    if (!this.railItems) return;
    this.railItems.innerHTML = items.map(item => `
      <div class="rail-item" role="listitem" data-id="${item.id}" tabindex="0" aria-label="${item.title}">
        <div class="rail-hook" aria-hidden="true"></div>
        <div class="rail-hanger" aria-hidden="true"></div>
        <div class="rail-garment">
          ${item.image
            ? `<img src="${item.image}" alt="${item.title}" loading="lazy" />`
            : `<div class="card-image-placeholder" aria-hidden="true">${item.emoji || '👗'}</div>`}
        </div>
        <span class="rail-label">${item.title}</span>
      </div>
    `).join('');
    this.railItems.querySelectorAll('.rail-item').forEach(el => {
      el.addEventListener('click', () => {
        const id = el.dataset.id;
        const item = this.store.clothes.find(c => c.id === id);
        if (item && this.dressingRoom) {
          this.dressingRoom.snapItem(item);
          this.toast.show(`✦ ${item.title} snapped to canvas`, 'success');
        }
      });
      el.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); el.click(); }
      });
    });
  }

  _cardHTML(item) {
    const imgContent = item.image
      ? `<img src="${item.image}" alt="${item.title}" loading="lazy" />`
      : `<div class="card-image-placeholder" aria-hidden="true">${item.emoji || '👗'}</div>`;

    return `
      <article class="wardrobe-card" role="listitem" data-id="${item.id}" tabindex="0" aria-label="${item.title}">
        <div class="card-image-wrap">
          ${imgContent}
          <button class="card-fav ${item.isFavorite ? 'active' : ''}" 
                  aria-label="${item.isFavorite ? 'Remove from favorites' : 'Add to favorites'}">
            ${item.isFavorite ? '♥' : '♡'}
          </button>
          <button class="card-snap" aria-label="Snap to dressing room">
            ✦ Add to Look
          </button>
        </div>
        <div class="card-body">
          <h3 class="card-title">${item.title}</h3>
          <div class="card-meta">
            <span class="card-tag">${cap(item.category)}</span>
            <span class="card-worn">${item.wornCount || 0}× worn</span>
          </div>
        </div>
      </article>
    `;
  }
}

// ================================================================
// CLASS: AddItemModule — MODULE B
// ================================================================
class AddItemModule {
  constructor(store, toast, onAdded) {
    this.store   = store;
    this.toast   = toast;
    this.onAdded = onAdded;
    this.modal   = new ModalManager('addModal', () => this._reset());
    this._currentImageSrc = '';

    this._bindTriggers();
    this._bindForm();
    this._bindUpload();
  }

  _bindTriggers() {
    $('#openAddModal')?.addEventListener('click', () => this.modal.open());
    $('#closeAddModal')?.addEventListener('click', () => this.modal.close());
    $('#cancelAdd')?.addEventListener('click', () => this.modal.close());
    // Mobile FAB
    document.querySelector('.bottom-nav-btn.fab')?.addEventListener('click', () => this.modal.open());
  }

  _bindForm() {
    $('#saveItem')?.addEventListener('click', () => this._saveItem());
  }

  _bindUpload() {
    const zone      = $('#uploadZone');
    const fileInput = $('#fileInput');
    const preview   = $('#uploadPreview');
    const placeholder = $('#uploadPlaceholder');

    if (!zone) return;

    // Click on zone triggers file input
    zone.addEventListener('click', (e) => {
      if (e.target !== fileInput) fileInput?.click();
    });
    zone.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fileInput?.click(); }
    });

    // Drag-and-drop
    zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('drag-over'); });
    zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));
    zone.addEventListener('drop', e => {
      e.preventDefault();
      zone.classList.remove('drag-over');
      const file = e.dataTransfer?.files?.[0];
      if (file && file.type.startsWith('image/')) this._readFile(file);
    });

    fileInput?.addEventListener('change', e => {
      const file = e.target.files?.[0];
      if (file) this._readFile(file);
    });

    // URL load
    $('#loadUrl')?.addEventListener('click', () => {
      const url = $('#imageUrl')?.value?.trim();
      if (!url) return;
      if (preview && placeholder) {
        preview.src = url;
        preview.classList.remove('hidden');
        placeholder.classList.add('hidden');
        this._currentImageSrc = url;
      }
    });
    $('#imageUrl')?.addEventListener('keydown', e => {
      if (e.key === 'Enter') $('#loadUrl')?.click();
    });
  }

  _readFile(file) {
    const reader = new FileReader();
    reader.onload = e => {
      const src = e.target.result;
      const preview = $('#uploadPreview');
      const placeholder = $('#uploadPlaceholder');
      if (preview && placeholder) {
        preview.src = src;
        preview.classList.remove('hidden');
        placeholder.classList.add('hidden');
        this._currentImageSrc = src;
      }
    };
    reader.readAsDataURL(file);
  }

  _saveItem() {
    const title    = $('#itemTitle')?.value?.trim();
    const category = $('#itemCategory')?.value;
    if (!title) { this.toast.show('Please enter an item name ✦'); return; }
    if (!category) { this.toast.show('Please select a category ✦'); return; }

    const newItem = {
      id:         uid(),
      title,
      category,
      color:      $('#itemColor')?.value?.trim() || 'Unspecified',
      vibe:       $('#itemVibe')?.value || 'It-Girl Luxe',
      image:      this._currentImageSrc || '',
      emoji:      this._categoryEmoji(category),
      wornCount:  0,
      isFavorite: false,
      dateAdded:  new Date().toISOString().split('T')[0]
    };

    this.store.addItem(newItem);
    this.toast.show(`✦ ${title} added to your closet!`, 'success');
    this.modal.close();
    this.onAdded();
  }

  _categoryEmoji(cat) {
    const map = { tops:'👚', bottoms:'👖', dresses:'👗', outerwear:'🧥', shoes:'👠', bags:'👜', accessories:'💎' };
    return map[cat] || '✨';
  }

  _reset() {
    const fields = ['#itemTitle', '#itemColor'];
    fields.forEach(sel => { const el = $(sel); if (el) el.value = ''; });
    const cat = $('#itemCategory'); if (cat) cat.value = '';
    const vibe = $('#itemVibe'); if (vibe) vibe.value = 'It-Girl Luxe';
    const url = $('#imageUrl'); if (url) url.value = '';
    const preview = $('#uploadPreview'); if (preview) { preview.src = ''; preview.classList.add('hidden'); }
    const placeholder = $('#uploadPlaceholder'); if (placeholder) placeholder.classList.remove('hidden');
    const fileInput = $('#fileInput'); if (fileInput) fileInput.value = '';
    this._currentImageSrc = '';
  }
}

// ================================================================
// CLASS: DressingRoomModule — MODULE C
// ================================================================
class DressingRoomModule {
  constructor(store, toast) {
    this.store     = store;
    this.toast     = toast;
    this.canvasState = {}; // slot -> item
    this.saveModal = new ModalManager('saveLookModal', () => {});

    this._bindCanvas();
    this._bindDrawer();
    this._bindActions();
    this._renderDrawer('all');
  }

  _bindCanvas() {
    // Slot remove buttons
    document.querySelectorAll('.slot-remove').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const slot = btn.closest('.canvas-slot')?.dataset.slot;
        if (slot) this._removeFromSlot(slot);
      });
    });
    // Click slot to prompt
    document.querySelectorAll('.canvas-slot').forEach(slot => {
      slot.addEventListener('click', () => {
        if (!this.canvasState[slot.dataset.slot]) {
          this.toast.show('Pick an item from the drawer →');
        }
      });
    });
  }

  _bindDrawer() {
    $$('.drawer-pills .pill').forEach(pill => {
      pill.addEventListener('click', () => {
        $$('.drawer-pills .pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        this._renderDrawer(pill.dataset.drawerCat);
      });
    });
  }

  _bindActions() {
    $('#clearCanvas')?.addEventListener('click', () => this._clearCanvas());

    $('#wearToday')?.addEventListener('click', () => {
      const ids = Object.values(this.canvasState).map(i => i.id);
      if (ids.length === 0) { this.toast.show('Canvas is empty! Add some pieces first.'); return; }
      ids.forEach(id => this.store.incrementWorn(id));
      this.toast.show(`♥ Outfit logged! ${ids.length} piece${ids.length > 1 ? 's' : ''} marked as worn.`, 'success');
    });

    $('#saveLook')?.addEventListener('click', () => {
      if (Object.keys(this.canvasState).length === 0) {
        this.toast.show('Add pieces to your canvas first!');
        return;
      }
      this.saveModal.open();
    });

    $('#closeSaveLook')?.addEventListener('click', () => this.saveModal.close());
    $('#cancelSaveLook')?.addEventListener('click', () => this.saveModal.close());
    $('#confirmSaveLook')?.addEventListener('click', () => this._saveLook());
  }

  _renderDrawer(cat) {
    const items = cat === 'all' ? this.store.clothes : this.store.getByCategory(cat);
    const container = $('#drawerItems');
    if (!container) return;

    if (items.length === 0) {
      container.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:24px;font-size:0.82rem;color:rgba(43,38,39,0.45);">No items here yet</div>`;
      return;
    }

    container.innerHTML = items.map(item => `
      <div class="drawer-item-card" role="listitem" data-id="${item.id}" tabindex="0" 
           aria-label="Add ${item.title} to canvas" title="${item.title}">
        <div class="drawer-item-img">
          ${item.image
            ? `<img src="${item.image}" alt="${item.title}" loading="lazy" />`
            : `<div class="card-image-placeholder" style="font-size:1.8rem;height:100%;display:flex;align-items:center;justify-content:center;">${item.emoji || '👗'}</div>`}
        </div>
        <div class="drawer-item-name">${item.title}</div>
      </div>
    `).join('');

    container.querySelectorAll('.drawer-item-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.dataset.id;
        const item = this.store.clothes.find(c => c.id === id);
        if (item) this.snapItem(item);
      });
      card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); card.click(); }
      });
    });
  }

  snapItem(item) {
    const slot = CATEGORY_SLOT_MAP[item.category];
    if (!slot) { this.toast.show(`Can't place ${cap(item.category)} on canvas yet`); return; }
    this.canvasState[slot] = item;
    this._renderSlot(slot, item);
    this._updateCount();
  }

  _renderSlot(slotName, item) {
    const slotEl = document.querySelector(`.canvas-slot[data-slot="${slotName}"]`);
    if (!slotEl) return;

    const placeholder = slotEl.querySelector('.slot-placeholder');
    const slotItem    = slotEl.querySelector('.slot-item');
    const removeBtn   = slotEl.querySelector('.slot-remove');

    if (placeholder) placeholder.classList.add('hidden');
    if (removeBtn) removeBtn.classList.remove('hidden');

    if (slotItem) {
      slotItem.classList.remove('hidden');
      slotItem.innerHTML = `
        ${item.image
          ? `<img src="${item.image}" alt="${item.title}" />`
          : `<div style="width:56px;height:56px;display:flex;align-items:center;justify-content:center;font-size:2rem;background:linear-gradient(145deg,#FAE8EC,#FFD6DC);border-radius:8px;">${item.emoji || '👗'}</div>`}
        <div>
          <div class="slot-item-name">${item.title}</div>
          <div class="slot-item-tag">${cap(item.category)} · ${item.vibe || ''}</div>
        </div>
      `;
    }
    slotEl.classList.add('filled');
  }

  _removeFromSlot(slotName) {
    delete this.canvasState[slotName];
    const slotEl = document.querySelector(`.canvas-slot[data-slot="${slotName}"]`);
    if (!slotEl) return;

    const placeholder = slotEl.querySelector('.slot-placeholder');
    const slotItem    = slotEl.querySelector('.slot-item');
    const removeBtn   = slotEl.querySelector('.slot-remove');

    if (placeholder) placeholder.classList.remove('hidden');
    if (slotItem) { slotItem.classList.add('hidden'); slotItem.innerHTML = ''; }
    if (removeBtn) removeBtn.classList.add('hidden');
    slotEl.classList.remove('filled');
    this._updateCount();
  }

  _clearCanvas() {
    const slots = Object.keys(this.canvasState);
    if (slots.length === 0) { this.toast.show('Canvas is already empty'); return; }
    slots.forEach(slot => this._removeFromSlot(slot));
    this.canvasState = {};
    this._updateCount();
    this.toast.show('Canvas cleared ✦');
  }

  _updateCount() {
    const n = Object.keys(this.canvasState).length;
    const numEl = $('#countNum');
    if (numEl) numEl.textContent = n;
  }

  _saveLook() {
    const name  = $('#lookName')?.value?.trim() || `Look — ${today()}`;
    const mood  = $('#lookMood')?.value || 'It-Girl Luxe';
    const note  = $('#lookNote')?.value?.trim() || '';
    const pieces = Object.values(this.canvasState);

    const entry = {
      id:     uid(),
      name,
      mood,
      note,
      date:   today(),
      pieces: pieces.map(p => ({ id: p.id, title: p.title, image: p.image, emoji: p.emoji, category: p.category }))
    };

    this.store.addDiaryEntry(entry);
    this.saveModal.close();
    this.toast.show(`♥ "${name}" saved to your diary!`, 'success');

    // Reset modal fields
    const nameEl = $('#lookName'); if (nameEl) nameEl.value = '';
    const noteEl = $('#lookNote'); if (noteEl) noteEl.value = '';
  }

  refreshDrawer() {
    const activePill = document.querySelector('.drawer-pills .pill.active');
    this._renderDrawer(activePill?.dataset.drawerCat || 'all');
  }
}

// ================================================================
// CLASS: AiMatchModule — MODULE D
// ================================================================
class AiMatchModule {
  constructor(store, toast, dressingRoom) {
    this.store        = store;
    this.toast        = toast;
    this.dressingRoom = dressingRoom;
    this.selectedPiece = null;

    this._bindModeSwitcher();
    this._bindMoodCards();
    this._renderPieceGrid();
  }

  _bindModeSwitcher() {
    $('#modePiece')?.addEventListener('click', () => {
      $('#modePiece')?.classList.add('active');
      $('#modeMood')?.classList.remove('active');
      $('#modePiece')?.setAttribute('aria-pressed', 'true');
      $('#modeMood')?.setAttribute('aria-pressed', 'false');
      $('#panelPiece')?.classList.remove('hidden');
      $('#panelMood')?.classList.add('hidden');
    });

    $('#modeMood')?.addEventListener('click', () => {
      $('#modeMood')?.classList.add('active');
      $('#modePiece')?.classList.remove('active');
      $('#modeMood')?.setAttribute('aria-pressed', 'true');
      $('#modePiece')?.setAttribute('aria-pressed', 'false');
      $('#panelMood')?.classList.remove('hidden');
      $('#panelPiece')?.classList.add('hidden');
    });
  }

  _bindMoodCards() {
    $$('.mood-card').forEach(card => {
      card.addEventListener('click', () => {
        $$('.mood-card').forEach(c => c.style.borderColor = '');
        card.style.borderColor = 'var(--rose-gold)';
        this._matchByMood(card.dataset.mood);
      });
    });
  }

  _renderPieceGrid() {
    const grid = $('#aiPieceGrid');
    if (!grid) return;
    const items = this.store.clothes;
    grid.innerHTML = items.map(item => `
      <div class="ai-piece-card" data-id="${item.id}" role="listitem" tabindex="0" aria-label="Select ${item.title}">
        <div class="ai-piece-img">
          ${item.image
            ? `<img src="${item.image}" alt="${item.title}" loading="lazy" />`
            : `<div class="card-image-placeholder" style="height:100%;font-size:2.2rem;display:flex;align-items:center;justify-content:center;">${item.emoji || '👗'}</div>`}
        </div>
        <div class="ai-piece-name">${item.title}</div>
      </div>
    `).join('');

    grid.querySelectorAll('.ai-piece-card').forEach(card => {
      card.addEventListener('click', () => {
        grid.querySelectorAll('.ai-piece-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        const id = card.dataset.id;
        const item = this.store.clothes.find(c => c.id === id);
        if (item) this._matchByPiece(item);
      });
      card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); card.click(); }
      });
    });
  }

  refresh() { this._renderPieceGrid(); }

  _matchByPiece(hero) {
    this.selectedPiece = hero;
    const others = this.store.clothes.filter(c => c.id !== hero.id);

    // Generate 2 outfit combinations
    const looks = [this._buildLookAround(hero, others, 0), this._buildLookAround(hero, others, 1)]
      .filter(l => l.pieces.length > 0);

    const resultsEl = $('#aiPieceResults');
    const looksEl   = $('#aiLooks');
    if (!resultsEl || !looksEl) return;

    looksEl.innerHTML = looks.map((look, i) => this._lookCardHTML(look, `Look ${i + 1}`, i)).join('');
    resultsEl.classList.remove('hidden');
    this._bindLookApplyButtons(looksEl);
    resultsEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  _buildLookAround(hero, pool, variant) {
    const needed = ['top', 'bottom', 'outerwear', 'shoes', 'bag', 'accessories']
      .filter(slot => slot !== CATEGORY_SLOT_MAP[hero.category]);

    const picked = [hero];
    const heroColor = hero.color;

    // Shuffle pool deterministically using variant seed
    const shuffled = [...pool].sort((a, b) => {
      const hashA = (a.id.charCodeAt(a.id.length - 1) + variant * 7) % 3;
      const hashB = (b.id.charCodeAt(b.id.length - 1) + variant * 7) % 3;
      return hashA - hashB;
    });

    const usedSlots = new Set([CATEGORY_SLOT_MAP[hero.category]]);

    for (const item of shuffled) {
      const slot = CATEGORY_SLOT_MAP[item.category];
      if (!slot || usedSlots.has(slot)) continue;
      if (!colorGroupsMatch(heroColor, item.color) && Math.random() > 0.4) continue;
      picked.push(item);
      usedSlots.add(slot);
      if (picked.length >= 4) break;
    }

    // Fill remaining needed slots with any compatible items
    for (const item of shuffled) {
      if (picked.includes(item)) continue;
      const slot = CATEGORY_SLOT_MAP[item.category];
      if (!slot || usedSlots.has(slot)) continue;
      picked.push(item);
      usedSlots.add(slot);
      if (picked.length >= 5) break;
    }

    return { pieces: picked };
  }

  _matchByMood(mood) {
    const items = this.store.clothes.filter(c => c.vibe === mood);
    const allItems = this.store.clothes;

    // Build a look using mood-matching items first, fallback to all
    const slots   = ['top', 'bottom', 'outerwear', 'shoes', 'bag', 'accessories'];
    const usedSlots = new Set();
    const picked  = [];

    // First pass: mood-matched
    for (const item of items) {
      const slot = CATEGORY_SLOT_MAP[item.category];
      if (!slot || usedSlots.has(slot)) continue;
      picked.push(item);
      usedSlots.add(slot);
    }
    // Second pass: fill from all
    for (const item of allItems) {
      if (picked.includes(item)) continue;
      const slot = CATEGORY_SLOT_MAP[item.category];
      if (!slot || usedSlots.has(slot)) continue;
      picked.push(item);
      usedSlots.add(slot);
      if (picked.length >= 5) break;
    }

    const resultsEl = $('#aiMoodResults');
    const looksEl   = $('#aiMoodLooks');
    const titleEl   = $('#moodResultTitle');

    if (!resultsEl || !looksEl) return;

    if (titleEl) titleEl.textContent = `Your ${mood} look ✦`;
    looksEl.innerHTML = this._lookCardHTML({ pieces: picked }, `${mood} Outfit`, 0);
    resultsEl.classList.remove('hidden');
    this._bindLookApplyButtons(looksEl);
    resultsEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  _lookCardHTML(look, title, index) {
    const emojis = ['✦', '🌸', '✨', '💖'];
    const label  = emojis[index % emojis.length];
    return `
      <div class="ai-look-card">
        <div class="look-card-title">${label} ${title}</div>
        <div class="look-items">
          ${look.pieces.map(p => `
            <div class="look-item">
              ${p.image
                ? `<img class="look-item-img" src="${p.image}" alt="${p.title}" />`
                : `<div class="look-item-img" style="display:flex;align-items:center;justify-content:center;font-size:1.4rem;background:linear-gradient(145deg,#FAE8EC,#FFD6DC);">${p.emoji || '👗'}</div>`}
              <div class="look-item-info">
                <div class="look-item-name">${p.title}</div>
                <div class="look-item-cat">${cap(p.category)}</div>
              </div>
            </div>
          `).join('')}
        </div>
        <button class="btn-primary apply-look-btn" data-ids="${look.pieces.map(p => p.id).join(',')}">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          Apply to Dressing Room
        </button>
      </div>
    `;
  }

  _bindLookApplyButtons(container) {
    container.querySelectorAll('.apply-look-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const ids = btn.dataset.ids.split(',');
        ids.forEach(id => {
          const item = this.store.clothes.find(c => c.id === id);
          if (item) this.dressingRoom.snapItem(item);
        });
        this.toast.show('✦ Look applied to Dressing Room!', 'success');
        // Switch to dressing room tab
        document.querySelector('.nav-btn[data-tab="dressing-room"]')?.click() ||
        document.querySelector('.bottom-nav-btn[data-tab="dressing-room"]')?.click();
      });
    });
  }
}

// ================================================================
// CLASS: StatsModule — MODULE E
// ================================================================
class StatsModule {
  constructor(store, toast) {
    this.store = store;
    this.toast = toast;
  }

  render() {
    const clothes = this.store.clothes;
    const diary   = this.store.diary;

    // Stat cards
    const statTotal = $('#statTotal');
    if (statTotal) statTotal.textContent = clothes.length;

    const statFaves = $('#statFaves');
    if (statFaves) statFaves.textContent = clothes.filter(c => c.isFavorite).length;

    const statDiary = $('#statDiary');
    if (statDiary) statDiary.textContent = diary.length;

    const diaryCount = $('#diaryCount');
    if (diaryCount) diaryCount.textContent = `${diary.length} look${diary.length !== 1 ? 's' : ''}`;

    // Most worn
    const mostWorn = clothes.reduce((prev, curr) =>
      (curr.wornCount || 0) > (prev.wornCount || 0) ? curr : prev, clothes[0]);
    const statMostWorn = $('#statMostWorn');
    if (statMostWorn) {
      if (mostWorn) {
        statMostWorn.textContent = mostWorn.wornCount || 0;
        statMostWorn.title = mostWorn.title;
      } else {
        statMostWorn.textContent = '—';
      }
    }

    // Category distribution
    this._renderDistribution(clothes);

    // Diary
    this._renderDiary(diary);
  }

  _renderDistribution(clothes) {
    const container = $('#distributionBars');
    if (!container) return;

    const categories = ['tops', 'bottoms', 'dresses', 'outerwear', 'shoes', 'bags', 'accessories'];
    const counts = {};
    categories.forEach(cat => { counts[cat] = 0; });
    clothes.forEach(c => { if (counts[c.category] !== undefined) counts[c.category]++; });
    const total = clothes.length || 1;

    container.innerHTML = categories.map(cat => {
      const pct = Math.round((counts[cat] / total) * 100);
      return `
        <div class="dist-row">
          <span class="dist-cat">${cap(cat)}</span>
          <div class="dist-bar-wrap" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100">
            <div class="dist-bar" style="width:${pct}%"></div>
          </div>
          <span class="dist-pct">${pct}%</span>
        </div>
      `;
    }).join('');
  }

  _renderDiary(diary) {
    const list   = $('#diaryList');
    const empty  = $('#diaryEmpty');
    if (!list) return;

    if (diary.length === 0) {
      list.innerHTML = '';
      empty?.classList.remove('hidden');
      return;
    }

    empty?.classList.add('hidden');
    list.innerHTML = diary.map(entry => `
      <article class="diary-entry" role="listitem" data-entry-id="${entry.id}">
        <div>
          <div class="diary-entry-name">${entry.name}</div>
          <div class="diary-entry-meta">
            <span class="diary-mood">${entry.mood || 'It-Girl Luxe'}</span>
            <span class="diary-date">${entry.date}</span>
          </div>
          ${entry.note ? `<div class="diary-note">"${entry.note}"</div>` : ''}
        </div>
        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:8px;">
          <div class="diary-pieces">
            ${(entry.pieces || []).slice(0, 4).map(p =>
              p.image
                ? `<img class="diary-piece-img" src="${p.image}" alt="${p.title}" title="${p.title}" />`
                : `<div class="diary-piece-img" style="display:flex;align-items:center;justify-content:center;font-size:1.1rem;background:linear-gradient(145deg,#FAE8EC,#FFD6DC);" title="${p.title}">${p.emoji || '👗'}</div>`
            ).join('')}
          </div>
          <button class="diary-delete" data-entry-id="${entry.id}" aria-label="Delete this diary entry" title="Delete entry">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/></svg>
          </button>
        </div>
      </article>
    `).join('');

    // Bind delete buttons
    list.querySelectorAll('.diary-delete').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.entryId;
        this.store.removeDiaryEntry(id);
        this.toast.show('Diary entry removed');
        this.render();
      });
    });
  }
}

// ================================================================
// CLASS: NavigationController — Tab routing
// ================================================================
class NavigationController {
  constructor(modules) {
    this.modules = modules; // { closet, stats }
    this.currentTab = 'closet';

    this._bindAll();
    this._activateTab('closet');
  }

  _bindAll() {
    // Desktop nav buttons
    $$('.nav-btn[data-tab]').forEach(btn => {
      btn.addEventListener('click', () => this._activateTab(btn.dataset.tab));
    });
    // Mobile bottom nav buttons
    $$('.bottom-nav-btn[data-tab]').forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;
        if (tab === 'add') return; // handled by AddItemModule
        this._activateTab(tab);
      });
    });
  }

  _activateTab(tabId) {
    this.currentTab = tabId;

    // Update nav button states
    $$('.nav-btn[data-tab], .bottom-nav-btn[data-tab]').forEach(btn => {
      const isActive = btn.dataset.tab === tabId;
      btn.classList.toggle('active', isActive);
      if (btn.dataset.tab && btn.dataset.tab !== 'add') {
        btn.setAttribute('aria-current', isActive ? 'page' : 'false');
      }
    });

    // Show/hide panels
    $$('.tab-panel').forEach(panel => {
      panel.classList.toggle('hidden', panel.id !== `tab-${tabId}`);
    });

    // Run render hooks
    if (tabId === 'stats' && this.modules.stats) {
      this.modules.stats.render();
    }
    if (tabId === 'closet' && this.modules.closet) {
      this.modules.closet.render();
    }
    if (tabId === 'dressing-room' && this.modules.dressingRoom) {
      this.modules.dressingRoom.refreshDrawer();
    }
    if (tabId === 'ai-match' && this.modules.aiMatch) {
      this.modules.aiMatch.refresh();
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// ================================================================
// APP BOOTSTRAP
// ================================================================
class AuraApp {
  constructor() {
    this.store = new WardrobeStore();
    this.toast = new ToastManager();

    // Init modules
    this.dressingRoom = new DressingRoomModule(this.store, this.toast);
    this.closet       = new ClosetModule(this.store, this.toast, this.dressingRoom);
    this.aiMatch      = new AiMatchModule(this.store, this.toast, this.dressingRoom);
    this.stats        = new StatsModule(this.store, this.toast);

    this.addItem = new AddItemModule(this.store, this.toast, () => {
      this.closet.render();
      this.dressingRoom.refreshDrawer();
      this.aiMatch.refresh();
    });

    this.nav = new NavigationController({
      closet:       this.closet,
      dressingRoom: this.dressingRoom,
      aiMatch:      this.aiMatch,
      stats:        this.stats
    });

    // Initial render
    this.closet.render();

    // Welcome toast (slight delay for polish)
    setTimeout(() => {
      const n = this.store.clothes.length;
      this.toast.show(`✦ Welcome back! ${n} pieces in your closet.`, 'success');
    }, 600);
  }
}

// ── Boot ──────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  window.auraApp = new AuraApp();
});
