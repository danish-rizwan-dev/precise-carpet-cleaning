# Precise Carpet Cleaning - Website Audit Report

> Last audited: September 14, 2026

---

## Summary

| Severity | Count |
|----------|-------|
| Critical | 10 |
| Major | 15 |
| Minor | 21 |
| **Total** | **46** |

| Category | Critical | Major | Minor |
|----------|----------|-------|-------|
| SEO | 7 | 4 | 6 |
| Content/Business Logic | 3 | 0 | 0 |
| Performance | 0 | 4 | 2 |
| Code Quality | 0 | 4 | 8 |
| Visual/Glitch | 0 | 0 | 4 |

### Top 5 Priority Fixes

1. **Fix the SITE_URL** (`layout.tsx:13`) — currently pointing to Framer staging domain
2. **Fix contact page business information** (`contact/page.tsx`) — wrong phone, wrong address, wrong email
3. **Fix footer links** (`footer.tsx`) — all `href="#"` placeholders
4. **Replace "Neatly" brand references** (`services.ts`, `privacy-policy/page.tsx`) — template leftover brand name
5. **Create `sitemap.ts` and `robots.txt`** — essential for search engine crawling

---

## CRITICAL SEVERITY

### SEO

**C1. SITE_URL points to a Framer subdomain, not a production domain**
- File: `src/app/layout.tsx`, line 13
- `const SITE_URL = "https://precisecarpetcleaningservice.framer.website";`
- The entire metadata system (OG, Twitter, metadataBase) resolves to a Framer staging URL. This is the URL indexed by search engines and shared on social media.
- Fix: Change to the actual production domain (e.g., `https://www.precisecarpetcleaning.com.au`).

**C2. Missing `robots.txt` file**
- File: `public/robots.txt` — does not exist
- Without a robots.txt, crawlers use default rules. While not blocking anything, it is a standard SEO signal.
- Fix: Create `public/robots.txt` with `User-agent: * \n Allow: / \n Sitemap: https://yourdomain.com/sitemap.xml`.

**C3. Missing `sitemap.xml` (or Next.js sitemap route)**
- File: `public/sitemap.xml` — does not exist. Also no `src/app/sitemap.ts` route handler.
- A sitemap is critical for search engine discovery of all pages (services, blogs, about, contact).
- Fix: Create `src/app/sitemap.ts` that dynamically generates all URLs from `servicesData` and `articlesData`.

**C4. No structured data (JSON-LD) anywhere in the site**
- No file contains `application/ld+json` or any schema.org markup.
- A carpet cleaning business should have `LocalBusiness`, `FAQPage`, and `Service` structured data for rich results.
- Fix: Add a `<script type="application/ld+json">` block in `layout.tsx` or individual pages.

**C5. Missing `h1` tag on the homepage**
- File: `src/app/page.tsx` / `src/components/homepage/heroSection.tsx`
- The `h1` is inside `heroSection.tsx` via `<WordReveal as="h1">`. If WordReveal renders an actual `h1`, this is OK.
- Additionally, `<section>` elements throughout the homepage and other pages lack any `<h1>`. Only the service detail and blog detail pages have `<h1>` tags. The homepage, services listing, blogs listing, contact, and about pages have no visible `<h1>`.

**C6. Services detail page (`/services/[id]`) has no per-page metadata**
- File: `src/app/services/[id]/page.tsx`
- This is a `"use client"` component. It cannot export `metadata`. There is no server-side metadata for any dynamic service page.
- Fix: Convert to a Server Component or use `generateMetadata` in a separate file.

**C7. Blog detail page (`/blogs/[id]`) has no per-page metadata**
- File: `src/app/blogs/[id]/page.tsx`
- Same issue as C6 — entirely client-side, no `generateMetadata`.
- Fix: Use server component pattern or add `generateMetadata`.

### Content / Business Logic

