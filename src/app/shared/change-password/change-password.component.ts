import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { providerService } from 'src/app/platform/provider-section/provider.service';
import { MainHomeService } from 'src/app/services/main-home.service';
import { CustomValidators } from 'src/app/utilities/custom.validator';
import { userService } from 'src/app/services/user.service';
import { authenticationService } from 'src/app/services/authentication.service';
import { first, pipe } from 'rxjs';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  changePassForm: FormGroup;
  userType: string = '';
  userEmail: string = '';
  isShowCurrentPassword = false;
  isShowNewPassword = false;
  isShowConfirmPassword = false;
  imgSrc: string = './assets/images/admin/eye.png';
  imgSrc2: string = './assets/images/admin/eye.png';
  imgSrc1: string = './assets/images/admin/eye.png';

  constructor(private apiService: MainHomeService, private formBuilder: FormBuilder, private providerService: providerService, private userService: userService, private authenticationService: authenticationService) {

    this.changePassForm = this.formBuilder.group({

      current_password: [null, [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,25}$'), CustomValidators.passwordStrength]],
      confirm_password: [null, [Validators.required, CustomValidators.passwordMatcher]],
      new_password: [null, [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,25}$'), CustomValidators.passwordStrength]],
    });
  }

  ngOnInit() {
    let userToken = localStorage.getItem('token') || null
    if (!!userToken) {
      this.getUSerDetailsByTokenRequest(userToken);
    } else {
      return
    }
  }


  showCurrentPassword() {
    this.isShowCurrentPassword = !this.isShowCurrentPassword;
    this.imgSrc = this.isShowCurrentPassword ? './assets/images/admin/hidden_eye.png' : './assets/images/admin/eye.png';
  }
  showNewPassword() {
    this.isShowNewPassword = !this.isShowNewPassword;
    this.imgSrc2 = this.isShowNewPassword ? './assets/images/admin/hidden_eye.png' : './assets/images/admin/eye.png';
  }
  showConfirmPassword() {
    this.isShowConfirmPassword = !this.isShowConfirmPassword;
    this.imgSrc1 = this.isShowConfirmPassword ? './assets/images/admin/hidden_eye.png' : './assets/images/admin/eye.png';
  }
  changePassword() {
    if (!this.changePassForm.valid) {
      return
    } else {
      let payload = {
        userType: this.userType,
        email: this.userEmail,
        currentPassword: this.changePassForm.controls['current_password'].value,
        newPassword: this.changePassForm.controls['new_password'].value
      }
      this.authenticationService.changeLoggedInUserPassword(payload).pipe(first()).subscribe((res: any) => {
        console.log("user details", res);
        this.apiService.successToster(res.message, "Success")
      }, (err: any) => {
        this.showError(err?.error?.message);
      }
      )
    }

  }

  getUSerDetailsByTokenRequest(data: any) {
    this.userService.getUserDataByToken(data)
      .pipe(first())
      .subscribe(
        (res: any) => {
          console.log("user details", res);

          this.authenticationService.setLoggedInUser(res);
          if (res.user_Type == "Provider") {
            // this.getProviderDataById(res._id)
            this.userType = res.user_Type;
            this.userEmail = res.email;
          }
          else if (res.user_Type == "Patient") {
            this.userType = res.user_Type;
            this.userEmail = res.email;

          }
          else if (res.user_Type == "Admin") {
            this.userType = res.user_Type;
            this.userEmail = res.email;

          }
          else if (res.user_Type == "Lab") {
            this.userType = res.user_Type;
            this.userEmail = res.email;
          }

        },
        (err: any) => {
          this.showError(err?.error?.message);
        }
      );
  }

  showError(error: any) {
    this.apiService.errorToster(error, 'Error!',);
  }
}
