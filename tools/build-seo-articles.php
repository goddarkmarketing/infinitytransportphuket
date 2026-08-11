<?php
/**
 * Build static article HTML pages from content/seo-articles/*.md (basic markdown).
 * Usage: php tools/build-seo-articles.php
 */
declare(strict_types=1);

$root = dirname(__DIR__);
$srcDir = $root . '/content/seo-articles';
$dateDisplay = [
  '2026-07-31' => '31 กรกฎาคม 2026',
  '2026-08-11' => '11 สิงหาคม 2026',
];

$covers = [
  'phuket-van-convenient-routes' => 'cover-phuket-van-convenient-routes.png',
  'rent-phuket-van-with-driver' => 'cover-rent-phuket-van-with-driver.png',
  'phuket-tour-van-private' => 'cover-phuket-tour-van-private.png',
  'phuket-airport-vip-van' => 'cover-phuket-airport-vip-van.png',
  'phuket-van-complete-guide' => 'cover-phuket-van-complete-guide.png',
  'phuket-sightseeing-van-guide' => 'cover-phuket-sightseeing-van-guide.png',
  'phuket-airport-van-guide' => 'cover-phuket-airport-van-guide.png',
  'phuket-charter-vip-van-guide' => 'cover-phuket-charter-vip-van-guide.png',
];

$targets = [
  '09-phuket-van-complete-guide.md',
  '10-phuket-sightseeing-van-guide.md',
  '11-phuket-airport-van-guide.md',
  '12-phuket-charter-vip-van-guide.md',
];

function parseFrontMatter(string $raw): array {
  if (!preg_match('/^---\r?\n(.*?)\r?\n---\r?\n(.*)$/s', $raw, $m)) {
    return [[], $raw];
  }
  $meta = [];
  foreach (preg_split('/\r?\n/', $m[1]) as $line) {
    if (!preg_match('/^([A-Za-z0-9_]+):\s*(.*)$/', $line, $lm)) continue;
    $val = trim($lm[2]);
    if ((str_starts_with($val, '"') && str_ends_with($val, '"')) || (str_starts_with($val, "'") && str_ends_with($val, "'"))) {
      $val = substr($val, 1, -1);
    }
    $meta[$lm[1]] = $val;
  }
  return [$meta, $m[2]];
}

