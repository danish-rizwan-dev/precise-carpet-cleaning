<?php
declare(strict_types=1);
require __DIR__ . "/lib.php";
require_login();

const MEDIA_DIR = "public/gallery";
const MAX_UPLOAD = 1048576; // 1MB — safe for the GitHub content API
const ALLOWED = ["jpg", "jpeg", "png", "webp", "avif", "mp4", "webm"];

$flash = $_SESSION["flash"] ?? null;
unset($_SESSION["flash"]);
$error = (string)($_SESSION["flash_error"] ?? "");
unset($_SESSION["flash_error"]);

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    csrf_check();
    $action = (string)($_POST["action"] ?? "");
    try {
        if ($action === "upload") {
            $file = $_FILES["file"] ?? null;
            if (!$file || ($file["error"] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK) {
                throw new RuntimeException("Upload failed (PHP error " . (int)($file["error"] ?? -1) . ").");
            }
            if ($file["size"] > MAX_UPLOAD) {
                throw new RuntimeException("File is larger than 1 MB. Compress it first.");
            }
            $name = strtolower(trim((string)$file["name"]));
            $name = preg_replace('/[^a-z0-9._-]+/', "-", $name) ?? "";
            $name = ltrim($name, "-.");
            $ext = strtolower(pathinfo($name, PATHINFO_EXTENSION));
            if ($name === "" || !in_array($ext, ALLOWED, true)) {
                throw new RuntimeException("Only jpg, jpeg, png, webp, avif, mp4, webm files are allowed.");
            }
            $content = file_get_contents($file["tmp_name"]);
            if ($content === false) {
                throw new RuntimeException("Could not read the uploaded file.");
            }
            gh_put_file(MEDIA_DIR . "/" . $name, $content, "media: add {$name}");
            $_SESSION["flash"] = "Uploaded {$name}. It will appear on the site after the next publish (2–3 min).";
        } elseif ($action === "delete") {
            $name = basename((string)($_POST["name"] ?? ""));
            if (!preg_match('/^[a-z0-9._-]+$/i', $name)) {
                throw new RuntimeException("Invalid file name.");
            }
            gh_delete_file(MEDIA_DIR . "/" . $name, "media: delete {$name}");
            $_SESSION["flash"] = "Deleted {$name}. Changes go live after the next publish (2–3 min).";
        }
    } catch (Throwable $e) {
        $_SESSION["flash_error"] = $e->getMessage();
    }
    header("Location: media.php");
    exit;
}

try {
    $entries = gh_list_dir(MEDIA_DIR);
} catch (Throwable $e) {
    $entries = [];
    $error = $error ?: ("Could not list media: " . $e->getMessage());
}

$files = [];
foreach ($entries as $entry) {
    if (($entry["type"] ?? "") !== "file") {
        continue;
    }
    $name = (string)$entry["name"];
    if (preg_match('/\.(jpe?g|png|webp|avif|mp4|webm|mov)$/i', $name)) {
        $files[] = $entry;
    }
}
usort($files, fn($a, $b) => strcmp($a["name"], $b["name"]));
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
      <a href="index.php">Dashboard</a>
      <a href="logout.php">Log out</a>
    </nav>
  </div>
</header>

<main class="wrap">
  <?php if ($flash): ?><div class="alert ok"><?= e($flash) ?></div><?php endif; ?>
  <?php if ($error): ?><div class="alert error"><?= e($error) ?></div><?php endif; ?>

  <div class="notice">
    Gallery files live in <code>public/gallery</code>. Photos must be named
    <code>gallery-NN.jpeg</code> (any image name works — the gallery lists all images).
    Max <strong>1 MB</strong> per file. Uploads publish with the next build (2–3 min).
  </div>

  <form method="post" enctype="multipart/form-data" class="upload-bar">
    <input type="hidden" name="csrf" value="<?= e(csrf_token()) ?>">
    <input type="hidden" name="action" value="upload">
    <input type="file" name="file" accept=".jpg,.jpeg,.png,.webp,.avif,.mp4,.webm" required>
    <button class="btn primary" type="submit">Upload</button>
  </form>

  <div class="media-grid">
    <?php foreach ($files as $f): $name = (string)$f["name"]; $isVideo = preg_match('/\.(mp4|webm|mov)$/i', $name); ?>
      <div class="media-card">
        <?php if ($isVideo): ?>
          <video src="/gallery/<?= e($name) ?>" muted></video>
        <?php else: ?>
          <img src="/gallery/<?= e($name) ?>" alt="<?= e($name) ?>" loading="lazy">
        <?php endif; ?>
        <div class="media-meta">
          <span class="mono" title="<?= e($name) ?>"><?= e($name) ?></span>
          <form method="post" onsubmit="return confirm('Delete <?= e($name) ?>?');">
            <input type="hidden" name="csrf" value="<?= e(csrf_token()) ?>">
            <input type="hidden" name="action" value="delete">
            <input type="hidden" name="name" value="<?= e($name) ?>">
            <button class="btn danger small" type="submit">Delete</button>
          </form>
        </div>
      </div>
    <?php endforeach; ?>
    <?php if (!$files): ?><p class="muted">No media files found (or GitHub is unreachable).</p><?php endif; ?>
  </div>
</main>
</body>
</html>