**C8. Contact page has wrong business information (hardcoded template data)**
- File: `src/app/contact/page.tsx`, lines 101, 108, 115, 118
- Phone number: `+321 654 - 8520` — this is NOT the actual business phone (`0434 161 161` used everywhere else).
- Address: `552 W 48th Street, New York, NY 10036` — this is a New York address for a Sydney-based business.
- Email: `hello@Neatly.com` — this is from a template brand "Neatly", not "Precise Carpet Cleaning".
- Fix: Replace all with the actual Precise Carpet Cleaning business details.

**C9. Footer links are all placeholder `href="#"` anchors**
- File: `src/components/layout/footer.tsx`, lines 109, 115, 128, 134, 147, 152
- All navigation links ("Home", "About Us", "Services", "Contact", "Privacy Policy", "Terms and Conditions") point to `#` instead of actual page routes.
- Fix: Replace with actual `href` values like `/`, `/about`, `/services`, `/contact`, `/privacy-policy`.

**C10. Header navigation links to non-existent pages**
- File: `src/components/layout/header.tsx` and `homepageHeader.tsx`, lines 27-36
- Links to `/blogs/details`, `/appointment`, `/privacy-policy`, and `/404` may lead to broken or unexpected pages.
- The `navLinks` array exposes internal development routes like `/404` to users.
- Fix: Remove `/404` and `/blogs/details` from nav. Verify `/appointment` and `/privacy-policy` pages exist and work.

---

## MAJOR SEVERITY

### SEO

**M1. "Pricing" link in navigation points to `/about`**
- File: `src/components/layout/header.tsx`, line 181 and `homepageHeader.tsx`, line 215
- `<Link href="/about">Pricing</Link>` — misleading link text. The "About" page is labeled as "Pricing".
- Fix: Either create a dedicated pricing page or relabel this link to "About".

**M2. Duplicate `OFFERS` data array defined in two files**
- File: `src/components/homepage/cleaningOffers.tsx` (lines 8-57) and `src/app/services/page.tsx` (lines 73-122)
- Identical offer data is duplicated. If one is updated but not the other, content drift will occur.
- Fix: Extract to a shared data file (e.g., `src/data/offers.ts`).

**M3. Open Graph image uses a relative path**
- File: `src/app/layout.tsx`, lines 48, 59
- `url: "/hero/herobackgroundimage.png"` — OG images should be absolute URLs for proper rendering on social platforms.
- Fix: Use `${SITE_URL}/hero/herobackgroundimage.png`.

**M4. No `<main>` landmark on several pages**
- File: `src/app/contact/page.tsx` (uses `<section>`)
- File: `src/app/blogs/page.tsx` (uses `<section>`)
- File: `src/app/about/page.tsx` (uses `<>` fragment)
- File: `src/app/services/[id]/page.tsx` (uses `<section>`)
- Missing `<main>` wrapper affects accessibility and SEO page structure.
- Fix: Wrap page content in `<main>` tags.

**M5. Missing `alt` text on decorative/functional images in hero**
- File: `src/components/homepage/heroSection.tsx`, lines 189, 206, 225
- Three feature icons (`sameDaysvg.svg`, `safeCleaning.svg`, `24hours.svg`) have `alt=""` but are meaningful icons.
- Fix: Add descriptive alt text like "Same day cleaning icon", "Safe chemicals icon", "24/7 availability icon".

**M6. `servicesData` contains template/placeholder content referencing "Neatly"**
- File: `src/data/services.ts`, multiple lines
- Multiple service descriptions say "At Neatly..." instead of "At Precise...".
- This is leftover template data that will be indexed by search engines with the wrong brand name.
- Fix: Replace all "Neatly" references with "Precise Carpet Cleaning" throughout `services.ts`.

**M7. Service detail page hero images use blog images, not service-specific images**
- File: `src/data/services.ts`, lines 19, 71, 123, 177, 231, 285
- All six services use `/blogs/imageX.png` as their hero image — blog images reused as service images.
- Fix: Use dedicated service images.

### Performance

