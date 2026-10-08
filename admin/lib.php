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

/* ---------------- Roles ---------------- */

const ROLE_SUPER = "super";
const ROLE_ADMIN = "admin";

/** Editor keys the limited "admin" role may touch (gallery/media is allowed too). */
const ADMIN_EDITOR_KEYS = ["home", "pricing", "contact-topics"];

/** All accounts: login => ["password_hash" => ..., "role" => "super"|"admin"]. */
function users(): array
{
    $cfg = config();
    if (!empty($cfg["users"]) && is_array($cfg["users"])) {
        return $cfg["users"];
    }
    // Legacy single-user config.
    if (!empty($cfg["admin_user"])) {
        return [(string)$cfg["admin_user"] => [
            "password_hash" => (string)($cfg["admin_password_hash"] ?? ""),
            "role" => ROLE_SUPER,
        ]];
    }
    return [];
}

function current_role(): string
{
    return ($_SESSION["role"] ?? ROLE_ADMIN) === ROLE_SUPER ? ROLE_SUPER : ROLE_ADMIN;
}

function is_super(): bool
{
    return current_role() === ROLE_SUPER;
}

/** Content editors this session may open. */
function accessible_editors(array $editors): array
{
    if (is_super()) {
        return $editors;
    }
    return array_filter($editors, fn($k) => in_array($k, ADMIN_EDITOR_KEYS, true), ARRAY_FILTER_USE_KEY);
}

function can_edit(string $key): bool
{
    return is_super() || in_array($key, ADMIN_EDITOR_KEYS, true);
}

function deny_access(string $msg = "You don't have access to this page."): never
{
    http_response_code(403);
    exit("<!doctype html><meta charset=\"utf-8\"><title>403</title>"
        . "<body style=\"font-family:system-ui;padding:40px\"><h2>403 — Forbidden</h2>"
        . "<p>" . e($msg) . "</p><p><a href=\"index.php\">Back to dashboard</a></p></body>");
}

function require_login(): void
{
    if (empty($_SESSION["admin_user"])) {
        header("Location: login.php");
        exit;
    }
    if (!isset($_SESSION["role"])) {
        // Session created before roles existed — resolve from config, default to least privilege.
        $acct = users()[(string)$_SESSION["admin_user"]] ?? null;
        $_SESSION["role"] = ($acct["role"] ?? ROLE_ADMIN) === ROLE_SUPER ? ROLE_SUPER : ROLE_ADMIN;
    }
}

