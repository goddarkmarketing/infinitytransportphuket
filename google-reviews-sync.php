<?php
declare(strict_types=1);

require_once __DIR__ . '/includes/google-reviews-lib.php';

header('Content-Type: text/plain; charset=utf-8');

$cfg = google_reviews_config();
$apiKey = trim((string) ($cfg['apiKey'] ?? ''));

if ($apiKey === '') {
    echo "Missing apiKey in google-reviews-config.php\n";
    echo "Copy google-reviews-config.example.php → google-reviews-config.php and add your key.\n";
    exit(1);
}

try {
    $referer = trim((string) ($cfg['apiReferer'] ?? ''));
    $payload = google_reviews_fetch_from_api(
        (string) $cfg['placeId'],
        $apiKey,
        $referer !== '' ? $referer : null,
    );
    if (!google_reviews_write_cache($payload)) {
        throw new RuntimeException('Could not write cache file');
    }
    echo "OK — cached " . count($payload['reviews']) . " reviews\n";
    echo "Place: " . ($payload['place']['name'] ?? '') . "\n";
    echo "Rating: " . ($payload['place']['rating'] ?? '') . " (" . ($payload['place']['userRatingCount'] ?? 0) . " reviews)\n";
    echo "File: " . google_reviews_cache_path() . "\n";
} catch (Throwable $e) {
    echo "ERROR: " . $e->getMessage() . "\n";
    exit(1);
}
