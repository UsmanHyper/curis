import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DataSharingService } from 'src/app/services/data-sharing-servcie';

@Component({
  selector: 'app-lov-management',
  templateUrl: './lov-management.component.html',
  styleUrls: ['./lov-management.component.scss']
})
export class LovManagementComponent implements OnInit {
  itemInView: number = 5;
  totalView: number = 10;

  totalPages: any = 10;
  itemsPerPage: any = 10;
  currentPage: number = 1;
  totalItems: number = 0;
  constructor(private dss: DataSharingService, private viewportScroller: ViewportScroller) { }

  ngOnInit(): void {

  }
  onPageChange(page: number): void {
    this.currentPage = page;

    // this.getHallData("", page)
  }


  calculatePages(item: number): void {
    if (item > 0) {
      this.totalPages = Math.ceil(item / this.itemsPerPage);
    }
  }


  setPage(page: number): void {
    this.currentPage = page;
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.totalItems);
    // this.pagedItems = this.filteredData;

    this.viewportScroller.scrollToPosition([0, 0]);
    // this.itemInView = this.totalItems
    // this.totalView = this.pagedItems

    // this.pageInfo = {
    //   page_size: this.totalItems || 0,
    //   on_display: this.pagedItems.length || 0,
    // };
  }


  getStatusColor(status: any): string {
    switch (status) {
      case true:
        return '#027A48'; // Example color for booked status
      // case 'true':
      //   return '#026AA2'; // Example color for reserved status
      case false:
        return '#B42318';
      // Add more cases as needed
      default:
        return 'yellow'; // Default color
    }
  }
  getStatusBg(status: any): string {
    switch (status) {
      case true:
        return '#ECFDF3'; // Example color for booked status
      // Example color for reserved status
      case false:
        return '#f4d3d3';
      // Add more cases as needed
      default:
        return 'yellow'; // Default color
    }
  }
}
