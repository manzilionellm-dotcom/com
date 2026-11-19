import type { CountrySlug } from "../site";

export type CountryPage = {
  slug: CountrySlug;
  name: string;
  hero: string;
  flag: string;
  description: string;
  channelsHero: string[];
  sportsChannels: string[];
  newsChannels: string[];
  entertainmentChannels: string[];
  kidsChannels: string[];
  vodHighlights: string[];
  faq: { q: string; a: string }[];
};

export const COUNTRY_PAGES: Record<CountrySlug, CountryPage> = {
  "arabic": {
    "slug": "arabic",
    "name": "Arabic IPTV (MENA)",
    "flag": "🇸🇦",
    "hero": "Arabic-language television in the Middle East and North Africa",
    "description": "Check the country of reception, the commentary language and the programme date with the official publisher. A listing for one Gulf country may differ from another.",
    "channelsHero": [
      "Arabic audio",
      "Local schedule",
      "Subtitle options"
    ],
    "sportsChannels": [
      "Full event",
      "Highlights",
      "Local commentary"
    ],
    "newsChannels": [
      "National bulletin",
      "Local news",
      "Live or delayed"
    ],
    "entertainmentChannels": [
      "Original audio",
      "Series schedule",
      "Film version"
    ],
    "kidsChannels": [
      "Age rating",
      "Child profile",
      "Parent PIN"
    ],
    "vodHighlights": [
      "Expiry date for the selected title",
      "Available audio and subtitle tracks",
      "Playback on your device"
    ],
    "faq": [
      {
        "q": "Does the listing cover my country?",
        "a": "Choose the country where the screen will be used. Open the event in the local schedule and check the name of the service selling access."
      },
      {
        "q": "How do I confirm live coverage?",
        "a": "Find the event, date and time in the authorized provider’s own listing. Check whether the offer includes the full event or only highlights."
      },
      {
        "q": "What should I check before paying?",
        "a": "Read the territorial restrictions, device list and renewal price on the provider’s offer."
      }
    ]
  },
  "english": {
    "slug": "english",
    "name": "English IPTV (USA / UK)",
    "flag": "🇺🇸",
    "hero": "English-language television in the US and UK",
    "description": "A UK schedule and a US schedule can show different programmes at the same time. Choose the country of reception before checking a live event.",
    "channelsHero": [
      "US or UK listing",
      "Local time",
      "Audio description"
    ],
    "sportsChannels": [
      "Full event",
      "Highlights",
      "Local commentary"
    ],
    "newsChannels": [
      "National bulletin",
      "Local news",
      "Live or delayed"
    ],
    "entertainmentChannels": [
      "Original audio",
      "Series schedule",
      "Film version"
    ],
    "kidsChannels": [
      "Age rating",
      "Child profile",
      "Parent PIN"
    ],
    "vodHighlights": [
      "Expiry date for the selected title",
      "Available audio and subtitle tracks",
      "Playback on your device"
    ],
    "faq": [
      {
        "q": "Can I use a UK listing to check a US game?",
        "a": "Use the US listing for the date of the game. Check for a regional restriction using the location of your television."
      },
      {
        "q": "How do I confirm live coverage?",
        "a": "Find the event, date and time in the authorized provider’s own listing. Check whether the offer includes the full event or only highlights."
      },
      {
        "q": "What should I check before paying?",
        "a": "Read the territorial restrictions, device list and renewal price on the provider’s offer."
      }
    ]
  },
  "french": {
    "slug": "french",
    "name": "French IPTV (France / Belgique / Suisse)",
    "flag": "🇫🇷",
    "hero": "Télévision francophone en France, en Belgique et en Suisse",
    "description": "Choisissez le pays du téléviseur, puis recherchez la rencontre ou le film dans le programme officiel du service. Les versions françaises et belges peuvent différer.",
    "channelsHero": [
      "Pays de réception",
      "Horaire local",
      "Piste française"
    ],
    "sportsChannels": [
      "Rencontre intégrale",
      "Résumé",
      "Langue du commentaire"
    ],
    "newsChannels": [
      "Journal national",
      "Actualités locales",
      "Direct ou différé"
    ],
    "entertainmentChannels": [
      "Version originale",
      "Horaire de série",
      "Version du film"
    ],
    "kidsChannels": [
      "Âge conseillé",
      "Profil enfant",
      "Code parental"
    ],
    "vodHighlights": [
      "Date de fin de disponibilité",
      "Langues et sous-titres",
      "Lecture sur votre appareil"
    ],
    "faq": [
      {
        "q": "Une programmation française vaut-elle aussi en Belgique ?",
        "a": "Sélectionnez la Belgique dans le programme officiel. Vérifiez la date, la langue et le mode de diffusion avant de payer."
      },
      {
        "q": "Où vérifier le direct ?",
        "a": "Recherchez la rencontre dans le programme officiel du service pour votre pays. Vérifiez si la fiche annonce le direct ou le résumé."
      },
      {
        "q": "Que vérifier avant de payer ?",
        "a": "Consultez les restrictions territoriales, les appareils pris en charge et le prix du renouvellement."
      }
    ]
  },
  "spanish": {
    "slug": "spanish",
    "name": "Spanish IPTV (España / LATAM)",
    "flag": "🇪🇸",
    "hero": "Televisión en español en España y América Latina",
    "description": "El país de recepción determina qué programación debe consultar. Busque el partido o la película por fecha y compruebe el idioma del audio.",
    "channelsHero": [
      "País de recepción",
      "Hora local",
      "Audio en español"
    ],
    "sportsChannels": [
      "Partido completo",
      "Resumen",
      "Idioma del comentario"
    ],
    "newsChannels": [
      "Informativo nacional",
      "Noticias locales",
      "En directo o en diferido"
    ],
    "entertainmentChannels": [
      "Audio original",
      "Horario de la serie",
      "Versión de la película"
    ],
    "kidsChannels": [
      "Clasificación por edad",
      "Perfil infantil",
      "Control parental"
    ],
    "vodHighlights": [
      "Fecha de caducidad",
      "Audio y subtítulos",
      "Dispositivos compatibles"
    ],
    "faq": [
      {
        "q": "¿Sirve una guía española para ver un partido en México?",
        "a": "Consulte la programación oficial para México. Confirme el horario local y si el partido figura en directo o en diferido."
      },
      {
        "q": "¿Dónde compruebo si se emite en directo?",
        "a": "Busque el evento en la programación oficial de su país y confirme si se anuncia el partido completo o el resumen."
      },
      {
        "q": "¿Qué conviene revisar antes de pagar?",
        "a": "Lea las condiciones territoriales, la lista de dispositivos y el precio de renovación."
      }
    ]
  },
  "turkish": {
    "slug": "turkish",
    "name": "Turkish IPTV (Türkiye)",
    "flag": "🇹🇷",
    "hero": "Türkçe yayınlar için bölgesel program rehberi",
    "description": "Televizyonu kullandığınız ülkeyi seçin. Etkinliğin tarihini ve Türkçe ses seçeneğini yayıncının resmî programından kontrol edin.",
    "channelsHero": [
      "Yayın bölgesi",
      "Yerel saat",
      "Türkçe ses"
    ],
    "sportsChannels": [
      "Tam maç",
      "Özet",
      "Yorum dili"
    ],
    "newsChannels": [
      "Ulusal haberler",
      "Yerel haberler",
      "Canlı veya banttan"
    ],
    "entertainmentChannels": [
      "Orijinal ses",
      "Dizi saati",
      "Film sürümü"
    ],
    "kidsChannels": [
      "Yaş sınırı",
      "Çocuk profili",
      "Ebeveyn şifresi"
    ],
    "vodHighlights": [
      "Son izleme tarihi",
      "Ses ve altyazı",
      "Desteklenen cihazlar"
    ],
    "faq": [
      {
        "q": "Yurt dışından bir maçı nasıl kontrol ederim?",
        "a": "Bulunduğunuz ülkeyi seçerek resmî maç programını açın. Canlı yayın ile daha sonra sunulan özeti ayrı kontrol edin."
      },
      {
        "q": "Canlı yayını nasıl doğrularım?",
        "a": "Etkinliği ülkenize ait resmî programda bulun. Maçın tamamının mı yoksa özetinin mi sunulduğunu kontrol edin."
      },
      {
        "q": "Ödeme öncesinde neye bakmalıyım?",
        "a": "Bölgesel koşulları, desteklenen cihazları ve yenileme ücretini kontrol edin."
      }
    ]
  },
  "indian": {
    "slug": "indian",
    "name": "Indian IPTV (Hindi / Tamil / Telugu)",
    "flag": "🇮🇳",
    "hero": "Indian television by language and region",
    "description": "For Hindi, Tamil or Telugu programming, check the title in the original language. Confirm the audio track and subtitle script on the service for your region.",
    "channelsHero": [
      "Audio language",
      "Subtitle script",
      "Local transmission time"
    ],
    "sportsChannels": [
      "Full event",
      "Highlights",
      "Local commentary"
    ],
    "newsChannels": [
      "National bulletin",
      "Local news",
      "Live or delayed"
    ],
    "entertainmentChannels": [
      "Original audio",
      "Series schedule",
      "Film version"
    ],
    "kidsChannels": [
      "Age rating",
      "Child profile",
      "Parent PIN"
    ],
    "vodHighlights": [
      "Expiry date for the selected title",
      "Available audio and subtitle tracks",
      "Playback on your device"
    ],
    "faq": [
      {
        "q": "How do I verify the original audio?",
        "a": "Open the programme details and inspect the audio options for the exact episode. A translated title alone does not identify the audio track."
      },
      {
        "q": "How do I confirm live coverage?",
        "a": "Find the event, date and time in the authorized provider’s own listing. Check whether the offer includes the full event or only highlights."
      },
      {
        "q": "What should I check before paying?",
        "a": "Read the territorial restrictions, device list and renewal price on the provider’s offer."
      }
    ]
  },
  "german": {
    "slug": "german",
    "name": "German IPTV (Deutschland / Österreich / Schweiz)",
    "flag": "🇩🇪",
    "hero": "Deutschsprachiges Fernsehen in Deutschland, Österreich und der Schweiz",
    "description": "Wählen Sie das Empfangsland und prüfen Sie die Sendung im offiziellen Tagesprogramm. Eine deutschsprachige Tonspur allein sagt nichts über die Verfügbarkeit aus.",
    "channelsHero": [
      "Empfangsland",
      "Ortszeit",
      "Deutsche Tonspur"
    ],
    "sportsChannels": [
      "Einzelspiel",
      "Zusammenfassung",
      "Kommentarsprache"
    ],
    "newsChannels": [
      "Nationale Nachrichten",
      "Lokale Nachrichten",
      "Live oder zeitversetzt"
    ],
    "entertainmentChannels": [
      "Originalton",
      "Serientermin",
      "Filmfassung"
    ],
    "kidsChannels": [
      "Altersfreigabe",
      "Kinderprofil",
      "Jugendschutz-PIN"
    ],
    "vodHighlights": [
      "Ablaufdatum",
      "Tonspuren und Untertitel",
      "Unterstützte Geräte"
    ],
    "faq": [
      {
        "q": "Gilt ein deutscher Spielplan auch in Österreich?",
        "a": "Prüfen Sie das österreichische Programm für den Spieltag. Achten Sie auf Einzelspiel, Zusammenfassung und Wiederholung."
      },
      {
        "q": "Wie prüfe ich die Liveübertragung?",
        "a": "Suchen Sie das Spiel im offiziellen Programm für Ihr Empfangsland und prüfen Sie, ob das ganze Spiel oder nur eine Zusammenfassung angeboten wird."
      },
      {
        "q": "Was prüfe ich vor dem Kauf?",
        "a": "Lesen Sie die Gebietsbedingungen, die Geräteliste und den Preis für die Verlängerung."
      }
    ]
  },
  "african": {
    "slug": "african",
    "name": "African IPTV (Afrique francophone & anglophone)",
    "flag": "🌍",
    "hero": "Television by country and language in Africa",
    "description": "Choose the country first, then the programme language. Check the local listing for live coverage, the replay window and any device restrictions.",
    "channelsHero": [
      "Reception country",
      "Commentary language",
      "Local schedule"
    ],
    "sportsChannels": [
      "Full event",
      "Highlights",
      "Local commentary"
    ],
    "newsChannels": [
      "National bulletin",
      "Local news",
      "Live or delayed"
    ],
    "entertainmentChannels": [
      "Original audio",
      "Series schedule",
      "Film version"
    ],
    "kidsChannels": [
      "Age rating",
      "Child profile",
      "Parent PIN"
    ],
    "vodHighlights": [
      "Expiry date for the selected title",
      "Available audio and subtitle tracks",
      "Playback on your device"
    ],
    "faq": [
      {
        "q": "Does one listing cover every country?",
        "a": "Check the schedule published for the country of reception. A shared language or time zone does not establish the right to stream a programme there."
      },
      {
        "q": "How do I confirm live coverage?",
        "a": "Find the event, date and time in the authorized provider’s own listing. Check whether the offer includes the full event or only highlights."
      },
      {
        "q": "What should I check before paying?",
        "a": "Read the territorial restrictions, device list and renewal price on the provider’s offer."
      }
    ]
  }
};
