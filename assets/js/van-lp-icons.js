(function initVanLpIcons() {
  const tryCreate = () => {
    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
      return true;
    }
    return false;
  };

  const run = () => {
    if (tryCreate()) return;
    let n = 0;
    const timer = setInterval(() => {
      n += 1;
      if (tryCreate() || n > 40) clearInterval(timer);
    }, 50);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }
})();

(function initVanFleetSlider() {
  const root = document.querySelector("[data-van-fleet-slider]");
  if (!root) return;

  const track = root.querySelector("[data-van-fleet-track]");
  const prev = root.querySelector("[data-van-fleet-prev]");
  const next = root.querySelector("[data-van-fleet-next]");
  const dotsWrap = root.querySelector("[data-van-fleet-dots]");
  const cards = Array.from(track ? track.querySelectorAll(".van-lp-fleet-card") : []);
  if (!track || !cards.length) return;

  const gap = 16;
  const AUTO_MS = 4000;
  let index = 0;
  let timer = null;
  let paused = false;

  const visibleCount = () => {
    const w = window.innerWidth;
    if (w <= 700) return 1;
    if (w <= 960) return 2;
    return 4;
  };

  const cardStep = () => {
    const card = cards[0];
    return card ? card.getBoundingClientRect().width + gap : 280;
  };

  const maxIndex = () => Math.max(0, cards.length - visibleCount());

  const rebuildDots = () => {
    if (!dotsWrap) return;
    const total = maxIndex() + 1;
    dotsWrap.innerHTML = "";
    for (let i = 0; i < total; i += 1) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "van-lp-fleet-slider__dot" + (i === index ? " is-active" : "");
      btn.setAttribute("aria-label", "ไปยังชุดรถที่ " + (i + 1));
      btn.addEventListener("click", () => {
        goTo(i);
        restartAuto();
      });
      dotsWrap.appendChild(btn);
    }
  };

  const syncDots = () => {
    if (!dotsWrap) return;
    dotsWrap.querySelectorAll(".van-lp-fleet-slider__dot").forEach((dot, i) => {
      dot.classList.toggle("is-active", i === index);
    });
  };

  const goTo = (i, smooth = true) => {
    const max = maxIndex();
    index = ((i % (max + 1)) + (max + 1)) % (max + 1);
    track.scrollTo({ left: index * cardStep(), behavior: smooth ? "smooth" : "auto" });
    syncDots();
  };

  const nextSlide = () => {
    const max = maxIndex();
    if (max === 0) return;
    goTo(index >= max ? 0 : index + 1);
  };

  const stopAuto = () => {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  };

  const startAuto = () => {
    stopAuto();
    if (paused || maxIndex() === 0) return;
    timer = setInterval(nextSlide, AUTO_MS);
  };

  const restartAuto = () => {
    stopAuto();
    startAuto();
  };

  if (prev) {
    prev.addEventListener("click", () => {
      goTo(index - 1);
      restartAuto();
    });
  }
  if (next) {
    next.addEventListener("click", () => {
      nextSlide();
      restartAuto();
    });
  }

  track.addEventListener(
    "scroll",
    () => {
      const step = cardStep();
      if (!step) return;
      const nextIndex = Math.round(track.scrollLeft / step);
      if (nextIndex !== index) {
        index = Math.max(0, Math.min(maxIndex(), nextIndex));
        syncDots();
      }
    },
    { passive: true },
  );

  root.addEventListener("mouseenter", () => {
    paused = true;
    stopAuto();
  });
  root.addEventListener("mouseleave", () => {
    paused = false;
    startAuto();
  });
  root.addEventListener(
    "touchstart",
    () => {
      paused = true;
      stopAuto();
    },
    { passive: true },
  );
  root.addEventListener("touchend", () => {
    paused = false;
    restartAuto();
  });

  window.addEventListener("resize", () => {
    index = Math.min(index, maxIndex());
    rebuildDots();
    goTo(index, false);
    restartAuto();
  });

  rebuildDots();
  goTo(0, false);
  startAuto();
})();
