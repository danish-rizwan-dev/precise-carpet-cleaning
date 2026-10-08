<?php
declare(strict_types=1);
require __DIR__ . "/lib.php";
require __DIR__ . "/registry.php";
require __DIR__ . "/layout.php";
require_login();

/** Pending content pages: key => ["title" => ..., "json" => ..., "file" => ...] */
function pending_content(array $editors): array
{
    $out = [];
    foreach ($editors as $key => $ed) {
        $json = load_draft($key);
        if ($json === null) {
            continue;
        }
        [$live] = gh_get_file($ed["file"]);
        if (draft_differs($key, $live)) {
            $out[$key] = ["title" => $ed["title"], "json" => $json, "file" => $ed["file"]];
        } else {
            delete_draft($key); // identical to live — nothing to publish
        }
    }
    return $out;
}

$flash = $_SESSION["flash"] ?? null;
unset($_SESSION["flash"]);
$error = $_SESSION["flash_error"] ?? null;
unset($_SESSION["flash_error"]);

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    csrf_check();
    $action = (string)($_POST["action"] ?? "");
    try {
        if ($action === "publish") {
            $pages = pending_content(accessible_editors($EDITORS));
            $staged = staged_files();
            if (!$pages && !$staged) {
                $_SESSION["flash"] = "Nothing to publish.";
                header("Location: deploy.php");
                exit;
            }
            $files = [];
            foreach ($pages as $p) {
                $files[] = ["path" => $p["file"], "content" => $p["json"], "binary" => false];
            }
            foreach ($staged as $s) {
                $content = file_get_contents($s["full"]);
                if ($content === false) {
                    throw new RuntimeException("Could not read staged file: " . $s["rel"]);
                }
                $files[] = ["path" => $s["rel"], "content" => $content, "binary" => true];
            }
            $msg = "deploy: publish"
                . ($pages ? " " . count($pages) . " page(s)" : "")
                . (($pages && $staged) ? "," : "")
                . ($staged ? " " . count($staged) . " file(s)" : "");
            gh_commit_files($files, $msg);
            clear_drafts(array_keys($pages));
            clear_staging();
            $_SESSION["flash"] = "Published! The site is rebuilding and will be live in about 2–3 minutes.";
        } elseif ($action === "discard") {
            clear_drafts(is_super() ? null : ADMIN_EDITOR_KEYS);
            clear_staging();
            $_SESSION["flash"] = "All drafts and staged files were discarded. The live site is unchanged.";
        }
    } catch (Throwable $e) {
        $_SESSION["flash_error"] = "Publish failed: " . $e->getMessage() . " — your drafts are still saved.";
    }
    header("Location: deploy.php");
    exit;
}

$pages = pending_content(accessible_editors($EDITORS));
$staged = staged_files();
$total = count($pages) + count($staged);

$nav = [
    ["label" => "Dashboard", "href" => "index.php"],
    ["label" => "Log out", "href" => "logout.php"],
];
page_start("Deploy", $nav, "Deploy");
?>
  <?php if ($flash): ?><div class="alert ok"><?= e($flash) ?></div><?php endif; ?>
  <?php if ($error): ?><div class="alert error"><?= e($error) ?></div><?php endif; ?>

  <?php if ($total): ?>
    <p class="muted">Review your unpublished changes. Publishing sends everything in
    <strong>one update</strong> — the site rebuilds once and goes live in about
    <strong>2–3 minutes</strong>.</p>

    <?php if ($pages): ?>
      <h2 class="section-title">Edited pages (<?= count($pages) ?>)</h2>
      <ul class="deploy-list">
        <?php foreach ($pages as $key => $p): ?>
          <li>
            <a href="edit.php?m=<?= e($key) ?>"><strong><?= e($p["title"]) ?></strong></a>
            <span class="muted">→ <?= e($p["file"]) ?> · <a href="edit.php?m=<?= e($key) ?>">keep editing</a></span>
          </li>
        <?php endforeach; ?>
      </ul>
    <?php endif; ?>

    <?php if ($staged): ?>
      <h2 class="section-title">New files to upload (<?= count($staged) ?>)</h2>
      <ul class="deploy-list">
        <?php foreach ($staged as $s): ?>
          <li>
            <span class="mono"><?= e($s["rel"]) ?></span>
            <span class="muted"><?= number_format($s["size"] / 1024, 1) ?> KB</span>
          </li>
        <?php endforeach; ?>
      </ul>
    <?php endif; ?>

    <div class="save-bar">
      <form method="post" class="inline-form">
        <input type="hidden" name="csrf" value="<?= e(csrf_token()) ?>">
        <input type="hidden" name="action" value="publish">
        <button class="btn primary" type="submit">Deploy now (<?= $total ?>)</button>
      </form>
      <form method="post" class="inline-form">
        <input type="hidden" name="csrf" value="<?= e(csrf_token()) ?>">
        <input type="hidden" name="action" value="discard">
        <button class="btn danger" type="submit" onclick="return confirm('Discard ALL drafts and staged files? The live site stays as it is.');">Discard all</button>
      </form>
      <a class="btn" href="index.php">Back</a>
      <span class="hint">One click publishes everything above.</span>
    </div>
  <?php else: ?>
    <div class="notice">
      <strong>Nothing to deploy.</strong> Edit some pages first — changes you save as
      drafts will be listed here for review before going live.
    </div>
    <p><a class="btn primary" href="index.php">Go to Dashboard</a></p>
  <?php endif; ?>
<?php page_end(); ?>
