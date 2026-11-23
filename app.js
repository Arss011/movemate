/**
 * PINDAHIN - Core Client-Side Application Logic
 * Papan Iklan Pindahan & Oper Kost Bebas Iklan Basi
 */

// ========================================================
// 1. DATA CONSTANTS & PRESETS
// ========================================================

const STORAGE_KEY = 'pindahin_ads_data';

// Pemetaan Wilayah Kota & Kecamatan
const DISTRICTS_MAP = {
  'Depok': ['Cinere', 'Beji', 'Sukmajaya', 'Pancoran Mas', 'Cimanggis', 'Sawangan', 'Tapos'],
  'Bandung': ['Dago', 'Coblong', 'Sukajadi', 'Dipatiukur', 'Lengkong', 'Buahbatu', 'Cidadap'],
  'Jakarta Selatan': ['Tebet', 'Kuningan', 'Mampang Prapatan', 'Cilandak', 'Kebayoran Baru', 'Setiabudi', 'Pancoran', 'Pasar Minggu'],
  'Yogyakarta': ['Depok (Sleman)', 'Mlati', 'Gondokusuman', 'Umbulharjo'],
  'Surabaya': ['Gubeng', 'Sukolilo', 'Wonokromo', 'Rungkut']
};

// Preset Gambar Cepat untuk Form Pasang Iklan
const IMAGE_PRESETS = {
  'kasur': 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&auto=format&fit=crop&q=80',
  'kulkas': 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=800&auto=format&fit=crop&q=80',
  'meja': 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&auto=format&fit=crop&q=80',
  'dispenser': 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&auto=format&fit=crop&q=80',
  'kost': 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&auto=format&fit=crop&q=80'
};

const DEFAULT_FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&auto=format&fit=crop&q=80';

// Inisialisasi 6 Data Contoh Realistis
function getInitialSeedData() {
  const now = Date.now();
  const DAY_MS = 24 * 60 * 60 * 1000;

  return [
    {
      id: 'pndh-seed-1',
      title: 'Kasur Busa Tebal Inoac 160x200 + 2 Sprei Katun Aesthetic',
      category: 'Barang Pindahan',
      price: 650000,
      city: 'Depok',
      district: 'Cinere',
      sellerName: 'Rian Hidayat',
      whatsapp: '6281289123456',
      imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&auto=format&fit=crop&q=80',
      description: 'Dijual murah karena pindah kerja ke luar kota akhir bulan ini. Busa Inoac asli masih sangat padat dan tidak kempes sama sekali, pemakaian baru 8 bulan. Bonus 2 set sprei katun aesthetic motif minimalis. Lokasi di Cinere dekat Cinere Mall, wajib jemput sendiri.',
      isUrgent: true,
      status: 'active',
      views: 48,
      waClicks: 14,
      createdAt: new Date(now - 3 * DAY_MS).toISOString(),
      expiresAt: new Date(now + 11 * DAY_MS).toISOString() // Sisa 11 hari
    },
    {
      id: 'pndh-seed-2',
      title: 'Oper Kost Putra Kamar Mandi Dalam Dekat ITB Dago (Sisa 4 Bulan)',
      category: 'Oper Kost',
      price: 1250000,
      city: 'Bandung',
      district: 'Dago',
      sellerName: 'Fahmi Pratama',
      whatsapp: '6285712345678',
      imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&auto=format&fit=crop&q=80',
      description: 'Oper sewa kost sisa 4 bulan (bisa diperpanjang langsung ke bapak kost). Kamar mandi dalam, kasur springbed, lemari pakaian 2 pintu, meja belajar, WiFi kencang 50 Mbps, dan water heater. Hanya 5 menit jalan kaki ke ITB Ganesha / Simpang Dago. Alasan oper: sudah lulus sidang skripsi dan pulang ke Surabaya.',
      isUrgent: true,
      status: 'active',
      views: 92,
      waClicks: 29,
      createdAt: new Date(now - 6 * DAY_MS).toISOString(),
      expiresAt: new Date(now + 8 * DAY_MS).toISOString() // Sisa 8 hari
    },
    {
      id: 'pndh-seed-3',
      title: 'Kulkas 1 Pintu Sharp Kirei Hemat Listrik Kondisi 95% Mulus',
      category: 'Barang Pindahan',
      price: 850000,
      city: 'Jakarta Selatan',
      district: 'Tebet',
      sellerName: 'Nadira Putri',
      whatsapp: '6281398765432',
      imageUrl: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=800&auto=format&fit=crop&q=80',
      description: 'Kulkas Sharp Kirei 1 pintu, watt rendah ramah tagihan listrik kost (hanya 80 watt). Dingin normal, freezer cepat beku, rak kaca tempered utuh tanpa retak. Pemakaian sekitar 1 tahun. Alasan jual: pindah ke apartemen unfurnished yang sudah ada kulkas bawaannya.',
      isUrgent: false,
      status: 'active',
      views: 63,
      waClicks: 19,
      createdAt: new Date(now - 1 * DAY_MS).toISOString(),
      expiresAt: new Date(now + 13 * DAY_MS).toISOString() // Sisa 13 hari
    },
    {
      id: 'pndh-seed-4',
      title: 'Oper Kost Putri Full Furnished AC & Balkon Dekat Stasiun Tebet',
      category: 'Oper Kost',
      price: 1850000,
      city: 'Jakarta Selatan',
      district: 'Tebet',
      sellerName: 'Annisa Larasati',
      whatsapp: '6287811223344',
      imageUrl: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&auto=format&fit=crop&q=80',
      description: 'Oper kost sisa 2 bulan (harga asli sewa 2.1jt/bulan, saya subsidi jadi 1.85jt/bulan). Fasilitas: AC dingin, kasur queen size, smart TV, kamar mandi dalam dengan water heater shower, balkon jemur pribadi, akses dapur bersama, penjaga kost 24 jam. Lokasi sangat strategis cuma 7 menit jalan kaki ke Stasiun KRL Tebet.',
      isUrgent: true,
      status: 'active',
      views: 115,
      waClicks: 41,
      createdAt: new Date(now - 9 * DAY_MS).toISOString(),
      expiresAt: new Date(now + 5 * DAY_MS).toISOString() // Sisa 5 hari
    },
    {
      id: 'pndh-seed-5',
      title: 'Meja Belajar Minimalis IKEA + Kursi Putar Hidrolik Ergonomis',
      category: 'Barang Pindahan',
      price: 450000,
      city: 'Depok',
      district: 'Beji',
      sellerName: 'Bagus Setiawan',
      whatsapp: '6281255667788',
      imageUrl: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&auto=format&fit=crop&q=80',
      description: 'Satu set meja kerja/belajar IKEA Linnmon warna putih (100x60cm) + kursi kerja putar hidrolik masih berfungsi naik-turun dengan lancar. Kaki meja kokoh tidak goyang, kondisi mulus 90%. Sangat pas untuk mahasiswa UI / Gunadarma yang baru isi kamar kost. Lokasi dekat gerbatama UI Depok.',
      isUrgent: false,
      status: 'active',
      views: 37,
      waClicks: 8,
      createdAt: new Date(now - 0.5 * DAY_MS).toISOString(),
      expiresAt: new Date(now + 14 * DAY_MS).toISOString() // Sisa 14 hari
    },
    {
      id: 'pndh-seed-6',
      title: 'Dispenser Galon Bawah Miyako Panas & Dingin Normal Siap Pakai',
      category: 'Barang Pindahan',
      price: 390000,
      city: 'Bandung',
      district: 'Coblong',
      sellerName: 'Kevin Adrian',
      whatsapp: '6289633445566',
      imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&auto=format&fit=crop&q=80',
      description: 'Dispenser galon bawah Miyako, tidak perlu capek angkat galon ke atas. Tombol panas, normal, dan dingin berfungsi sempurna, lampu indikator nyala semua. Dijual murah karena mau kosongin kamar kost minggu depan. Boleh nego bensin tipis bagi yang ambil langsung hari ini.',
      isUrgent: true,
      status: 'active',
      views: 55,
      waClicks: 16,
      createdAt: new Date(now - 12 * DAY_MS).toISOString(),
      expiresAt: new Date(now + 2 * DAY_MS).toISOString() // Sisa 2 hari
    }
  ];
}


