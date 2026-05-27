<?php
declare(strict_types=1);

function google_reviews_config(): array
{
    $path = dirname(__DIR__) . '/google-reviews-config.php';
    if (!is_file($path)) {
        return [
            'placeId' => 'ChIJhdE-OgAvUDARWk7AksPaaBk',
            'apiKey' => '',
            'cacheTtlSeconds' => 86400,
        ];
    }
    $cfg = include $path;
    return is_array($cfg) ? $cfg : [];
}

function google_reviews_cache_path(): string
{
    return dirname(__DIR__) . '/assets/data/google-reviews.json';
}

function google_reviews_grade_label(float $rating, string $lang = 'th'): string
{
    if ($lang === 'en') {
        if ($rating >= 4.8) return 'Excellent';
        if ($rating >= 4.5) return 'Great';
        if ($rating >= 4.0) return 'Good';
        return 'Rated';
    }
    if ($rating >= 4.8) return 'ยอดเยี่ยม';
    if ($rating >= 4.5) return 'ดีมาก';
    if ($rating >= 4.0) return 'ดี';
    return 'คะแนนรีวิว';
}

function google_reviews_initials(string $name): string
{
    $parts = preg_split('/\s+/u', trim($name), -1, PREG_SPLIT_NO_EMPTY);
    if (!$parts) {
        return 'G';
    }
    if (count($parts) === 1) {
        return mb_strtoupper(mb_substr($parts[0], 0, 2));
    }
    $a = mb_substr($parts[0], 0, 1);
    $b = mb_substr($parts[count($parts) - 1], 0, 1);
    return mb_strtoupper($a . $b);
}

function google_reviews_avatar_class(int $index): string
{
    $classes = ['a', 'b', 'c', 'd', 'e', 'f'];
    return 'greviews-avatar--' . $classes[$index % count($classes)];
}

