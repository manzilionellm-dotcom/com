# assumptions.md — autonomous SEO transform (2026-07-19)

Rollback point: git tag `seo-transform-start-2026-07-19` @ 8455dbd.
Working branch: `claude/bestiptv-redesign-to4pmz` (designated by harness; a
separate `seo-transform-<date>` branch is NOT pushed because the environment
pins the push target to this branch — the tag above is the rollback marker).

## Tier A (auto-deduced from the repo)
- DOMAINE = bestiptv-vip.com · MARQUE = Best IPTV VIP
- LANGUE_PRINCIPALE = `en` (English) = x-default.
  Evidence: `<html lang="en">` in root layout, USD pricing, `.com`, all
  interior pages authored in English. This is what the code actually serves.
- LANGUES_SECONDAIRES (UX only) = fr, ar (only languages with real homepage
  translations). es/de were declared in hreflang/sitemap but have **no**
  translation anywhere → removed (zero-fabrication), not served.
- DEVISE = USD ($). MARCHÉ = worldwide/English (no single {PAYS} in the code).

## Key decisions (most-probable hypothesis, R1 — logged, not asked)
1. **Language architecture (Phase A).** The site uses `?lang=` + client-side
   swap; SSR serves English on every URL (measured, Phase 0.4). Making it a
   true multilingual site (path-based `/fr/`, `/ar/` + translated interior
   pages + per-market city hubs) is a multi-session greenfield that A2
   forbids doing speculatively and that would risk the working English site.
   → **Chosen interim fix:** declare the site as single indexable language
   `en` (x-default) and REMOVE the false `fr/ar/es/de` hreflang alternates
   that resolve to English HTML. The FR/AR toggle stays as pure UX (no SEO
   claim). This makes the declared language == the served language on 100%
   of URLs, which is the Phase A DoD. Full path-based i18n is scoped as an
   explicit follow-on requiring the Tier-B market inputs.
2. **No URL is removed or renamed** — only metadata/hreflang corrected and a
   duplicated brand suffix stripped. URL set is invariant (proof by diff).
3. **CI deep teardown / A2 city hubs / G content cadence** require choosing a
   real target market + verified Tier-B values (competitors, local payments,
   real channel/VOD counts, cities). Those are NOT fabricated here; they are
   listed as excluded/pending in the final report per the zero-fabrication
   rule.

## Excluded (Tier B not verifiable in this environment)
- Competitor SERP set for a specific {PAYS} (no market fixed; would need live
  SERP for a chosen country).
- Local payment rails, {SPORT_LOCAL}, {VILLES}, {PRIX_MIN} in local currency.
- Real backlink/traffic/keyword data (needs Ahrefs/SEMrush/SimilarWeb).

## Publication access (R6)
- Google Search Console: NOT available → GSC submission BLOQUÉ.
- IndexNow key: NOT available → IndexNow ping BLOQUÉ.
- Vercel deploy rights for this project: NOT confirmed → deploy BLOQUÉ.
  These stop at "BLOQUÉ: accès manquant" in the report — never simulated.
