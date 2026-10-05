<?php
declare(strict_types=1);
// Round-trip test: coerce_root(decode(file)) must equal decode(file) for every editor.
error_reporting(E_ALL);

require __DIR__ . "/admin/form.php";
require __DIR__ . "/admin/registry.php";

$fail = 0;
foreach ($EDITORS as $key => $ed) {
    $raw = file_get_contents(__DIR__ . "/" . $ed["file"]);
    $orig = json_decode($raw, true);
    if (!is_array($orig)) {
        echo "FAIL $key: cannot parse {$ed["file"]}\n";
        $fail++;
        continue;
    }

    $schema = $ed["schema"];
    if (($schema["type"] ?? "object") === "stringlist") {
        $input = is_array($orig) ? implode("\n", $orig) : $orig; // what the textarea would contain
        $out = coerce_root($input, $schema);
    } elseif (($schema["type"] ?? "object") === "list") {
        $out = coerce_root($orig, $schema);
    } else {
        $out = coerce_root($orig, $schema);
    }

    if ($out === $orig) {
        echo "OK   $key\n";
    } else {
        echo "FAIL $key — diff:\n";
        $a = json_encode($orig, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
        $b = json_encode($out, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
        file_put_contents(__DIR__ . "/.tmp-orig-{$key}.json", $a . "\n");
        file_put_contents(__DIR__ . "/.tmp-out-{$key}.json", $b . "\n");
        echo "     wrote .tmp-orig-$key.json vs .tmp-out-$key.json\n";
        $fail++;
    }
}

// also verify encode/decode stability: json_encode(orig) parsed back == orig
foreach ($EDITORS as $key => $ed) {
    $orig = json_decode(file_get_contents(__DIR__ . "/" . $ed["file"]), true);
    $enc = json_encode($orig, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    $back = json_decode($enc, true);
    if ($back !== $orig) {
        echo "FAIL encode stability $key\n";
        $fail++;
    }
}

echo $fail === 0 ? "\nALL ROUND-TRIPS OK\n" : "\n$fail FAILURES\n";
exit($fail === 0 ? 0 : 1);