**M8. All 20 page-level and component files are marked `"use client"`**
- Files: Every page (`page.tsx`) in `src/app/` and every component
- Pages like `about/page.tsx`, `not-found.tsx`, `blogs/page.tsx`, `blogs/[id]/page.tsx`, `services/[id]/page.tsx` have no client-side interactivity and should be Server Components.
- `"use client"` prevents static generation, server-side rendering, and proper metadata exports.
- Fix: Remove `"use client"` from pages that don't need it; only add it to components that use `useState`, `useEffect`, `onClick`, etc.

**M9. Footer uses raw `<img>` tags instead of Next.js `<Image>`**
- File: `src/components/layout/footer.tsx`, lines 30-33, 37-41, 87-95
- `<img src="/FAQS/vacumecleaner.png">`, `<img src="/FAQS/sofa.png">`, `<img src="/logo.svg">`
- No lazy loading, no width/height, no WebP conversion, no srcset.
- Fix: Replace with `<Image>` component from `next/image`.

**M10. No explicit `loading="lazy"` found anywhere**
- All `<Image>` components lack explicit `loading` props (Next.js does add lazy loading by default for non-priority images).
- Some images below the fold should ideally have explicit `loading="lazy"` for clarity.

**M11. Framer-motion is loaded on every page due to client component tree**
- `heroSection.tsx` imports `framer-motion`. Since the layout includes `ConditionalHeader` and the homepage includes Hero, the entire framer-motion bundle is shipped to the client on every page.
- Fix: Consider dynamic imports for framer-motion components, or use CSS animations where possible.

### Code Quality

**M12. Unused import: `FaQ` from `react-icons/fa6`**
- File: `src/app/services/page.tsx`, line 6
- `import { FaQ } from "react-icons/fa6";` is imported but never used.
- Fix: Remove the unused import.

**M13. Hardcoded inline styles for font family instead of using the CSS variable**
- File: `src/components/homepage/heroSection.tsx`, lines 196, 213, 232
- File: `src/components/homepage/testimonials.tsx`, line 222
- `style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}` — redundant with global font.
- Fix: Remove the inline styles; rely on the global CSS class.

**M14. Hardcoded phone numbers scattered across 10+ files**
- Phone `0434 161 161` appears as a hardcoded string in: `heroSection.tsx`, `ourServices.tsx`, `header.tsx`, `homepageHeader.tsx`, `footer.tsx`, `services/[id]/page.tsx`, `cleaningOffers.tsx`.
- Fix: Extract to a constants file (e.g., `src/lib/constants.ts`).

**M15. Hardcoded colors repeated throughout without a design token system**
- Colors like `#0b4255`, `#ffb400`, `#171206`, `#5B5955`, `#FEBF03`, `#f2f7f9` appear dozens of times.
- Fix: Define these in `tailwind.config` or `globals.css` as CSS custom properties or Tailwind theme colors.

---

## MINOR SEVERITY

### SEO

**m1. Missing `alt` text on "User" review avatars**
- File: `src/components/homepage/heroSection.tsx`, line 90
- `alt="User"` — generic alt text for review avatars.
- Fix: Use more descriptive text like "Customer review avatar" or `alt=""` if decorative.

**m2. Missing aria-label on FAQ accordion buttons**
- File: `src/components/homepage/faq.tsx`, lines 109-118
- No `aria-label` and no `aria-expanded` attribute.
- Fix: Add `aria-expanded={isOpen}` and `aria-controls` for each FAQ item.

**m3. Missing aria-labels on CTA buttons**
- File: `src/components/homepage/heroSection.tsx`, lines 141-162
- File: `src/components/homepage/ourServices.tsx`, lines 99-120
- CTA buttons are `<a>` tags but lack `aria-label`.
- Fix: Add `aria-label="Call us at 0434 161 161"` etc.

**m4. Redundant font-family CSS on hero section**
- File: `src/components/homepage/heroSection.tsx`, line 47
- `className="... font-['Plus_Jakarta_Sans',sans-serif]"` — redundant with global.
- Fix: Remove the font-family class from individual components.

**m5. Services and About pages have no page-level metadata**
- File: `src/app/services/page.tsx`, `src/app/about/page.tsx`
- These pages inherit the default title template but have no specific metadata.
- Fix: Export metadata for each page or use `generateMetadata`.

