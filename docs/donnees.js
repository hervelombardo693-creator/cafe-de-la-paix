/* =========================================================
   CAFÉ DE LA PAIX — FICHIER À MODIFIER
   Tout ce qui change souvent est ici : coordonnées, horaires,
   menu de la semaine et menu du week-end.
   Modifiez le texte entre guillemets, enregistrez, c'est en ligne.
   ========================================================= */

const CAFE = {
  // --- Coordonnées (à compléter) -------------------------
  telephone: "",            // ex. "04 70 12 34 56" — laisser vide masque le bouton d'appel
  adresse: "",              // ex. "12 avenue de Vichy"
  ville: "03700 Bellerive-sur-Allier",
  facebook: "",             // lien complet de la page Facebook, ou vide

  // --- Horaires -----------------------------------------
  // jours : 1 = lundi … 6 = samedi, 0 = dimanche
  midi: { jours: [1, 2, 3, 4, 5, 6], ouverture: "12:00", fermeture: "14:00" },
  soir: { jours: [5], ouverture: "19:00", fermeture: "23:00" },

  // --- Formule du midi ----------------------------------
  formule: {
    prix: "18 €",
    contenu: ["Entrée", "Plat", "Fromage ou dessert", "Café", "¼ de vin"]
  },

  // --- Menu de la semaine (du lundi au vendredi midi) ----
  // Dates au format AAAA-MM-JJ. Le jour en cours est mis en avant
  // automatiquement s'il fait partie de la semaine.
  // Pas d'entrée un jour : laisser entree: "".
  semaine: {
    titre: "Du lundi 2 au vendredi 6 novembre",
    jours: [
      { date: "2026-11-02", entree: "Jambon – Macédoine",     plat: "Pluma de porc, moutarde à l'ancienne" },
      { date: "2026-11-03", entree: "Foie gras",              plat: "Cuisses de poulet rôties, gratin dauphinois" },
      { date: "2026-11-04", entree: "Salade piémontaise",     plat: "Canard à l'orange, tagliatelles" },
      { date: "2026-11-05", entree: "Lasagnes",               plat: "Salade verte, jambon cru" },
      { date: "2026-11-06", entree: "",                       plat: "Poisson du jour, sauce vierge, riz pilaf" }
    ]
  },

  // --- À l'affiche : événements à venir ------------------
  // Une affiche par événement, à mettre dans le dossier images/.
  // Elle disparaît toute seule du site le lendemain de sa date.
  evenements: [
    { date: "2026-11-13", quand: "Vendredi 13 novembre", titre: "Soirée choucroute",                 image: "images/affiche-choucroute.webp" },
    { date: "2026-11-19", quand: "Jeudi 19 novembre",    titre: "Journée Beaujolais nouveau · 18 €", image: "images/affiche-beaujolais.webp" }
  ],

  // --- Menu du week-end (vendredi soir et samedi midi) ---
  weekend: {
    quand: "Vendredi soir & Samedi midi",
    plats: [
      { nom: "Pavé de thon",                       garniture: "Courgettes" },
      { nom: "Tournedos de filet de bœuf Rossini", garniture: "Écrasé de pommes de terre" },
      { nom: "Bavette de bœuf",                    garniture: "Écrasé de pommes de terre, salade" }
    ]
  },

  // --- Soirée spéciale du vendredi (facultatif) ----------
  // Laisser titre vide si pas de soirée à thème cette semaine.
  soiree: {
    titre: "",                // ex. "Soirée moules-frites"
    date: "",                 // ex. "Vendredi 6 novembre"
    description: ""           // ex. "Moules à volonté, frites maison et musique."
  }
};
