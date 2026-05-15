<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

$input = $_POST;
if (empty($input) && str_contains($_SERVER['CONTENT_TYPE'] ?? '', 'application/json')) {
    $raw = file_get_contents('php://input');
    $decoded = json_decode($raw ?: '', true);
    if (is_array($decoded)) {
        $input = $decoded;
    }
}

if (!empty($input['_honey'] ?? '')) {
    echo json_encode(['success' => true]);
    exit;
}

$notifyEmail = 'goddarkmarketing@gmail.com';

$name = trim((string) ($input['name'] ?? ''));
$phone = trim((string) ($input['phone'] ?? ''));
$date = trim((string) ($input['date'] ?? ''));
$car = trim((string) ($input['car'] ?? ''));
$detail = trim((string) ($input['detail'] ?? $input['message'] ?? ''));

if ($name === '' || $phone === '' || $detail === '') {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Missing required fields']);
    exit;
}

$subject = 'จองรถ Infinity Transport — ' . $name;
$bodyLines = [
    'ชื่อผู้จอง: ' . $name,
    'เบอร์ติดต่อ: ' . $phone,
    'วันที่ใช้งาน: ' . ($date !== '' ? $date : '-'),
    'ประเภทรถ: ' . ($car !== '' ? $car : '-'),
    '',
    'รายละเอียดเส้นทาง:',
    $detail,
];
$body = implode("\n", $bodyLines);

$host = preg_replace('/[^a-zA-Z0-9.-]/', '', $_SERVER['HTTP_HOST'] ?? 'localhost');
$fromAddress = 'noreply@' . ($host !== '' ? $host : 'localhost');

$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'From: Infinity Transport <' . $fromAddress . '>',
    'Reply-To: ' . $name . ' <' . $fromAddress . '>',
    'X-Mailer: PHP/' . phpversion(),
];

$encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
$sent = @mail($notifyEmail, $encodedSubject, $body, implode("\r\n", $headers));

if (!$sent) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Mail send failed']);
    exit;
}

echo json_encode(['success' => true]);
