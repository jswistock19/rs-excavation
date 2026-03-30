/* app.js — RS Excavation Interactivity */

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
    // Get visible items
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

  galleryItems.forEach(function (item) {
    item.addEventListener('click', function () {
      const visibleItems = Array.from(document.querySelectorAll('.gallery__item:not(.hidden)'));
      const index = visibleItems.indexOf(this);
      openLightbox(index);
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
     QUOTE FORM
     ============================================ */
  const quoteForm = document.getElementById('quoteForm');
  const quoteSuccess = document.getElementById('quoteSuccess');

  if (quoteForm) {
    quoteForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Basic validation
      const fullName = document.getElementById('fullName');
      const phone = document.getElementById('phone');
      const service = document.getElementById('service');

      let valid = true;

      [fullName, phone, service].forEach(function (field) {
        if (!field.value.trim()) {
          field.style.borderColor = 'var(--color-error)';
          valid = false;
        } else {
          field.style.borderColor = '';
        }
      });

      if (!valid) return;

      // Simulate submission
      quoteForm.style.display = 'none';
      quoteSuccess.style.display = 'block';
    });
  }

  /* ============================================
     PAYMENT MODAL
     ============================================ */
  const payBtn = document.getElementById('payInvoiceBtn');
  const paymentModal = document.getElementById('paymentModal');
  const paymentModalClose = paymentModal ? paymentModal.querySelector('.modal__close') : null;

  if (payBtn && paymentModal) {
    payBtn.addEventListener('click', function () {
      paymentModal.classList.add('active');
    });
    paymentModalClose.addEventListener('click', function () {
      paymentModal.classList.remove('active');
    });
    paymentModal.addEventListener('click', function (e) {
      if (e.target === paymentModal) paymentModal.classList.remove('active');
    });
  }

  /* ============================================
     MERCH CART
     ============================================ */
  const cart = [];
  const cartToggle = document.getElementById('cartToggle');
  const cartDrawer = document.getElementById('cartDrawer');
  const cartOverlay = document.getElementById('cartOverlay');
  const cartClose = document.getElementById('cartClose');
  const cartBadge = document.getElementById('cartBadge');
  const cartItemsEl = document.getElementById('cartItems');
  const cartFooter = document.getElementById('cartFooter');
  const cartTotalEl = document.getElementById('cartTotal');

  function openCart() {
    cartDrawer.classList.add('active');
    cartOverlay.classList.add('active');
    cartDrawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    cartDrawer.classList.remove('active');
    cartOverlay.classList.remove('active');
    cartDrawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function updateCartUI() {
    const totalItems = cart.reduce(function (s, item) { return s + item.qty; }, 0);
    const totalPrice = cart.reduce(function (s, item) { return s + item.price * item.qty; }, 0);

    cartBadge.textContent = totalItems;
    cartBadge.classList.toggle('visible', totalItems > 0);

    if (cart.length === 0) {
      cartItemsEl.innerHTML = '<p class="cart-empty">Your cart is empty</p>';
      cartFooter.style.display = 'none';
    } else {
      cartItemsEl.innerHTML = cart.map(function (item, i) {
        return '<div class="cart-item">' +
          '<div class="cart-item__info">' +
            '<div class="cart-item__name">' + item.name + '</div>' +
            '<div class="cart-item__price">$' + item.price.toFixed(2) + '</div>' +
          '</div>' +
          '<div class="cart-item__controls">' +
            '<button onclick="window.__cartMinus(' + i + ')" aria-label="Decrease quantity">−</button>' +
            '<span class="cart-item__qty">' + item.qty + '</span>' +
            '<button onclick="window.__cartPlus(' + i + ')" aria-label="Increase quantity">+</button>' +
          '</div>' +
        '</div>';
      }).join('');
      cartFooter.style.display = 'block';
      cartTotalEl.textContent = '$' + totalPrice.toFixed(2);
    }
  }

  window.__cartPlus = function (index) {
    cart[index].qty++;
    updateCartUI();
  };

  window.__cartMinus = function (index) {
    cart[index].qty--;
    if (cart[index].qty <= 0) cart.splice(index, 1);
    updateCartUI();
  };

  document.querySelectorAll('.add-to-cart').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const name = this.getAttribute('data-name');
      const price = parseFloat(this.getAttribute('data-price'));
      const existing = cart.find(function (item) { return item.name === name; });
      if (existing) {
        existing.qty++;
      } else {
        cart.push({ name: name, price: price, qty: 1 });
      }
      updateCartUI();
      openCart();
    });
  });

  cartToggle.addEventListener('click', openCart);
  cartClose.addEventListener('click', closeCart);
  cartOverlay.addEventListener('click', closeCart);

  /* ============================================
     FAQ ACCORDION
     ============================================ */
  document.querySelectorAll('.faq__question').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const item = this.closest('.faq__item');
      const answer = item.querySelector('.faq__answer');
      const isOpen = this.getAttribute('aria-expanded') === 'true';

      // Close all others
      document.querySelectorAll('.faq__item').forEach(function (other) {
        if (other !== item) {
          other.querySelector('.faq__question').setAttribute('aria-expanded', 'false');
          other.querySelector('.faq__answer').style.maxHeight = null;
        }
      });

      this.setAttribute('aria-expanded', !isOpen);
      if (!isOpen) {
        answer.style.maxHeight = answer.scrollHeight + 'px';
      } else {
        answer.style.maxHeight = null;
      }
    });
  });

  /* ============================================
     SMOOTH SCROLL FOR NAV
     ============================================ */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

})();
