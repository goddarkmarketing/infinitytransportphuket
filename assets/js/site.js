const menuToggle = document.querySelector("[data-menu-toggle]");
const menu = document.querySelector("[data-menu]");

if (menuToggle && menu) {
  if (!menu.id) {
    menu.id = "site-nav-menu";
  }
  menuToggle.setAttribute("aria-controls", menu.id);

  const syncMenuOpen = () => {
    const open = menu.classList.contains("is-open");
    menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
    menuToggle.classList.toggle("is-open", open);
  };

  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("is-open");
    syncMenuOpen();
  });

  syncMenuOpen();
}

document.querySelectorAll("[data-back-to-top]").forEach((btn) => {
  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

document.querySelectorAll("[data-float-contact]").forEach((root) => {
  const toggle = root.querySelector(".float-contact__toggle");
  if (!toggle) return;

  const setOpen = (open) => {
    root.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  };

  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    setOpen(!root.classList.contains("is-open"));
  });

  root.querySelectorAll("a.float-contact__link").forEach((a) => {
    a.addEventListener("click", () => setOpen(false));
  });

  document.addEventListener("click", (e) => {
    if (root.classList.contains("is-open") && !root.contains(e.target)) {
      setOpen(false);
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && root.classList.contains("is-open")) {
      setOpen(false);
      toggle.focus();
    }
  });
});

const footerYear = document.querySelector("[data-footer-year]");
if (footerYear) {
  footerYear.textContent = String(new Date().getFullYear());
}

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -5% 0px", threshold: 0.01 },
  );

  revealElements.forEach((element) => {
    element.classList.add("is-visible");
    observer.observe(element);
  });
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

const carButtons = document.querySelectorAll("[data-car-option]");
const selectedCarText = document.querySelector("#selected-car-text");
const selectedCarBookLink = document.querySelector("#selected-car-book-link");
const bookingModal = document.querySelector("#booking-modal");
const bookingSelectedText = document.querySelector("#booking-selected-text");
const bookingLine = document.querySelector("#booking-line");
const bookingCall = document.querySelector("#booking-call");
const bookingWhatsApp = document.querySelector("#booking-whatsapp");
const bookingCloseTargets = document.querySelectorAll("[data-booking-close]");
const carouselPrev = document.querySelector("#carousel-prev");
const carouselNext = document.querySelector("#carousel-next");
const carouselDots = document.querySelector("#carousel-dots");
const carouselTargetButtons = document.querySelectorAll("[data-carousel-target]");
const miniBookButtons = document.querySelectorAll("[data-book-car]");
const filterChips = document.querySelectorAll("[data-car-filter]");
const searchInput = document.querySelector("[data-car-search-input]");
const searchBtn = document.querySelector("[data-car-search-btn]");
const emptyCarSidebar = document.querySelector("[data-car-empty]");
let currentIndex = 0;
let activeCarFilter = "all";
let carSearchQuery = "";

