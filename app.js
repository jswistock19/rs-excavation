/* ═══════════════════════════════════════
   RS EXCAVATION — App JavaScript
   ═══════════════════════════════════════ */

(function() {
  'use strict';

  // ── DATA ──────────────────────────────

  const SERVICES = [
    {
      id: 'septic',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a4 4 0 0 0-8 0v2"/><line x1="12" y1="12" x2="12" y2="16"/></svg>`,
      title: 'Septic Installation & Repair',
      desc: 'Licensed septic system installation, repair, and maintenance. We handle everything from permits to final inspection.',
      benefits: ['Licensed Kentucky septic installer', 'New installations & repairs', 'Tank replacements', 'Drain field work', 'Permit assistance']
    },
    {
      id: 'excavation',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20h20"/><path d="M5 20V8l5-4 5 4v12"/><path d="M10 12h4"/><path d="M10 16h4"/></svg>`,
      title: 'Excavation & Track Hoe Work',
      desc: 'Precision excavation with our Kubota KX060 mini excavator. Perfect for tight spaces and large jobs alike.',
      benefits: ['Kubota KX060 mini excavator', 'Foundations & basements', 'Utility trenching', 'Pool excavation', 'Precision grading']
    },
    {
      id: 'skid-steer',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="6" width="22" height="12" rx="2"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/><path d="M6 6V4"/><path d="M18 6V4"/></svg>`,
      title: 'Skid Steer Work',
      desc: 'Versatile skid steer services for grading, material handling, and site prep.',
      benefits: ['Grading & leveling', 'Material spreading', 'Backfilling', 'Snow removal', 'Multiple attachments available']
    },
    {
      id: 'land-clearing',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22c4-4 8-7 8-12A8 8 0 0 0 4 10c0 5 4 8 8 12z"/><circle cx="12" cy="10" r="3"/></svg>`,
      title: 'Land Clearing',
      desc: 'Clear your property for building, farming, or development. We handle trees, brush, stumps, and debris.',
      benefits: ['Tree & brush removal', 'Stump clearing', 'Lot preparation', 'Building site prep', 'Debris hauling']
    },
    {
      id: 'driveway',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>`,
      title: 'Driveway Construction & Grading',
      desc: 'New driveways, grading, and resurfacing. We build driveways that last through Kentucky weather.',
      benefits: ['New driveway construction', 'Gravel driveways', 'Regrading & resurfacing', 'Proper drainage slope', 'Culvert installation']
    },
    {
      id: 'storm-shelter',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
      title: 'Storm Shelters',
      desc: 'Underground storm shelter installation to keep your family safe during severe weather.',
      benefits: ['Underground shelter installation', 'Excavation & backfill', 'Proper drainage around shelter', 'Multiple shelter sizes', 'Peace of mind for your family']
    },
    {
      id: 'drainage',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>`,
      title: 'Curtain Drains & Drainage Tiles',
      desc: 'Solve water problems on your property with professional drainage solutions.',
      benefits: ['French drain installation', 'Curtain drain systems', 'Drainage tile installation', 'Yard drainage solutions', 'Water diversion']
    },
    {
      id: 'footers',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>`,
      title: 'Footers for Foundations',
      desc: 'Precise footer excavation for new construction. Level, properly graded, and ready for concrete.',
      benefits: ['Precise depth control', 'Level & squared footers', 'Ready for concrete pour', 'Residential & commercial', 'Code compliant']
    },
    {
      id: 'cleanup',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>`,
      title: 'Debris Cleanup',
      desc: 'Storm damage, construction debris, or property cleanup — we handle it all.',
      benefits: ['Storm damage cleanup', 'Construction debris removal', 'Property cleanout', 'Brush pile removal', 'Quick response times']
    },
    {
      id: 'snow',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="2" x2="12" y2="22"/><path d="M20.5 7.5L12 12 3.5 7.5"/><path d="M20.5 16.5L12 12 3.5 16.5"/></svg>`,
      title: 'Snow Removal',
      desc: 'Keep your property accessible during winter. Commercial and residential snow removal.',
      benefits: ['Driveways & parking lots', 'Commercial properties', 'Quick response', 'Skid steer & truck plowing', 'Salt & sand spreading']
    },
    {
      id: 'frozen-pipe',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0z"/></svg>`,
      title: 'Frozen Pipe Solutions',
      desc: 'Emergency excavation to access and repair frozen water lines before they burst.',
      benefits: ['Emergency service available', 'Water line excavation', 'Pipe access & repair', 'Proper backfill', 'Preventive solutions']
    },
    {
      id: 'estimates',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>`,
      title: 'FREE Estimates',
      desc: 'Every project starts with a free, no-obligation estimate. Call us or fill out our online form.',
      benefits: ['No-obligation quotes', 'On-site assessment', 'Transparent pricing', 'Quick turnaround', 'Call 270-543-8059']
    }
  ];

  const GALLERY_ITEMS = [
    { src: './assets/gallery-septic.jpg', label: 'Septic Tank Installation', category: 'septic' },
    { src: './assets/gallery-trench.jpg', label: 'Utility Trench Excavation', category: 'excavation' },
    { src: './assets/gallery-driveway.jpg', label: 'Driveway Before & After', category: 'driveways' },
    { src: './assets/gallery-clearing.jpg', label: 'Lot Clearing Project', category: 'clearing' },
    { src: './assets/gallery-drainage.jpg', label: 'Drainage Pipe Installation', category: 'excavation' },
    { src: './assets/gallery-equipment.jpg', label: 'Kubota KX060 on Trailer', category: 'equipment' }
  ];

  const GALLERY_FILTERS = ['All', 'Septic', 'Excavation', 'Driveways', 'Clearing', 'Equipment'];

  const MERCH_ITEMS = [
    { name: 'RS Excavation T-Shirt (Black)', price: 24.99, color: '#1a1a1a', accent: '#FF6B00' },
    { name: 'RS Excavation Hoodie (Orange)', price: 44.99, color: '#FF6B00', accent: '#1a1a1a' },
    { name: 'RS Excavation Trucker Hat', price: 19.99, color: '#2a2a2a', accent: '#FF6B00' },
    { name: 'RS Excavation Koozie', price: 9.99, color: '#333', accent: '#FF6B00' },
    { name: 'RS Excavation Sticker Pack', price: 7.99, color: '#FF6B00', accent: '#fff' },
    { name: 'RS Excavation Tumbler', price: 29.99, color: '#1a1a1a', accent: '#FF6B00' }
  ];

  const FAQ_DATA = [
    {
      q: 'What areas do you serve?',
      a: 'We primarily serve Muhlenberg County, Kentucky, including South Carrollton, Greenville, Central City, Drakesboro, and Bremen. We also serve neighboring counties including Ohio, McLean, Hopkins, Butler, and Todd counties. Give us a call to discuss your project location.'
    },
    {
      q: 'How much does septic installation cost?',
      a: 'Septic installation costs vary based on system size, soil conditions, property layout, and local permit requirements. Most residential septic systems in our area range from $3,000 to $8,000+. We provide free on-site estimates so you know exactly what to expect before any work begins.'
    },
    {
      q: 'Are you licensed and insured?',
      a: 'Yes! RS Excavation is fully licensed and insured. Robbie Smith is a licensed septic installer in the state of Kentucky. We carry liability insurance to protect both our crew and your property.'
    },
    {
      q: 'How do I get a free estimate?',
      a: 'Getting an estimate is easy! You can call us directly at 270-543-8059, fill out our online quote form, or message us on Facebook. We\'ll schedule a time to visit your property, assess the project, and provide a written estimate — all at no cost.'
    },
    {
      q: 'What equipment do you use?',
      a: 'Our primary machine is a Kubota KX060 mini excavator — a versatile and powerful machine perfect for both tight residential spaces and larger commercial jobs. We also operate a skid steer with multiple attachments, and a Chevrolet truck with equipment trailer for hauling.'
    },
    {
      q: 'Do you offer emergency services?',
      a: 'Yes, we offer emergency excavation services for situations like burst water lines, frozen pipes, and storm damage cleanup. Call us at 270-543-8059 and we\'ll do our best to respond as quickly as possible.'
    },
    {
      q: 'How long does a typical excavation project take?',
      a: 'Project timelines vary based on scope. A driveway grading might take a day, while a full septic installation could take 2-3 days. Land clearing depends on acreage and density. During your free estimate, we\'ll give you a realistic timeline for your specific project.'
    },
    {
      q: 'What should I do before you arrive to start work?',
      a: 'Mark any known utility lines, clear a path for equipment access, and let your neighbors know about the work. We\'ll contact KY 811 (Call Before You Dig) as part of our process to locate underground utilities. Beyond that, we handle everything.'
    },
    {
      q: 'Do you handle permits?',
      a: 'For septic installations, permits are required through the local health department. We can help guide you through the permitting process and coordinate with inspectors to make sure everything is done to code.'
    },
    {
      q: 'How long has RS Excavation been in business?',
      a: 'RS Excavation was founded in October 2022 by Robbie Smith. While the business is relatively new, Robbie brings years of heavy equipment operation experience and deep roots in Muhlenberg County. We\'ve completed over 100 jobs and counting.'
    }
  ];

  // ── CART STATE ──────────────────────────────
  let cart = [];

  // ── THEME TOGGLE ──────────────────────────────
  (function initTheme() {
    const toggle = document.querySelector('[data-theme-toggle]');
    const root = document.documentElement;
    // Default to dark mode
    let theme = 'dark';
    root.setAttribute('data-theme', theme);

    if (toggle) {
      updateThemeIcon(toggle, theme);
      toggle.addEventListener('click', () => {
        theme = theme === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-theme', theme);
        updateThemeIcon(toggle, theme);
      });
    }
  })();

  function updateThemeIcon(toggle, theme) {
    toggle.setAttribute('aria-label', 'Switch to ' + (theme === 'dark' ? 'light' : 'dark') + ' mode');
    toggle.innerHTML = theme === 'dark'
      ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
      : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }

  // ── HASH ROUTING ──────────────────────────────
  const sections = ['home', 'services', 'gallery', 'about', 'quote', 'payment', 'store', 'faq', 'contact'];

  function navigateTo(hash) {
    const target = hash.replace('#', '') || 'home';
    
    // Show all sections but highlight the target
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.classList.add('active');
      }
    });

    // Scroll to target section
    const targetEl = document.getElementById(target);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }

    // Update active nav
    document.querySelectorAll('[data-nav]').forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + target);
    });

    // Close mobile nav
    document.getElementById('mobile-nav').classList.remove('open');
  }

  // Show all sections on load
  function showAllSections() {
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.add('active');
    });
  }

  // Nav click handlers
  document.querySelectorAll('[data-nav]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const hash = link.getAttribute('href');
      history.pushState(null, '', hash);
      navigateTo(hash);
    });
  });

  document.querySelectorAll('[data-mobile-nav]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const hash = link.getAttribute('href');
      history.pushState(null, '', hash);
      navigateTo(hash);
    });
  });

  document.querySelectorAll('[data-nav-btn]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const hash = link.getAttribute('href');
      history.pushState(null, '', hash);
      navigateTo(hash);
    });
  });

  window.addEventListener('popstate', () => {
    navigateTo(location.hash);
  });

  // ── MOBILE NAV ──────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');

  hamburger.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    hamburger.innerHTML = isOpen
      ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'
      : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
  });

  // ── HEADER SCROLL BEHAVIOR ──────────────────────────────
  let lastScroll = 0;
  const header = document.getElementById('site-header');

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    header.classList.toggle('site-header--scrolled', currentScroll > 50);

    // Update active nav based on scroll position
    updateActiveNavOnScroll();

    lastScroll = currentScroll;
  }, { passive: true });

  function updateActiveNavOnScroll() {
    const scrollPos = window.scrollY + 100;
    let activeSection = 'home';
    
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el && el.offsetTop <= scrollPos) {
        activeSection = id;
      }
    });

    document.querySelectorAll('[data-nav]').forEach(link => {
      const href = link.getAttribute('href').replace('#', '');
      link.classList.toggle('active', href === activeSection);
    });
  }

  // ── SERVICES GRID ──────────────────────────────
  function renderServices() {
    const grid = document.getElementById('services-grid');
    if (!grid) return;

    grid.innerHTML = SERVICES.map((s, i) => `
      <div class="service-card reveal reveal-delay-${(i % 3) + 1}" data-service="${s.id}">
        <div class="service-icon">${s.icon}</div>
        <h3>${s.title}</h3>
        <p>${s.desc}</p>
        <div class="service-details">
          <ul class="service-benefits">
            ${s.benefits.map(b => `<li>${b}</li>`).join('')}
          </ul>
        </div>
        <div class="service-expand">
          <span>Learn more</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
      </div>
    `).join('');

    // Expand/collapse click handler
    grid.addEventListener('click', (e) => {
      const card = e.target.closest('.service-card');
      if (card) {
        card.classList.toggle('expanded');
      }
    });
  }

  // ── GALLERY ──────────────────────────────
  let activeFilter = 'all';

  function renderGalleryFilters() {
    const container = document.getElementById('gallery-filters');
    if (!container) return;

    container.innerHTML = GALLERY_FILTERS.map(f => {
      const val = f.toLowerCase();
      return `<button class="filter-btn${val === 'all' ? ' active' : ''}" data-filter="${val}">${f}</button>`;
    }).join('');

    container.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;
      activeFilter = btn.dataset.filter;
      container.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderGalleryGrid();
    });
  }

  function renderGalleryGrid() {
    const grid = document.getElementById('gallery-grid');
    if (!grid) return;

    const filtered = activeFilter === 'all'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter(item => item.category === activeFilter);

    grid.innerHTML = filtered.map((item, i) => `
      <div class="gallery-item reveal reveal-delay-${(i % 3) + 1}" data-gallery-idx="${GALLERY_ITEMS.indexOf(item)}">
        <img src="${item.src}" alt="${item.label}" loading="lazy">
        <div class="gallery-item-overlay">
          <span class="gallery-item-label">${item.label}</span>
        </div>
      </div>
    `).join('');

    // Reobserve for animations
    observeReveals();

    // Click handler for lightbox
    grid.querySelectorAll('.gallery-item').forEach(item => {
      item.addEventListener('click', () => {
        const idx = parseInt(item.dataset.galleryIdx);
        openLightbox(idx);
      });
    });
  }

  // ── LIGHTBOX ──────────────────────────────
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');

  function openLightbox(idx) {
    const item = GALLERY_ITEMS[idx];
    if (!item) return;
    lightboxImg.src = item.src;
    lightboxImg.alt = item.label;
    lightboxCaption.textContent = item.label;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  // ── MERCH STORE ──────────────────────────────
  function renderMerch() {
    const grid = document.getElementById('merch-grid');
    if (!grid) return;

    grid.innerHTML = MERCH_ITEMS.map((item, i) => `
      <div class="merch-item reveal reveal-delay-${(i % 3) + 1}">
        <div class="merch-image" style="background:${item.color};">
          <div style="color:${item.accent};font-size:var(--text-lg);">
            RS<br>EXCAVATION
          </div>
        </div>
        <div class="merch-info">
          <h3>${item.name}</h3>
          <div class="merch-price">$${item.price.toFixed(2)}</div>
          <button class="btn-add-cart" data-merch-idx="${i}">Add to Cart</button>
        </div>
      </div>
    `).join('');

    grid.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn-add-cart');
      if (!btn) return;
      const idx = parseInt(btn.dataset.merchIdx);
      addToCart(idx);
      btn.textContent = 'Added!';
      setTimeout(() => { btn.textContent = 'Add to Cart'; }, 1500);
    });
  }

  // ── CART ──────────────────────────────
  function addToCart(merchIdx) {
    const item = MERCH_ITEMS[merchIdx];
    const existing = cart.find(c => c.idx === merchIdx);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ idx: merchIdx, qty: 1, name: item.name, price: item.price, color: item.color });
    }
    updateCartUI();
  }

  function removeFromCart(merchIdx) {
    cart = cart.filter(c => c.idx !== merchIdx);
    updateCartUI();
  }

  function updateCartQty(merchIdx, delta) {
    const item = cart.find(c => c.idx === merchIdx);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
      removeFromCart(merchIdx);
      return;
    }
    updateCartUI();
  }

  function updateCartUI() {
    const badge = document.getElementById('cart-badge');
    const cartItems = document.getElementById('cart-items');
    const cartEmpty = document.getElementById('cart-empty');
    const cartFooter = document.getElementById('cart-footer');
    const cartTotal = document.getElementById('cart-total-price');

    const totalItems = cart.reduce((sum, c) => sum + c.qty, 0);
    const totalPrice = cart.reduce((sum, c) => sum + (c.price * c.qty), 0);

    badge.textContent = totalItems;
    badge.classList.toggle('show', totalItems > 0);

    if (cart.length === 0) {
      cartEmpty.style.display = 'block';
      cartFooter.style.display = 'none';
      cartItems.innerHTML = '<div class="cart-empty"><p>Your cart is empty</p></div>';
    } else {
      cartFooter.style.display = 'block';
      cartTotal.textContent = '$' + totalPrice.toFixed(2);
      cartItems.innerHTML = cart.map(c => `
        <div class="cart-item">
          <div class="cart-item-color" style="background:${c.color};"></div>
          <div class="cart-item-info">
            <h4>${c.name}</h4>
            <span class="price">$${(c.price * c.qty).toFixed(2)}</span>
          </div>
          <div class="cart-item-qty">
            <button data-cart-qty="${c.idx}" data-delta="-1">−</button>
            <span>${c.qty}</span>
            <button data-cart-qty="${c.idx}" data-delta="1">+</button>
          </div>
        </div>
      `).join('');

      // Qty buttons
      cartItems.querySelectorAll('[data-cart-qty]').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.dataset.cartQty);
          const delta = parseInt(btn.dataset.delta);
          updateCartQty(idx, delta);
        });
      });
    }
  }

  // Cart toggle
  const cartToggle = document.getElementById('cart-toggle');
  const cartDrawer = document.getElementById('cart-drawer');
  const cartOverlay = document.getElementById('cart-overlay');
  const cartClose = document.getElementById('cart-close');

  function openCart() {
    cartDrawer.classList.add('open');
    cartOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    cartDrawer.classList.remove('open');
    cartOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  cartToggle.addEventListener('click', openCart);
  cartClose.addEventListener('click', closeCart);
  cartOverlay.addEventListener('click', closeCart);

  // Checkout button
  document.getElementById('checkout-btn').addEventListener('click', () => {
    closeCart();
    showModal('Merch Store Coming Soon!', 'Our merchandise store is under construction. Check back soon for RS Excavation gear! In the meantime, follow us on Facebook for updates.');
  });

  // ── FAQ ACCORDION ──────────────────────────────
  function renderFAQ() {
    const list = document.getElementById('faq-list');
    if (!list) return;

    list.innerHTML = FAQ_DATA.map((item, i) => `
      <div class="faq-item reveal reveal-delay-${(i % 3) + 1}">
        <button class="faq-question" aria-expanded="false">
          <span>${item.q}</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">${item.a}</div>
        </div>
      </div>
    `).join('');

    list.addEventListener('click', (e) => {
      const btn = e.target.closest('.faq-question');
      if (!btn) return;
      const faqItem = btn.closest('.faq-item');
      const answer = faqItem.querySelector('.faq-answer');
      const isOpen = faqItem.classList.toggle('open');
      btn.setAttribute('aria-expanded', isOpen);
      
      if (isOpen) {
        answer.style.maxHeight = answer.scrollHeight + 'px';
      } else {
        answer.style.maxHeight = '0';
      }
    });
  }

  // ── QUOTE FORM ──────────────────────────────
  const quoteForm = document.getElementById('quote-form');
  const formSuccess = document.getElementById('form-success');

  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      quoteForm.style.display = 'none';
      formSuccess.style.display = 'block';
    });
  }

  // ── PAY INVOICE BUTTON ──────────────────────────────
  document.getElementById('pay-btn').addEventListener('click', () => {
    showModal('Online Payments Coming Soon', 'Our online payment system is being set up. For now, please call <strong>270-543-8059</strong> to pay by phone. We accept all major credit cards.');
  });

  // ── MODAL ──────────────────────────────
  const modalOverlay = document.getElementById('modal-overlay');
  const modalTitle = document.getElementById('modal-title');
  const modalMessage = document.getElementById('modal-message');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  function showModal(title, message) {
    modalTitle.textContent = title;
    modalMessage.innerHTML = message;
    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  modalCloseBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  // ── COUNTER ANIMATION ──────────────────────────────
  function animateCounters() {
    document.querySelectorAll('[data-count]').forEach(el => {
      const target = parseInt(el.dataset.count);
      const suffix = target === 3 ? '+' : target === 100 ? '+' : '';
      const duration = 2000;
      const start = performance.now();

      function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease out cubic
        const current = Math.round(eased * target);
        el.textContent = current + suffix;

        if (progress < 1) {
          requestAnimationFrame(update);
        }
      }

      requestAnimationFrame(update);
    });
  }

  // ── SCROLL REVEAL ──────────────────────────────
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  function observeReveals() {
    document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
      revealObserver.observe(el);
    });
  }

  // ── INIT ──────────────────────────────
  function init() {
    showAllSections();
    renderServices();
    renderGalleryFilters();
    renderGalleryGrid();
    renderMerch();
    renderFAQ();
    updateCartUI();
    observeReveals();

    // Trigger counter animation after a small delay
    setTimeout(animateCounters, 500);

    // Handle initial hash
    if (location.hash) {
      setTimeout(() => navigateTo(location.hash), 100);
    }
  }

  // Start
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
