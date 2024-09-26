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
import * as moment from 'moment';
import { adminService } from 'src/app/platform/admin-section/admin.service';


@Component({
  selector: 'app-patient-view-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,],
  templateUrl: './patient-view-modal.component.html',
  styleUrls: ['./patient-view-modal.component.scss']
})
export class PatientViewModalComponent implements OnInit {
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
    private providerService: providerService, private authenticationService: authenticationService, private adminServices: adminService) {


    this.appointmentForm = this.fb.group({
      f_name: ["",],
      l_name: ["",],
      gender: ["",],
      email: ['',],
      user_Type: ['']
    });


  }

  ngOnInit(): void {
    // this.providerData = this.providerService.getProviderData()
    // this.userToken = this.authenticationService.getUserToken();

    this.title = this.initialState.title
    // this.patchData(this.initialState.payload)
    this.patchData(this.initialState.payload)
  }




  closeModal() {
    // this.dss.sendSignal({ type: 'patientInteraction-saved', data: "success" })
    this.appointmentForm.reset();
    this.bsModalRef.hide()

  }


  showError(error: any) {
    this.apiService.errorToster(error, 'Error!',);
  }


  patchData(data: any) {

    let dt = data;

    this.appointmentForm.get('f_name')?.setValue(dt.f_name);
    this.appointmentForm.get('l_name')?.setValue(dt.l_name);
    this.appointmentForm.get('email')?.setValue(dt.email);
    this.appointmentForm.get('gender')?.setValue(dt.gender);
    this.appointmentForm.get('user_Type')?.setValue(dt.user_Type);


  }




}

