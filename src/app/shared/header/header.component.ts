import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, SimpleChanges, HostListener } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { authenticationService } from 'src/app/services/authentication.service';
import { MainHomeService } from 'src/app/services/main-home.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  loggedIn: boolean = false;


  constructor(private router: Router, private route: ActivatedRoute, private authenticationService: authenticationService, private apiService: MainHomeService) { }
  ngOnInit(): void {


    this.loggedIn = localStorage.getItem('isLoggedIn') === 'true' ? true : false

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
          localStorage.setItem('isLoggedIn','false')
          this.router.navigate(['/login']);

          // this.spinner.hide();
        },
        (err: any) => {
          // this.spinner.hide();
          this.showError(err?.error?.message?.description);
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
