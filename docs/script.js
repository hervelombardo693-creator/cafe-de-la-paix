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
    if (j.entree) carte.appendChild(plat("Entrée", j.entree));
    carte.appendChild(plat("Plat", j.plat));
    grille.appendChild(carte);
  });

  /* À l'affiche : événements à venir, retirés une fois la date passée */
  const section = $("#affiche"), lienAffiche = $("#nav-affiche");
  /* La section ne s'affiche qu'une fois au moins une affiche chargée */
  const majAffiche = () => {
    const vide = !$("#affiches").querySelector(".affiche-carte:not([hidden])");
    section.hidden = vide;
    lienAffiche.hidden = vide;
  };
  (CAFE.evenements || [])
    .filter((e) => e.date >= isoDuJour)
    .sort((a, b) => a.date.localeCompare(b.date))
    .forEach((e) => {
      const a = el("a", "affiche-carte");
      a.hidden = true;
      a.href = e.image;
      a.target = "_blank";
      a.rel = "noopener";
      const img = el("img");
      img.src = e.image;
      img.alt = "Affiche : " + e.titre + ", " + e.quand;
      img.addEventListener("load", () => { a.hidden = false; majAffiche(); });
      img.addEventListener("error", () => a.remove());
      a.appendChild(img);
      a.appendChild(el("span", "affiche-carte__quand", e.quand));
      a.appendChild(el("span", "affiche-carte__titre", e.titre));
      $("#affiches").appendChild(a);
    });
  majAffiche();

  /* Menu du week-end */
  $("#we-quand").textContent = CAFE.weekend.quand;
  CAFE.weekend.plats.forEach((p) => {
    const li = el("li");
    li.appendChild(el("strong", null, p.nom));
    if (p.garniture) li.appendChild(el("em", null, p.garniture));
    $("#we-plats").appendChild(li);
  });

  /* Soirée spéciale du vendredi (facultative) */
  if (CAFE.soiree.titre) {
    const s = $("#soiree");
    s.querySelector(".soiree__titre").textContent = CAFE.soiree.titre;
    if (CAFE.soiree.date) s.querySelector(".soiree__sur").textContent = "Soirée spéciale · " + CAFE.soiree.date;
    s.querySelector(".soiree__desc").textContent = CAFE.soiree.description;
    s.hidden = false;
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
