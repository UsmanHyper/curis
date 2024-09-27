import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataSharingService } from 'src/app/services/data-sharing-servcie';
import { authenticationService } from 'src/app/services/authentication.service';
import { adminService } from 'src/app/platform/admin-section/admin.service'
import { first } from 'rxjs';
import { MainHomeService } from 'src/app/services/main-home.service';
import { BsModalService, BsModalRef, ModalOptions, ModalModule } from 'ngx-bootstrap/modal';
import { LovChildViewModalComponent } from 'src/app/shared/lov-child-view-modal/lov-child-view-modal.component';
import { LovChildAddModalComponent } from 'src/app/shared/lov-child-add-modal/lov-child-add-modal.component';
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

  lovList: any;
  userToken: any;
  lovValueList: any;
  showListing: boolean = true;
  showDetails: boolean = false;
  lovData: any;
  modalRef!: BsModalRef;

  constructor(private dss: DataSharingService, private viewportScroller: ViewportScroller, private modalService: BsModalService,
    public adminService: adminService, public authenticationService: authenticationService, private spinner: NgxSpinnerService, private apiService: MainHomeService,
  ) { }

  ngOnInit(): void {
    this.userToken = this.authenticationService.getUserToken();
    this.getLovDetails();
  }



  getLovDetails() {
    this.spinner.show();
    this.adminService.getLovsData(this.userToken)
      .pipe(first())
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          this.lovList = res
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


  addNew(id?: any) {

    this.openModal(id, "Add New Lov Child", 'child')
  }




  openModal(payload?: any, title?: any, type?: any) {
    console.log("openModal", payload, title);

    let initialState: ModalOptions = {
      initialState: {
        title: title,
        payload: payload,
        type: type,

      }
    };
    console.log("this this.initialState", initialState)
    this.modalRef = this.modalService.show(LovChildAddModalComponent, {
      initialState,
      class: 'modal-dialog-centered modal-md',
      // ignoreBackdropClick: true,
      keyboard: false,
      animated: true,
      backdrop: true,
      // backdrop: 'static',
    });

  }






  deleteLov(id?: any) {

    this.adminService.delLovsParent(this.userToken, id)
      .pipe(first())
      .subscribe(
        (res: any) => {
          this.getLovDetails();

        },
        (err: any) => {
          this.spinner.hide();
          this.showError(err?.error?.message?.description);
        }
      );
  }
  showLovValues(ev: any) {
    let initialState: ModalOptions = {
      initialState: {
        title: "LOV Child Management",
        payload: ev,

      }
    };
    console.log("this this.initialState", initialState)
    this.modalRef = this.modalService.show(LovChildViewModalComponent, {
      initialState,
      class: 'modal-dialog-centered modal-xl',
      // ignoreBackdropClick: true,
      keyboard: false,
      animated: true,
      backdrop: true,
      // backdrop: 'static',
    });
  }

  onCheckboxChange(event: Event, ev: any): void {
    const inputElement = event.target as HTMLInputElement;
    //  inputElement.checked;
    console.log('Checkbox state:', inputElement.checked);
    console.log('Checkbox state:', ev);

    this.handleChange(inputElement.checked, ev)

  }


  handleChange(newValue: boolean, data?: any) {

    let payload = {
      is_enable: newValue
    }

    this.adminService.putLovsNewChild(this.userToken, data, payload)
      .pipe(first())
      .subscribe(
        (res: any) => {
        },
        (err: any) => {
          this.spinner.hide();
          this.showError(err?.error?.message?.description);
        }
      );
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
