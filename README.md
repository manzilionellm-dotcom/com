# Best IPTV VIP

Marketing landing page for **Best IPTV VIP** built with Next.js 15 (App Router), React 19, TypeScript and Tailwind CSS 4. Deployed on Vercel.

## Features

- Single-page localized site (EN / FR / AR with RTL)
- Country-specific channel modal
- WhatsApp ordering flow
- Tailwind 4 + Radix UI primitives
- SEO: structured data (Organization, WebSite, Product, FAQPage), `sitemap.ts`, `robots.ts`, hreflang

## Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 15.3.8 (App Router) |
| Language | TypeScript 5.8 |
| UI | React 19, Tailwind CSS 4, Radix UI, lucide-react |
| Hosting | Vercel |
| Package manager | pnpm 10 |

## Local development

```bash
pnpm install
pnpm dev
# open http://localhost:3000
```

## Build

```bash
pnpm build
pnpm start
```

## Project layout

```
app/
  layout.tsx     # Metadata, JSON-LD (Organization + WebSite), hreflang
  page.tsx       # Single-page UI (EN/FR/AR dictionary)
  sitemap.ts     # /sitemap.xml
  robots.ts      # /robots.txt
  globals.css
components/      # Reusable UI primitives
lib/             # Helpers
public/          # Static assets (favicon, manifest, sw)
```

## Deployment

The production site is deployed on Vercel from the `main` branch. Pull requests get preview deployments automatically.

## License

See `LICENSE`.
