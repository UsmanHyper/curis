import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { first, Subscription, take, timer } from 'rxjs';
import { DataSharingService } from 'src/app/services/data-sharing-servcie';
import { MainHomeService } from 'src/app/services/main-home.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { providerService } from 'src/app/platform/provider-section/provider.service';
import * as moment from 'moment';
import { authenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-provider-location-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,],
  providers: [DatePipe],
  templateUrl: './provider-location-modal.component.html',
  styleUrls: ['./provider-location-modal.component.scss']
})
export class ProviderLocationModalComponent implements OnInit {
  title: any;
  data: any;
  time: any;
  cityLov: any;
  providersLocation: any;
  providerData: any;
  userToken: any;
  isEditMode: boolean = false;
  initialState: any;
  locationFormGroup: FormGroup;
  zipCodesLov: any;
  location: any;
  checked: boolean = false


  constructor(
    private fb: FormBuilder, private router: Router, public bsModalRef: BsModalRef,
    private modalService: BsModalService, private dss: DataSharingService,
    private apiService: MainHomeService, private datePipe: DatePipe, private spinner: NgxSpinnerService,
    private providerService: providerService, private authenticationService: authenticationService) {


    this.locationFormGroup = this.fb.group({
      locationName: ["", Validators.required],
      locationDescription: ["", Validators.required],
      activeStatus: [false, Validators.required],
      locationAddressLineOne: ["", Validators.required],
      locationAddressLineTwo: [""],
      city: ["Select your City", Validators.required],
      zipCode: ["Select your Zip Code", Validators.required]

    });


    this.checked = this.locationFormGroup.controls['activeStatus'].value || false;
  }

  ngOnInit(): void {
    this.providerData = this.providerService.getProviderData()
    this.userToken = this.authenticationService.getUserToken();
    this.getProviderLocationAPI(this.providerData._id)
    this.getCityLov()
    this.getzipCodeLov();
    console.log("---------", this.initialState)

    if (!!this.initialState.payload) {
      this.patchData(this.initialState.payload)

      this.isEditMode = true;

      this.location = this.initialState.payload._id
    }

    this.title = this.initialState.title



  }




  closeModal() {
    this.locationFormGroup.reset();
    // this.dialog.closeAll()
    this.bsModalRef.hide()
  }


  showError(error: any) {
    this.apiService.errorToster(error, 'Error!',);
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
  patchData(data: any) {
    this.isEditMode = true;
    this.locationFormGroup.patchValue({
      id: data._id,
      locationName: data.locationName,
      locationDescription: data.locationDescription,
      activeStatus: data.isActive,
      locationAddressLineOne: data.locationAddressLineOne,
      locationAddressLineTwo: data?.locationAddressLineTwo || "",
      city: data.city,
      zipCode: data.zip,
    });


  }

  updateLocationInformation() {
    let data = {
      "locationName": this.locationFormGroup.controls['locationName'].value,
      "locationDescription": this.locationFormGroup.controls['locationDescription'].value,
      "isActive": this.locationFormGroup.controls['activeStatus'].value,
      "locationAddressLineOne": this.locationFormGroup.controls['locationAddressLineOne'].value,
      "locationAddressLineTwo": this.locationFormGroup.controls['locationAddressLineTwo']?.value || "",
      "city": this.locationFormGroup.controls['city'].value,
      "zip": this.locationFormGroup.controls['zipCode'].value,
    };

    this.updateProviderLocationAPI(this.location, data);
  }

  updateProviderLocationAPI(locationId: any, dataToSet: any) {
    this.spinner.show();
    this.providerService.updateLocationInformation(this.userToken, locationId, dataToSet)
      .pipe(first())
      .subscribe(
        (res: any) => {
          this.dss.sendSignal({ type: 'location-saved', data: 'success' })
          this.getProviderLocationAPI(this.providerData._id);
          this.closeModal();
          this.spinner.hide();
        },
        (err: any) => {
          this.spinner.hide();
          this.showError(err?.error?.message?.description);
        }
      );
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

  getzipCodeLov() {
    this.spinner.show();
    this.apiService.getLovs(19)
      .pipe(first())
      .subscribe(
        (res: any) => {
          this.zipCodesLov = res[0].lovs;
          this.spinner.hide();
        },
        (err: any) => {
          this.spinner.hide();
          this.showError(err?.error?.message?.description);
        }
      );
  }

  closeEditModal() {
    // this.modalRef.hide();
  }

  saveLocationInformationData() {
    let data = {
      "locationName": this.locationFormGroup.controls['locationName'].value,
      "locationDescription": this.locationFormGroup.controls['locationDescription'].value,
      "isActive": this.locationFormGroup.controls['activeStatus'].value,
      "userId": this.providerData.userId,
      "providerId": this.providerData._id,
      "locationAddressLineOne": this.locationFormGroup.controls['locationAddressLineOne'].value,
      "locationAddressLineTwo": this.locationFormGroup.controls['locationAddressLineTwo']?.value || "",
      "city": this.locationFormGroup.controls['city'].value,
      "zip": this.locationFormGroup.controls['zipCode'].value,
    };
    this.saveProviderLocationAPI(data);
  }

  saveProviderLocationAPI(providerFormData: any) {
    this.spinner.show();
    this.providerService.saveProviderLocationInformation(this.userToken, providerFormData)
      .pipe(first())
      .subscribe(
        (res: any) => {
          this.dss.sendSignal({ type: 'location-saved', data: 'success' })

          this.spinner.hide();
          this.closeModal();
          this.getProviderLocationAPI(this.providerData._id);
        },
        (err: any) => {
          this.spinner.hide();
          this.showError(err?.error?.message?.description);
        }
      );
  }

}
