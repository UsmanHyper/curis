// import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
// import { NgxSpinnerService } from 'ngx-spinner';
// import { first } from 'rxjs/operators';
// // import { authenticationService } from '../../authentication.service';
// import {
//   FormBuilder,
//   Validators,
//   FormGroup
// } from "@angular/forms";
// // import { Global } from '../../Global';
// import { providerService } from '../provider.service';
// // import { MatDialog } from '@angular/material/dialog';
// import { AddLocationComponent } from './add-location/add-location.component';
// import { MainHomeService } from 'src/app/services/main-home.service';
// // import { homeService } from 'src/app/app.service';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { first } from 'rxjs';
import { MainHomeService } from 'src/app/services/main-home.service';
import { providerService } from '../provider.service';
import { authenticationService } from 'src/app/services/authentication.service';
import { BsModalService, BsModalRef, ModalOptions, ModalModule } from 'ngx-bootstrap/modal';
import { DataSharingService } from 'src/app/services/data-sharing-servcie';
import { ProviderLocationModalComponent } from 'src/app/shared/provider-location-modal/provider-location-modal.component';

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
  modalRef!: BsModalRef;





  constructor(private apiService: MainHomeService, public formBuilder: FormBuilder,
    private spinner: NgxSpinnerService, private providerService: providerService,
    private authenticationService: authenticationService, private modalService: BsModalService, private dss: DataSharingService) {


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

  }
  addNewLocation() {
    this.isEditMode = false;
    this.openModal("", "Add Location", "new_location");
  }

  openEditModal(ev?: any): void {
    this.openModal(ev, "Update Location", "old_location")
  }

  // openModal(payload?: any, title?: any, type?: any) {

  // }

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

          this.itemInView = dt.length;
          this.totalView = dt.length;
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


  deleteLocationInformation(locationId: any, workingHourId?: any) {
    // AlertService.confirm('Are you sure?', 'You want to delete   ?', 'Yes', 'No').subscribe((resp: VAlertAction) => {
    //   if (resp.positive) {
    //     this.spinner.show();
    //     this.providerService.deleteLocationInformation(this.userToken, locationId)
    //       .pipe(first())
    //       .subscribe(
    //         (res: any) => {
    //           this.getProviderLocationAPI(this.providerData._id);
    //           this.spinner.hide();
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
