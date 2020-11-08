import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { NbCardModule, NbDatepickerModule } from "@nebular/theme";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { NgxSpinnerModule } from "ngx-spinner";
import { CreateMissionComponent } from "./create-mission/create-mission.component";


import { MissionListComponent } from "./mission-list/mission-list.component";

const routes: Routes = [
  {
    path: "new",
    component: CreateMissionComponent,
  },
  {
    path: "all",
    component: MissionListComponent,
  },
];
@NgModule({
  declarations: [CreateMissionComponent, MissionListComponent],
  imports: [
    CommonModule,
    NgxSpinnerModule,
    RouterModule.forChild(routes),
    FormsModule,
    NbCardModule,
    Ng2SmartTableModule,
    ReactiveFormsModule,
    NbDatepickerModule
  ],
})
export class MissionsModule {}
