import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { NbCardModule, NbDatepickerModule } from "@nebular/theme";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { NgxSelectModule } from "ngx-select-ex";
import { NgxSpinnerModule } from "ngx-spinner";
import { JobsCreateComponent } from './jobs-create/jobs-create.component';
import { JobsDetailComponent } from './jobs-detail/jobs-detail.component';
import { JobsListComponent } from './jobs-list/jobs-list.component';


const routes: Routes = [
  {
    path: "new",
    component: JobsCreateComponent,
  },
  {
    path: "detail/:id",
    component: JobsDetailComponent,
  },
  {
    path: "all",
    component: JobsListComponent,
  },
];
@NgModule({
  declarations: [
    JobsCreateComponent,JobsDetailComponent,JobsListComponent],
  imports: [
    CommonModule,
    NgxSpinnerModule,
    RouterModule.forChild(routes),
    FormsModule,
    NbCardModule,
    Ng2SmartTableModule,
    ReactiveFormsModule,
    NgxSelectModule,
    NbDatepickerModule,
  ],
})
export class JobsModule {}
