<?php
declare(strict_types=1);
require __DIR__ . "/lib.php";

$error = "";
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    csrf_check();
    if ((int)($_SESSION["attempts"] ?? 0) >= 5) {
        $error = "Too many attempts. Wait a minute and try again.";
    } elseif (check_login(trim((string)($_POST["user"] ?? "")), (string)($_POST["pass"] ?? ""))) {
        header("Location: index.php");
        exit;
    } else {
        $error = "Invalid username or password.";
    }
}
?>
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<title>Login — Precise Admin</title>
<link rel="stylesheet" href="assets/admin.css">
</head>
<body class="login-page">
<main class="login-card">
  <h1>Precise Admin</h1>
  <p class="muted">Sign in to edit website content.</p>
  <?php if ($error): ?><div class="alert error"><?= e($error) ?></div><?php endif; ?>
  <form method="post" autocomplete="off">
    <input type="hidden" name="csrf" value="<?= e(csrf_token()) ?>">
    <label class="fld fld-wide">
      <span class="fld-label">Username</span>
      <input type="text" name="user" autofocus required>
    </label>
    <label class="fld fld-wide">
      <span class="fld-label">Password</span>
      <input type="password" name="pass" required>
    </label>
    <button class="btn primary" type="submit">Sign in</button>
  </form>
</main>
</body>
</html>
