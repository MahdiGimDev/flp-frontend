import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { PagesComponent } from "./pages.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ECommerceComponent } from "./e-commerce/e-commerce.component";
import { NotFoundComponent } from "./miscellaneous/not-found/not-found.component";

const routes: Routes = [
  {
    path: "",
    component: PagesComponent,
    children: [
      {
        path: "dashboard",
        component: ECommerceComponent,
      },
      {
        path: "users",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("./users/users.module").then((mod) => mod.UsersModule),
          },
        ],
      },
      {
        path: "certifs",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("./certifications/certif.module").then((mod) => mod.CertifsModule),
          },
        ],
      },

      {
        path: "quiz",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("./quiz/gestion-questionnaires.module").then(
                (mod) => mod.GestionQuestionnairesModule
              ),
          },
        ],
      },
      {
        path: "vacations",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("./vacations/vacations.module").then(
                (mod) => mod.VacationsModule
              ),
          },
        ],
      },


      {
        path: "documents",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("./document/document.module").then(
                (mod) => mod.DocumentModule
              ),
          },
        ],
      },

      {
        path: "prospections",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("./prospection/prospect.module").then(
                (mod) => mod.ProspectsModule
              ),
          },
        ],
      },





      {
        path: "formations",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("./formations/formations.module").then(
                (mod) => mod.FormationsModule
              ),
          },
        ],
      },

      {
        path: "experiences",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("./experiences/experience.module").then(
                (mod) => mod.ExperienceModule
              ),
          },
        ],
      },




      {
        path: "missions",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("./missions/mission.module").then(
                (mod) => mod.MissionsModule
              ),
          },
        ],
      },
      {
        path: "skills",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("./skills/skills.module").then((mod) => mod.SkillsModule),
          },
        ],
      },

      {
        path: "jobs",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("./JobsOffers/job.module").then((mod) => mod.JobsModule),
          },
        ],
      },

      {
        path: "iot-dashboard",
        component: DashboardComponent,
      },
      {
        path: "layout",
        loadChildren: () =>
          import("./layout/layout.module").then((m) => m.LayoutModule),
      },
      {
        path: "forms",
        loadChildren: () =>
          import("./forms/forms.module").then((m) => m.FormsModule),
      },
      {
        path: "ui-features",
        loadChildren: () =>
          import("./ui-features/ui-features.module").then(
            (m) => m.UiFeaturesModule
          ),
      },
      {
        path: "modal-overlays",
        loadChildren: () =>
          import("./modal-overlays/modal-overlays.module").then(
            (m) => m.ModalOverlaysModule
          ),
      },
      {
        path: "extra-components",
        loadChildren: () =>
          import("./extra-components/extra-components.module").then(
            (m) => m.ExtraComponentsModule
          ),
      },
      {
        path: "maps",
        loadChildren: () =>
          import("./maps/maps.module").then((m) => m.MapsModule),
      },
      {
        path: "charts",
        loadChildren: () =>
          import("./charts/charts.module").then((m) => m.ChartsModule),
      },
      {
        path: "editors",
        loadChildren: () =>
          import("./editors/editors.module").then((m) => m.EditorsModule),
      },
      {
        path: "tables",
        loadChildren: () =>
          import("./tables/tables.module").then((m) => m.TablesModule),
      },
      {
        path: "miscellaneous",
        loadChildren: () =>
          import("./miscellaneous/miscellaneous.module").then(
            (m) => m.MiscellaneousModule
          ),
      },
      {
        path: "",
        redirectTo: "dashboard",
        pathMatch: "full",
      },
      {
        path: "**",
        component: NotFoundComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