function check_login(string $user, string $pass): bool
{
    $acct = users()[$user] ?? null;
    $hash = (string)($acct["password_hash"] ?? "");
    $ok = $acct !== null && $hash !== "" && password_verify($pass, $hash);
    if ($ok) {
        session_regenerate_id(true);
        $_SESSION["admin_user"] = $user;
        $_SESSION["role"] = ($acct["role"] ?? ROLE_ADMIN) === ROLE_SUPER ? ROLE_SUPER : ROLE_ADMIN;
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

/* ---------------- GitHub API ---------------- */

function gh_api(string $method, string $path, array $body = null): array
{
    $cfg = config();
    $url = "https://api.github.com/repos/{$cfg["github_repo"]}/{$path}";
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
        $msg = $data["message"] ?? "unknown error";
        throw new RuntimeException("GitHub API (HTTP {$status}) at {$path}: {$msg}");
    }
    return $data;
}

/** Contents API (file-level GET/PUT/DELETE) */
function gh_request(string $method, string $path, array $body = null): array
{
    return gh_api($method, "contents/{$path}", $body);
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

/* ---------------- Multi-file commit (Git Data API) ---------------- */

/**
 * Commit several files in ONE commit (triggers a single workflow run).
 * $files = [ ["path" => "src/content/site.json", "content" => "...", "binary" => false], ... ]
 * Binary files: pass raw bytes with "binary" => true.
 */
function gh_commit_files(array $files, string $message): void
{
    if (!$files) {
        return;
    }
    $cfg = config();
    if (!empty($cfg["local_root"])) {
        foreach ($files as $f) {
            $full = rtrim($cfg["local_root"], "/\\") . DIRECTORY_SEPARATOR . str_replace("/", DIRECTORY_SEPARATOR, $f["path"]);
            $dir = dirname($full);
            if (!is_dir($dir)) {
                mkdir($dir, 0775, true);
            }
            file_put_contents($full, $f["content"]);
        }
        return;
    }

    $branch = (string)$cfg["github_branch"];
    $ref = gh_api("GET", "git/ref/heads/" . $branch);
    $headSha = (string)$ref["object"]["sha"];
    $headCommit = gh_api("GET", "git/commits/" . $headSha);
    $baseTree = (string)$headCommit["tree"]["sha"];

    $entries = [];
    foreach ($files as $f) {
        $entry = ["path" => $f["path"], "mode" => "100644", "type" => "blob"];
        if (!empty($f["binary"])) {
            $blob = gh_api("POST", "git/blobs", [
                "content" => base64_encode($f["content"]),
                "encoding" => "base64",
            ]);
            $entry["sha"] = $blob["sha"];
        } else {
            $entry["content"] = $f["content"];
        }
        $entries[] = $entry;
    }

    $tree = gh_api("POST", "git/trees", [
        "base_tree" => $baseTree,
        "tree" => $entries,
    ]);
    $commit = gh_api("POST", "git/commits", [
        "message" => $message,
        "tree" => $tree["sha"],
        "parents" => [$headSha],
    ]);
    // Note: GET uses singular "git/ref", update uses plural "git/refs".
    gh_api("PATCH", "git/refs/heads/" . $branch, ["sha" => $commit["sha"]]);
}

/* ---------------- Drafts (staged edits, published by deploy.php) ---------------- */

const DRAFT_DIR = __DIR__ . "/drafts";
const STAGING_DIR = __DIR__ . "/staging";

function draft_path(string $key): string
{
    if (!preg_match('/^[a-z0-9-]+$/', $key)) {
        throw new RuntimeException("Invalid draft key.");
    }
    return DRAFT_DIR . "/" . $key . ".json";
}

function load_draft(string $key): ?string
{
    $path = draft_path($key);
    return is_file($path) ? (string)file_get_contents($path) : null;
}

function save_draft(string $key, string $json): void
{
    if (!is_dir(DRAFT_DIR)) {
        mkdir(DRAFT_DIR, 0775, true);
    }
    file_put_contents(draft_path($key), $json);
}

function delete_draft(string $key): void
{
    $path = draft_path($key);
    if (is_file($path)) {
        unlink($path);
    }
}

/** Clear drafts. Pass an array of keys to clear only those (used to protect other admins' drafts). */
function clear_drafts(?array $keys = null): void
{
    if ($keys === null) {
        foreach (glob(DRAFT_DIR . "/*.json") ?: [] as $path) {
            unlink($path);
        }
        return;
    }
    foreach ($keys as $key) {
        delete_draft($key);
    }
}

/**
 * True when a draft exists AND differs from what is currently live.
 * $liveContent is the repo file contents (null = file missing).
 */
function draft_differs(string $key, ?string $liveContent): bool
{
    $draft = load_draft($key);
    if ($draft === null) {
        return false;
    }
    if ($liveContent === null) {
        return true;
    }
    $a = json_decode($draft, true);
    $b = json_decode($liveContent, true);
    if ($a === null || $b === null) {
        return $draft !== $liveContent;
    }
    return $a != $b; // loose: key order/formatting differences don't count as changes
}

/** Recursively list staged files. Returns [ ["rel" => "public/gallery/x.jpg", "full" => "/abs/path", "size" => 123], ... ] */
function staged_files(): array
{
    $out = [];
    if (!is_dir(STAGING_DIR)) {
        return $out;
    }
    $it = new RecursiveIteratorIterator(
        new RecursiveDirectoryIterator(STAGING_DIR, FilesystemIterator::SKIP_DOTS)
    );
    foreach ($it as $file) {
        if (!$file->isFile() || $file->getFilename() === ".htaccess" || $file->getFilename() === ".gitignore") {
            continue;
        }
        $full = $file->getPathname();
        $rel = ltrim(str_replace("\\", "/", substr($full, strlen(STAGING_DIR))), "/");
        $out[] = ["rel" => $rel, "full" => $full, "size" => (int)$file->getSize()];
    }
    usort($out, fn($a, $b) => strcmp($a["rel"], $b["rel"]));
    return $out;
}

function stage_file(string $relTarget, string $content): void
{
    if (!preg_match('#^[a-z0-9._/-]+$#i', $relTarget) || str_contains($relTarget, "..")) {
        throw new RuntimeException("Invalid staging path.");
    }
    $full = STAGING_DIR . "/" . $relTarget;
    $dir = dirname($full);
    if (!is_dir($dir)) {
        mkdir($dir, 0775, true);
    }
    file_put_contents($full, $content);
}

function clear_staging(): void
{
    foreach (staged_files() as $f) {
        unlink($f["full"]);
    }
}

/** Unlink a staged file by repo-relative path (e.g. "public/gallery/x.jpg"). */
function unstage_file(string $rel): void
{
    $full = STAGING_DIR . "/" . $rel;
    if (is_file($full)) {
        unlink($full);
    }
}
