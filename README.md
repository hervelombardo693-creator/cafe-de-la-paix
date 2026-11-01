# Café de la Paix — site vitrine

Site du Café de la Paix, restaurant ouvrier à Bellerive-sur-Allier.
Ouvert le midi du lundi au samedi, et le vendredi soir pour les soirées spéciales.

**En ligne :** https://hervelombardo693-creator.github.io/cafe-de-la-paix/
(GitHub Pages publie le dossier `docs/` de la branche `main` à chaque envoi)

## Contenu

- `docs/index.html` — la page
- `docs/style.css` — la mise en forme
- `docs/script.js` — remplit la page à partir des données
- `docs/donnees.js` — **le fichier à modifier** : menu de la semaine, soirée du vendredi, téléphone, adresse, horaires
- `docs/images/` — les photos

## Voir le site en local

Ouvrir `docs/index.html` dans un navigateur, ou lancer :

```
python -m http.server 8731 --directory docs
```

puis aller sur http://localhost:8731

## À compléter

- Téléphone et adresse dans `docs/donnees.js`
- Vérifier les horaires
- Ajouter une vraie photo de la façade
