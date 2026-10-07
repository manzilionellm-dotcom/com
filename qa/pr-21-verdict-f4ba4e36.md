# PASS

QA white-hat de la PR brouillon [#21](https://github.com/manzilionellm-dotcom/com/pull/21) (`cursor/llms-contact-whatsapp-only-f0ed`).

- **Tip :** `f4ba4e366b9294f68152e0083ebfb4833ae98c33` — `fix(llms): contact line points to WhatsApp only`
- **Parent / `main` :** `6a474d2d2486a304c7bf1ee7ce42f4d7d21840ed`
- **Diff :** 1 fichier, +1 / −1 (`app/llms.txt/route.ts`), identique au compte GitHub
- **État :** brouillon, `mergeable: MERGEABLE`, `mergeStateStatus: CLEAN`. Non fusionnée, non sortie du brouillon. Cette QA n’a pas poussé la branche de #21.

Chaque constat est étiqueté **FAIT**, **INFÉRENCE** ou **HYPOTHÈSE**.

La réserve du PASS #19 est cette ligne, sur `main` (fichier ajouté par #16), absente des branches #15 et #19.

---

## 1. Ligne Contact de `/llms.txt`

**FAIT — source, ligne 76 de `app/llms.txt/route.ts`.**

- Avant (`6a474d2`) : `` `${link(origin, "/contact", "Contact")}: WhatsApp number and email published on this page.` ``
- Après (`f4ba4e36`) : `` `${link(origin, "/contact", "Contact")}: WhatsApp number published on this page.` ``

**FAIT — corps servi.** `next build` pré-rend `/llms.txt` (route ○, 47 pages générées). `next start --port 3456` répond HTTP 200, `content-type: text/plain; charset=utf-8`, `x-nextjs-cache: HIT`, `x-nextjs-prerender: 1`. Le corps HTTP est identique à `.next/server/app/llms.txt.body` (3962 octets).

Ligne servie, une fois :

> `- [Contact](https://bestiptv-vip.com/contact): WhatsApp number published on this page.`

Comptes sur ce corps : « and email » 0, « email » 0 (y compris sous-chaîne), `support@` 0, `mailto:` 0. `SITE.email` n’est pas interpolé : `document()` n’utilise que `SITE.domain`.

**FAIT —** « form » apparaît deux fois (« WhatsApp or a form »), sans adresse. Ce n’est pas un claim e-mail. Pas de route `llms-full` : seul `app/llms.txt/` existe.

## 2. Placeholder du formulaire

**FAIT —** hors diff. `git diff 6a474d2..f4ba4e36 -- components/LeadForm.tsx` est vide. Le placeholder reste `"+44 7XX XXX XXXX or you@email.com"` au parent et au tip (`components/LeadForm.tsx:124`).

**FAIT —** le HTML construit le contient une fois sur `/contact` et une fois sur `/free-trial`. Critère hors périmètre : OK.

## 3. Chevauchement et ordre #15 → #19 → #21

**FAIT — fichiers.**

| PR | Branche | SHA | `app/llms.txt/route.ts` |
| --- | --- | --- | --- |
| #15 | `cursor/remove-unverified-claims-176e` | `1f03023659ba337f9c347cc8ec813860eef31842` | absent |
| #19 | `fix/remove-support-mailto-no-mx` | `4d40853299080b47f4244527c77b758237e97778` | absent |
| #21 | `cursor/llms-contact-whatsapp-only-f0ed` | `f4ba4e366b9294f68152e0083ebfb4833ae98c33` | seule modification |

Intersection des chemins #21 ∩ #15 (vs `main`) : vide. Intersection #21 ∩ #19 (vs #15) : vide. `1f03023` est ancêtre de `4d40853`.

**FAIT — `git merge-tree --write-tree`**, exit 0, sans ligne `CONFLICT` :

| Paire | Arbre |
| --- | --- |
| `main` + #21 | `1cc3fe5eca9c45226aa6ebbc705ad86813b23bcd` |
| `main` + #15 | `d09acc88fee4891af289065b1536d7c85fc6ed9d` |
| #15 + #19 | `1eac3a1cf12570fa3748e22d83e02e13a00fb323` |
| `main` + #19 | `a7e139360574347c8a77a1751802e3ac7dab2fb4` |
| #15 + #21 | `e17eba2a74eb8d997fd350611c567c729b761ff2` |
| #19 + #21 | `edd475d64aa1956759e04085eea72830d24856c7` |

**FAIT — pile simulée** (commit-tree local, non poussé) : `main` + #15, puis #19, puis #21. Les deux derniers merges sortent 0. L’arbre final `edd475d64aa1956759e04085eea72830d24856c7` garde la ligne « WhatsApp number published on this page. » et 0 « email » / `support@` dans `app/llms.txt/route.ts`.

**INFÉRENCE —** l’ordre #15 → #19 → #21 suit l’empilement (#19 part de #15 ; #21 ne vit que sur `main`, là où #16 a ajouté `llms.txt`). Ce n’est pas un contournement de conflit : les trois paires avec #21 sont déjà propres.

**FAIT —** sur ce tip, `/contact` sert encore `support@` (10 occurrences dans `contact.html`, 5 `mailto:`). #21 ne touche pas cette page. **INFÉRENCE :** ce n’est pas un échec du critère llms ; #19 retire ce `mailto:`. L’ordre ci-dessus aligne la page et l’index. **HYPOTHÈSE :** fusionner #21 avant #19 laisserait le `mailto:` sur `/contact` alors que `/llms.txt` ne le mentionne plus. La phrase restante resterait vraie (le numéro WhatsApp est publié). L’ordre retenu évite cet écart.

## 4. Gates et CI

| Gate | Résultat sur `f4ba4e36` |
| --- | --- |
| `pnpm install --frozen-lockfile` | **FAIT** exit 0 (pnpm 10.6.2, Node 22.14.0, 306 paquets). Avis pnpm : scripts de build ignorés pour `sharp` et `unrs-resolver`. Le build suivant a réussi. |
| `pnpm lint` (`next lint`) | **FAIT** exit 0, aucun warning |
| `pnpm exec tsc --noEmit` | **FAIT** exit 0 |
| `pnpm build` (`next build`) | **FAIT** exit 0, compilation OK, 47 pages générées, `/llms.txt` statique |

`next.config.ts` a `eslint.ignoreDuringBuilds: true` et `typescript.ignoreBuildErrors: false`. Le lint a été lancé à part ; le build a revérifié les types. **FAIT.**

**CI du tip** (`gh pr checks 21`, check-runs et statut combiné du SHA) : **FAIT** `Vercel` success (deployment completed) et `Vercel Preview Comments` success. Aucun autre check sur ce SHA. **FAIT** aucun fichier sous `.github/` sur `origin/main` ni sur ce tip.

## 5. WhatsApp +44, AggregateRating, M3U

**FAIT —** le diff ne contient ni numéro, ni `AggregateRating`, ni `M3U`. Le repli inchangé de `lib/site.ts` est `"447307410512"` (`+44 7307 410512`). `.env.example` a les mêmes deux variables, hors diff.

**FAIT —** HTML / RSC / corps sous `.next/server/app` : le seul `wa.me/` est `wa.me/447307410512`, le seul `+` téléphone est `+447307410512`. 0 `AggregateRating` dans ces fichiers et 0 dans `*.ts` / `*.tsx` / `*.js` / `*.json`.

**FAIT —** 0 `M3U` dans le diff et dans le corps de `/llms.txt`. Des mentions M3U préexistantes restent hors diff : `app/page.tsx`, `app/terms/page.tsx`, `app/free-trial/page.tsx`, `app/checkout/success/page.tsx`, `lib/content/blog.ts`, `lib/content/devices.ts`.

## Verdict

**PASS.** La réserve #19 est levée dans le contenu servi de `/llms.txt` : la ligne Contact dit « WhatsApp number published on this page », avec 0 « and email » et 0 `support@`. Le placeholder `you@email.com` est inchangé. #21 ne chevauche pas #15 ni #19 ; la pile #15 → #19 → #21 merge sans conflit. Gates et CI Vercel sont vertes. Seul numéro : `447307410512`. 0 `AggregateRating` et 0 M3U nouveau.
