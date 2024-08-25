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
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginFormGroup: FormGroup;
  userToken: any;
  isShowPassword = false;
  imgSrc: string = './assets/images/admin/eye.png';


  // loginView: boolean = true;
  // forgotPasswordView: boolean = false;
  // verifyOTP: boolean = false;
  // changePasswordView: boolean = false

  constructor(public formBuilder: FormBuilder, private spinner: NgxSpinnerService, private userService: userService,
    private router: Router, private authenticationService: authenticationService, private apiService: MainHomeService) {
    this.loginFormGroup = this.formBuilder.group({
      email: ["", [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/), CustomValidators.isEmail]],
      password: ["", [Validators.required]],
      remember: [false]
    });

  }

  ngOnInit() {
    this.authenticationService.setIsAuthenticated(false);
    const uName = localStorage.getItem('userEmail');
    const uPassword = localStorage.getItem('userPassword');
    if (!!uName && !!uPassword) {
      this.loginFormGroup.patchValue({
        email: uName,
        password: uPassword,
        remember: true
      });
    }
    this.loginFormGroup.get('remember')?.setValue(true)

  }



  loginUser() {

    let data = {
      "username": this.loginFormGroup.controls['email'].value,
      "password": this.loginFormGroup.controls['password'].value,
    }
    this.loginSubmitRequest(data);
  }

  showPassword() {
    this.isShowPassword = !this.isShowPassword;
    this.imgSrc = this.isShowPassword ? './assets/images/admin/hidden_eye.png' : './assets/images/admin/eye.png';
  }

  getUserId() {
    this.userToken = this.userService.getUserToken();
  }

  loginSubmitRequest(data: any) {
    this.spinner.show();
    this.apiService.loginUser(data)
      .pipe(first())
      .subscribe(
        (res: any) => {
          if (res.status == 201) {
            if (this.loginFormGroup.controls['remember'].value === true) {
              localStorage.setItem("userEmail", this.loginFormGroup.controls['email'].value);
              localStorage.setItem("userPassword", this.loginFormGroup.controls['password'].value);
            }
            this.authenticationService.setUserTokenData(res.token);
            this.userToken = res.token;
            localStorage.setItem('isLoggedIn', "true");
            this.getUSerDetailsBytokenRequest(this.userToken);
            this.authenticationService.setIsAuthenticated(true);
            this.spinner.hide();
          }
        },
        (err: any) => {
          this.spinner.hide();
          this.showError(err?.error?.message);
        }
      );
  }

  getUSerDetailsBytokenRequest(data: any) {
    this.spinner.show();
    this.userService.getUserDataByToken(data)
      .pipe(first())
      .subscribe(
        (res: any) => {
          this.authenticationService.setLoggedInUser(res);
          if (res.user_Type == "Provider") {
            this.getProviderDataById(res._id)
            this.router.navigate(['/providerDashboard']);
          }
          else if (res.user_Type == "Patient") {
            this.router.navigate(['/userDashboard']);
          }
          else if (res.user_Type == "Admin") {
            this.router.navigate(['/AdminDashboard']);
          }
          else if (res.user_Type == "Lab") {
            this.router.navigate(['/LabDashboard']);
          }

        },
        (err: any) => {
          this.spinner.hide();
          this.showError(err?.error?.message);
        }
      );
  }


  getProviderDataById(providerId: any) {
    this.spinner.show();
    this.authenticationService.getProviderDataById(this.userToken, providerId)
      .pipe(first())
      .subscribe(
        (res: any) => {
          this.authenticationService.setProviderData(res);
          this.spinner.hide();
        },
        (err: any) => {
          this.spinner.hide();
          this.showError(err?.error?.message?.description);
        }
      );
  }


  navToForgotPass() {
    this.router.navigateByUrl('/forgot-password');
    // this.loginView = false;
    // this.forgotPasswordView = true;
    // this.verifyOTP = false;
    // this.changePasswordView = false
  }


  showError(error: any) {
    this.apiService.errorToster(error, 'Error!',);
  }


}

