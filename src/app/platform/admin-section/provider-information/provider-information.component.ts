import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DataSharingService } from 'src/app/services/data-sharing-servcie';
import { authenticationService } from 'src/app/services/authentication.service';
import { adminService } from 'src/app/platform/admin-section/admin.service'
import { catchError, concatMap, debounceTime, distinctUntilChanged, EMPTY, first, from, map, tap } from 'rxjs';
import { MainHomeService } from 'src/app/services/main-home.service';
import { BsModalService, BsModalRef, ModalOptions, ModalModule } from 'ngx-bootstrap/modal';
import { ProviderViewModalComponent } from 'src/app/shared/provider-view-modal/provider-view-modal.component';
import { ProviderEditModalComponent } from 'src/app/shared/provider-edit-modal/provider-edit-modal.component';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-provider-information',
  templateUrl: './provider-information.component.html',
  styleUrls: ['./provider-information.component.scss']
})
export class ProviderInformationComponent implements OnInit {
  itemInView: number = 5;
  totalView: number = 10;

  totalPages: any = 10;
  itemsPerPage: any = 5;
  currentPage: number = 1;
  totalItems: number = 0;

  pagedItems: any[] = [];


  userToken: any;
  providerInfo: any;
  providerList: any;
  providerDetailList: any;
  providerDetialView: boolean = false;
  providerListView: boolean = true;
  modalRef!: BsModalRef;

  completelyList: any;
  searchedData: FormControl

  constructor(private dss: DataSharingService, private viewportScroller: ViewportScroller, private authenticationService: authenticationService, private modalService: BsModalService,
    public adminService: adminService, private apiService: MainHomeService,
    private spinner: NgxSpinnerService, public router: Router) {
    this.searchedData = new FormControl(null);

  }

  ngOnInit(): void {
    this.userToken = this.authenticationService.getUserToken();
    // this.providerFilterForm();
    this.getProviderDetails();

    // 
    this.dss.onSignal().subscribe((value: any) => {

      if (value && value.type === "admin-provider-update-saved") {
        this.getProviderDetails();
      }
    })

    this.searchedData.valueChanges.pipe(debounceTime(400), distinctUntilChanged()).subscribe((val: any) => {
      console.log("-----------", val);
      this.searchData(this.searchedData.value)
    })
  }

  searchData(searchText: any) {

    // let searchData = this.completelyList.filter((item: any) =>
    //   item.name.toLowerCase().includes(searchText.toLowerCase())
    // );
    // console.log("Filtered Data:", searchData);
    const searchProperties = ['f_name', 'l_name', 'email', 'city', 'contact_no', 'addressLineOne', 'addressLineTwo', 'licensedState'];
    // let searchData = this.completelyList.filter((item: any) =>
    //   Object.keys(item).some(key =>
    //     typeof item[key] === 'string' && item[key].toLowerCase().includes(searchText.toLowerCase())
    //   )
    // );
    let searchData = this.completelyList.filter((item: any) =>
      searchProperties.some(prop =>
        item[prop]?.toLowerCase().includes(searchText.toLowerCase())
      )
    );
    console.log("Filtered Data:", searchData);
    this.providerList = searchData
    setTimeout(() => {
      this.calculatePages();
      this.setPage(this.currentPage);
      this.totalView = this.providerList?.length;
    }, 2000);
  }


  // getProviderDetails() {
  //   this.spinner.show();
  //   this.adminService.getProviderDetails(this.userToken)
  //     .pipe(
  //       first(),
  //       concatMap((res: any) => {
  //         this.spinner.hide();
  //         this.providerList = res; // Set initial data from the first API call