// ========================================================
// 2. STORAGE CONTROLLER (LocalStorage Persistence)
// ========================================================

const StorageController = {
  // Ambil semua data iklan dari localStorage
  getAds() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        return this.resetToDemo();
      }
      return JSON.parse(data);
    } catch (e) {
      console.error('Gagal membaca localStorage, mereset data:', e);
      return this.resetToDemo();
    }
  },

  // Simpan data iklan ke localStorage
  saveAds(ads) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ads));
    } catch (e) {
      console.error('Gagal menyimpan ke localStorage:', e);
    }
  },

  // Kembalikan ke 6 data demo awal
  resetToDemo() {
    const seed = getInitialSeedData();
    this.saveAds(seed);
    return seed;
  },

  // Tambah Iklan Baru
  addAd(newAd) {
    const ads = this.getAds();
    ads.unshift(newAd);
    this.saveAds(ads);
    return ads;
  },

  // Perbarui Iklan berdasarkan ID
  updateAd(id, updaterFn) {
    const ads = this.getAds();
    const index = ads.findIndex(ad => ad.id === id);
    if (index !== -1) {
      ads[index] = updaterFn(ads[index]);
      this.saveAds(ads);
    }
    return ads;
  },

  // Hapus Iklan
  deleteAd(id) {
    let ads = this.getAds();
    ads = ads.filter(ad => ad.id !== id);
    this.saveAds(ads);
    return ads;
  },

  // Tambah View (+1)
  incrementView(id) {
    this.updateAd(id, ad => ({
      ...ad,
      views: (ad.views || 0) + 1
    }));
  },

  // Tambah WhatsApp Clicks (+1)
  incrementWaClicks(id) {
    this.updateAd(id, ad => ({
      ...ad,
      waClicks: (ad.waClicks || 0) + 1
    }));
  },

  // Ubah status Terjual / Aktif
  toggleSold(id) {
    this.updateAd(id, ad => ({
      ...ad,
      status: ad.status === 'sold' ? 'active' : 'sold'
    }));
  },

  // Perpanjang masa aktif +14 hari
  extendExpiry(id) {
    const DAY_MS = 24 * 60 * 60 * 1000;
    this.updateAd(id, ad => ({
      ...ad,
      status: 'active',
      expiresAt: new Date(Date.now() + 14 * DAY_MS).toISOString()
    }));
  }
};


// ========================================================
// 3. UTILITY HELPERS
// ========================================================

// Format Rupiah
function formatRupiah(amount) {
  if (isNaN(amount) || amount === null) return 'Rp 0';
  return 'Rp ' + Number(amount).toLocaleString('id-ID');
}

// Format Tanggal Display Indonesia
function formatDateIndo(isoString) {
  if (!isoString) return '';
  const date = new Date(isoString);
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
}

// Cek apakah iklan kedaluwarsa & hitung sisa hari
function calculateExpiry(expiresAt) {
  if (!expiresAt) return { isExpired: false, remainingDays: 14 };
  const now = new Date();
  const expiryDate = new Date(expiresAt);
  const diffMs = expiryDate - now;
  const remainingDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  return {
    isExpired: remainingDays <= 0,
    remainingDays: remainingDays > 0 ? remainingDays : 0
  };
}

// Format Nomor WhatsApp ke Standar Internasional (awalan 62)
function formatWhatsAppNumber(phoneInput) {
  if (!phoneInput) return '';
  // Hapus semua karakter non-digit
  let cleaned = phoneInput.toString().replace(/\D/g, '');
  
  // Jika diawali 08..., ganti 0 dengan 62
  if (cleaned.startsWith('0')) {
    cleaned = '62' + cleaned.slice(1);
  }
  // Jika diawali 8..., tambahkan 62 di depan
  else if (cleaned.startsWith('8')) {
    cleaned = '62' + cleaned;
  }
  return cleaned;
}