if (carButtons.length && selectedCarText && selectedCarBookLink) {
  const matchesCarFilter = (btn) => {
    const group = btn.getAttribute("data-car-group") || "";
    if (activeCarFilter === "all") return true;
    if (activeCarFilter === "suv") return group === "suv";
    if (activeCarFilter === "toyota") return group === "toyota";
    if (activeCarFilter === "mercedes") return group === "mercedes";
    return true;
  };

  const matchesCarSearch = (btn) => {
    if (!carSearchQuery) return true;
    const target = (btn.getAttribute("data-carousel-target") || "").toLowerCase();
    const label = (btn.querySelector(".car-side-btn-text")?.textContent || "").toLowerCase();
    return target.includes(carSearchQuery) || label.includes(carSearchQuery);
  };

  const applyCarSidebarFilter = () => {
    let visible = 0;
    carouselTargetButtons.forEach((btn) => {
      const ok = matchesCarFilter(btn) && matchesCarSearch(btn);
      if (ok) {
        btn.removeAttribute("hidden");
        visible += 1;
      } else {
        btn.setAttribute("hidden", "hidden");
      }
    });

    filterChips.forEach((chip) => {
      chip.classList.toggle("is-active", chip.getAttribute("data-car-filter") === activeCarFilter);
    });

    if (emptyCarSidebar) {
      emptyCarSidebar.toggleAttribute("hidden", visible !== 0);
    }

    const activeName = carButtons[currentIndex]?.getAttribute("data-car-name");
    const activeSidebar = Array.from(carouselTargetButtons).find(
      (b) => b.getAttribute("data-carousel-target") === activeName,
    );
    if (activeSidebar?.hasAttribute("hidden")) {
      const first = Array.from(carouselTargetButtons).find((b) => !b.hasAttribute("hidden"));
      if (first) {
        const target = first.getAttribute("data-carousel-target");
        const idx = Array.from(carButtons).findIndex((c) => c.getAttribute("data-car-name") === target);
        if (idx >= 0) currentIndex = idx;
      }
    }
  };
  const siteLang = () => (window.SITE_I18N?.getLang?.() === "en" ? "en" : "th");
  const bookingPrefix = () => window.SITE_I18N?.t?.("booking.you_chose") || "คุณเลือก:";
  const linePrefill = (name) => {
    const bit = window.SITE_I18N?.t?.("line.prefill") || "สนใจจองรถรุ่น";
    return `${bit} ${name}`;
  };

  const updateSelectedCar = (button) => {
    const carName = button.getAttribute("data-car-name") || "";
    const seatsAttr = siteLang() === "en" ? "data-car-seats-en" : "data-car-seats";
    const carSeats = button.getAttribute(seatsAttr) || button.getAttribute("data-car-seats") || "";
    const label = `${carName} (${carSeats})`;
    selectedCarText.textContent = label;
    if (bookingSelectedText) {
      bookingSelectedText.textContent = `${bookingPrefix()} ${label}`;
    }
    if (bookingLine) {
      bookingLine.setAttribute("href", `https://line.me/ti/p/HOu32mNzEG?text=${encodeURIComponent(linePrefill(carName))}`);
    }
    if (bookingCall) {
      bookingCall.setAttribute("href", "tel:+66626644542");
    }
    if (bookingWhatsApp) {
      const waText =
        siteLang() === "en"
          ? `Hello, I want to book ${carName}`
          : `สวัสดีครับ/ค่ะ สนใจจองรถ ${carName}`;
      bookingWhatsApp.setAttribute(
        "href",
        `https://wa.me/message/3KIDF2Y7ORDBI1?text=${encodeURIComponent(waText)}`,
      );
    }
  };

  const openBookingModal = () => {
    if (!bookingModal) return;
    bookingModal.classList.add("is-open");
    bookingModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const closeBookingModal = () => {
    if (!bookingModal) return;
    bookingModal.classList.remove("is-open");
    bookingModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  const mod = (value, max) => (value % max + max) % max;
  const leftIndex = () => mod(currentIndex - 1, carButtons.length);
  const rightIndex = () => mod(currentIndex + 1, carButtons.length);

  const renderCarousel = () => {
    carButtons.forEach((button, index) => {
      button.classList.remove("is-left", "is-center", "is-right", "is-selected");
      if (index === currentIndex) {
        button.classList.add("is-center", "is-selected");
      } else if (index === leftIndex()) {
        button.classList.add("is-left");
      } else if (index === rightIndex()) {
        button.classList.add("is-right");
      }
    });

    if (carouselDots) {
      carouselDots.querySelectorAll(".carousel-dot").forEach((dot, index) => {
        dot.classList.toggle("is-active", index === currentIndex);
      });
    }

    if (carouselTargetButtons.length) {
      const activeName = carButtons[currentIndex].getAttribute("data-car-name");
      carouselTargetButtons.forEach((button) => {
        button.classList.toggle("is-active", button.getAttribute("data-carousel-target") === activeName);
      });
    }

    updateSelectedCar(carButtons[currentIndex]);
  };

  if (carouselDots) {
    carButtons.forEach((_, index) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "carousel-dot";
      dot.addEventListener("click", () => {
        currentIndex = index;
        renderCarousel();
      });
      carouselDots.appendChild(dot);
    });
  }

  carButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      currentIndex = index;
      renderCarousel();
    });
  });

  if (carouselPrev) {
    carouselPrev.addEventListener("click", () => {
      currentIndex = mod(currentIndex - 1, carButtons.length);
      renderCarousel();
    });
  }

  if (carouselNext) {
    carouselNext.addEventListener("click", () => {
      currentIndex = mod(currentIndex + 1, carButtons.length);
      renderCarousel();
    });
  }

  if (carouselTargetButtons.length) {
    carouselTargetButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const target = button.getAttribute("data-carousel-target");
        const foundIndex = Array.from(carButtons).findIndex(
          (card) => card.getAttribute("data-car-name") === target,
        );
        if (foundIndex >= 0) {
          currentIndex = foundIndex;
          renderCarousel();
        }
      });
    });
  }

  selectedCarBookLink.addEventListener("click", openBookingModal);
  miniBookButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      openBookingModal();
    });
  });
  bookingCloseTargets.forEach((target) => {
    target.addEventListener("click", closeBookingModal);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeBookingModal();
  });

  const runCarSearch = () => {
    carSearchQuery = (searchInput?.value || "").trim().toLowerCase();
    applyCarSidebarFilter();
    renderCarousel();
  };

  filterChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const next = chip.getAttribute("data-car-filter");
      if (!next) return;
      activeCarFilter = next;
      applyCarSidebarFilter();
      renderCarousel();
    });
  });

  if (searchBtn) {
    searchBtn.addEventListener("click", runCarSearch);
  }
  if (searchInput) {
    searchInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        runCarSearch();
      }
    });
  }

  applyCarSidebarFilter();
  renderCarousel();

  window.addEventListener("site:langchange", () => {
    applyCarSidebarFilter();
    renderCarousel();
  });
}

