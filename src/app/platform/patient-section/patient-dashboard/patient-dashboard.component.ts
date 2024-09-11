import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { userService } from 'src/app/services/user.service';
import { providerService } from '../../provider-section/provider.service';

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.scss']
})
export class PatientDashboardComponent implements OnInit {

  isSelectedTabValue: any;

  changePasswordTab: boolean = false;
  profileTab: boolean = false;
  userAppointTab: boolean = false;
  scheduleAppointTab: boolean = false;

  private isSelectedTabSubscription: Subscription | any;


  constructor(private userService: userService, private providerService: providerService) {

  }

  ngOnInit() {
    this.goToProfileTab();
    // this.isSelectedTabSubscription = this.userService.isSelectedTab.subscribe((value) => {
    //   console.log("Selected tab", value);
    //   this.openComponentViaTabSelection(value || "Profile");
    //   // Do something with the emitted value here
    // });

    this.isSelectedTabSubscription = this.providerService.isSelectedTab.subscribe((value: any) => {
      console.log("Selected tab2", value);
      this.openComponentViaTabSelection(value);
    });
  }


  openComponentViaTabSelection(tabValue: any) {
    switch (tabValue) {
      case "Profile":
        this.goToProfileTab()
        break;


      case "Appointments":
        this.goToUserAppointmentTab()
        break;


      case "Scheduled Appointment":
        this.goToScheduleTab()
        break;



      case "Change Password":
        this.goToChangePasswordTab()
        break;
    }
  }

  goToProfileTab() {
    this.changePasswordTab = false;
    this.profileTab = true;
    this.userAppointTab = false;
    this.scheduleAppointTab = false;
  }

  goToUserAppointmentTab() {
    this.changePasswordTab = false;
    this.profileTab = false;
    this.userAppointTab = true;
    this.scheduleAppointTab = false;
  }

  goToScheduleTab() {
    this.changePasswordTab = false;
    this.profileTab = false;
    this.userAppointTab = false;
    this.scheduleAppointTab = true;
  }

  goToChangePasswordTab() {
    this.changePasswordTab = true;
    this.profileTab = false;
    this.userAppointTab = false;
    this.scheduleAppointTab = false;
  }

}


