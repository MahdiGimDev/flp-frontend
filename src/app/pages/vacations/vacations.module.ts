import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { NbCardModule, NbDatepickerModule } from "@nebular/theme";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { NgxSelectModule } from "ngx-select-ex";
import { NgxSpinnerModule } from "ngx-spinner";
import { ThemeModule } from '../../@theme/theme.module';
import { VacationCreateComponent } from "./vacation-create/vacation-create.component";
import { VacationDetailComponent } from "./vacation-detail/vacation-detail.component";
import { VacationListComponent } from "./vacation-list/vacation-list.component";

const routes: Routes = [
  {
    path: "new",
    component: VacationCreateComponent,
  },
  {
    path: ":status",
    component: VacationListComponent,
  },
  {
    path: "detail/:id",
    component: VacationDetailComponent,
  },
];

@NgModule({
  declarations: [
    VacationCreateComponent,
    VacationListComponent,
    VacationDetailComponent,
  ],
  imports: [
    CommonModule,
    NgxSpinnerModule,
    RouterModule.forChild(routes),
    FormsModule,
    NbCardModule,
    Ng2SmartTableModule,
    ThemeModule,
    NgxSelectModule,
    ReactiveFormsModule,
    NbDatepickerModule,
    NgxSpinnerModule,
  ],
})
export class VacationsModule {}
