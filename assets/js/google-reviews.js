/**
 * Load Google reviews from google-reviews-api.php and render greviews UI.
 */
(function () {
  const API_URL = new URL("./google-reviews-api.php", document.baseURI).href;
  const PLACE_ID = "ChIJhdE-OgAvUDARWk7AksPaaBk";

  const tr = (key, vars) => {
    if (typeof window.i18nT === "function") return window.i18nT(key, vars);
    return null;
  };

  const lang = () => (document.documentElement.lang === "en" ? "en" : "th");

  const escapeHtml = (s) =>
    String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  const photoProxyUrl = (uri) => {
    if (!uri) return "";
    const base = new URL("./google-reviews-photo.php", document.baseURI);
    base.searchParams.set("url", uri);
    return base.href;
  };

  const starHtml = (n) => {
    const c = Math.max(0, Math.min(5, n));
    return Array.from({ length: 5 }, (_, i) =>
      `<span class="greviews-star" aria-hidden="true">${i < c ? "★" : "☆"}</span>`,
    ).join("");
  };

  const googleIconSvg =
    '<svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>';

  const buildCard = (rev) => {
    const fullText = escapeHtml(rev.text);
    const snippet = escapeHtml(rev.snippet || rev.text);
    const name = escapeHtml(rev.author);
    const dateLabel = lang() === "en" ? rev.dateEn || rev.relativeTime : rev.dateTh || rev.relativeTime;
    const readMore =
      tr("index.greviews.readmore") || (lang() === "en" ? "Read more" : "อ่านเพิ่มเติม");
    const verifiedTitle =
      tr("index.greviews.verified_title") || (lang() === "en" ? "Verified review" : "รีวิวที่ยืนยันแล้ว");
    const verifiedAria =
      tr("index.greviews.verified_aria") || (lang() === "en" ? "Verified" : "ยืนยันแล้ว");
    const avatarClass = rev.avatarClass || "greviews-avatar--a";
    const postedOn =
      tr("index.greviews.posted_on") || (lang() === "en" ? "Posted on Google" : "รีวิวบน Google");
    const viewOn =
      tr("index.greviews.view_on") || (lang() === "en" ? "View on Google" : "ดูบน Google");
    const photoSrc = rev.photoUri ? photoProxyUrl(rev.photoUri) : "";
    const initials = escapeHtml(rev.initials || "?");
    const avatarInner = photoSrc
      ? `<img class="greviews-avatar-img" src="${escapeHtml(photoSrc)}" alt="" width="40" height="40" loading="lazy" decoding="async" referrerpolicy="strict-origin-when-cross-origin" data-initials="${initials}" onerror="this.onerror=null;this.replaceWith(Object.assign(document.createElement('span'),{textContent:this.dataset.initials||'?'}));this.parentElement.classList.remove('greviews-avatar--photo');">`
      : `<span>${initials}</span>`;
    const reviewLink = rev.googleMapsUri ? escapeHtml(rev.googleMapsUri) : "";

    return `<article class="greviews-card greviews-card--live" data-review-text="${fullText.replace(/"/g, "&quot;")}">
      <div class="greviews-card-head">
        <div class="greviews-avatar ${avatarClass}${photoSrc ? " greviews-avatar--photo" : ""}">${avatarInner}</div>
        <div class="greviews-card-meta">
          <strong class="greviews-name">${name}</strong>
          <span class="greviews-posted">${escapeHtml(postedOn)}</span>
          <time class="greviews-date" datetime="${escapeHtml(rev.publishedAt || "")}">${escapeHtml(dateLabel)}</time>
        </div>
        <span class="greviews-mini-g" aria-hidden="true">${googleIconSvg}</span>
      </div>
      <div class="greviews-card-rating">
        <span class="greviews-stars greviews-stars--sm" aria-hidden="true">${starHtml(rev.rating)}</span>
        <span class="greviews-verified" title="${escapeHtml(verifiedTitle)}" aria-label="${escapeHtml(verifiedAria)}">${googleIconSvg}</span>
      </div>
      <p class="greviews-snippet" data-full-text="${fullText}">${snippet}</p>
      <button type="button" class="greviews-readmore" hidden>${readMore}</button>
      ${reviewLink ? `<a class="greviews-view-link" href="${reviewLink}" target="_blank" rel="noopener noreferrer">${escapeHtml(viewOn)}</a>` : ""}
    </article>`;
  };

  const updateSummary = (root, place) => {
    if (!place) return;
    const gradeEl = root.querySelector(".greviews-grade");
    const countEl = root.querySelector(".greviews-count");
    const statsNums = document.querySelectorAll("[data-google-rating-value]");
    const statsLabels = document.querySelectorAll(".reviews-stats [data-google-review-count]");

    const rating = Number(place.rating) || 0;
    const count = Number(place.userRatingCount) || 0;
    const rounded = Math.round(rating * 10) / 10;

    if (gradeEl) {
      gradeEl.textContent = lang() === "en" ? place.gradeEn || "Excellent" : place.gradeTh || "ยอดเยี่ยม";
    }
    if (countEl) {
      const tpl =
        lang() === "en"
          ? `Based on ${count} Google reviews`
          : `อ้างอิงจาก ${count} บทวิจารณ์บน Google`;
      countEl.textContent = tpl;
    }

    statsNums.forEach((el) => {
      el.textContent = rounded > 0 ? String(rounded) : el.textContent;
    });
    statsLabels.forEach((el) => {
      if (count > 0) {
        el.textContent =
          lang() === "en"
            ? `${count} reviews on Google`
            : `รีวิวบน Google ${count} รายการ`;
      }
    });

    const starsWrap = root.querySelector(".greviews-stars--lg");
    if (starsWrap) {
      starsWrap.innerHTML = starHtml(Math.round(rating));
      starsWrap.setAttribute(
        "aria-label",
        lang() === "en" ? `Rating ${rounded} out of 5` : `คะแนน ${rounded} จาก 5`,
      );
    }

    const badge = root.querySelector(".greviews-source-badge");
    if (badge && count > 0) {
      badge.hidden = false;
    }
  };

  let payloadNeedsSync = false;

  const wireReadMore = (root) => {
    root.querySelectorAll(".greviews-card").forEach((card) => {
      const p = card.querySelector(".greviews-snippet");
      const btn = card.querySelector(".greviews-readmore");
      if (!p || !btn) return;
      const full = card.getAttribute("data-review-text") || "";
      const short = p.textContent || "";
      if (full.length > short.length + 8) {
        btn.hidden = false;
        btn.addEventListener("click", () => {
          const expanded = btn.getAttribute("data-expanded") === "true";
          if (expanded) {
            p.textContent = short;
            btn.removeAttribute("data-expanded");
            btn.textContent = tr("index.greviews.readmore") || "อ่านเพิ่มเติม";
          } else {
            const tmp = document.createElement("textarea");
            tmp.innerHTML = full;
            p.textContent = tmp.value;
            btn.setAttribute("data-expanded", "true");
            btn.textContent = lang() === "en" ? "Show less" : "ย่อข้อความ";
          }
        });
      }
    });
  };

  const updateGoogleLinks = (uri) => {
    if (!uri) return;
    document.querySelectorAll("[data-google-reviews-link]").forEach((a) => {
      a.href = uri;
    });
  };

  const render = (payload) => {
    if (!payload || !payload.ok) return;

    payloadNeedsSync = Boolean(payload.needsSync || payload.source === "seed");

    const reviews = Array.isArray(payload.reviews) ? payload.reviews : [];
    const place = payload.place || {};

    document.querySelectorAll("[data-greviews-carousel]").forEach((root) => {
      const track = root.querySelector("[data-greviews-track]");
      if (track && reviews.length) {
        track.innerHTML = reviews.map(buildCard).join("");
        track.setAttribute("aria-busy", "false");
        wireReadMore(root);
      }
      updateSummary(root, place);
    });

    updateGoogleLinks(place.googleMapsUri);

    if (payload.source === "google-places-api") {
      document.querySelectorAll("[data-google-reviews-panel]").forEach((el) => {
        el.classList.add("is-google-live");
      });
    }

    document.dispatchEvent(new CustomEvent("google-reviews:rendered", { detail: payload }));
  };

  const load = async () => {
    try {
      const res = await fetch(API_URL, { credentials: "same-origin" });
      if (!res.ok) throw new Error("HTTP " + res.status);
      const data = await res.json();
      render(data);
    } catch (e) {
      try {
        const fallback = new URL("./assets/data/google-reviews.json", document.baseURI).href;
        const res2 = await fetch(fallback);
        if (res2.ok) render(await res2.json());
      } catch (_) {
        /* keep static HTML */
      }
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", load);
  } else {
    load();
  }

  document.addEventListener("i18n:language-changed", load);
})();
