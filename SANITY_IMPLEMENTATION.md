# Sanity CMS Implementation Guide
## Precise Carpet Cleaning Website

---

## 1. Project Setup

### Install Dependencies
```bash
npm install sanity @sanity/client @sanity/image-url @sanity/studio
```

### Initialize Sanity
```bash
npx sanity@latest init
```
- Project name: `precise-carpet-cleaning`
- Dataset: `production`
- Template: `Clean project with no predefined schemas`
- Output path: `./sanity`

### Environment Variables (.env.local)
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=<your-project-id>
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=<your-api-token>
ADMIN_PASSWORD=<your-admin-password>
```

---

## 2. Sanity Configuration

### sanity/sanity.config.ts
```ts
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemaTypes";

export default defineConfig({
  name: "precise-carpet-cleaning",
  title: "Precise Carpet Cleaning",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: "production",
  plugins: [structureTool()],
  schema: { types: schemaTypes },
});
```

### sanity/schemaTypes/index.ts
```ts
import { type SchemaTypeDefinition } from "sanity";
import hero from "./hero";
import navigation from "./navigation";
import service from "./service";
import pricing from "./pricing";
import featureStrip from "./featureStrip";
import testimonial from "./testimonial";
import faq from "./faq";
import cleaningOffer from "./cleaningOffer";
import blogArticle from "./blogArticle";

export const schemaTypes: SchemaTypeDefinition[] = [
  hero,
  navigation,
  service,
  pricing,
  featureStrip,
  testimonial,
  faq,
  cleaningOffer,
  blogArticle,
];
```

---

## 3. Content Schemas

### sanity/schemaTypes/hero.ts
```ts
export default {
  name: "hero",
  title: "Hero Section",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string" },
    { name: "subtitle", title: "Subtitle", type: "string" },
    { name: "description", title: "Description", type: "text" },
    { name: "backgroundImage", title: "Background Image", type: "image" },
    { name: "ctaText", title: "CTA Button Text", type: "string" },
    { name: "ctaLink", title: "CTA Button Link", type: "string" },
  ],
  preview: { prepare: () => ({ title: "Hero Section" }) },
};
```

### sanity/schemaTypes/navigation.ts
```ts
export default {
  name: "navigation",
  title: "Navigation",
  type: "document",
  fields: [
    {
      name: "links",
      title: "Nav Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Name", type: "string" },
            { name: "href", title: "Link", type: "string" },
          ],
        },
      ],
    },
    { name: "phone", title: "Phone Number", type: "string" },
    { name: "email", title: "Email", type: "string" },
    { name: "facebookUrl", title: "Facebook URL", type: "url" },
    { name: "instagramUrl", title: "Instagram URL", type: "url" },
  ],
  preview: { prepare: () => ({ title: "Navigation" }) },
};
```

### sanity/schemaTypes/service.ts
```ts
export default {
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string" },
    { name: "slug", title: "Slug", type: "slug", options: { source: "title" } },
    { name: "description", title: "Description", type: "text" },
    { name: "image", title: "Card Image", type: "image" },
    { name: "detailImage", title: "Detail Page Image", type: "image" },
    {
      name: "sections",
      title: "Detail Sections",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Section Title", type: "string" },
            { name: "content", title: "Content", type: "text" },
            { name: "list", title: "List Items", type: "array", of: [{ type: "string" }] },
          ],
        },
      ],
    },
  ],
  preview: {
    select: { title: "title", media: "image" },
  },
};
```

### sanity/schemaTypes/pricing.ts
```ts
export default {
  name: "pricing",
  title: "Pricing Card",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string" },
    { name: "price", title: "Price", type: "string" },
    { name: "buttonText", title: "Button Text", type: "string", initialValue: "Enquire Now" },
    { name: "order", title: "Display Order", type: "number" },
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "title", subtitle: "price" },
  },
};
```

### sanity/schemaTypes/featureStrip.ts
```ts
export default {
  name: "featureStrip",
  title: "Feature Strip",
  type: "document",
  fields: [
    {
      name: "features",
      title: "Features",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "text", title: "Text", type: "string" },
            { name: "textLine2", title: "Text Line 2 (optional)", type: "string" },
            { name: "icon", title: "Icon (SVG path)", type: "image" },
          ],
        },
      ],
    },
  ],
  preview: { prepare: () => ({ title: "Feature Strip" }) },
};
```

### sanity/schemaTypes/testimonial.ts
```ts
export default {
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    { name: "name", title: "Name", type: "string" },
    { name: "quote", title: "Quote", type: "text" },
    { name: "avatar", title: "Avatar", type: "image" },
    { name: "rating", title: "Rating (1-5)", type: "number", validation: (Rule: any) => Rule.min(1).max(5) },
    { name: "order", title: "Display Order", type: "number" },
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
};
```

### sanity/schemaTypes/faq.ts
```ts
export default {
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    { name: "question", title: "Question", type: "string" },
    { name: "answer", title: "Answer", type: "text" },
    { name: "order", title: "Display Order", type: "number" },
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
};
```

### sanity/schemaTypes/cleaningOffer.ts
```ts
export default {
  name: "cleaningOffer",
  title: "Cleaning Offer",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string" },
    { name: "slug", title: "Slug", type: "slug", options: { source: "title" } },
    { name: "description", title: "Description", type: "text" },
    { name: "image", title: "Image", type: "image" },
    { name: "order", title: "Display Order", type: "number" },
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
};
```

### sanity/schemaTypes/blogArticle.ts
```ts
export default {
  name: "blogArticle",
  title: "Blog Article",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string" },
    { name: "slug", title: "Slug", type: "slug", options: { source: "title" } },
    { name: "date", title: "Date", type: "date" },
    { name: "image", title: "Featured Image", type: "image" },
    { name: "excerpt", title: "Excerpt", type: "text" },
    {
      name: "sections",
      title: "Sections",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Section Title", type: "string" },
            { name: "content", title: "Content", type: "text" },
            { name: "image", title: "Section Image", type: "image" },
          ],
        },
      ],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "date", media: "image" },
  },
};
```

---

## 4. Sanity Client Setup

### src/lib/sanity.ts
```ts
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// Helper queries
export async function getHero() {
  return client.fetch('*[_type == "hero"][0]');
}

