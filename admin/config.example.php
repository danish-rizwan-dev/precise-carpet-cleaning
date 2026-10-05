<?php
/**
 * Copy this file to config.php and fill in the values.
 * config.php is git-ignored and generated automatically in CI
 * from GitHub Actions secrets on the production deploy.
 */
return [
    // Admin login
    'admin_user' => 'admin',
    // Generate with: php -r "echo password_hash('your-password', PASSWORD_DEFAULT);"
    'admin_password_hash' => '$2y$10$replace_me_with_a_real_hash',

    // GitHub token with "Contents: read and write" permission on this repo
    'github_token' => 'ghp_replace_me',
    'github_repo' => 'danish-rizwan-dev/precise-carpet-cleaning',
    'github_branch' => 'master',
];
