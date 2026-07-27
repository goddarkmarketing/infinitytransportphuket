<?php
/**
 * Auto-generate sitemap.xml from HTML files in project root.
 *
 * Usage (CLI):   php generate-sitemap.php
 * Usage (HTTP):  open http://localhost/infinitytransportphuket/generate-sitemap.php
 *
 * Output: writes sitemap.xml in the same directory.
 * Compatible with Google Search Console (sitemaps.org schema 0.9).
 */

$baseUrl = 'https://infinitytransportphuket.com';
$root    = __DIR__;

$priorityMap = [
    'index.html'    => ['priority' => '1.0',  'changefreq' => 'weekly'],
    'services.html' => ['priority' => '0.9',  'changefreq' => 'monthly'],
    'fleet.html'    => ['priority' => '0.9',  'changefreq' => 'monthly'],
    'pricing.html'  => ['priority' => '0.9',  'changefreq' => 'monthly'],
    'about.html'    => ['priority' => '0.8',  'changefreq' => 'monthly'],
    'reviews.html'  => ['priority' => '0.8',  'changefreq' => 'weekly'],
    'articles.html' => ['priority' => '0.9',  'changefreq' => 'weekly'],
    'contact.html'  => ['priority' => '0.9',  'changefreq' => 'monthly'],
    'article-van-with-driver-phuket.html' => ['priority' => '0.9', 'changefreq' => 'monthly'],
    'article-vip-van-phuket.html' => ['priority' => '0.9', 'changefreq' => 'monthly'],
    'article-vip-van-with-driver-phuket.html' => ['priority' => '0.9', 'changefreq' => 'monthly'],
    'article-phuket-van.html' => ['priority' => '0.9', 'changefreq' => 'monthly'],
    'article-phuket-airport-transfer.html' => ['priority' => '0.9', 'changefreq' => 'monthly'],
    'article-phuket-tour-van.html' => ['priority' => '0.9', 'changefreq' => 'monthly'],
    'article-phuket-transfer-van.html' => ['priority' => '0.9', 'changefreq' => 'monthly'],
    'article-phuket-daily-charter.html' => ['priority' => '0.9', 'changefreq' => 'monthly'],
    'article-phuket-hotel-transfer.html' => ['priority' => '0.9', 'changefreq' => 'monthly'],
    'article-phuket-9-seater-van.html' => ['priority' => '0.9', 'changefreq' => 'monthly'],
    'article-phuket-phangnga-transfer.html' => ['priority' => '0.9', 'changefreq' => 'monthly'],
    'article-phuket-krabi-transfer.html' => ['priority' => '0.9', 'changefreq' => 'monthly'],
    'article-phuket-pier-transfer.html' => ['priority' => '0.9', 'changefreq' => 'monthly'],
    'article-phuket-khaosok-transfer.html' => ['priority' => '0.9', 'changefreq' => 'monthly'],
    'article-phuket-wedding-event.html' => ['priority' => '0.9', 'changefreq' => 'monthly'],
    'article-phuket-patong-transfer.html' => ['priority' => '0.9', 'changefreq' => 'monthly'],
    'article-alphard-phuket.html' => ['priority' => '0.9', 'changefreq' => 'monthly'],
    'article-phuket-business-transfer.html' => ['priority' => '0.9', 'changefreq' => 'monthly'],
    'article-phuket-surat-thani-transfer.html' => ['priority' => '0.9', 'changefreq' => 'monthly'],
    'article-phuket-van-with-driver-all-routes.html' => ['priority' => '0.9', 'changefreq' => 'monthly'],
    'article-private-phuket-tour-van.html' => ['priority' => '0.9', 'changefreq' => 'monthly'],
    'article-phuket-van-airport-hotel-attractions.html' => ['priority' => '0.9', 'changefreq' => 'monthly'],
    'article-phuket-van-charter-guide.html' => ['priority' => '0.9', 'changefreq' => 'monthly'],
];

$defaultArticle = ['priority' => '0.85', 'changefreq' => 'monthly'];

$excluded = ['generate-sitemap.php', '404.html'];

$files = glob($root . DIRECTORY_SEPARATOR . '*.html');
sort($files);

$urls = [];

$indexPath = $root . DIRECTORY_SEPARATOR . 'index.html';
if (file_exists($indexPath)) {
    $urls[] = [
        'loc'        => $baseUrl . '/',
        'lastmod'    => date('Y-m-d', filemtime($indexPath)),
        'changefreq' => 'weekly',
        'priority'   => '1.0',
    ];
}

foreach ($files as $file) {
    $name = basename($file);
    if (in_array($name, $excluded, true)) {
        continue;
    }
    if ($name === 'index.html') {
        continue;
    }

    if (isset($priorityMap[$name])) {
        $meta = $priorityMap[$name];
    } elseif (strpos($name, 'article-') === 0) {
        $meta = $defaultArticle;
    } else {
        $meta = ['priority' => '0.7', 'changefreq' => 'monthly'];
    }

    $urls[] = [
        'loc'        => $baseUrl . '/' . $name,
        'lastmod'    => date('Y-m-d', filemtime($file)),
        'changefreq' => $meta['changefreq'],
        'priority'   => $meta['priority'],
    ];
}

$xml  = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
$xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";
foreach ($urls as $u) {
    $xml .= "  <url>\n";
    $xml .= '    <loc>' . htmlspecialchars($u['loc'], ENT_XML1) . "</loc>\n";
    $xml .= '    <lastmod>' . $u['lastmod'] . "</lastmod>\n";
    $xml .= '    <changefreq>' . $u['changefreq'] . "</changefreq>\n";
    $xml .= '    <priority>' . $u['priority'] . "</priority>\n";
    $xml .= "  </url>\n";
}
$xml .= '</urlset>' . "\n";

$out = $root . DIRECTORY_SEPARATOR . 'sitemap.xml';
file_put_contents($out, $xml);

if (PHP_SAPI === 'cli') {
    echo "Sitemap generated: $out\n";
    echo "URLs: " . count($urls) . "\n";
} else {
    header('Content-Type: text/plain; charset=utf-8');
    echo "Sitemap generated: $out\n";
    echo "URLs: " . count($urls) . "\n";
    echo "Live: $baseUrl/sitemap.xml\n";
}
