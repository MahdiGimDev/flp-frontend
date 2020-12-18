import { NbMenuItem } from "@nebular/theme";
import { icon } from "leaflet";
import { title } from "process";

export const MENU_ITEMS_ADMIN: NbMenuItem[] = [
  {
    title: "E-commerce",
    icon: "shopping-cart-outline",
    link: "/pages/dashboard",
    home: true,
  },
  {
    title: "IoT Dashboard",
    icon: "home-outline",
    link: "/pages/iot-dashboard",
  },
  {
    title: "Admin FLP",
    group: true,
  },
  {
    title: "Management Users ",
    icon: "layout-outline",
    children: [
      {
        title: "Add User",
        link: "/pages/users/new",
      },
      {
        title: "All",
        link: "/pages/users/ALL",
      },
      {
        title: "RH",
        link: "/pages/users/Rh",
      },
      {
        title: "Employee",
        link: "/pages/users/Employee",
      },
      {
        title: "Provider",
        link: "/pages/users/Provider",
      },
      {
        title: "Operational",
        link: "/pages/users/Operational",
      },
      {
        title: "Commercial",
        link: "/pages/users/Commercial",
      },
      {
        title: "Clients",
        link: "/pages/users/Client",
      },
    ],
  },
  {
    title: "Management de Conjes",
    icon: "layout-outline",
    children: [
      {
        title: "Tous",
        link: "/pages/vacations/all",
      },
      {
        title: "Demandes",
        link: "/pages/vacations/pending",
      },
      {
        title: "Acceptee",
        link: "/pages/vacations/accepted",
      },
      {
        title: "Refused",
        link: "/pages/vacations/refused",
      },
    ],
  },
  {
    title: "Gestion formation collaborateur",
    icon: "layout-outline",
    children: [
      {
        title: "Tous",
        link: "/pages/formations/all",
      },
      {
        title: "Demandes",
        link: "/pages/formations/pending",
      },
      {
        title: "Acceptee",
        link: "/pages/formations/accepted",
      },
      {
        title: "Refused",
        link: "/pages/formations/refused",
      },
    ],
  },


  {
    title: "Gestion experience collaborateur",
    icon: "layout-outline",
    children: [
      {
        title: "Tous",
        link: "/pages/experiences/all",
      },
      {
        title: "Demandes",
        link: "/pages/experiences/pending",
      },
      {
        title: "Acceptee",
        link: "/pages/experiences/accepted",
      },
      {
        title: "Refused",
        link: "/pages/experiences/refused",
      },
    ],
  },

  {
    title: "Users Role Management",
    icon: "layout-outline",
    children: [
      {
        title: "ajout d'un role",
        link: "/pages/missions/new",
      },
      {
        title: "la liste des roles",
        link: "/pages/missions/all",
      },
    ],
  },



  {
    title: "Gestion des offres missions",
    icon: "layout-outline",
    children: [
      {
        title: "Add new mission",
        link: "/pages/missions/new",
      },
      {
        title: " All mission",
        link: "/pages/missions/all",
      },
    ],
  },

  {
    title: "Gestion d'offres d'emploi",
    icon: "layout-outline",
    children: [
      {
        title: "ajout offre d'emploi",
        link: "/pages/jobs/new",
      },
      {
        title: " list d'offres d'emploi",
        link: "/pages/jobs/all",
      },
    ],
  },

  {
    title: "Gestion Document",
    icon: "layout-outline",
    children: [
      {
        title: "Tous",
        link: "/pages/documents/new",
      },
      {
        title: "Demandes",
        link: "/pages/documents/all",
      },
     
    ],
  },

  {
    title: "gestion des competences",
    icon: "layout-outline",
    children: [
      {
        title: "ajout d'une competence",
        link: "/pages/skills/new",
      },
      {
        title: "Liste des competences",
        link: "/pages/skills/all",
      },
    ],
  },


  {
    title: "gestion des certifications",
    icon: "layout-outline",
    children: [
      {
        title: "ajout d'une certification",
        link: "/pages/certifs/new",
      },
      {
        title: "Liste des certifications",
        link: "/pages/certifs/all",
      },
    ],
  },  

  {
    title: "gestion questionnaires",
    icon: "layout-outline",
    children: [
      {
        title: "quiz",
        link: "/pages/quiz/new",
      },
      {
        title: "Liste quiz",
        link: "/pages/quiz/all",
      },
    ],
  },

  {
    title: "FEATURES",
    group: true,
  },
  {
    title: "Layout",
    icon: "layout-outline",
    children: [
      {
        title: "Stepper",
        link: "/pages/layout/stepper",
      },
      {
        title: "List",
        link: "/pages/layout/list",
      },
      {
        title: "Infinite List",
        link: "/pages/layout/infinite-list",
      },
      {
        title: "Accordion",
        link: "/pages/layout/accordion",
      },
      {
        title: "Tabs",
        pathMatch: "prefix",
        link: "/pages/layout/tabs",
      },
    ],
  },
  {
    title: "Forms",
    icon: "edit-2-outline",
    children: [
      {
        title: "Form Inputs",
        link: "/pages/forms/inputs",
      },
      {
        title: "Form Layouts",
        link: "/pages/forms/layouts",
      },
      {
        title: "Buttons",
        link: "/pages/forms/buttons",
      },
      {
        title: "Datepicker",
        link: "/pages/forms/datepicker",
      },
    ],
  },
  {
    title: "UI Features",
    icon: "keypad-outline",
    link: "/pages/ui-features",
    children: [
      {
        title: "Grid",
        link: "/pages/ui-features/grid",
      },
      {
        title: "Icons",
        link: "/pages/ui-features/icons",
      },
      {
        title: "Typography",
        link: "/pages/ui-features/typography",
      },
      {
        title: "Animated Searches",
        link: "/pages/ui-features/search-fields",
      },
    ],
  },
  {
    title: "Modal & Overlays",
    icon: "browser-outline",
    children: [
      {
        title: "Dialog",
        link: "/pages/modal-overlays/dialog",
      },
      {
        title: "Window",
        link: "/pages/modal-overlays/window",
      },
      {
        title: "Popover",
        link: "/pages/modal-overlays/popover",
      },
      {
        title: "Toastr",
        link: "/pages/modal-overlays/toastr",
      },
      {
        title: "Tooltip",
        link: "/pages/modal-overlays/tooltip",
      },
    ],
  },
  {
    title: "Extra Components",
    icon: "message-circle-outline",
    children: [
      {
        title: "Calendar",
        link: "/pages/extra-components/calendar",
      },
      {
        title: "Progress Bar",
        link: "/pages/extra-components/progress-bar",
      },
      {
        title: "Spinner",
        link: "/pages/extra-components/spinner",
      },
      {
        title: "Alert",
        link: "/pages/extra-components/alert",
      },
      {
        title: "Calendar Kit",
        link: "/pages/extra-components/calendar-kit",
      },
      {
        title: "Chat",
        link: "/pages/extra-components/chat",
      },
    ],
  },
  {
    title: "Maps",
    icon: "map-outline",
    children: [
      {
        title: "Google Maps",
        link: "/pages/maps/gmaps",
      },
      {
        title: "Leaflet Maps",
        link: "/pages/maps/leaflet",
      },
      {
        title: "Bubble Maps",
        link: "/pages/maps/bubble",
      },
      {
        title: "Search Maps",
        link: "/pages/maps/searchmap",
      },
    ],
  },
  {
    title: "Charts",
    icon: "pie-chart-outline",
    children: [
      {
        title: "Echarts",
        link: "/pages/charts/echarts",
      },
      {
        title: "Charts.js",
        link: "/pages/charts/chartjs",
      },
      {
        title: "D3",
        link: "/pages/charts/d3",
      },
    ],
  },
  {
    title: "Editors",
    icon: "text-outline",
    children: [
      {
        title: "TinyMCE",
        link: "/pages/editors/tinymce",
      },
      {
        title: "CKEditor",
        link: "/pages/editors/ckeditor",
      },
    ],
  },
  {
    title: " & Data",
    icon: "grid-outline",
    children: [
      {
        title: "Smart Table",
        link: "/pages//smart-table",
      },
      {
        title: "Tree Grid",
        link: "/pages//tree-grid",
      },
    ],
  },
  {
    title: "Miscellaneous",
    icon: "shuffle-2-outline",
    children: [
      {
        title: "404",
        link: "/pages/miscellaneous/404",
      },
    ],
  },
  {
    title: "Auth",
    icon: "lock-outline",
    children: [
      {
        title: "Login",
        link: "/auth/login",
      },
      {
        title: "Register",
        link: "/auth/register",
      },
      {
        title: "Request Password",
        link: "/auth/request-password",
      },
      {
        title: "Reset Password",
        link: "/auth/reset-password",
      },
    ],
  },
];

