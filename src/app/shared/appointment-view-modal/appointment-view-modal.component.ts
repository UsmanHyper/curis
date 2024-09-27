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
  selector: 'app-appointment-view-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,],
  templateUrl: './appointment-view-modal.component.html',
  styleUrls: ['./appointment-view-modal.component.scss']
})
export class AppointmentViewModalComponent implements OnInit {
  title: any;
  id: any;
  initialState: any;

  providerData: any;
  AppointmentData: any;

  userToken: any;
  appointmentForm: FormGroup;
  isEdit: boolean | any;




  constructor(
    private fb: FormBuilder, private router: Router, public bsModalRef: BsModalRef,
    private modalService: BsModalService, private dss: DataSharingService,
    private apiService: MainHomeService, private spinner: NgxSpinnerService, private adminServices: adminService,
    private providerService: providerService, private authenticationService: authenticationService) {


    this.appointmentForm = this.fb.group({
      f_name: ["", Validators.required],
      l_name: ["", Validators.required],
      email: ['', Validators.required],
      gender: ["", Validators.required],
      practiceName: ['', Validators.required],
      zipcode: ['', Validators.required],
      mainSpeciality: ['', Validators.required],
      city: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],


    });


  }

  ngOnInit(): void {




    this.providerData = this.providerService.getProviderData()
    this.userToken = this.authenticationService.getUserToken();
    this.title = this.initialState.title

    this.getProviderData(this.initialState.payload)
  }




  closeModal() {
    this.dss.sendSignal({ type: 'patientInteraction-saved', data: "success" })
    this.appointmentForm.reset();
    this.bsModalRef.hide()

  }


  showError(error: any) {
    this.apiService.errorToster(error, 'Error!',);
  }

  getProviderData(data: any) {
    console.log("-------------------", data)

    this.adminServices.getProviderDetails(this.userToken, data.providerUserId).
      pipe(first())
      .subscribe(
        (res: any) => {
          let combinedArray: any = []
          let dt: any = this.initialState.payload
          dt.forEach((ele: any) => {
            combinedArray.push(ele);
            res.forEach((elem: any) => {

              ele.providerItem = elem
            })
          });
          this.AppointmentData = combinedArray[0]

          this.appointmentForm.get('f_name')?.setValue(this.AppointmentData.providerItem.f_name);
          this.appointmentForm.get('l_name')?.setValue(this.AppointmentData.providerItem.l_name);
          this.appointmentForm.get('email')?.setValue(this.AppointmentData.providerItem.email);
          this.appointmentForm.get('gender')?.setValue(this.AppointmentData.providerItem.gender);

          this.appointmentForm.get('practiceName')?.setValue(this.AppointmentData.providerId.practiceName);
          this.appointmentForm.get('zipcode')?.setValue(this.AppointmentData.providerId.zipcode);
          this.appointmentForm.get('mainSpeciality')?.setValue(this.AppointmentData.providerId.mainSpeciality);
          this.appointmentForm.get('city')?.setValue(this.AppointmentData.providerId.city);


          this.appointmentForm.get('startTime')?.setValue(moment(this.AppointmentData.slotDetails.startTime).format('DD/MM/YYYY hh:mm a'));
          this.appointmentForm.get('endTime')?.setValue(moment(this.AppointmentData.slotDetails.endTime).format('DD/MM/YYYY hh:mm a'));

        },
        (err: any) => {
          this.spinner.hide();
          this.showError(err?.error?.message?.description);
        }
      );
  }








}