function google_reviews_format_date(string $iso, string $lang = 'th'): string
{
    $ts = strtotime($iso);
    if ($ts === false) {
        return '';
    }
    if ($lang === 'en') {
        return date('M j, Y', $ts);
    }
    $months = ['', 'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
    $m = (int) date('n', $ts);
    return date('j', $ts) . ' ' . ($months[$m] ?? '') . ' ' . (date('Y', $ts) + 543);
}

function google_reviews_snippet(string $text, int $max = 140): string
{
    $text = trim(preg_replace('/\s+/u', ' ', $text) ?? '');
    if (mb_strlen($text) <= $max) {
        return $text;
    }
    return rtrim(mb_substr($text, 0, $max - 1)) . '…';
}

function google_reviews_api_error_message(?string $body): string
{
    if ($body === null || $body === '') {
        return '';
    }
    $data = json_decode($body, true);
    if (!is_array($data)) {
        return '';
    }
    if (!empty($data['error']['message'])) {
        return (string) $data['error']['message'];
    }
    if (!empty($data['error_message'])) {
        return (string) $data['error_message'];
    }
    return '';
}

function google_reviews_fetch_from_api(string $placeId, string $apiKey, ?string $referer = null): array
{
    $url = 'https://places.googleapis.com/v1/places/' . rawurlencode($placeId);
    $headerLines = [
        'X-Goog-Api-Key: ' . $apiKey,
        'X-Goog-FieldMask: id,displayName,rating,userRatingCount,reviews,googleMapsUri',
    ];
    if ($referer !== null && $referer !== '') {
        $headerLines[] = 'Referer: ' . $referer;
    }
    $headers = implode("\r\n", $headerLines);

    if (function_exists('curl_init')) {
        $ch = curl_init($url);
        $opts = [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT => 20,
            CURLOPT_HTTPHEADER => $headerLines,
        ];
        if ($referer !== null && $referer !== '') {
            $opts[CURLOPT_REFERER] = $referer;
        }
        curl_setopt_array($ch, $opts);
        $body = curl_exec($ch);
        $code = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        if ($body === false || $code < 200 || $code >= 300) {
            $detail = google_reviews_api_error_message($body);
            throw new RuntimeException('Google Places API HTTP ' . $code . ($detail ? ': ' . $detail : ''));
        }
    } else {
        $ctx = stream_context_create([
            'http' => [
                'method' => 'GET',
                'header' => $headers . "\r\n",
                'timeout' => 20,
                'ignore_errors' => true,
            ],
        ]);
        $body = file_get_contents($url, false, $ctx);
        if ($body === false) {
            throw new RuntimeException('Google Places API request failed');
        }
    }

    $data = json_decode($body, true);
    if (!is_array($data)) {
        throw new RuntimeException('Invalid JSON from Google Places API');
    }

    $rating = isset($data['rating']) ? (float) $data['rating'] : 0.0;
    $count = isset($data['userRatingCount']) ? (int) $data['userRatingCount'] : 0;
    $name = $data['displayName']['text'] ?? 'Infinity Transport Phuket';
    $mapsUri = $data['googleMapsUri'] ?? ('https://www.google.com/maps/place/?q=place_id:' . $placeId);

    $reviews = [];
    foreach ($data['reviews'] ?? [] as $i => $rev) {
        if (!is_array($rev)) {
            continue;
        }
        $attr = is_array($rev['authorAttribution'] ?? null) ? $rev['authorAttribution'] : [];
        $author = $attr['displayName'] ?? 'Google user';
        $photoUri = trim((string) ($attr['photoUri'] ?? ''));
        $text = $rev['text']['text'] ?? ($rev['originalText']['text'] ?? '');
        $text = trim((string) $text);
        if ($text === '') {
            continue;
        }
        $stars = isset($rev['rating']) ? (int) round((float) $rev['rating']) : 5;
        $stars = max(1, min(5, $stars));
        $published = $rev['publishTime'] ?? '';
        $reviews[] = [
            'author' => (string) $author,
            'initials' => google_reviews_initials((string) $author),
            'photoUri' => $photoUri !== '' ? $photoUri : null,
            'rating' => $stars,
            'text' => $text,
            'snippet' => google_reviews_snippet($text),
            'publishedAt' => $published,
            'dateTh' => google_reviews_format_date((string) $published, 'th'),
            'dateEn' => google_reviews_format_date((string) $published, 'en'),
            'relativeTime' => $rev['relativePublishTimeDescription'] ?? '',
            'googleMapsUri' => $rev['googleMapsUri'] ?? $mapsUri,
            'avatarClass' => google_reviews_avatar_class($i),
        ];
    }

    return [
        'ok' => true,
        'source' => 'google-places-api',
        'placeId' => $placeId,
        'fetchedAt' => gmdate('c'),
        'place' => [
            'name' => $name,
            'rating' => $rating,
            'userRatingCount' => $count,
            'googleMapsUri' => $mapsUri,
            'gradeTh' => google_reviews_grade_label($rating, 'th'),
            'gradeEn' => google_reviews_grade_label($rating, 'en'),
        ],
        'reviews' => $reviews,
    ];
}

function google_reviews_read_cache(): ?array
{
    $path = google_reviews_cache_path();
    if (!is_file($path)) {
        return null;
    }
    $raw = file_get_contents($path);
    if ($raw === false) {
        return null;
    }
    $data = json_decode($raw, true);
    return is_array($data) ? $data : null;
}

function google_reviews_write_cache(array $payload): bool
{
    $path = google_reviews_cache_path();
    $dir = dirname($path);
    if (!is_dir($dir) && !mkdir($dir, 0755, true) && !is_dir($dir)) {
        return false;
    }
    $json = json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    if ($json === false) {
        return false;
    }
    return file_put_contents($path, $json . "\n", LOCK_EX) !== false;
}

function google_reviews_get_payload(bool $forceRefresh = false): array
{
    $cfg = google_reviews_config();
    $placeId = (string) ($cfg['placeId'] ?? '');
    $apiKey = trim((string) ($cfg['apiKey'] ?? ''));
    $ttl = (int) ($cfg['cacheTtlSeconds'] ?? 86400);
    $cachePath = google_reviews_cache_path();

    $stale = !is_file($cachePath) || (time() - (int) filemtime($cachePath) > $ttl);

    if (($forceRefresh || $stale) && $apiKey !== '' && $placeId !== '') {
        try {
            $referer = trim((string) ($cfg['apiReferer'] ?? ''));
            $fresh = google_reviews_fetch_from_api($placeId, $apiKey, $referer !== '' ? $referer : null);
            google_reviews_write_cache($fresh);
            return $fresh;
        } catch (Throwable $e) {
            $cached = google_reviews_read_cache();
            if ($cached) {
                $cached['ok'] = true;
                $cached['stale'] = true;
                $cached['error'] = $e->getMessage();
                return $cached;
            }
            return [
                'ok' => false,
                'message' => $e->getMessage(),
                'placeId' => $placeId,
                'reviews' => [],
            ];
        }
    }

    $cached = google_reviews_read_cache();
    if ($cached) {
        $cached['ok'] = true;
        if ($apiKey === '') {
            $cached['needsApiKey'] = true;
        }
        return $cached;
    }

    return [
        'ok' => false,
        'message' => 'No cached reviews. Add apiKey in google-reviews-config.php and open google-reviews-sync.php',
        'placeId' => $placeId,
        'reviews' => [],
    ];
}