// Masking Nomor WA untuk kenyamanan visual: 62812****5678
function maskWhatsAppNumber(phone) {
  if (!phone || phone.length < 8) return phone || '';
  const visibleStart = phone.slice(0, 5);
  const visibleEnd = phone.slice(-4);
  return `${visibleStart}****${visibleEnd}`;
}

// Toast Notification System
function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  const bgColors = {
    success: 'bg-slate-900 border-emerald-500 text-white',
    urgent: 'bg-slate-900 border-urgent-500 text-white',
    info: 'bg-slate-900 border-blue-500 text-white'
  };

  const icons = {
    success: `<svg class="w-5 h-5 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>`,
    urgent: `<svg class="w-5 h-5 text-urgent-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>`,
    info: `<svg class="w-5 h-5 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`
  };

  toast.className = `toast-enter pointer-events-auto flex items-center gap-3 p-4 rounded-2xl border shadow-xl ${bgColors[type] || bgColors.success}`;
  toast.innerHTML = `
    ${icons[type] || icons.success}
    <div class="text-xs sm:text-sm font-medium flex-grow">${message}</div>
    <button class="text-slate-400 hover:text-white p-1 rounded-lg focus:outline-none" onclick="this.parentElement.remove()">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
    </button>
  `;

  container.appendChild(toast);

  // Auto remove after 3.5s
  setTimeout(() => {
    toast.classList.remove('toast-enter');
    toast.classList.add('toast-exit');
    setTimeout(() => toast.remove(), 250);
  }, 3500);
}


// ========================================================
// 4. APPLICATION STATE & DOM ELEMENTS
// ========================================================

const AppState = {
  currentView: 'catalog', // 'catalog' | 'seller'
  activeModalAdId: null,
  filters: {
    keyword: '',
    city: '',
    district: '',
    category: '',
    urgentOnly: false,
    sortBy: 'newest'
  },
  sellerStatusFilter: 'all'
};

// DOM Elements Cache
const DOM = {
  // Navigation
  navCatalogBtn: document.getElementById('navCatalogBtn'),
  navSellerBtn: document.getElementById('navSellerBtn'),
  brandLogoBtn: document.getElementById('brandLogoBtn'),
  sellerAdsBadge: document.getElementById('sellerAdsBadge'),
  openPostModalBtn: document.getElementById('openPostModalBtn'),

  // Views
  catalogViewSection: document.getElementById('catalogViewSection'),
  sellerViewSection: document.getElementById('sellerViewSection'),

  // Filter Elements
  searchInput: document.getElementById('searchInput'),
  clearSearchBtn: document.getElementById('clearSearchBtn'),
  filterCity: document.getElementById('filterCity'),
  filterDistrict: document.getElementById('filterDistrict'),
  filterCategory: document.getElementById('filterCategory'),
  filterSort: document.getElementById('filterSort'),
  filterUrgent: document.getElementById('filterUrgent'),
  resetFilterBtn: document.getElementById('resetFilterBtn'),
  resultsCountBadge: document.getElementById('resultsCountBadge'),
  filterSummaryText: document.getElementById('filterSummaryText'),

  // Catalog Section
  catalogGrid: document.getElementById('catalogGrid'),
  emptyCatalogState: document.getElementById('emptyCatalogState'),
  emptyResetFilterBtn: document.getElementById('emptyResetFilterBtn'),
  emptyPostAdBtn: document.getElementById('emptyPostAdBtn'),

  // Seller Section
  statActiveAds: document.getElementById('statActiveAds'),
  statSoldAds: document.getElementById('statSoldAds'),
  statTotalViews: document.getElementById('statTotalViews'),
  statTotalWa: document.getElementById('statTotalWa'),
  sellerAdsList: document.getElementById('sellerAdsList'),
  sellerAdsCountText: document.getElementById('sellerAdsCountText'),
  sellerStatusFilter: document.getElementById('sellerStatusFilter'),
  emptySellerState: document.getElementById('emptySellerState'),
  emptySellerCreateBtn: document.getElementById('emptySellerCreateBtn'),
  sellerCreateAdBtn: document.getElementById('sellerCreateAdBtn'),

  // Detail Modal
  detailModal: document.getElementById('detailModal'),
  closeDetailModalBtn: document.getElementById('closeDetailModalBtn'),
  detailImage: document.getElementById('detailImage'),
  detailCategoryBadge: document.getElementById('detailCategoryBadge'),
  detailUrgentBadge: document.getElementById('detailUrgentBadge'),
  detailExpiryBadge: document.getElementById('detailExpiryBadge'),
  detailExpiryText: document.getElementById('detailExpiryText'),
  detailPrice: document.getElementById('detailPrice'),
  detailTitle: document.getElementById('detailTitle'),
  detailLocationText: document.getElementById('detailLocationText'),
  detailSellerName: document.getElementById('detailSellerName'),
  detailPostedDate: document.getElementById('detailPostedDate'),
  detailDescription: document.getElementById('detailDescription'),
  detailViewsCount: document.getElementById('detailViewsCount'),
  detailWaCount: document.getElementById('detailWaCount'),
  detailMaskedWa: document.getElementById('detailMaskedWa'),
  detailContactWaBtn: document.getElementById('detailContactWaBtn'),

  // Post Ad Modal
  postModal: document.getElementById('postModal'),
  closePostModalBtn: document.getElementById('closePostModalBtn'),
  cancelPostAdBtn: document.getElementById('cancelPostAdBtn'),
  postAdForm: document.getElementById('postAdForm'),
  formTitle: document.getElementById('formTitle'),
  formCategory: document.getElementById('formCategory'),
  formPrice: document.getElementById('formPrice'),
  priceFormattedHint: document.getElementById('priceFormattedHint'),
  formCity: document.getElementById('formCity'),
  formDistrict: document.getElementById('formDistrict'),
  formDistrictSuggestions: document.getElementById('formDistrictSuggestions'),
  formSellerName: document.getElementById('formSellerName'),
  formWhatsapp: document.getElementById('formWhatsapp'),
  formIsUrgent: document.getElementById('formIsUrgent'),
  formImageUrl: document.getElementById('formImageUrl'),
  formDescription: document.getElementById('formDescription'),
  presetImagesContainer: document.getElementById('presetImagesContainer'),

  // Footer Actions
  resetDemoDataBtn: document.getElementById('resetDemoDataBtn')
};


