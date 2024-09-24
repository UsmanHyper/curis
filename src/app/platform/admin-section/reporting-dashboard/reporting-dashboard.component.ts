import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reporting-dashboard',
  templateUrl: './reporting-dashboard.component.html',
  styleUrls: ['./reporting-dashboard.component.scss']
})
export class ReportingDashboardComponent implements OnInit {

  cardInfo = [
    { title: 'Total Patients', total: '2,420', icon: 'bi-person', value: '40%', ratio: 'high' },
    { title: 'Total Providers', total: ' 1,210', icon: 'bi-person-check', value: '10%', ratio: 'low' },
    { title: 'Total Appointments', total: '316', icon: 'bi-list-check', value: '20%', ratio: 'high' },
    { title: 'Service Fees Collected', total: '$ 2,420', icon: 'bi-currency-dollar', value: '40%', ratio: 'high' },
    { title: 'Revenue', total: '$ 2,420', icon: 'bi-currency-dollar', value: '40%', ratio: 'high' },
    { title: 'Daily Visitors', total: '2,420', icon: 'bi-people-fill', value: '40%', ratio: 'high' },
  ]

  constructor() {


  }

  ngOnInit(): void {

  }
}
