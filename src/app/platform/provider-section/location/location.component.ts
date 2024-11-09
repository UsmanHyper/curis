import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { debounceTime, distinctUntilChanged, first } from 'rxjs';
import { MainHomeService } from 'src/app/services/main-home.service';
import { providerService } from '../provider.service';
import { authenticationService } from 'src/app/services/authentication.service';
import { BsModalService, BsModalRef, ModalOptions, ModalModule } from 'ngx-bootstrap/modal';
import { DataSharingService } from 'src/app/services/data-sharing-servcie';
import { ProviderLocationModalComponent } from 'src/app/shared/provider-location-modal/provider-location-modal.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

  providerData: any;
  userToken: any;
  providersLocation: any;
  isEditMode = false;
  cityLov: any;
  itemInView: number = 5;
  totalView: number = 10;
  itemsPerPage: number = 10;
  modalRef!: BsModalRef;

  totalPages: any = 10;
  currentPage: number = 1;

  completelyList: any;
  searchedData: FormControl;
  pagedItems: any[] = [];

  constructor(private apiService: MainHomeService, public formBuilder: FormBuilder,
    private spinner: NgxSpinnerService, private providerService: providerService,
    private authenticationService: authenticationService, private modalService: BsModalService, private dss: DataSharingService) {

      this.searchedData = new FormControl(null);

  }
  ngOnInit() {
    this.providerData = this.providerService.getProviderData()
    this.userToken = this.authenticationService.getUserToken();
    this.getProviderLocationAPI(this.providerData._id)
    this.getCityLov();

    this.dss.onSignal().subscribe((value: any) => {

      if (value && value.type === "location-saved") {
        this.getProviderLocationAPI(this.providerData._id)
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
    const searchProperties = ['locationName', 'locationAddressLineOne', 'locationAddressLineTwo', 'city', 'zip'];
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
    this.providersLocation = searchData
    setTimeout(() => {
      this.calculatePages();
      this.setPage(this.currentPage);
      this.totalView = this.providersLocation?.length;
    }, 2000);
  }
  addNewLocation() {
    this.isEditMode = false;
    this.openModal("", "Add Location", "new_location");
  }

  openEditModal(ev?: any): void {



    this.openModal(ev, "Update Location", "old_location")
  }



  openModal(payload?: any, title?: any, type?: any) {
    console.log("openModal", payload, type, title);

    let initialState: ModalOptions = {
      initialState: {
        title: title,
        payload: payload,
        type: type
      }
    };
    console.log("this this.initialState", initialState)
    this.modalRef = this.modalService.show(ProviderLocationModalComponent, {
      initialState,
      class: 'modal-dialog-centered modal-lg',
      // ignoreBackdropClick: true,
      keyboard: false,
      animated: true,
      backdrop: true,
      // backdrop: 'static',
    });

  }

  handleSwitchToggle(e: any) {
    console.log(e.target.checked)
  }

  getProviderLocationAPI(providerId: any) {
    this.spinner.show();
    this.providerService.getProviderLocationInformation(this.userToken, providerId)
      .pipe(first())
      .subscribe(
        (res: any) => {
          this.providersLocation = res;
          let dt = this.providersLocation;
          dt.forEach((ele: any) => {
            ele.status = ele.isActive === true ? 'Active' : 'Not Active'

          })
          this.providersLocation = dt
          console.log("providersLocation", this.providersLocation)
          this.completelyList = dt
          setTimeout(() => {
            this.calculatePages();
            this.setPage(this.currentPage);
            this.totalView = this.providersLocation?.length;
          }, 2000);
          this.spinner.hide();
        },
        (err: any) => {
          this.spinner.hide();
          this.showError(err?.error?.message?.description);
        }
      );
  }


  getCityLov() {
    this.spinner.show();
    this.providerService.getLovs(3)
      .pipe(first())
      .subscribe(
        (res: any) => {
          this.cityLov = res[0].lovs;
          this.spinner.hide();
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


  deleteLocationInformation(data: any) {
    let locationId: any = data;
    Swal.fire({
      title: 'Are you sure you want to delete it?',

      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: 'grey',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.providerService.deleteLocationInformation(this.userToken, locationId)
          .pipe(first())
          .subscribe(
            (res: any) => {
              this.spinner.hide();
              Swal.fire({
                title: 'Deleted!',
                text: 'Location has been deleted.',
                icon: 'success',
              });
              this.getProviderLocationAPI(this.providerData._id)
            },
            (err: any) => {
              this.spinner.hide();
              Swal.fire({
                title: 'Error!',
                text: 'An error occurred while deleting the Location.',
                icon: 'error',
              });
              // this.showError(err?.error?.message?.description);
            }
          );

      }
    });
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
        return '#ecec006b'; // Default color
    }
  }


 

  onCheckboxChange(event: Event, ev: any): void {
    const inputElement = event.target as HTMLInputElement;
    //  inputElement.checked;
    console.log('Checkbox state:', inputElement.checked);

    let body = {
      // id: ev._id,
      locationName: ev.locationName,
      locationDescription: ev.locationDescription,
      isActive: inputElement.checked,
      locationAddressLineOne: ev.locationAddressLineOne,
      locationAddressLineTwo: ev?.locationAddressLineTwo || "",
      city: ev.city,
      zip: ev.zip,
    }
    let locationId = ev._id





    this.updateProviderLocationAPI(locationId, body);

    // this.updateWorkingHoursByIdAPI(body, locationId, workingHourId)
  }


  updateProviderLocationAPI(locationId: any, dataToSet: any) {
    this.spinner.show();
    this.providerService.updateLocationInformation(this.userToken, locationId, dataToSet)
      .pipe(first())
      .subscribe(
        (res: any) => {
          this.getProviderLocationAPI(this.providerData._id);
          this.spinner.hide();
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
    if (this.providersLocation?.length > 0) {
      this.totalPages = Math.ceil(this.providersLocation.length / this.itemsPerPage);
    }
  }

  setPage(page: number): void {
    this.currentPage = page;
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.providersLocation?.length);
    this.pagedItems = this.providersLocation?.slice(startIndex, endIndex);
    this.itemInView = this.pagedItems.length
    // this.viewportScroller.scrollToPosition([0, 0]);
    console.log("this", this.pagedItems)


  }

}
