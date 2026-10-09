<?php
/**
 * Website form -> business email endpoint.
 *
 * Receives JSON POSTs from the site's forms and forwards the details to the
 * business inbox via PHP mail() on cPanel. Lives in public/ so the Next.js
 * static export copies it to out/api/contact.php and the FTP deploy uploads
 * it with the rest of the site.
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

const RECIPIENT = 'Enquiries@precisecarpetcleaning.com.au';
const FROM_HEADER = 'Precise Carpet Cleaning Website <enquiries@precisecarpetcleaning.com.au>';
const MAX_BODY_CHARS = 8000;
const RATE_LIMIT_HITS = 5;
const RATE_LIMIT_WINDOW = 600; // seconds

// 252x82 PNG of public/logo.svg (generated with sharp, palette-compressed).
const LOGO_B64 = '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';

function respond(int $status, array $payload): void
{
    http_response_code($status);
    echo json_encode($payload);
    exit;
}

function single_line(string $value): string
{
    // Prevent header injection: strip CR/LF and trim.
    return trim(str_replace(["\r", "\n"], ' ', $value));
}

function rate_limited(string $ip): bool
{
    $dir = rtrim(sys_get_temp_dir(), DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR . 'pcc-contact';
    if (!is_dir($dir) && !@mkdir($dir, 0700, true)) {
        return false; // Can't throttle -> don't block legitimate mail.
    }

    $file = $dir . DIRECTORY_SEPARATOR . md5($ip) . '.json';
    $now = time();
    $hits = [];

    $raw = @file_get_contents($file);
    if ($raw !== false) {
        $decoded = json_decode($raw, true);
        if (is_array($decoded)) {
            $hits = $decoded;
        }
    }

    $hits = array_values(array_filter($hits, static fn($t) => is_int($t) && ($now - $t) < RATE_LIMIT_WINDOW));

    if (count($hits) >= RATE_LIMIT_HITS) {
        return true;
    }

    $hits[] = $now;
    @file_put_contents($file, json_encode($hits), LOCK_EX);
    return false;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    respond(405, ['ok' => false, 'error' => 'Method not allowed']);
}

$raw = file_get_contents('php://input');
$data = json_decode($raw === false ? '' : $raw, true);
if (!is_array($data)) {
    respond(400, ['ok' => false, 'error' => 'Invalid request body']);
}

// Honeypot: real visitors never fill this hidden field. Pretend success.
$honeypot = isset($data['website']) ? (string) $data['website'] : '';
if (trim($honeypot) !== '') {
    respond(200, ['ok' => true]);
}

$subject = single_line(isset($data['subject']) ? (string) $data['subject'] : '');
$body = isset($data['body']) ? (string) $data['body'] : '';
$replyTo = single_line(isset($data['replyTo']) ? (string) $data['replyTo'] : '');

$body = str_replace(["\r\n", "\r"], "\n", $body);
$body = trim($body);

if ($subject === '' || $body === '') {
    respond(400, ['ok' => false, 'error' => 'Missing subject or message']);
}
if (mb_strlen($subject) > 200 || mb_strlen($body) > MAX_BODY_CHARS) {
    respond(400, ['ok' => false, 'error' => 'Payload too large']);
}

$ip = (string) ($_SERVER['REMOTE_ADDR'] ?? 'unknown');
if (rate_limited($ip)) {
    respond(429, ['ok' => false, 'error' => 'Too many submissions, please try again shortly']);
}

$headers = [
    'From: ' . FROM_HEADER,
    'Content-Type: text/plain; charset=UTF-8',
    'X-Mailer: PHP/' . PHP_VERSION,
];
if ($replyTo !== '' && filter_var($replyTo, FILTER_VALIDATE_EMAIL)) {
    $headers[] = 'Reply-To: ' . $replyTo;
}

$sent = @mail(RECIPIENT, '=?UTF-8?B?' . base64_encode($subject) . '?=', $body, implode("\r\n", $headers));

if (!$sent) {
    respond(500, ['ok' => false, 'error' => 'Could not send email']);
}

// Auto-reply: branded HTML confirmation (embedded logo) to the visitor's email.
if ($replyTo !== '' && filter_var($replyTo, FILTER_VALIDATE_EMAIL)) {
    $ackSubject = '=?UTF-8?B?' . base64_encode('We received your enquiry - Precise Carpet Cleaning') . '?=';

    $textBody = implode("\n", [
        "Hi,",
        "",
        "Thanks for getting in touch with Precise Carpet Cleaning Services.",
        "We've received your enquiry and one of our team will get back to you",
        "as soon as possible, usually within one business day.",
        "",
        "If it's urgent, feel free to call us on 0434 161 161.",
        "",
        "------------------------------",
        "Your submission:",
        "------------------------------",
        $body,
        "------------------------------",
        "",
        "Precise Carpet Cleaning Services",
        "enquiries@precisecarpetcleaning.com.au",
        "0434 161 161",
    ]);

    $logoB64 = LOGO_B64;
    $submissionHtml = htmlspecialchars($body, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
    $submissionHtml = nl2br($submissionHtml);

    $htmlBody = '<!DOCTYPE html>'
        . '<html><body style="margin:0;padding:0;background-color:#f4f4f5;font-family:Arial,Helvetica,sans-serif;">'
        . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;padding:24px 0;">'
        . '<tr><td align="center">'
        . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background-color:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e5e5e5;">'
        . '<tr><td style="background-color:#0b4255;padding:28px 32px;text-align:center;">'
        . '<img src="cid:logo" alt="Precise Carpet Cleaning Services" width="252" style="display:block;margin:0 auto;border:0;max-width:100%;height:auto;">'
        . '</td></tr>'
        . '<tr><td style="padding:32px;">'
        . '<h1 style="margin:0 0 12px;font-size:22px;color:#171206;">Thanks for getting in touch!</h1>'
        . '<p style="margin:0 0 16px;font-size:15px;line-height:24px;color:#5B5955;">'
        . 'We\'ve received your enquiry and one of our team will get back to you as soon as possible, usually within one business day.'
        . '</p>'
        . '<p style="margin:0 0 24px;font-size:15px;line-height:24px;color:#5B5955;">'
        . 'If it\'s urgent, feel free to call us on <strong style="color:#171206;">0434 161 161</strong>.'
        . '</p>'
        . '<p style="margin:0 0 8px;font-size:13px;font-weight:bold;color:#171206;">Your submission:</p>'
        . '<div style="background-color:#FAFAFA;border:1px solid #e5e5e5;border-radius:12px;padding:16px;font-size:14px;line-height:22px;color:#171206;white-space:pre-wrap;">'
        . $submissionHtml
        . '</div>'
        . '</td></tr>'
        . '<tr><td style="background-color:#0b4255;padding:20px 32px;text-align:center;">'
        . '<p style="margin:0;font-size:13px;line-height:20px;color:#ffffff;">'
        . 'Precise Carpet Cleaning Services<br>'
        . '<a href="mailto:enquiries@precisecarpetcleaning.com.au" style="color:#FEBF03;text-decoration:none;">enquiries@precisecarpetcleaning.com.au</a>'
        . ' &nbsp;|&nbsp; 0434 161 161'
        . '</p>'
        . '</td></tr>'
        . '</table>'
        . '</td></tr></table>'
        . '</body></html>';

    $altBoundary = 'alt_' . bin2hex(random_bytes(8));
    $relBoundary = 'rel_' . bin2hex(random_bytes(8));

    $ackBody = "--{$relBoundary}\r\n"
        . "Content-Type: multipart/alternative; boundary=\"{$altBoundary}\"\r\n\r\n"
        . "--{$altBoundary}\r\n"
        . "Content-Type: text/plain; charset=UTF-8\r\n\r\n"
        . $textBody . "\r\n\r\n"
        . "--{$altBoundary}\r\n"
        . "Content-Type: text/html; charset=UTF-8\r\n\r\n"
        . $htmlBody . "\r\n\r\n"
        . "--{$altBoundary}--\r\n\r\n"
        . "--{$relBoundary}\r\n"
        . "Content-Type: image/png; name=\"logo.png\"\r\n"
        . "Content-Transfer-Encoding: base64\r\n"
        . "Content-ID: <logo>\r\n"
        . "Content-Disposition: inline; filename=\"logo.png\"\r\n\r\n"
        . chunk_split($logoB64, 76, "\r\n")
        . "--{$relBoundary}--";

    $ackHeaders = [
        'From: ' . FROM_HEADER,
        'Reply-To: enquiries@precisecarpetcleaning.com.au',
        'MIME-Version: 1.0',
        'Content-Type: multipart/related; boundary="' . $relBoundary . '"',
        'X-Mailer: PHP/' . PHP_VERSION,
    ];

    @mail($replyTo, $ackSubject, $ackBody, implode("\r\n", $ackHeaders));
}

respond(200, ['ok' => true]);
