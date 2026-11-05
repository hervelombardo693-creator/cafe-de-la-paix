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
  semaine: {
    titre: "Du lundi 19 au vendredi 23 octobre",
    jours: [
      { date: "2026-10-19", entree: "Œuf meurette",               plat: "Filet de volaille à l'estragon, linguine" },
      { date: "2026-10-20", entree: "Tartine de chèvre au miel",  plat: "Sauté de canard aux olives, carottes" },
      { date: "2026-10-21", entree: "Quiche du jour",             plat: "Joue de porc confite, purée maison" },
      { date: "2026-10-22", entree: "Œuf mayonnaise",             plat: "Bœuf bourguignon, coquillettes" },
      { date: "2026-10-23", entree: "Bouchée aux fruits de mer",  plat: "Filet de poisson aux trois agrumes" }
    ]
  },

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