(() => {
  const slider = document.querySelector("[data-reviews-slider]");
  if (!slider) return;

  const viewport = slider.querySelector("[data-reviews-viewport]");
  const track = slider.querySelector("[data-reviews-track]");
  const dotsWrap = slider.querySelector("[data-reviews-dots]");
  const counter = slider.querySelector("[data-reviews-counter]");
  const prevBtn = slider.querySelector("[data-reviews-prev]");
  const nextBtn = slider.querySelector("[data-reviews-next]");
  if (!viewport || !track || !dotsWrap || !counter || !prevBtn || !nextBtn) return;

  const REVIEW_COUNT = 22;
  const AUTO_MS = 6500;
  const reviewBase = new URL("./assets/images/reviews/", document.baseURI);
  const tr = (key, vars) => (window.SITE_I18N?.t ? window.SITE_I18N.t(key, vars) : null);
  const reviewAlt = (i) => tr("reviews.alt_photo", { n: i }) || `รีวิวจากลูกค้า ภาพที่ ${i}`;
  const reviewAltFail = (i) => tr("reviews.alt_fail", { name: `review-${String(i).padStart(2, "0")}` }) || `โหลดรูป review-${String(i).padStart(2, "0")} ไม่สำเร็จ`;
  const dotAria = (i) => tr("reviews.dot_go", { n: i + 1 }) || `ไปที่ตำแหน่งสไลด์ ${i + 1}`;

  const modN = (v, n) => (v % n + n) % n;

  const reviewSrc = (i) => {
    const num = String(i).padStart(2, "0");
    return new URL(`review-${num}.png`, reviewBase).href;
  };

  for (let i = 1; i <= REVIEW_COUNT; i++) {
    const fig = document.createElement("figure");
    fig.className = "reviews-slide";
    const img = document.createElement("img");
    img.src = reviewSrc(i);
    img.alt = reviewAlt(i);
    img.loading = i <= 5 ? "eager" : "lazy";
    img.addEventListener("error", () => {
      img.alt = reviewAltFail(i);
    });
    fig.appendChild(img);
    track.appendChild(fig);
  }

  const slides = () => Array.from(track.children);
  let slideIndex = 0;
  let cellW = 0;
  let layoutAttempts = 0;
  let lastPerView = -1;
  let autoTimer = null;
  let autoplayStarted = false;

  const getPerView = () => {
    const raw = getComputedStyle(slider).getPropertyValue("--reviews-per-view").trim();
    const n = parseInt(raw, 10);
    return Number.isFinite(n) && n > 0 ? Math.min(n, REVIEW_COUNT) : 5;
  };

  const getGapPx = () => {
    const g = getComputedStyle(track).gap || getComputedStyle(track).columnGap;
    const n = parseFloat(g, 10);
    return Number.isFinite(n) && n >= 0 ? n : 12;
  };

  const getMaxSlideIndex = () => Math.max(0, REVIEW_COUNT - getPerView());

  const restartAutoplay = () => {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => {
      goSlide(slideIndex + 1);
    }, AUTO_MS);
  };

  const applyTransform = () => {
    const gap = getGapPx();
    const step = cellW + gap;
    track.style.transform = `translateX(${-slideIndex * step}px)`;
  };

  const syncUi = () => {
    const max = getMaxSlideIndex();
    counter.textContent = `${slideIndex + 1} / ${max + 1}`;
    dotsWrap.querySelectorAll(".reviews-dot").forEach((d, j) => {
      d.classList.toggle("is-active", j === slideIndex);
    });
  };

  const goSlide = (next) => {
    const max = getMaxSlideIndex();
    const total = max + 1;
    slideIndex = modN(next, total);
    applyTransform();
    syncUi();
    restartAutoplay();
  };

  const measureViewportWidth = () => {
    let w = viewport.offsetWidth;
    if (w < 48) {
      w = slider.offsetWidth;
    }
    if (w < 48 && slider.parentElement) {
      w = slider.parentElement.offsetWidth;
    }
    return w;
  };

  const rebuildDots = () => {
    dotsWrap.innerHTML = "";
    const max = getMaxSlideIndex();
    for (let i = 0; i <= max; i++) {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "reviews-dot";
      dot.setAttribute("aria-label", dotAria(i));
      dot.addEventListener("click", () => goSlide(i));
      dotsWrap.appendChild(dot);
    }
  };

  window.addEventListener("site:langchange", () => {
    track.querySelectorAll("img").forEach((img, idx) => {
      img.alt = reviewAlt(idx + 1);
    });
    rebuildDots();
    syncUi();
  });

  const layout = () => {
    const vw = measureViewportWidth();
    if (vw < 48) {
      if (layoutAttempts < 40) {
        layoutAttempts += 1;
        requestAnimationFrame(layout);
      }
      return;
    }
    layoutAttempts = 0;

    const perView = getPerView();
    const gap = getGapPx();
    const maxSlide = getMaxSlideIndex();

    cellW = (vw - (perView - 1) * gap) / perView;
    if (!Number.isFinite(cellW) || cellW < 0) cellW = 0;

    slides().forEach((el) => {
      el.style.width = `${cellW}px`;
    });
    const trackW = REVIEW_COUNT * cellW + (REVIEW_COUNT - 1) * gap;
    track.style.width = `${trackW}px`;

    if (perView !== lastPerView) {
      lastPerView = perView;
      slideIndex = Math.min(slideIndex, maxSlide);
      rebuildDots();
      restartAutoplay();
    } else {
      slideIndex = Math.min(slideIndex, maxSlide);
    }

    track.style.transition = "none";
    applyTransform();
    void track.offsetHeight;
    track.style.transition = "";
    syncUi();

    if (!autoplayStarted) {
      autoplayStarted = true;
      restartAutoplay();
    }
  };

  prevBtn.addEventListener("click", () => goSlide(slideIndex - 1));
  nextBtn.addEventListener("click", () => goSlide(slideIndex + 1));

  const scheduleLayout = () => requestAnimationFrame(() => requestAnimationFrame(layout));
  scheduleLayout();
  window.addEventListener("load", scheduleLayout);
  window.addEventListener("resize", scheduleLayout);

  track.querySelectorAll("img").forEach((img) => {
    if (!img.complete) {
      img.addEventListener("load", scheduleLayout, { once: true });
    }
  });

  if (typeof ResizeObserver !== "undefined") {
    let t;
    const ro = new ResizeObserver(() => {
      clearTimeout(t);
      t = setTimeout(layout, 60);
    });
    ro.observe(viewport);
  }

  const revealMo = new MutationObserver(() => {
    if (slider.classList.contains("is-visible")) {
      scheduleLayout();
    }
  });
  revealMo.observe(slider, { attributes: true, attributeFilter: ["class"] });

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      clearInterval(autoTimer);
    } else {
      restartAutoplay();
    }
  });

  let touchStartX = 0;
  viewport.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
    },
    { passive: true },
  );
  viewport.addEventListener(
    "touchend",
    (e) => {
      const dx = e.changedTouches[0].screenX - touchStartX;
      if (Math.abs(dx) > 50) {
        goSlide(dx > 0 ? slideIndex - 1 : slideIndex + 1);
      }
    },
    { passive: true },
  );
})();

