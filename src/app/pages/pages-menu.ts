import { NbMenuItem } from '@nebular/theme';
import { icon } from 'leaflet';
import { title } from 'process';

export const MENU_ITEMS_ADMIN: NbMenuItem[] = [
  /*{
    title: 'E-commerce',
    icon: 'shopping-cart-outline',
    link: '/pages/dashboard',
    home: true,
  },*/
  {
    title: 'Acceuil',
    icon: 'home-outline',
    link: '/pages/iot-dashboard',
    home: true,
  },
  {
    title: 'Admin Freelance Provider',
    group: true,
  },
  {
    title: 'Gestion Users ',
    icon: 'layout-outline',
    children: [
      {
        title: 'Ajout Utilisateur',
        link: '/pages/users/new',
      },
      {
        title: 'Tous les utlisateurs',
        link: '/pages/users/ALL',
      },
      {
        title: 'RH',
        link: '/pages/users/Rh',
      },
      {
        title: 'Employee',
        link: '/pages/users/Employee',
      },
      {
        title: 'Provider',
        link: '/pages/users/Provider',
      },
      {
        title: 'Operational',
        link: '/pages/users/Operational',
      },
      {
        title: 'Commercial',
        link: '/pages/users/Commercial',
      },
      {
        title: 'Clients',
        link: '/pages/users/Client',
      },
    ],
  },
  {
    title: 'Gestion conges',
    icon: 'layout-outline',
    children: [
      {
        title: 'Tous',
        link: '/pages/vacations/all',
      },
      {
        title: 'Demandes',
        link: '/pages/vacations/en attente',
      },
      {
        title: 'Acceptee',
        link: '/pages/vacations/acceptee',
      },
      {
        title: 'Refused',
        link: '/pages/vacations/refusee',
      },
    ],
  },
  {
    title: 'Formations & Experiences',
    icon: 'layout-outline',
    children: [
      {
        title: 'Tous',
        link: '/pages/formations/all',
      },
      {
        title: 'Demandes en attente',
        link: '/pages/formations/non approuvee',
      },
      {
        title: 'Approuvees',
        link: '/pages/formations/approuvee',
      },
      {
        title: 'Refusees',
        link: '/pages/formations/refusee',
      },
    ],
  },
  

  {
    title: 'Gestion des offres missions',
    icon: 'layout-outline',
    children: [
      {
        title: 'Ajout mission',
        link: '/pages/missions/new',
      },

      {
        title: ' Toutes les missions',
        link: '/pages/missions/all',
      },
      {
        title: 'Libres',
        link: '/pages/missions/libre',
      },
      {
        title: 'En option',
        link: '/pages/missions/en option',
      },
      {
        title: 'Bloquées',
        link: '/pages/missions/blocker',
      },

      {
        title: 'Confirmées',
        link: '/pages/missions/confirmer',
      },
      {
        title: 'En cours',
        link: '/pages/missions/en cours',
      },

      {
        title: 'Realisées',
        link: '/pages/missions/realiser',
      },

      {
        title: 'Annulées',
        link: '/pages/missions/annuler',
      },
    ],
  },

  {
    title: 'Gestion d\'offres d\'emploi',
    icon: 'layout-outline',
    children: [
      {
        title: 'ajout offre d\'emploi',
        link: '/pages/jobs/new',
      },
      {
        title: ' list d\'offres d\'emploi',
        link: '/pages/jobs/all',
      },
    ],
  },

  {
    title: 'Gestion commercial',
    icon: 'layout-outline',
    children: [
      {
        title: 'Ajout nouveau Prospect',
        link: '/pages/prospections/new',
      },
      {
        title: 'tous les prospects',
        link: '/pages/prospections/all',
      },
    ],
  },

  {
    title: 'Documentheque',
    icon: 'layout-outline',
    children: [
      {
        title: 'Nouveau document',
        link: '/pages/documents/new',
      },
      {
        title: 'tous les Documents',
        link: '/pages/documents/all',
      },
    ],
  },

  {
    title: 'gestion des competences',
    icon: 'layout-outline',
    children: [
      {
        title: 'ajout d\'une competence',
        link: '/pages/skills/new',
      },
      {
        title: 'Liste des competences',
        link: '/pages/skills/all',
      },
    ],
  },

  {
    title: 'gestion des certifications',
    icon: 'layout-outline',
    children: [
      {
        title: 'ajout d\'une certification',
        link: '/pages/certifs/new',
      },
      {
        title: 'Liste des certifications',
        link: '/pages/certifs/all',
      },
    ],
  },

  {
    title: 'gestion questionnaires',
    icon: 'layout-outline',
    children: [
      {
        title: 'Ajout quiz',
        link: '/pages/quiz/new',
      },
      {
        title: 'Liste des Quiz',
        link: '/pages/quiz/all',
      },
      {
        title: 'Liste des candidatures',
        link: '/pages/quiz/session',
      },
    ],
  },

  
  

  
];