// ========================================================
// 5. VIEW RENDERING & CONTROLLER LOGIC
// ========================================================

// Render Tab Navigasi (Jelajah Iklan vs Kelola Iklan)
function switchView(viewName) {
  AppState.currentView = viewName;

  if (viewName === 'catalog') {
    DOM.catalogViewSection.classList.remove('hidden');
    DOM.sellerViewSection.classList.add('hidden');
    DOM.navCatalogBtn.classList.add('nav-tab-active');
    DOM.navSellerBtn.classList.remove('nav-tab-active');
    renderCatalog();
  } else {
    DOM.catalogViewSection.classList.add('hidden');
    DOM.sellerViewSection.classList.remove('hidden');
    DOM.navCatalogBtn.classList.remove('nav-tab-active');
    DOM.navSellerBtn.classList.add('nav-tab-active');
    renderSellerView();
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Update Jumlah Badge Iklan Penjual di Nav Bar
function updateSellerBadge() {
  const ads = StorageController.getAds();
  DOM.sellerAdsBadge.textContent = ads.length;
}

// Dynamic Populate Dropdown Kecamatan Berdasarkan Kota yang Dipilih
function updateDistrictFilterDropdown(selectedCity) {
  DOM.filterDistrict.innerHTML = '<option value="">Semua Kecamatan</option>';

  let districts = [];
  if (selectedCity && DISTRICTS_MAP[selectedCity]) {
    districts = DISTRICTS_MAP[selectedCity];
  } else {
    // Ambil semua kecamatan unik yang ada di data
    const ads = StorageController.getAds();
    const set = new Set();
    ads.forEach(ad => {
      if (ad.district) set.add(ad.district);
    });
    districts = Array.from(set).sort();
  }

  districts.forEach(dist => {
    const opt = document.createElement('option');
    opt.value = dist;
    opt.textContent = dist;
    DOM.filterDistrict.appendChild(opt);
  });
}

// Dynamic Populate Datalist Kecamatan di Form Pasang Iklan
function updateFormDistrictSuggestions(selectedCity) {
  DOM.formDistrictSuggestions.innerHTML = '';
  if (selectedCity && DISTRICTS_MAP[selectedCity]) {
    DISTRICTS_MAP[selectedCity].forEach(dist => {
      const option = document.createElement('option');
      option.value = dist;
      DOM.formDistrictSuggestions.appendChild(option);
    });
  }
}

// --------------------------------------------------------
// KATALOG PUBLIK (SUDUT PANDANG PEMBELI)
// --------------------------------------------------------
function renderCatalog() {
  const allAds = StorageController.getAds();
  updateSellerBadge();

  // ATURAN ANTI-IKLAN BASI:
  // Katalog publik hanya menampilkan iklan berstatus 'active' yang BELUM lewat tanggal expiresAt
  const activeAds = allAds.filter(ad => {
    if (ad.status !== 'active') return false;
    const { isExpired } = calculateExpiry(ad.expiresAt);
    return !isExpired;
  });

  // Terapkan Filter Pencarian & Wilayah
  let filtered = activeAds.filter(ad => {
    // 1. Keyword search (Judul atau Deskripsi)
    if (AppState.filters.keyword) {
      const kw = AppState.filters.keyword.toLowerCase();
      const matchTitle = ad.title.toLowerCase().includes(kw);
      const matchDesc = ad.description.toLowerCase().includes(kw);
      const matchDistrict = ad.district.toLowerCase().includes(kw);
      if (!matchTitle && !matchDesc && !matchDistrict) return false;
    }

    // 2. Filter Kota
    if (AppState.filters.city && ad.city !== AppState.filters.city) {
      return false;
    }

    // 3. Filter Kecamatan
    if (AppState.filters.district && ad.district !== AppState.filters.district) {
      return false;
    }

    // 4. Filter Kategori
    if (AppState.filters.category && ad.category !== AppState.filters.category) {
      return false;
    }

    // 5. Filter Butuh Cepat / Nego
    if (AppState.filters.urgentOnly && !ad.isUrgent) {
      return false;
    }

    return true;
  });

  // Terapkan Pengurutan (Sorting)
  filtered.sort((a, b) => {
    if (AppState.filters.sortBy === 'newest') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    if (AppState.filters.sortBy === 'expiring') {
      return new Date(a.expiresAt) - new Date(b.expiresAt);
    }
    if (AppState.filters.sortBy === 'price_low') {
      return a.price - b.price;
    }
    if (AppState.filters.sortBy === 'price_high') {
      return b.price - a.price;
    }
    if (AppState.filters.sortBy === 'views_popular') {
      return (b.views || 0) - (a.views || 0);
    }
    return 0;
  });

  // Update Summary Info
  DOM.resultsCountBadge.textContent = `${filtered.length} Iklan`;
  let filterText = 'Menampilkan iklan aktif yang belum kedaluwarsa';
  if (AppState.filters.city) {
    filterText += ` di wilayah ${AppState.filters.city}`;
    if (AppState.filters.district) {
      filterText += ` (${AppState.filters.district})`;
    }
  }
  if (AppState.filters.category) {
    filterText += ` • Kategori ${AppState.filters.category}`;
  }
  if (AppState.filters.urgentOnly) {
    filterText += ` • Hanya Butuh Cepat`;
  }
  DOM.filterSummaryText.textContent = filterText;

  // Toggle Empty State
  if (filtered.length === 0) {
    DOM.catalogGrid.innerHTML = '';
    DOM.emptyCatalogState.classList.remove('hidden');
    return;
  }

  DOM.emptyCatalogState.classList.add('hidden');

  // Render HTML Cards
  DOM.catalogGrid.innerHTML = filtered.map(ad => {
    const { remainingDays } = calculateExpiry(ad.expiresAt);
    const categoryIcon = ad.category === 'Oper Kost' ? '🏠' : '📦';
    
    // Badge sisa hari warna dinamis
    let expiryBadgeClass = 'bg-emerald-50 text-brand-700 border-emerald-200';
    if (remainingDays <= 2) {
      expiryBadgeClass = 'bg-rose-50 text-rose-700 border-rose-200 font-bold';
    } else if (remainingDays <= 5) {
      expiryBadgeClass = 'bg-amber-50 text-amber-700 border-amber-200 font-bold';
    }

    return `
      <article 
        class="ad-card bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-brand-500/30 transition-all duration-300 flex flex-col overflow-hidden cursor-pointer group"
        onclick="openDetailModal('${ad.id}')"
      >
        <!-- Image Container -->
        <div class="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
          <img 
            src="${ad.imageUrl || DEFAULT_FALLBACK_IMAGE}" 
            alt="${ad.title}" 
            class="ad-card-image w-full h-full object-cover"
            loading="lazy"
            onerror="this.src='${DEFAULT_FALLBACK_IMAGE}'"
          >
          <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          <!-- Badges on Image -->
          <div class="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
            <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-white/95 text-slate-800 shadow-sm backdrop-blur-sm">
              <span>${categoryIcon}</span>
              <span>${ad.category}</span>
            </span>

            ${ad.isUrgent ? `
              <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-urgent-500 text-white shadow-sm">
                <span>🔥</span>
                <span>Butuh Cepat</span>
              </span>
            ` : ''}
          </div>

          <!-- Expiry Remaining Days Badge (Anti-Basi) -->
          <div class="absolute bottom-3 right-3">
            <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-white/95 text-slate-700 shadow-md backdrop-blur-sm border border-slate-100">
              <svg class="w-3.5 h-3.5 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Sisa ${remainingDays} hari</span>
            </span>
          </div>
        </div>

        <!-- Card Body Content -->
        <div class="p-4 sm:p-5 flex-grow flex flex-col justify-between">
          <div>
            <!-- Price -->
            <div class="text-xl sm:text-2xl font-extrabold text-brand-700 tracking-tight">
              ${formatRupiah(ad.price)}
              ${ad.category === 'Oper Kost' ? '<span class="text-xs font-normal text-slate-500"> /bulan</span>' : ''}
            </div>

            <!-- Title -->
            <h3 class="text-sm sm:text-base font-bold text-slate-900 mt-1 line-clamp-2 group-hover:text-brand-600 transition-colors leading-snug">
              ${ad.title}
            </h3>

            <!-- Location Pin -->
            <div class="flex items-center gap-1.5 text-xs text-slate-500 mt-2 font-medium">
              <svg class="w-3.5 h-3.5 text-brand-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span class="truncate">${ad.district}, ${ad.city}</span>
            </div>
          </div>

          <!-- Card Footer Metrics & Action -->
          <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
            <!-- Viewers & Interest Counts -->
            <div class="flex items-center gap-3">
              <span class="inline-flex items-center gap-1" title="Dilihat calon pembeli">
                <svg class="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span>${ad.views || 0}</span>
              </span>
              <span class="inline-flex items-center gap-1 text-emerald-600 font-medium" title="Klik WhatsApp">
                <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span>${ad.waClicks || 0}</span>
              </span>
            </div>

            <!-- Quick Detail Link -->
            <span class="inline-flex items-center gap-1 font-bold text-brand-600 group-hover:translate-x-0.5 transition-transform">
              <span>Detail & WA</span>
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

// --------------------------------------------------------
// MODAL DETAIL IKLAN & ANALYTICS TRACKING
// --------------------------------------------------------
function openDetailModal(adId) {
  const ads = StorageController.getAds();
  const ad = ads.find(item => item.id === adId);
  if (!ad) return;

  AppState.activeModalAdId = adId;

  // Tracking: Tambah Views (+1) saat detail dibuka
  StorageController.incrementView(adId);
  ad.views = (ad.views || 0) + 1; // Update in-memory copy

  // Populate data modal
  DOM.detailImage.src = ad.imageUrl || DEFAULT_FALLBACK_IMAGE;
  DOM.detailImage.onerror = () => { DOM.detailImage.src = DEFAULT_FALLBACK_IMAGE; };

  DOM.detailCategoryBadge.textContent = `${ad.category === 'Oper Kost' ? '🏠' : '📦'} ${ad.category}`;
  
  if (ad.isUrgent) {
    DOM.detailUrgentBadge.classList.remove('hidden');
  } else {
    DOM.detailUrgentBadge.classList.add('hidden');
  }

  const { isExpired, remainingDays } = calculateExpiry(ad.expiresAt);
  if (ad.status === 'sold') {
    DOM.detailExpiryText.textContent = 'Terjual';
    DOM.detailExpiryBadge.className = 'px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-600 text-white shadow-sm';
  } else if (isExpired) {
    DOM.detailExpiryText.textContent = 'Kedaluwarsa';
    DOM.detailExpiryBadge.className = 'px-2.5 py-1 rounded-lg text-xs font-bold bg-rose-600 text-white shadow-sm';
  } else {
    DOM.detailExpiryText.textContent = `Sisa ${remainingDays} hari lagi`;
    DOM.detailExpiryBadge.className = 'px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-600 text-white shadow-sm';
  }

  DOM.detailPrice.textContent = `${formatRupiah(ad.price)}${ad.category === 'Oper Kost' ? ' /bulan' : ''}`;
  DOM.detailTitle.textContent = ad.title;
  DOM.detailLocationText.textContent = `${ad.district}, ${ad.city}`;
  DOM.detailSellerName.textContent = ad.sellerName;
  DOM.detailPostedDate.textContent = formatDateIndo(ad.createdAt);
  DOM.detailDescription.textContent = ad.description;
  DOM.detailViewsCount.textContent = `${ad.views} kali`;
  DOM.detailWaCount.textContent = `${ad.waClicks || 0} peminat`;
  DOM.detailMaskedWa.textContent = maskWhatsAppNumber(ad.whatsapp);

  // Tampilkan Modal dengan animasi
  DOM.detailModal.classList.remove('hidden');
  // force reflow
  void DOM.detailModal.offsetWidth;
  DOM.detailModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeDetailModal() {
  DOM.detailModal.classList.remove('active');
  setTimeout(() => {
    DOM.detailModal.classList.add('hidden');
    document.body.style.overflow = '';
    AppState.activeModalAdId = null;
    // Refresh card view numbers
    if (AppState.currentView === 'catalog') {
      renderCatalog();
    } else {
      renderSellerView();
    }
  }, 200);
}

// Handler WhatsApp Contact Button
function handleWhatsAppContact() {
  if (!AppState.activeModalAdId) return;

  const ads = StorageController.getAds();
  const ad = ads.find(item => item.id === AppState.activeModalAdId);
  if (!ad) return;

  // Tracking: Tambah hitungan WhatsApp Clicks (+1)
  StorageController.incrementWaClicks(ad.id);
  ad.waClicks = (ad.waClicks || 0) + 1;

  // Update counter di modal secara instan
  DOM.detailWaCount.textContent = `${ad.waClicks} peminat`;

  // Format pesan WhatsApp otomatis
  const formattedPhone = formatWhatsAppNumber(ad.whatsapp);
  const messageText = `Halo ${ad.sellerName}, saya melihat iklan "${ad.title}" di Pindahin (${ad.district}, ${ad.city}). Apakah masih tersedia?`;
  const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(messageText)}`;

  showToast('Membuka WhatsApp penjual...', 'success');

  // Buka WhatsApp di tab baru
  window.open(whatsappUrl, '_blank');
}


// --------------------------------------------------------
// DASHBOARD KELOLA IKLAN (SUDUT PANDANG PENJUAL)
// --------------------------------------------------------
function renderSellerView() {
  const allAds = StorageController.getAds();
  updateSellerBadge();

  // Hitung Analitik Global
  let activeCount = 0;
  let soldCount = 0;
  let totalViews = 0;
  let totalWa = 0;

  allAds.forEach(ad => {
    const { isExpired } = calculateExpiry(ad.expiresAt);
    if (ad.status === 'sold') {
      soldCount++;
    } else if (!isExpired) {
      activeCount++;
    }
    totalViews += Number(ad.views) || 0;
    totalWa += Number(ad.waClicks) || 0;
  });

  DOM.statActiveAds.textContent = activeCount;
  DOM.statSoldAds.textContent = soldCount;
  DOM.statTotalViews.textContent = totalViews;
  DOM.statTotalWa.textContent = totalWa;

  // Filter Status Seller
  let filteredSellerAds = allAds.filter(ad => {
    const { isExpired } = calculateExpiry(ad.expiresAt);
    if (AppState.sellerStatusFilter === 'active') {
      return ad.status === 'active' && !isExpired;
    }
    if (AppState.sellerStatusFilter === 'sold') {
      return ad.status === 'sold';
    }
    if (AppState.sellerStatusFilter === 'expired') {
      return ad.status === 'active' && isExpired;
    }
    return true; // 'all'
  });

  DOM.sellerAdsCountText.textContent = `${filteredSellerAds.length} Iklan`;

  if (filteredSellerAds.length === 0) {
    DOM.sellerAdsList.innerHTML = '';
    DOM.emptySellerState.classList.remove('hidden');
    return;
  }

  DOM.emptySellerState.classList.add('hidden');

  // Render Baris Iklan Penjual
  DOM.sellerAdsList.innerHTML = filteredSellerAds.map(ad => {
    const { isExpired, remainingDays } = calculateExpiry(ad.expiresAt);
    const isSold = ad.status === 'sold';

    // Status Badge Info
    let statusBadge = '';
    if (isSold) {
      statusBadge = '<span class="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-300">✓ Sudah Terjual</span>';
    } else if (isExpired) {
      statusBadge = '<span class="px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-700 border border-rose-300">⚠️ Kedaluwarsa (14 Hari)</span>';
    } else {
      statusBadge = `<span class="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">● Tayang (Sisa ${remainingDays} Hari)</span>`;
    }

    // Rasio konversi lead (Klik WA / Views)
    const conversionRate = ad.views > 0 ? Math.round(((ad.waClicks || 0) / ad.views) * 100) : 0;

    return `
      <div class="p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors">
        
        <!-- Kolom Info Barang -->
        <div class="flex items-start gap-3.5 flex-grow">
          <img 
            src="${ad.imageUrl || DEFAULT_FALLBACK_IMAGE}" 
            alt="${ad.title}" 
            class="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover bg-slate-100 border border-slate-200 flex-shrink-0"
            onerror="this.src='${DEFAULT_FALLBACK_IMAGE}'"
          >
          <div class="space-y-1">
            <div class="flex items-center gap-2 flex-wrap">
              ${statusBadge}
              <span class="text-xs text-slate-500 font-medium">${ad.category}</span>
              ${ad.isUrgent ? '<span class="text-[11px] font-bold text-urgent-600 bg-orange-50 px-1.5 py-0.5 rounded border border-orange-200">🔥 Butuh Cepat</span>' : ''}
            </div>

            <h3 class="text-sm sm:text-base font-bold text-slate-900 leading-snug">
              ${ad.title}
            </h3>

            <div class="flex items-center gap-3 text-xs text-slate-500">
              <span class="font-extrabold text-brand-700">${formatRupiah(ad.price)}</span>
              <span>•</span>
              <span>📍 ${ad.district}, ${ad.city}</span>
              <span>•</span>
              <span>Dibuat: ${formatDateIndo(ad.createdAt)}</span>
            </div>
          </div>
        </div>

        <!-- Kolom Metrik Analitik Mini -->
        <div class="flex items-center gap-4 bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-200/80 self-start lg:self-center">
          <div class="text-center">
            <div class="text-xs text-slate-400 font-medium">Dilihat</div>
            <div class="text-sm sm:text-base font-extrabold text-slate-800 flex items-center justify-center gap-1">
              <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
              <span>${ad.views || 0}</span>
            </div>
          </div>

          <div class="w-px h-8 bg-slate-200"></div>

          <div class="text-center">
            <div class="text-xs text-slate-400 font-medium">Lead WA</div>
            <div class="text-sm sm:text-base font-extrabold text-emerald-600 flex items-center justify-center gap-1">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              <span>${ad.waClicks || 0}</span>
            </div>
          </div>

          <div class="w-px h-8 bg-slate-200"></div>

          <div class="text-center">
            <div class="text-xs text-slate-400 font-medium">Konversi</div>
            <div class="text-xs sm:text-sm font-bold text-slate-700">
              ${conversionRate}%
            </div>
          </div>
        </div>

        <!-- Kolom Tombol Aksi Penjual -->
        <div class="flex items-center gap-2 flex-wrap">
          
          <!-- Tombol Tandai Terjual / Aktifkan Kembali -->
          <button 
            onclick="handleToggleSold('${ad.id}')"
            class="px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              isSold 
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300' 
                : 'bg-emerald-50 hover:bg-emerald-100 text-brand-700 border-emerald-200'
            }"
            title="${isSold ? 'Ubah kembali menjadi aktif' : 'Tandai barang sudah laku'}"
          >
            ${isSold ? 'Aktifkan Kembali' : '✓ Tandai Terjual'}
          </button>

          <!-- Tombol Perpanjang +14 Hari -->
          <button 
            onclick="handleExtendExpiry('${ad.id}')"
            class="px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 transition-all"
            title="Reset masa tayang menjadi 14 hari penuh mulai hari ini"
          >
            +14 Hari
          </button>

          <!-- Tombol Hapus -->
          <button 
            onclick="handleDeleteAd('${ad.id}')"
            class="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors border border-transparent hover:border-rose-200"
            title="Hapus iklan ini permanen"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>

        </div>

      </div>
    `;
  }).join('');
}

// Aksi Penjual: Toggle Terjual
function handleToggleSold(id) {
  StorageController.toggleSold(id);
  const ads = StorageController.getAds();
  const ad = ads.find(a => a.id === id);
  if (ad && ad.status === 'sold') {
    showToast('Iklan berhasil ditandai sebagai Terjual.', 'info');
  } else {
    showToast('Iklan diaktifkan kembali ke katalog publik.', 'success');
  }
  renderSellerView();
}

// Aksi Penjual: Perpanjang Masa Aktif
function handleExtendExpiry(id) {
  StorageController.extendExpiry(id);
  showToast('Masa aktif iklan berhasil diperpanjang +14 hari!', 'success');
  renderSellerView();
}

// Aksi Penjual: Hapus Iklan
function handleDeleteAd(id) {
  if (confirm('Apakah Anda yakin ingin menghapus iklan ini secara permanen?')) {
    StorageController.deleteAd(id);
    showToast('Iklan berhasil dihapus.', 'info');
    renderSellerView();
  }
}


// --------------------------------------------------------
// MODAL PASANG IKLAN BARU
// --------------------------------------------------------
function openPostModal() {
  DOM.postModal.classList.remove('hidden');
  void DOM.postModal.offsetWidth;
  DOM.postModal.classList.add('active');
  document.body.style.overflow = 'hidden';
  // Fokus input pertama
  setTimeout(() => DOM.formTitle.focus(), 150);
}

function closePostModal() {
  DOM.postModal.classList.remove('active');
  setTimeout(() => {
    DOM.postModal.classList.add('hidden');
    document.body.style.overflow = '';
    DOM.postAdForm.reset();
    DOM.priceFormattedHint.textContent = 'Rp 0';
  }, 200);
}

// Handler Submit Form Pasang Iklan Baru
function handlePostAdSubmit(e) {
  e.preventDefault();

  const title = DOM.formTitle.value.trim();
  const category = DOM.formCategory.value;
  const price = Number(DOM.formPrice.value);
  const city = DOM.formCity.value;
  const district = DOM.formDistrict.value.trim();
  const sellerName = DOM.formSellerName.value.trim();
  const whatsappInput = DOM.formWhatsapp.value.trim();
  const isUrgent = DOM.formIsUrgent.checked;
  const imageUrl = DOM.formImageUrl.value.trim();
  const description = DOM.formDescription.value.trim();

  // Validasi Dasar
  if (!title) {
    alert('Mohon masukkan Judul Iklan.');
    DOM.formTitle.focus();
    return;
  }
  if (!category) {
    alert('Mohon pilih Kategori.');
    return;
  }
  if (isNaN(price) || price < 0) {
    alert('Mohon masukkan harga yang valid.');
    DOM.formPrice.focus();
    return;
  }
  if (!city) {
    alert('Mohon pilih Kota.');
    DOM.formCity.focus();
    return;
  }
  if (!district) {
    alert('Mohon masukkan nama Kecamatan.');
    DOM.formDistrict.focus();
    return;
  }
  if (!sellerName) {
    alert('Mohon masukkan Nama Anda.');
    DOM.formSellerName.focus();
    return;
  }
  if (!whatsappInput) {
    alert('Mohon masukkan Nomor WhatsApp Anda.');
    DOM.formWhatsapp.focus();
    return;
  }
  if (!description) {
    alert('Mohon masukkan Deskripsi Barang.');
    DOM.formDescription.focus();
    return;
  }

  // Format Nomor WhatsApp ke format '62...'
  const formattedWa = formatWhatsAppNumber(whatsappInput);
  if (formattedWa.length < 10) {
    alert('Nomor WhatsApp tampaknya terlalu pendek. Pastikan nomor valid.');
    DOM.formWhatsapp.focus();
    return;
  }

  // Masa aktif otomatis 14 hari dari sekarang
  const now = Date.now();
  const DAY_MS = 24 * 60 * 60 * 1000;

  const newAd = {
    id: 'pndh-' + now,
    title,
    category,
    price,
    city,
    district,
    sellerName,
    whatsapp: formattedWa,
    imageUrl: imageUrl || DEFAULT_FALLBACK_IMAGE,
    description,
    isUrgent,
    status: 'active',
    views: 0,
    waClicks: 0,
    createdAt: new Date(now).toISOString(),
    expiresAt: new Date(now + 14 * DAY_MS).toISOString()
  };

  // Simpan data
  StorageController.addAd(newAd);

  closePostModal();
  showToast('Iklan Anda berhasil ditayangkan selama 14 hari!', 'success');

  // Jika sedang di katalog, update tampilan katalog
  if (AppState.currentView === 'catalog') {
    renderCatalog();
  } else {
    renderSellerView();
  }
}


// ========================================================
// 6. EVENT LISTENERS INITIALIZATION
// ========================================================

function initEventListeners() {
  // Navigation Tabs Switch
  DOM.navCatalogBtn.addEventListener('click', () => switchView('catalog'));
  DOM.navSellerBtn.addEventListener('click', () => switchView('seller'));
  DOM.brandLogoBtn.addEventListener('click', (e) => {
    e.preventDefault();
    switchView('catalog');
  });

  // Open & Close Modals
  DOM.openPostModalBtn.addEventListener('click', openPostModal);
  DOM.sellerCreateAdBtn?.addEventListener('click', openPostModal);
  DOM.emptySellerCreateBtn?.addEventListener('click', openPostModal);
  DOM.emptyPostAdBtn?.addEventListener('click', openPostModal);

  DOM.closePostModalBtn.addEventListener('click', closePostModal);
  DOM.cancelPostAdBtn.addEventListener('click', closePostModal);
  DOM.postAdForm.addEventListener('submit', handlePostAdSubmit);

  DOM.closeDetailModalBtn.addEventListener('click', closeDetailModal);
  DOM.detailContactWaBtn.addEventListener('click', handleWhatsAppContact);

  // Close Modals on Backdrop Click
  DOM.detailModal.addEventListener('click', (e) => {
    if (e.target === DOM.detailModal) closeDetailModal();
  });
  DOM.postModal.addEventListener('click', (e) => {
    if (e.target === DOM.postModal) closePostModal();
  });

  // Close Modals with Escape Key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (DOM.detailModal.classList.contains('active')) closeDetailModal();
      if (DOM.postModal.classList.contains('active')) closePostModal();
    }
  });

  // Real-time Search Input
  DOM.searchInput.addEventListener('input', (e) => {
    AppState.filters.keyword = e.target.value.trim();
    if (AppState.filters.keyword) {
      DOM.clearSearchBtn.classList.remove('hidden');
    } else {
      DOM.clearSearchBtn.classList.add('hidden');
    }
    renderCatalog();
  });

  DOM.clearSearchBtn.addEventListener('click', () => {
    DOM.searchInput.value = '';
    AppState.filters.keyword = '';
    DOM.clearSearchBtn.classList.add('hidden');
    renderCatalog();
  });

  // Filter Kota (Update dropdown kecamatan secara dinamis)
  DOM.filterCity.addEventListener('change', (e) => {
    AppState.filters.city = e.target.value;
    AppState.filters.district = '';
    updateDistrictFilterDropdown(AppState.filters.city);
    renderCatalog();
  });

  // Filter Kecamatan
  DOM.filterDistrict.addEventListener('change', (e) => {
    AppState.filters.district = e.target.value;
    renderCatalog();
  });

  // Filter Kategori
  DOM.filterCategory.addEventListener('change', (e) => {
    AppState.filters.category = e.target.value;
    renderCatalog();
  });

  // Filter Urutkan (Sorting)
  DOM.filterSort.addEventListener('change', (e) => {
    AppState.filters.sortBy = e.target.value;
    renderCatalog();
  });

  // Filter Checkbox Butuh Cepat / Nego
  DOM.filterUrgent.addEventListener('change', (e) => {
    AppState.filters.urgentOnly = e.target.checked;
    renderCatalog();
  });

  // Reset Filters
  function resetAllFilters() {
    DOM.searchInput.value = '';
    DOM.clearSearchBtn.classList.add('hidden');
    DOM.filterCity.value = '';
    DOM.filterDistrict.value = '';
    DOM.filterCategory.value = '';
    DOM.filterSort.value = 'newest';
    DOM.filterUrgent.checked = false;

    AppState.filters = {
      keyword: '',
      city: '',
      district: '',
      category: '',
      urgentOnly: false,
      sortBy: 'newest'
    };

    updateDistrictFilterDropdown('');
    renderCatalog();
    showToast('Semua filter pencarian direset.', 'info');
  }

  DOM.resetFilterBtn.addEventListener('click', resetAllFilters);
  DOM.emptyResetFilterBtn?.addEventListener('click', resetAllFilters);

  // Filter Status di Seller View
  DOM.sellerStatusFilter?.addEventListener('change', (e) => {
    AppState.sellerStatusFilter = e.target.value;
    renderSellerView();
  });

  // Form Price Live Preview Format
  DOM.formPrice.addEventListener('input', (e) => {
    const val = Number(e.target.value);
    DOM.priceFormattedHint.textContent = formatRupiah(val);
  });

  // Form City Change (Update suggestions datalist kecamatan)
  DOM.formCity.addEventListener('change', (e) => {
    updateFormDistrictSuggestions(e.target.value);
  });

  // Preset Gambar Cepat
  DOM.presetImagesContainer?.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-preset]');
    if (!btn) return;
    const presetKey = btn.dataset.preset;
    if (IMAGE_PRESETS[presetKey]) {
      DOM.formImageUrl.value = IMAGE_PRESETS[presetKey];
      showToast(`Gambar preset "${presetKey}" dipilih.`, 'info');
    }
  });

  // Reset Data Demo Button di Footer
  DOM.resetDemoDataBtn.addEventListener('click', () => {
    if (confirm('Kembalikan semua data ke 6 data demo awal? Semua iklan kustom akan direset.')) {
      StorageController.resetToDemo();
      resetAllFilters();
      if (AppState.currentView === 'catalog') {
        renderCatalog();
      } else {
        renderSellerView();
      }
      showToast('Data demo berhasil direset ke kondisi awal.', 'success');
    }
  });
}


// ========================================================
// 7. APP BOOTSTRAPPER
// ========================================================

document.addEventListener('DOMContentLoaded', () => {
  // Pastikan data demo terinisialisasi di localStorage
  StorageController.getAds();

  // Inisialisasi Event Listeners
  initEventListeners();

  // Inisialisasi dropdown kecamatan
  updateDistrictFilterDropdown('');

  // Render Tampilan Awal
  renderCatalog();
});

// Expose fungsi ke window untuk inline onclick di card & aksi
window.openDetailModal = openDetailModal;
window.handleToggleSold = handleToggleSold;
window.handleExtendExpiry = handleExtendExpiry;
window.handleDeleteAd = handleDeleteAd;