(() => {
  const root = document.querySelector("[data-greviews-carousel]");
  if (!root) return;

  const viewport = root.querySelector("[data-greviews-viewport]");
  const track = root.querySelector("[data-greviews-track]");
  const prevBtn = root.querySelector("[data-greviews-prev]");
  const nextBtn = root.querySelector("[data-greviews-next]");
  if (!viewport || !track || !prevBtn || !nextBtn) return;

  const cards = () => Array.from(track.querySelectorAll(".greviews-card"));
  const modN = (v, n) => ((v % n) + n) % n;

  let slideIndex = 0;
  let cellW = 0;
  let layoutAttempts = 0;

  const getPerView = () => {
    const raw = getComputedStyle(root).getPropertyValue("--greviews-per-view").trim();
    const n = parseInt(raw, 10);
    const c = cards().length;
    if (!c) return 1;
    return Number.isFinite(n) && n > 0 ? Math.min(n, c) : Math.min(3, c);
  };

  const getGapPx = () => {
    const g = getComputedStyle(track).gap;
    const val = parseFloat(g, 10);
    return Number.isFinite(val) && val >= 0 ? val : 16;
  };

  const getMaxSlideIndex = () => Math.max(0, cards().length - getPerView());

  const applyTransform = () => {
    const gap = getGapPx();
    const step = cellW + gap;
    track.style.transform = `translateX(${-slideIndex * step}px)`;
  };

  const layout = () => {
    const vw = viewport.offsetWidth;
    if (vw < 48) {
      if (layoutAttempts < 40) {
        layoutAttempts += 1;
        requestAnimationFrame(layout);
      }
      return;
    }
    layoutAttempts = 0;

    const perView = getPerView();
    const gap = getGapPx();
    const maxSlide = getMaxSlideIndex();

    cellW = (vw - (perView - 1) * gap) / perView;
    if (!Number.isFinite(cellW) || cellW < 0) cellW = 0;

    cards().forEach((el) => {
      el.style.width = `${cellW}px`;
    });
    const n = cards().length;
    track.style.width = `${n * cellW + Math.max(0, n - 1) * gap}px`;

    slideIndex = Math.min(slideIndex, maxSlide);
    track.style.transition = "none";
    applyTransform();
    void track.offsetHeight;
    track.style.transition = "";
  };

  const goSlide = (next) => {
    const max = getMaxSlideIndex();
    slideIndex = modN(next, max + 1);
    applyTransform();
  };

  prevBtn.addEventListener("click", () => goSlide(slideIndex - 1));
  nextBtn.addEventListener("click", () => goSlide(slideIndex + 1));

  const scheduleLayout = () => requestAnimationFrame(() => requestAnimationFrame(layout));
  scheduleLayout();
  window.addEventListener("resize", scheduleLayout);

  if (typeof ResizeObserver !== "undefined") {
    let t;
    const ro = new ResizeObserver(() => {
      clearTimeout(t);
      t = setTimeout(layout, 60);
    });
    ro.observe(viewport);
  }

  const revealMo = new MutationObserver(() => {
    if (root.classList.contains("is-visible")) {
      scheduleLayout();
    }
  });
  revealMo.observe(root, { attributes: true, attributeFilter: ["class"] });

  let touchStartX = 0;
  viewport.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
    },
    { passive: true },
  );
  viewport.addEventListener(
    "touchend",
    (e) => {
      const dx = e.changedTouches[0].screenX - touchStartX;
      if (Math.abs(dx) > 50) {
        goSlide(dx > 0 ? slideIndex - 1 : slideIndex + 1);
      }
    },
    { passive: true },
  );
})();