export const MENU_ITEMS_RH: NbMenuItem[] = [
  {
    title: 'Acceuil',
    icon: 'home-outline',
    link: '/pages/iot-dashboard',
    home: true,
  },
  {
    title: 'Ressource humaine Freelance Provider',
    group: true,
  },

  {
    title: 'Gestion Users ',
    icon: 'layout-outline',
    children: [
      {
        title: 'Ajout Utilisateur',
        link: '/pages/users/new',
      },
      {
        title: 'Tous les utlisateurs',
        link: '/pages/users/ALL',
      },
      {
        title: 'RH',
        link: '/pages/users/Rh',
      },
      {
        title: 'Employee',
        link: '/pages/users/Employee',
      },
      {
        title: 'Provider',
        link: '/pages/users/Provider',
      },
      {
        title: 'Operational',
        link: '/pages/users/Operational',
      },
      {
        title: 'Commercial',
        link: '/pages/users/Commercial',
      },
      {
        title: 'Clients',
        link: '/pages/users/Client',
      },
    ],
  },
  {
    title: 'Gestion conges',
    icon: 'layout-outline',
    children: [
      {
        title: 'Tous',
        link: '/pages/vacations/all',
      },
      {
        title: 'Demandes',
        link: '/pages/vacations/en attente',
      },
      {
        title: 'Acceptee',
        link: '/pages/vacations/acceptee',
      },
      {
        title: 'Refused',
        link: '/pages/vacations/refusee',
      },
    ],
  },
  {
    title: 'Formations & Experiences',
    icon: 'layout-outline',
    children: [
      {
        title: 'Tous',
        link: '/pages/formations/all',
      },
      {
        title: 'En attente',
        link: '/pages/formations/non approuvee',
      },
      {
        title: 'Approuvees',
        link: '/pages/formations/approuvee',
      },
      {
        title: 'Refusees',
        link: '/pages/formations/refusee',
      },
    ],
  },

  {
    title: 'Gesion des roles users',
    icon: 'layout-outline',
    children: [
      {
        title: 'ajout d\'un role',
        link: '/pages/missions/new',
      },
      {
        title: 'la liste des roles',
        link: '/pages/missions/all',
      },
    ],
  },

  {
    title: 'Gestion des offres missions',
    icon: 'layout-outline',
    children: [
      {
        title: 'Ajout mission',
        link: '/pages/missions/new',
      },

      {
        title: ' Toutes les missions',
        link: '/pages/missions/all',
      },
      {
        title: 'Missions Libres',
        link: '/pages/missions/libre',
      },
      {
        title: 'Missions En option',
        link: '/pages/missions/en option',
      },
      {
        title: 'Missions dates Bloquées',
        link: '/pages/missions/blocker',
      },

      {
        title: 'Missions Confirmées',
        link: '/pages/missions/confirmer',
      },
      {
        title: 'Missions En cours',
        link: '/pages/missions/en cours',
      },

      {
        title: 'Missions Realisées',
        link: '/pages/missions/realiser',
      },

      {
        title: 'Missions Annulées',
        link: '/pages/missions/annuler',
      },
    ],
  },

  {
    title: 'Gestion d\'offres d\'emploi',
    icon: 'layout-outline',
    children: [
      {
        title: 'ajout offre d\'emploi',
        link: '/pages/jobs/new',
      },
      {
        title: ' list d\'offres d\'emploi',
        link: '/pages/jobs/all',
      },
    ],
  },

  {
    title: 'Documentheque',
    icon: 'layout-outline',
    children: [
      {
        title: 'Nouveau document',
        link: '/pages/documents/new',
      },
      {
        title: 'tous les Documents',
        link: '/pages/documents/all',
      },
    ],
  },

  {
    title: 'gestion des competences',
    icon: 'layout-outline',
    children: [
      {
        title: 'ajout d\'une competence',
        link: '/pages/skills/new',
      },
      {
        title: 'Liste des competences',
        link: '/pages/skills/all',
      },
    ],
  },

  {
    title: 'gestion des certifications',
    icon: 'layout-outline',
    children: [
      {
        title: 'ajout d\'une certification',
        link: '/pages/certifs/new',
      },
      {
        title: 'Liste des certifications',
        link: '/pages/certifs/all',
      },
    ],
  },

  {
    title: 'gestion questionnaires',
    icon: 'layout-outline',
    children: [
      {
        title: 'quiz',
        link: '/pages/quiz/new',
      },
      {
        title: 'Liste quiz',
        link: '/pages/quiz/all',
      },
    ],
  },
];