export const MENU_ITEMS_CLIENT: NbMenuItem[] = [
  {
    title: "Management of missions",
    icon: "layout-outline",
    children: [
      {
        title: " My mission",
        link: "/pages/missions/all",
      },
    ],
  },
  {
    title: "Management Conges",
    icon: "layout-outline",
    children: [
      {
        title: "Ajout Conjes",
        link: "/pages/vacations/new",
      },
      {
        title: "Tous",
        link: "/pages/vacations/all",
      },
      {
        title: "Demandes",
        link: "/pages/vacations/en attente",
      },
      {
        title: "Acceptee",
        link: "/pages/vacations/acceptee",
      },
      {
        title: "Refused",
        link: "/pages/vacations/refusee",
      },
    ],
  },
  {
    title: "Gestion de mes formations",
    icon: "layout-outline",
    children: [
      {
        title: "Ajout nouvelle formation",
        link: "/pages/formations/new",
      },
      {
        title: "Tous",
        link: "/pages/formations/all",
      },
      {
        title: "Demandes",
        link: "/pages/formations/EN ATTENTE",
      },
      {
        title: "Acceptee",
        link: "/pages/formations/ACCEPTEE",
      },
      {
        title: "Refused",
        link: "/pages/formations/REFUSEE",
      },
    ],
  },

  {
    title: "Gestion mes experiences",
    icon: "layout-outline",
    children: [
      {
        title: "Ajout",
        link: "/pages/experiences/new",
      },
      {
        title: "Tous",
        link: "/pages/experiences/all",
      },
      {
        title: "Demandes",
        link: "/pages/experiences/pending",
      },
      {
        title: "Acceptee",
        link: "/pages/experiences/accepted",
      },
      {
        title: "Refused",
        link: "/pages/experiences/refused",
      },
    ],
  },

 

];
