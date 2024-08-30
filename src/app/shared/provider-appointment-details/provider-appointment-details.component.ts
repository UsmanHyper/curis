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
  selector: 'app-provider-appointment-details',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,],
  templateUrl: './provider-appointment-details.component.html',
  styleUrls: ['./provider-appointment-details.component.scss']
})
export class ProviderAppointmentDetailsComponent implements OnInit {
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
      f_name: ["", Validators.required],
      l_name: ["", Validators.required],
      gender: ["", Validators.required],
      email: ['', Validators.required],
      patientNotes: ['', Validators.required],
      m_reports: ["", Validators.required],
      investigation_ordered: ["", Validators.required],
      prescription: ["", Validators.required],

    });


  }

  ngOnInit(): void {
    this.providerData = this.providerService.getProviderData()
    this.userToken = this.authenticationService.getUserToken();
    console.log("---------", this.initialState)
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
    this.appointmentForm.get('f_name')?.setValue(patientData.f_name)
    this.appointmentForm.get('l_name')?.setValue(patientData.l_name)
    this.appointmentForm.get('email')?.setValue(patientData.email)
    this.appointmentForm.get('gender')?.setValue(patientData.gender)
    this.appointmentForm.get('patientNotes')?.setValue(patientData.patientNotes)
  }


  patientReport() {

  }

  updatePatientReport() {

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
