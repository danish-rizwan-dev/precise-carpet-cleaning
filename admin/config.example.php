<?php
/**
 * Copy this file to config.php and fill in the values.
 * config.php is git-ignored and generated automatically in CI
 * from GitHub Actions secrets on the production deploy.
 */
return [
    // Accounts. role: "super" = sees everything, "admin" = Home, Pricing, Contact, Gallery only.
    // Generate a hash with: php -r "echo password_hash('your-password', PASSWORD_DEFAULT);"
    'users' => [
        'superadmin@gmail.com' => [
            'password_hash' => '$2y$10$replace_me_with_a_super_hash',
            'role' => 'super',
        ],
        'admin@test.gmail.com' => [
            'password_hash' => '$2y$10$replace_me_with_an_admin_hash',
            'role' => 'admin',
        ],
    ],

    // GitHub token with "Contents: read and write" permission on this repo
    'github_token' => 'ghp_replace_me',
    'github_repo' => 'danish-rizwan-dev/precise-carpet-cleaning',
    'github_branch' => 'master',
];
