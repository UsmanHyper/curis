import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataSharingService } from 'src/app/services/data-sharing-servcie';
import { MainHomeService } from 'src/app/services/main-home.service';
import { providerService } from '../provider.service';
import { authenticationService } from 'src/app/services/authentication.service';
import { first } from 'rxjs';

import { BsModalService, BsModalRef, ModalOptions, ModalModule } from 'ngx-bootstrap/modal';
import { ProviderRatesModalComponent } from 'src/app/shared/provider-rates-modal/provider-rates-modal.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rates',
  templateUrl: './rates.component.html',
  styleUrls: ['./rates.component.scss']
})
export class RatesComponent implements OnInit {
  itemInView: number = 5;
  totalView: number = 10;
  modalRef!: BsModalRef;

  providerData: any;
  serviceLov: any;
  userToken: any;
  locationNumber: any;
  providersLocation: any;
  isEditMode: boolean = false;
  locationId: any
  workingHours: any
  accordionIsOpen: boolean = true;
  accordionStates: boolean[] = [];
  totalPages: any = 10;
  currentPage: number = 1;


  constructor(private apiService: MainHomeService, public formBuilder: FormBuilder,
    private spinner: NgxSpinnerService, private providerService: providerService,
    private authenticationService: authenticationService, private modalService: BsModalService, private dss: DataSharingService) {

  }

  ngOnInit() {
    this.providerData = this.providerService.getProviderData()
    this.userToken = this.authenticationService.getUserToken();
    this.getProviderLocationAPI(this.providerData._id);
    this.getServicesLov(this.providerData.mainSpeciality);


    this.dss.onSignal().subscribe((value: any) => {

      if (value && value.type === "rates-saved") {
        this.getProviderLocationAPI(this.providerData._id)
      }
    })

  }


  onPageChange(page: number): void {
    this.currentPage = page;

    // this.getHallData("", page)
  }

  addNewLocation() {
    this.isEditMode = false;
    this.openModal("", "Add Service and Rates", "new_location");
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
    this.modalRef = this.modalService.show(ProviderRatesModalComponent, {
      initialState,
      class: 'modal-dialog-centered modal-lg',
      // ignoreBackdropClick: true,
      keyboard: false,
      animated: true,
      backdrop: true,
      // backdrop: 'static',
    });
  }




  openRatesModal(value: any) {
    let body = {
      locationId: value
    }
    let title = "Add Services And Rates";
    let edited = false;
    this.openModal(body, edited, title);
  }



  openAccordion(index: number, isOpen: boolean): void {
    this.accordionStates[index] = isOpen;
  }

  deleteService(ev: any) {

    let locationId: any = ev.locationId;
    let ServiceId: any = ev._id;
    Swal.fire({
      title: 'Are you sure you want to delete it?',

      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: 'grey',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.providerService.deleteRatesByLocation(this.userToken, locationId, ServiceId)
          .pipe(first())
          .subscribe(
            (res: any) => {
              this.spinner.hide();
              Swal.fire({
                title: 'Deleted!',
                text: 'Rates has been deleted.',
                icon: 'success',
              });
              this.getProviderLocationAPI(this.providerData._id)
            },
            (err: any) => {
              this.spinner.hide();
              Swal.fire({
                title: 'Error!',
                text: 'An error occurred while deleting the Rates.',
                icon: 'error',
              });
              // this.showError(err?.error?.message?.description);
            }
          );

      }
    });
  }


  getProviderLocationAPI(providerId: any) {
    this.spinner.show();
    this.providerService.getProviderLocationInformation(this.userToken, providerId)
      .pipe(first())
      .subscribe(
        (res: any) => {
          this.providersLocation = res;
          this.providersLocation.forEach(() => {
            this.accordionStates.push(true);
          });
          let working: any[] = []; // Initialize as an array
          let dt = this.providersLocation;

          dt.forEach((ele: any) => {
            if (ele.locationServices.length > 0) {
              ele.locationServices.forEach((loc: any) => {
                loc.locationName = ele.locationName
                loc.locationId = ele._id
              });
              working.push(...ele.locationServices); // Spread the array and push the items individually
            }
            // ele.status= ele.is_enable === true ? "Active" : "Inactive"
          });

          console.log(working); // Check the result
          console.log(this.providersLocation); // Check the result
          this.workingHours = working
          this.spinner.hide();
          this.totalView = working.length;
          this.itemInView = working.length;
        },
        (err: any) => {
          this.spinner.hide();
          this.showError(err?.error?.message?.description);
        }
      );
  }

  openRatesModalToEdit(ev?: any): void {
    this.openModal(ev, "Update Service and Rates", "old_location")
  }


  getServicesLov(pSpecialityName: any) {
    this.spinner.show();
    this.providerService.getLovsByName(pSpecialityName)
      .pipe(first())
      .subscribe(
        (res: any) => {
          this.serviceLov = res[0]?.lovs;
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
    console.log('Checkbox state:', ev);

    let data = {
      "rate": ev.rate,
      "serviceName": ev.serviceName,
      "is_enable": inputElement.checked,
    };

    this.updateNewRatesByLocation(ev.locationId, ev._id, data);

  }



  updateNewRatesByLocation(locationId: any, serviceId: any, dataToSet: any) {
    this.spinner.show();
    this.providerService.updateRatesByLocation(this.userToken, locationId, serviceId, dataToSet)
      .pipe(first())
      .subscribe(
        (res: any) => {
          this.isEditMode = false;
          this.spinner.hide();
          this.getProviderLocationAPI(this.providerData._id);
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

}
