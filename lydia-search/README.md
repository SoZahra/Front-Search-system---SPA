# Transactions search system - Test Technique Front-end

Application web de recherche de transactions développée dans le cadre d'un test technique.

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=flat&logo=tailwind-css)

## Objectif

Créer une Single Page Application (SPA) permettant de rechercher des transactions par leur label de manière intuitive et performante.

## Conformité aux exigences

✅ SPA développée avec React  
✅ Recherche par label insensible à la casse  
✅ Logique de recherche custom (aucune librairie externe pour le filtrage)  
✅ UI soignée et responsive avec Tailwind CSS  
✅ Bonnes pratiques : 
  - Composants réutilisables
  - Hooks customs
  - Code commenté et documenté
  - Séparation des responsabilités  
✅ Déployablement sur Vercel  

## Fonctionnalités

- **Recherche en temps réel** : Filtrage instantané des transactions par label
- **Interface moderne** : Design responsive et soigné avec Tailwind CSS
- **Performance optimisée** : Debouncing de la recherche pour limiter les calculs
- **Mobile-first** : Interface adaptative sur tous les appareils (mobile, tablette, desktop)
- **Recherche intelligente** : 
  - Insensible à la casse
  - Insensible aux accents (chercher "pathe" trouve "Pathé")
- **Correction d'encodage** : Gestion automatique des caractères accentués mal encodés
- **Vue détaillée** : Modal avec informations complètes au clic sur une transaction
- **États UX** : Gestion des états vides, chargement et compteur de résultats

### Prérequis

- Node.js (version 18 ou supérieure)
- npm

### Installation

1. **Cloner le repository**
```bash
git clone <repo>
cd lydia-search
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Lancer l'application en mode développement**
```bash
npm run dev
```

4. **Accéder à l'application**
Ouvrir [http://localhost:5173](http://localhost:5173) dans votre navigateur


## Structure du projet
```
src/
├── components/
│   ├── SearchBar.jsx           # Barre de recherche avec compteur de résultats
│   ├── TransactionList.jsx     # Grille de transactions avec gestion des états
│   ├── TransactionCard.jsx     # Card individuelle (version compacte avec truncate)
│   └── TransactionModal.jsx    # Modal de détails complets
├── hooks/
│   └── useTransactionSearch.js # Hook custom pour la logique de recherche
├── utils/
│   ├── searchUtils.js          # Fonction de filtrage (insensible à la casse et aux accents)
│   └── formatUtils.js          # Utilitaires de formatage et correction d'encodage
├── data/
│   └── transactions.json       # Données des transactions
├── App.jsx                     # Composant racine
└── main.jsx                    # Point d'entrée
```

## Choix techniques

### Framework et outils

**React + Vite**
- Build ultra-rapide avec Vite
- React pour la gestion d'état et composants réutilisables
- Bundle optimisé pour la production

**Tailwind CSS v3**
- Utility-first CSS pour un développement rapide
- Responsive design natif avec approche mobile-first
- Thème cohérent et maintainable

### Architecture et patterns

**Hook personnalisé `useTransactionSearch`**
- Séparation de la logique métier et de l'UI
- Réutilisabilité du code
- Debouncing intégré (300ms) pour optimiser les performances

**Composants atomiques**
- Composants petits et focalisés sur une responsabilité unique
- Facilite la maintenance et les tests
- Réutilisabilité maximale

**Gestion d'état locale avec useState**
- Simple et performant
- Modal contrôlée depuis le composant parent (App.jsx)

### Optimisations

**Debouncing de la recherche**
```javascript
// Attendre que l'utilisateur finisse de taper avant de filtrer
useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedSearchTerm(searchTerm);
  }, 300);
  return () => clearTimeout(timer);
}, [searchTerm]);
```
*Pourquoi ?* Éviter de recalculer le filtrage à chaque frappe, améliore les performances.

**Mémoïsation avec useMemo**
```javascript
// Éviter les recalculs inutiles du filtrage
const filteredTransactions = useMemo(() => {
  return filterTransactionsByLabel(transactions, debouncedSearchTerm);
}, [transactions, debouncedSearchTerm]);
```
*Pourquoi ?* Le filtrage ne se refait que si nécessaire, optimise le rendu.

**Correction d'encodage UTF-8**
- Fonction `fixEncoding()` pour gérer les caractères mal encodés (Ã©→é, â‚¬→€)
- Appliquée sur les labels et montants avant affichage

**Normalisation des accents**
- Fonction `removeAccents()` utilisant `String.normalize('NFD')`
- Permet de chercher "pathe" et trouver "Pathé"
- Cas d'usage réel : les utilisateurs tapent souvent sans accents (comme moi-meme)

### UX/UI

**Truncate**
- Textes longs tronqués avec `...` pour homogénéité visuelle
- Clic sur une card pour voir tous les détails dans un modal
- Évite le scroll horizontal et les layouts cassés

*Pourquoi ?* Visuel plus propre sans espace vide inutile

**Modal détaillée**
- Affichage complet des informations de transaction
- Fermeture au clic extérieur ou sur le bouton
- Structure organisée par sections

**États visuels clairs**
- Loading state pendant la recherche (debounce)
- État vide avec message explicite et emoji
- Badge de statut coloré (Complété, En attente, Erreur)
- Compteur de résultats en temps réel

**Responsive design (mobile-first)**
- Mobile : 1 colonne
- Tablette (md) : 2 colonnes
- Desktop (lg) : 3 colonnes

## Palette de couleurs
```css
Primaire : Bleu (#3B82F6)
Succès : Vert (#10B981)
Attention : Orange (#F59E0B)
Erreur : Rouge (#EF4444)
Neutre : Gris (#6B7280)
Background : Gradient Bleu-Violet (#EFF6FF → #FAF5FF)
```

## Déploiement

Sur Vercel


## Améliorations futures possibles

- Filtres avancés (date, montant, statut)
- Persistance de la recherche dans l'URL (query params)
- Mode sombre
- Progressive Web App (PWA)
- Analytics des recherches les plus fréquentes

## Licence

Ce projet est développé dans le cadre d'un test technique pour Lydia.