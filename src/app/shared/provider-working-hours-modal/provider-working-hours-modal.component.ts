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
import { authenticationService } from 'src/app/services/authentication.service';
import { FlatpickrModule } from 'angularx-flatpickr';
@Component({
  selector: 'app-provider-working-hours-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FlatpickrModule],
  providers: [DatePipe],
  templateUrl: './provider-working-hours-modal.component.html',
  styleUrls: ['./provider-working-hours-modal.component.scss']
})
export class ProviderWorkingHoursModalComponent implements OnInit {
  title: any;
  time: any;
  providersLocation: any;
  providerData: any;
  userToken: any;
  isEditMode: boolean = false;
  initialState: any;
  location: any;
  locationLov: any;
  checked: boolean = false
  serviceLov: any;
  locationNumber: any;

  workingHoursFormGroup: FormGroup;
  data: any;
  weekdaysLov: any;
  workingHours: any;




  constructor(
    private fb: FormBuilder, private router: Router, public bsModalRef: BsModalRef,
    private modalService: BsModalService, private dss: DataSharingService,
    private apiService: MainHomeService, private spinner: NgxSpinnerService,
    private providerService: providerService, private authenticationService: authenticationService) {


    this.workingHoursFormGroup = this.fb.group({

      locationId: ["Select your Location", Validators.required],
      workingHourId: [],
      isAvailable: [false, Validators.required],
      dayName: ["Select Working Day", Validators.required],
      startTime: ["", Validators.required],
      endTime: ["", Validators.required]





    });


    this.checked = this.workingHoursFormGroup.controls['isAvailable'].value || false;
  }

  ngOnInit(): void {
    this.providerData = this.providerService.getProviderData()
    this.userToken = this.authenticationService.getUserToken();
    this.getProviderLocationAPI(this.providerData._id);
    this.getWeekdaysLov();

    this.getLocationLov();


    console.log("---------", this.initialState)

    if (!!this.initialState.payload) {
      this.patchData(this.initialState.payload)

      this.isEditMode = true;

      this.locationNumber = this.initialState.payload.locationId
      this.location = this.initialState.payload.locationId
    }

    this.title = this.initialState.title

  }

  patchData(data: any) {
    this.isEditMode = true;
    this.workingHoursFormGroup.patchValue({

      locationId: data.locationId,
      isAvailable: data.isAvailable,
      dayName: data.dayName,
      startTime: data.startTime,
      endTime: data.endTime

    });


  }



  closeModal() {
    this.workingHoursFormGroup.reset();
    // this.dialog.closeAll()
    this.bsModalRef.hide()
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



  showError(error: any) {
    this.apiService.errorToster(error, 'Error!',);
  }


  submitWorkingHours() {
    let data = {
      "endTime": this.workingHoursFormGroup.controls['endTime'].value,
      "startTime": this.workingHoursFormGroup.controls['startTime'].value,
      "dayName": this.workingHoursFormGroup.controls['dayName'].value,
      "isAvailable": this.workingHoursFormGroup.controls['isAvailable'].value,
    };
    this.saveWorkingHoursByLocationAPI(data);
  }

  saveWorkingHoursByLocationAPI(data: any) {
    this.spinner.show();
    this.location = this.workingHoursFormGroup.controls['locationId'].value;
    this.providerService.saveWorkingHoursForLocation(this.userToken, this.location, data)
      .pipe(first())
      .subscribe(
        (res: any) => {
          this.workingHours = res;
          this.dss.sendSignal({type:"workingHours-success", data: 'success'})
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

  updateWorkingHoursByIdAPI(data: any, workingHourId: any) {
    this.spinner.show();
    this.providerService.updateWorkingHour(this.userToken, this.workingHoursFormGroup.controls['locationId'].value, this.workingHoursFormGroup.controls['workingHourId'].value, data)
      .pipe(first())
      .subscribe(
        (res: any) => {
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

  deleteLocation(locationId: any, workingHourId: any) {
    this.spinner.show();
    this.providerService.deleteWorkingHoursByLocation(this.userToken, locationId, workingHourId)
      .pipe(first())
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          this.getProviderLocationAPI(this.providerData._id);
        },
        (err: any) => {
          this.spinner.hide();
          this.showError(err?.error?.message?.description);
        }
      );
  }

  updateData() {
    if (!!this.initialState.payload) {
      this.updateWorkingHours(this.initialState.payload);
    }
  }

  updateWorkingHours(data: any) {
    this.workingHoursFormGroup.patchValue({
      isAvailable: data.isAvailable,
      dayName: data.dayName,
      startTime: data.startTime,
      endTime: data.endTime
    });
    this.updateWorkingHoursByIdAPI(this.workingHoursFormGroup.value, this.workingHoursFormGroup.controls['workingHourId'].value);
  }



}

