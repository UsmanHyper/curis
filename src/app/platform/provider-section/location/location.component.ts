import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { first } from 'rxjs/operators';
// import { authenticationService } from '../../authentication.service';
import {
  FormBuilder,
  Validators,
  FormGroup
} from "@angular/forms";
// import { Global } from '../../Global';
import { providerService } from '../provider.service';
// import { MatDialog } from '@angular/material/dialog';
import { AddLocationComponent } from './add-location/add-location.component';
import { MainHomeService } from 'src/app/services/main-home.service';
// import { homeService } from 'src/app/app.service';


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
  @ViewChild("addLocationModal") addLocationModal: TemplateRef<any> | any;

  constructor(private apiService: MainHomeService, public formBuilder: FormBuilder, private spinner: NgxSpinnerService, private providerService: providerService,) {
    // constructor(public dialog: MatDialog, private home: homeService, public formBuilder: FormBuilder, public global: Global,
    //   private spinner: NgxSpinnerService, private providerService: providerService, private authenticationservice: authenticationService,) {

  }
  ngOnInit() {
    this.providerData = this.providerService.getProviderData()
    // this.userToken = this.authenticationservice.getUserToken();
    this.getProviderLocationAPI(this.providerData._id)
    this.getCityLov();
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
