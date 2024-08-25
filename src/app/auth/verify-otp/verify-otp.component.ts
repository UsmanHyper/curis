import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { first, Subscription, take, timer } from 'rxjs';
import { authenticationService } from 'src/app/services/authentication.service';
import { MainHomeService } from 'src/app/services/main-home.service';
import { userService } from 'src/app/services/user.service';
import { CustomValidators } from 'src/app/utilities/custom.validator';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.scss']
})
export class VerifyOtpComponent implements OnInit {
  otpForm: FormGroup;
  initialState: any;
  payload: any;
  otp: any;
  sendOtpAgian: boolean = false
  countDown: Subscription = new Subscription;
  counter = 60;
  tick = 1000;
  @ViewChild('ngOtpInput', { static: false }) ngOtpInput: any;
  @ViewChild('ngOtpInput') ngOtpInputRef: any;
  config = {
    allowNumbersOnly: false,
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    FormControlName: 'otp',
    inputStyles: {
      'width': '80px',
      'height': '80px',
      'margin-right': '10px',
      'margin-left': '10px',
      'border': '2px solid #0086c9',
      'color': '#0086C9'
    }

  }



  constructor(public formBuilder: FormBuilder, private spinner: NgxSpinnerService, private userService: userService,
    private router: Router, private authenticationService: authenticationService, private apiService: MainHomeService) {

    this.otpForm = this.formBuilder.group({
      otp: new FormControl("", [Validators.required,]),
    });
  }

  ngOnInit() {
    this.otpCounter()

    this.payload = this.initialState.payload
  }



  
  otpCounter() {
    this.countDown = timer(0, this.tick)
      .pipe(take(this.counter))
      .subscribe(() => {
        --this.counter;
        if (this.counter == 0) {
          this.sendOtpAgian = true;
          this.countDown.unsubscribe();
        }
      });
  }

  verifyOtp() {
    let payload = {
      // email: this.payload.email,
      // otpType: this.payload.otpType,
      // otp: this.otpForm.controls['otp'].value
    }

    // this.onSuccess.emit("otpVerified")

    // this.apiService.verifyOTP(payload).pipe(first())
    //   .subscribe(
    //     (res: any) => {
    //       // this.bsModalRef.hide()
    //       // this.dss.sendSignal({ type: "otpVerified", data: res, })
    //     },
    //     (err: any) => {
    //       // this.spinner.hide();
    //       // this.showError(err?.error?.message?.description);
    //     }
    //   );

      this.router.navigateByUrl('/reset-password')
  }

  onOtpChange(otp: any) {
    this.otp = otp;
    if (this.otp.length === 4) {
      this.otpForm.get('otp')?.setValue(this.otp);
    }
    else {
      this.otpForm.reset()
    }
  }

  transform(value: number): string {
    const minutes: number = Math.floor(value / 60);
    return (
      ('00' + minutes).slice(-2) +
      ':' +
      ('00' + Math.floor(value - minutes * 60)).slice(-2)
    );
  }
  resendOTP() {
    if (this.sendOtpAgian === true) {
      this.counter = 60;
      this.sendOtpAgian = false;
      this.otpCounter()
      this.ngOtpInputRef.setValue(null);
      this.generateOtp();
      // const slug =new URL(`${environment.baseUrl}/users/authentication/forgot`);
      // const payload = { email: this.email };
      // this.apiService.post(slug.href, payload).subscribe((resp: any) => {
      // }, (err: any) => {
      // });
    } else {
      return
    }

  }

  generateOtp() {
    this.apiService.getOTP(this.payload).pipe(first())
      .subscribe(
        (res: any) => {
          this.apiService.successToster("Check Your Email", 'OTP Re-Sent',)
        },
        (err: any) => {
        }
      );
  }


}

