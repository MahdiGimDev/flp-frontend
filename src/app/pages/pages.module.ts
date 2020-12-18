import { NgModule } from '@angular/core';
import { NbCardModule, NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CertifsCreateComponent } from './certifications/certif-create/certif-create.component';
import { CertifListComponent } from './certifications/certif-list/certif-list.component';
import { FormationCreateComponent } from './formations/formation-create/formation-create.component';
import { FormationListComponent } from './formations/formation-list/formation-list.component';
import { ExperienceCreateComponent } from './experiences/experience-create/experience-create.component';
import { ExperienceListComponent } from './experiences/experience-list/experience-list.component';
import { DoughnutChartComponent } from './chartFolder/doughnut-chart/doughnut-chart.component';




@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
    NbCardModule,
    Ng2SmartTableModule
  ],
  declarations: [ PagesComponent, DoughnutChartComponent],
})
export class PagesModule {
}
