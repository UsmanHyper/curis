import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FlatpickrModule } from 'angularx-flatpickr';
// import { AppointmentModalComponent } from './calender/appointment-modal/appointment-modal.component';
import { CalenderComponent } from './calender/calender.component';
import { LocationComponent } from './location/location.component';
import { ProviderDashboardComponent } from './provider-dashboard/provider-dashboard.component';
import { ProviderProfileComponent } from './provider-profile/provider-profile.component';
import { RatesComponent } from './rates/rates.component';
import { WorkingHoursComponent } from './working-hours/working-hours.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { NavBarComponent } from 'src/app/shared/nav-bar/nav-bar.component';
import { providerService } from './provider.service';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { FooterComponent } from 'src/app/shared/footer/footer.component';
import { NavTabComponent } from 'src/app/shared/nav-tab/nav-tab.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { ScheduleTimeComponent } from './schedule-time/schedule-time.component';
import { ChangePasswordComponent } from 'src/app/shared/change-password/change-password.component';
import { ProviderAccountComponent } from './provider-account/provider-account.component';
import { PaginationComponent } from 'src/app/shared/pagination/pagination.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CalenderAppointmentModalComponent } from 'src/app/shared/calender-appointment-modal/calender-appointment-modal.component';
import { ProviderLocationModalComponent } from 'src/app/shared/provider-location-modal/provider-location-modal.component';
import { ProviderRatesModalComponent } from 'src/app/shared/provider-rates-modal/provider-rates-modal.component';
import { NgxMaskModule } from 'ngx-mask';



@NgModule({
  declarations: [
    ProviderDashboardComponent,
    CalenderComponent,
    LocationComponent,
    ProviderProfileComponent,
    RatesComponent,
    WorkingHoursComponent,
    NavBarComponent,
    NavTabComponent,
    AppointmentsComponent,
    ScheduleTimeComponent,
    ProviderAccountComponent
  ],
  providers: [],
  // providers: [providerService, BsModalService],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule,
    HeaderComponent, FooterComponent, ChangePasswordComponent, PaginationComponent, ModalModule.forRoot(),
    CalenderAppointmentModalComponent,
    FlatpickrModule,
    ProviderLocationModalComponent, ProviderRatesModalComponent,
    NgxMaskModule.forRoot()

  ]
})
export class ProviderModuleModule { }
