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
    this.SubmitRequest(data);
  }


  SubmitRequest(data: any) {
    this.spinner.show();
    // this.apiService.loginUser(data)
    //   .pipe(first())
    //   .subscribe(
    //     (res: any) => {
    //       if (res.status == 201) {
    //         if (this.loginFormGroup.controls['remember'].value === true) {
    //           localStorage.setItem("userEmail", this.loginFormGroup.controls['email'].value);
    //           localStorage.setItem("userPassword", this.loginFormGroup.controls['password'].value);
    //         }
    //         this.authenticationService.setUserTokenData(res.token);
    //         this.userToken = res.token;
    //         localStorage.setItem('isLoggedIn', "true");
    //         this.getUSerDetailsBytokenRequest(this.userToken);
    //         this.authenticationService.setIsAuthenticated(true);
    //         this.spinner.hide();
    //       }
    //     },
    //     (err: any) => {
    //       this.spinner.hide();
    //       this.showError(err?.error?.message);
    //     }
    //   );


    this.router.navigateByUrl('/verify-otp')
  }



}

