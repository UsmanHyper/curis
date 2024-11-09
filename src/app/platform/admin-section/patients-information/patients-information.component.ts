import { ViewportScroller } from '@angular/common';
import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataSharingService } from 'src/app/services/data-sharing-servcie';
import { authenticationService } from 'src/app/services/authentication.service';
import { adminService } from 'src/app/platform/admin-section/admin.service'
import { debounceTime, distinctUntilChanged, first } from 'rxjs';
import { MainHomeService } from 'src/app/services/main-home.service';
import { BsModalService, BsModalRef, ModalOptions, ModalModule } from 'ngx-bootstrap/modal';
import { PatientViewModalComponent } from 'src/app/shared/patient-view-modal/patient-view-modal.component';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-patients-information',
  templateUrl: './patients-information.component.html',
  styleUrls: ['./patients-information.component.scss']
})
export class PatientsInformationComponent implements OnInit {

  itemInView: number = 5;
  totalView: number = 10;

  totalPages: any = 10;
  itemsPerPage: any = 10;
  currentPage: number = 1;
  totalItems: number = 0;

  userToken: any;
  patientList: any;
  patientDetialView: boolean = false;
  patientListView: boolean = true;
  patientData: any
  modalRef!: BsModalRef;
  pagedItems: any[] = [];
  completelyList: any;
  searchedData: FormControl

  constructor(private dss: DataSharingService, private viewportScroller: ViewportScroller, private modalService: BsModalService,
    public adminService: adminService, public authenticationService: authenticationService, private spinner: NgxSpinnerService, private apiService: MainHomeService,
  ) {
    this.searchedData = new FormControl(null);

  }

  ngOnInit(): void {
    this.userToken = this.authenticationService.getUserToken();
    this.getProviderDetails();

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
    let searchData = this.completelyList.filter((item: any) =>
      Object.keys(item).some(key =>
        typeof item[key] === 'string' && item[key].toLowerCase().includes(searchText.toLowerCase())
      )
    );
    console.log("Filtered Data:", searchData);
    this.patientList = searchData
    setTimeout(() => {
      this.calculatePages();
      this.setPage(this.currentPage);
      this.totalView = this.patientList?.length;
    }, 2000);
  }

  getProviderDetails() {
    this.spinner.show();
    this.adminService.getPatientDetails(this.userToken)
      .pipe(first())
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          let dt: any = res;
          dt.forEach((ele: any) => {
            ele.contact_no = this.transform(ele.contact_no);
          });
          this.patientList = res;
          this.completelyList = res;
          setTimeout(() => {
            this.calculatePages();
            this.setPage(this.currentPage);
            this.totalView = this.patientList?.length;
          }, 2000);
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

  viewDetails(item: any) {
    this.openModal(item, 'Patient Information')
  }

  transform(rawNum: string) {
    rawNum = "+1" + rawNum;

    const countryCodeStr = rawNum.slice(0, 2);
    const areaCodeStr = rawNum.slice(2, 5);
    const midSectionStr = rawNum.slice(5, 8);
    const lastSectionStr = rawNum.slice(8);

    return `${countryCodeStr} (${areaCodeStr})${midSectionStr}-${lastSectionStr}`;
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
    this.modalRef = this.modalService.show(PatientViewModalComponent, {
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



  onPageChange(page: number): void {
    this.currentPage = page;
    this.setPage(page)
    // Update paged items or fetch new data based on the page
  }

  calculatePages(): void {
    if (this.patientList?.length > 0) {
      this.totalPages = Math.ceil(this.patientList.length / this.itemsPerPage);
    }
  }

  setPage(page: number): void {
    this.currentPage = page;
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.patientList?.length);
    this.pagedItems = this.patientList?.slice(startIndex, endIndex);
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
