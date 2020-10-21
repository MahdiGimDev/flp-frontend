import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserListComponent } from "./user-list/user-list.component";
import { Routes, RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { UserDetailComponent } from "./user-detail/user-detail.component";
import { NgxSpinnerModule } from "ngx-spinner";
import { NbCardModule } from "@nebular/theme";
import { Ng2SmartTableModule } from "ng2-smart-table";

const routes: Routes = [
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
  declarations: [UserListComponent, UserDetailComponent],
  imports: [
    CommonModule,
    NgxSpinnerModule,
    RouterModule.forChild(routes),
    FormsModule,
    NbCardModule,
    Ng2SmartTableModule,
  ],
})
export class UsersModule {}
