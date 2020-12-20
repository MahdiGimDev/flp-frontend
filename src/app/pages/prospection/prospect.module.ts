import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NbCardModule, NbDatepickerModule, NbDialogModule } from '@nebular/theme';
import { SharedModule } from 'app/shared/shared.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgxSelectModule } from 'ngx-select-ex';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CreateProspectComponent } from './create-prospect/create-prospect.component';
import { DetailProspectComponent } from './detail-prospect/detail-prospect.component';
import { ListProspectComponent } from './list-prospect/list-prospect.component';




const routes: Routes = [
    {
      path: "new",
      component: CreateProspectComponent,
    },
    {
      path: "detail/:id",
      component: DetailProspectComponent,
    },
    {
      path: "all",
      component: ListProspectComponent,
    },
  ];
  @NgModule({
    declarations: [
        CreateProspectComponent,
        DetailProspectComponent,
        ListProspectComponent,
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
  export class ProspectsModule {}
  