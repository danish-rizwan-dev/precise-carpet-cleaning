<?php
declare(strict_types=1);

/**
 * Shared page shell for the admin panel.
 * $nav entries: ["label" => ..., "href" => ..., "class" => ?string, "target" => ?string]
 */
function page_start(string $crumb, array $nav, string $title): void
{
    ?>
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<title><?= e($title) ?> — Precise Admin</title>
<link rel="stylesheet" href="assets/admin.css">
</head>
<body>
<header class="topbar">
  <div class="wrap">
    <strong><a href="index.php" class="plain">Precise Admin</a> / <?= e($crumb) ?></strong>
    <nav>
      <?php foreach ($nav as $item): ?>
        <a href="<?= e($item["href"]) ?>"
          <?php if (!empty($item["class"])): ?>class="<?= e($item["class"]) ?>"<?php endif; ?>
          <?php if (!empty($item["target"])): ?>target="<?= e($item["target"]) ?>" rel="noopener"<?php endif; ?>
        ><?= e($item["label"]) ?></a>
      <?php endforeach; ?>
    </nav>
  </div>
</header>

<main class="wrap">
    <?php
}

function page_end(array $scripts = []): void
{
    ?>
</main>
<?php foreach ($scripts as $src): ?>
<script src="<?= e($src) ?>"></script>
<?php endforeach; ?>
</body>
</html>
    <?php
}
