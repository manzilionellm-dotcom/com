# AIO — Best IPTV VIP

Source unique des faits ajoutés pour les agents : `aio.config.json`.
Une valeur absente du site ou du code est `null` et expliquée dans `aio.todo.md`.

- `pnpm run aio:llms` régénère `public/llms.txt` (index d'URLs déjà publié + services, prix, caractéristiques, 10 questions).
- `app/llms.txt/route.ts` sert ce fichier. Ne pas réécrire l'index à la main dans la route.
- `pnpm run build && pnpm start`, puis `node scripts/aio-check.mjs http://localhost:3000/` : preuve sur le HTML brut (Citation Hooks 40–60 mots, JSON-LD parsable, alt, transcription vidéo, `/llms.txt`).
- Les h3 de FAQ et le paragraphe qui suit sont dans le HTML rendu par le serveur. Ils ne sont pas dans un accordéon, ni masqués par JavaScript.
- `FAQPage` est émis seulement sur les pages qui affichent ce texte (accueil, tarifs, essai, et les FAQ déjà présentes sur les guides, pays et comparatifs).
- `Product` est ajouté dans `app/layout.tsx` à côté de Organization, WebSite et Service. Les offres existantes restent.
- `HowTo` reste sur les guides d'installation (`/guides/[device]`), qui ont déjà des étapes. Chaque étape a une ancre `#step-1` …
