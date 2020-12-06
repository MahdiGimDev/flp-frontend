import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NbDialogModule, NbToastrModule } from "@nebular/theme";
import { UserProfileComponent } from "./components/user-profile/user-profile.component";
import { SkillPreviewComponent } from "./components/skill-preview/skill-preview.component";
import { SkillFilterComponent } from "./components/skill-filter/skill-filter.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
@NgModule({
  declarations: [
    UserProfileComponent,
    SkillPreviewComponent,
    SkillFilterComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NbDialogModule.forRoot(),
    NbToastrModule.forRoot(),
  ],
  exports: [UserProfileComponent],
})
export class SharedModule {}
