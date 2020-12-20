import { NgModule } from '@angular/core';
import { NbCardModule, NbMenuModule } from '@nebular/theme';
import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { DoughnutChartComponent } from './chartFolder/doughnut-chart/doughnut-chart.component';
import { CreateProspectComponent } from './prospection/create-prospect/create-prospect.component';
import { ListProspectComponent } from './prospection/list-prospect/list-prospect.component';
import { DetailProspectComponent } from './prospection/detail-prospect/detail-prospect.component';


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
