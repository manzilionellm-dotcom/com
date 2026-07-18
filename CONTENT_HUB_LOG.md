# MOTEUR 3 (BUILD) — IPTV Content Hub · Build Log

> Content core of the site: authority + informational traffic that funnels to the offer.
> Governed by `data/content-map.json` (MOTEUR 1 / INTEL). **RÈGLE D'OR: no data → no page.**

Last build: 2026-07-18 · Branch: `claude/iptv-content-hub-build-rc4ct1`

---

## What shipped this lot

Following the **ORDRE DE CONSTRUCTION** (1. Device Niveau 1 → 3. Help Center → 4. Knowledge Base).
Every page was checked against the QUALITY GATE and carries the funnel (≥1 trial link + ≥1 money-page link).

### INTEL foundation
- `data/content-map.json` — validated keyword/intent/priority map. A page is only generated when its
  keyword appears here with `status: "approved"`. `refused` = fails the gate; `deferred` = justified but staged.

### 1 — Device Niveau 1 · Apps / Players / Boxes (highest buy intent) — `/apps`
`lib/content/apps.ts` + `/apps` hub + `/apps/[app]` (8 pages, SSG):

| App | Slug | Platforms |
|-----|------|-----------|
| IPTV Smarters Pro | `iptv-smarters-pro` | all devices |
| TiviMate | `tivimate` | Android TV / Firestick |
| IBO Player Pro | `ibo-player` | Samsung / LG |
| Duplex IPTV | `duplex-iptv` | Samsung / LG |
| XCIPTV | `xciptv` | Android / Fire / iOS |
| STB Emulator | `stb-emulator` | Android (MAG portal) |
| Sparkle TV | `sparkle-tv` | Samsung / LG |
| Formuler Z | `formuler-z` | Formuler boxes |

Each: answer-first summary · compatibility · key features · step-by-step install · configuration/tips ·
troubleshooting · original FAQ · `HowTo` + `FAQPage` schema · mid-content + footer funnel (trial + `/pricing`).
Honest EEAT notes where a third-party charges a fee (IBO / Duplex / Sparkle / STB / Formuler hardware).

### 3 — Help Center (troubleshooting → contact) — `/help`
`lib/content/help.ts` + `/help` hub + `/help/[topic]` (8 pages, SSG). Format per spec:
**answer-first · probable cause · step-by-step solution · FAQ · WhatsApp support link.**
Topics: buffering, not connecting, freezing/stuttering, black screen, channels not loading,
app crashing, audio out of sync, move to new device. `FAQPage` + `HowTo` schema.

### 4 — Knowledge Base (most-searched questions) — `/kb`
`lib/content/kb.ts` + `/kb` hub + `/kb/[slug]` (8 pages, SSG). Format per spec:
**answer-first · explanatory sections · FAQ · `FAQPage` schema · visible update date.**
Articles: what is IPTV, how to install IPTV, internet speed requirements, improve picture quality,
Xtream vs M3U, what is EPG, VPN setup, is IPTV legal (balanced/honest — no legal advice).

### Wiring
- `lib/site.ts`: `APP_SLUGS`, `HELP_SLUGS`, `KB_SLUGS` + types.
- `app/sitemap.ts`: hubs + all 24 detail URLs added.
- `components/SiteHeader.tsx`: nav now has **Apps** + **Help**.
- `components/SiteFooter.tsx`: new **Setup & Help** column.

Build: `pnpm type-check` clean · `pnpm build` green · 24 new static pages prerendered.

---

## QUALITY GATE decisions

**Approved & built (24):** all pages above — each adds new/complete info, real setup examples,
original FAQ, schematic illustration (emoji/iconography + structured steps until real screenshots land),
and both funnel links.

**Deferred (justified, not yet built)** — tracked in `content-map.json`:
- Device Niveau 2 deep-dives: Google TV, NVIDIA Shield (core devices already live under `/guides`).
- Device Niveau 4 (honest angle required): Roku, Chromecast — must state *limited support + workaround*,
  never oversell (protects EEAT). Build only with the honesty framing.

**Refused (fail the gate):**
- `free-iptv-links-2026` — no original info, no funnel value, liability/EEAT risk.
- `iptv-generator` — deceptive intent, cannot pass the gate honestly.

---

## Illustrations / Video (staged, per spec)
Real screenshots and short videos (Niveau 1–2 apps + top 5 KB) are the next enrichment pass —
**they must never delay a useful page**, so pages shipped with structured steps + iconography now.
Transcriptions will accompany any video (GEO: LLMs read text, not video). Tracked under MAINTENANCE.

## MAINTENANCE hooks (monthly, for MOTEUR 4 / AUTOPILOT)
- Verify guides still match current app UIs · refresh app version references (e.g. MOL2/MOL3, Z11).
- Add real screenshots · check outbound/internal links · archive anything obsolete.
- Re-pull `content-map.json` from INTEL; promote `deferred` → `approved` when volume/gate justify.

## KPI to watch (Search Console + analytics)
Organic clicks · impressions · CTR · time on page · **click-through to trial / money page** (the KPI that
matters) · guide success rate · pages needing refresh.
