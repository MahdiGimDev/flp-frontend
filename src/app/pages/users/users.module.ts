import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserListComponent } from "./user-list/user-list.component";
import { Routes, RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UserDetailComponent } from "./user-detail/user-detail.component";

import { UserCreateComponent } from "./user-create/user-create.component";
import { NbCardModule, NbDatepickerModule } from "@nebular/theme";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxSelectModule } from "ngx-select-ex";
import { CKEditorModule } from "ng2-ckeditor";
import { ThemeModule } from "../../@theme/theme.module";
import { SharedModule } from "../../shared/shared.module";

const routes: Routes = [
  {
    path: "new",
    component: UserCreateComponent,
  },
  {
    path: ":role",
    component: UserListComponent,
  },
  {
    path: "detail/:id",
    component: UserDetailComponent,
  },
];

@NgModule({
  declarations: [UserListComponent, UserDetailComponent, UserCreateComponent],
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
    SharedModule,
    CKEditorModule,
  ],
})
export class UsersModule {}
