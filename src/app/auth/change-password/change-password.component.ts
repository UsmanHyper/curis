import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { first, Observable } from 'rxjs';
import { authenticationService } from 'src/app/services/authentication.service';
import { MainHomeService } from 'src/app/services/main-home.service';
import { userService } from 'src/app/services/user.service';
import { CustomValidators } from 'src/app/utilities/custom.validator';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  passwordFormGroup: FormGroup;
  userToken: any;
  isShowPassword = false;
  isShowConfirmPassword = false;
  imgSrc: string = './assets/images/admin/eye.png';
  imgSrc1: string = './assets/images/admin/eye.png';


  constructor(public formBuilder: FormBuilder, private spinner: NgxSpinnerService, private userService: userService,
    private router: Router, private authenticationService: authenticationService, private apiService: MainHomeService) {
    this.passwordFormGroup = this.formBuilder.group({
      password: [null, [Validators.required]],
      confirm_password: [null, Validators.required, this.confirmationValidator],
    });

  }

  ngOnInit() {


  }

  noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }
  confirmationValidator = (control: FormControl): Promise<any> | Observable<any> => {
    return new Promise((resolve) => {
      if (!control.value) {
        resolve({ error: true, required: true });
      } else if (control.value !== this.passwordFormGroup.controls['password'].value) {
        resolve({ confirm: true, error: true });
      } else {
        resolve(null); // Validation passed
      }
    });
  };


  showPassword() {
    this.isShowPassword = !this.isShowPassword;
    this.imgSrc = this.isShowPassword ? './assets/images/admin/hidden_eye.png' : './assets/images/admin/eye.png';
  }
  showConfirmPassword() {
    this.isShowConfirmPassword = !this.isShowConfirmPassword;
    this.imgSrc1 = this.isShowConfirmPassword ? './assets/images/admin/hidden_eye.png' : './assets/images/admin/eye.png';
  }



  changePassword() {

  }



}

