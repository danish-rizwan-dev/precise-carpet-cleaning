<?php
declare(strict_types=1);
require __DIR__ . "/lib.php";
session_unset();
session_destroy();
header("Location: login.php");
exit;
