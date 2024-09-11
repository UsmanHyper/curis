import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientDashboardComponent } from './patient-dashboard/patient-dashboard.component';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';
import { PatientAppointmentsComponent } from './patient-appointments/patient-appointments.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FooterComponent } from 'src/app/shared/footer/footer.component';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { NavBarComponent } from 'src/app/shared/nav-bar/nav-bar.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChangePasswordComponent } from 'src/app/shared/change-password/change-password.component';
import { PaginationComponent } from 'src/app/shared/pagination/pagination.component';
import { ModalModule } from 'ngx-bootstrap/modal';




@NgModule({
  declarations: [
    PatientDashboardComponent,
    PatientProfileComponent,
    PatientAppointmentsComponent,
    // NavBarComponent,


  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HeaderComponent,
    FooterComponent,
    SharedModule,
    ChangePasswordComponent, PaginationComponent, ModalModule.forRoot()


  ]
})
export class PatientModuleModule { }
