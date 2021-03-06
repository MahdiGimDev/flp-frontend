import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { NbCardModule, NbDatepickerModule } from "@nebular/theme";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxSelectModule } from "ngx-select-ex";
import { ThemeModule } from "../../@theme/theme.module";
import { SharedModule } from "../../shared/shared.module";
import { QuizCreateComponent } from "./quiz-create/quiz-create.component";
import { QuizListComponent } from "./quiz-list/quiz-list.component";
import { QuizUpdateComponent } from "./quiz-update/quiz-update.component";
import { QuizQuestionComponentComponent } from "./components/quiz-question-component/quiz-question-component.component";
import { SessionListComponent } from './session-list/session-list.component';

const routes: Routes = [
 
  {
    path: "all",
    component: QuizListComponent,
  },
  {
    path: "new",
    component: QuizCreateComponent,
  },
  {
    path: "edit/:id",
    component: QuizCreateComponent,
  },
  {
    path: "session",
    component: SessionListComponent,
  },
];

@NgModule({
  declarations: [
    QuizListComponent,
    QuizCreateComponent,
    QuizUpdateComponent,
    QuizQuestionComponentComponent,
    SessionListComponent,
  ],
  imports: [
    CommonModule,
    ThemeModule,
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
export class QuizzModule {}
