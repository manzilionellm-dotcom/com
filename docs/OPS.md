# Ops — Best IPTV VIP

Single WhatsApp for every brand: **+44 7307 410512** (`447307410512`).

## Redeploy

Git push to `main` on `manzilionellm-dotcom/com` triggers Vercel. If the CDN is stale:

1. Vercel → project **com** → Deployments
2. Latest Production → ⋯ → Redeploy
3. Hobby: no team. Env and domains are dashboard-only.

## Environment (Production + Preview)

| Key | Value |
| --- | --- |
| `NEXT_PUBLIC_WHATSAPP_VIP` | `447307410512` |
| `NEXT_PUBLIC_WHATSAPP_USA` | `447307410512` |
| `NEXT_PUBLIC_WHATSAPP_MZANSI` | `447307410512` |
| `NEXT_PUBLIC_WHATSAPP_TVKING` | `447307410512` |
| `NEXT_PUBLIC_GA4_ID` | paste `G-XXXXXXXX` or leave blank |
| `NEXT_PUBLIC_META_PIXEL_ID` | paste digits or leave blank |

## Domains

Apex `bestiptv-vip.com` + `www` → 301 apex. Wait for TLS on www before ads.

Optional week-2 CNAME to `cname.vercel-dns.com`: `blog.` / `setup.` / `faq.` — canonicals stay on apex.

## GA4

Automated: `page_view`, `whatsapp_click`. Trial sent / paid = sheet this week.

Prefill: `Hi Best IPTV VIP — I want the $10 / $25 / $35 / $60 plan. Device:`

No star ratings, no invented names, no official league claims.
