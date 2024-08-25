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
  constructor(public providerService: providerService, public authenticationService: authenticationService, public userService: userService) {
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
      if (ele.value === "Appointments") {
        ele.icon = "bi-bookmark-check"
      } else if (ele.value === "Profile" || ele.value === "My Profile") {
        ele.icon = "bi-person-circle"
        this.selectedNavItem = ele.value
      }
      else if (ele.value === "Change Password") {
        ele.icon = "bi-three-dots"
      }
      else if (ele.value === "Schedule Time") {
        ele.icon = "bi-clock-history"
      }
      else if (ele.value === "Locations") {
        ele.icon = "bi-pin-map"
      } else if (ele.value === "Rates") {
        ele.icon = "bi-ticket-perforated"
      } else if (ele.value === "Working Hours") {
        ele.icon = "bi-calendar3"
      } else if (ele.value === "Account") {
        ele.icon = "bi-person-fill-gear"
      }
      else if (ele.value === "Reporting Dashboard") {
        ele.icon = "bi-grid-1x2"
      } else if (ele.value === "Provider Information") {
        ele.icon = " bi-shield-exclamation"
        this.selectedNavItem = ele.value
      } else if (ele.value === "Patients Information") {
        ele.icon = "bi-hospital"
      } else if (ele.value === "LOV management") {
        ele.icon = "bi-sliders"
      }
      else if (ele.value === "Appointment Governance") {
        ele.icon = "bi-clipboard2-check"
      }
      else if (ele.value === "Password management") {
        ele.icon = "bi-three-dots"
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
    if (!!value) {
      this.selectedNavItem = value
    } else {
      value = 'Provider'
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
    console.log("------------", event)
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
    } else {

      this.isExpanded = true;
    }
  }

}
