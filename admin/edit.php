<?php
declare(strict_types=1);
require __DIR__ . "/lib.php";
require __DIR__ . "/registry.php";
require __DIR__ . "/form.php";
require_login();

$key = (string)($_GET["m"] ?? $_POST["m"] ?? "");
if (!isset($EDITORS[$key])) {
    header("Location: index.php");
    exit;
}
$editor = $EDITORS[$key];

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    csrf_check();
    try {
        $schema = $editor["schema"];
        if (($schema["type"] ?? "object") === "stringlist") {
            $data = coerce_root($_POST["data"] ?? "", $schema);
        } else {
            $data = coerce_root($_POST["data"] ?? [], $schema);
        }
        $json = encode_json($data);
        gh_put_file($editor["file"], $json, "content({$key}): update via admin panel");

        $msg = "Saved. The site is publishing now — it will be live in about 2–3 minutes.";
        $warnings = $GLOBALS["COERCE_WARNINGS"];
        if ($warnings) {
            $msg .= " Warnings: " . implode(" ", $warnings);
        }
        $_SESSION["flash"] = $msg;
    } catch (Throwable $e) {
        $_SESSION["flash"] = "Save failed: " . $e->getMessage();
    }
    header("Location: index.php");
    exit;
}

try {
    $data = load_json_file($editor["file"]);
} catch (Throwable $e) {
    $loadError = $e->getMessage();
    $data = [];
}
?>
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<title><?= e($editor["title"]) ?> — Precise Admin</title>
<link rel="stylesheet" href="assets/admin.css">
</head>
<body>
<header class="topbar">
  <div class="wrap">
    <strong><a href="index.php" class="plain">Precise Admin</a> / <?= e($editor["title"]) ?></strong>
    <nav>
      <a href="index.php">Dashboard</a>
      <a href="logout.php">Log out</a>
    </nav>
  </div>
</header>

<main class="wrap">
  <p class="muted"><?= e($editor["desc"]) ?></p>

  <?php if (!empty($loadError)): ?>
    <div class="alert error"><?= e($loadError) ?></div>
  <?php endif; ?>

  <form method="post" action="edit.php?m=<?= e($key) ?>" class="editor">
    <input type="hidden" name="csrf" value="<?= e(csrf_token()) ?>">
    <input type="hidden" name="m" value="<?= e($key) ?>">

    <div class="grid root">
      <?php
      $schema = $editor["schema"];
      if (($schema["type"] ?? "object") === "stringlist") {
          render_field("data", $data, ["type" => "stringlist", "label" => $schema["label"] ?? "Values"]);
      } elseif (($schema["type"] ?? "object") === "list") {
          render_field("data", $data, ["type" => "list", "label" => $schema["label"] ?? "Items", "fields" => $schema["fields"]]);
      } else {
          foreach ($schema["fields"] as $fieldKey => $def) {
              render_field("data[" . $fieldKey . "]", $data[$fieldKey] ?? default_for($def), $def);
          }
      }
      ?>
    </div>

    <div class="save-bar">
      <button class="btn primary" type="submit">Save &amp; publish</button>
      <a class="btn" href="index.php">Cancel</a>
      <span class="hint">Publishing takes ~2–3 minutes after saving.</span>
    </div>
  </form>
</main>

<script src="assets/admin.js"></script>
</body>
</html>
