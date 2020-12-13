import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NbDialogModule, NbToastrModule } from "@nebular/theme";
import { UserProfileComponent } from "./components/user-profile/user-profile.component";
import { SkillPreviewComponent } from "./components/skill-preview/skill-preview.component";
import { SkillFilterComponent } from "./components/skill-filter/skill-filter.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CalendarModule, DateAdapter } from "angular-calendar";
import { adapterFactory } from "angular-calendar/date-adapters/date-fns";
import { CalendarMonthComponent } from "./components/calendar-month/calendar-month.component";

@NgModule({
  declarations: [
    UserProfileComponent,
    SkillPreviewComponent,
    SkillFilterComponent,
    CalendarMonthComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    NbDialogModule.forRoot(),
    NbToastrModule.forRoot(),
  ],
  exports: [UserProfileComponent, CalendarMonthComponent],
})
export class SharedModule {}
