import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { providerService } from '../provider.service';



@Component({
  selector: 'app-provider-dashboard',
  templateUrl: './provider-dashboard.component.html',
  styleUrls: ['./provider-dashboard.component.scss'],
  // imports: []
})
export class ProviderDashboardComponent implements OnInit {

  isSelectedTabValue: any;
  enableSchedular = false;
  enableProfileTab = true;
  enableChangePasswordTab = false;
  enableLocationTab = false;
  enableRatesTab = false;
  enableWorkingHoursTab = false;
  enableAccountTab = false;
  enableAppointmentTab = false;

  private isSelectedTabSubscription: Subscription | any;


  constructor(private providerService: providerService) {

  }

  ngOnInit() {
    this.goToProfile();
    this.isSelectedTabSubscription = this.providerService.isSelectedTab.subscribe((value: any) => {
      this.openComponentViaTabSelection(value);
    });
  }

  openComponentViaTabSelection(tabValue: any) {
    console.log("openComponentViaTabSelection", tabValue);
    switch (tabValue) {
      case "Profile":
        this.goToProfile()
        break;

      case "Appointments":
        this.goToAppointment()
        break;

      case "Schedule Time":
        this.goToSchedular()
        break;

      case "Working Hours":
        this.goToWorkingHours()
        break;

      case "Locations":
        this.goToLocation()
        break;

      case "Rates":
        this.goToRates()
        break;

      case "Change Password":
        this.goToChangePassword()
        break;

      case "Account":
        this.goToAccounts()
        break;
    }
  }

  goToSchedular() {
    this.enableSchedular = true;
    this.enableProfileTab = false;
    this.enableChangePasswordTab = false;
    this.enableLocationTab = false;
    this.enableRatesTab = false;
    this.enableWorkingHoursTab = false;
    this.enableAccountTab = false;
    this.enableAppointmentTab = false;
  }

  goToChangePassword() {
    this.enableProfileTab = false;
    this.enableChangePasswordTab = true;
    this.enableLocationTab = false;
    this.enableRatesTab = false;
    this.enableSchedular = false;
    this.enableWorkingHoursTab = false;
    this.enableAccountTab = false;
    this.enableAppointmentTab = false;
  }
  goToLocation() {
    this.enableProfileTab = false;
    this.enableChangePasswordTab = false;
    this.enableLocationTab = true;
    this.enableSchedular = false;
    this.enableRatesTab = false;
    this.enableWorkingHoursTab = false;
    this.enableAccountTab = false;
    this.enableAppointmentTab = false;
  }
  goToRates() {
    this.enableProfileTab = false;
    this.enableChangePasswordTab = false;
    this.enableLocationTab = false;
    this.enableRatesTab = true;
    this.enableSchedular = false;
    this.enableWorkingHoursTab = false;
    this.enableAccountTab = false;
    this.enableAppointmentTab = false;
  }
  goToWorkingHours() {
    this.enableProfileTab = false;
    this.enableChangePasswordTab = false;
    this.enableLocationTab = false;
    this.enableRatesTab = false;
    this.enableSchedular = false;
    this.enableWorkingHoursTab = true;
    this.enableAccountTab = false;
    this.enableAppointmentTab = false;
  }
  goToAccounts() {
    this.enableProfileTab = false;
    this.enableChangePasswordTab = false;
    this.enableLocationTab = false;
    this.enableRatesTab = false;
    this.enableSchedular = false;
    this.enableWorkingHoursTab = false;
    this.enableAccountTab = true;
    this.enableAppointmentTab = false;
  }
  goToProfile() {
    this.enableProfileTab = true;
    this.enableChangePasswordTab = false;
    this.enableLocationTab = false;
    this.enableRatesTab = false;
    this.enableSchedular = false;
    this.enableWorkingHoursTab = false;
    this.enableAccountTab = false;
    this.enableAppointmentTab = false;
  }
  goToAppointment() {
    this.enableProfileTab = false;
    this.enableChangePasswordTab = false;
    this.enableLocationTab = false;
    this.enableRatesTab = false;
    this.enableSchedular = false;
    this.enableWorkingHoursTab = false;
    this.enableAccountTab = false;
    this.enableAppointmentTab = true;
  }

}


