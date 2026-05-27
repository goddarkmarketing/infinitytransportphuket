<?php
declare(strict_types=1);

/**
 * Proxy Google profile photos (hotlink-safe for the site).
 */
$url = isset($_GET['url']) ? trim((string) $_GET['url']) : '';
if ($url === '' || !preg_match('#^https://lh3\.googleusercontent\.com/[a-zA-Z0-9_\-./=%]+$#', $url)) {
    http_response_code(400);
    header('Content-Type: text/plain; charset=utf-8');
    echo 'Invalid url';
    exit;
}

$cacheDir = __DIR__ . '/assets/cache/google-photos';
$cacheKey = hash('sha256', $url);
$cacheFile = $cacheDir . '/' . $cacheKey . '.img';
$maxAge = 604800; // 7 days

if (is_file($cacheFile) && (time() - (int) filemtime($cacheFile) < $maxAge)) {
    $body = file_get_contents($cacheFile);
    $metaFile = $cacheFile . '.meta';
    $type = is_file($metaFile) ? trim((string) file_get_contents($metaFile)) : 'image/jpeg';
    if ($body !== false) {
        header('Content-Type: ' . ($type !== '' ? $type : 'image/jpeg'));
        header('Cache-Control: public, max-age=604800');
        echo $body;
        exit;
    }
}

if (!is_dir($cacheDir) && !mkdir($cacheDir, 0755, true) && !is_dir($cacheDir)) {
    http_response_code(500);
    exit;
}

$headers = [
    'Referer: https://www.google.com/',
    'User-Agent: Mozilla/5.0 (compatible; InfinityTransportPhuket/1.0)',
];

$body = false;
$type = 'image/jpeg';
$code = 0;

if (function_exists('curl_init')) {
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_TIMEOUT => 15,
        CURLOPT_HTTPHEADER => $headers,
    ]);
    $body = curl_exec($ch);
    $code = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $ct = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);
    if (is_string($ct) && $ct !== '') {
        $type = strtok($ct, ';') ?: $type;
    }
    curl_close($ch);
} else {
    $ctx = stream_context_create([
        'http' => [
            'method' => 'GET',
            'header' => implode("\r\n", $headers) . "\r\n",
            'timeout' => 15,
            'ignore_errors' => true,
        ],
    ]);
    $body = file_get_contents($url, false, $ctx);
    $code = 200;
}

if ($body === false || $code < 200 || $code >= 300) {
    http_response_code(502);
    header('Content-Type: text/plain; charset=utf-8');
    echo 'Upstream error';
    exit;
}

file_put_contents($cacheFile, $body, LOCK_EX);
file_put_contents($cacheFile . '.meta', $type, LOCK_EX);

header('Content-Type: ' . $type);
header('Cache-Control: public, max-age=604800');
echo $body;
