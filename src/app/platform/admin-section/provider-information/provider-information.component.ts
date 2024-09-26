import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DataSharingService } from 'src/app/services/data-sharing-servcie';
import { authenticationService } from 'src/app/services/authentication.service';
import { adminService } from 'src/app/platform/admin-section/admin.service'
import { first } from 'rxjs';
import { MainHomeService } from 'src/app/services/main-home.service';
import { BsModalService, BsModalRef, ModalOptions, ModalModule } from 'ngx-bootstrap/modal';
import { ProviderViewModalComponent } from 'src/app/shared/provider-view-modal/provider-view-modal.component';


@Component({
  selector: 'app-provider-information',
  templateUrl: './provider-information.component.html',
  styleUrls: ['./provider-information.component.scss']
})
export class ProviderInformationComponent implements OnInit {
  itemInView: number = 5;
  totalView: number = 10;

  totalPages: any = 10;
  itemsPerPage: any = 10;
  currentPage: number = 1;
  totalItems: number = 0;

  userToken: any;
  providerInfo: any;
  providerList: any;
  providerDetialView: boolean = false;
  providerListView: boolean = true;
  modalRef!: BsModalRef;



  constructor(private dss: DataSharingService, private viewportScroller: ViewportScroller, private authenticationService: authenticationService, private modalService: BsModalService,
    public adminService: adminService, private apiService: MainHomeService,
    private spinner: NgxSpinnerService, public router: Router) { }

  ngOnInit(): void {
    this.userToken = this.authenticationService.getUserToken();
    // this.providerFilterForm();
    this.getProviderDetails();

  }


  getProviderDetails() {
    this.spinner.show();
    this.adminService.getProviderDetails(this.userToken)
      .pipe(first())
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          this.providerList = res
        },
        (err: any) => {
          this.spinner.hide();
          this.showError(err?.error?.message?.description);
        }
      );
  }

  showError(error: any) {
    this.apiService.errorToster(error, 'Error!',);
  }
  onCheckboxChange(event: Event, ev: any): void {
    const inputElement = event.target as HTMLInputElement;
    //  inputElement.checked;
    console.log('Checkbox state:', inputElement.checked);
    console.log('Checkbox state:', ev);

    this.handleChange(inputElement.checked, ev)

  }

  handleChange(newValue: boolean, data: any) {
    let payload = {
      isActive: newValue
    }

    this.adminService.putProviderDetails(this.userToken, data._id, payload)
      .pipe(first())
      .subscribe(
        (res: any) => {
          // this.spinner.hide();
          this.getProviderDetails();
        },
        (err: any) => {
          this.spinner.hide();
          this.showError(err?.error?.message?.description);
        }
      );
  }


  viewDetails(item: any) {
    this.openModal(item, 'Provider Details')
  }

  cancel(item: any) {

  }


  openModal(payload?: any, title?: any,) {
    console.log("openModal", payload, title);

    let initialState: ModalOptions = {
      initialState: {
        title: title,
        payload: payload,

      }
    };
    console.log("this this.initialState", initialState)
    this.modalRef = this.modalService.show(ProviderViewModalComponent, {
      initialState,
      class: 'modal-dialog-centered modal-xl',
      // ignoreBackdropClick: true,
      keyboard: false,
      animated: true,
      backdrop: true,
      // backdrop: 'static',
    });

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
