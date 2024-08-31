import { Component, HostListener, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { debounceTime, distinctUntilChanged, first } from 'rxjs';
import { MainHomeService } from 'src/app/services/main-home.service';
import { providerService } from '../provider.service';
import { authenticationService } from 'src/app/services/authentication.service';
import { BsModalService, BsModalRef, ModalOptions, ModalModule } from 'ngx-bootstrap/modal';
import { DataSharingService } from 'src/app/services/data-sharing-servcie';
import { ProviderRatesModalComponent } from 'src/app/shared/provider-rates-modal/provider-rates-modal.component';
import { ProviderWorkingHoursModalComponent } from 'src/app/shared/provider-working-hours-modal/provider-working-hours-modal.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-working-hours',
  templateUrl: './working-hours.component.html',
  styleUrls: ['./working-hours.component.scss']
})
export class WorkingHoursComponent implements OnInit {
  providerData: any;
  userToken: any;
  providersLocation: any;
  isEditMode = false;
  cityLov: any;
  itemInView: number = 5;
  totalView: number = 10;
  workingHours: any;
  locationLov: any;
  locationNumber: any;
  weekdaysLov: any;
  modalRef!: BsModalRef;
  filteredData: any
  sortedData: any[] = [];
  sortDirection: string = 'asc'; // 'asc' or 'desc'
  sortKey: string = '';



  selectedLabel: any = null
  searchText: string = '';
  // itemSearched = new FormControl(null);
  totalPages: any = 10;
  currentPage: number = 1;


  

  

  constructor(private apiService: MainHomeService, public formBuilder: FormBuilder,
    private spinner: NgxSpinnerService, private providerService: providerService,
    private authenticationService: authenticationService, private modalService: BsModalService, private dss: DataSharingService) {
  }
  ngOnInit() {
    this.providerData = this.providerService.getProviderData()
    this.userToken = this.authenticationService.getUserToken();
    this.getProviderLocationsByProviderIdAPI(this.providerData._id);
    this.getLocationLov();
    this.getWeekdaysLov();

    this.dss.onSignal().subscribe((value: any) => {

      if (value && value.type === "workingHours-success") {

        this.getProviderLocationsByProviderIdAPI(this.providerData._id);

      }
    })

  }

  onPageChange(page: number): void {
    this.currentPage = page;

    // this.getHallData("", page)
  }


  filteredItems() {
    return this.locationLov?.filter((item: any) =>
      item?.locationName?.toLowerCase().includes(this.searchText?.toLowerCase())
    );
  }

  // Handle item selection
  selectItem(item: any) {
    this.selectedLabel = item.locationName;
    this.searchText = '';  // Reset search text
    this.closeDropdown()
    let data = this.workingHours?.filter((item: any) =>
      item?.locationName?.toLowerCase().includes(this.selectedLabel?.toLowerCase())
    );

    console.log(data);
    console.log("---------", data)
    this.filteredData = data
  }


  getLocationLov() {
    this.spinner.show();
    this.providerService.getProviderLocationInformation(this.userToken, this.providerData._id)
      .pipe(first())
      .subscribe(
        (res: any) => {
          this.locationLov = res;
          this.spinner.hide();
        },
        (err: any) => {
          this.spinner.hide();
          this.showError(err?.error?.message?.description);
        }
      );
  }




  addNewLocation() {
    this.isEditMode = false;
    this.openModal("", "Add Working Hours", "new_location");
  }
  openEditModal(ev?: any): void {
    this.openModal(ev, "Update Working Hours", "old_location")
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
    this.modalRef = this.modalService.show(ProviderWorkingHoursModalComponent, {
      initialState,
      class: 'modal-dialog-centered modal-lg',
      // ignoreBackdropClick: true,
      keyboard: false,
      animated: true,
      backdrop: true,
      // backdrop: 'static',
    });
  }

  openWorkingHoursModal(value: any) {
    this.locationNumber = value;
    let body = {
      locationId: value
    }
    let title = "Add Services And Rates"
    let edited = false

    this.openModal(body, edited, title);
  }


  openWorkingHoursModalToEdit(ev?: any) {

    let body = {
      workingHourId: ev._id,
      locationId: ev.locationId,
      isAvalible: ev.isAvalible,
      dayName: ev.dayName,
      startTime: ev.startTime,
      endTime: ev.endTime,
    }
    this.openModal(body, "Update Working Hours", "old_location")

  }


