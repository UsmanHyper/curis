import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
// import { ProviderInformationComponent } from './provider-information/provider-information.component';
// import { PatientsInformationComponent } from './patients-information/patients-information.component';
// import { LovManagementComponent } from './lov-management/lov-management.component';
// import { ReportingDashboardComponent } from './reporting-dashboard/reporting-dashboard.component';
// import { AppointmentsInformationComponent } from './appointments-information/appointments-information.component';
import { ModalModule, BsModalService } from "ngx-bootstrap/modal";
// import { ChangePasswordComponent } from './change-password/change-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { SharedModule } from '../shared/shared.module';
import { adminService } from './admin.service';
// import { ProviderDetailsDescriptionComponent } from './provider-details-description/provider-details-description.component';
// import { PatientViewDetailComponent } from '../shared/patient-view-detail/patient-view-detail.component';
// import { ProviderViewDetailComponent } from '../shared/provider-view-detail/provider-view-detail.component';
// import { ViewSingleAppointmentComponent } from '../shared/view-single-appointment/view-single-appointment.component';
// import { ViewLovChildComponent } from '../shared/view-lov-child/view-lov-child.component';
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
    // ProviderInformationComponent,
    // PatientsInformationComponent,
    // LovManagementComponent,
    // ReportingDashboardComponent,
    // AppointmentsInformationComponent,
    // ChangePasswordComponent,
    // ProviderDetailsDescriptionComponent,
    // PatientViewDetailComponent,
    // ProviderViewDetailComponent,
    // ViewSingleAppointmentComponent,
    // ViewLovChildComponent
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
