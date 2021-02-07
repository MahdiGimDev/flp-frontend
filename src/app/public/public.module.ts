import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { JobOfferViewComponent } from "./jobs/job-offer-view/job-offer-view.component";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NbCardModule, NbDatepickerModule } from "@nebular/theme";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { NgxSelectModule } from "ngx-select-ex";
import { NgxSpinnerModule } from "ngx-spinner";
import { ThemeModule } from "../@theme/theme.module";
import { SharedModule } from "../shared/shared.module";
import { CountdownModule } from 'ngx-countdown';

import { PublicLayoutComponent } from "./public-layout/public-layout.component";
import { StartQuizSessionComponent } from "./jobs/start-quiz-session/start-quiz-session.component";

const routes: Routes = [
  {
    path: "",
    component: PublicLayoutComponent,
  },
  {
    path: "jobs",
    component: PublicLayoutComponent,
    children: [
      {
        path: ":id",
        component: JobOfferViewComponent,
      },
      {
        path: "quiz/:id",
        component: StartQuizSessionComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [JobOfferViewComponent, StartQuizSessionComponent],
  imports: [
    CommonModule,
    CountdownModule,
    ThemeModule,
    SharedModule,
    NgxSpinnerModule,
    RouterModule.forChild(routes),
    FormsModule,
    NbCardModule,
    Ng2SmartTableModule,
    NgxSelectModule,
    ReactiveFormsModule,
    NbDatepickerModule,
    NgxSpinnerModule,
    SharedModule,
    NbCardModule,
  ],
})
export class PublicModule {}
