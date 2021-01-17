import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { NbCardModule, NbDatepickerModule, NbDialogModule } from "@nebular/theme";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { NgxSelectModule } from "ngx-select-ex";
import { NgxSpinnerModule } from "ngx-spinner";
import { CreateMissionComponent } from "./create-mission/create-mission.component";

import { MissionConfirmedDetailComponent } from "./mission-confirmed-detail/mission-confirmed-detail.component";

import { MissionListComponent } from "./mission-list/mission-list.component";
import { MissionDetailComponent } from "./mission-detail/mission-detail.component";
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
  {
    path: "new",
    component: CreateMissionComponent,
  },
  {
    path: "detail/:id",
    component: MissionDetailComponent,
  },

  {
    path: "detailConfirmed/:id",
    component: MissionConfirmedDetailComponent,
  },
  /*{
    path: "all",
    component: MissionListComponent,
  },*/
  {
    path: ":status",
    component: MissionListComponent,
  },


];
@NgModule({
  declarations: [
    CreateMissionComponent,
    MissionListComponent,
    MissionConfirmedDetailComponent,
    MissionDetailComponent,
  ],
  imports: [
    CommonModule,
    NgxSpinnerModule,
    RouterModule.forChild(routes),
    NbDialogModule.forChild(),
    FormsModule,
    NbCardModule,
    NgxSelectModule,
    Ng2SmartTableModule,
    ReactiveFormsModule,
    NgxSelectModule,
    NbDatepickerModule,
    SharedModule
  ],
})
export class MissionsModule {}
