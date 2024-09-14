import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FooterComponent } from 'src/app/shared/footer/footer.component';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { defer, first, map, Observable } from 'rxjs';
import { authenticationService } from 'src/app/services/authentication.service';
import { CustomValidators } from 'src/app/utilities/custom.validator';
import { CreditCard } from 'angular-cc-library';
import { PaymentStatusComponent } from 'src/app/shared/payment-status/payment-status.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { MainHomeService } from 'src/app/services/main-home.service';
import { BsModalService, BsModalRef, ModalOptions, ModalModule } from 'ngx-bootstrap/modal';
import { VerifyOtpComponent } from 'src/app/shared/verify-otp/verify-otp.component';
import { DataSharingService } from 'src/app/services/data-sharing-servcie';
import { NgxMaskModule } from 'ngx-mask';
import { providerService } from '../provider-section/provider.service';
import * as moment from 'moment'

@Component({
  selector: 'app-service-booking-flow',
  templateUrl: './service-booking-flow.component.html',
  styleUrls: ['./service-booking-flow.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent, FormsModule, ReactiveFormsModule, PaymentStatusComponent, NgxMaskModule],
})
export class ServiceBookingFlowComponent implements OnInit {

  loggedIn: boolean = false;
  modalRef!: BsModalRef;

  emailInformationStepper: boolean = true;
  createAccountStepper: boolean = false;
  payFeeStepper: boolean = false;
  successfulStepper: boolean = false;
  isLoginPayFeeStepper: boolean = true;
  isLoginSuccessfulStepper: boolean = false;
  countryLov: any
  step1: boolean = false;
  step2: boolean = false;
  step3: boolean = false;
  step4: boolean = false;


  payStep1: boolean = false;
  payStep2: boolean = false;

  genderLov: any;
  data: any;
  selectedId: any;

  formattedDate: string = '';
  formattedStartTime: string = '';
  formattedEndTime: string = '';

  public type$: Observable<string> | any;
  // allGenders: any = [
  //   { name: 'Male', value: "male" },
  //   { name: 'Female', value: "female" },
  //   { name: 'Other', value: "other" }
  // ]
  userform: FormGroup;

  // ccForm: FormGroup;

  token: any = null;

  constructor(public formBuilder: FormBuilder, private apiService: MainHomeService, private spinner: NgxSpinnerService,
    private authenticationService: authenticationService, private modalService: BsModalService, private dss: DataSharingService, private providerService: providerService) {


    this.userform = this.formBuilder.group({
      first_name: [null, [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/), CustomValidators.noWhiteSpace]],
      last_name: [null, [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/), CustomValidators.noWhiteSpace]],
      contact_number: [null, [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/), Validators.minLength(8), this.noWhitespaceValidator]],
      gender: ["Select your gender", [Validators.required]],
      dob: [null, [Validators.required]],
      email: [null, [Validators.required, CustomValidators.noWhiteSpace, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      notes: [null, [Validators.required]],

    })


    this.dss.onSignal().subscribe((value: any) => {

      if (value && value.type === "otpVerified") {

        this.token = value.data.token;
        let payload = {
          email: this.userform.controls['email'].value,
          userType: 'Patient'
        }
        this.apiService.getPatientByEmail(this.token, payload).pipe(first())
          .subscribe(
            (res: any) => {
              let dt = res
              this.userform.patchValue({
                first_name: dt.f_name,
                last_name: dt.l_name,
                contact_number: dt.contact_no,
                gender: dt.gender,
                // dob: dt.dob || '',
                email: dt.email,
              })
              this.moveToCreateAccount()
            },
            (err: any) => {
              this.showError(err?.error?.message || 'Something Went Wrong');
            }
          );
      }
    })
  }


  ngOnInit() {
    this.type$.subscribe((type: any) => {
      console.log('Credit Card Type:', type);
    })

    this.getCountryLov()
    this.getGenderLov()


    let slot: any = localStorage.getItem('slotInfo');

    this.data = JSON.parse(slot);

    console.log("=============", this.data)

    this.formattedDate = moment(this.data.dateOnly).format('MMM DD');
    this.formattedStartTime = moment(this.data.startTimeOnly, 'HH:mm:ss').format('h:mm A');
    this.formattedEndTime = moment(this.data.endTimeOnly, 'HH:mm:ss').format('h:mm A');

  }


  formatCnic(event: any) {
    const input = event.target.value.replace(/\D/g, '').substring(0, 13);
    const formattedInput = input.replace(/^(\d{5})(\d{7})(\d{1})$/, '$1-$2-$3');
    event.target.value = formattedInput;
  }

  noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }


 

  getCountryLov() {
    this.spinner.show();
    this.apiService.getLovs(1)
      .pipe(first())
      .subscribe(
        (res: any) => {
          this.countryLov = res[0].lovs;
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



  moveToCreateAccount() {
    this.emailInformationStepper = false;
    this.createAccountStepper = true;
    this.payFeeStepper = false;
    this.successfulStepper = false;


    this.step1 = true;
    this.step2 = false;
    this.step3 = false;
    this.step4 = false;



  }


  confirmBooking() {
    let payload = {
      f_name: this.userform.controls['first_name'].value,
      l_name: this.userform.controls['last_name'].value,
      gender: this.userform.controls['gender'].value,
      user_Type: "Patient",
      email: this.userform.controls['email'].value,
      dob: this.userform.controls['dob'].value,
      contact_no: this.userform.controls['contact_number'].value,
      password: "test12345",
    }
    console.log("=================", payload)

    // let dataToSend = JSON.stringify(this.payload)
    // localStorage.setItem("PatientDetail", dataToSend)

    if (!!this.token) {
      this.authenticationService.setUserTokenData(this.token);
      this.getUserDetailsByTokenRequest(this.token);
    } else {
      this.signUpSubmitRequest(payload)
    }

    // this.formView = false;
    // this.scheduleView = false;
    // this.booking = true;
    // }
  }
  signUpSubmitRequest(data: any) {
    this.apiService.registerUser(data)
      .pipe(first())
      .subscribe(
        (res: any) => {
          if (res.success == true) {
            this.authenticationService.setUserTokenData(res.token);
            this.getUserDetailsByTokenRequest(res.token);

            //this.authenticationService.setIsAuthenticated(true);
          }
        },
        (err: any) => {
          // this.spinner.hide();
          // this.showError(err?.error?.message?.description);
        }
      );
  }







  moveToPay() {
    this.emailInformationStepper = false;
    this.createAccountStepper = false;
    this.payFeeStepper = true;
    this.successfulStepper = false;


    this.step1 = true;
    this.step2 = true;
  }
  moveToSuccess() {
    this.emailInformationStepper = false;
    this.createAccountStepper = false;
    this.payFeeStepper = false;
    this.successfulStepper = true;


    this.step1 = true;
    this.step2 = true;
    this.step3 = true;
  }

  getGenderLov() {
    this.spinner.show();
    this.apiService.getLovs(6)
      .pipe(first())
      .subscribe(
        (res: any) => {
          this.genderLov = res[0].lovs;
          this.spinner.hide();
        },
        (err: any) => {
          this.spinner.hide();
          this.showError(err?.error?.message?.description);
        }
      );
  }

  openModal(title?: any, payload?: any, description?: any) {

    let initialState: ModalOptions = { initialState: { titleData: title, payload: payload, description: description } };
    console.log("this this.initialState", initialState)
    this.modalRef = this.modalService.show(VerifyOtpComponent, {
      initialState,
      class: 'modal-dialog-centered modal-md',
      // ignoreBackdropClick: true,
      keyboard: false,
      animated: true,
      backdrop: true,
      // backdrop: 'static',
    });
  }
  generateOtp() {
    let payload = {
      email: this.userform.controls['email'].value,
      otpType: 'Patient'
    }
    this.apiService.getOTP(payload).pipe(first())
      .subscribe(
        (res: any) => {
          if (res.isPatient === true) {
            this.openModal('', payload,);
          }
        },
        (err: any) => {
          this.spinner.hide();
          this.moveToCreateAccount();
          if (err?.error?.isPatient === false) {
            this.apiService.successToster("Please Add Your Details ", 'Welcome!',);
          } else {
            this.showError(err?.error?.message || 'Something Went Wrong');
          }

        }
      );
  }





  // timeSelect(item: any) {
  //   this.selectedId = item._id;
  //   this.scheduleAppointment.get('time_slot')?.setValue(this.selectTime)
  //   this.submit();
  // }


  // submit() {
  //   this.formView = true;
  //   this.scheduleView = false;
  //   this.booking = false;
  // }

  // modalClose() {
  //   this.dialogRef.close();
  // }

  setScheduleAppintmentPayload(item: any) {
    let payload = {
      "isAvailable": false,
      "providerId": this.data?.providerId,
      "providerUserId": this.data?.userId,
      "patientId": item?._id,
      "slotDetails": this.data?._id,
      "email": this.userform.controls['email'].value,
      "appointmentTitle": this.userform.controls['first_name'].value + ` ` + this.userform.controls['last_name'].value,
      "patientNotes": this.userform.controls['notes'].value

    }
    console.log("=============", payload)

    this.schedulePatientAppointment(payload)
  }

  schedulePatientAppointment(data: any) {

    this.apiService.scheduleAppointment(data)
      .pipe(first())
      .subscribe(
        (res: any) => {
          console.log(res)
          let dt = res.data._id
          localStorage.setItem("appointmentId", dt)
          this.PayNow()
          // this.gender = res[0].lovs;
        },
        (err: any) => {
          // this.showError(err?.error?.message?.description);
        }
      );
  }

  getUserDetailsByTokenRequest(data: any) {
    console.log("===============", data)
    this.authenticationService.getDataByToken(data)
      .pipe(first())
      .subscribe(
        (res: any) => {
          if (res) {
            this.setScheduleAppintmentPayload(res)
            let response = JSON.stringify(res)
            localStorage.setItem("user_response", response)
            // this.authenticationService.setLoggedInUser(res);
            // if (res.user_Type == "Patient") {
            //   this.router.navigate(['/userDashboard']);
            // }
          }
        },
        (err: any) => {
          // this.spinner.hide();
          // this.showError(err?.error?.message?.description);
        }
      );
  }
  getProviderDataById(providerId: any, token: any) {
    // this.spinner.show();
    this.authenticationService.getProviderDataById(token, providerId)
      .pipe(first())
      .subscribe(
        (res: any) => {
          this.authenticationService.setProviderData(res);
          // this.spinner.hide();
        },
        (err: any) => {
          // this.spinner.hide();
          // this.showError(err?.error?.message?.description);
        }
      );
  }

  PayNow() {

    let response = localStorage.getItem("user_response") || ""
    let res = JSON.parse(response)
    let appointment_id = localStorage.getItem("appointmentId")
    let payload = {
      name: this.userform.controls['first_name'].value + this.userform.controls['last_name'].value,
      description: "Appointment for ",
      // description: "Appointment for " + this.dataSource.mainSpeciality,
      amount: 500,
      // amount: this.price,
      email: this.userform.controls['email'].value,
      appointment_id: appointment_id,
      userId: res._id

    }
    this.providerService.patientPaymentInformation(payload).pipe(first())
      .subscribe(
        (res: any) => {
          console.log("paynow resp", res)
          this.openURLInSameTab(res.sessionURL)

        },
        (err: any) => {
        });


  }

  openURLInSameTab(url: any) {
    window.open(`${url}`, '_self'); // '_self' opens in the same tab
  }

}
