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
  selector: 'app-patient-appointment-details',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,],
  templateUrl: './patient-appointment-details.component.html',
  styleUrls: ['./patient-appointment-details.component.scss']
})
export class PatientAppointmentDetailsComponent implements OnInit {
  title: any;
  initialState: any;

  providerData: any;
  userToken: any;
  appointmentForm: FormGroup;
  isEdit: boolean | any;




  constructor(
    private fb: FormBuilder, private router: Router, public bsModalRef: BsModalRef,
    private modalService: BsModalService, private dss: DataSharingService,
    private apiService: MainHomeService, private spinner: NgxSpinnerService,
    private providerService: providerService, private authenticationService: authenticationService) {


    this.appointmentForm = this.fb.group({
      f_name: [""],
      l_name: [""],
      gender: [""],
      email: [''],
      practiceName: [''],
      zipcode: [''],
      mainSpeciality: [''],
      city: [''],
      startTime: [''],
      endTime: [''],


    });


  }

  ngOnInit(): void {
    this.providerData = this.providerService.getProviderData()
    this.userToken = this.authenticationService.getUserToken();

    this.title = this.initialState.title
    this.patchData(this.initialState.payload)
  }




  closeModal() {
    this.dss.sendSignal({ type: 'patientInteraction-saved', data: "success" })
    this.appointmentForm.reset();
    this.bsModalRef.hide()

  }


  showError(error: any) {
    this.apiService.errorToster(error, 'Error!',);
  }


  patchData(data: any) {
    this.providerData = this.providerService.getProviderData()
    this.userToken = this.authenticationService.getUserToken();
    let patientData = data?.patientId
    this.appointmentForm.get('f_name')?.setValue(data[0].providerUserId?.f_name);
    this.appointmentForm.get('l_name')?.setValue(data[0].providerUserId?.l_name);
    this.appointmentForm.get('email')?.setValue(data[0].providerUserId?.email);
    this.appointmentForm.get('gender')?.setValue(data[0].providerUserId?.gender);

    this.appointmentForm.get('practiceName')?.setValue(data[0].providerId.practiceName);
    this.appointmentForm.get('zipcode')?.setValue(data[0].providerId.zipcode);
    this.appointmentForm.get('mainSpeciality')?.setValue(data[0].providerId.mainSpeciality);
    this.appointmentForm.get('city')?.setValue(data[0].providerId.city);

    this.appointmentForm.get('startTime')?.setValue(data[0].slothDetails?.startTime);
    this.appointmentForm.get('startTime')?.setValue(data[0].slothDetails?.startTime);

    this.appointmentForm.get('patientNotes')?.setValue(data[0].slothDetails?.patientNotes);
    this.appointmentForm.get('m_repots')?.setValue(data[0].medicalNotes);
    this.appointmentForm.get('investigation_ordered')?.setValue(data[0].investigationsOrdered);
    this.appointmentForm.get('prescription')?.setValue(data[0].prescription);
  }






  submitForm() {
    let payload = {
      medicalNotes: this.appointmentForm.controls['m_reports'].value,
      investigationsOrdered: this.appointmentForm.controls['investigation_ordered'].value,
      prescription: this.appointmentForm.controls['prescription'].value
    }

    let id = this.initialState.payload._id;
    this.providerService.putScheduledAppointments(this.userToken, id, payload)
      .pipe(first())
      .subscribe(
        (res: any) => {
          this.dss.sendSignal({ type: 'patientInteraction-saved', data: "success" })
        },
        (err: any) => {

          this.showError(err?.error?.message?.description);
        }
      );
  }

}
