import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { ProviderDashboardComponent } from './provider-dashboard/provider-dashboard.component';
// import { ProfileComponent } from './profile/profile.component';
// import { LocationComponent } from './location/location.component';
// import { RatesComponent } from './rates/rates.component';
// import { WorkingHoursComponent } from './working-hours/working-hours.component';
// import { AccountComponent } from './account/account.component';
// import { ModalModule, BsModalService } from "ngx-bootstrap/modal";
// import { ProviderSchedularComponent } from './provider-schedular/provider-schedular.component';
// import { NgSelectModule } from '@ng-select/ng-select';
// import { MatIconModule } from '@angular/material/icon';
// import { MatSelectModule } from '@angular/material/select';
// import { MatTabsModule } from '@angular/material/tabs';
// import { FullCalendarModule } from '@fullcalendar/angular';
// import { CalanderComponent } from './calander/calander.component';
// import { AppointmentSchedularModalComponent } from './appointment-schedular-modal/appointment-schedular-modal.component';
// import { AddLocationComponent } from './location/add-location/add-location.component';
// import { AddRatesComponent } from './rates/add-rates/add-rates.component';
// import { AddHoursComponent } from './working-hours/add-hours/add-hours.component';
// import { SharedModule } from '../shared/shared.module';
// import { AppointmentModalComponent } from './calander/appointment-modal/appointment-modal.component';
// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { RestrictedTimeDirective } from './calander/appointment-modal/time.directive';
// import { ViewAppointmenComponent } from '../shared/view-appointment/view-appointment.component';
import { FlatpickrModule } from 'angularx-flatpickr';
import { AppointmentModalComponent } from './calender/appointment-modal/appointment-modal.component';
import { CalenderComponent } from './calender/calender.component';
import { LocationComponent } from './location/location.component';
import { AddLocationComponent } from './location/add-location/add-location.component';
import { ProviderDashboardComponent } from './provider-dashboard/provider-dashboard.component';
import { ProviderProfileComponent } from './provider-profile/provider-profile.component';
import { RatesComponent } from './rates/rates.component';
import { AddRatesComponent } from './rates/add-rates/add-rates.component';
import { WorkingHoursComponent } from './working-hours/working-hours.component';
import { AddHoursComponent } from './working-hours/add-hours/add-hours.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { NavBarComponent } from 'src/app/shared/nav-bar/nav-bar.component';
import { providerService } from './provider.service';



@NgModule({
  declarations: [
    ProviderDashboardComponent,
    AppointmentModalComponent,
    CalenderComponent,
    LocationComponent,
    AddLocationComponent,
    ProviderProfileComponent,
    RatesComponent,
    AddRatesComponent,
    WorkingHoursComponent,
    AddHoursComponent,
    NavBarComponent,
  ],
  providers: [providerService,],
  // providers: [providerService, BsModalService],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule,
  ]
})
export class ProviderModuleModule { }
