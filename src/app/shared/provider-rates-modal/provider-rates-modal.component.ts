import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { first, Subscription, take, timer } from 'rxjs';
import { DataSharingService } from 'src/app/services/data-sharing-servcie';
import { MainHomeService } from 'src/app/services/main-home.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { providerService } from 'src/app/platform/provider-section/provider.service';
import { authenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-provider-rates-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,],
  templateUrl: './provider-rates-modal.component.html',
  styleUrls: ['./provider-rates-modal.component.scss']
})
export class ProviderRatesModalComponent implements OnInit {
  title: any;
  time: any;
  cityLov: any;
  providersLocation: any;
  providerData: any;
  userToken: any;
  isEditMode: boolean = false;
  initialState: any;
  location: any;
  locationLov: any;
  checked: boolean = false
  ratesFormGroup: FormGroup;
  serviceLov: any;
  locationNumber: any;


  constructor(
    private fb: FormBuilder, private router: Router, public bsModalRef: BsModalRef,
    private modalService: BsModalService, private dss: DataSharingService,
    private apiService: MainHomeService, private spinner: NgxSpinnerService,
    private providerService: providerService, private authenticationService: authenticationService) {


    this.ratesFormGroup = this.fb.group({

      locationId: ["Select your Location", Validators.required],
      serviceId: [],
      serviceName: ["Select Service", Validators.required],
      amount: ["", Validators.required],
      status: ["", Validators.required]

    });


    this.checked = this.ratesFormGroup.controls['status'].value || false;
  }

  ngOnInit(): void {
    this.providerData = this.providerService.getProviderData()
    this.userToken = this.authenticationService.getUserToken();
    this.getProviderLocationAPI(this.providerData._id);
    this.getLocationLov();
    this.getservicesLov(this.providerData.mainSpeciality);
    this.getCityLov();


    console.log("---------", this.initialState)

    if (!!this.initialState.payload) {
      this.patchData(this.initialState.payload)

      this.isEditMode = true;

      this.location = this.initialState.payload.locationId
    }

    this.title = this.initialState.title



  }



  closeModal() {
    this.ratesFormGroup.reset();
    // this.dialog.closeAll()
    this.bsModalRef.hide()
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
    this.ratesFormGroup.patchValue({
      // serviceId: data.serviceId,
      locationId: data.locationId,
      serviceName: data.serviceName,
      amount: data.rate,
      status: data.is_enable
    });


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

  handleSwitchToggle(e: any) {
    this.ratesFormGroup.patchValue({
      status: e.target.checked
    });
  }

  showError(error: any) {
    this.apiService.errorToster(error, 'Error!',);
  }


  addLocationServiceRates() {
    let data = {
      "rate": this.ratesFormGroup.controls['amount'].value,
      "serviceName": this.ratesFormGroup.controls['serviceName'].value,
      "is_enable": this.ratesFormGroup.controls['status'].value,
    };

    console.log(this.ratesFormGroup.value);
    this.locationNumber = this.ratesFormGroup.controls['locationId'].value;
    this.addNewRatesByLocation(this.locationNumber, data);
  }

  updateLocationServiceRates() {
    let data = {
      "rate": this.ratesFormGroup.controls['amount'].value,
      "serviceName": this.ratesFormGroup.controls['serviceName'].value,
      "is_enable": this.ratesFormGroup.controls['status'].value,
    };
    let serviceId = this.initialState.payload._id
    this.updateNewRatesByLocation(this.location, serviceId, data);
  }


  updateNewRatesByLocation(locationId: any, serviceId: any, dataToSet: any) {
    this.spinner.show();
    this.providerService.updateRatesByLocation(this.userToken, locationId, serviceId, dataToSet)
      .pipe(first())
      .subscribe(
        (res: any) => {
          this.dss.sendSignal({ type: 'rates-saved', data: 'success' })
          this.isEditMode = false;
          this.closeModal();
          this.spinner.hide();
          this.getProviderLocationAPI(this.providerData._id);
        },
        (err: any) => {
          this.spinner.hide();
          this.showError(err?.error?.message?.description);
        }
      );
  }

  getservicesLov(pSpecialityName: any) {
    this.spinner.show();
    this.providerService.getLovsByName(pSpecialityName)
      .pipe(first())
      .subscribe(
        (res: any) => {
          this.serviceLov = res[0].lovs;
          this.spinner.hide();
        },
        (err: any) => {
          this.spinner.hide();
          this.showError(err?.error?.message?.description);
        }
      );
  }


  addNewRatesByLocation(locationId: any, dataToSet: any) {
    this.spinner.show();
    this.providerService.addNewRatesByLocation(this.userToken, locationId, dataToSet)
      .pipe(first())
      .subscribe(
        (res: any) => {
          this.dss.sendSignal({ type: 'rates-saved', data: 'success' })

          this.closeModal();
          this.spinner.hide();
          this.getProviderLocationAPI(this.providerData._id);
        },
        (err: any) => {
          this.spinner.hide();
          this.showError(err?.error?.message?.description);
        }
      );
  }


}

