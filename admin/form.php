<?php
declare(strict_types=1);

/* ------------------------------------------------------------------
   Generic schema-driven form renderer + POST coercion.
   Field types: text, textarea, number, checkbox, image, stringlist,
                object, list, objectmap
   ------------------------------------------------------------------ */

$GLOBALS["COERCE_WARNINGS"] = [];

/** Render a shared <datalist> exactly once per suggest key. */
function render_datalist(string $key, array $options): void
{
    static $rendered = [];
    if (isset($rendered[$key])) {
        return;
    }
    $rendered[$key] = true;
    ?>
    <datalist id="dl_<?= e($key) ?>">
      <?php foreach ($options as $o): ?><option value="<?= e((string)$o) ?>"></option><?php endforeach; ?>
    </datalist>
    <?php
}

/** Toolbar for a list row: reorder / duplicate / remove. */
function row_toolbar(): void
{
    ?>
    <div class="row-bar">
      <button type="button" class="row-btn row-up" title="Move up">↑ Up</button>
      <button type="button" class="row-btn row-down" title="Move down">↓ Down</button>
      <button type="button" class="row-btn row-dup" title="Copy this row">Duplicate</button>
      <button type="button" class="btn-remove">Remove</button>
    </div>
    <?php
}

function render_field(string $path, $value, array $def): void
{
    $label = (string)($def["label"] ?? "");
    switch ($def["type"]) {
        case "text":
            $suggest = (string)($def["suggest"] ?? "");
            $opts = $suggest !== "" ? ($GLOBALS["DATALISTS"][$suggest] ?? []) : [];
            ?>
            <label class="fld">
              <span class="fld-label"><?= e($label) ?></span>
              <input type="text" name="<?= e($path) ?>" value="<?= e((string)$value) ?>"
                <?php if ($opts): ?>list="dl_<?= e($suggest) ?>" autocomplete="off"<?php endif; ?>>
              <?php if ($opts): render_datalist($suggest, $opts); endif; ?>
            </label>
            <?php
            break;

        case "textarea":
            ?>
            <label class="fld fld-wide">
              <span class="fld-label"><?= e($label) ?></span>
              <textarea name="<?= e($path) ?>" rows="4"><?= e((string)$value) ?></textarea>
            </label>
            <?php
            break;

        case "number":
            ?>
            <label class="fld">
              <span class="fld-label"><?= e($label) ?></span>
              <input type="number" step="any" name="<?= e($path) ?>" value="<?= e((string)$value) ?>">
            </label>
            <?php
            break;

        case "checkbox":
            ?>
            <label class="chk">
              <input type="checkbox" name="<?= e($path) ?>" value="1" <?= $value ? "checked" : "" ?>>
              <span><?= e($label) ?></span>
            </label>
            <?php
            break;

        case "image":
            $src = (string)$value;
            $inputId = "f_" . preg_replace('/[^a-zA-Z0-9]+/', "_", $path);
            ?>
            <div class="fld fld-wide img-fld">
              <label class="fld-label" for="<?= e($inputId) ?>"><?= e($label) ?></label>
              <span class="img-row">
                <input type="text" id="<?= e($inputId) ?>" class="img-path" name="<?= e($path) ?>" value="<?= e($src) ?>" placeholder="/folder/image.ext" autocomplete="off">
                <span class="img-preview<?= $src === "" ? " empty" : "" ?>">
                  <?php if ($src !== ""): ?><img src="<?= e($src) ?>" alt=""><?php endif; ?>
                </span>
                <span class="img-btns">
                  <button type="button" class="btn small img-browse">Browse</button>
                  <button type="button" class="btn small img-upload">Upload</button>
                  <button type="button" class="btn small img-clear<?= $src === "" ? " hidden" : "" ?>">Clear</button>
                </span>
              </span>
              <small class="hint img-hint"></small>
            </div>
            <?php
            break;

        case "stringlist":
            $lines = is_array($value) ? implode("\n", $value) : (string)$value;
            ?>
            <label class="fld fld-wide">
              <span class="fld-label"><?= e($label) ?></span>
              <textarea name="<?= e($path) ?>" rows="5" class="mono"><?= e($lines) ?></textarea>
              <small class="hint">One item per line.</small>
            </label>
            <?php
            break;

        case "object":
            ?>
            <fieldset class="grp">
              <legend><?= e($label) ?></legend>
              <div class="grid">
                <?php foreach ($def["fields"] as $key => $sub) {
                    render_field($path . "[" . $key . "]", is_array($value) ? ($value[$key] ?? "") : "", $sub);
                } ?>
              </div>
            </fieldset>
            <?php
            break;

        case "list":
        case "objectmap":
            render_list($path, $value, $def);
            break;
    }
}

