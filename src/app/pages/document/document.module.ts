import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NbCardModule, NbDatepickerModule, NbDialogModule } from '@nebular/theme';
import { SharedModule } from 'app/shared/shared.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgxSelectModule } from 'ngx-select-ex';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DocumentCreateComponent } from './document-create/document-create.component';
import { DocumentDetailComponent } from './document-detail/document-detail.component';
import { DocumentListComponent } from './document-list/document-list.component';





const routes: Routes = [
    {
      path: "new",
      component: DocumentCreateComponent,
    },
    {
      path: "detail/:id",
      component: DocumentDetailComponent,
    },
    {
      path: "all",
      component: DocumentListComponent,
    },
  ];
  @NgModule({
    declarations: [
        DocumentCreateComponent,
        DocumentListComponent,
      DocumentDetailComponent,
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
  export class DocumentModule {}
  