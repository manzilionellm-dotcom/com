# Le Bureau des abonnements

Comparer des abonnements légaux et vérifier l’identité du vendeur à partir des documents d’une offre.

## Édition et contrôle

Les pages, sources et traductions sont dans `content/site.json`. Les rangs de page correspondent entre les langues. Modifier la date visible avec les révisions de fond. Les chemins retirés figurent dans `content/withdrawn.json`. Préserver les décisions de retrait lors des modifications.

Avec Node 22 ou ultérieur, lancer `npm test`, puis `npm start` pour une lecture locale. La génération Vercel utilise le Build Output API v3. La production sert les routes canoniques sans JavaScript. Les prévisualisations portent une directive noindex. Le workflow IndexNow vérifie les URL sur le domaine public avant notification.

La copie Git de retour arrière et le déploiement de référence figurent dans la PR. Avant publication, revoir les autres hôtes du projet, les anciens services et les protections de propriété. Les clés de compte et données externes restent dans leurs services.
