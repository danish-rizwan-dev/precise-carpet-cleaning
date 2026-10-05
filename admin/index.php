<?php
declare(strict_types=1);
require __DIR__ . "/lib.php";
require __DIR__ . "/registry.php";
require_login();

$flash = $_SESSION["flash"] ?? null;
unset($_SESSION["flash"]);

$pending = [];
foreach ($EDITORS as $key => $ed) {
    if (load_draft($key) === null) {
        continue;
    }
    [$live] = gh_get_file($ed["file"]);
    if (draft_differs($key, $live)) {
        $pending[$key] = $ed["title"];
    }
}
$pendingCount = count($pending);
$staged = staged_files();
?>
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<title>Dashboard — Precise Admin</title>
<link rel="stylesheet" href="assets/admin.css">
</head>
<body>
<header class="topbar">
  <div class="wrap">
    <strong>Precise Admin</strong>
    <nav>
      <?php if ($pendingCount || $staged): ?>
        <a class="btn primary small" href="deploy.php">Deploy (<?= $pendingCount + count($staged) ?>)</a>
      <?php endif; ?>
      <a href="media.php">Media</a>
      <a href="/" target="_blank" rel="noopener">View site ↗</a>
      <a href="logout.php">Log out</a>
    </nav>
  </div>
</header>

<main class="wrap">
  <?php if ($flash): ?><div class="alert ok"><?= e($flash) ?></div><?php endif; ?>

  <?php if ($pendingCount || $staged): ?>
    <div class="alert warn">
      <strong><?= $pendingCount ?> page<?= $pendingCount === 1 ? "" : "s" ?> edited</strong><?php
      if ($staged): ?> and <?= count($staged) ?> file<?= count($staged) === 1 ? "" : "s" ?> uploaded<?php endif; ?> —
      waiting to be published. Nothing is live yet.
      <span class="flash-actions">
        <a class="btn primary small" href="deploy.php">Review &amp; Deploy</a>
      </span>
    </div>
  <?php else: ?>
    <div class="notice">
      <strong>How publishing works:</strong> press <em>Save draft</em> on any page — the live
      site stays unchanged. Edit as many pages as you like, then press
      <strong>Deploy</strong> to publish everything at once (live in about
      <strong>2–3 minutes</strong>).
    </div>
  <?php endif; ?>

  <div class="cards">
    <?php foreach ($EDITORS as $key => $ed): ?>
      <a class="card<?= isset($pending[$key]) ? " card-draft" : "" ?>" href="edit.php?m=<?= e($key) ?>">
        <?php if (isset($pending[$key])): ?><span class="chip">Draft</span><?php endif; ?>
        <h2><?= e($ed["title"]) ?></h2>
        <p><?= e($ed["desc"]) ?></p>
        <span class="card-cta">Edit →</span>
      </a>
    <?php endforeach; ?>

    <a class="card alt" href="media.php">
      <h2>Media (gallery)</h2>
      <p>Upload or delete gallery photos &amp; videos. New uploads wait for the next Deploy.</p>
      <span class="card-cta">Open →</span>
    </a>
  </div>
</main>
</body>
</html>
