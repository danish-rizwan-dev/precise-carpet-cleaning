# Precise Carpet Cleaning — Website

Marketing website for Precise Carpet Cleaning (Sydney). Static-exported Next.js site with a small PHP admin panel for content editing, deployed to cPanel over FTP.

## Stack

- **Frontend:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, Framer Motion
- **Content:** plain JSON in `src/content/`
- **Admin panel:** plain PHP in `admin/` (no framework), drafts published via the GitHub API
- **Hosting:** cPanel + Apache (`.htaccess` in `public/`), deployed by GitHub Actions

## Getting started

```bash
npm ci
npm run dev        # http://localhost:3000
```

## Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Static export to `out/` |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check |
| `npm run optimize:images` | Resize/optimize images in `public/` (sharp) |

## Project layout

```
src/app/          Pages (all routes are statically exported)
src/components/   UI components
src/content/      Editable content JSON (site, home, services, pricing, …)
src/data/         Typed wrappers over the content JSON
admin/            PHP admin panel (login, editors, drafts, deploy)
public/           Static assets, .htaccess, contact API (public/api/contact.php)
.github/workflows Build + FTP deploy
```

## Editing content (admin panel)

1. Copy `admin/config.example.php` to `admin/config.php` (git-ignored) and fill in accounts + a GitHub token with **Contents: read/write** on this repo.
2. Log in at `/admin/` → edit **About Us, Home, Services, Pricing, Contact** or upload gallery **Media**.
3. Saving stores a *draft*; **Deploy** commits the drafts to `master`, which triggers the workflow and republishes the site in ~2–3 minutes.

Content editors are defined in `admin/registry.php` (one schema per JSON file).

## Deployment

Push to `master` (or run the workflow manually). The workflow:

1. `npm ci` → lint → `npm run build` (static export)
2. Generates `admin/config.php` from secrets
3. FTP-uploads `out/` to the web root and `admin/` to `/admin/`

Required GitHub Actions secrets: `ADMIN_USERS`, `GH_ADMIN_TOKEN`, `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`.

## SEO

Basic SEO only: page titles and meta descriptions, `sitemap.xml` and `robots.txt` (see `src/app/sitemap.ts`, `src/app/robots.ts`).