### Visual / Glitch

**m6. Aggressive `overflow-x: hidden !important` on html/body**
- File: `src/app/globals.css`, lines 8-11 and `src/app/layout.tsx`, line 73
- Triple-redundant overflow hidden. The `#__next` selector is for Pages Router, not App Router — it does nothing.
- Fix: Remove the triple redundancy. Keep only one approach. Debug and fix the root cause of horizontal overflow.

**m7. `dangerouslySetInnerHTML` used for inline CSS keyframes**
- File: `src/components/homepage/howItWorks.tsx`, lines 76-84
- A `<style>` tag with `dangerouslySetInnerHTML` is injected for `@keyframes progressFill`.
- Similarly in `faq.tsx`, lines 72-85.
- Fix: Move keyframe animations to `globals.css`.

**m8. Floating images in footer use animation class but keyframes are defined in `faq.tsx`**
- File: `src/components/layout/footer.tsx`, lines 33, 41 — uses `animate-float` and `animate-float-delayed`
- File: `src/components/homepage/faq.tsx`, lines 72-85 — defines these keyframes
- If `faq.tsx` is not mounted, the footer floating animation will not work.
- Fix: Move the `float` and `float-delayed` animations to `globals.css`.

**m9. Mobile menu uses fixed height `h-[379.625px]`**
- File: `src/components/layout/header.tsx`, line 227 and `homepageHeader.tsx`, line 265
- Hardcoded fractional pixel height will break if nav items change.
- Fix: Use `h-auto` or `max-h` with `overflow-y-auto`.

### Performance

**m10. `globals.css` imports `tw-animate-css` for the entire bundle**
- File: `src/app/globals.css`, line 2
- Imports all animations even if only a few are used.
- Fix: Only import the specific animations needed.

**m11. `<meta name="applicationName">` is not standard for SEO**
- File: `src/app/layout.tsx`, line 35
- `applicationName` is a web app manifest property, not a standard meta tag.
- Fix: Remove it or move to a PWA manifest if applicable.

### Code Quality

**m12. Typo in image filename: `petfrirendly.png`**
- File: `src/components/homepage/cleaningOffers.tsx`, line 43
- File: `src/app/services/page.tsx`, line 108
- Should be `petfriendly.png`.

**m13. Typo in image filename: `mattrecesclean.png`**
- File: `src/components/homepage/ourServices.tsx`, line 43
- Should be `mattressclean.png`.

**m14. Typo in image filename: `rugcleaing.png`**
- File: `src/components/homepage/ourServices.tsx`, line 37
- Should be `rugcleaning.png`.

**m15. `not-found.tsx` is unnecessarily a client component**
- File: `src/app/not-found.tsx`, line 1
- Has `"use client"` but only uses `<Link>` and `<Image>` — no state or effects needed.
- Fix: Remove `"use client"`.

**m16. About page uses `<>` fragment instead of `<main>`**
- File: `src/app/about/page.tsx`, line 10
- No semantic `<main>` landmark.
- Fix: Use `<main>` wrapper.

**m17. Contact form `handleSubmit` does nothing**
- File: `src/app/contact/page.tsx`, lines 77-79
- `e.preventDefault()` is called but no data is submitted.
- Fix: Add form submission logic or at minimum show a confirmation message.

**m18. Contact form submit button color inconsistent with design system**
- File: `src/app/contact/page.tsx`, line 233
- `bg-[#2b80f7]` (blue) and `hover:bg-[#eabb00]` (yellow) — blue is not used anywhere else.
- Fix: Use `bg-[#0b4255]` for consistency.

**m19. Testimonials section has excessive `pb-32` padding**
- File: `src/components/homepage/testimonials.tsx`, line 157
- `pb-32` creates significant white space below the testimonials.
- Fix: Tighten the layout spacing.

**m20. The `#__next` selector in globals.css is a Pages Router artifact**
- File: `src/app/globals.css`, line 8
- `#__next` does not exist in App Router projects.
- Fix: Remove `#__next` from the selector.

**m21. Duplicate OFFERS data risks content drift**
- See M2 above.