(() => {
  const root = document.querySelector("[data-home-album]");
  if (!root) return;

  const viewport = root.querySelector("[data-home-album-viewport]");
  const track = root.querySelector("[data-home-album-track]");
  const prevBtn = root.querySelector("[data-home-album-prev]");
  const nextBtn = root.querySelector("[data-home-album-next]");
  const tmpl = document.getElementById("home-album-imgs");

  if (!viewport || !track || !prevBtn || !nextBtn || !tmpl) return;

  const sources = Array.from(tmpl.content.querySelectorAll("img"));
  if (!sources.length) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const getGapPx = () => {
    const g = getComputedStyle(track).gap;
    const val = parseFloat(g, 10);
    return Number.isFinite(val) && val >= 0 ? val : 14;
  };

  /** One large slide at a time (still advances one image per step, infinite loop). */
  const getPerView = (count) => Math.min(1, Math.max(0, count));

  const n = sources.length;
  let perView = 1;
  let loopMode = false;
  let cellW = 0;
  let step = 0;
  let pos = 0;
  let layoutAttempts = 0;
  let lastBuiltPerView = -1;
  let lastBuiltLoop = null;
  /** @type {"next" | "prev" | null} */
  let pendingSnap = null;

  const makeSlide = (imgEl) => {
    const slide = document.createElement("div");
    slide.className = "home-album__slide";
    slide.appendChild(imgEl.cloneNode(true));
    return slide;
  };

  const setTransitionOn = (on) => {
    track.classList.toggle("is-no-trans", !on);
  };

  const applyTransform = () => {
    if (!track.firstChild || !Number.isFinite(step) || step <= 0) return;
    if (!loopMode) {
      track.style.transform = "translateX(0)";
      return;
    }
    const firstIdx = n + pos;
    track.style.transform = `translateX(${-(firstIdx * step)}px)`;
  };

  const syncNav = () => {
    const off = !loopMode;
    prevBtn.disabled = off;
    nextBtn.disabled = off;
  };

  const buildTrackIfNeeded = () => {
    const pv = getPerView(n);
    const lm = n > pv;
    if (track.childElementCount && pv === lastBuiltPerView && lm === lastBuiltLoop) {
      perView = pv;
      loopMode = lm;
      return;
    }

    pos = 0;
    pendingSnap = null;
    lastBuiltPerView = pv;
    lastBuiltLoop = lm;
    perView = pv;
    loopMode = lm;
    track.replaceChildren();

    if (loopMode) {
      for (let rep = 0; rep < 3; rep += 1) {
        for (let i = 0; i < n; i += 1) {
          track.appendChild(makeSlide(sources[i]));
        }
      }
    } else {
      for (let i = 0; i < n; i += 1) {
        track.appendChild(makeSlide(sources[i]));
      }
    }
  };

  const layout = () => {
    const vw = viewport.clientWidth;
    if (vw < 48) {
      if (layoutAttempts < 40) {
        layoutAttempts += 1;
        requestAnimationFrame(layout);
      }
      return;
    }
    layoutAttempts = 0;

    buildTrackIfNeeded();

    const gap = getGapPx();
    cellW = (vw - (perView - 1) * gap) / perView;
    if (!Number.isFinite(cellW) || cellW < 0) cellW = 0;
    step = cellW + gap;

    const slides = track.querySelectorAll(".home-album__slide");
    slides.forEach((el) => {
      el.style.width = `${cellW}px`;
      const img = el.querySelector("img");
      if (img && !img.complete) {
        img.addEventListener("load", scheduleLayout, { once: true });
      }
    });

    const slideCount = slides.length;
    if (slideCount) {
      track.style.width = `${slideCount * cellW + Math.max(0, slideCount - 1) * gap}px`;
    }

    setTransitionOn(false);
    applyTransform();
    void track.offsetHeight;
    setTransitionOn(!reduceMotion.matches);

    syncNav();
  };

  const goNext = () => {
    if (!loopMode) return;
    if (reduceMotion.matches) {
      pos = (pos + 1) % n;
      applyTransform();
      return;
    }
    if (pos < n - 1) {
      pos += 1;
      applyTransform();
      return;
    }
    pendingSnap = "next";
    setTransitionOn(true);
    track.style.transform = `translateX(${-(2 * n) * step}px)`;
  };

  const goPrev = () => {
    if (!loopMode) return;
    if (reduceMotion.matches) {
      pos = (pos - 1 + n) % n;
      applyTransform();
      return;
    }
    if (pos > 0) {
      pos -= 1;
      applyTransform();
      return;
    }
    pendingSnap = "prev";
    setTransitionOn(true);
    track.style.transform = `translateX(${-(n - 1) * step}px)`;
  };

  track.addEventListener("transitionend", (e) => {
    if (e.target !== track || e.propertyName !== "transform") return;
    if (pendingSnap === "next") {
      pendingSnap = null;
      pos = 0;
      setTransitionOn(false);
      track.style.transform = `translateX(${-(n * step)}px)`;
      void track.offsetHeight;
      setTransitionOn(!reduceMotion.matches);
    } else if (pendingSnap === "prev") {
      pendingSnap = null;
      pos = n - 1;
      setTransitionOn(false);
      track.style.transform = `translateX(${-(2 * n - 1) * step}px)`;
      void track.offsetHeight;
      setTransitionOn(!reduceMotion.matches);
    }
  });

  prevBtn.addEventListener("click", goPrev);
  nextBtn.addEventListener("click", goNext);

  viewport.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      goPrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      goNext();
    }
  });

  let touchStartX = 0;
  viewport.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
    },
    { passive: true },
  );
  viewport.addEventListener(
    "touchend",
    (e) => {
      const dx = e.changedTouches[0].screenX - touchStartX;
      if (Math.abs(dx) > 50) {
        if (dx > 0) goPrev();
        else goNext();
      }
    },
    { passive: true },
  );

  const scheduleLayout = () => requestAnimationFrame(() => requestAnimationFrame(layout));
  scheduleLayout();
  window.addEventListener("resize", scheduleLayout);

  if (typeof ResizeObserver !== "undefined") {
    let t;
    const ro = new ResizeObserver(() => {
      clearTimeout(t);
      t = setTimeout(layout, 60);
    });
    ro.observe(viewport);
  }

  const revealMo = new MutationObserver(() => {
    if (root.classList.contains("is-visible")) {
      scheduleLayout();
    }
  });
  revealMo.observe(root, { attributes: true, attributeFilter: ["class"] });

  reduceMotion.addEventListener("change", () => {
    setTransitionOn(!reduceMotion.matches);
  });
})();

