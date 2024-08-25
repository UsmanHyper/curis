import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {
  imgSrc1: string = './assets/images/admin/search.png';
  itemInView: number = 5;
  totalView: number = 10;


  constructor() {

  }

  ngOnInit() {

  }


  getStatusColor(status: string): string {
    switch (status) {
      case 'New':
        return '#027A48'; // Example color for booked status
      case 'Completed':
        return '#026AA2'; // Example color for reserved status
      case 'cancelled':
        return '#B42318';
      // Add more cases as needed
      default:
        return '#f3f3f3'; // Default color
    }
  }
  getStatusBg(status: string): string {
    switch (status) {
      case 'New':
        return '#ECFDF3'; // Example color for booked status
      case 'Completed':
        return '#F0F9FF'; // Example color for reserved status
      case 'cancelled':
        return '#d50000';
      // Add more cases as needed
      default:
        return '#f3f3f3'; // Default color
    }
  }
}
