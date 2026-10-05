<?php
declare(strict_types=1);
require __DIR__ . "/lib.php";
require_login();

const MEDIA_DIR = "public/gallery";
const MAX_UPLOAD = 5242880; // 5MB — staged locally, committed as one blob per deploy
const ALLOWED = ["jpg", "jpeg", "png", "webp", "avif", "svg", "mp4", "webm"];
const IMAGE_FOLDERS = [
    "gallery", "hero", "blogs", "cleaningoffers", "howitworks",
    "ourServices", "ServicesDetails", "testimonials", "about", "FAQS", "pricing",
];
const IMAGE_RE = '/\.(jpe?g|png|webp|avif|svg)$/i';
const MEDIA_RE = '/\.(jpe?g|png|webp|avif|svg|mp4|webm|mov)$/i';

function folder_param(string $default = "gallery"): string
{
    $f = (string)($_REQUEST["folder"] ?? $default);
    return in_array($f, IMAGE_FOLDERS, true) ? $f : $default;
}

function respond(array $data, int $status = 200): never
{
    http_response_code($status);
    header("Content-Type: application/json");
    echo json_encode($data, JSON_UNESCAPED_SLASHES);
    exit;
}

$flash = $_SESSION["flash"] ?? null;
unset($_SESSION["flash"]);
$error = (string)($_SESSION["flash_error"] ?? "");
unset($_SESSION["flash_error"]);
$wantsJson = ($_POST["format"] ?? "") === "json";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    csrf_check();
    $action = (string)($_POST["action"] ?? "");
    try {
        if ($action === "upload") {
            $folder = folder_param();
            $file = $_FILES["file"] ?? null;
            if (!$file || ($file["error"] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK) {
                throw new RuntimeException("Upload failed (PHP error " . (int)($file["error"] ?? -1) . ").");
            }
            if ($file["size"] > MAX_UPLOAD) {
                throw new RuntimeException("File is larger than 5 MB. Compress it first.");
            }
            $name = strtolower(trim((string)$file["name"]));
            $name = preg_replace('/[^a-z0-9._-]+/', "-", $name) ?? "";
            $name = ltrim($name, "-.");
            $ext = strtolower(pathinfo($name, PATHINFO_EXTENSION));
            if ($name === "" || !in_array($ext, ALLOWED, true)) {
                throw new RuntimeException("Only jpg, jpeg, png, webp, avif, svg, mp4, webm files are allowed.");
            }
            $content = file_get_contents($file["tmp_name"]);
            if ($content === false) {
                throw new RuntimeException("Could not read the uploaded file.");
            }
            stage_file("public/" . $folder . "/" . $name, $content);
            $path = "/" . $folder . "/" . $name;
            if ($wantsJson) {
                respond([
                    "ok" => true,
                    "path" => $path,
                    "folder" => $folder,
                    "thumb" => "media.php?action=preview&f=" . urlencode("public/" . $folder . "/" . $name),
                ]);
            }
            $_SESSION["flash"] = "Uploaded {$name} to {$folder} — it's staged and goes live with your next Deploy.";
        } elseif ($action === "delete") {
            $folder = folder_param();
            $name = basename((string)($_POST["name"] ?? ""));
            if (!preg_match('/^[a-z0-9._-]+$/i', $name)) {
                throw new RuntimeException("Invalid file name.");
            }
            $rel = "public/" . $folder . "/" . $name;
            if (is_file(STAGING_DIR . "/" . $rel)) {
                unstage_file($rel); // never published — just drop the staged copy
                if ($wantsJson) {
                    respond(["ok" => true]);
                }
                $_SESSION["flash"] = "Removed staged file {$name}.";
            } else {
                gh_delete_file($rel, "media: delete {$folder}/{$name} [skip ci]");
                if ($wantsJson) {
                    respond(["ok" => true]);
                }
                $_SESSION["flash"] = "Deleted {$name} from the repo. It disappears from the site on the next publish.";
            }
        }
    } catch (Throwable $e) {
        if ($wantsJson) {
            respond(["ok" => false, "error" => $e->getMessage()], 500);
        }
        $_SESSION["flash_error"] = $e->getMessage();
    }
    header("Location: media.php?folder=" . urlencode($folder ?? "gallery"));
    exit;
}

