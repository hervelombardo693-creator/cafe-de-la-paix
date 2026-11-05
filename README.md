# Café de la Paix — site vitrine

Site du Café de la Paix, restaurant ouvrier à Bellerive-sur-Allier.
Ouvert le midi du lundi au samedi, et le vendredi soir pour les soirées spéciales.

**En ligne :** https://hervelombardo693-creator.github.io/cafe-de-la-paix/
(GitHub Pages publie le dossier `docs/` de la branche `main` à chaque envoi)

## Contenu

- `docs/index.html` — la page
- `docs/style.css` — la mise en forme
- `docs/script.js` — remplit la page à partir des données
- `docs/donnees.js` — **le fichier à modifier** : menu de la semaine, menu du week-end, soirée spéciale, téléphone, adresse, horaires
- `docs/images/` — les photos

## Voir le site en local

Ouvrir `docs/index.html` dans un navigateur, ou lancer :

```
python -m http.server 8731 --directory docs
```

puis aller sur http://localhost:8731

## Communication (flyers, affiches, réseaux sociaux)

Le dossier `communication/` n'est pas publié sur le site.

- `charte-graphique.pdf` (et `.html`) — les règles de l'identité : logos, couleurs, polices, éléments signature, formats
- `flyers.html` — **l'atelier flyers** : ouvrir dans un navigateur, choisir un modèle (vert, ardoise, crème, photo et ardoise, menu photo) et un format (A5, A4, post portrait, post carré, story), remplir les textes, choisir la photo du plat (ou en charger une depuis l'ordinateur ou le téléphone), puis « Imprimer / PDF » ou « Télécharger l'image ». Le téléphone est repris de `docs/donnees.js`. Une connexion internet est nécessaire pour les polices et l'export en image.
- `exemples/` — flyers et affiches prêts à l'emploi, et aperçus
- `photos/` — photos de plats d'exemple
- `logos.js`, `photos.js` — logos et photos intégrés pour l'export en image (ne pas modifier)

## À compléter

- Téléphone et adresse dans `docs/donnees.js`
- Vérifier les horaires
- Ajouter une vraie photo de la façade
