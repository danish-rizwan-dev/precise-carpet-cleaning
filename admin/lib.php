<?php
declare(strict_types=1);

define("ADMIN_ROOT", __DIR__);

session_set_cookie_params([
    "httponly" => true,
    "samesite" => "Lax",
    "secure" => !empty($_SERVER["HTTPS"]) && $_SERVER["HTTPS"] !== "off",
]);
session_start();

function config(): array
{
    static $cfg = null;
    if ($cfg === null) {
        $path = ADMIN_ROOT . "/config.php";
        if (!is_file($path)) {
            http_response_code(500);
            exit("Admin config missing. Copy config.example.php to config.php.");
        }
        $cfg = require $path;
    }
    return $cfg;
}

function e(?string $v): string
{
    return htmlspecialchars((string)$v, ENT_QUOTES, "UTF-8");
}

function require_login(): void
{
    if (empty($_SESSION["admin_user"])) {
        header("Location: login.php");
        exit;
    }
}

function check_login(string $user, string $pass): bool
{
    $cfg = config();
    $ok = hash_equals((string)$cfg["admin_user"], $user)
        && password_verify($pass, (string)$cfg["admin_password_hash"]);
    if ($ok) {
        session_regenerate_id(true);
        $_SESSION["admin_user"] = $user;
        $_SESSION["attempts"] = 0;
    } else {
        $_SESSION["attempts"] = ((int)($_SESSION["attempts"] ?? 0)) + 1;
        sleep(1);
    }
    return $ok;
}

function csrf_token(): string
{
    if (empty($_SESSION["csrf"])) {
        $_SESSION["csrf"] = bin2hex(random_bytes(16));
    }
    return $_SESSION["csrf"];
}

function csrf_check(): void
{
    $sent = $_POST["csrf"] ?? "";
    if (!is_string($sent) || !hash_equals(csrf_token(), $sent)) {
        http_response_code(403);
        exit("Invalid CSRF token. Go back and try again.");
    }
}

/* ---------------- GitHub Contents API ---------------- */

function gh_request(string $method, string $path, array $body = null): array
{
    $cfg = config();
    $url = "https://api.github.com/repos/{$cfg["github_repo"]}/contents/{$path}";
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_CUSTOMREQUEST => $method,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTPHEADER => [
            "Accept: application/vnd.github+json",
            "X-GitHub-Api-Version: 2022-11-28",
            "Authorization: Bearer " . $cfg["github_token"],
            "User-Agent: precise-admin",
        ],
        CURLOPT_POSTFIELDS => $body === null ? null : json_encode($body),
    ]);
    $res = curl_exec($ch);
    $status = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $err = curl_error($ch);
    curl_close($ch);

    if ($res === false) {
        throw new RuntimeException("GitHub API error: {$err}");
    }
    $data = json_decode((string)$res, true) ?? [];
    if ($status < 200 || $status >= 300) {
        $msg = $data["message"] ?? "HTTP {$status}";
        throw new RuntimeException("GitHub API: {$msg}");
    }
    return $data;
}

/** Returns [decoded content (string) or null, sha (string) or null] */
function gh_get_file(string $path): array
{
    $cfg = config();
    if (!empty($cfg["local_root"])) {
        $full = rtrim($cfg["local_root"], "/\\") . DIRECTORY_SEPARATOR . str_replace("/", DIRECTORY_SEPARATOR, $path);
        if (!is_file($full)) {
            return [null, null];
        }
        return [(string)file_get_contents($full), null];
    }
    try {
        $data = gh_request("GET", $path . "?ref=" . urlencode($cfg["github_branch"]));
    } catch (RuntimeException $e) {
        if (str_contains($e->getMessage(), "HTTP 404")) {
            return [null, null];
        }
        throw $e;
    }
    $content = isset($data["content"]) ? base64_decode(str_replace("\n", "", $data["content"])) : null;
    return [$content, $data["sha"] ?? null];
}

function gh_put_file(string $path, string $content, string $message): void
{
    $cfg = config();
    if (!empty($cfg["local_root"])) {
        $full = rtrim($cfg["local_root"], "/\\") . DIRECTORY_SEPARATOR . str_replace("/", DIRECTORY_SEPARATOR, $path);
        $dir = dirname($full);
        if (!is_dir($dir)) {
            mkdir($dir, 0775, true);
        }
        file_put_contents($full, $content);
        return;
    }
    [, $sha] = gh_get_file($path);
    $body = [
        "message" => $message,
        "content" => base64_encode($content),
        "branch" => $cfg["github_branch"],
    ];
    if ($sha !== null) {
        $body["sha"] = $sha;
    }
    gh_request("PUT", $path, $body);
}

function gh_delete_file(string $path, string $message): void
{
    $cfg = config();
    if (!empty($cfg["local_root"])) {
        $full = rtrim($cfg["local_root"], "/\\") . DIRECTORY_SEPARATOR . str_replace("/", DIRECTORY_SEPARATOR, $path);
        if (is_file($full)) {
            unlink($full);
        }
        return;
    }
    [, $sha] = gh_get_file($path);
    if ($sha === null) {
        return;
    }
    gh_request("DELETE", $path, [
        "message" => $message,
        "sha" => $sha,
        "branch" => $cfg["github_branch"],
    ]);
}

/** List a directory: returns array of ['name','path','type','sha','size','download_url'] */
function gh_list_dir(string $path): array
{
    $cfg = config();
    if (!empty($cfg["local_root"])) {
        $full = rtrim($cfg["local_root"], "/\\") . DIRECTORY_SEPARATOR . str_replace("/", DIRECTORY_SEPARATOR, $path);
        $out = [];
        if (is_dir($full)) {
            foreach (scandir($full) ?: [] as $name) {
                if ($name === "." || $name === "..") {
                    continue;
                }
                $out[] = [
                    "name" => $name,
                    "path" => $path . "/" . $name,
                    "type" => is_dir($full . DIRECTORY_SEPARATOR . $name) ? "dir" : "file",
                    "size" => (int)@filesize($full . DIRECTORY_SEPARATOR . $name),
                ];
            }
        }
        return $out;
    }
    $data = gh_request("GET", $path . "?ref=" . urlencode($cfg["github_branch"]));
    return is_array($data) ? $data : [];
}

/* ---------------- Content file helpers ---------------- */

function load_json_file(string $repoPath): array
{
    [$content] = gh_get_file($repoPath);
    if ($content === null) {
        throw new RuntimeException("File not found in repo: {$repoPath}");
    }
    $data = json_decode($content, true);
    if (!is_array($data)) {
        throw new RuntimeException("Invalid JSON in {$repoPath}");
    }
    return $data;
}

function encode_json(array $data): string
{
    $flags = JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE;
    $json = json_encode($data, $flags);
    if ($json === false) {
        throw new RuntimeException("JSON encode failed: " . json_last_error_msg());
    }
    // Repo files are 2-space indented (node style); PHP pretty-prints with 4.
    $lines = explode("\n", $json);
    foreach ($lines as $i => $line) {
        if (preg_match('/^( +)/', $line, $m)) {
            $n = strlen($m[1]);
            $lines[$i] = str_repeat(" ", intdiv($n, 2)) . substr($line, $n);
        }
    }
    return implode("\n", $lines) . "\n";
}
