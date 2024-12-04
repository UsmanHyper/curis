import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  sendOtpAgain: boolean = false
  countDown: Subscription = new Subscription;
  counter = 10;
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

  otpPayload: any


  constructor(public formBuilder: FormBuilder, private spinner: NgxSpinnerService, private userService: userService, private route: ActivatedRoute,
    private router: Router, private authenticationService: authenticationService, private apiService: MainHomeService) {

    this.otpForm = this.formBuilder.group({
      otp: new FormControl("", [Validators.required,]),
    });
  }

  ngOnInit() {
    this.otpCounter()
    let dt: any = localStorage.getItem("otp");
    if (!!dt) {

      console.log("otpPayload", dt)
      this.otpPayload = JSON.parse(dt)
    } else {

      this.router.navigate(['auth/forgot-password'])
    }

  }




  otpCounter() {
    this.countDown = timer(0, this.tick)
      .pipe(take(this.counter))
      .subscribe(() => {
        --this.counter;
        if (this.counter == 0) {
          this.sendOtpAgain = true;
          this.countDown.unsubscribe();
        }
      });
  }

  verifyOtp() {
    if (this.otpForm.valid) {
      let payload = {
        email: this.otpPayload.email,
        otpType: this.otpPayload.otpType,
        otp: this.otpForm.controls['otp'].value
      }

      localStorage.setItem('otp', JSON.stringify(payload));
      // this.apiService.verifyOTP(payload).pipe(first())
      //   .subscribe(
      //     (res: any) => {
      this.router.navigateByUrl('auth/reset-password')
      //     },
      //     (err: any) => {
      //       // this.spinner.hide();
      //       // this.showError(err?.error?.message?.description);
      //     }
      //   );



    }
    else {
      return
    }
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
    if (this.sendOtpAgain === true) {
      this.counter = 60;
      this.sendOtpAgain = false;
      this.otpCounter()
      this.ngOtpInputRef.setValue(null);
      // this.generateOtp();
      this.sendOTP(this.otpPayload)
    } else {
      return
    }

  }

  sendOTP(value: any) {
    let payload = {
      email: value.email,
      otpType: value.otpType
    }
    this.apiService.getOTP(payload).pipe(first())
      .subscribe(
        (res: any) => {
          this.apiService.successToster("Check Your Email", 'OTP Re-Sent',)
        },
        (err: any) => {
        }
      );
  }




}

