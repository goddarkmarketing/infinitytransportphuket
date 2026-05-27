<?php
/**
 * Google Places API — ใส่ API key ที่ apiKey (หรือสร้าง google-reviews-config.local.php)
 * สร้าง key: https://console.cloud.google.com/ → APIs → Places API (New)
 */
$cfg = [
    'placeId' => 'ChIJhdE-OgAvUDARWk7AksPaaBk',
    'apiKey'  => getenv('GOOGLE_PLACES_API_KEY') ?: '',
    /* จำเป็นเมื่อ API key จำกัด HTTP referrer — ต้องตรงกับที่ตั้งใน Google Cloud */
    'apiReferer' => 'https://infinitytransportphuket.com/',
    'cacheTtlSeconds' => 86400,
];

$local = __DIR__ . '/google-reviews-config.local.php';
if (is_file($local)) {
    $localCfg = include $local;
    if (is_array($localCfg)) {
        $cfg = array_merge($cfg, $localCfg);
    }
}

return $cfg;
