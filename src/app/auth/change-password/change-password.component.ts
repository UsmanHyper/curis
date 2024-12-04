import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { first, Observable } from 'rxjs';
import { authenticationService } from 'src/app/services/authentication.service';
import { MainHomeService } from 'src/app/services/main-home.service';
import { userService } from 'src/app/services/user.service';
import { CustomValidators } from 'src/app/utilities/custom.validator';

// Custom confirmation validator as a factory function


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  passwordFormGroup!: FormGroup;
  userToken: any;
  isShowPassword = false;
  isShowConfirmPassword = false;
  imgSrc: string = './assets/images/admin/eye.png';
  imgSrc1: string = './assets/images/admin/eye.png';
  otpPayload: any
  notMatch: boolean;

  public confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.passwordFormGroup.controls['password'].value) {
      this.notMatch = true;
      return { confirm: true, error: true };

    }
    return {};
  };

  constructor(public formBuilder: FormBuilder, private spinner: NgxSpinnerService, private userService: userService,
    private router: Router, private authenticationService: authenticationService, private apiService: MainHomeService) {

    this.passwordFormGroup = this.formBuilder.group({
      password: [
        null,
        [
          Validators.required,
          Validators.pattern(
            '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,25}$'
          ),
          CustomValidators.passwordStrength,
        ],
      ],
      confirmPassword: [
        null,
        [
          Validators.required,
          this.confirmationValidator, CustomValidators.passwordMatcher
        ],
      ],
    });
    this.notMatch = true
  }


  ngOnInit() {

    let dt: any = localStorage.getItem("otp");
    if (!!dt) {

      console.log("otpPayload", dt)
      this.otpPayload = JSON.parse(dt)
    } else {

      this.router.navigate(['auth/forgot-password'])
    }
  }



  noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  showPassword() {
    this.isShowPassword = !this.isShowPassword;
    this.imgSrc = this.isShowPassword ? './assets/images/admin/hidden_eye.png' : './assets/images/admin/eye.png';
  }
  showConfirmPassword() {
    this.isShowConfirmPassword = !this.isShowConfirmPassword;
    this.imgSrc1 = this.isShowConfirmPassword ? './assets/images/admin/hidden_eye.png' : './assets/images/admin/eye.png';
  }


  changePassword() {
    if (this.passwordFormGroup.valid) {
      let payload = {
        email: this.otpPayload.email,
        userType: this.otpPayload.otpType,
        otp: this.otpPayload.otp,
        newPassword: this.passwordFormGroup.controls['password'].value
      }

      this.apiService.resetPassword(payload).pipe(first())
        .subscribe(
          (res: any) => {
            localStorage.removeItem('otp');
            this.router.navigateByUrl('auth/login')
          },
          (err: any) => {
            this.spinner.hide();
            if (err.success === false) {
              localStorage.removeItem('otp')
              this.router.navigateByUrl('auth/forgot-password');
            }
            // this.showError(err?.error?.message);
          }
        );
    }
    else {
      return
    }
  }
}

