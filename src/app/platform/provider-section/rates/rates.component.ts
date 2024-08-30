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

  constructor(private apiService: MainHomeService, public formBuilder: FormBuilder,
    private spinner: NgxSpinnerService, private providerService: providerService,
    private authenticationService: authenticationService, private modalService: BsModalService, private dss: DataSharingService) {

  }

  ngOnInit() {
    this.providerData = this.providerService.getProviderData()
    this.userToken = this.authenticationService.getUserToken();
    this.getProviderLocationAPI(this.providerData._id);
    this.getservicesLov(this.providerData.mainSpeciality);


    this.dss.onSignal().subscribe((value: any) => {

      if (value && value.type === "rates-saved") {
        this.getProviderLocationAPI(this.providerData._id)
      }
    })

  }



  addNewLocation() {
    this.isEditMode = false;
    this.openModal("", "Add Service and Rates", "new_location");
  }

  openEditModal(ev?: any): void {
    this.openModal(ev, "Update Service and Rates", "old_location")
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

  deleteService(locationId: any, ServiceId?: any, workingHourId?: any) {
    // AlertService.confirm('Are you sure?', 'You want to delete   ?', 'Yes', 'No').subscribe((resp: VAlertAction) => {
    //   if (resp.positive) {
    //     this.providerService.deleteRatesByLocation(this.userToken, locationId, ServiceId)
    //       .pipe(first())
    //       .subscribe(
    //         (res: any) => {
    //           this.spinner.hide();
    //           this.getProviderLocationAPI(this.providerData._id);
    //         },
    //         (err: any) => {
    //           this.spinner.hide();
    //           this.showError(err?.error?.message?.description);
    //         }
    //       );

    //   } else {
    //     return;
    //   }
    // });
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
              });
              working.push(...ele.locationServices); // Spread the array and push the items individually
            }
          });

          console.log(working); // Check the result
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

  openRatesModaltoEdit(ev?: any, event?: any): void {
    let body = {
      serviceId: event._id,
      locationId: ev._id,
      serviceName: event.serviceName,
      amount: event.rate,
      status: event.is_enable

    }
    let edited = true;
    let title = "Update Services And Rates";
    this.openModal(body, edited, title)

  }


  getservicesLov(pSpecialityName: any) {
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




}