export async function getNavigation() {
  return client.fetch('*[_type == "navigation"][0]');
}

export async function getServices() {
  return client.fetch('*[_type == "service"] | order(order asc)');
}

export async function getServiceBySlug(slug: string) {
  return client.fetch('*[_type == "service" && slug.current == $slug][0]', { slug });
}

export async function getPricingCards() {
  return client.fetch('*[_type == "pricing"] | order(order asc)');
}

export async function getFeatureStrip() {
  return client.fetch('*[_type == "featureStrip"][0]');
}

export async function getTestimonials() {
  return client.fetch('*[_type == "testimonial"] | order(order asc)');
}

export async function getFaqs() {
  return client.fetch('*[_type == "faq"] | order(order asc)');
}

export async function getCleaningOffers() {
  return client.fetch('*[_type == "cleaningOffer"] | order(order asc)');
}

export async function getBlogArticles() {
  return client.fetch('*[_type == "blogArticle"] | order(date desc)');
}

export async function getBlogArticleBySlug(slug: string) {
  return client.fetch('*[_type == "blogArticle" && slug.current == $slug][0]', { slug });
}
```

---

## 5. Admin Page

### src/app/admin/page.tsx
```tsx
"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../sanity/sanity.config";

export default function AdminPage() {
  return <NextStudio config={config} />;
}
```

### Password Protection — src/middleware.ts
```ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const authHeader = request.headers.get("authorization");

  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (!authHeader || !checkBasicAuth(authHeader)) {
      return new NextResponse("Unauthorized", {
        status: 401,
        headers: { "WWW-Authenticate": 'Basic realm="Admin"' },
      });
    }
  }

  return NextResponse.next();
}

function checkBasicAuth(header: string): boolean {
  const base64 = header.split(" ")[1];
  const decoded = atob(base64);
  const [username, password] = decoded.split(":");
  return (
    username === "admin" &&
    password === (process.env.ADMIN_PASSWORD || "precise2024")
  );
}

export const config = {
  matcher: ["/admin/:path*"],
};
```

---

## 6. Update Components (Replace Hardcoded Data)

### Example: Hero Section Update
```tsx
// Before (hardcoded):
<h1>Sydney's Carpet Cleaning Experts</h1>

// After (Sanity):
import { getHero } from "@/lib/sanity";

export default async function Hero() {
  const hero = await getHero();
  return <h1>{hero.title}</h1>;
}
```

### Example: Services Update
```tsx
// Before:
const SERVICES = [ ... ];

// After:
import { getServices } from "@/lib/sanity";

export default async function OurServices() {
  const services = await getServices();
  return services.map(service => <ServiceCard key={service._id} service={service} />);
}
```

### Components to Update (Phase 1)
| Component | File Path | Content to Fetch |
|---|---|---|
| Hero | `src/components/homepage/heroSection.tsx` | `getHero()` |
| Header | `src/components/layout/header.tsx` | `getNavigation()` |
| Homepage Header | `src/components/layout/homepageHeader.tsx` | `getNavigation()` |
| Our Services | `src/components/homepage/ourServices.tsx` | `getServices()` |
| Services Page | `src/app/services/page.tsx` | `getServices()` |
| Service Detail | `src/app/services/[id]/page.tsx` | `getServiceBySlug()` |
| Pricing Page | `src/app/pricing/page.tsx` | `getPricingCards()` |
| Cleaning Offers | `src/components/homepage/cleaningOffers.tsx` | `getCleaningOffers()` |
| Feature Strip | `src/components/homepage/heroSection.tsx` | `getFeatureStrip()` |

---

## 7. Image Handling

```tsx
import { urlFor } from "@/lib/sanity";

// In component:
<Image
  src={urlFor(service.image).width(800).height(600).url()}
  alt={service.title}
  width={800}
  height={600}
/>
```

---

## 8. ISR (Incremental Static Regeneration)

```tsx
// For pages that use Sanity data, add revalidation:
export const revalidate = 60; // Revalidate every 60 seconds
```

---

## 9. Deployment

### Vercel Environment Variables
```
NEXT_PUBLIC_SANITY_PROJECT_ID=<your-project-id>
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=<your-api-token>
ADMIN_PASSWORD=<your-admin-password>
```

### Steps
1. Push code to GitHub
2. Set env variables in Vercel dashboard
3. Vercel auto-deploys
4. Client accesses `yoursite.com/admin` and logs in

---

## 10. Client Onboarding Checklist

- [ ] Create Sanity account at sanity.io
- [ ] Share Sanity project access with client (invited as editor)
- [ ] Client logs into `yoursite.com/admin` with browser auth
- [ ] Walk client through editing content
- [ ] Show client how to upload images
- [ ] Test published changes appear on live site
- [ ] Document common tasks (change pricing, add service, update hero)

---

## Notes
- Sanity free tier: 100K API requests/month, 5GB asset storage
- Content changes appear within ~60 seconds (ISR revalidation)
- All images are hosted by Sanity CDN (fast global delivery)
- Client can preview changes before publishing
- Version history built-in — can rollback changes
