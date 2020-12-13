import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NbCardModule, NbDatepickerModule } from '@nebular/theme';
import { ThemeModule } from 'app/@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgxSelectModule } from 'ngx-select-ex';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ExperienceCreateComponent } from './experience-create/experience-create.component';
import { ExperienceListComponent } from './experience-list/experience-list.component';


const routes: Routes = [
    {
      path: "new",
      component: ExperienceCreateComponent,
    },
    {
      path: ":status",
      component: ExperienceListComponent,
    },
 
  ];
  
  @NgModule({
    declarations: [
        ExperienceCreateComponent,
        ExperienceListComponent,
      
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
  export class ExperienceModule {}
  
