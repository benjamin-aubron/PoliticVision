# Product Requirements Document: [PoliticalVision]

## Product Overview

**Product Vision:** [Une liste de questions pour aider une personne à se positionner sur l'échiquier politique]
**Target Users:** [Primary personna: une personne curieuse de la politique qui veut savoir comment se positionner, secondary personna: un chercheur/politologue qui veut comprendre un peu mieux les opinions des gens]
**Business Objectives:** [Pas d'objectif business dans ce projet]
**Success Metrics:** [Succès : 1000 personnes par mois]

## User Personas

### Persona 1: [Une personne qui veut faire le questionnaire]
- **Demographics:** [En age de voter]
- **Goals:** [Elle doit pouvoir répondre aux questions]
- **Pain Points:** []
- **User Journey:** [Elle répond aux questions et a accès à son score final]

### Persona 2: [Un chercheur ou politologue qui veut se renseigner sur la politique vu par notre site]
- **Demographics:** [En age de voter]
- **Goals:** [Naviguer sur une page "Statistique", "Idéologies politiques"]
- **Pain Points:** [Donner accès aux statistiques seulement si le test a été effectué]
- **User Journey:** [Explorer les différentes idéologies politiques]

## Feature Requirements

| Feature | Description | User Stories | Priority | Acceptance Criteria | Dependencies |
|---------|-------------|--------------|----------|---------------------|--------------|
| **[Feature 1]** | [Répondre aux questions] | [En tant qu'utilisateur, je veux répondre aux questions sur mes opinions politiques] | [Must] | [Réponse aux questions de db/data.json] | [None] |
| **[Feature 2]** | [Explorer les différentes idéologies politiques] | [En tant qu'utilisateur, je voir mon score final pour savoir mon orientation politique] | [Must] | [Affichage de jauges pour indiquer la tendance sur les différents axes politiques] | [Feature 1] |
| **[Feature 3]** | [Consulter les statistiques des réponses] | [En tant qu'utilisateur, je veux pouvoir voir les statistiques globales des autres réponses] | [Should] | [] | [Feature 2] |
| **[Feature 4]** | [Envoyer mon score] | [En tant qu'utilisateur, je veux pouvoir partager mon score] | [Should] | [Le pathname de l'url doit contenir le résultat grâce à NUQS] | [Feature 2] |
| **[Feature 5]** | [Aider à améliorer les questions] | [En tant qu'utilisateur, je veux pouvoir améliorer le site] | [Could] | [] | [] |
| **[Feature 6]** | [Je dois pouvoir changer la langue] | [En tant qu'utilisateur, je veux pouvoir changer la langue des questions] | [Could] | [] | [] |

## User Flows

### Flow 1: [Réponse aux questions]
1. [Arrivée sur la page d'accueil]
2. [Réponses aux questions]
3. [Navigation sur les résultats]
4. [Comparer avec les autres]
5. [CPartager mon score]

### Flow 2: [Exploration des idéologies]
1. [Arrivée sur la page d'accueil]
2. [Sélection de l'onglet "Idéologies politiques"]

### Flow 3: [Exploration FAQ]
1. [Arrivée sur la page d'accueil]
2. [Sélection de l'onglet "FAQ"]


## Technical Specifications

- Utilise le MCP Context7 - use context7

### Frontend
- **Technology Stack:** [Typescript, Next.js]
- **Design System:** [Shadcn, OriginUI]
- **Responsive Design:** [Requirements]

### Backend
- **Technology Stack:** [Typescript, Next.js]
- **API Requirements:** [RESTful]
- **Database:** [Neon]
- **ORM:** [Prisma]

### Infrastructure
- **Hosting:** [Vercel]
- **CI/CD:** [Github]


## Technical Features

### Questions dans l'url avec NUQS
- Les questions arrivent une par une, on reste sur la même page
- Six choix proposés, "Totalement d'accord", "Plûtot d'accord", "Mitigé", "Plutôt pas d'accord", "Pas du tout d'accord", "Ne se prononce pas". En dessous de ces choix, un bouton question suivante