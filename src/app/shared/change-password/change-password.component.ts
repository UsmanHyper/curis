import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { providerService } from 'src/app/platform/provider-section/provider.service';
import { MainHomeService } from 'src/app/services/main-home.service';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  changePassForm: FormGroup;


  isShowCurrentPassword = false;
  isShowNewPassword = false;
  isShowConfirmPassword = false;
  imgSrc: string = './assets/images/admin/eye.png';
  imgSrc2: string = './assets/images/admin/eye.png';
  imgSrc1: string = './assets/images/admin/eye.png';

  constructor(private apiService: MainHomeService, private formBuilder: FormBuilder, private providerService: providerService) {
    // constructor(private providerservice: providerService, private spinner: NgxSpinnerService, private apiService: MainHomeService, private authenticationservice: authenticationService, private formBuilder: FormBuilder, private global: Global, private homeService: homeService) {

    this.changePassForm = this.formBuilder.group({
      current_password: ["", [Validators.required,]],
      new_password: ["", [Validators.required,]],
      confirm_password: ["", [Validators.required,]],
    });
  }

  ngOnInit() {

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

  }

}