// Authenticated preview of a staged file (staging dir is blocked by .htaccess).
if (($_GET["action"] ?? "") === "preview") {
    $rel = (string)($_GET["f"] ?? "");
    if (!preg_match('#^[a-z0-9._/-]+$#i', $rel) || str_contains($rel, "..")) {
        http_response_code(404);
        exit;
    }
    $full = realpath(STAGING_DIR . "/" . $rel);
    $base = realpath(STAGING_DIR);
    if ($full === false || $base === false || !str_starts_with($full, $base) || !is_file($full)) {
        http_response_code(404);
        exit;
    }
    $ext = strtolower(pathinfo($full, PATHINFO_EXTENSION));
    $types = ["jpg" => "image/jpeg", "jpeg" => "image/jpeg", "png" => "image/png", "webp" => "image/webp", "avif" => "image/avif", "svg" => "image/svg+xml", "mp4" => "video/mp4", "webm" => "video/webm"];
    header("Content-Type: " . ($types[$ext] ?? "application/octet-stream"));
    header("Content-Length: " . (string)filesize($full));
    header("Cache-Control: private, no-store");
    readfile($full);
    exit;
}

// JSON catalogue for the image picker on edit pages.
if (($_GET["action"] ?? "") === "list-json") {
    $images = [];
    foreach (IMAGE_FOLDERS as $folder) {
        try {
            $entries = gh_list_dir("public/" . $folder);
        } catch (Throwable $e) {
            continue;
        }
        foreach ($entries as $entry) {
            if (($entry["type"] ?? "") !== "file") {
                continue;
            }
            $name = (string)$entry["name"];
            if (!preg_match(IMAGE_RE, $name)) {
                continue;
            }
            $images["/" . $folder . "/" . $name] = [
                "path" => "/" . $folder . "/" . $name,
                "folder" => $folder,
                "staged" => false,
                "thumb" => "/" . $folder . "/" . rawurlencode($name),
            ];
        }
    }
    foreach (staged_files() as $s) {
        if (!preg_match(IMAGE_RE, $s["rel"])) {
            continue;
        }
        $sitePath = "/" . substr($s["rel"], strlen("public/"));
        $images[$sitePath] = [
            "path" => $sitePath,
            "folder" => dirname($s["rel"]) === "public" ? "" : substr(dirname($s["rel"]), strlen("public/")),
            "staged" => true,
            "thumb" => "media.php?action=preview&f=" . urlencode($s["rel"]),
        ];
    }
    $list = array_values($images);
    usort($list, fn($a, $b) => strcmp($a["path"], $b["path"]));
    respond(["folders" => IMAGE_FOLDERS, "images" => $list]);
}

/* ------------- HTML page ------------- */

$folder = folder_param();
try {
    $entries = gh_list_dir("public/" . $folder);
} catch (Throwable $e) {
    $entries = [];
    $error = $error ?: ("Could not list media: " . $e->getMessage());
}