  //         // Create an observable from each provider in `res` to fetch additional data
  //         return from(res).pipe(
  //           concatMap((provider: any) =>
  //             this.getProviderData(provider._id).pipe(
  //               tap((extraData: any) => {
  //                 // Find the provider in `this.providerList` and update it with extra data
  //                 const providerIndex = this.providerList.findIndex((p: any) => p._id === provider._id);
  //                 if (providerIndex > -1) {
  //                   this.providerList[providerIndex] = { ...this.providerList[providerIndex], ...extraData };
  //                 }
  //               })
  //             )
  //           )
  //         );
  //       })
  //     )
  //     .subscribe(
  //       () => {
  //         console.log('All provider data fetched and stored in providerList:', this.providerList);
  //         setTimeout(() => {
  //           this.calculatePages()
  //           this.setPage(this.currentPage)
  //           this.totalView = this.providerList?.length
  //         }, 2000);
  //       },
  //       (err: any) => {
  //         this.spinner.hide();
  //         this.showError(err?.error?.message?.description);
  //       }
  //     );
  // }


  getProviderDetails() {
    this.spinner.show();
    this.adminService.getProviderDetails(this.userToken)
      .pipe(
        first(),
        concatMap((res: any) => {
          this.spinner.hide();
          this.providerList = res; // Set initial data from the first API call

          // Create an observable from each provider in `res` to fetch additional data
          return from(res).pipe(
            concatMap((provider: any) =>
              this.getProviderData(provider._id).pipe(
                tap((extraData: any) => {
                  // Extract only the necessary fields
                  const selectedData = {
                    addressLineOne: extraData.addressLineOne,
                    addressLineTwo: extraData.addressLineTwo,
                    city: extraData.city,
                    licensedState: extraData.licensedState,
                    zipcode: extraData.zipcode,
                    providerId: extraData._id
                  };

                  // Find the provider in `this.providerList` and update it with the selected extra data
                  const providerIndex = this.providerList.findIndex((p: any) => p._id === provider._id);
                  if (providerIndex > -1) {
                    this.providerList[providerIndex] = { ...this.providerList[providerIndex], ...selectedData };
                  }
                })
              )
            )
          );
        })
      )
      .subscribe(
        () => {
          console.log('All provider data fetched and stored in providerList:', this.providerList);
          this.completelyList = this.providerList
          setTimeout(() => {
            this.calculatePages();
            this.setPage(this.currentPage);
            this.totalView = this.providerList?.length;
          }, 2000);
        },
        (err: any) => {
          this.spinner.hide();
          this.showError(err?.error?.message?.description);
        }
      );
  }


  getProviderData(providerId: any) {
    return this.adminService.getProviderDetails(this.userToken, providerId)
      .pipe(
        first(),
        map((res: any) => res), // Transform response if needed
        catchError((err: any) => {
          this.showError(err?.error?.message?.description);
          return EMPTY; // Continue the sequence even if one fetch fails
        })
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
  editViewDetails(item: any) {
    this.openEditModal(item, 'Edit Provider Details', 'edit')
  }



  openEditModal(payload?: any, title?: any, type?: any) {
    console.log("openModal", payload, title);

    let initialState: ModalOptions = {
      initialState: {
        title: title,
        payload: payload,
        type: type,


      }
    };
    console.log("this this.initialState", initialState)
    this.modalRef = this.modalService.show(ProviderEditModalComponent, {
      initialState,
      class: 'modal-dialog-centered modal-xl',
      ignoreBackdropClick: true,
      keyboard: false,
      animated: true,
      backdrop: true,
      // backdrop: 'static',
    });

  }
  openModal(payload?: any, title?: any, type?: any) {
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
    this.setPage(page)
    // Update paged items or fetch new data based on the page
  }

  calculatePages(): void {
    if (this.providerList?.length > 0) {
      this.totalPages = Math.ceil(this.providerList.length / this.itemsPerPage);
    }
  }

  setPage(page: number): void {
    this.currentPage = page;
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.providerList?.length);
    this.pagedItems = this.providerList?.slice(startIndex, endIndex);
    this.itemInView = this.pagedItems.length
    this.viewportScroller.scrollToPosition([0, 0]);
    console.log("this", this.pagedItems)


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
        return '#00000091'; // Default color
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
        return '#ecec006b';// Default color
    }
  }
}
