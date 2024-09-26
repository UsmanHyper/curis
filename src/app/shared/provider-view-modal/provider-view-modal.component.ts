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
  selector: 'app-provider-view-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,],
  templateUrl: './provider-view-modal.component.html',
  styleUrls: ['./provider-view-modal.component.scss']
})
export class ProviderViewModalComponent implements OnInit {
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
      practiceName: ['',],
      contact_no: ['',],
      mainSpeciality: ['',],
      practiceSize: ['',],
      roleAtPractice: ['',],
      addressLineOne: ['',],
      addressLineTwo: ['',],
      city: ['',],
      qualification: ['',],
      main_Speciality: ['',],
      subSpeciality: ['',],
      liciencedState: ['',],
      NPI_Number: ['',],
      zipcode: ['',],
    });


  }

  ngOnInit(): void {
    this.providerData = this.providerService.getProviderData()
    this.userToken = this.authenticationService.getUserToken();

    this.title = this.initialState.title
    // this.patchData(this.initialState.payload)
    this.getProviderData(this.initialState.payload)
  }




  closeModal() {
    // this.dss.sendSignal({ type: 'patientInteraction-saved', data: "success" })
    this.appointmentForm.reset();
    this.bsModalRef.hide()

  }


  showError(error: any) {
    this.apiService.errorToster(error, 'Error!',);
  }


  getProviderData(data: any) {
    this.adminServices.getProviderDetails(this.userToken, data._id).
      pipe(first())
      .subscribe(
        (res: any) => {
          let dt = res;

          this.appointmentForm.get('f_name')?.setValue(dt.userId.f_name);
          this.appointmentForm.get('l_name')?.setValue(dt.userId.l_name);
          this.appointmentForm.get('email')?.setValue(dt.userId.email);
          this.appointmentForm.get('gender')?.setValue(dt.userId.gender);
          this.appointmentForm.get('contact_no')?.setValue(dt.userId.contact_no);

          this.appointmentForm.get('practiceName')?.setValue(dt.practiceName);
          this.appointmentForm.get('mainSpeciality')?.setValue(dt.mainSpeciality);
          this.appointmentForm.get('practiceSize')?.setValue(dt.practiceSize);
          this.appointmentForm.get('roleAtPractice')?.setValue(dt.roleAtPractice);
          this.appointmentForm.get('addressLineOne')?.setValue(dt.addressLineOne);
          this.appointmentForm.get('addressLineTwo')?.setValue(dt.addressLineTwo);
          this.appointmentForm.get('city')?.setValue(dt.city);
          this.appointmentForm.get('zipcode')?.setValue(dt.zipcode);

          this.appointmentForm.get('qualification')?.setValue(dt.qualification);
          this.appointmentForm.get('main_Speciality')?.setValue(dt.mainSpeciality);
          this.appointmentForm.get('subSpeciality')?.setValue(dt.subSpeciality);
          this.appointmentForm.get('liciencedState')?.setValue(dt.liciencedState);
          this.appointmentForm.get('NPI_Number')?.setValue(dt.NPI_Number);


        },
        (err: any) => {
          this.spinner.hide();
          this.showError(err?.error?.message?.description);
        }
      );
  }




}

