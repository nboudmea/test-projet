
# 🧠 Memento - Transformez votre audio en apprentissage

Memento est une application web moderne qui révolutionne l'apprentissage en transformant vos enregistrements audio en contenus éducatifs structurés : transcriptions, fiches de révision et quiz interactifs.

## ✨ Fonctionnalités

### 🎯 Pages principales
- **Home** : Landing page avec présentation du produit et navigation
- **Dashboard** : Gestion des projets d'apprentissage
- **Workspace** : Environnement de travail complet avec sidebar navigationnelle
- **Settings** : Configuration du profil et préférences

### 🔧 Workspace intégré
- **Transcription** : Upload audio et édition de transcription
- **Fiches** : Système de flashcards avec retournement interactif
- **Quiz** : Questionnaires interactifs avec scoring
- **Chat IA** : Assistant conversationnel style ChatGPT contextualisé

### 🎨 Design & UX
- **Palette Memento** : Navy (#264653), Teal (#2a9d8f), Yellow (#e9c46a), Orange (#f4a261), Coral (#e76f51)
- **Typographie** : Inter font family
- **Animations** : Transitions fluides et micro-interactions
- **Responsive** : Design adaptatif mobile/tablette/desktop
- **Accessibilité** : Conforme WCAG 2.1

## 🛠 Technologies

- **Frontend** : React 18+ avec TypeScript
- **Styling** : Tailwind CSS + shadcn/ui components
- **Routing** : React Router v6
- **State Management** : Zustand avec persistance
- **Build Tool** : Vite
- **Icons** : Lucide React

## 🚀 Installation et démarrage

### Prérequis
- Node.js 18+
- npm ou yarn

### Installation

```bash
# Cloner le projet
git clone <votre-repo-url>
cd memento

# Installer les dépendances
npm install

# Lancer en mode développement
npm run dev

# Build pour production
npm run build

# Preview du build
npm run preview
```

### Scripts disponibles

```bash
npm run dev          # Serveur de développement
npm run build        # Build de production  
npm run preview      # Preview du build
npm run lint         # Linting ESLint
```

## 📁 Structure du projet

```
src/
├── components/           # Composants réutilisables
│   ├── ui/              # Composants shadcn/ui
│   └── workspace/       # Composants spécifiques au workspace
├── pages/               # Pages principales
├── store/               # Store Zustand
├── lib/                 # Utilitaires
├── hooks/               # Hooks personnalisés
└── main.tsx            # Point d'entrée
```

## 🎮 Utilisation

### Démarrage rapide
1. Ouvrez l'application sur `http://localhost:8080`
2. Cliquez sur "Commencer maintenant" (login automatique en demo)
3. Créez votre premier projet depuis le dashboard
4. Uploadez un fichier audio dans l'onglet Transcription
5. Générez automatiquement fiches et quiz
6. Utilisez le chat IA pour poser des questions sur votre contenu

### Navigation Workspace
- **Sidebar** : Navigation entre les différentes vues
- **Transcription** : Lecteur audio + éditeur de texte
- **Fiches** : Système de flashcards interactif
- **Quiz** : Questions à choix multiples avec explications
- **Chat** : Assistant IA contextuel

## 🔧 Configuration

### Couleurs personnalisées
Les couleurs Memento sont configurées dans `tailwind.config.ts` :

```typescript
memento: {
  navy: '#264653',
  teal: '#2a9d8f', 
  yellow: '#e9c46a',
  orange: '#f4a261',
  coral: '#e76f51'
}
```

### Store Zustand
Le state global est géré via Zustand avec persistance locale :
- Authentification utilisateur
- Gestion des projets
- Messages du chat
- État de l'interface

## 🎨 Composants clés

### AudioPlayer
Lecteur audio simulé avec contrôles play/pause et barre de progression.

### FlashcardsView
Système de cartes retournables avec difficulté et tags, animation flip.

### QuizView  
Interface de quiz progressive avec scoring, explications et navigation.

### ChatView
Chat conversationnel avec avatar IA, historique persistant et questions suggérées.

## 📱 Responsive Design

- **Mobile** : Navigation adaptée, sidebar collapsible
- **Tablette** : Grille ajustée, optimisation touch
- **Desktop** : Expérience complète, sidebar fixe

## ♿ Accessibilité

- Contraste WCAG AA
- Navigation clavier
- Attributs ARIA
- Labels sémantiques
- Focus management

## 🔮 Évolutions futures

- [ ] Intégration API de transcription réelle
- [ ] Système d'authentification complet  
- [ ] Partage de projets entre utilisateurs
- [ ] Analytics d'apprentissage
- [ ] Export PDF des fiches
- [ ] Mode hors-ligne avec synchronisation

## 📄 Licence

MIT License - voir le fichier LICENSE pour plus de détails.

## 🤝 Contribution

Les contributions sont les bienvenues ! Merci de suivre les guidelines de développement et de tester vos modifications.

---

**Memento** - Transformez votre façon d'apprendre avec l'IA 🚀
