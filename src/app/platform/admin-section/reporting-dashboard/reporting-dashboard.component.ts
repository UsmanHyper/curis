import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reporting-dashboard',
  templateUrl: './reporting-dashboard.component.html',
  styleUrls: ['./reporting-dashboard.component.scss']
})
export class ReportingDashboardComponent implements OnInit {
  selectedLabel: any;
  cardInfo = [
    { title: 'Total Patients', total: '2,420', icon: 'bi-person', value: '40%', ratio: 'high' },
    { title: 'Total Providers', total: ' 1,210', icon: 'bi-person-check', value: '10%', ratio: 'low' },
    { title: 'Total Appointments', total: '316', icon: 'bi-list-check', value: '20%', ratio: 'high' },
    { title: 'Service Fees Collected', total: '$ 2,420', icon: 'bi-currency-dollar', value: '40%', ratio: 'high' },
    { title: 'Revenue', total: '$ 2,420', icon: 'bi-currency-dollar', value: '40%', ratio: 'high' },
    { title: 'Daily Visitors', total: '2,420', icon: 'bi-people-fill', value: '40%', ratio: 'high' },
  ]

  months = [
    { value: 'January', data: 'January' },
    { value: "February", data: "February" },
    { value: "March", data: "March" },
    { value: "April", data: "April" },
    { value: "May", data: "May" },
    { value: "June", data: "June" },
    { value: "July", data: "July" },
    { value: "August", data: "August" },
    { value: "September", data: "September" },
    { value: "October", data: "October" },
    { value: "November", data: "November" },
    { value: "December", data: "December" },
  ]

  constructor() {


  }

  ngOnInit(): void {

  }


  selectItem(item: any) {
    console.log(item);
    this.selectedLabel = item.value;
    this.closeDropdown()

  }

  closeDropdown() {
    const navbarToggler = document.getElementById('navbarSupportedContent');
    const navbarCollapse = document.getElementById('dropdownMenuClickable');

    if (navbarToggler && navbarCollapse) {
      const isNavbarOpen = navbarCollapse.classList.contains('show');
      if (isNavbarOpen) {
        (navbarToggler as HTMLElement).click();
      }
    }
  }
}
