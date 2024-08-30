import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { first } from 'rxjs';
import { MainHomeService } from 'src/app/services/main-home.service';
import { providerService } from '../provider.service';
import { authenticationService } from 'src/app/services/authentication.service';
import { BsModalService, BsModalRef, ModalOptions, ModalModule } from 'ngx-bootstrap/modal';
import { DataSharingService } from 'src/app/services/data-sharing-servcie';
import { ProviderRatesModalComponent } from 'src/app/shared/provider-rates-modal/provider-rates-modal.component';
import { ProviderWorkingHoursModalComponent } from 'src/app/shared/provider-working-hours-modal/provider-working-hours-modal.component';

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
  locationNumber: any;
  weekdaysLov: any;
  modalRef!: BsModalRef;



  accordionIsOpen: boolean = true;
  accordionStates: boolean[] = [];

  constructor(private apiService: MainHomeService, public formBuilder: FormBuilder,
    private spinner: NgxSpinnerService, private providerService: providerService,
    private authenticationService: authenticationService, private modalService: BsModalService, private dss: DataSharingService) {
  }
  ngOnInit() {
    this.providerData = this.providerService.getProviderData()
    this.userToken = this.authenticationService.getUserToken();
    this.getProviderLocationsByProviderIdAPI(this.providerData._id);
    this.getWeekdaysLov();

    this.dss.onSignal().subscribe((value: any) => {

      if (value && value.type === "workingHours-success") {

        this.getProviderLocationsByProviderIdAPI(this.providerData._id);

      }
    })


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

  openAccordion(index: number, isOpen: boolean): void {
    this.accordionStates[index] = isOpen;
  }





  openWorkingHoursModalToEdit(ev?: any, event?: any) {
    console.log("openWorkin", ev, event);

    let body = {
      workingHourId: event._id,
      locationId: ev._id,
      isAvalible: event.isAvalible,
      dayName: event.dayName,
      startTime: event.startTime,
      endTime: event.endTime,
    }
    this.openModal(body, true, "Update Services And Rates");

  }


  getProviderLocationsByProviderIdAPI(providerId: any) {
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
            if (ele.workingHours.length > 0) {
              working.push(...ele.workingHours); // Spread the array and push the items individually
            }
          });

          console.log(working); // Check the result
          this.workingHours = working
          this.totalView = working.length;
          this.itemInView = working.length;


          this.spinner.hide();
        },
        (err: any) => {
          this.spinner.hide();
          this.showError(err?.error?.message?.description);
        }
      );
  }


  deleteLocation(locationId: any, workingHourId: any) {
    // AlertService.confirm('Are you sure?', 'You want to delete   ?', 'Yes', 'No').subscribe((resp: VAlertAction) => {
    //   if (resp.positive) {
    //     this.spinner.show();
    //     this.providerService.deleteWorkingHoursByLocation(this.userToken, locationId, workingHourId)
    //       .pipe(first())
    //       .subscribe(
    //         (res: any) => {
    //           this.spinner.hide();
    //           this.getProviderLocationsByProviderIdAPI(this.providerData._id);
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



}
