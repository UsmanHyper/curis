import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { providerService } from '../provider.service';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { FooterComponent } from 'src/app/shared/footer/footer.component';


@Component({
  selector: 'app-provider-dashboard',
  templateUrl: './provider-dashboard.component.html',
  styleUrls: ['./provider-dashboard.component.scss'],
  // imports: []
})
export class ProviderDashboardComponent implements OnInit {

  isSelectedTabValue: any;
  enableSchedular = false;
  enableProfileTab = false;
  enableChangePasswordTab = false;
  enableLocationTab = false;
  enableRatesTab = false;
  enableWorkingHoursTab = false;
  enableAccountTab = false;

  private isSelectedTabSubscription: Subscription | any;


  constructor(private providerService: providerService) {

  }

  ngOnInit() {
    this.goToProfile();
    this.isSelectedTabSubscription = this.providerService.isSelectedTab.subscribe((value:any) => {
      this.openComponentViaTabSelection(value);
    });
  }

  openComponentViaTabSelection(tabValue: any) {
    switch (tabValue) {
      case "Profile":
        this.goToProfile()
        break;

      case "Schedular":
        this.goToSchedular()
        break;

      case "Change Password":
        this.goToChangePassword()
        break;

      case "Locations":
        this.goToLocation()
        break;

      case "Rates":
        this.goToRates()
        break;

      case "Working Hours":
        this.goToWorkingHours()
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
  }

  goToChangePassword() {
    this.enableProfileTab = false;
    this.enableChangePasswordTab = true;
    this.enableLocationTab = false;
    this.enableRatesTab = false;
    this.enableSchedular = false;
    this.enableWorkingHoursTab = false;
    this.enableAccountTab = false;
  }
  goToLocation() {
    this.enableProfileTab = false;
    this.enableChangePasswordTab = false;
    this.enableLocationTab = true;
    this.enableSchedular = false;
    this.enableRatesTab = false;
    this.enableWorkingHoursTab = false;
    this.enableAccountTab = false;
  }
  goToRates() {
    this.enableProfileTab = false;
    this.enableChangePasswordTab = false;
    this.enableLocationTab = false;
    this.enableRatesTab = true;
    this.enableSchedular = false;
    this.enableWorkingHoursTab = false;
    this.enableAccountTab = false;
  }
  goToWorkingHours() {
    this.enableProfileTab = false;
    this.enableChangePasswordTab = false;
    this.enableLocationTab = false;
    this.enableRatesTab = false;
    this.enableSchedular = false;
    this.enableWorkingHoursTab = true;
    this.enableAccountTab = false;
  }
  goToAccounts() {
    this.enableProfileTab = false;
    this.enableChangePasswordTab = false;
    this.enableLocationTab = false;
    this.enableRatesTab = false;
    this.enableSchedular = false;
    this.enableWorkingHoursTab = false;
    this.enableAccountTab = true;
  }
  goToProfile() {
    this.enableProfileTab = true;
    this.enableChangePasswordTab = false;
    this.enableLocationTab = false;
    this.enableRatesTab = false;
    this.enableSchedular = false;
    this.enableWorkingHoursTab = false;
    this.enableAccountTab = false;
  }

}