export const MENU_ITEMS_EMPLOYEE: NbMenuItem[] = [
  {
    title: 'Acceuil',
    icon: 'home-outline',
    link: '/pages/iot-dashboard',
    home: true,
  },

  {
    title: 'Employee Freelance Provider',
    group: true,
  },
  {
    title: 'Gestion mes missions',
    icon: 'layout-outline',
    children: [
      {
        title: 'Tous mes missions',
        link: '/pages/missions/all',
      },
      {
        title: 'missions Libres',
        link: '/pages/missions/libre',
      },
      {
        title: 'missions En option',
        link: '/pages/missions/en option',
      },
      {
        title: 'missions dates Bloquées',
        link: '/pages/missions/blocker',
      },

      {
        title: 'missions Confirmées',
        link: '/pages/missions/confirmer',
      },
      {
        title: 'missions En cours',
        link: '/pages/missions/en cours',
      },

      {
        title: 'missions Realisées',
        link: '/pages/missions/realiser',
      },

      {
        title: 'missions Annulées',
        link: '/pages/missions/annuler',
      },
    ],
  },
  {
    title: 'Gestion mes Conges',
    icon: 'layout-outline',
    children: [
      {
        title: 'Ajout Conjes',
        link: '/pages/vacations/new',
      },
      {
        title: 'Tous',
        link: '/pages/vacations/all',
      },
      {
        title: 'Demandes',
        link: '/pages/vacations/en attente',
      },
      {
        title: 'Acceptee',
        link: '/pages/vacations/acceptee',
      },
      {
        title: 'Refused',
        link: '/pages/vacations/refusee',
      },
    ],
  },

  {
    title: 'Mes Formations & Experiences',
    icon: 'layout-outline',
    children: [
      {
        title: 'Ajout formation & experience',
        link: '/pages/formations/new',
      },
      {
        title: 'Tous',
        link: '/pages/formations/all',
      },
      {
        title: 'En attentes',
        link: '/pages/formations/non approuvee',
      },
      {
        title: 'Approuvees',
        link: '/pages/formations/approuvee',
      },
      {
        title: 'Refusees',
        link: '/pages/formations/REFUSEE',
      },
    ],
  },
];
export const MENU_ITEMS_COMMERCIAL: NbMenuItem[] = [
  {
    title: 'Acceuil',
    icon: 'home-outline',
    link: '/pages/iot-dashboard',
    home: true,
  },
  {
    title: 'Commercial Freelance Provider',
    group: true,
  },
  {
    title: 'Gestion mes Conges',
    icon: 'layout-outline',
    children: [
      {
        title: 'Ajout Conjes',
        link: '/pages/vacations/new',
      },
      {
        title: 'Tous',
        link: '/pages/vacations/all',
      },
      {
        title: 'Demandes',
        link: '/pages/vacations/en attente',
      },
      {
        title: 'Acceptee',
        link: '/pages/vacations/acceptee',
      },
      {
        title: 'Refused',
        link: '/pages/vacations/refusee',
      },
    ],
  },

  {
    title: 'Gestion prospection',
    icon: 'layout-outline',
    children: [
      {
        title: 'cree prospect',
        link: '/pages/prospections/new',
      },
      {
        title: 'tous les prospects',
        link: '/pages/documents/all',
      },
    ],
  },

  {
    title: 'Gestion mes offres missions',
    icon: 'layout-outline',
    children: [
      {
        title: 'Creation d\'une mission',
        link: '/pages/missions/new',
      },
      {
        title: 'Tous mes missions',
        link: '/pages/missions/all',
      },
      {
        title: 'Missions Libres',
        link: '/pages/missions/libre',
      },
      {
        title: 'Missions En option',
        link: '/pages/missions/en option',
      },
      {
        title: 'Missions dates Bloquées',
        link: '/pages/missions/blocker',
      },

      {
        title: 'Missions Confirmées',
        link: '/pages/missions/confirmer',
      },
      {
        title: 'Missions En cours',
        link: '/pages/missions/en cours',
      },

      {
        title: 'Missions Realisées',
        link: '/pages/missions/realiser',
      },

      {
        title: 'Missions Annulées',
        link: '/pages/missions/annuler',
      },
    ],
  },

  {
    title: 'Mes Formations & Experiences',
    icon: 'layout-outline',
    children: [
      {
        title: 'Ajout formation & experience',
        link: '/pages/formations/new',
      },
      {
        title: 'Tous',
        link: '/pages/formations/all',
      },
      {
        title: 'En attente',
        link: '/pages/formations/non approuvee',
      },
      {
        title: 'Acceptee',
        link: '/pages/formations/approuvee',
      },
      {
        title: 'Refused',
        link: '/pages/formations/REFUSEE',
      },
    ],
  },
];

