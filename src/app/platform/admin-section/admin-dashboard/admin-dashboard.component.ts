import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { providerService } from '../../provider-section/provider.service';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  isSelectedTabValue: any;
  enableDashboard = true;
  enableProviderInfo = false;
  enablePatientInfo = false;
  enableChangePasswordTab = false;
  enableLOV = false;
  enableAppointment = false

  private isSelectedTabSubscription: Subscription | any;


  constructor(private providerService: providerService) {

  }
  ngOnInit() {
    this.goToDashboard();
    this.isSelectedTabSubscription = this.providerService.isSelectedTab.subscribe((value: any) => {
      this.openComponentViaTabSelection(value);
    });
  }

  openComponentViaTabSelection(tabValue: any) {
    console.log("openComponentViaTabSelection", tabValue);
    switch (tabValue) {
      case "Dashboard":
        this.goToDashboard()
        break;

      case "Provider Information":
        this.goToProviderInfo()
        break;

      case "Patient Information":
        this.goToPatient()
        break;

      case "LOV Management":
        this.goToLOV()
        break;

      case "Appointment Governance":
        this.goToAppointment()
        break;


      case "Change Password":
        this.goToChangePassword()
        break;


    }
  }

  goToDashboard() {
    this.enableDashboard = true;
    this.enableProviderInfo = false;
    this.enablePatientInfo = false;
    this.enableLOV = false;
    this.enableAppointment = false;
    this.enableChangePasswordTab = false;
  }


  goToProviderInfo() {
    this.enableProviderInfo = true;
    this.enablePatientInfo = false;
    this.enableLOV = false;
    this.enableDashboard = false;
    this.enableAppointment = false;
    this.enableChangePasswordTab = false;
  }
  goToPatient() {
    this.enableProviderInfo = false;
    this.enablePatientInfo = true;
    this.enableLOV = false;
    this.enableDashboard = false;
    this.enableAppointment = false;
    this.enableChangePasswordTab = false;
  }
  goToLOV() {
    this.enableProviderInfo = false;
    this.enablePatientInfo = false;
    this.enableLOV = true;
    this.enableDashboard = false;
    this.enableAppointment = false;
    this.enableChangePasswordTab = false;
  }

  goToAppointment() {
    this.enableProviderInfo = false;
    this.enablePatientInfo = false;
    this.enableLOV = false;
    this.enableDashboard = false;
    this.enableAppointment = true;

    this.enableChangePasswordTab = false;
  }
  goToChangePassword() {
    this.enableProviderInfo = false;
    this.enablePatientInfo = false;
    this.enableLOV = false;
    this.enableDashboard = false;
    this.enableAppointment = false;

    this.enableChangePasswordTab = true;

  }


}
