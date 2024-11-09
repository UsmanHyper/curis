import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ModalModule, BsModalService } from "ngx-bootstrap/modal";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { adminService } from './admin.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { FlatpickrModule } from 'angularx-flatpickr';
import { NgxMaskModule } from 'ngx-mask';
import { ChangePasswordComponent } from 'src/app/shared/change-password/change-password.component';
import { FooterComponent } from 'src/app/shared/footer/footer.component';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { PaginationComponent } from 'src/app/shared/pagination/pagination.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LovManagementComponent } from './lov-management/lov-management.component';
import { PatientsInformationComponent } from './patients-information/patients-information.component';
import { ProviderInformationComponent } from './provider-information/provider-information.component';
import { AppointmentsInformationComponent } from './appointments-information/appointments-information.component';
import { ReportingDashboardComponent } from './reporting-dashboard/reporting-dashboard.component';
import { LineChartComponent } from 'src/app/shared/line-chart/line-chart.component';



@NgModule({
  declarations: [
    AdminDashboardComponent,
    LovManagementComponent,
    PatientsInformationComponent,
    ProviderInformationComponent,
    AppointmentsInformationComponent,
    ReportingDashboardComponent,

  ],
  providers: [adminService, BsModalService],
  imports: [
    // SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    HeaderComponent,
    FooterComponent,
    ChangePasswordComponent,
    PaginationComponent,
    ModalModule.forRoot(),
    FlatpickrModule,
    NgxMaskModule.forRoot(),
    SharedModule,
    LineChartComponent
    
  ]
})
export class AdminModuleModule { }
