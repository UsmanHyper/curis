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
  selector: 'app-lov-child-add-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,],
  templateUrl: './lov-child-add-modal.component.html',
  styleUrls: ['./lov-child-add-modal.component.scss']
})
export class LovChildAddModalComponent implements OnInit {
  title: any;
  initialState: any;
  childLOV: FormGroup;

  proproviderData: any;
  serviceLov: any;
  userToken: any;
  lovId: any;
  providersLocation: any;
  isEdit: boolean | any;
  cityLov: any;
  type: any;



  constructor(
    private fb: FormBuilder, private router: Router, public bsModalRef: BsModalRef,
    private modalService: BsModalService, private dss: DataSharingService,
    private apiService: MainHomeService, private spinner: NgxSpinnerService,
    private providerService: providerService, private authenticationService: authenticationService, private adminService: adminService) {


    this.childLOV = this.fb.group({
      value: ["",],

    });


  }

  ngOnInit(): void {
    this.userToken = this.authenticationService.getUserToken();
    this.lovId = this.initialState.payload
    this.type = this.initialState.type

    this.title = this.initialState.title
  }
  addLov() {


    if (this.type === "child") {
      let payload = {
        value: this.childLOV.controls['value'].value
      }

      this.addNewlov(this.initialState.payload, payload)
    } else if (this.type === "parent") {

      let payload = {
        name: this.childLOV.controls['value'].value
      }

      this.addNewlovParent(payload)

    }
  }

  addNewlov(locationId: any, dataToSet: any) {
    this.spinner.show();
    this.adminService.postLovsNewChild(this.userToken, locationId, dataToSet)
      .pipe(first())
      .subscribe(
        (res: any) => {
          this.closeModal();
          this.spinner.hide();
        },
        (err: any) => {
          this.spinner.hide();
        }
      );
  }


  addNewlovParent(data?: any) {
    this.spinner.show();
    this.adminService.postLovsNewParent(this.userToken, data)
      .pipe(first())
      .subscribe(
        (res: any) => {
          this.closeModal();
          this.spinner.hide();
        },
        (err: any) => {
          this.spinner.hide();
        }
      );
  }

  closeModal() {
    // this.dss.sendSignal({ type: 'patientInteraction-saved', data: "success" })
    this.childLOV.reset();
    this.bsModalRef.hide()

  }


  showError(error: any) {
    this.apiService.errorToster(error, 'Error!',);
  }







}

