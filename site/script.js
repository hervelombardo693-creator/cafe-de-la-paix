/* Café de la Paix — remplit la page à partir de donnees.js */
(function () {
  const JOURS = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
  const MOIS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => document.querySelectorAll(s);
  const el = (tag, cls, txt) => { const n = document.createElement(tag); if (cls) n.className = cls; if (txt != null) n.textContent = txt; return n; };

  const maintenant = new Date();
  const aujourdhui = maintenant.getDay();
  const isoDuJour = [maintenant.getFullYear(), String(maintenant.getMonth() + 1).padStart(2, "0"), String(maintenant.getDate()).padStart(2, "0")].join("-");
  const heure = (h) => h.replace(":", " h ").replace(" h 00", " h");
  const enMinutes = (h) => { const [a, b] = h.split(":").map(Number); return a * 60 + b; };

  /* Téléphone, adresse, Facebook */
  const tel = CAFE.telephone.trim();
  if (tel) {
    const lien = "tel:" + tel.replace(/[^\d+]/g, "");
    $$(".js-tel").forEach((a) => { a.href = lien; a.hidden = false; });
    $(".js-tel-texte").href = lien;
    $(".js-tel-texte").textContent = tel;
    $(".js-tel-ligne").hidden = false;
  }
  const adresse = $("#adresse");
  adresse.textContent = "";
  ["Café de la Paix", CAFE.adresse, CAFE.ville].filter(Boolean).forEach((ligne, i) => {
    if (i) adresse.appendChild(document.createElement("br"));
    adresse.appendChild(document.createTextNode(ligne));
  });
  if (CAFE.adresse) {
    $("#carte").src = "https://www.google.com/maps?q=" + encodeURIComponent("Café de la Paix, " + CAFE.adresse + ", " + CAFE.ville) + "&output=embed";
  }
  if (CAFE.facebook) {
    const fb = $(".js-facebook");
    fb.querySelector("a").href = CAFE.facebook;
    fb.hidden = false;
  }

  /* Formule */
  $$(".js-prix").forEach((n) => (n.textContent = CAFE.formule.prix));
  CAFE.formule.contenu.forEach((c) => $("#formule").appendChild(el("li", null, c)));

  /* Menu de la semaine */
  $("#periode").textContent = CAFE.semaine.titre;
  const grille = $("#jours");
  const plat = (label, texte) => { const p = el("p", "jour__ligne"); p.appendChild(el("small", null, label)); p.appendChild(document.createTextNode(texte)); return p; };

  CAFE.semaine.jours.forEach((j) => {
    const d = new Date(j.date + "T12:00:00");
    const carte = el("article", "jour");
    if (j.date === isoDuJour) carte.classList.add("jour--aujourdhui");
    carte.appendChild(el("h3", "jour__nom", JOURS[d.getDay()]));
    carte.appendChild(el("p", "jour__date", d.getDate() + " " + MOIS[d.getMonth()]));
    carte.appendChild(plat("Entrée", j.entree));
    carte.appendChild(plat("Plat", j.plat));
    grille.appendChild(carte);
  });
  if (CAFE.semaine.samedi) {
    const sam = el("article", "jour");
    const derniere = CAFE.semaine.jours[CAFE.semaine.jours.length - 1];
    if (derniere) {
      const d = new Date(derniere.date + "T12:00:00");
      d.setDate(d.getDate() + 1);
      if (d.getDay() === 6 && isoDuJour === d.toISOString().slice(0, 10)) sam.classList.add("jour--aujourdhui");
    }
    sam.appendChild(el("h3", "jour__nom", "Samedi"));
    sam.appendChild(el("p", "jour__date", "Le midi"));
    sam.appendChild(plat("Au menu", CAFE.semaine.samedi));
    grille.appendChild(sam);
  }

  /* Soirée du vendredi */
  if (CAFE.soiree.titre) {
    $(".affiche__titre").textContent = CAFE.soiree.titre;
    if (CAFE.soiree.date) $(".affiche__date").textContent = CAFE.soiree.date + " · à partir de " + heure(CAFE.soir.ouverture);
    if (CAFE.soiree.description) $(".affiche__desc").textContent = CAFE.soiree.description;
  } else {
    $(".affiche__date").textContent = "Vendredi · à partir de " + heure(CAFE.soir.ouverture);
  }

  /* Tableau des horaires (lundi → dimanche) */
  const table = $("#horaires");
  [1, 2, 3, 4, 5, 6, 0].forEach((jour) => {
    const creneaux = [];
    if (CAFE.midi.jours.includes(jour)) creneaux.push(heure(CAFE.midi.ouverture) + " – " + heure(CAFE.midi.fermeture));
    if (CAFE.soir.jours.includes(jour)) creneaux.push(heure(CAFE.soir.ouverture) + " – " + heure(CAFE.soir.fermeture));
    const tr = el("tr");
    if (!creneaux.length) tr.classList.add("ferme");
    if (jour === aujourdhui) tr.classList.add("aujourdhui");
    tr.appendChild(el("td", null, JOURS[jour]));
    tr.appendChild(el("td", null, creneaux.length ? creneaux.join(" · ") : "Fermé"));
    table.appendChild(tr);
  });

  /* Bandeau « ouvert / fermé » */
  const min = maintenant.getHours() * 60 + maintenant.getMinutes();
  const services = [CAFE.midi, CAFE.soir];
  const enCours = services.find((s) => s.jours.includes(aujourdhui) && min >= enMinutes(s.ouverture) && min < enMinutes(s.fermeture));
  let message;
  if (enCours) {
    message = "Ouvert en ce moment, jusqu'à " + heure(enCours.fermeture);
  } else {
    const prochain = services
      .filter((s) => s.jours.includes(aujourdhui) && min < enMinutes(s.ouverture))
      .sort((a, b) => enMinutes(a.ouverture) - enMinutes(b.ouverture))[0];
    if (prochain) {
      message = "Fermé · ouverture aujourd'hui à " + heure(prochain.ouverture);
    } else {
      let j = (aujourdhui + 1) % 7, n = 1;
      while (!CAFE.midi.jours.includes(j) && !CAFE.soir.jours.includes(j) && n < 7) { j = (j + 1) % 7; n++; }
      const s = CAFE.midi.jours.includes(j) ? CAFE.midi : CAFE.soir;
      message = "Fermé · réouverture " + (n === 1 ? "demain" : JOURS[j].toLowerCase()) + " à " + heure(s.ouverture);
    }
  }
  const statut = $("#statut");
  statut.textContent = "";
  statut.appendChild(el("span", "pastille" + (enCours ? " pastille--ouvert" : "")));
  statut.appendChild(document.createTextNode(message));

  /* Menu mobile */
  const burger = $("#burger"), nav = $("#nav");
  burger.addEventListener("click", () => {
    const ouvert = nav.classList.toggle("ouvert");
    burger.setAttribute("aria-expanded", ouvert);
  });
  nav.addEventListener("click", (e) => {
    if (e.target.tagName === "A") { nav.classList.remove("ouvert"); burger.setAttribute("aria-expanded", "false"); }
  });

  $("#annee").textContent = maintenant.getFullYear();
})();