$byName = [];
foreach ($entries as $entry) {
    if (($entry["type"] ?? "") !== "file") {
        continue;
    }
    $name = (string)$entry["name"];
    if (preg_match(MEDIA_RE, $name)) {
        $entry["staged"] = false;
        $byName[$name] = $entry;
    }
}
foreach (staged_files() as $s) {
    if (dirname($s["rel"]) !== "public/" . $folder) {
        continue;
    }
    if (!preg_match(MEDIA_RE, $s["rel"])) {
        continue;
    }
    $byName[basename($s["rel"])] = [
        "name" => basename($s["rel"]),
        "path" => $s["rel"],
        "staged" => true,
        "size" => $s["size"],
    ];
}
$files = array_values($byName);
usort($files, fn($a, $b) => strcmp($a["name"], $b["name"]));
$stagedCount = count(array_filter($files, fn($f) => $f["staged"] ?? false));
?>
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<title>Media — Precise Admin</title>
<link rel="stylesheet" href="assets/admin.css">
</head>
<body>
<header class="topbar">
  <div class="wrap">
    <strong><a href="index.php" class="plain">Precise Admin</a> / Media</strong>
    <nav>
      <a href="deploy.php">Deploy<?= $stagedCount ? " (" . $stagedCount . ")" : "" ?></a>
      <a href="index.php">Dashboard</a>
      <a href="logout.php">Log out</a>
    </nav>
  </div>
</header>

<main class="wrap">
  <?php if ($flash): ?><div class="alert ok"><?= e($flash) ?></div><?php endif; ?>
  <?php if ($error): ?><div class="alert error"><?= e($error) ?></div><?php endif; ?>

  <div class="notice">
    Files are stored in <code>public/&lt;folder&gt;</code> — <strong>any filename works</strong>.
    Max <strong>5 MB</strong> per file. Uploads are <strong>staged</strong> and go live together
    with your next <a href="deploy.php">Deploy</a> (2–3 min).
  </div>

  <nav class="folder-tabs">
    <?php foreach (IMAGE_FOLDERS as $f): ?>
      <a class="folder-tab<?= $f === $folder ? " active" : "" ?>" href="media.php?folder=<?= e(urlencode($f)) ?>"><?= e($f) ?></a>
    <?php endforeach; ?>
  </nav>

  <form method="post" enctype="multipart/form-data" class="upload-bar">
    <input type="hidden" name="csrf" value="<?= e(csrf_token()) ?>">
    <input type="hidden" name="action" value="upload">
    <input type="hidden" name="folder" value="<?= e($folder) ?>">
    <strong>Upload to <?= e($folder) ?>/</strong>
    <input type="file" name="file" accept=".jpg,.jpeg,.png,.webp,.avif,.svg,.mp4,.webm" required>
    <button class="btn primary" type="submit">Upload (staged)</button>
  </form>

  <div class="media-grid">
    <?php foreach ($files as $f): $name = (string)$f["name"]; $isVideo = preg_match('/\.(mp4|webm|mov)$/i', $name); $isStaged = !empty($f["staged"]); $src = $isStaged
        ? "media.php?action=preview&f=" . urlencode((string)$f["path"])
        : "/" . $folder . "/" . rawurlencode($name); ?>
      <div class="media-card<?= $isStaged ? " is-staged" : "" ?>">
        <?php if ($isVideo): ?>
          <video src="<?= e($src) ?>" muted></video>
        <?php else: ?>
          <img src="<?= e($src) ?>" alt="<?= e($name) ?>" loading="lazy">
        <?php endif; ?>
        <div class="media-meta">
          <span class="mono" title="<?= e($name) ?>"><?= e($name) ?></span>
          <?php if ($isStaged): ?><span class="chip">staged</span><?php endif; ?>
          <form method="post" action="media.php?folder=<?= e(urlencode($folder)) ?>" onsubmit="return confirm('Delete <?= e(str_replace("'", "\\'", $name)) ?>?');">
            <input type="hidden" name="csrf" value="<?= e(csrf_token()) ?>">
            <input type="hidden" name="action" value="delete">
            <input type="hidden" name="folder" value="<?= e($folder) ?>">
            <input type="hidden" name="name" value="<?= e($name) ?>">
            <button class="btn danger small" type="submit">Delete</button>
          </form>
        </div>
      </div>
    <?php endforeach; ?>
    <?php if (!$files): ?><p class="muted">No files in this folder (or GitHub is unreachable).</p><?php endif; ?>
  </div>
</main>
</body>
</html>
