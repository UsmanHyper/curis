import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
} from "@angular/forms";
import { Directive, ElementRef, HostListener, Input } from '@angular/core';
// import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { providerService } from '../../provider.service';
// import { authenticationService } from 'src/app/authentication.service';
import { first } from 'rxjs';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { MainHomeService } from 'src/app/services/main-home.service';
// import { homeService } from 'src/app/app.service';
@Component({
  selector: 'app-appointment-modal',
  templateUrl: './appointment-modal.component.html',
  styleUrls: ['./appointment-modal.component.scss']
})
export class AppointmentModalComponent implements OnInit {
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

  constructor(private formBuilder: FormBuilder, private spinner: NgxSpinnerService, private providerService: providerService, private apiService: MainHomeService, private datePipe: DatePipe) {
    // constructor(private formBuilder: FormBuilder,    public dialog: MatDialog,    private spinner: NgxSpinnerService,    private providerService: providerService,    private authenticationservice: authenticationService,    private home: homeService, private datePipe: DatePipe) {

    this.appointmentFormGroup = this.formBuilder.group({
      userId: [""],
      providerId: [""],
      date: ["", Validators.required],

      startTime: ["", Validators.required],
      endTime: ["", Validators.required],
      serviceName: ['', Validators.required],
      location: ['', Validators.required],

    });

  }
  ngOnInit() {
    this.providerData = this.providerService.getProviderData()
    // this.userToken = this.authenticationservice.getUserToken();
    // this.getProviderAppointment(this.providerData._id)
    this.getSlotLov()
    this.getLocationLov()
    this.appointmentFormGroup.get('userId')?.setValue(this.providerData.userId)
    this.appointmentFormGroup.get('providerId')?.setValue(this.providerData._id)
    this.appointmentFormGroup.get('date')?.setValue(this.data)


  }
  onTimeChange(event: any) {
    const timeArray = event.split(':');
    let minutes = parseInt(timeArray[1]);

    // Round minutes to the nearest 15-minute interval
    minutes = Math.round(minutes / 15) * 15;

    // Ensure minutes stay within bounds (0-59)
    minutes = Math.min(59, Math.max(0, minutes));

    // Convert minutes back to string and pad with zero if necessary
    const formattedMinutes = minutes < 10 ? '0' + minutes.toString() : minutes.toString();

    // Update selectedTime with the rounded minutes
    let selectedTime = `${timeArray[0]}:${formattedMinutes}`;
    this.appointmentFormGroup.get('startTime')?.setValue(selectedTime)
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
      "slothType": this.appointmentFormGroup.controls['serviceName'].value,


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

    let date: any = this.appointmentFormGroup.controls['date'].value;
    let startTime: any = this.appointmentFormGroup.controls['startTime'].value;
    let endTime: any = this.appointmentFormGroup.controls['endTime'].value;
    const dateObject = new Date(date)
    let startDateAndTime: any = new Date(dateObject.setHours(parseInt(startTime.split(':')[0]), parseInt(startTime.split(':')[1])));
    let endDateAndTime: any = new Date(dateObject.setHours(parseInt(endTime.split(':')[0]), parseInt(endTime.split(':')[1])));
    let stday: any = this.datePipe.transform(startDateAndTime)
    let enday: any = this.datePipe.transform(endDateAndTime)




    let data = {
      "userId": this.appointmentFormGroup.controls['userId'].value,
      "providerId": this.appointmentFormGroup.controls['providerId'].value,
      "startTime": moment(startDateAndTime).format('DD/MM/YYYY : hh:mm:ss A'),
      "appointmentTitle": "Empty Appointment Slot",
      "endTime": moment(endDateAndTime).format('DD/MM/YYYY : hh:mm:ss A'),
      "slothType": this.appointmentFormGroup.controls['serviceName'].value,
      "slothLocation": this.appointmentFormGroup.controls['location'].value,
    };
    this.saveProviderSlot(data);
  }

  saveProviderSlot(providerFormData: any) {
    this.spinner.show();
    this.providerService.PostProviderAppointmentInformation(this.userToken, this.providerData._id, providerFormData)
      .pipe(first())
      .subscribe(
        (res: any) => {
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