const contactForm = document.querySelector("[data-contact-form]");

if (contactForm) {
  const statusEl = contactForm.querySelector("[data-contact-status]");
  const submitBtn = contactForm.querySelector("[data-contact-submit]");
  const honeyField = contactForm.querySelector('[name="_honey"]');
  const contactConfig = window.CONTACT_FORM_CONFIG || {};
  const web3formsAccessKey = (contactConfig.web3formsAccessKey || "").trim();

  const t = (key) => window.SITE_I18N?.t?.(key) || "";

  const setStatus = (message, state) => {
    if (!statusEl) return;
    if (!message) {
      statusEl.hidden = true;
      statusEl.textContent = "";
      statusEl.removeAttribute("data-state");
      return;
    }
    statusEl.hidden = false;
    statusEl.textContent = message;
    statusEl.dataset.state = state;
  };

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (honeyField?.value) return;
    if (!contactForm.reportValidity()) return;

    const name = contactForm.querySelector('[name="name"]')?.value?.trim() || "";
    const phone = contactForm.querySelector('[name="phone"]')?.value?.trim() || "";
    const date = contactForm.querySelector('[name="date"]')?.value || "";
    const car = contactForm.querySelector('[name="car"]')?.value || "";
    const detail = contactForm.querySelector('[name="detail"]')?.value?.trim() || "";

    if (submitBtn) submitBtn.disabled = true;
    setStatus(t("contact.form.sending"), "loading");

    const fields = { name, phone, date, car, detail };

    try {
      let sent = false;

      if (web3formsAccessKey) {
        const wRes = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            access_key: web3formsAccessKey,
            subject: `จองรถ Infinity Transport — ${name}`,
            from_name: name,
            name,
            phone,
            date: date || "-",
            car: car || "-",
            message: detail,
          }),
        });
        const wData = await wRes.json().catch(() => ({}));
        sent = wRes.ok && wData.success === true;
      } else {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("phone", phone);
        formData.append("date", date);
        formData.append("car", car);
        formData.append("detail", detail);
        try {
          const pRes = await fetch("./contact-submit.php", { method: "POST", body: formData });
          const pData = await pRes.json().catch(() => ({}));
          sent = pRes.ok && pData.success === true;
        } catch {
          sent = false;
        }
      }

      if (sent) {
        contactForm.reset();
        setStatus(t("contact.form.success"), "success");
      } else if (!web3formsAccessKey) {
        setStatus(t("contact.form.error_setup"), "error");
      } else {
        setStatus(t("contact.form.error"), "error");
      }
    } catch {
      setStatus(t("contact.form.error"), "error");
    } finally {
      if (submitBtn) submitBtn.disabled = false;
    }
  });
}
