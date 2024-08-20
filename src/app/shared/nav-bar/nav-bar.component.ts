import { Component, HostListener } from '@angular/core';
// import { authenticationService } from 'src/app/authentication.service';
// import { providerService } from 'src/app/provider-module/provider.service';
// import { adminService } from 'src/app/admin-module/admin.service';
import providerNavBar from '../../utilities/navBarData/providerNavBar.json';
import patientNavBar from '../../utilities/navBarData/userNavbar.json';
import adminNavBar from '../../utilities/navBarData/adminNavbar.json';
import { providerService } from 'src/app/platform/provider-section/provider.service';
import { authenticationService } from 'src/app/services/authentication.service';
import { adminService } from 'src/app/services/admin.service';
import { userService } from 'src/app/services/user.service';
// import { userService } from 'src/app/user-module/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  isExpanded: boolean = true
  userData: any;
  navBarItems: any;
  selectedNavItem: string | any;
  constructor( public providerService: providerService, public authenticationService: authenticationService , public userService: userService) {
    // constructor(public authenticationservice: authenticationService, public providerService: providerService, public adminService: adminService, public userService: userService) {

  }
  ngOnInit() {
    // this.userData = this.authenticationService.getLoggedInUser();

    // this.getNavigationsByUserType(this.userData.user_Type || 'Provider' );
    this.getNavigationsByUserType('Provider');
  }

  getNavigationsByUserType(userType: String) {
    if (userType == "Provider") {
      this.navBarItems = providerNavBar;
    }
    else if (userType == "Patient") {
      this.navBarItems = patientNavBar;
    }
    else if (userType == "Admin") {
      this.navBarItems = adminNavBar;
    }
    else if (userType == "Lab") {

    }
    else {
      console.log('no logged in');
    }
    console.log(" UserTpe ", this.navBarItems)

    if (this.navBarItems.length > 0) {
      this.checkForIcons(this.navBarItems)
    }
  }

  checkForIcons(item: any) {
    console.log(item)
    let dt = item

    dt.forEach((ele: any) => {
      if (ele.value === "Schedular" || ele.value === "Scheduled Appointment") {
        ele.icon = "calendar_month"
      } else if (ele.value === "Profile" || ele.value === "My Profile") {
        ele.icon = "person"
        this.selectedNavItem = ele.value
      } else if (ele.value === "Change Password") {
        ele.icon = "lock"
      } else if (ele.value === "Locations") {
        ele.icon = "map"
      } else if (ele.value === "Rates") {
        ele.icon = "money"
      } else if (ele.value === "Working Hours") {
        ele.icon = "schedule"
      } else if (ele.value === "Account") {
        ele.icon = "account_circle"
      }
      else if (ele.value === "Reporting Dashboard") {
        ele.icon = "dashboard"
      } else if (ele.value === "Provider Information") {
        ele.icon = "privacy_tip"
        this.selectedNavItem = ele.value
      } else if (ele.value === "Patients Information") {
        ele.icon = "personal_injury"
      } else if (ele.value === "LOV management") {
        ele.icon = "volunteer_activism"
      }
      else if (ele.value === "Appointmet Governence") {
        ele.icon = "beenhere"
      }
      else if (ele.value === "Password management") {
        ele.icon = "password"
      }

      else if (ele.value === "My Appointment") {
        ele.icon = "chair"
      }

      else {
        ele.icon = ""
      }

    });

    this.navBarItems = dt
  }


  getNavbarSelection(value: string) {
    if(!!value){
      this.selectedNavItem = value
    }else{
      value= 'Provider'
    }
    // this.selectedNavItem = value;
    // if (this.userData.user_Type == "Provider") {
      this.providerService.setSelectedTab(value);
    // }
    // else if (this.userData.user_Type == "Admin") {
    //   this.adminService.setSelectedTab(value);
    // } else if (this.userData.user_Type == "Patient") {
    //   this.userService.setSelectedTab(value);
    // } else {
    //   return
    // }
  }


  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    console.log("------------",event)
    this.updateExpansionState();
  }

  toggleExpansion() {
    this.isExpanded = !this.isExpanded;
  }

  private updateExpansionState(): void {
    // You can adjust the breakpoint as needed
    const isSmallScreen = window.innerWidth < 768 || window.innerWidth === 780; // Example breakpoint: 768 pixels

    if (isSmallScreen) {
      this.isExpanded = false;
    }else{
      
      this.isExpanded = true;
    }
  }

}
