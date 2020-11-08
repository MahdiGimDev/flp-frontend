import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { NbCardModule, NbDatepickerModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SkillsListComponent } from './skills-list/skills-list.component';
import { SkillsCreateComponent } from './skills/skills.component';



const routes: Routes = [
  {
    path: "new",
    component:  SkillsCreateComponent ,
  },
  {
    path: "all",
    component: SkillsListComponent,
  },
];

@NgModule({
    declarations: [SkillsCreateComponent, SkillsListComponent],
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
  export class SkillsModule {}
  