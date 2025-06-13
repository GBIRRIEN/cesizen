# CESIZen – Application de Bien-Être pour Étudiants

CESIZen est une application web destinée aux étudiants du CESI, visant à améliorer leur bien-être mental à travers des parcours guidés, des exercices de respiration, des articles informatifs, et des diagnostics personnalisés.

---

## Architecture du projet

L’application repose sur une stack moderne centrée autour de **Next.js** et **Supabase**, avec déploiement automatisé via **Vercel**.

### Technologies utilisées

- **Frontend** : Next.js 14 (App Router, Server Components)
- **Backend** : Supabase (authentification, base de données PostgreSQL, stockage)
- **Base de données** : PostgreSQL (via Supabase)
- **Déploiement** : Vercel (intégré à GitHub)
- **CI/CD** : GitHub + Vercel
- **Design & UI** : Tailwind CSS, shadcn/ui

---

## Installation et déploiement

### Pré-requis

- Node.js ≥ 18
- Compte Supabase
- Compte GitHub
- Vercel CLI (si déploiement local)

### Étapes d’installation

1. **Cloner le dépôt** :
    git clone https://github.com/votre-utilisateur/cesizen.git
    cd cesizen

2. **Installer les dépendances** :
    npm install

3. **Configurer les variables d’environnement** :
Créer un fichier .env.local à la racine du projet :

NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

4. **Lancer le projet en développement** :
    npm run dev

5. **Déploiement sur Vercel** :
Le projet est automatiquement déployé à chaque push sur la branche main (production) et dev (préproduction).
Pour un déploiement manuel :
    vercel --prod

## Fonctionnement de l’authentification
CESIZen utilise Supabase Auth pour gérer l’authentification :
- Création de compte : par email et mot de passe
- Sessions : gérées automatiquement côté client via Supabase JS SDK
- Séparation des rôles :
    - User : utilisateur classique
    - Admin : accès aux pages /compte/admin/*
- Protection des routes admin :
    - Via un layout spécifique (layout.tsx) dans le dossier compte/admin/
    - Ce layout vérifie le rôle de l’utilisateur au chargement avant d’autoriser l’accès

## Environnements
Le projet utilise les environnements suivants :

Production	https://cesizen.vercel.app	main
Préproduction	https://cesizen-git-dev.vercel.app	dev
Local	http://localhost:3000	N/A

## Auteur
Guillaume BIRRIEN

Projet encadré dans le cadre de la formation CDA de CESI