function mdInline(string $s): string {
  $s = htmlspecialchars($s, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
  $s = preg_replace('/\*\*(.+?)\*\*/', '<strong>$1</strong>', $s);
  $s = preg_replace('/\[(.+?)\]\((.+?)\)/', '<a href="$2">$1</a>', $s);
  // Fix absolute site links to relative
  $s = str_replace('https://infinitytransportphuket.com/', './', $s);
  $s = str_replace('href=".//', 'href="./', $s);
  return $s;
}

function mdToSections(string $body): array {
  // Strip trailing SEO pack sections from published HTML body
  $cutMarkers = [
    "\n## On-page SEO",
    "\n## On-Page SEO",
    "\n## On-page SEO Pack",
    "\n## Image SEO",
    "\n## Image SEO Proposals",
    "\n## Schema",
    "\n## Schema JSON-LD",
    "\n## JSON-LD",
  ];
  foreach ($cutMarkers as $cut) {
    $pos = mb_strpos($body, $cut);
    if ($pos !== false) {
      $body = mb_substr($body, 0, $pos);
    }
  }

  $lines = preg_split('/\r?\n/', $body);
  $sections = [];
  $faq = [];
  $cur = ['id' => 'intro', 'h2' => '', 'html' => ''];
  $inFaq = false;
  $listOpen = false;
  $tableOpen = false;
  $tableRows = [];
  $faqQ = null;
  $pendingSectionId = null;
  $faqSectionId = 'article-faq';

  $flushList = function () use (&$listOpen, &$cur) {
    if ($listOpen) {
      $cur['html'] .= "</ul>\n";
      $listOpen = false;
    }
  };
  $flushTable = function () use (&$tableOpen, &$tableRows, &$cur) {
    if (!$tableOpen) return;
    $html = "<div class=\"info-table-wrap\"><table class=\"info-table\">";
    foreach ($tableRows as $i => $cols) {
      $tag = $i === 0 ? 'th' : 'td';
      $html .= '<tr>';
      foreach ($cols as $c) {
        $html .= "<{$tag}>" . mdInline(trim($c)) . "</{$tag}>";
      }
      $html .= '</tr>';
      if ($i === 0) {
        // wrap header conceptually via th already
      }
    }
    // rebuild with thead
    if (count($tableRows) > 0) {
      $html = "<div class=\"info-table-wrap\"><table class=\"info-table\"><thead><tr>";
      foreach ($tableRows[0] as $c) $html .= '<th scope="col">' . mdInline(trim($c)) . '</th>';
      $html .= '</tr></thead><tbody>';
      for ($i = 1; $i < count($tableRows); $i++) {
        if (preg_match('/^\s*\|?\s*-+/', implode('|', $tableRows[$i]))) continue;
        $html .= '<tr>';
        foreach ($tableRows[$i] as $c) $html .= '<td>' . mdInline(trim($c)) . '</td>';
        $html .= '</tr>';
      }
      $html .= '</tbody></table></div>';
    }
    $cur['html'] .= $html . "\n";
    $tableOpen = false;
    $tableRows = [];
  };

  $pushSection = function () use (&$sections, &$cur, $flushList, $flushTable) {
    $flushList();
    $flushTable();
    if (trim(strip_tags($cur['html'])) === '' && $cur['h2'] === '') return;
    $sections[] = $cur;
    $cur = ['id' => 'sec-' . substr(md5((string)count($sections)), 0, 8), 'h2' => '', 'html' => ''];
  };

  foreach ($lines as $line) {
    $trimmed = trim($line);

    // Markdown HTML anchors for TOC — apply to next H2, never print as text
    if (preg_match('/^<a\s+id="([^"]+)"\s*><\/a>$/i', $trimmed, $am)) {
      $pendingSectionId = $am[1];
      continue;
    }

    if (preg_match('/^#\s+(.+)/', $line, $m)) {
      // skip duplicate H1 in body
      continue;
    }
    if (preg_match('/^##\s+(.+)/', $line, $m)) {
      $flushList();
      $flushTable();
      $title = trim($m[1]);
      if (preg_match('/คำถามที่พบบ่อย|FAQ/i', $title)) {
        $pushSection();
        $inFaq = true;
        if ($pendingSectionId) {
          $faqSectionId = $pendingSectionId;
          $pendingSectionId = null;
        }
        continue;
      }
      if ($inFaq) $inFaq = false;
      $pushSection();
      $cur['h2'] = $title;
      $cur['id'] = $pendingSectionId ?: ('sec-' . substr(md5($title), 0, 8));
      $pendingSectionId = null;
      continue;
    }
    if ($inFaq && preg_match('/^###\s+(.+)/', $line, $m)) {
      $faqQ = trim($m[1]);
      $faqQ = preg_replace('/^\d+[\).\s]+/', '', $faqQ);
      $faq[] = ['q' => $faqQ, 'a' => ''];
      continue;
    }
    if ($inFaq && $faqQ !== null && trim($line) !== '') {
      // Ignore HR / leftover anchors inside FAQ answers
      if (preg_match('/^---+$/', $trimmed)) continue;
      $idx = count($faq) - 1;
      if ($idx >= 0) {
        $faq[$idx]['a'] .= ($faq[$idx]['a'] === '' ? '' : ' ') . trim($line);
      }
      continue;
    }
    if (preg_match('/^###\s+(.+)/', $line, $m)) {
      $flushList();
      $flushTable();
      $cur['html'] .= '<h3>' . mdInline(trim($m[1])) . "</h3>\n";
      continue;
    }
    if (preg_match('/^\|(.+)\|$/', $line)) {
      $flushList();
      $cols = array_map('trim', explode('|', trim($line, "| \t")));
      if (preg_match('/^[\s\-:|]+$/', $line)) continue;
      $tableOpen = true;
      $tableRows[] = $cols;
      continue;
    } else {
      $flushTable();
    }
    // Checklist items: - [ ] / - [x]
    if (preg_match('/^[-*]\s+\[([ xX])\]\s+(.+)/', $line, $m)) {
      if (!$listOpen) {
        $cur['html'] .= "<ul class=\"article-checklist\">\n";
        $listOpen = true;
      }
      $cur['html'] .= '<li>' . mdInline($m[2]) . "</li>\n";
      continue;
    }
    if (preg_match('/^[-*]\s+(.+)/', $line, $m)) {
      if (!$listOpen) {
        $cur['html'] .= "<ul>\n";
        $listOpen = true;
      }
      $cur['html'] .= '<li>' . mdInline($m[1]) . "</li>\n";
      continue;
    } else {
      $flushList();
    }
    if (preg_match('/^>\s*(.*)/', $line, $m)) {
      $cur['html'] .= '<blockquote class="article-callout"><p>' . mdInline($m[1]) . "</p></blockquote>\n";
      continue;
    }
    if (trim($line) === '') continue;
    if (preg_match('/^---+$/', $line)) continue;
    $cur['html'] .= '<p>' . mdInline($line) . "</p>\n";
  }
  $pushSection();
  return [$sections, $faq, $faqSectionId];
}

function renderPage(array $meta, array $sections, array $faq, string $cover, string $dateTh, string $introId, string $faqSectionId = 'article-faq'): string {
  $title = $meta['title'] ?? $meta['h1'] ?? 'บทความ';
  $desc = $meta['meta_description'] ?? '';
  $slug = $meta['url_slug'] ?? 'article';
  $h1 = $meta['h1'] ?? $title;
  $canonical = $meta['canonical'] ?? ("https://infinitytransportphuket.com/article-{$slug}.html");
  $date = $meta['date'] ?? '2026-07-31';
  $coverUrl = "https://infinitytransportphuket.com/assets/images/coverarticles/optimized/{$cover}";

  // First content section gets banner
  $mainHtml = '';
  $first = true;
  foreach ($sections as $sec) {
    if ($first) {
      $sec['id'] = $introId;
    }
    $mainHtml .= '<article class="reveal article-section article-prose" id="' . htmlspecialchars($sec['id']) . '">' . "\n";
    if ($first) {
      $mainHtml .= '<figure class="article-photo"><img class="article-section-image article-section-image--banner" src="./assets/images/coverarticles/optimized/' . htmlspecialchars($cover) . '" width="1200" height="675" alt="' . htmlspecialchars($h1) . '" loading="eager" decoding="async" fetchpriority="high"><figcaption>Infinity Transport Phuket — ' . htmlspecialchars($h1) . '</figcaption></figure>' . "\n";
      $first = false;
    }
    if ($sec['h2'] !== '') {
      $mainHtml .= '<h2>' . htmlspecialchars($sec['h2']) . "</h2>\n";
    }
    $mainHtml .= $sec['html'];
    $mainHtml .= "</article>\n\n";
  }

  $faqHtml = '<section class="article-faq reveal" id="' . htmlspecialchars($faqSectionId) . '" aria-label="คำถามที่พบบ่อย"><h2>คำถามที่พบบ่อย (FAQ)</h2>';
  $faqEntities = [];
  foreach ($faq as $item) {
    $q = htmlspecialchars($item['q']);
    $aHtml = mdInline($item['a']);
    $faqHtml .= "<details><summary>{$q}</summary><p>{$aHtml}</p></details>\n";
    $faqEntities[] = [
      '@type' => 'Question',
      'name' => $item['q'],
      'acceptedAnswer' => ['@type' => 'Answer', 'text' => $item['a']],
    ];
  }
  $faqHtml .= '</section>';

  $schema = [
    '@context' => 'https://schema.org',
    '@graph' => [
      [
        '@type' => 'Article',
        'headline' => $h1,
        'datePublished' => $date,
        'description' => $desc,
        'inLanguage' => 'th',
        'author' => ['@type' => 'Organization', 'name' => 'Infinity Transport & Travel Phuket'],
        'publisher' => ['@type' => 'Organization', 'name' => 'Infinity Transport & Travel Phuket'],
        'image' => $coverUrl,
        'mainEntityOfPage' => $canonical,
      ],
      [
        '@type' => 'FAQPage',
        'mainEntity' => $faqEntities,
      ],
      [
        '@type' => 'BreadcrumbList',
        'itemListElement' => [
          ['@type' => 'ListItem', 'position' => 1, 'name' => 'หน้าแรก', 'item' => 'https://infinitytransportphuket.com/'],
          ['@type' => 'ListItem', 'position' => 2, 'name' => 'บทความ', 'item' => 'https://infinitytransportphuket.com/articles.html'],
          ['@type' => 'ListItem', 'position' => 3, 'name' => $h1, 'item' => $canonical],
        ],
      ],
    ],
  ];
  $schemaJson = json_encode($schema, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);

  return <<<HTML
<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="google-site-verification" content="3hLQypJIX33Ftov-zP1OVZMfUL3XWCR8CLOHNTMXlss" />
  <link rel="canonical" href="{$canonical}">
  <title>{$title}</title>
  <meta name="description" content="{$desc}">
  <meta property="og:type" content="article">
  <meta property="og:title" content="{$title}">
  <meta property="og:description" content="{$desc}">
  <meta property="og:url" content="{$canonical}">
  <meta property="og:image" content="{$coverUrl}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{$title}">
  <meta name="twitter:description" content="{$desc}">
  <link rel="stylesheet" href="./assets/css/site.css?v=20260731">
</head>
<body>
  <header class="site-header">
    <div class="container nav">
      <a class="brand" href="./index.html">
        <img class="brand-mark" src="./assets/images/header-logo-144.jpg" width="72" height="72" alt="Infinity Transport &amp; Travel Phuket" decoding="async">
        <span class="brand-text"><span class="brand-text__line">INFINITY TRANSPORT</span><span class="brand-text__line">&amp; TRAVEL PHUKET</span></span>
      </a>
      <nav class="menu" data-menu>
        <a href="./index.html" data-i18n="nav.home">หน้าแรก</a>
        <div class="nav-dropdown" data-nav-dropdown>
          <a class="nav-dropdown__trigger" href="./services.html" data-i18n="nav.services" aria-haspopup="true" aria-expanded="false">บริการ</a>
          <button type="button" class="nav-dropdown__toggle" data-nav-dropdown-toggle aria-expanded="false" data-i18n-aria="nav.services_submenu" aria-label="เปิดเมนูย่อยบริการ">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
          </button>
          <div class="nav-dropdown__panel" role="menu">
            <a href="./services.html" role="menuitem" data-i18n="nav.services_all">บริการทั้งหมด</a>
            <a href="./services/phuket-van/" role="menuitem" data-i18n="nav.phuket_van">รถตู้ภูเก็ต</a>
          </div>
        </div>
        <a href="./fleet.html" data-i18n="nav.fleet">รถทั้งหมด</a>
        <a href="./pricing.html" data-i18n="nav.pricing">ราคา</a>
        <a href="./about.html" data-i18n="nav.about">เกี่ยวกับเรา</a>
        <a href="./reviews.html" data-i18n="nav.reviews">รีวิว</a>
        <a class="is-active" href="./articles.html" data-i18n="nav.articles">บทความ</a>
        <a href="./contact.html" data-i18n="nav.contact">ติดต่อ</a>
      </nav>
      <div class="lang-switch" role="group" data-i18n-aria="nav.lang_group">
        <button type="button" class="lang-switch__btn is-active" data-lang-set="th" aria-pressed="true">ไทย</button>
        <button type="button" class="lang-switch__btn" data-lang-set="en" aria-pressed="false">EN</button>
      </div>
      <button class="menu-toggle" type="button" data-menu-toggle aria-expanded="false" data-i18n-aria="nav.menu_aria">
        <span class="menu-toggle__icon" aria-hidden="true">
          <span class="menu-toggle__bar"></span>
          <span class="menu-toggle__bar"></span>
          <span class="menu-toggle__bar"></span>
        </span>
      </button>
    </div>
  </header>

  <section class="section">
    <div class="container">
      <div class="article-single-layout">
        <main class="article-single-main">
          <div class="section-head reveal article-single-head">
            <div class="eyebrow">คู่มือรถตู้ภูเก็ต</div>
            <h1 class="site-page-title">{$h1}</h1>
            <p>{$desc}</p>
            <p class="article-date"><time datetime="{$date}">{$dateTh}</time></p>
          </div>
{$mainHtml}
          <p style="margin-top: 8px;">
            <a class="btn btn-gold" href="./contact.html">จองรถตู้ภูเก็ต</a>
            <a class="btn btn-dark" href="./articles.html">กลับไปหน้าบทความทั้งหมด</a>
          </p>
{$faqHtml}
        </main>
        <aside class="article-sidebar">
          <div class="article-reco">
            <h2>บทความแนะนำ</h2>
            <div class="article-reco-list">
            <div class="article-reco-item">
              <img src="./assets/images/reviews2/line_oa_chat_260522_driver_van.png" width="360" height="360" alt="รับส่งสนามบินภูเก็ต" loading="lazy" decoding="async">
              <a href="./article-phuket-airport-transfer.html#airport-intro">รับส่งสนามบินภูเก็ต</a>
            </div>
            <div class="article-reco-item">
              <img src="./assets/images/coverarticles/optimized/van-with-driver-phuket.png" width="360" height="202" alt="รถตู้พร้อมคนขับภูเก็ต" loading="lazy" decoding="async">
              <a href="./article-van-with-driver-phuket.html#van-with-driver-intro">รถตู้พร้อมคนขับ</a>
            </div>
            <div class="article-reco-item">
              <img src="./assets/images/optimized/daily-charter-800.jpg" width="360" height="180" alt="เหมารถตู้รายวัน" loading="lazy" decoding="async">
              <a href="./article-phuket-daily-charter.html#daily-charter-intro">เหมารถตู้รายวัน</a>
            </div>
            <div class="article-reco-item">
              <img src="./assets/images/coverarticles/optimized/cover-phuket-krabi-transfer.png" width="360" height="202" alt="รถรับส่งภูเก็ตกระบี่" loading="lazy" decoding="async">
              <a href="./article-phuket-krabi-transfer.html#krabi-transfer-intro">ภูเก็ต–กระบี่</a>
            </div>
            <div class="article-reco-item">
              <img src="./assets/images/coverarticles/optimized/cover-phuket-pier-transfer.png" width="360" height="202" alt="รถรับส่งท่าเรือภูเก็ต" loading="lazy" decoding="async">
              <a href="./article-phuket-pier-transfer.html#pier-intro">รถรับส่งท่าเรือภูเก็ต</a>
            </div>
            </div>
          </div>
          <div class="article-fb">
            <h2>Facebook</h2>
            <div class="article-fb-embed">
              <iframe
                src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2F8transporttravel%2F&tabs=timeline&width=292&height=400&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=false"
                width="292"
                height="400"
                style="border:none;overflow:hidden"
                scrolling="no"
                frameborder="0"
                allowfullscreen="true"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                title="Infinity Transport Facebook Page"
                loading="lazy"></iframe>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </section>

  <footer class="site-footer">
    <div class="site-footer__main">
      <div class="container site-footer__grid">
        <div class="site-footer__brand">
          <a class="site-footer__logo" href="./index.html">
            <img class="site-footer__mark" src="./assets/images/header-logo-144.jpg" width="52" height="52" alt="" decoding="async">
            <span class="site-footer__logo-text"><span>INFINITY TRANSPORT</span><span>&amp; TRAVEL PHUKET</span></span>
          </a>
          <p class="site-footer__tagline" data-i18n="footer.tagline">รถพร้อมคนขับภูเก็ต เน้นตรงเวลา ปลอดภัย และบริการมืออาชีพ ตลอด 24 ชั่วโมง</p>
        </div>
      </div>
      <div class="container site-footer__cta">
        <div class="site-footer__cta-btns">
          <a class="btn btn-gold site-footer__btn" href="./contact.html" data-i18n="footer.quote">จองรถ / ขอใบเสนอราคา</a>
          <a class="btn btn-dark site-footer__btn" href="./fleet.html" data-i18n="footer.fleet_btn">ดูรถทั้งหมด</a>
        </div>
      </div>
    </div>
    <div class="site-footer__bar">
      <div class="container site-footer__bar-inner">
        <p class="site-footer__copy">© <span data-footer-year>2026</span> Infinity Transport — <span data-i18n="footer.reserved">สงวนลิขสิทธิ์</span></p>
        <button type="button" class="site-footer__top" data-back-to-top data-i18n="footer.top">กลับขึ้นบน</button>
      </div>
    </div>
  </footer>

  <script type="application/ld+json">
{$schemaJson}
  </script>
  <script defer src="./assets/js/i18n.js?v=20260727" defer></script>
  <script defer src="./assets/js/site.js?v=20260731" defer></script>
</body>
</html>
HTML;
}

$built = 0;
foreach ($targets as $file) {
  $path = $srcDir . '/' . $file;
  if (!is_file($path)) {
    fwrite(STDERR, "SKIP missing {$file}\n");
    continue;
  }
  $raw = file_get_contents($path);
  [$meta, $body] = parseFrontMatter($raw);
  $slug = $meta['url_slug'] ?? pathinfo($file, PATHINFO_FILENAME);
  $cover = $covers[$slug] ?? 'van-with-driver-phuket.png';
  $date = $meta['date'] ?? '2026-07-31';
  $dateTh = $dateDisplay[$date] ?? $date;
  [$sections, $faq, $faqSectionId] = mdToSections($body);
  $introId = str_replace('-', '_', $slug) . '_intro';
  // nicer intro ids
  $introMap = [
    'phuket-van-convenient-routes' => 'convenient-routes-intro',
    'rent-phuket-van-with-driver' => 'rent-van-intro',
    'phuket-tour-van-private' => 'tour-van-private-intro',
    'phuket-airport-vip-van' => 'airport-vip-intro',
    'phuket-van-complete-guide' => 'van-complete-guide-intro',
    'phuket-sightseeing-van-guide' => 'sightseeing-van-intro',
    'phuket-airport-van-guide' => 'airport-van-guide-intro',
    'phuket-charter-vip-van-guide' => 'charter-vip-guide-intro',
  ];
  $introId = $introMap[$slug] ?? $introId;
  $html = renderPage($meta, $sections, $faq, $cover, $dateTh, $introId, $faqSectionId);
  $out = $root . '/article-' . $slug . '.html';
  file_put_contents($out, $html);
  echo "Wrote article-{$slug}.html (" . count($faq) . " FAQs, " . count($sections) . " sections)\n";
  $built++;
}
echo "Done: {$built}\n";

// Keep footer + floating contact identical to the rest of the site
$phpBin = defined('PHP_BINARY') && PHP_BINARY !== '' ? PHP_BINARY : 'php';
passthru(escapeshellarg($phpBin) . ' ' . escapeshellarg(__DIR__ . '/sync-footer-float.php'));
