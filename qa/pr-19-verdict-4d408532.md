# PASS

QA white-hat de la PR brouillon [#19](https://github.com/manzilionellm-dotcom/com/pull/19) (`fix/remove-support-mailto-no-mx`).

- **Tip :** `4d40853299080b47f4244527c77b758237e97778` — `fix(contact): remove undeliverable support@ mailto`
- **Base #15 :** `1f03023659ba337f9c347cc8ec813860eef31842` (`cursor/remove-unverified-claims-176e`)
- **Diff :** 7 fichiers, +9 / −22 (identique au compte GitHub)
- **État :** brouillon, `mergeable: MERGEABLE`, `mergeStateStatus: CLEAN`. Non fusionnée, non sortie du brouillon, branche de #19 non poussée par cette QA.

Chaque constat est étiqueté **FAIT**, **INFÉRENCE** ou **HYPOTHÈSE**.

---

## 1. Gates et CI

| Gate | Tip `4d40853` | Base #15 `1f03023` |
| --- | --- | --- |
| `pnpm install --frozen-lockfile` | **FAIT** exit 0 (pnpm 10.6.2, Node 22.14.0) | **FAIT** exit 0 |
| `pnpm lint` (`next lint`) | **FAIT** exit 0, aucun warning | **FAIT** exit 0 |
| `pnpm exec tsc --noEmit` | **FAIT** exit 0 | **FAIT** exit 0 |
| `validate:content` | **FAIT** absent de `package.json` (scripts : `dev`, `build`, `start`, `lint`, `type-check` uniquement). Non exécuté, des deux côtés. | idem |
| `pnpm build` (`next build`) | **FAIT** exit 0, 46 pages générées | **FAIT** exit 0, 46 pages générées |

`next.config.ts` a `eslint.ignoreDuringBuilds: true` et `typescript.ignoreBuildErrors: false`. Le lint a donc été lancé à part ; le build a quand même revérifié les types. **FAIT.**

**CI du tip** (`gh pr checks 19` et statut du commit) : **FAIT** `Vercel` success (deployment completed) et `Vercel Preview Comments` success. Aucun autre check sur ce SHA.

**CI de la base #15** : **FAIT** mêmes deux checks Vercel, success.

**Workflow Actions `usine`** (id `319897429`, `state: active` dans l’API) : **FAIT** `.github/workflows/usine.yml` est absent de `origin/main` (`6a474d2`) et du tip ; l’API contents renvoie 404. Aucun run sur ces SHA. Derniers runs listés : juillet 2026, branche `claude/usine-v10-iptv-setup-h1sp35`. **HYPOTHÈSE :** l’enregistrement Actions est orphelin (fichier plus sur `main`). Ce n’est pas un échec de #19 : aucun check en échec.

## 2. Adresses et WhatsApp

**FAIT — code source (rg sur le tip, hors `ACQUISITION_LOG.md`).** `SITE.email`, `NEXT_PUBLIC_CONTACT_EMAIL`, `support@` et `mailto:` : 0 occurrence dans les fichiers servis. La seule occurrence restante de `SITE.email` / `support@bestiptv-vip.com` est `ACQUISITION_LOG.md:217`. `.env.example` n’a plus `NEXT_PUBLIC_CONTACT_EMAIL`.

**FAIT — HTML construit du tip.** 39 HTML statiques sous `.next/server/app` (toutes les pages ○/●), plus `sitemap.xml`, et, via `next start`, les routes dynamiques `/checkout/cancel`, `/checkout/success`, `/robots.txt`.

| Motif | Tip (HTML construit) | Base #15 (HTML statique, avant ce commit) |
| --- | --- | --- |
| `support@` | 0 | 242 occurrences, 38 fichiers |
| `mailto:` | 0 | 115 occurrences, 38 fichiers |
| `@iptv` | 0 | 0 |
| autre adresse | uniquement le placeholder `you@email.com` | non recompté (le tip est le sujet) |

**FAIT —** le jeton `you@email.com` est le placeholder du champ `LeadForm` (`components/LeadForm.tsx`, hors diff) rendu sur `/contact` et `/free-trial`. Ce n’est pas une boîte du site : pas de `mailto:`, pas de `support@`, pas de `@iptv`. **INFÉRENCE :** ce n’est pas un e-mail public de contact. Préexistant, non introduit par #19. Ne fait pas échouer le critère.

**FAIT —** le mot « email » reste dans la prose, sans adresse : privacy (« WhatsApp number, email », « WhatsApp / email enquiries », « notified via WhatsApp or email ») et terms (« notified via WhatsApp or email at least 14 days »). Hors critère « e-mail public ». Pas un échec.

**FAIT — WhatsApp, seul numéro.** Dans tout le HTML construit et les réponses servies : `wa.me/447307410512` et `+447307410512` uniquement. JSON-LD `ContactPoint.telephone` = `+447307410512`. Aucun autre numéro de téléphone. Le repli dans `lib/site.ts` reste `"447307410512"`.

### Avant / après (phrase de contact)

Pied de page, `components/SiteFooter.tsx` — **FAIT**, le `mailto:` est retiré, sans phrase nouvelle dans le bas de page. Le bouton déjà présent « Chat on WhatsApp » (`https://wa.me/${SITE.whatsapp}`) reste.

- Avant : `<a href={\`mailto:${SITE.email}\`}>{SITE.email}</a>` sous « Optimized for fast, stable 4K streaming worldwide. »
- Après : ce lien n’est plus là. Le paragraphe s’arrête à « Optimized for fast, stable 4K streaming worldwide. »

`/contact` — **FAIT**, le bloc e-mail est retiré. La page dit d’écrire sur WhatsApp et affiche le numéro.

- Avant : titre « Contact — WhatsApp and Email » ; chapeau « Write on WhatsApp or email. » ; carte `<a href={\`mailto:${SITE.email}\`}>` avec `<h4>Email</h4>` et `{SITE.email}`.
- Après : titre « Contact — WhatsApp » ; chapeau « Write on WhatsApp. This page does not promise a reply time or a list of support languages. » ; carte WhatsApp conservée, `<p>+{SITE.whatsapp}</p>` rendu `+447307410512`.

`/privacy` — **FAIT**, quatre phrases remplacées par « via WhatsApp (+{SITE.whatsapp}) », rendu « Contact us via WhatsApp (+447307410512). » (et variantes « withdraw consent » / « Submit requests » / « Questions or data requests: contact us via WhatsApp »).

- Avant (extrait) : `Contact: {SITE.email}.` / `via {SITE.email}` / `Submit requests to {SITE.email}.` / `Questions or data requests: {SITE.email} or WhatsApp +{SITE.whatsapp}.`

`/terms`

- Avant : `Questions: {SITE.email} or WhatsApp +{SITE.whatsapp}.`
- Après : `Questions: contact us via WhatsApp (+{SITE.whatsapp}).`

`/refund`

- Avant : `WhatsApp +{SITE.whatsapp} (fastest) or {SITE.email}.`
- Après : `Contact us via WhatsApp (+{SITE.whatsapp}).`

**FAIT —** la phrase demandée est bien celle du code, avec le numéro complet `+447307410512` (préfixe +44), pas le littéral « (+44) » seul.

## 3. #13, #14 et `ACQUISITION_LOG.md`

**FAIT —** fichiers de #19 : `.env.example`, `app/contact/page.tsx`, `app/privacy/page.tsx`, `app/refund/page.tsx`, `app/terms/page.tsx`, `components/SiteFooter.tsx`, `lib/site.ts`.

**FAIT —** #13 (`25563c6`) ne touche que `app/layout.tsx`, `app/page.tsx`, `components/ProcessProof.tsx`. #14 (`b579521`) ne touche que `app/status/page.tsx`. Intersection avec le diff de #19 : vide. Ces fichiers ne bougent pas entre la base #15 et le tip.

**FAIT —** `ACQUISITION_LOG.md:217` est toujours là (`SITE.email = support@bestiptv-vip.com`). Le fichier n’est pas sous `public/` (contenu : icônes, `manifest.json`, `sw.js`, `og-image.png`). **FAIT —** aucun import : la seule mention du nom de fichier est dans `ACQUISITION_LOG.md` lui-même. Document interne, non servi.

## 4. Réserve — `/llms.txt` (lot suivant, pas un échec de #19)

**FAIT —** `app/llms.txt/route.ts` n’existe pas sur ce tip (ajouté sur `main` par #16, `37add817`, fusionnée). Le build du tip répond **404** sur `/llms.txt`.

**FAIT —** le texte sur `origin/main` et en production (`https://bestiptv-vip.com/llms.txt`, HTTP 200, `text/plain`) contient encore :

> `- [Contact](https://bestiptv-vip.com/contact): WhatsApp number and email published on this page.`

**Réserve pour un lot suivant :** retirer le mot « email » de cette ligne une fois #16 présent dans la pile. Pas un FAIL de #19 : le fichier est hors de cette branche, volontairement, pour ne pas le réintroduire au-dessus de #15.

## 5. AggregateRating, M3U, chiffres, merge-tree

**FAIT —** le diff #19 contient 0 `AggregateRating`, 0 `M3U`, et aucune ligne ajoutée avec un chiffre. Le numéro WhatsApp n’est pas un littéral nouveau : c’est `SITE.whatsapp`, déjà là.

**FAIT —** HTML construit du tip : 0 `AggregateRating`.

**FAIT —** des `M3U` préexistants restent hors diff, donc hors de ce correctif : `index.html`, `terms.html`, `free-trial.html`, `blog/best-iptv-2026.html`, `guides/pc-mac.html`, et le HTML servi de `/checkout/success`. Fichiers non modifiés par #19 (l’accueil est le terrain de #13, que #19 ne doit pas toucher). Pas une régression de #19.

**FAIT —** `git merge-tree --write-tree` du tip avec chaque tête, exit 0, stderr vide, aucune ligne `CONFLICT` :

| Cible | SHA | merge-base | Résultat |
| --- | --- | --- | --- |
| #13 | `25563c6a73301a21d50512661b72cdeaef6843d0` | `cbff1e5` | propre |
| #14 | `b57952147144ca1f200cb56fef0250aa3f912af5` | `cbff1e5` | propre |
| #15 | `1f03023659ba337f9c347cc8ec813860eef31842` | le tip descend de #15 | propre |
| #16 | `37add817b2b384805753de4579933095087432f2` | `cbff1e5` | propre |

**INFÉRENCE —** un merge ultérieur de #16 ramènera `app/llms.txt/route.ts` sans conflit de fichiers, avec la ligne « email » encore dedans (voir réserve §4).

## Verdict

**PASS.** Le tip retire le `mailto:` et `support@` du code servi, les gates passent sur le tip et sur #15, le seul numéro est `447307410512`, #13 et #14 ne sont pas touchés, les merge-trees sont propres. La ligne « email » de `/llms.txt` est une réserve de lot suivant, pas un échec de cette PR.
