/* =========================================================
   CAFÉ DE LA PAIX — FICHIER À MODIFIER
   Tout ce qui change souvent est ici : coordonnées, horaires,
   menu de la semaine et menu du week-end.
   Modifiez le texte entre guillemets, enregistrez, c'est en ligne.
   ========================================================= */

const CAFE = {
  // --- Coordonnées (à compléter) -------------------------
  telephone: "04 70 32 42 86", // laisser vide masque les boutons d'appel
  adresse: "",              // ex. "12 avenue de Vichy"
  ville: "03700 Bellerive-sur-Allier",
  facebook: "https://www.facebook.com/profile.php?id=61591645226603", // lien complet de la page Facebook, ou vide

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
  // Jour de fermeture : { date: "…", ferme: "Restaurant fermé · jour férié" }
  // (le bandeau « ouvert / fermé » et les horaires en tiennent compte).
  semaine: {
    titre: "Du lundi 9 au vendredi 13 novembre",
    jours: [
      { date: "2026-11-09", entree: "Rillettes et ses toasts",  plat: "Poulet basquaise et son riz" },
      { date: "2026-11-10", entree: "Assiette de crudités",     plat: "Sauté de canard aux olives et ses tagliatelles" },
      { date: "2026-11-11", ferme: "Restaurant fermé · jour férié" },
      { date: "2026-11-12", entree: "Œufs mimosa",              plat: "Coq au vin et son écrasé de pommes de terre" },
      { date: "2026-11-13", entree: "Entrée surprise",          plat: "Papillote de poisson aux trois agrumes et ses légumes frais poêlés" }
    ]
  },

  // Autres fermetures exceptionnelles (congés…), au format AAAA-MM-JJ
  fermetures: [],

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
