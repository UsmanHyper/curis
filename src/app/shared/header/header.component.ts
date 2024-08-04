import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  loggedIn: boolean = false;

  logout() {

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
}
