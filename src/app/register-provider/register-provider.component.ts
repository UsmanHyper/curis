import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FooterComponent } from 'src/app/shared/footer/footer.component';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { defer, first, map, Observable } from 'rxjs';
import { CustomValidators } from 'src/app/utilities/custom.validator';
import { PaymentStatusComponent } from 'src/app/shared/payment-status/payment-status.component';

@Component({
  selector: 'app-register-provider',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent, FormsModule, ReactiveFormsModule, PaymentStatusComponent],
  templateUrl: './register-provider.component.html',
  styleUrls: ['./register-provider.component.scss']
})
export class RegisterProviderComponent implements OnInit {


  personalInformationStepper: boolean = true;
  payFeeStepper: boolean = true;
  successfulStepper: boolean = true;



  practiceInformationStepper: boolean = true;
  skillsInformationStepper: boolean = true;
  accountInformationStepper: boolean = true;
  // successfulStepper : boolean= false;

  showPassword: boolean = false;
  showPasswordOnPress: boolean = false;

  allGenders: any = [
    { name: 'Male', value: "male" },
    { name: 'Female', value: "female" },
    { name: 'Other', value: "other" }
  ]

  personalInformationForm: FormGroup;
  practiceInformationForm: FormGroup;
  qualificationAndSkillsForm: FormGroup;
  accountInformationForm: FormGroup;

  genderLov: any = [];
  specialityLov: any = [];
  practiceSize: any = [];
  roleAtPractice: any = [];
  statesLov: any = [];
  qualificationLov: any = [];
  cityLov: any = [];

  passwordVisibility: any = {
    currentPassword: false,
    newPassword: false,
    confirmPassword: false
  };

  imgSrc: string = './assets/images/admin/eye.png'


  constructor(public formBuilder: FormBuilder) {

    this.personalInformationForm = this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/), CustomValidators.noWhiteSpace]],
      lastName: ["", [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/), CustomValidators.noWhiteSpace]],
      email: ["", [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/), CustomValidators.isEmail]],
      gender: ["Select your Gender", Validators.required],
      contactNumber: ["", Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/), Validators.minLength(8), this.noWhitespaceValidator],
      userType: ["Provider"]
    })


    this.practiceInformationForm = this.formBuilder.group({
      practiceName: ["", [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/), CustomValidators.noWhiteSpace]],
      providersSpeciality: ["Provider speciality", Validators.required],
      practiceSize: ["Practice Size", Validators.required],
      roleAtPractice: ["Role At Practice", Validators.required],
      zipCode: ["ZIP Code", Validators.required],
      city: ["Practice City", Validators.required],
      addressLineOne: ["", Validators.required],
      addressLineTwo: [""],
    });



    this.qualificationAndSkillsForm = this.formBuilder.group({
      qualification: ["Select qualification", Validators.required],
      overallExperience: ["", Validators.required],
      npiNumber: ["NPI number", [Validators.required,]],
      licienceState: ["Licensed State", Validators.required],
      subSpeciality: ["Sub specialization", Validators.required],
      // specialization: ["", Validators.required],
    });

    this.accountInformationForm = this.formBuilder.group({
      password: ["", [Validators.required,]],
      confirmPassword: ["", [Validators.required,]]
    })



  }


  ngOnInit() {

  }


  formatCnic(event: any) {
    const input = event.target.value.replace(/\D/g, '').substring(0, 13);
    const formattedInput = input.replace(/^(\d{5})(\d{7})(\d{1})$/, '$1-$2-$3');
    event.target.value = formattedInput;
  }

  noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  // showPassword() {
  //   this.imgSrc = this.passwordVisibility.currentPassword ? './assets/images/admin/hidden_eye.png' : './assets/images/admin/eye.png';
  // }
  toggleVisibility(field: string): void {
    this.passwordVisibility[field] = !this.passwordVisibility[field];
    if (field === "newPassword") {
      this.showNewPasswordConfirm()
    } else if (field === "confirmPassword") {
      this.showPasswordConfirm()
    } else if (field === "currentPassword") {
      // this.showPassword()
    }
  }



  showNewPasswordConfirm() {
    this.imgSrc = this.passwordVisibility.newPassword ? './assets/images/admin/hidden_eye.png' : './assets/images/admin/eye.png';
  }
  showPasswordConfirm() {
    this.imgSrc = this.passwordVisibility.confirmPassword ? './assets/images/admin/hidden_eye.png' : './assets/images/admin/eye.png';
  }
}

