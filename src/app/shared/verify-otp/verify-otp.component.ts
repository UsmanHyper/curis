import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgOtpInputModule } from 'ng-otp-input';
import { first, Subscription, take, timer } from 'rxjs';
import { DataSharingService } from 'src/app/services/data-sharing-servcie';
import { MainHomeService } from 'src/app/services/main-home.service';

@Component({
  selector: 'app-verify-otp',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgOtpInputModule,],
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.scss']
})
export class VerifyOtpComponent implements OnInit {
  userPassword: FormGroup;
  initialState: any;
  @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
  startedClass = false;
  completedClass = false;
  preventAbuse = false;
  email: any;
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
  };

  constructor(
    private fb: FormBuilder, private router: Router, public bsModalRef: BsModalRef, private modalService: BsModalService, private dss: DataSharingService, private apiService: MainHomeService
  ) {
    this.userPassword = this.fb.group({
      otp: new FormControl("", [Validators.required,]),
    });
  }

  ngOnInit(): void {
    // this.titleChange.emit(' Verify Account')
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
      email: this.payload.email,
      otpType: this.payload.otpType,
      otp: this.userPassword.controls['otp'].value
    }

    // this.onSuccess.emit("otpVerified")

    this.apiService.verifyOTP(payload).pipe(first())
      .subscribe(
        (res: any) => {
          this.bsModalRef.hide()
          this.dss.sendSignal({ type: "otpVerified", data: res, })
        },
        (err: any) => {
          // this.spinner.hide();
          // this.showError(err?.error?.message?.description);
        }
      );
  }

  onOtpChange(otp: any) {
    this.otp = otp;
    if (this.otp.length === 4) {
      this.userPassword.get('otp')?.setValue(this.otp);
    }
    else {
      this.userPassword.reset()
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
