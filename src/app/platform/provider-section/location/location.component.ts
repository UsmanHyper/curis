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
  @ViewChild("addLocationModal") addLocationModal: TemplateRef<any> | any;

  constructor(private apiService: MainHomeService, public formBuilder: FormBuilder, private spinner: NgxSpinnerService, private providerService: providerService, private authenticationService: authenticationService) {
    // constructor(public dialog: MatDialog, private home: homeService, public formBuilder: FormBuilder, public global: Global,
    //   private spinner: NgxSpinnerService, private providerService: providerService, private authenticationservice: authenticationService,) {

  }
  ngOnInit() {
    // this.providerData = this.providerService.getProviderData()
    // this.userToken = this.authenticationService.getUserToken();
    // this.getProviderLocationAPI(this.providerData._id)
    // this.getCityLov();
  }
  addNewLocation() {
    this.isEditMode = false;
    this.openModal(this.addLocationModal, "Add Location");
  }

  openEditModal(ev?: any): void {
    this.openModal(ev, "Update Location")
  }

  openModal(payload?: any, title?: any, type?: any) {
    // const dialogRefLocation = this.dialog.open(AddLocationComponent, {
    //   width: '600px',
    //   height: '560px',
    // });


    // dialogRefLocation.componentInstance.title = title ? title : "";
    // dialogRefLocation.componentInstance.data = payload;

    // dialogRefLocation.afterClosed().subscribe(result => {
    //   this.providerData = this.providerService.getProviderData()
    //   this.userToken = this.authenticationservice.getUserToken();
    //   this.getProviderLocationAPI(this.providerData._id)
    //   this.getCityLov();
    // })
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

}