  getProviderLocationsByProviderIdAPI(providerId: any) {
    this.spinner.show();
    this.providerService.getProviderLocationInformation(this.userToken, providerId)
      .pipe(first())
      .subscribe(
        (res: any) => {
          this.providersLocation = res;
          this.providersLocation.forEach(() => {
            // this.accordionStates.push(true);
          });
          let working: any[] = []; // Initialize as an array
          let dt = this.providersLocation;

          dt.forEach((ele: any) => {
            if (ele.workingHours.length > 0) {
              ele.workingHours.forEach((elem: any) => {
                elem.locationId = ele._id
                elem.locationName = ele.locationName
              });
            }
            if (ele.workingHours.length > 0) {
              working.push(...ele.workingHours); // Spread the array and push the items individually
            }

            ele.status = ele.isAvalible ? "Active" : "Inactive"

          });


          console.log(working); // Check the result
          this.workingHours = working
          this.filteredData = working
          this.totalView = this.filteredData.length;
          this.itemInView = this.filteredData.length;


          this.spinner.hide();
        },
        (err: any) => {
          this.spinner.hide();
          this.showError(err?.error?.message?.description);
        }
      );
  }


  deleteLocation(data: any) {
    let locationId: any = data.locationId;
    let workingHourId: any = data._id;
    Swal.fire({
      title: 'Are you sure you want to delete it?',

      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: 'grey',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.providerService.deleteWorkingHoursByLocation(this.userToken, locationId, workingHourId)
          .pipe(first())
          .subscribe(
            (res: any) => {
              this.spinner.hide();
              Swal.fire({
                title: 'Deleted!',
                text: 'Working hour has been deleted.',
                icon: 'success',
              });
              this.getProviderLocationsByProviderIdAPI(this.providerData._id);
            },
            (err: any) => {
              this.spinner.hide();
              Swal.fire({
                title: 'Error!',
                text: 'An error occurred while deleting the Working hour.',
                icon: 'error',
              });
              // this.showError(err?.error?.message?.description);
            }
          );

      }
    });

  }

  getWeekdaysLov() {
    this.spinner.show();
    this.providerService.getLovs(7)
      .pipe(first())
      .subscribe(
        (res: any) => {
          this.weekdaysLov = res[0].lovs;
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


  onCheckboxChange(event: Event, ev: any): void {
    const inputElement = event.target as HTMLInputElement;
    //  inputElement.checked;
    console.log('Checkbox state:', inputElement.checked);

    let body = {
      isAvalible: inputElement.checked,
      dayName: ev.dayName,
      startTime: ev.startTime,
      endTime: ev.endTime,
    }
    let locationId = ev.locationId
    let workingHourId = ev._id

    this.updateWorkingHoursByIdAPI(body, locationId, workingHourId)
  }

  updateWorkingHoursByIdAPI(data: any, locationId: any, workingHourId: any) {
    this.spinner.show();
    this.providerService.updateWorkingHour(this.userToken, locationId, workingHourId, data)
      .pipe(first())
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          this.getProviderLocationsByProviderIdAPI(this.providerData._id);

        },
        (err: any) => {
          this.spinner.hide();
          this.showError(err?.error?.message?.description);
        }
      );
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


  sortData(key: string): void {
    this.sortKey = key;
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.sortedData = this.workingHours.sort((a: any, b: any) => {
      const valueA = a[key];
      const valueB = b[key];

      if (this.sortDirection === 'asc') {
        return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
      } else {
        return valueA < valueB ? 1 : valueA > valueB ? -1 : 0;
      }
    });
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

  // @HostListener('document:click', ['$event'])
  // onDocumentClick(event: MouseEvent) {
  //   const target = event.target as HTMLElement;
  //   const navbarCollapse = document.getElementById('dropdownMenuClickable');
  //   const navbarToggler = document.getElementById('navbarSupportedContent');

  //   if (navbarCollapse && navbarToggler) {
  //     const isNavbarOpen = navbarCollapse.classList.contains('show');
  //     const clickedInsideNavbar = navbarCollapse.contains(target) || navbarToggler.contains(target);

  //     if (isNavbarOpen && !clickedInsideNavbar) {
  //       (navbarToggler as HTMLElement).click();
  //     }
  //   }
  // }
}
