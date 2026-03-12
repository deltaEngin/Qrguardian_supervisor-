# QRGuardian - Supervision

Application de supervision et d'analyse des scans de QR codes pour les événements.  
Elle permet de visualiser en temps réel les données collectées via Supabase, de les filtrer, de les exporter et de les sauvegarder localement.

## Fonctionnalités

- **Tableau de bord** avec statistiques globales (total scans, valides, invalides, doublons, montant total).
- **Graphique** de répartition par type de QR code (standard, VIP, VVIP, premium, regular).
- **Filtres** :
  - Par statut (tous, valides, invalides, doublons, connexions)
  - Par type de QR code
  - Recherche textuelle (événement, lieu, ID)
- **Actions** :
  - Export des données filtrées en CSV
  - Génération d'un rapport PDF imprimable
  - Sauvegarde locale dans IndexedDB
  - Chargement des données depuis le stockage local
  - Suppression de toutes les données Supabase
  - Vidage du stockage local
  - Export du graphique en JPG
- **Thème clair/sombre** (sauvegarde dans localStorage)
- **Mise à jour en temps réel** via les changements en base (subscription Supabase)
- **Indicateur de connexion** (en ligne / hors ligne)
- **Service Worker** pour une utilisation hors ligne (PWA)

## Technologies utilisées

- HTML5 / CSS3
- JavaScript (ES6+)
- [Supabase](https://supabase.com/) (base de données temps réel)
- [Chart.js](https://www.chartjs.org/) pour les graphiques
- [html2canvas](https://html2canvas.hertzen.com/) pour l'export du graphique
- [Font Awesome](https://fontawesome.com/) pour les icônes
- IndexedDB (stockage local)
- Service Worker (PWA)

## Installation

1. **Cloner le dépôt** (ou télécharger les fichiers) :
   ```bash
   git clone https://github.com/votre-compte/qrguardian-supervision.git