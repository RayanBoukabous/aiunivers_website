'use client';

import { ReactNode } from 'react';

export interface MediaItem {
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  title?: string;
}

export interface Solution {
  title: string;
  description: string;
  fullDescription: string;
  icon: ReactNode;
  slug: string;
  image: string;
  media?: MediaItem[];
  advantages: string[];
  targetClients: string[];
  features?: string[];
  useCases?: string[];
}

export interface Sector {
  title: string;
  description: string;
  fullDescription: string;
  icon: ReactNode;
  slug: string;
  solutions: Solution[];
}

// Fonction pour générer un slug
function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export const sectorsData: Sector[] = [
  {
    title: 'Intelligence Artificielle',
    description:
      'Transformez vos données en insights actionnables. Nos solutions d\'IA sur mesure automatisent vos processus et optimisent vos opérations pour une croissance exponentielle.',
    fullDescription:
      'L\'intelligence artificielle est au cœur de la transformation digitale. Nos solutions d\'IA sur mesure permettent aux entreprises d\'automatiser leurs processus, d\'optimiser leurs opérations et de prendre des décisions basées sur les données. Nous développons des systèmes d\'IA adaptatifs qui s\'améliorent continuellement et s\'intègrent parfaitement à vos infrastructures existantes.',
    slug: slugify('Intelligence Artificielle'),
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    solutions: [
      {
        title: 'Machine Learning & Deep Learning',
        description: 'Modèles prédictifs avancés pour l\'analyse de données complexes et la prise de décision automatisée.',
        fullDescription: 'Nos solutions de Machine Learning et Deep Learning transforment vos données en insights actionnables. Nous développons des modèles prédictifs personnalisés qui s\'adaptent à vos besoins spécifiques, permettant une prise de décision automatisée et intelligente. Nos algorithmes apprennent continuellement de vos données pour améliorer leurs performances au fil du temps.',
        slug: slugify('Machine Learning & Deep Learning'),
        image: '/logo/aiunivers.png',
        icon: (
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        ),
        media: [
          { type: 'image', url: '/logo/aiunivers.png', title: 'Architecture ML' },
          { type: 'image', url: '/logo/aiunivers.png', title: 'Dashboard Analytics' },
        ],
        advantages: [
          'Prédictions précises avec une marge d\'erreur minimale',
          'Apprentissage continu et amélioration automatique des performances',
          'Scalabilité pour gérer des volumes de données massifs',
          'Intégration transparente avec vos systèmes existants',
        ],
        targetClients: [
          'Entreprises de services financiers',
          'E-commerce et retail',
          'Industrie manufacturière',
          'Secteur de la santé',
        ],
        features: [
          'Modèles de régression et classification',
          'Réseaux de neurones profonds',
          'Traitement en temps réel',
          'API RESTful pour intégration',
        ],
        useCases: [
          'Prédiction de la demande',
          'Détection de fraude',
          'Recommandation personnalisée',
          'Optimisation de la chaîne d\'approvisionnement',
        ],
      },
      {
        title: 'Traitement du Langage Naturel (NLP)',
        description: 'Solutions de compréhension et génération de texte pour chatbots, analyse de sentiment et traduction automatique.',
        fullDescription: 'Nos solutions NLP permettent à vos systèmes de comprendre, analyser et générer du texte naturel. Nous développons des chatbots intelligents, des systèmes d\'analyse de sentiment, et des moteurs de traduction automatique qui comprennent le contexte et les nuances du langage humain.',
        slug: slugify('Traitement du Langage Naturel NLP'),
        image: '/logo/aiunivers.png',
        icon: (
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
          </svg>
        ),
        media: [
          { type: 'image', url: '/logo/aiunivers.png', title: 'Chatbot Interface' },
          { type: 'image', url: '/logo/aiunivers.png', title: 'Analyse de Sentiment' },
        ],
        advantages: [
          'Compréhension contextuelle avancée du langage naturel',
          'Support multilingue avec traduction automatique',
          'Analyse de sentiment en temps réel',
          'Génération de contenu intelligent',
        ],
        targetClients: [
          'Centres d\'appels et support client',
          'Médias et éditeurs de contenu',
          'E-commerce et marketplaces',
          'Institutions financières',
        ],
        features: [
          'Chatbots conversationnels intelligents',
          'Analyse de sentiment et opinion mining',
          'Traduction automatique multilingue',
          'Résumé automatique de documents',
        ],
        useCases: [
          'Service client automatisé 24/7',
          'Analyse de feedback clients',
          'Génération de contenu marketing',
          'Traduction de documents techniques',
        ],
      },
      {
        title: 'Computer Vision',
        description: 'Reconnaissance d\'images et analyse vidéo pour l\'automatisation industrielle et la surveillance intelligente.',
        fullDescription: 'Nos solutions de Computer Vision transforment les images et vidéos en données exploitables. Nous développons des systèmes de reconnaissance d\'objets, de détection de visages, et d\'analyse vidéo en temps réel pour l\'automatisation industrielle, la surveillance intelligente et bien plus encore.',
        slug: slugify('Computer Vision'),
        image: '/logo/aiunivers.png',
        icon: (
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        ),
        media: [
          { type: 'image', url: '/logo/aiunivers.png', title: 'Reconnaissance d\'Images' },
          { type: 'image', url: '/logo/aiunivers.png', title: 'Analyse Vidéo' },
        ],
        advantages: [
          'Détection et reconnaissance d\'objets en temps réel',
          'Analyse vidéo automatisée pour surveillance',
          'Contrôle qualité automatisé',
          'Amélioration de la sécurité et de la productivité',
        ],
        targetClients: [
          'Industrie manufacturière',
          'Sécurité et surveillance',
          'Transport et logistique',
          'Commerce de détail',
        ],
        features: [
          'Reconnaissance faciale et d\'objets',
          'Détection de mouvement et anomalies',
          'OCR avancé pour documents',
          'Analyse vidéo en streaming',
        ],
        useCases: [
          'Contrôle qualité automatisé',
          'Surveillance intelligente',
          'Reconnaissance de plaques d\'immatriculation',
          'Tri automatique de colis',
        ],
      },
    ],
  },
  {
    title: 'Télécommunications',
    description:
      'Infrastructures réseau de nouvelle génération. De la 5G à l\'IoT, nous concevons des systèmes de communication ultra-performants pour l\'ère digitale.',
    fullDescription:
      'Les télécommunications modernes nécessitent des infrastructures robustes et évolutives. Nous concevons et déployons des réseaux de nouvelle génération, de la 5G à l\'IoT, en passant par les solutions cloud. Nos systèmes garantissent une connectivité fiable, sécurisée et performante pour répondre aux besoins croissants des entreprises et des particuliers.',
    slug: slugify('Télécommunications'),
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
      </svg>
    ),
    solutions: [
      {
        title: 'Infrastructure 5G',
        description: 'Déploiement et optimisation de réseaux 5G pour une connectivité ultra-rapide et une latence minimale.',
        fullDescription: 'Nous déployons et optimisons des infrastructures 5G de nouvelle génération pour offrir une connectivité ultra-rapide avec une latence minimale. Nos solutions garantissent une couverture optimale et des performances exceptionnelles pour les entreprises et les particuliers.',
        slug: slugify('Infrastructure 5G'),
        image: '/logo/aiunivers.png',
        icon: (
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
          </svg>
        ),
        media: [
          { type: 'image', url: '/logo/aiunivers.png', title: 'Infrastructure 5G' },
        ],
        advantages: [
          'Débits ultra-rapides jusqu\'à 10 Gbps',
          'Latence ultra-faible inférieure à 1ms',
          'Support de millions d\'appareils connectés',
          'Couverture optimale avec technologies avancées',
        ],
        targetClients: [
          'Opérateurs télécoms',
          'Entreprises industrielles',
          'Villes intelligentes',
          'Centres de données',
        ],
        features: [
          'Déploiement d\'antennes 5G',
          'Optimisation de réseau',
          'Gestion de la bande passante',
          'Monitoring en temps réel',
        ],
        useCases: [
          'Réseaux d\'entreprise privés 5G',
          'Connectivité IoT massive',
          'Télémédecine et chirurgie à distance',
          'Véhicules autonomes',
        ],
      },
      {
        title: 'IoT & Connectivité',
        description: 'Solutions IoT complètes pour connecter et gérer des milliers d\'appareils intelligents.',
        fullDescription: 'Nos solutions IoT permettent de connecter et gérer des milliers d\'appareils intelligents de manière centralisée. Nous offrons une plateforme complète pour la collecte, l\'analyse et la gestion des données IoT, permettant une automatisation et une optimisation complètes de vos opérations.',
        slug: slugify('IoT & Connectivité'),
        image: '/logo/aiunivers.png',
        icon: (
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
          </svg>
        ),
        media: [
          { type: 'image', url: '/logo/aiunivers.png', title: 'Réseau IoT' },
        ],
        advantages: [
          'Gestion centralisée de milliers d\'appareils',
          'Collecte et analyse de données en temps réel',
          'Automatisation complète des processus',
          'Réduction des coûts opérationnels',
        ],
        targetClients: [
          'Industrie 4.0',
          'Agriculture intelligente',
          'Bâtiments intelligents',
          'Logistique et transport',
        ],
        features: [
          'Plateforme de gestion IoT',
          'Protocoles multiples (MQTT, CoAP, etc.)',
          'Analytics et visualisation',
          'Alertes et notifications automatiques',
        ],
        useCases: [
          'Monitoring d\'équipements industriels',
          'Gestion énergétique intelligente',
          'Suivi de flotte de véhicules',
          'Agriculture de précision',
        ],
      },
    ],
  },
  {
    title: 'Applications Web & Mobile',
    description:
      'Expériences digitales exceptionnelles. Nous développons des applications natives et web qui redéfinissent les standards de performance et d\'ergonomie.',
    fullDescription:
      'Nous créons des expériences digitales exceptionnelles qui engagent vos utilisateurs et stimulent votre croissance. Nos applications web et mobiles allient performance, design moderne et fonctionnalités avancées. Que ce soit pour iOS, Android ou le web, nous développons des solutions qui redéfinissent les standards de l\'industrie.',
    slug: slugify('Applications Web & Mobile'),
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    solutions: [
      {
        title: 'Applications Web Progressives (PWA)',
        description: 'Applications web modernes avec performances natives et fonctionnalités offline.',
        fullDescription: 'Nous développons des Progressive Web Apps (PWA) qui combinent les meilleures fonctionnalités des applications web et mobiles. Nos PWA offrent des performances natives, fonctionnent offline, et peuvent être installées sur n\'importe quel appareil, offrant une expérience utilisateur exceptionnelle.',
        slug: slugify('Applications Web Progressives PWA'),
        image: '/logo/aiunivers.png',
        icon: (
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
        ),
        media: [
          { type: 'image', url: '/logo/aiunivers.png', title: 'PWA Interface' },
        ],
        advantages: [
          'Performance native sans installation',
          'Fonctionnement offline complet',
          'Expérience utilisateur optimale',
          'Coûts de développement réduits',
        ],
        targetClients: [
          'E-commerce',
          'Médias et streaming',
          'Applications B2B',
          'Startups tech',
        ],
        features: [
          'Service Workers pour cache offline',
          'Notifications push',
          'Installation sur écran d\'accueil',
          'Responsive design adaptatif',
        ],
        useCases: [
          'Applications e-commerce mobiles',
          'Outils de productivité',
          'Applications de médias',
          'Dashboards d\'entreprise',
        ],
      },
      {
        title: 'Applications Mobiles Natives',
        description: 'Développement iOS et Android avec React Native, Flutter ou natif pour des performances optimales.',
        fullDescription: 'Nous développons des applications mobiles natives pour iOS et Android en utilisant les technologies les plus modernes (React Native, Flutter, ou développement natif). Nos applications offrent des performances optimales, une expérience utilisateur fluide et un design moderne adapté à chaque plateforme.',
        slug: slugify('Applications Mobiles Natives'),
        image: '/logo/aiunivers.png',
        icon: (
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        ),
        media: [
          { type: 'image', url: '/logo/aiunivers.png', title: 'App Mobile' },
        ],
        advantages: [
          'Performances natives optimales',
          'Accès aux fonctionnalités matérielles',
          'Expérience utilisateur native',
          'Publication sur App Store et Play Store',
        ],
        targetClients: [
          'Startups tech',
          'E-commerce',
          'Services financiers',
          'Médias et divertissement',
        ],
        features: [
          'Développement cross-platform (React Native, Flutter)',
          'Développement natif iOS/Android',
          'Intégration API et backend',
          'Tests et déploiement automatisés',
        ],
        useCases: [
          'Applications bancaires mobiles',
          'Marketplaces mobiles',
          'Applications de fitness',
          'Plateformes de streaming',
        ],
      },
      {
        title: 'E-Commerce & Marketplaces',
        description: 'Plateformes e-commerce complètes avec gestion de paiement, inventaire et analytics avancés.',
        fullDescription: 'Nous créons des plateformes e-commerce et marketplaces complètes avec toutes les fonctionnalités nécessaires : gestion de paiement sécurisée, inventaire en temps réel, analytics avancés, et expérience utilisateur optimisée pour maximiser les conversions.',
        slug: slugify('E-Commerce & Marketplaces'),
        image: '/logo/aiunivers.png',
        icon: (
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        ),
        media: [
          { type: 'image', url: '/logo/aiunivers.png', title: 'E-Commerce Platform' },
        ],
        advantages: [
          'Conversion optimisée avec UX moderne',
          'Gestion complète des paiements sécurisés',
          'Analytics avancés pour décisions data-driven',
          'Scalabilité pour gérer la croissance',
        ],
        targetClients: [
          'E-commerce et retail',
          'Marketplaces B2B et B2C',
          'Marques de mode et lifestyle',
          'Distributeurs en ligne',
        ],
        features: [
          'Catalogue produits avancé',
          'Gestion de panier et checkout',
          'Intégration paiements multiples',
          'Gestion d\'inventaire en temps réel',
        ],
        useCases: [
          'Boutiques en ligne complètes',
          'Marketplaces multi-vendeurs',
          'Applications de livraison',
          'Plateformes de dropshipping',
        ],
      },
    ],
  },
  {
    title: 'LMS & E-Learning',
    description:
      'Plateformes d\'apprentissage intelligentes. Révolutionnez la formation avec nos systèmes LMS adaptatifs qui maximisent l\'engagement et les résultats.',
    fullDescription:
      'Révolutionnez la formation et l\'éducation avec nos plateformes LMS intelligentes. Nos systèmes d\'apprentissage adaptatifs utilisent l\'IA pour personnaliser le parcours de chaque apprenant, maximiser l\'engagement et améliorer les résultats. Que ce soit pour la formation en entreprise ou l\'éducation en ligne, nos solutions transforment l\'expérience d\'apprentissage.',
    slug: slugify('LMS & E-Learning'),
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    solutions: [
      {
        title: 'Plateforme LMS Complète',
        description: 'Système de gestion de l\'apprentissage avec suivi des progrès, certifications et analytics.',
        fullDescription: 'Notre plateforme LMS complète offre tous les outils nécessaires pour gérer efficacement l\'apprentissage : création de cours, suivi des progrès en temps réel, système de certifications, analytics avancés, et une interface intuitive pour les apprenants et les formateurs.',
        slug: slugify('Plateforme LMS Complète'),
        image: '/logo/aiunivers.png',
        icon: (
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        ),
        media: [
          { type: 'image', url: '/logo/aiunivers.png', title: 'LMS Dashboard' },
        ],
        advantages: [
          'Gestion centralisée de tous les contenus pédagogiques',
          'Suivi détaillé des progrès des apprenants',
          'Certifications et badges automatisés',
          'Rapports et analytics complets',
        ],
        targetClients: [
          'Entreprises et formation professionnelle',
          'Établissements d\'enseignement',
          'Organismes de formation',
          'Centres de certification',
        ],
        features: [
          'Création de cours interactifs',
          'Quiz et évaluations automatisées',
          'Forum et collaboration',
          'Bibliothèque de ressources',
        ],
        useCases: [
          'Formation en entreprise',
          'Cours en ligne (MOOCs)',
          'Certifications professionnelles',
          'Onboarding des employés',
        ],
      },
      {
        title: 'Formation Adaptative IA',
        description: 'Parcours d\'apprentissage personnalisés avec recommandations intelligentes basées sur l\'IA.',
        fullDescription: 'Notre solution de formation adaptative utilise l\'intelligence artificielle pour créer des parcours d\'apprentissage personnalisés pour chaque apprenant. Le système analyse les performances, identifie les points faibles, et recommande automatiquement du contenu adapté pour maximiser l\'efficacité de l\'apprentissage.',
        slug: slugify('Formation Adaptative IA'),
        image: '/logo/aiunivers.png',
        icon: (
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        ),
        media: [
          { type: 'image', url: '/logo/aiunivers.png', title: 'Formation Adaptative' },
        ],
        advantages: [
          'Parcours personnalisés pour chaque apprenant',
          'Recommandations intelligentes basées sur l\'IA',
          'Amélioration continue des résultats',
          'Engagement et motivation accrus',
        ],
        targetClients: [
          'Établissements d\'enseignement supérieur',
          'Centres de formation professionnelle',
          'Entreprises avec programmes de formation',
          'Plateformes EdTech',
        ],
        features: [
          'Analyse comportementale des apprenants',
          'Recommandation de contenu adaptatif',
          'Détection des difficultés d\'apprentissage',
          'Ajustement automatique du rythme',
        ],
        useCases: [
          'Formation personnalisée en entreprise',
          'Tutorat intelligent',
          'Préparation aux examens',
          'Formation continue adaptative',
        ],
      },
    ],
  },
  {
    title: 'Cybersécurité',
    description:
      'Protection entreprise de niveau militaire. Sécurisez vos actifs numériques avec nos solutions de cybersécurité proactives et nos audits approfondis.',
    fullDescription:
      'La cybersécurité est essentielle dans un monde de plus en plus connecté. Nos solutions de protection de niveau entreprise sécurisent vos actifs numériques contre les menaces les plus sophistiquées. Nous proposons des audits approfondis, une surveillance 24/7 et des solutions de sécurité proactives pour protéger votre infrastructure et vos données.',
    slug: slugify('Cybersécurité'),
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    solutions: [
      {
        title: 'Audit & Pentesting',
        description: 'Évaluation complète de la sécurité de vos systèmes avec tests de pénétration et recommandations.',
        fullDescription: 'Nos audits de sécurité et tests de pénétration identifient les vulnérabilités de vos systèmes avant qu\'elles ne soient exploitées. Nous effectuons des évaluations complètes, simulons des attaques réelles, et fournissons des recommandations détaillées pour renforcer votre sécurité.',
        slug: slugify('Audit & Pentesting'),
        image: '/logo/aiunivers.png',
        icon: (
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        ),
        media: [
          { type: 'image', url: '/logo/aiunivers.png', title: 'Audit Sécurité' },
        ],
        advantages: [
          'Identification proactive des vulnérabilités',
          'Tests de pénétration réalistes',
          'Conformité réglementaire garantie',
          'Recommandations actionnables',
        ],
        targetClients: [
          'Institutions financières',
          'E-commerce et retail',
          'Organisations gouvernementales',
          'Entreprises tech',
        ],
        features: [
          'Audit de sécurité complet',
          'Tests de pénétration (pentesting)',
          'Analyse de code source',
          'Rapports détaillés avec priorités',
        ],
        useCases: [
          'Audit de sécurité annuel',
          'Tests avant mise en production',
          'Conformité RGPD et standards',
          'Évaluation de risques',
        ],
      },
      {
        title: 'Surveillance & Détection',
        description: 'Monitoring 24/7 avec détection proactive des menaces et réponse automatisée aux incidents.',
        fullDescription: 'Notre système de surveillance 24/7 surveille en permanence vos infrastructures pour détecter les menaces en temps réel. Nous utilisons l\'IA pour identifier les comportements suspects, alerter immédiatement en cas d\'incident, et déclencher des réponses automatisées pour minimiser les dommages.',
        slug: slugify('Surveillance & Détection'),
        image: '/logo/aiunivers.png',
        icon: (
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        ),
        media: [
          { type: 'image', url: '/logo/aiunivers.png', title: 'Monitoring Center' },
        ],
        advantages: [
          'Surveillance 24/7 sans interruption',
          'Détection proactive des menaces',
          'Réponse automatisée aux incidents',
          'Réduction du temps de réaction',
        ],
        targetClients: [
          'Centres de données',
          'Entreprises critiques',
          'Institutions financières',
          'Organisations gouvernementales',
        ],
        features: [
          'Monitoring en temps réel',
          'Détection d\'anomalies par IA',
          'Alertes intelligentes',
          'Tableaux de bord personnalisables',
        ],
        useCases: [
          'Surveillance d\'infrastructure',
          'Détection d\'intrusions',
          'Monitoring de performances',
          'Gestion d\'incidents de sécurité',
        ],
      },
      {
        title: 'Gestion des Identités',
        description: 'Solutions IAM complètes avec authentification multi-facteurs et gestion des accès.',
        fullDescription: 'Nos solutions IAM (Identity and Access Management) offrent une gestion centralisée des identités et des accès. Nous implémentons l\'authentification multi-facteurs, la gestion des rôles et permissions, et des politiques de sécurité avancées pour protéger vos ressources.',
        slug: slugify('Gestion des Identités'),
        image: '/logo/aiunivers.png',
        icon: (
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        ),
        media: [
          { type: 'image', url: '/logo/aiunivers.png', title: 'IAM Dashboard' },
        ],
        advantages: [
          'Gestion centralisée des identités',
          'Sécurité renforcée avec MFA',
          'Conformité réglementaire',
          'Expérience utilisateur simplifiée',
        ],
        targetClients: [
          'Grandes entreprises',
          'Institutions financières',
          'Organisations gouvernementales',
          'Fournisseurs de services cloud',
        ],
        features: [
          'Authentification multi-facteurs (MFA)',
          'Gestion des rôles et permissions (RBAC)',
          'Single Sign-On (SSO)',
          'Audit et conformité',
        ],
        useCases: [
          'Gestion d\'accès entreprise',
          'Sécurisation d\'applications cloud',
          'Conformité RGPD et standards',
          'Onboarding/offboarding automatisé',
        ],
      },
    ],
  },
];

export function getSectorBySlug(slug: string): Sector | undefined {
  return sectorsData.find((sector) => sector.slug === slug);
}

export function getSolutionBySlug(
  sectorSlug: string,
  solutionSlug: string,
): Solution | undefined {
  const sector = getSectorBySlug(sectorSlug);
  if (!sector) return undefined;
  return sector.solutions.find((solution) => solution.slug === solutionSlug);
}
