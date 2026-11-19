// Approved public routes and editorial content.
export const origin = "https://bestiptv-vip.com";
export const retiredPaths = new Set<string>([]);
export const guides: Record<string, { lang: string; title: string; description: string; body: string }> = {
  "/guides/verifier-direct-football-espagnol": {
    "lang": "fr",
    "title": "Où vérifier la diffusion d’un match de football espagnol de première division",
    "description": "Retrouvez la fiche officielle d’un match du championnat national espagnol et vérifiez sa disponibilité dans votre pays.",
    "body": "<h1>Où vérifier la diffusion d’un match de football espagnol de première division</h1><p>Retrouvez la fiche officielle d’un match du championnat national espagnol et vérifiez sa disponibilité dans votre pays.</p><h2>Vérifications pratiques</h2><p>Relevez la journée, la date et les deux équipes sur le calendrier de la compétition. Vérifiez le fuseau horaire et consultez les indications officielles pour votre territoire.</p><p>Sur la fiche du programme, distinguez le direct de la rediffusion et des extraits. Vérifiez les conditions auprès du service désigné avant de souscrire.</p>"
  },
  "/": {
    "lang": "fr",
    "title": "Vérifier où regarder un programme en ligne",
    "description": "Retrouvez le diffuseur officiel d’un programme et vérifiez les conditions de visionnage dans votre pays.",
    "body": "<h1>Vérifier où regarder un programme en ligne</h1><p>Retrouvez le diffuseur officiel d’un programme et vérifiez les conditions de visionnage dans votre pays.</p><h2>Rechercher le bon service</h2><p>Partez du site de la chaîne ou du producteur. Vérifiez que le programme figure dans le catalogue local et que votre appareil est compatible. Consultez le prix et les conditions directement auprès du diffuseur.</p><p><a href=\"/guides/verifier-direct-football-espagnol\">Où vérifier la diffusion d’un match de football espagnol de première division</a></p>"
  }
};
