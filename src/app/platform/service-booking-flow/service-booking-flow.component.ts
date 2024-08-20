import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FooterComponent } from 'src/app/shared/footer/footer.component';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { defer, first, map, Observable } from 'rxjs';
import { authenticationService } from 'src/app/services/authentication.service';
import { Global } from '../../utilities/Global';
import { homeService } from 'src/app/services/home.service';
import { CustomValidators } from 'src/app/utilities/custom.validator';
import { CreditCardDirectivesModule, CreditCardValidators } from "angular-cc-library";
import { CreditCard } from 'angular-cc-library';
import { PaymentStatusComponent } from 'src/app/shared/payment-status/payment-status.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { MainHomeService } from 'src/app/services/main-home.service';
import { BsModalService, BsModalRef, ModalOptions, ModalModule } from 'ngx-bootstrap/modal';
import { VerifyOtpComponent } from 'src/app/shared/verify-otp/verify-otp.component';
import { DataSharingService } from 'src/app/services/data-sharing-servcie';


@Component({
  selector: 'app-service-booking-flow',
  templateUrl: './service-booking-flow.component.html',
  styleUrls: ['./service-booking-flow.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent, FormsModule, ReactiveFormsModule, CreditCardDirectivesModule, PaymentStatusComponent],
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



  public type$: Observable<string> | any;
  allGenders: any = [
    { name: 'Male', value: "male" },
    { name: 'Female', value: "female" },
    { name: 'Other', value: "other" }
  ]
  userform: FormGroup;

  ccForm: FormGroup;

  constructor(public formBuilder: FormBuilder, private apiService: MainHomeService, private spinner: NgxSpinnerService, private modalService: BsModalService, private dss: DataSharingService,) {


    this.userform = this.formBuilder.group({
      first_name: [null, [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/), CustomValidators.noWhiteSpace]],
      last_name: [null, [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/), CustomValidators.noWhiteSpace]],
      contact_number: [null, [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/), Validators.minLength(8), this.noWhitespaceValidator]],
      gender: ["Select your gender", [Validators.required]],
      dob: [null, [Validators.required]],
      email: [null, [Validators.required, CustomValidators.noWhiteSpace, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      notes: [null, [Validators.required]],

    })


    this.ccForm = this.formBuilder.group({
      email: [null, [Validators.required]],
      name: [null, [Validators.required]],
      region: [null, [Validators.required]],
      creditCard: [null, [CreditCardValidators.validateCCNumber]],
      expDate: ['', [CreditCardValidators.validateExpDate]],
      cvc: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(4)]]
    });


    const creditCardControl = this.ccForm.get('creditCard');
    if (creditCardControl) {
      this.type$ = defer(() => creditCardControl.valueChanges)
        .pipe(map((num: string) => CreditCard.cardType(num)));
    }
    // moveToCreateAccount
    this.dss.onSignal().subscribe((value: any) => {

      if (value && value.type === "otpVerified") {
        this.moveToCreateAccount()
      }
    })
  }


  ngOnInit() {
    this.type$.subscribe((type: any) => {
      console.log('Credit Card Type:', type);
    })
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


  goToNextField(controlName: string, nextField: HTMLInputElement) {
    const control = this.ccForm.get(controlName);
    if (control && control.valid) {
      nextField.focus();
    }
  }

  getCountryLov() {
    this.spinner.show();
    this.apiService.getLovs(6)
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
      otpType: 'patient'
    }
    this.apiService.getOTP(payload).pipe(first())
      .subscribe(
        (res: any) => {
          this.openModal('', payload,);
        },
        (err: any) => {
          this.spinner.hide();
          this.showError(err?.error?.message?.description);
        }
      );
  }


}
