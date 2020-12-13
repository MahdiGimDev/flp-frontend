import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NbCardModule, NbDatepickerModule } from '@nebular/theme';
import { ThemeModule } from 'app/@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgxSelectModule } from 'ngx-select-ex';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormationCreateComponent } from './formation-create/formation-create.component';
import { FormationListComponent } from './formation-list/formation-list.component';





const routes: Routes = [
    {
      path: "new",
      component: FormationCreateComponent,
    },
    {
      path: ":status",
      component: FormationListComponent,
    },
 
  ];
  
  @NgModule({
    declarations: [
        FormationCreateComponent,
        FormationListComponent,
      
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
  export class FormationsModule {}
  
