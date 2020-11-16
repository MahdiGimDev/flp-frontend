import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { NbDialogModule, NbToastrModule } from "@nebular/theme";
import { UserProfileComponent } from "./components/user-profile/user-profile.component";
@NgModule({
  declarations: [UserProfileComponent],
  imports: [CommonModule, NbDialogModule.forRoot(), NbToastrModule.forRoot()],
  exports: [UserProfileComponent],
})
export class SharedModule {}
