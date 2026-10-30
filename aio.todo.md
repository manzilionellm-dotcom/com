# À compléter (rien n'a été inventé)

- Débit unique : `tech.bitrate` = null. Le site publie des chiffres différents selon la page, donc aucun n'a été choisi comme valeur du service.
  - Guide Firestick : minimum 25 Mbps pour la 4K.
  - Article buffering : 15+ Mbps pour la HD, 25+ Mbps pour la 4K UHD, 35 Mbps recommandés pour la 4K HDR à 60 fps.
  - Page remboursement : moins de 15 Mbps est traité comme un problème de ligne du client.
  - Page chaînes Afrique : 10 Mbps minimum.
- Nombre de chaînes : la page tarifs, la page chaînes et `lib/site.ts` (`channelsCount`) disent 22 000+. La page d'accueil dit aussi 20 000+. Les deux sont recopiés dans `tech.channelCount`.
- VOD : la page tarifs et `vodCount` disent 120 000+. La page d'accueil dit aussi 100 000+. Les deux sont dans `tech.vodCount`.
- `durationDays` des formules 1, 3, 6 et 12 mois = null. Le site dit « 1 Month », pas un nombre de jours. Seul l'essai est donné en 24 heures (`durationDays`: 1).
- Note 4.9/5 et « 12,847 customers » affichées sur l'accueil : non recopiées dans `llms.txt` ni dans le JSON-LD. Le `llms.txt` existant excluait les notes, et aucune review Schema.org n'est sourcée.
- Images : aucun `<img>` dans le code, et `public/` ne contient pas les fichiers icône / og référencés (`icon-512.png`, `og-image.png`, etc.). Aucun alt n'a été inventé. La page `/devices` parle de captures d'écran qui ne sont pas dans le dépôt.
- Vidéos : aucun `<video>` ni iframe YouTube/Vimeo. Pas de champ transcription à remplir.
- HowTo : déjà présent sur les 6 guides d'installation. Des ancres `#step-N` ont été ajoutées. Pas de page Apple TV séparée : les étapes sont dans `/guides/ios`. Les articles de blog « how to » ne sont pas des tutoriels d'installation par appareil ; l'article buffering annonce 12 correctifs et n'en publie pas 12 étapes numérotées, donc aucun HowTo n'y a été ajouté.
- Locales `es` et `de` : annoncées en `?lang=` dans les métadonnées, absentes du dictionnaire de la page d'accueil. Aucune FAQ espagnole ou allemande globale n'a été écrite. Les pages pays gardent leur propre texte déjà publié.
- Hôte canonique du code : `https://bestiptv-vip.com`. `robots.ts` interdit l'indexation quand l'hôte contient `vercel.app` (déploiement `https://com-theta-seven.vercel.app`).
- Blog, pages légales (`/refund`, `/privacy`, `/terms`), `/contact`, `/refer`, `/status` : aucun h2/h3 formulé en question. `aio-check` y répond « Aucun Citation Hook trouvé ». Aucune FAQ n'a été inventée pour ces pages.
- Le titre « Why choose us? » est devenu « Why choose us » (et l'équivalent FR/AR) : le sous-titre faisait quelques mots, pas une réponse de 40 à 60 mots. Le tableau de comparaison est inchangé.
- « Ready to watch in 4K? » sur les guides est devenu « Ready to watch in 4K » pour la même raison. Le bouton et la phrase d'appel restent.
- La question sport de l'accueil (Premier League, La Liga, Champions League, NBA, NFL, MLB, UFC, F1) est dans la réponse « Which channels are included? », pour garder 10 questions dans `llms.txt`.
