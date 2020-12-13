import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NbCardModule, NbDatepickerModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CertifsCreateComponent } from './certif-create/certif-create.component';
import { CertifListComponent } from './certif-list/certif-list.component';



const routes: Routes = [
    {
      path: "new",
      component: CertifsCreateComponent,
    },
    {
      path: "all",
      component: CertifListComponent,
    },
  ];
  
  @NgModule({
    declarations: [CertifsCreateComponent, CertifListComponent],
    imports: [
      CommonModule,
      NgxSpinnerModule,
      RouterModule.forChild(routes),
      FormsModule,
      NbCardModule,
      Ng2SmartTableModule,
      ReactiveFormsModule,
      NbDatepickerModule,
    ],
  })
  export class CertifsModule {}
  