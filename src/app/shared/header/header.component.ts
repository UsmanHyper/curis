import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, SimpleChanges, HostListener } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { authenticationService } from 'src/app/services/authentication.service';
import { DataSharingService } from 'src/app/services/data-sharing-servcie';
import { MainHomeService } from 'src/app/services/main-home.service';
import { userService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  loggedIn: boolean = false;


  constructor(private router: Router, private route: ActivatedRoute, private authenticationService: authenticationService, private apiService: MainHomeService, private dss: DataSharingService, private userService: userService) { }
  ngOnInit(): void {


    this.loggedIn = localStorage.getItem('isLoggedIn') === 'true' ? true : false

    this.dss.onSignal().subscribe((value: any) => {

      if (value && value.type === "logOut") {
        this.loggedIn = localStorage.getItem('isLoggedIn') === 'true' ? true : false
      }
    })

  }


  logout() {

    let data = this.authenticationService.getLoggedInUser();
    this.authenticationService.logOutUser(data)
      .pipe(first())
      .subscribe(
        (res: any) => {
          this.authenticationService.removeLoggedInUser();
          this.authenticationService.removeTokenData();
          this.authenticationService.removeProviderData();
          localStorage.setItem('isLoggedIn', 'false')
          this.loggedIn = false;
          this.dss.sendSignal({ type: 'logOut', item: "signOut" });
          // this.spinner.hide();
        },
        (err: any) => {
          // this.spinner.hide();
          this.showError(err?.error?.message?.description);
        }
      );

  }


  openDashboard() {

    let userToken = localStorage.getItem('token') || null
    if (!!userToken) {

      this.getUSerDetailsBytokenRequest(userToken);
    } else {
      this.loggedIn = false;
      return
    }
  }


  getUSerDetailsBytokenRequest(data: any) {
    this.userService.getUserDataByToken(data)
      .pipe(first())
      .subscribe(
        (res: any) => {
          this.authenticationService.setLoggedInUser(res);
          if (res.user_Type == "Provider") {
            // this.getProviderDataById(res._id)
            this.router.navigate(['/providerDashboard']);
          }
          else if (res.user_Type == "Patient") {
            this.router.navigate(['/patientDashboard']);
          }
          else if (res.user_Type == "Admin") {
            this.router.navigate(['/AdminDashboard']);
          }
          else if (res.user_Type == "Lab") {
            this.router.navigate(['/LabDashboard']);
          }

        },
        (err: any) => {
          this.showError(err?.error?.message);
        }
      );
  }

  closeDropdown() {
    const navbarToggler = document.getElementById('navbar-toggler-icon');
    const navbarCollapse = document.getElementById('navbarSupportedContent');

    if (navbarToggler && navbarCollapse) {
      const isNavbarOpen = navbarCollapse.classList.contains('show');
      if (isNavbarOpen) {
        (navbarToggler as HTMLElement).click();
      }
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const navbarCollapse = document.getElementById('navbarSupportedContent');
    const navbarToggler = document.getElementById('navbar-toggler-icon');

    if (navbarCollapse && navbarToggler) {
      const isNavbarOpen = navbarCollapse.classList.contains('show');
      const clickedInsideNavbar = navbarCollapse.contains(target) || navbarToggler.contains(target);

      if (isNavbarOpen && !clickedInsideNavbar) {
        (navbarToggler as HTMLElement).click();
      }
    }
  }


  showError(error: any) {
    this.apiService.errorToster(error, 'Error!',);
  }
}
