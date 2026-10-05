<?php
declare(strict_types=1);
require __DIR__ . "/lib.php";
require __DIR__ . "/registry.php";
require_login();

$flash = $_SESSION["flash"] ?? null;
unset($_SESSION["flash"]);
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
      <a href="media.php">Media</a>
      <a href="/" target="_blank" rel="noopener">View site ↗</a>
      <a href="logout.php">Log out</a>
    </nav>
  </div>
</header>

<main class="wrap">
  <?php if ($flash): ?><div class="alert ok"><?= e($flash) ?></div><?php endif; ?>

  <div class="notice">
    <strong>How publishing works:</strong> pressing Save commits your change to GitHub.
    The site rebuilds automatically and goes live in about <strong>2–3 minutes</strong>.
  </div>

  <div class="cards">
    <?php foreach ($EDITORS as $key => $ed): ?>
      <a class="card" href="edit.php?m=<?= e($key) ?>">
        <h2><?= e($ed["title"]) ?></h2>
        <p><?= e($ed["desc"]) ?></p>
        <span class="card-cta">Edit →</span>
      </a>
    <?php endforeach; ?>

    <a class="card alt" href="media.php">
      <h2>Media (gallery)</h2>
      <p>Upload or delete gallery photos &amp; videos. They appear on the site after the next publish.</p>
      <span class="card-cta">Open →</span>
    </a>
  </div>
</main>
</body>
</html>
