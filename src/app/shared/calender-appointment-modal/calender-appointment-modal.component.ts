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
import { FlatpickrModule } from 'angularx-flatpickr';

@Component({
  selector: 'app-calender-appointment-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FlatpickrModule],
  providers: [DatePipe],
  templateUrl: './calender-appointment-modal.component.html',
  styleUrls: ['./calender-appointment-modal.component.scss'],
})
export class CalenderAppointmentModalComponent implements OnInit {
  appointmentFormGroup: FormGroup;
  title: any;
  data: any;
  time: any;
  cityLov: any;
  providersLocation: any;
  providerData: any;
  userToken: any;
  isEditMode: boolean = false;
  serviceLov: any;
  today = new Date(); // Current date and time
  pipe = new DatePipe('en-US');
  locationLov: any = []

  initialState: any;
  flatpickrOptions: any = {
    disable: [
      (date: Date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date < today;
      }
    ],

  };

  constructor(
    private fb: FormBuilder, private router: Router, public bsModalRef: BsModalRef,
    private modalService: BsModalService, private dss: DataSharingService,
    private apiService: MainHomeService, private datePipe: DatePipe, private spinner: NgxSpinnerService,
    private providerService: providerService, private authenticationService: authenticationService) {


    this.appointmentFormGroup = this.fb.group({
      userId: [""],
      providerId: [""],
      date: ["", Validators.required],
      startTime: ["", Validators.required],
      endTime: ["", Validators.required],
      serviceName: ['Select your Slot', Validators.required],
      location: ['Select your Location Name', Validators.required],

    });

  }

  ngOnInit(): void {
    this.providerData = this.providerService.getProviderData()
    this.userToken = this.authenticationService.getUserToken();
    // this.getProviderAppointment(this.providerData._id)
    this.getSlotLov()
    this.getLocationLov()
    this.appointmentFormGroup.get('userId')?.setValue(this.providerData.userId)
    this.appointmentFormGroup.get('providerId')?.setValue(this.providerData._id)
    this.appointmentFormGroup.get('date')?.setValue(this.data)

    this.title = this.initialState.title

    console.log(this.initialState)
    this.patchData(this.initialState.payload)
  }



  patchData(data: any) {

    this.appointmentFormGroup.patchValue({
      date: moment(data).format('DD/MM/YYYY')

    })
    console.log("=========", this.appointmentFormGroup.value)

  }


  getProviderAppointment(providerId: any) {

    this.spinner.show();
    this.providerService.getProviderAppointmentInformation(this.userToken, providerId).pipe(first())
      .subscribe(
        (res: any) => {

        },
        (err: any) => {
          this.spinner.hide();
          this.showError(err?.error?.message?.description);
        }
      );
  }



  getSlotLov() {
    this.spinner.show();
    this.providerService.getLovs(18)
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

  closeModal() {
    this.appointmentFormGroup.reset();
    // this.dialog.closeAll()
    this.bsModalRef.hide()
  }


  showError(error: any) {
    this.apiService.errorToster(error, 'Error!',);
  }


  updateAppointmentInformation() {
    let data = {

      "userId": this.appointmentFormGroup.controls['userId'].value,
      "providerId": this.appointmentFormGroup.controls['providerId'].value,
      "appointmentTitle": this.appointmentFormGroup.controls['patientName'].value,
      "date": this.appointmentFormGroup.controls['date'].value,
      "startTime": this.appointmentFormGroup.controls['startTime'].value,
      "endTime": this.appointmentFormGroup.controls['endTime'].value,
      "slotType": this.appointmentFormGroup.controls['serviceName'].value,


    };

    // this.updateProviderLocationAPI(this.appointmentFormGroup.controls['id'].value, data);
  }

  updateProviderLocationAPI(locationId: any, dataToSet: any) {
    this.spinner.show();
    // this.providerService.updateAppointmentInformation(this.userToken, locationId, dataToSet)
    //   .pipe(first())
    //   .subscribe(
    //     (res: any) => {
    //       this.getProviderLocationAPI(this.providerData._id);
    //       this.closeEditModal();
    //       this.spinner.hide();
    //     },
    //     (err: any) => {
    //       this.spinner.hide();
    //       this.showError(err?.error?.message?.description);
    //     }
    //   );
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



  saveAppointmentInformationData() {

    // let date: any = this.appointmentFormGroup.controls['date'].value;
    // let startTime: any = this.appointmentFormGroup.controls['startTime'].value;
    // let endTime: any = this.appointmentFormGroup.controls['endTime'].value;
    // const dateObject = new Date(this.initialState.payload)
    // let startDateAndTime: any = new Date(dateObject.setHours(parseInt(startTime.split(':')[0]), parseInt(startTime.split(':')[1])));
    // let endDateAndTime: any = new Date(dateObject.setHours(parseInt(endTime.split(':')[0]), parseInt(endTime.split(':')[1])));
    // let stday: any = this.datePipe.transform(startDateAndTime)
    // let enday: any = this.datePipe.transform(endDateAndTime)

    let date: any = this.appointmentFormGroup.controls['date'].value;
    let startTime: any = this.appointmentFormGroup.controls['startTime'].value;
    let endTime: any = this.appointmentFormGroup.controls['endTime'].value;
    
    // Ensure you have a Date object for the date
    let dateObject = new Date(this.initialState.payload); 
    
    // Split the startTime and set hours and minutes to the date object
    let startDateAndTime = new Date(dateObject);
    startDateAndTime.setHours(parseInt(startTime.split(':')[0]), parseInt(startTime.split(':')[1]));
    
    // Split the endTime and set hours and minutes to the date object
    let endDateAndTime = new Date(dateObject);
    endDateAndTime.setHours(parseInt(endTime.split(':')[0]), parseInt(endTime.split(':')[1]));
    



    
    console.log('Start Date and Time in ISO Format:', startDateAndTime);
    console.log('End Date and Time in ISO Format:', endDateAndTime);

    
    // Convert to ISO strings
    let startISO = startDateAndTime.toISOString();
    let endISO = endDateAndTime.toISOString();
    
    console.log('Start Date and Time in ISO Format:', startISO);
    console.log('Start Date and Time in ISO Format:',  moment(startISO).format('YYYY-MM-DDTHH:mm:ss'));
    console.log('End Date and Time in ISO Format:', endISO);
    console.log('End Date and Time in ISO Format:', moment(endISO).format('YYYY-MM-DDTHH:mm:ss'));
    
    
    let data = {
      "userId": this.appointmentFormGroup.controls['userId'].value,
      "providerId": this.appointmentFormGroup.controls['providerId'].value,
      "startTime": moment(startISO).format('YYYY-MM-DDTHH:mm:ss'),
      "appointmentTitle": "Empty Appointment Slot",
      "endTime": moment(endISO).format('YYYY-MM-DDTHH:mm:ss'),
      "slotType": this.appointmentFormGroup.controls['serviceName'].value,
      "slotLocation": this.appointmentFormGroup.controls['location'].value,
    };
    this.saveProviderSlot(data);
  }

  saveProviderSlot(providerFormData: any) {
    this.spinner.show();
    this.providerService.PostProviderAppointmentInformation(this.userToken, this.providerData._id, providerFormData)
      .pipe(first())
      .subscribe(
        (res: any) => {
          this.dss.sendSignal({ type: 'appointment-saved', data: 'success' })
          this.spinner.hide();
          this.closeModal();

        },
        (err: any) => {
          this.spinner.hide();
          this.showError(err?.error?.message?.description);
        }
      );
  }


}
