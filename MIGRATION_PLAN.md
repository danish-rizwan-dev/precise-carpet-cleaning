# Migration Plan — Move site from `new.` subdomain to the main domain

**Target:** `https://precisecarpetcleaning.com.au` (currently serves the legacy site)
**Source:** `https://new.precisecarpetcleaning.com.au` (current Next.js build + admin panel)
**Date prepared:** 8 Oct 2026 · Status: **Phases 1, 3, 4 done (8 Oct 2026)** — Phase 2 redirect + Phase 5 pending

> Never put admin passwords or FTP credentials in this file. All secrets live in
> GitHub → Settings → Secrets → Actions (`FTP_*`, `GH_ADMIN_TOKEN`, `ADMIN_USERS`).

---

## 1. Current state (verified 8 Oct 2026)

| Item | State |
|---|---|
| Main domain | Serves the **old** legacy site (`assets/css/style.min.css`, no `_next/`) |
| `new.` subdomain | Serves the **new** build (gallery before/after sliders, Get in Touch, `/admin/` working) |
| DNS | `precisecarpetcleaning.com.au` → `103.26.237.116` (both hostnames same IP) |
| Deploy pipeline | GitHub Actions `deploy.yml` → FTP to server-dir `/` (site) and `/admin/` (admin) |
| FTP root | Subdomain folder (i.e. `public_html/new/`) — **this is why the main domain never updates** |
| Repo config | `src/content/site.json` → `url: https://precisecarpetcleaning.com.au` ✅ already correct |
| Admin accounts | Generated in CI from the `ADMIN_USERS` secret (super + limited admin) ✅ |

---

## 2. Pre-flight (before touching anything)

- [x] Download a full backup of the current `public_html` (File Manager → Compress → Download).
- [ ] Confirm nobody is editing content in the admin panel during the window (~10 min).
- [x] Note the old site's key URLs (it's mostly a one-pager: `/#home`, `/#services`, `/#pricing`, `/#contact`).
- [x] Have cPanel login ready; the dev (Danish) has GitHub access for re-deploys.

---

## 3. Phase 1 — cPanel file move (owner, ~3 min) — ✅ DONE 8 Oct 2026

- [x] File Manager → `public_html` → **delete old site files** (everything except the `new` folder).
- [x] Open `public_html/new/` → **Select All** → **Move** → `/public_html`
      (verify files do **not** end up in `/public_html/new/new`).
      *Actual subdomain dir was `public_html/new.precisecarpetcleaning.com.au/` — moved up from there.*
- [x] Delete the now-empty `new` folder.
- [x] Confirm `public_html` now contains: `index.html`, `_next/`, `gallery/`, `admin/`,
      `.htaccess`, `404error.png`, image folders (`hero/`, `about/`, …).
- Old-site zips (4 files, ~800 MB) moved to `/home/precisec` as rollback backup — keep ≥ 30 days.

## 4. Phase 2 — cPanel settings (owner)

- [x] **FTP Accounts** → deploy user recreated: `precise@precisecarpetcleaning.com.au` → root
      `/home/precisec/public_html`; GitHub secrets `FTP_USERNAME`/`FTP_PASSWORD` updated 8 Oct.
- [ ] **Domains** → `precisecarpetcleaning.com.au` → Document Root = `/public_html`.
- [ ] **Redirects**: 301 Permanent, `https://new.precisecarpetcleaning.com.au/(.*)` →
      `https://precisecarpetcleaning.com.au/$1` (subdomain currently returns **404**, not 301).
- [ ] **SSL/TLS Status** → run AutoSSL on the main domain; re-check after ~5 min.

## 5. Phase 3 — redeploy (dev) — ✅ DONE 8 Oct 2026

```bash
gh workflow run deploy.yml
gh run watch   # wait for: Deploy site to public_html/ + Deploy admin panel
```

- [x] Workflow green (run 37830988811).
- [x] Config step log says `admin/config.php written for 2 account(s)`.

## 6. Phase 4 — verification checklist (dev) — ✅ DONE 8 Oct 2026

Run after the deploy finishes (allow 1–2 min for propagation):

```bash
# 1. New build is live on the MAIN domain
curl -s https://precisecarpetcleaning.com.au/ | grep -c "_next"        # expect > 0
curl -s https://precisecarpetcleaning.com.au/ | grep -c "Get in Touch" # expect 1

# 2. Gallery before/after sliders
curl -s https://precisecarpetcleaning.com.au/gallery/ | grep -o "Transformation No\. [0-9]*" | sort -u

# 3. Clean URLs + 404 page
curl -s -o /dev/null -w "%{http_code}\n" https://precisecarpetcleaning.com.au/pricing/   # 200
curl -s -o /dev/null -w "%{http_code}\n" https://precisecarpetcleaning.com.au/nope/      # 404 (our page, not the old site)

# 4. Admin panel
curl -s -o /dev/null -w "%{http_code}\n" https://precisecarpetcleaning.com.au/admin/login.php  # 200
# then in the browser: super admin sees 11 editors, limited admin sees 4 (Home, Pricing, Contact, Media)

# 5. Subdomain redirect (if 301 was added)
curl -sI https://new.precisecarpetcleaning.com.au/ | head -1           # expect HTTP/1.1 301
```

Manual browser pass: homepage hero → form → offers; `/contact` (map in left column,
black buttons, black toggle); `/gallery` (drag sliders, no videos); `/pricing`;
admin login both roles.

**Results (8 Oct 2026, run 37830988811):**
- `/` → 200, `_next` ×2, "Get in Touch" ×1 ✅
- `/gallery/` → 200, Transformations 01, 04–11 ✅ *(02/03 missing — no such image files in repo, pre-existing)*
- `/pricing/` → 200 · `/nope/` → 404 ✅
- `/admin/login.php` → 200, `admin/config.php written for 2 account(s)` ✅
- `http://` → 301 → `https://` ✅
- Legacy `assets/css/style.min.css` and `index.php` → 404 ✅
- `new.` subdomain → 404 *(needs 301 redirect — Phase 2)*

- [x] All checks above pass.
- [x] No legacy files remain (`assets/`, `index.php` return 404).
- [ ] Manual browser pass (hero → form → offers, contact, gallery sliders, admin both roles).

## 7. Phase 5 — post-launch (SEO / housekeeping)

- [ ] Google Search Console: submit updated `sitemap.xml` for the main domain.
- [ ] If `new.` was ever indexed: confirm 301s resolve with content (not soft-404).
- [ ] Update Google Business Profile / social links to the main domain URL.
- [ ] Old GA/GTM snippets from the legacy site are gone (our build has its own tags).
- [ ] Remove the subdomain's SSL entry in cPanel after Phase 2 redirect is confirmed.
- [ ] Keep the `public_html` backup for ≥ 30 days.

## 8. Rollback

1. Re-upload the Phase 2 backup zip into `public_html` (restores the legacy site).
2. Point the deploy user's FTP root back to the subdomain folder and re-run
   `gh workflow run deploy.yml` (restores the working `new.` site).
3. Revert Document Root / DNS changes if they were modified.

---

### Responsibility split

| Step | Who |
|---|---|
| Phases 1–2 (cPanel file move, FTP root, domains, SSL) | Site owner |
| Phase 3 (trigger deploy), Phase 4 (verification) | Dev |
| Phase 5 (SEO / listings) | Owner or marketing |
