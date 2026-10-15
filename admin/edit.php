<?php
declare(strict_types=1);
require __DIR__ . "/lib.php";
require __DIR__ . "/registry.php";
require __DIR__ . "/form.php";
require __DIR__ . "/layout.php";
require_login();

$key = (string)($_GET["m"] ?? $_POST["m"] ?? "");
if (!isset($EDITORS[$key])) {
    header("Location: index.php");
    exit;
}
$editor = $EDITORS[$key];

/** Number of pages with unpublished changes (+ staged images shown separately). */
function pending_pages(array $editors): array
{
    $out = [];
    foreach ($editors as $k => $ed) {
        if (load_draft($k) === null) {
            continue;
        }
        [$live] = gh_get_file($ed["file"]);
        if (draft_differs($k, $live)) {
            $out[$k] = $ed["title"];
        }
    }
    return $out;
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    csrf_check();
    $action = (string)($_POST["action"] ?? "save");
    if ($action === "discard") {
        delete_draft($key);
        $_SESSION["flash"] = "Draft discarded. The published page is unchanged.";
        header("Location: edit.php?m=" . urlencode($key));
        exit;
    }
    try {
        $schema = $editor["schema"];
        if (($schema["type"] ?? "object") === "stringlist") {
            $data = coerce_root($_POST["data"] ?? "", $schema);
        } else {
            $data = coerce_root($_POST["data"] ?? [], $schema);
        }
        $json = encode_json($data);

        [$live] = gh_get_file($editor["file"]);
        if ($live !== null && json_decode($live, true) == json_decode($json, true)) {
            delete_draft($key);
            $_SESSION["flash"] = "No changes to save.";
        } else {
            save_draft($key, $json);
            $_SESSION["flash"] = "saved_as_draft";
        }
        if (!empty($GLOBALS["COERCE_WARNINGS"])) {
            $_SESSION["flash_warnings"] = implode(" ", $GLOBALS["COERCE_WARNINGS"]);
        }
    } catch (Throwable $e) {
        $_SESSION["flash"] = "Save failed: " . $e->getMessage();
    }
    header("Location: edit.php?m=" . urlencode($key));
    exit;
}

$flash = $_SESSION["flash"] ?? null;
unset($_SESSION["flash"]);
$flashWarn = $_SESSION["flash_warnings"] ?? null;
unset($_SESSION["flash_warnings"]);

/* Link suggestions for fields with "suggest" => "routes" (render-time only). */
$GLOBALS["DATALISTS"]["routes"] = (static function (): array {
    $routes = [
        "/",
        "/about",
        "/appointment",
        "/blogs",
        "/contact",
        "/gallery",
        "/pricing",
        "/services",
        "/privacy-policy",
        "/terms-and-conditions",
    ];
    try {
        $services = load_json_file("src/content/services.json");
        foreach (($services["servicesData"] ?? []) as $k => $v) {
            $id = is_array($v) ? (string)($v["id"] ?? $k) : (string)$k;
            if ($id !== "") {
                $routes[] = "/services/" . $id;
            }
        }
    } catch (Throwable $e) {
        // suggestions are optional
    }
    return $routes;
})();
$justSaved = ($flash === "saved_as_draft");
if ($justSaved) {
    $flash = "Saved as a draft — the live site is not changed yet.";
}

$loadError = null;
try {
    $draftJson = load_draft($key);
    if ($draftJson !== null) {
        $data = json_decode($draftJson, true);
        if (!is_array($data)) {
            throw new RuntimeException("Draft JSON is invalid.");
        }
        $hasDraft = draft_differs($key, (gh_get_file($editor["file"])[0] ?? null));
    } else {
        $data = load_json_file($editor["file"]);
        $hasDraft = false;
    }
} catch (Throwable $e) {
    $loadError = $e->getMessage();
    $data = [];
    $hasDraft = false;
}

$pending = pending_pages($EDITORS);
$pendingCount = count($pending);

$nav = [];
if ($pendingCount) {
    $nav[] = ["label" => "Deploy ({$pendingCount})", "href" => "deploy.php", "class" => "btn primary small"];
}
$nav[] = ["label" => "Dashboard", "href" => "index.php"];
$nav[] = ["label" => "Log out", "href" => "logout.php"];
page_start($editor["title"], $nav, $editor["title"]);
?>
  <p class="muted"><?= e($editor["desc"]) ?></p>

  <?php if ($flash): ?>
    <div class="alert <?= $justSaved ? "ok" : ($loadError ? "error" : "ok") ?>">
      <?= e($flash) ?>
      <?php if ($justSaved): ?>
        <span class="flash-actions">
          <a class="btn small" href="index.php">Edit another page</a>
          <?php if ($pendingCount): ?>
            <a class="btn primary small" href="deploy.php">Deploy now (<?= $pendingCount ?>)</a>
          <?php endif; ?>
        </span>
      <?php endif; ?>
    </div>
    <?php if ($flashWarn): ?><div class="alert warn">Warnings: <?= e($flashWarn) ?></div><?php endif; ?>
  <?php endif; ?>

  <?php if (!empty($loadError)): ?>
    <div class="alert error"><?= e($loadError) ?></div>
  <?php endif; ?>

  <?php if ($hasDraft): ?>
    <div class="notice draft-notice">
      <strong>Draft in progress</strong> — this is your unpublished version.
      It goes live when you press Deploy.
      <form method="post" action="edit.php?m=<?= e($key) ?>" class="inline-form">
        <input type="hidden" name="csrf" value="<?= e(csrf_token()) ?>">
        <input type="hidden" name="m" value="<?= e($key) ?>">
        <input type="hidden" name="action" value="discard">
        <button class="btn danger small" type="submit" onclick="return confirm('Discard your draft and revert to the published version?');">Discard draft</button>
      </form>
    </div>
  <?php endif; ?>

  <form method="post" action="edit.php?m=<?= e($key) ?>" class="editor">
    <input type="hidden" name="csrf" value="<?= e(csrf_token()) ?>">
    <input type="hidden" name="m" value="<?= e($key) ?>">
    <input type="hidden" name="action" value="save">

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
      <button class="btn primary" type="submit">Save draft</button>
      <?php if ($pendingCount): ?>
        <a class="btn" href="deploy.php">Deploy (<?= $pendingCount ?>)</a>
      <?php endif; ?>
      <a class="btn" href="index.php">Cancel</a>
      <span class="hint">Saving doesn't publish — press Deploy when you're ready (live in ~2–3 min).</span>
    </div>
  </form>
<?php page_end(["assets/admin.js"]); ?>
