import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { first } from 'rxjs';
import { authenticationService } from 'src/app/services/authentication.service';
import { MainHomeService } from 'src/app/services/main-home.service';
import { userService } from 'src/app/services/user.service';
import { CustomValidators } from 'src/app/utilities/custom.validator';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotFormGroup: FormGroup;





  constructor(public formBuilder: FormBuilder, private spinner: NgxSpinnerService, private userService: userService,
    private router: Router, private authenticationService: authenticationService, private apiService: MainHomeService) {

    this.forgotFormGroup = this.formBuilder.group({
      email: ["", [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/), CustomValidators.isEmail]],

    });
  }

  ngOnInit() {

  }



  verifyEmail() {

    let data = {
      "email": this.forgotFormGroup.controls['email'].value,
    }
    if (this.forgotFormGroup.valid) {
      this.checkEmail();
    } else {
      return
    }
  }




  checkEmail() {
    let payload = {
      email: this.forgotFormGroup.controls['email'].value
    }
    this.apiService.checkEmail(payload).pipe(first())
      .subscribe(
        (res: any) => {
          if (!!res) {
            if (res.isPatient === true) {
              let payload = {
                email: this.forgotFormGroup.controls['email'].value,
                otpType: 'Patient'
              }
              this.sendOTP(payload)
            } else if (res.isProvider === true) {

              let payload = {
                email: this.forgotFormGroup.controls['email'].value,
                otpType: 'Provider'
              }

              this.sendOTP(payload)
            }
          }

        },
        (err: any) => {
          this.spinner.hide();
          this.apiService.successToster(err?.error?.message, 'Success');
        }
      );
  }

  sendOTP(value: any) {
    localStorage.setItem('otp', JSON.stringify(value));
    this.apiService.getOTP(value).pipe(first())
      .subscribe(
        (res: any) => {
          this.apiService.successToster("Check Your Email", 'OTP Sent',)
          // this.router.navigateByUrl('verify-otp')
          this.router.navigate(['auth/verify-otp'])
          // this.router.navigate(['verify-otp', JSON.stringify(value)])
        },
        (err: any) => {
        }
      );
  }
}