function render_list(string $path, $value, array $def): void
{
    $label = (string)($def["label"] ?? "Items");
    $rows = is_array($value) ? $value : [];
    $isMap = $def["type"] === "objectmap";
    $entryLabel = $isMap ? "entry" : rtrim(substr($label, -1) === "s" ? substr($label, 0, -1) : $label, " ");
    ?>
    <fieldset class="grp list-block" data-path="<?= e($path) ?>">
      <legend><?= e($label) ?></legend>
      <?php if (!empty($def["hint"])): ?>
        <p class="hint"><?= e($def["hint"]) ?></p>
      <?php endif; ?>

      <div class="rows">
        <?php $i = 0; foreach ($rows as $row): ?>
          <div class="row">
            <?php row_toolbar(); ?>
            <div class="grid">
              <?php foreach ($def["fields"] as $key => $sub) {
                  $rv = is_array($row) ? ($row[$key] ?? "") : "";
                  if (($sub["type"] ?? "") === "stringlist" && is_array($rv)) {
                      $rv = implode("\n", $rv);
                  }
                  render_field($path . "[" . $i . "][" . $key . "]", $rv, $sub);
              } ?>
            </div>
          </div>
          <?php $i++; endforeach; ?>
      </div>

      <template>
        <div class="row">
          <?php row_toolbar(); ?>
          <div class="grid">
            <?php foreach ($def["fields"] as $key => $sub): ?>
              <?php render_field($path . "[__I__][" . $key . "]", "", $sub); ?>
            <?php endforeach; ?>
          </div>
        </div>
      </template>

      <div class="row-actions">
        <button type="button" class="btn-add">+ Add <?= e($entryLabel) ?></button>
      </div>
    </fieldset>
    <?php
}

/* ------------------------- coercion ------------------------- */

const SCHEMA_OMIT = "__omit__";

function default_for(array $def)
{
    switch ($def["type"] ?? "text") {
        case "stringlist":
        case "list":
        case "objectmap":
            return [];
        case "checkbox":
            return false;
        case "number":
            return "";
        default:
            return "";
    }
}

function coerce_value($v, array $def)
{
    switch ($def["type"] ?? "text") {
        case "text":
        case "textarea":
        case "image":
            $t = is_string($v) ? trim($v) : (is_scalar($v) ? trim((string)$v) : "");
            if ($t === "" && !empty($def["optional"])) {
                return SCHEMA_OMIT;
            }
            return $t;

        case "number":
            if (!is_scalar($v) || trim((string)$v) === "") {
                return !empty($def["optional"]) ? SCHEMA_OMIT : 0;
            }
            $n = (string)$v;
            return str_contains($n, ".") ? (float)$n : (int)$n;

        case "checkbox":
            return !empty($v) && $v !== "0" ? true : SCHEMA_OMIT;

        case "stringlist":
            if (is_string($v)) {
                $v = preg_split("/\r\n|\r|\n/", $v) ?: [];
            }
            $out = [];
            foreach ((array)$v as $line) {
                $line = trim((string)$line);
                if ($line !== "") {
                    $out[] = $line;
                }
            }
            if ($out === [] && !empty($def["optional"])) {
                return SCHEMA_OMIT;
            }
            return $out;

        case "object":
            return coerce_object((array)$v, $def["fields"]);

        case "list":
            $out = [];
            foreach ((array)$v as $row) {
                if (!is_array($row)) {
                    continue;
                }
                $r = coerce_object($row, $def["fields"]);
                if ($r === [] || is_all_empty($r)) {
                    continue;
                }
                $out[] = $r;
            }
            if ($out === [] && !empty($def["optional"])) {
                return SCHEMA_OMIT;
            }
            return $out;

        case "objectmap":
            $keyField = $def["key"];
            $out = [];
            $i = 0;
            foreach ((array)$v as $row) {
                $i++;
                if (!is_array($row)) {
                    continue;
                }
                $r = coerce_object($row, $def["fields"]);
                if ($r === [] || is_all_empty($r)) {
                    continue;
                }
                $key = trim((string)($r[$keyField] ?? ""));
                if ($key === "") {
                    $GLOBALS["COERCE_WARNINGS"][] = "A {$def["label"]} row was skipped because its ID was empty.";
                    continue;
                }
                if (isset($out[$key])) {
                    $GLOBALS["COERCE_WARNINGS"][] = "Duplicate ID \"{$key}\" in {$def["label"]} — the last one won.";
                }
                $r[$keyField] = $key;
                $out[$key] = $r;
            }
            return $out;
    }
    return SCHEMA_OMIT;
}

function coerce_object(array $row, array $fields): array
{
    $out = [];
    foreach ($fields as $key => $def) {
        $raw = array_key_exists($key, $row) ? $row[$key] : default_for($def);
        $c = coerce_value($raw, $def);
        if ($c !== SCHEMA_OMIT) {
            $out[$key] = $c;
        }
    }
    return $out;
}

function is_all_empty(array $row): bool
{
    foreach ($row as $v) {
        if ($v !== "" && $v !== [] && $v !== false && $v !== null) {
            return false;
        }
    }
    return true;
}

function coerce_root($data, array $schema)
{
    if (($schema["type"] ?? "object") === "stringlist") {
        return coerce_value($data, ["type" => "stringlist"]);
    }
    if (($schema["type"] ?? "object") === "list") {
        return coerce_value(is_array($data) ? $data : [], [
            "type" => "list",
            "fields" => $schema["fields"],
        ]);
    }
    return coerce_object(is_array($data) ? $data : [], $schema["fields"]);
}
