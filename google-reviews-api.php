<?php
declare(strict_types=1);

require_once __DIR__ . '/includes/google-reviews-lib.php';

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Cache-Control: public, max-age=1800');

$force = isset($_GET['refresh']) && $_GET['refresh'] === '1';
$payload = google_reviews_get_payload($force);

echo json_encode($payload, JSON_UNESCAPED_UNICODE);
