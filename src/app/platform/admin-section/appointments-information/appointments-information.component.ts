import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataSharingService } from 'src/app/services/data-sharing-servcie';
import { authenticationService } from 'src/app/services/authentication.service';
import { adminService } from 'src/app/platform/admin-section/admin.service'
import { first } from 'rxjs';
import { MainHomeService } from 'src/app/services/main-home.service';
import { BsModalService, BsModalRef, ModalOptions, ModalModule } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-appointments-information',
  templateUrl: './appointments-information.component.html',
  styleUrls: ['./appointments-information.component.scss']
})
export class AppointmentsInformationComponent implements OnInit {
  itemInView: number = 5;
  totalView: number = 10;

  totalPages: any = 10;
  itemsPerPage: any = 10;
  currentPage: number = 1;
  totalItems: number = 0;


  AppointmentList: any;
  userToken: any;
  dataToSend: any;
  showList: boolean = true;
  showDetail: boolean = false;


  constructor(private dss: DataSharingService, private viewportScroller: ViewportScroller,
    public adminService: adminService, public authenticationService: authenticationService, private spinner: NgxSpinnerService, private apiService: MainHomeService,
  ) { }

  ngOnInit(): void {
    this.userToken = this.authenticationService.getUserToken();
    this.getAppointDetails();
  }

  getAppointDetails() {
    this.spinner.show();
    this.adminService.getAppointmentDetails(this.userToken)
      .pipe(first())
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          this.dataToSend = res
          this.getProviderData(res)
          this.AppointmentList = res
        },
        (err: any) => {
          this.spinner.hide();
          this.showError(err?.error?.message?.description);
        }
      );
  }



  getProviderData(data: any) {
    this.adminService.getProviderDetails(this.userToken, data.providerUserId).
      pipe(first())
      .subscribe(
        (res: any) => {
          let combinedArray: any[] = []
          data.forEach((ele: any) => {
            combinedArray.push(ele);
            res.forEach((elem: any) => {

              ele.providerItem = elem
            })


          });

          combinedArray.forEach((ele: any) => {

            ele.status = (ele.isCancelled === false && ele.isCompleted === false && ele.isPaid === true) ? true : false


          });
          this.AppointmentList = combinedArray;

        })
  }


  showError(error: any) {
    this.apiService.errorToster(error, 'Error!',);
  }




  deleteAppoint(id?: any) {

  }
  
  showAppointValues(data: any) {

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
