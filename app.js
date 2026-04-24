/* app.js — PBS Kidsteer Interactivity */

(function () {
  'use strict';

  /* ============================================
     DARK/LIGHT MODE TOGGLE
     ============================================ */
  const themeToggle = document.querySelector('[data-theme-toggle]');
  const root = document.documentElement;
  // Default to dark
  let currentTheme = 'dark';
  root.setAttribute('data-theme', currentTheme);

  function updateToggleIcon() {
    if (!themeToggle) return;
    themeToggle.setAttribute('aria-label', 'Switch to ' + (currentTheme === 'dark' ? 'light' : 'dark') + ' mode');
    themeToggle.innerHTML = currentTheme === 'dark'
      ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
      : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }

  if (themeToggle) {
    updateToggleIcon();
    themeToggle.addEventListener('click', function () {
      currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', currentTheme);
      updateToggleIcon();
    });
  }

  /* ============================================
     STICKY HEADER
     ============================================ */
  const header = document.getElementById('header');
  let lastScroll = 0;

  window.addEventListener('scroll', function () {
    const scroll = window.scrollY;
    if (scroll > 50) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
    lastScroll = scroll;
  }, { passive: true });

  /* ============================================
     HAMBURGER MENU
     ============================================ */
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');

  hamburger.addEventListener('click', function () {
    const isOpen = hamburger.classList.toggle('active');
    mobileNav.classList.toggle('active', isOpen);
    mobileNav.setAttribute('aria-hidden', !isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close mobile nav on link click
  mobileNav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      hamburger.classList.remove('active');
      mobileNav.classList.remove('active');
      mobileNav.setAttribute('aria-hidden', 'true');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  /* ============================================
     ACTIVE NAV ON SCROLL
     ============================================ */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveNav() {
    const scrollPos = window.scrollY + 150;
    sections.forEach(function (section) {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });

  /* ============================================
     PARALLAX HERO BACKGROUND
     ============================================ */
  const heroBg = document.querySelector('.hero__bg');
  if (heroBg) {
    window.addEventListener('scroll', function () {
      const scroll = window.scrollY;
      if (scroll < window.innerHeight * 1.5) {
        heroBg.style.transform = 'translateY(' + (scroll * 0.3) + 'px) scale(1.1)';
      }
    }, { passive: true });
    heroBg.style.transform = 'scale(1.1)';
  }

  /* ============================================
     COUNTER ANIMATION
     ============================================ */
  const counters = document.querySelectorAll('[data-count]');
  let countersAnimated = false;

  function animateCounters() {
    if (countersAnimated) return;
    counters.forEach(function (counter) {
      const target = parseInt(counter.getAttribute('data-count'), 10);
      const duration = 1500;
      const startTime = performance.now();

      function step(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // ease-out cubic
        const ease = 1 - Math.pow(1 - progress, 3);
        counter.textContent = Math.floor(ease * target);
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          counter.textContent = target;
        }
      }

      requestAnimationFrame(step);
    });
    countersAnimated = true;
  }

  // Trigger counters when hero stats come into view
  const statsEl = document.querySelector('.hero__stats');
  if (statsEl) {
    const statsObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounters();
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    statsObserver.observe(statsEl);
  }

  /* ============================================
     SCROLL REVEAL
     ============================================ */
  const revealItems = document.querySelectorAll('.reveal-item');
  const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealItems.forEach(function (item) {
    revealObserver.observe(item);
  });

  /* ============================================
     SERVICE CARD EXPAND
     ============================================ */
  document.querySelectorAll('.service-card__toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const card = this.closest('.service-card');
      const details = card.querySelector('.service-card__details');
      const isOpen = details.classList.toggle('open');
      this.setAttribute('aria-expanded', isOpen);
      this.querySelector('span').textContent = isOpen ? 'Show Less' : 'Learn More';
    });
  });

  /* ============================================
     GALLERY FILTER
     ============================================ */
  const filterBtns = document.querySelectorAll('.gallery__filter');
  const galleryItems = document.querySelectorAll('.gallery__item');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');
      const filter = this.getAttribute('data-filter');

      galleryItems.forEach(function (item) {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  /* ============================================
     LIGHTBOX
     ============================================ */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = lightbox.querySelector('.lightbox__close');
  const lightboxPrev = lightbox.querySelector('.lightbox__prev');
  const lightboxNext = lightbox.querySelector('.lightbox__next');
  let currentGalleryImages = [];
  let currentImageIndex = 0;

  function openLightbox(index) {
    currentGalleryImages = Array.from(document.querySelectorAll('.gallery__item:not(.hidden) img'));
    currentImageIndex = index;
    lightboxImg.src = currentGalleryImages[currentImageIndex].src;
    lightboxImg.alt = currentGalleryImages[currentImageIndex].alt;
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function navigateLightbox(dir) {
    currentImageIndex = (currentImageIndex + dir + currentGalleryImages.length) % currentGalleryImages.length;
    lightboxImg.src = currentGalleryImages[currentImageIndex].src;
    lightboxImg.alt = currentGalleryImages[currentImageIndex].alt;
  }

  // Attach gallery item click handlers
  galleryItems.forEach(function (item, index) {
    item.addEventListener('click', function () {
      const visibleItems = Array.from(document.querySelectorAll('.gallery__item:not(.hidden)'));
      const visibleIndex = visibleItems.indexOf(item);
      openLightbox(visibleIndex);
    });
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightboxPrev.addEventListener('click', function () { navigateLightbox(-1); });
  lightboxNext.addEventListener('click', function () { navigateLightbox(1); });

  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
  });

  /* ============================================
     CART
     ============================================ */
  let cart = [];

  const cartToggle = document.querySelector('.cart-toggle');
  const cartOverlay = document.getElementById('cartOverlay');
  const cartDrawer = document.getElementById('cartDrawer');
  const cartCloseBtn = document.querySelector('.cart-drawer__close');
  const cartItemsContainer = document.getElementById('cartItems');
  const cartTotalEl = document.getElementById('cartTotal');
  const cartBadge = document.querySelector('.cart-badge');

  function openCart() {
    cartOverlay.classList.add('active');
    cartDrawer.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    cartOverlay.classList.remove('active');
    cartDrawer.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (cartToggle) cartToggle.addEventListener('click', openCart);
  if (cartOverlay) cartOverlay.addEventListener('click', closeCart);
  if (cartCloseBtn) cartCloseBtn.addEventListener('click', closeCart);

  function updateCart() {
    if (!cartItemsContainer) return;
    const total = cart.reduce(function (sum, item) { return sum + item.price * item.qty; }, 0);
    const itemCount = cart.reduce(function (sum, item) { return sum + item.qty; }, 0);

    if (cartBadge) {
      cartBadge.textContent = itemCount;
      cartBadge.classList.toggle('visible', itemCount > 0);
    }

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<p class="cart-empty">Your cart is empty</p>';
    } else {
      cartItemsContainer.innerHTML = cart.map(function (item) {
        return '<div class="cart-item" data-id="' + item.id + '">' +
          '<div class="cart-item__info">' +
            '<div class="cart-item__name">' + item.name + '</div>' +
            '<div class="cart-item__price">$' + item.price.toFixed(2) + ' each</div>' +
          '</div>' +
          '<div class="cart-item__controls">' +
            '<button onclick="window.decreaseQty(\'' + item.id + '\')" aria-label="Decrease">-</button>' +
            '<span class="cart-item__qty">' + item.qty + '</span>' +
            '<button onclick="window.increaseQty(\'' + item.id + '\')" aria-label="Increase">+</button>' +
          '</div>' +
        '</div>';
      }).join('');
    }

    if (cartTotalEl) cartTotalEl.textContent = '$' + total.toFixed(2);
  }

  window.addToCart = function (id, name, price) {
    const existing = cart.find(function (i) { return i.id === id; });
    if (existing) {
      existing.qty++;
    } else {
      cart.push({ id: id, name: name, price: price, qty: 1 });
    }
    updateCart();
    openCart();
  };

  window.increaseQty = function (id) {
    const item = cart.find(function (i) { return i.id === id; });
    if (item) { item.qty++; updateCart(); }
  };

  window.decreaseQty = function (id) {
    const idx = cart.findIndex(function (i) { return i.id === id; });
    if (idx > -1) {
      if (cart[idx].qty > 1) {
        cart[idx].qty--;
      } else {
        cart.splice(idx, 1);
      }
      updateCart();
    }
  };

  const checkoutBtn = document.getElementById('checkoutBtn');
  const checkoutModal = document.getElementById('checkoutModal');
  const modalClose = document.querySelector('.modal__close');
  const modalOverlay = document.getElementById('checkoutModal');

  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', function () {
      if (cart.length === 0) return;
      closeCart();
      checkoutModal.classList.add('active');
    });
  }

  if (modalClose) {
    modalClose.addEventListener('click', function () {
      checkoutModal.classList.remove('active');
    });
  }

  if (checkoutModal) {
    checkoutModal.addEventListener('click', function (e) {
      if (e.target === checkoutModal) checkoutModal.classList.remove('active');
    });
  }

  /* ============================================
     QUOTE FORM
     ============================================ */
  const quoteForm = document.getElementById('quoteForm');
  const quoteSuccess = document.getElementById('quoteSuccess');

  if (quoteForm) {
    quoteForm.addEventListener('submit', function (e) {
      e.preventDefault();
      quoteForm.style.display = 'none';
      if (quoteSuccess) quoteSuccess.style.display = 'block';
    });
  }

  /* ============================================
     FAQ ACCORDION
     ============================================ */
  document.querySelectorAll('.faq__question').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const item = this.closest('.faq__item');
      const answer = item.querySelector('.faq__answer');
      const isOpen = answer.style.maxHeight && answer.style.maxHeight !== '0px';

      // Close all
      document.querySelectorAll('.faq__answer').forEach(function (a) {
        a.style.maxHeight = '0px';
      });
      document.querySelectorAll('.faq__question').forEach(function (q) {
        q.setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        answer.style.maxHeight = answer.scrollHeight + 'px';
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

}());
