<?php
declare(strict_types=1);
require __DIR__ . "/lib.php";
require __DIR__ . "/registry.php";
require __DIR__ . "/layout.php";
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

$nav = [];
if ($pendingCount || $staged) {
    $nav[] = ["label" => "Deploy (" . ($pendingCount + count($staged)) . ")", "href" => "deploy.php", "class" => "btn primary small"];
}
$nav[] = ["label" => "Media", "href" => "media.php"];
$nav[] = ["label" => "View site ↗", "href" => "/", "target" => "_blank"];
$nav[] = ["label" => "Log out", "href" => "logout.php"];
page_start("Dashboard", $nav, "Dashboard");
?>
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
<?php page_end(); ?>
