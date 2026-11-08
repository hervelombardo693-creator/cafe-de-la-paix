/* Café de la Paix — animations (GSAP + ScrollTrigger)
   Tout le contenu reste visible si GSAP ne charge pas
   ou si le visiteur a demandé de réduire les animations. */
(function () {
  if (!window.gsap || !window.ScrollTrigger) return;
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  gsap.registerPlugin(ScrollTrigger);

  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];
  const souris = matchMedia("(pointer: fine)").matches;
  const premiereVisite = !document.documentElement.classList.contains("deja-vu");
  const depart = premiereVisite ? 1.45 : 0.1; // attend la fin de l'intro
  const nettoie = "transform,opacity,clipPath";

  /* Découpe un titre en mots, chacun dans un masque */
  function mots(el) {
    if (!el || el.dataset.decoupe) return [];
    el.dataset.decoupe = "1";
    const sortie = [];
    const parcourir = (noeud) => {
      [...noeud.childNodes].forEach((n) => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach((morceau) => {
            if (!morceau) return;
            if (/^\s+$/.test(morceau)) { frag.appendChild(document.createTextNode(morceau)); return; }
            const masque = document.createElement("span");
            masque.className = "mot";
            const interieur = document.createElement("span");
            interieur.className = "mot__in";
            interieur.textContent = morceau;
            masque.appendChild(interieur);
            frag.appendChild(masque);
            sortie.push(interieur);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1 && n.tagName !== "BR" && !n.classList.contains("visuellement-cache")) {
          parcourir(n);
        }
      });
    };
    parcourir(el);
    return sortie;
  }

  /* Fait compter un prix de 0 à sa valeur (« 18 € ») */
  function compteur(el, duree) {
    const m = el && el.textContent.match(/^(\D*)(\d+)(.*)$/);
    if (!m) return null;
    const cible = +m[2], etat = { v: 0 };
    return gsap.to(etat, {
      v: cible, duration: duree, ease: "power2.out",
      onStart: () => (el.textContent = m[1] + "0" + m[3]),
      onUpdate: () => (el.textContent = m[1] + Math.round(etat.v) + m[3])
    });
  }

  /* ---------- Accueil ---------- */
  const tl = gsap.timeline({ delay: depart, defaults: { ease: "expo.out" } });
  tl.from(".hero__logo", { scale: 0.5, rotate: -30, opacity: 0, duration: 1.3, ease: "back.out(1.7)" })
    .from(mots($(".hero h1")), { yPercent: 115, rotate: 5, duration: 1.1, stagger: 0.07 }, "-=1")
    .from(".hero__accroche", { y: 26, opacity: 0, duration: 0.9 }, "-=0.7")
    .from(".hero__actions > :not([hidden])", { y: 22, opacity: 0, duration: 0.7, stagger: 0.12, clearProps: nettoie }, "-=0.6")
    .fromTo(".arche",
      { clipPath: "inset(100% 0% 0% 0% round 999px 999px 6px 6px)" },
      { clipPath: "inset(0% 0% 0% 0% round 999px 999px 6px 6px)", duration: 1.5, ease: "expo.inOut", clearProps: "clipPath" }, 0)
    .from(".arche img", { scale: 1.4, duration: 2.2 }, 0.2)
    .from(".tampon", { scale: 0, rotate: -220, duration: 1.1, ease: "back.out(2.2)" }, 0.9);
  const prixTampon = compteur($(".tampon__prix"), 1.2);
  if (prixTampon) tl.add(prixTampon, 1.0);

  // Le logo flotte doucement, le tampon se balance
  gsap.to(".hero__logo", { y: -10, rotate: 2.5, duration: 3.2, ease: "sine.inOut", yoyo: true, repeat: -1, delay: depart + 1.3 });
  gsap.to(".tampon", { rotate: -4, duration: 2.6, ease: "sine.inOut", yoyo: true, repeat: -1, delay: depart + 2.1 });

  // Parallaxe au défilement
  gsap.to(".hero__visuel", { yPercent: 14, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
  gsap.to(".hero__texte", { yPercent: -10, opacity: 0.35, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });

  // Parallaxe à la souris
  if (souris) {
    const hero = $(".hero");
    const vx = gsap.quickTo(".hero__visuel", "x", { duration: 0.9, ease: "power3.out" });
    const lx = gsap.quickTo(".hero__logo", "x", { duration: 1.1, ease: "power3.out" });
    hero.addEventListener("mousemove", (e) => {
      const r = hero.getBoundingClientRect();
      const dx = (e.clientX - r.left) / r.width - 0.5;
      vx(dx * -26);
      lx(dx * 18);
    });
    hero.addEventListener("mouseleave", () => { vx(0); lx(0); });
  }

  /* Paillettes dorées qui montent dans l'accueil */
  (function etincelles() {
    const hero = $(".hero");
    const c = document.createElement("canvas");
    c.className = "etincelles";
    c.setAttribute("aria-hidden", "true");
    hero.prepend(c);
    const ctx = c.getContext("2d");
    let w = 0, h = 0, parts = [], actif = true;
    const nouvelle = (partout) => ({
      x: Math.random() * w, y: partout ? Math.random() * h : h + 10,
      r: 0.6 + Math.random() * 2.2, v: 0.15 + Math.random() * 0.45,
      d: Math.random() * Math.PI * 2, a: 0.25 + Math.random() * 0.55
    });
    const taille = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = hero.offsetWidth; h = hero.offsetHeight;
      c.width = w * dpr; c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      parts = Array.from({ length: Math.round(Math.min(60, w / 22)) }, () => nouvelle(true));
    };
    const boucle = (t) => {
      if (!actif) return;
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        p.y -= p.v;
        p.x += Math.sin(t / 2000 + p.d) * 0.25;
        if (p.y < -10) Object.assign(p, nouvelle(false));
        const scintille = 0.5 + 0.5 * Math.sin(t / 600 + p.d * 3);
        ctx.beginPath();
        ctx.fillStyle = "rgba(217,189,138," + (p.a * scintille).toFixed(3) + ")";
        ctx.shadowColor = "rgba(217,189,138,.8)";
        ctx.shadowBlur = p.r * 4;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      requestAnimationFrame(boucle);
    };
    taille();
    window.addEventListener("resize", taille);
    new IntersectionObserver(([e]) => {
      const etait = actif;
      actif = e.isIntersecting;
      if (actif && !etait) requestAnimationFrame(boucle);
    }).observe(hero);
    requestAnimationFrame(boucle);
  })();

  /* ---------- Barre de progression et en-tête ---------- */
  gsap.to(".progression", { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.3 } });
  const entete = $(".entete"), nav = $("#nav");
  ScrollTrigger.create({
    start: 0, end: "max",
    onUpdate: (self) => {
      const y = self.scroll();
      entete.classList.toggle("entete--ombre", y > 40);
      const cacher = self.direction === 1 && y > 500 && !nav.classList.contains("ouvert");
      entete.classList.toggle("entete--cache", cacher);
    }
  });

  /* ---------- Bandeau défilant : accélère avec le défilement ---------- */
  const piste = $(".defile__piste");
  const anim = piste && piste.getAnimations && piste.getAnimations()[0];
  if (anim) {
    const etat = { v: 1 };
    let sens = 1;
    ScrollTrigger.create({
      start: 0, end: "max",
      onUpdate: (self) => {
        sens = self.direction;
        const vitesse = gsap.utils.clamp(1, 6, 1 + Math.abs(self.getVelocity()) / 500);
        etat.v = vitesse * sens;
        anim.playbackRate = etat.v;
        gsap.to(etat, { v: sens, duration: 1.2, ease: "power2.out", overwrite: true, onUpdate: () => (anim.playbackRate = etat.v) });
      }
    });
  }

  /* ---------- Titres et accroches manuscrites ---------- */
  $$("main section:not(.hero) h2").forEach((h2) => {
    gsap.from(mots(h2), {
      yPercent: 115, rotate: 4, duration: 1, ease: "expo.out", stagger: 0.06,
      scrollTrigger: { trigger: h2, start: "top 88%" }
    });
  });
  $$("main .script").forEach((s) => {
    gsap.fromTo(s, { clipPath: "inset(-20% 100% -20% 0%)" }, {
      clipPath: "inset(-20% 0% -20% 0%)", duration: 1.4, ease: "power2.inOut", clearProps: "clipPath",
      scrollTrigger: { trigger: s, start: "top 90%" }
    });
  });

  /* ---------- La maison ---------- */
  gsap.from(".maison__texte > p:not(.script)", { y: 30, opacity: 0, duration: 1, ease: "expo.out", scrollTrigger: { trigger: ".maison", start: "top 75%" } });
  gsap.from(".atouts li", { x: -40, opacity: 0, duration: 0.9, ease: "expo.out", stagger: 0.12, clearProps: nettoie, scrollTrigger: { trigger: ".atouts", start: "top 85%" } });
  gsap.fromTo(".maison__photo",
    { clipPath: "inset(100% 0% 0% 0%)" },
    { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "expo.inOut", clearProps: "clipPath", scrollTrigger: { trigger: ".maison__photo", start: "top 80%" } });
  gsap.fromTo(".maison__photo", { y: 60 }, { y: -40, ease: "none", scrollTrigger: { trigger: ".maison", start: "top bottom", end: "bottom top", scrub: true } });

  /* ---------- Menu de la semaine : cartes distribuées ---------- */
  gsap.from(".formule", { scaleX: 0.6, opacity: 0, duration: 1, ease: "expo.out", clearProps: nettoie, scrollTrigger: { trigger: ".formule", start: "top 85%" } });
  ScrollTrigger.create({
    trigger: ".formule", start: "top 85%", once: true,
    onEnter: () => compteur($(".formule__prix strong"), 1.3)
  });
  gsap.set(".jour", { transition: "none" }); // la transition CSS du survol freinerait l'animation
  gsap.from(".jour", {
    rotateX: -85, y: 80, opacity: 0, transformOrigin: "50% 0%",
    duration: 1.1, ease: "expo.out", stagger: { each: 0.12, from: "start" }, clearProps: nettoie + ",transition",
    scrollTrigger: { trigger: ".jours", start: "top 80%" }
  });

  /* ---------- À l'affiche : apparition et inclinaison 3D ---------- */
  function affiches() {
    const cartes = $$(".affiche-carte:not([hidden])").filter((c) => !c.dataset.anime);
    cartes.forEach((carte, i) => {
      carte.dataset.anime = "1";
      const img = carte.querySelector("img");
      const cadre = document.createElement("span");
      cadre.className = "affiche-carte__cadre";
      img.replaceWith(cadre);
      cadre.appendChild(img);
      const reflet = document.createElement("span");
      reflet.className = "affiche-carte__reflet";
      cadre.appendChild(reflet);
      cadre.style.display = "block";

      gsap.from(carte, {
        y: 90, rotate: i % 2 ? 7 : -7, opacity: 0, duration: 1.3, ease: "expo.out", delay: i * 0.12, clearProps: nettoie,
        scrollTrigger: { trigger: carte, start: "top 88%" }
      });

      if (souris) {
        const rx = gsap.quickTo(cadre, "rotationX", { duration: 0.5, ease: "power3.out" });
        const ry = gsap.quickTo(cadre, "rotationY", { duration: 0.5, ease: "power3.out" });
        gsap.set(cadre, { transformPerspective: 900 });
        carte.addEventListener("mousemove", (e) => {
          const r = cadre.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
          ry((px - 0.5) * 16);
          rx((0.5 - py) * 16);
          reflet.style.setProperty("--gx", px * 100 + "%");
          reflet.style.setProperty("--gy", py * 100 + "%");
        });
        carte.addEventListener("mouseleave", () => { rx(0); ry(0); });
      }
    });
    ScrollTrigger.refresh();
  }
  affiches();
  // Les affiches apparaissent quand leur image est chargée
  const zoneAffiches = $("#affiches");
  if (zoneAffiches) new MutationObserver(affiches).observe(zoneAffiches, { attributes: true, subtree: true, attributeFilter: ["hidden"] });

  /* ---------- Week-end ---------- */
  gsap.from(".weekend__texte > :not(h2):not(.script)", { y: 30, opacity: 0, duration: 0.9, ease: "expo.out", stagger: 0.1, clearProps: nettoie, scrollTrigger: { trigger: ".weekend", start: "top 75%" } });
  gsap.from(".carte-we", { x: 120, rotate: 8, opacity: 0, duration: 1.5, ease: "expo.out", clearProps: nettoie, scrollTrigger: { trigger: ".carte-we", start: "top 85%" } });
  gsap.from(".carte-we__plats li", { y: 24, opacity: 0, duration: 0.8, ease: "expo.out", stagger: 0.15, delay: 0.4, clearProps: nettoie, scrollTrigger: { trigger: ".carte-we", start: "top 85%" } });

  /* ---------- Galerie : volets qui s'ouvrent ---------- */
  const volets = ["inset(0% 100% 0% 0%)", "inset(100% 0% 0% 0%)", "inset(0% 0% 0% 100%)", "inset(0% 0% 100% 0%)"];
  $$(".galerie figure").forEach((fig, i) => {
    gsap.fromTo(fig, { clipPath: volets[i % 4] }, {
      clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: "expo.inOut", delay: (i % 3) * 0.1, clearProps: "clipPath",
      scrollTrigger: { trigger: fig, start: "top 90%" }
    });
    gsap.from(fig.querySelector("img"), { scale: 1.35, duration: 1.8, ease: "expo.out", delay: (i % 3) * 0.1, clearProps: "transform", scrollTrigger: { trigger: fig, start: "top 90%" } });
  });

  /* ---------- Infos pratiques : la plaque se balance ---------- */
  gsap.from(".plaque", {
    rotate: -14, opacity: 0, transformOrigin: "50% -30px", duration: 2, ease: "elastic.out(1, 0.35)", clearProps: nettoie,
    scrollTrigger: { trigger: ".plaque", start: "top 85%" }
  });
  gsap.from(".horaires tr", { x: -24, opacity: 0, duration: 0.6, ease: "expo.out", stagger: 0.07, delay: 0.3, clearProps: nettoie, scrollTrigger: { trigger: ".plaque", start: "top 85%" } });
  gsap.from(".contact", { y: 30, opacity: 0, duration: 0.9, ease: "expo.out", stagger: 0.12, clearProps: nettoie, scrollTrigger: { trigger: ".contact", start: "top 90%" } });
  gsap.fromTo(".carte",
    { clipPath: "inset(0% 0% 100% 0% round 6px)" },
    { clipPath: "inset(0% 0% 0% 0% round 6px)", duration: 1.4, ease: "expo.inOut", clearProps: "clipPath", scrollTrigger: { trigger: ".carte", start: "top 85%" } });

  /* ---------- Pied de page : le logo tourne avec le défilement ---------- */
  gsap.fromTo(".pied__logo", { rotate: -90, scale: 0.7 }, { rotate: 0, scale: 1, ease: "none", scrollTrigger: { trigger: ".pied", start: "top bottom", end: "bottom bottom", scrub: 1 } });

  /* ---------- Boutons magnétiques (souris uniquement) ---------- */
  if (souris) {
    $$(".btn").forEach((b) => {
      const x = gsap.quickTo(b, "x", { duration: 0.4, ease: "power3.out" });
      const y = gsap.quickTo(b, "y", { duration: 0.4, ease: "power3.out" });
      b.addEventListener("mousemove", (e) => {
        const r = b.getBoundingClientRect();
        x((e.clientX - r.left - r.width / 2) * 0.3);
        y((e.clientY - r.top - r.height / 2) * 0.4);
      });
      b.addEventListener("mouseleave", () => { x(0); y(0); });
    });
  }

  // Recalcule les positions une fois les images et polices chargées
  window.addEventListener("load", () => ScrollTrigger.refresh());
  if (document.fonts) document.fonts.ready.then(() => ScrollTrigger.refresh());
})();
