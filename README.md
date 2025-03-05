# LetsCook

LetsCook est une application web de recettes permettant aux utilisateurs de découvrir, rechercher et sauvegarder leurs recettes préférées. Elle a été développée avec React et utilise l'API Tasty de RapidAPI.

## Comment exécuter le projet

### Prérequis
- Node.js (version 14 ou supérieure)
- NPM ou Yarn
- Une clé API Tasty de RapidAPI

### Installation

1. Clonez le dépôt sur votre machine locale
   ```
   git clone <url-du-repo>
   cd LetsCook
   ```

2. Installez les dépendances
   ```
   npm install
   # ou
   yarn install
   ```

3. Créez un fichier `.env` à la racine du projet avec votre clé API
   ```
   VITE_RAPIDAPI_KEY=votre_clé_api_ici
   ```

4. Lancez l'application en mode développement
   ```
   npm run dev
   # ou
   yarn dev
   ```

5. Ouvrez [http://localhost:5173](http://localhost:5173) dans votre navigateur

### Informations de connexion
- **Nom d'utilisateur**: admin
- **Mot de passe**: admin123

## Fonctionnalités

- **Authentification**: Système de connexion simple avec protection des routes
- **Découverte de recettes**: Affichage de recettes populaires via l'API Tasty
- **Recherche avancée**: Recherche par nom ou par ingrédients
- **Favoris**: Possibilité d'ajouter/supprimer des recettes aux favoris (stockés en localStorage)
- **Vue détaillée**: Informations complètes sur chaque recette (ingrédients, instructions, nutrition)
- **Commentaires**: Ajout de conseils et commentaires sur les recettes (stockés en localStorage)
- **Responsive**: Interface adaptée aux mobiles et ordinateurs

## Technologies utilisées

- **React**: Framework JavaScript pour l'interface utilisateur
- **Vite**: Outil de build rapide pour le développement moderne
- **React Router**: Gestion des routes et navigation
- **Tailwind CSS**: Framework CSS utilitaire pour le design
- **RapidAPI Tasty**: Source des données de recettes
- **Local Storage**: Stockage côté client pour les favoris et commentaires

## Notes sur l'API

L'API Tasty est limitée à 500 appels par mois sur le plan gratuit. Si vous atteignez cette limite, l'application affichera un message d'erreur approprié.

## Structure du projet

- `src/components`: Composants réutilisables
- `src/pages`: Pages principales de l'application
- `src/context`: Contextes React (authentification)
- `src/hooks`: Hooks personnalisés (gestion des favoris)

---

Projet réalisé dans le cadre du cours de développement web React.
