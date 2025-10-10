# 📱 MyContacts

Une application web de gestion de contacts développée avec une architecture fullstack, permettant aux utilisateurs de créer, gérer et organiser leurs contacts personnels.

## 📋 Description du projet

MyContacts est une application de gestion de contacts complète qui permet aux utilisateurs de :
- Créer un compte et s'authentifier de manière sécurisée
- Ajouter, modifier et supprimer leurs contacts personnels  
- Consulter la liste de leurs contacts avec une interface moderne
- Gérer leurs informations de profil

## 🛠️ Technologies utilisées

### Backend
- **Node.js** - Environnement d'exécution JavaScript
- **Express.js** - Framework web pour Node.js
- **MongoDB** - Base de données NoSQL avec Mongoose ODM
- **JWT** - Authentification par tokens
- **Bcrypt** - Chiffrement des mots de passe
- **Jest** - Framework de tests unitaires
- **CORS** - Gestion des requêtes cross-origin

### Frontend
- **React 19** - Bibliothèque JavaScript pour l'interface utilisateur
- **TypeScript** - Superset typé de JavaScript
- **Vite** - Outil de build et de développement
- **Tailwind CSS** - Framework CSS utilitaire
- **Radix UI** - Composants UI accessibles
- **React Router** - Gestion du routage
- **Axios** - Client HTTP pour les requêtes API
- **Formik & Yup** - Gestion des formulaires et validation
- **SHADCN** - Composants UI accessibles

## 🚀 Installation et exécution (localement)

### Prérequis
- Node.js (version 18 ou supérieure)
- npm ou yarn
- MongoDB (local ou Atlas)

### Installation

1. **Cloner le repository**
```bash
git clone https://github.com/Fvrenn/MyContacts.git
cd MyContacts
```

2. **Configuration du Backend**
```bash
cd MY-CONTACTS-BACKEND
npm install
```

Créer un fichier `.env` avec les variables suivantes :
```env
DATABASE_URL=URL_BASE_MONGO
SECRET_KEY=your_jwt_secret_key
PORT=3000
```

3. **Configuration du Frontend**
```bash
cd ../MY-CONTACTS-FRONTEND
npm install
```

### Exécution

1. **Démarrer le serveur backend**
```bash
cd MY-CONTACTS-BACKEND
npm start
```
Le serveur sera accessible sur `http://localhost:3000`

2. **Démarrer l'application frontend**
```bash
cd MY-CONTACTS-FRONTEND
npm run dev
```
L'application sera accessible sur `http://localhost:5173`

## 🌐 Liens de déploiement

- **Frontend** : https://my-contacts-amber.vercel.app
- **Backend API** : https://mycontacts-p9kf.onrender.com
- **Documentation API** : https://mycontacts-p9kf.onrender.com/api-docs
L'API est documentée selon la spécification OpenAPI 3.0. Le fichier de spécification est disponible dans `openapi_3.1.yml`.

### Endpoints principaux :

- `POST /auth/register` - Inscription d'un nouvel utilisateur
- `POST /auth/login` - Connexion utilisateur
- `GET /me` - Informations du profil utilisateur
- `GET /contact` - Liste des contacts de l'utilisateur
- `POST /contact` - Créer un nouveau contact
- `GET /contact/:id` - Récupérer un contact spécifique
- `PATCH /contact/:id` - Modifier un contact
- `DELETE /contact/:id` - Supprimer un contact

### Authentification
L'API utilise l'authentification JWT. Incluez le token dans l'en-tête Authorization :
```
Authorization: Bearer <votre_token_jwt>
```

## 🧪 Tests unitaires

Le projet inclut une suite complète de tests unitaires pour les services backend.

### Exécution des tests
```bash
cd MY-CONTACTS-BACKEND
npm test
```

### Couverture des tests
- **Services d'authentification** - Tests d'inscription et de connexion
- **Services de contacts** - Tests CRUD complets
- **Services utilisateur** - Tests de récupération de profil
- **Middleware d'authentification** - Tests de validation des tokens

## ✨ Fonctionnalités principales

### 🔐 Authentification et sécurité
- Inscription et connexion sécurisées
- Chiffrement des mots de passe avec bcrypt
- Authentification JWT avec expiration
- Protection CORS configurée
- Validation des emails et données d'entrée

### 👥 Gestion des contacts
- **Création** : Ajouter de nouveaux contacts avec nom, téléphone et adresse
- **Lecture** : Visualiser la liste complète des contacts personnels
- **Modification** : Éditer les informations des contacts existants  
- **Suppression** : Supprimer des contacts de manière sécurisée
- **Contrôle d'accès** : Chaque utilisateur ne peut accéder qu'à ses propres contacts

### 🔧 Fonctionnalités techniques
- API REST complète avec gestion d'erreurs
- Tests unitaires avec Jest
- Validation des données côté serveur et client
- Gestion des états d'erreur et de chargement
- Architecture modulaire et maintenable

---