export const MENU_ITEMS_OPERATIONAL: NbMenuItem[] = [
  {
    title: 'Acceuil',
    icon: 'home-outline',
    link: '/pages/iot-dashboard',
    home: true,
  },
  {
    title: 'Commercial Freelance Provider',
    group: true,
  },
  {
    title: 'Gestion mes Conges',
    icon: 'layout-outline',
    children: [
      {
        title: 'Ajout Conjes',
        link: '/pages/vacations/new',
      },
      {
        title: 'Tous',
        link: '/pages/vacations/all',
      },
      {
        title: 'Demandes',
        link: '/pages/vacations/en attente',
      },
      {
        title: 'Acceptee',
        link: '/pages/vacations/acceptee',
      },
      {
        title: 'Refused',
        link: '/pages/vacations/refusee',
      },
    ],
  },

  {
    title: 'Gestion des missions',
    icon: 'layout-outline',
    children: [
      {
        title: 'Creation d\'une mission',
        link: '/pages/missions/new',
      },
      {
        title: 'Tous les missions',
        link: '/pages/missions/all',
      },
      {
        title: 'Missions Libres',
        link: '/pages/missions/libre',
      },
      {
        title: 'Missions En option',
        link: '/pages/missions/en option',
      },
      {
        title: 'Missions dates Bloquées',
        link: '/pages/missions/blocker',
      },
    ],
  },

  {
    title: 'Gestion planning missions',
    icon: 'layout-outline',
    children: [
      {
        title: 'Missions Confirmées',
        link: '/pages/missions/confirmer',
      },
      {
        title: 'Missions En cours',
        link: '/pages/missions/en cours',
      },

      {
        title: 'Missions Realisées',
        link: '/pages/missions/realiser',
      },

      {
        title: 'Missions Annulées',
        link: '/pages/missions/annuler',
      },
    ],
  },

  {
    title: 'Mes Formations & Experiences',
    icon: 'layout-outline',
    children: [
      {
        title: 'Ajout formation & experience',
        link: '/pages/formations/new',
      },
      {
        title: 'Tous',
        link: '/pages/formations/all',
      },
      {
        title: 'En attente',
        link: '/pages/formations/non approuvee',
      },
      {
        title: 'Acceptee',
        link: '/pages/formations/approuvee',
      },
      {
        title: 'Refused',
        link: '/pages/formations/REFUSEE',
      },
    ],
  },
];

export const MENU_ITEMS_PROVIDER: NbMenuItem[] = [
  {
    title: 'Acceuil',
    icon: 'home-outline',
    link: '/pages/iot-dashboard',
    home: true,
  },
  {
    title: 'Fournisseur Freelance Providerp',
    group: true,
  },

  {
    title: 'Gestion mes missions',
    icon: 'layout-outline',
    children: [
      {
        title: 'Tous mes missions',
        link: '/pages/missions/all',
      },
      {
        title: 'Mes missions Libres',
        link: '/pages/missions/libre',
      },
      {
        title: 'Mes missions En option',
        link: '/pages/missions/en option',
      },
      {
        title: 'missions dates Bloquées',
        link: '/pages/missions/blocker',
      },

      {
        title: 'Mes missions Confirmées',
        link: '/pages/missions/confirmer',
      },
      {
        title: 'Mes missions En cours',
        link: '/pages/missions/en cours',
      },

      {
        title: 'Mes missions Realisées',
        link: '/pages/missions/realiser',
      },

      {
        title: 'Mes missions Annulées',
        link: '/pages/missions/annuler',
      },
    ],
  },
  {
    title: 'Mes Formations & Experiences',
    icon: 'layout-outline',
    children: [
      {
        title: 'Ajout formation & experience & projets',
        link: '/pages/formations/new',
      },
      {
        title: 'Tous',
        link: '/pages/formations/all',
      },
      {
        title: 'En attente',
        link: '/pages/formations/non approuvee',
      },
      {
        title: 'Approuvee',
        link: '/pages/formations/approuvee',
      },
      {
        title: 'Refusee',
        link: '/pages/formations/REFUSEE',
      },
    ],
  },
];
