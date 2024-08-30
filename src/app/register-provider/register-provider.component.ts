import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FooterComponent } from 'src/app/shared/footer/footer.component';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { defer, first, map, Observable } from 'rxjs';
import { CustomValidators } from 'src/app/utilities/custom.validator';
import { PaymentStatusComponent } from 'src/app/shared/payment-status/payment-status.component';
import { MainHomeService } from '../services/main-home.service';
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { NgxMaskModule } from 'ngx-mask';
import { authenticationService } from '../services/authentication.service';
import { RegistrationStatusComponent } from '../shared/registration-status/registration-status.component';


@Component({
  selector: 'app-register-provider',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent, FormsModule, ReactiveFormsModule, RegistrationStatusComponent, NgxSpinnerModule, NgxMaskModule],
  templateUrl: './register-provider.component.html',
  styleUrls: ['./register-provider.component.scss']
})
export class RegisterProviderComponent implements OnInit {


  emailStepper: boolean = true;
  personalInformationStepper: boolean = false;
  successfulStepper: boolean = false;



  practiceInformationStepper: boolean = false;
  skillsInformationStepper: boolean = false;
  accountInformationStepper: boolean = false;



  step0: boolean = false;
  step1: boolean = false;
  step2: boolean = false;
  step3: boolean = false;
  step4: boolean = false;
  step5: boolean = false;


  genderNotSelected: boolean = true


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
  zipCodesLov: any = [];
  subSpecialityLov: any = [];

  passwordVisibility: any = {
    currentPassword: false,
    newPassword: false,
    confirmPassword: false
  };

  imgSrc: string = './assets/images/admin/eye.png'


  constructor(public formBuilder: FormBuilder, private apiService: MainHomeService, private spinner: NgxSpinnerService, private router: Router, private authenticationService: authenticationService) {

    this.personalInformationForm = this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/), CustomValidators.noWhiteSpace]],
      lastName: ["", [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/), CustomValidators.noWhiteSpace]],
      email: ["", [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/), CustomValidators.isEmail]],
      gender: ["Select your Gender", Validators.required],
      contactNumber: ["", Validators.required,],
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
      password: [null, [Validators.required,]],
      confirmPassword: [null, [Validators.required,]]
    })



  }


  ngOnInit() {
    this.getGenderLov()
    this.getSpecialitiesLov()
    this.getSubSpecialitiesLov()
    this.getpracticeSizeLov()
    this.getCityLov();
    this.getpracticeRolesLov();
    this.getStatesLov()
    this.getzipCodeLov()
    this.providerQualification()
    this.getSubSpecialityLov()
  }
  // confirmationValidator = (control: FormControl): Promise<any> | Observable<any> => {
  //   return new Promise((resolve) => {
  //     console.log("------------------", control.value)
  //     console.log("------------------",  this.accountInformationForm.controls['password'].value)
  //     console.log("------------------",  this.accountInformationForm)
  //     if (!control.value) {
  //       resolve({ error: true, required: true });
  //     } else if (control.value !== this.accountInformationForm.controls['password'].value) {
  //       resolve({ confirm: true, error: true });
  //     } else {
  //       resolve(null); // Validation passed
  //     }
  //   });
  // };



  checkEmail() {
    let payload = {
      email: this.personalInformationForm.controls['email'].value
    }
    this.apiService.checkEmail(payload).pipe(first())
      .subscribe(
        (res: any) => {
          if (res.success == true && res.isPatient == true) {
            this.router.navigateByUrl('/auth')
          } else {
            this.nextMove()
          }
        },
        (err: any) => {
          this.spinner.hide();
          this.nextMove()
          this.apiService.successToster(err?.error?.message, 'Success');
        }
      );
  }

  nextMove(): void {
    this.personalInformationStepper = true;
    this.practiceInformationStepper = false;
    this.emailStepper = false;
    this.skillsInformationStepper = false;
    this.accountInformationStepper = false;
    this.successfulStepper = false;

    this.step0 = true;
  }


  confirmationValidator = (control: FormControl): Promise<any> | Observable<any> => {
    return new Promise((resolve) => {
      const password = this.accountInformationForm?.get('password')?.value;
      const confirmPassword = control.value;
      if (!confirmPassword) {
        resolve({ required: true });
      } else if (confirmPassword !== password) {
        resolve({ confirm: true });
      } else {
        resolve(null);       // Validation passed
      }
    });
  };




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



  signUpFormSubmission() {
    let data = {
      "f_name": this.personalInformationForm.controls['firstName'].value,
      "l_name": this.personalInformationForm.controls['lastName'].value,
      "email": this.personalInformationForm.controls['email'].value,
      "gender": this.personalInformationForm.controls['gender'].value,
      "user_Type": this.personalInformationForm.controls['userType'].value,
      "contact_no": this.personalInformationForm.controls['contactNumber'].value,

      "practiceName": this.practiceInformationForm.controls['practiceName'].value,
      "practiceSpecialization": this.practiceInformationForm.controls['providersSpeciality'].value,
      "practiceSize": this.practiceInformationForm.controls['practiceSize'].value,
      "roleAtPractice": this.practiceInformationForm.controls['roleAtPractice'].value,
      "zipcode": this.practiceInformationForm.controls['zipCode'].value,
      "city": this.practiceInformationForm.controls['city'].value,
      "addressLineOne": this.practiceInformationForm.controls['addressLineOne'].value,
      "addressLineTwo": this.practiceInformationForm.controls['addressLineTwo']?.value || "",

      "qualification": this.qualificationAndSkillsForm.controls['qualification'].value,
      "mainSpeciality": this.practiceInformationForm.controls['providersSpeciality'].value,
      "subSpeciality": this.qualificationAndSkillsForm.controls['subSpeciality'].value,
      "liciencedState": this.qualificationAndSkillsForm.controls['licienceState'].value,
      "experience": this.qualificationAndSkillsForm.controls['overallExperience'].value,
      "NPI_Number": this.qualificationAndSkillsForm.controls['npiNumber'].value,
      "password": this.accountInformationForm.controls['password'].value
    }
    this.signUpSubmitRequest(data);
  }


  signUpSubmitRequest(data: any) {
    this.spinner.show();
    this.apiService.registerUser(data)
      .pipe(first())
      .subscribe(
        (res: any) => {
          if (res.success == true) {
            this.authenticationService.setUserTokenData(res.token);
            this.getUserDetailsBytokenRequest(res.token);
            this.authenticationService.setIsAuthenticated(true);
            localStorage.setItem("isLoggedIn", "true");
          }
        },
        (err: any) => {
          this.spinner.hide();
          this.showError(err?.error?.message);
        }
      );
  }


  showError(error: any) {
    this.apiService.errorToster(error, 'Error!',);
  }

  moveToPracticeInfo() {
    this.personalInformationStepper = false;
    this.practiceInformationStepper = true;
    this.skillsInformationStepper = false;
    this.accountInformationStepper = false;
    this.successfulStepper = false;

    this.step1 = true;

    console.log("value", this.personalInformationForm.value)
    console.log("value", this.personalInformationForm.valid)
    console.log("value", this.personalInformationForm)
  }
  backToPracticeInfo() {
    this.personalInformationStepper = false;
    this.practiceInformationStepper = true;
    this.skillsInformationStepper = false;
    this.accountInformationStepper = false;
    this.successfulStepper = false;

    this.step2 = false;
    this.step3 = false;
    this.step4 = false;
  }


  backToQualification() {
    this.personalInformationStepper = false;
    this.practiceInformationStepper = false;
    this.skillsInformationStepper = true;
    this.accountInformationStepper = false;
    this.successfulStepper = false;
  }

  moveToAccountInfo() {
    this.personalInformationStepper = false;
    this.practiceInformationStepper = false;
    this.skillsInformationStepper = false;
    this.accountInformationStepper = true;
    this.successfulStepper = false;

    this.step3 = true
  }
  backToAccountInfo() {

    this.personalInformationStepper = false;
    this.practiceInformationStepper = false;
    this.skillsInformationStepper = true;
    this.accountInformationStepper = false;
    this.successfulStepper = false;

    this.step3 = false;
    this.step4 = false;
  }

  success() {
    this.personalInformationStepper = false;
    this.practiceInformationStepper = false;
    this.skillsInformationStepper = false;
    this.accountInformationStepper = false;
    this.successfulStepper = true;

    this.step4 = true

    this.signUpFormSubmission()
  }


  backToPersonalInfo() {
    this.personalInformationStepper = true;
    this.practiceInformationStepper = false;
    this.skillsInformationStepper = false;
    this.accountInformationStepper = false;
    this.successfulStepper = false;
    this.step1 = false;
    this.step2 = false;
    this.step3 = false;
    this.step4 = false;
  }
  nextToQualificationAndSkills() {
    this.personalInformationStepper = false;
    this.practiceInformationStepper = false;
    this.skillsInformationStepper = true;
    this.accountInformationStepper = false;
    this.successfulStepper = false;
    this.step2 = true;
  }


  getGenderLov() {
    this.spinner.show();
    this.apiService.getLovs(6)
      .pipe(first())
      .subscribe(
        (res: any) => {
          this.genderLov = res[0].lovs;
          this.spinner.hide();
        },
        (err: any) => {
          this.spinner.hide();
          this.showError(err?.error?.message?.description);
        }
      );
  }

  getSpecialitiesLov() {
    this.spinner.show();
    this.apiService.getLovs(4)
      .pipe(first())
      .subscribe(
        (res: any) => {
          this.specialityLov = res[0].lovs;
          this.spinner.hide();
        },
        (err: any) => {
          this.spinner.hide();
          this.showError(err?.error?.message?.description);
        }
      );
  }

  getSubSpecialitiesLov() {
    this.spinner.show();
    this.apiService.getLovs(4)
      .pipe(first())
      .subscribe(
        (res: any) => {
          this.specialityLov = res[0].lovs;
          this.spinner.hide();
        },
        (err: any) => {
          this.spinner.hide();
          this.showError(err?.error?.message?.description);
        }
      );
  }

  getpracticeSizeLov() {
    this.spinner.show();
    this.apiService.getLovs(12)
      .pipe(first())
      .subscribe(
        (res: any) => {
          this.practiceSize = res[0].lovs;
          this.spinner.hide();
        },
        (err: any) => {
          this.spinner.hide();
          this.showError(err?.error?.message?.description);
        }
      );
  }

  getCityLov() {
    this.spinner.show();
    this.apiService.getLovs(3)
      .pipe(first())
      .subscribe(
        (res: any) => {
          this.cityLov = res[0].lovs;
          this.spinner.hide();
        },
        (err: any) => {
          this.spinner.hide();
          this.showError(err?.error?.message?.description);
        }
      );
  }
  getpracticeRolesLov() {
    this.spinner.show();
    this.apiService.getLovs(11)
      .pipe(first())
      .subscribe(
        (res: any) => {
          this.roleAtPractice = res[0].lovs;
          this.spinner.hide();
        },
        (err: any) => {
          this.spinner.hide();
          this.showError(err?.error?.message?.description);
        }
      );
  }

  getStatesLov() {
    this.spinner.show();
    this.apiService.getLovs(2)
      .pipe(first())
      .subscribe(
        (res: any) => {
          this.statesLov = res[0].lovs;
          this.spinner.hide();
        },
        (err: any) => {
          this.spinner.hide();
          this.showError(err?.error?.message?.description);
        }
      );
  }


  getzipCodeLov() {
    this.spinner.show();
    this.apiService.getLovs(19)
      .pipe(first())
      .subscribe(
        (res: any) => {
          this.zipCodesLov = res[0].lovs;
          this.spinner.hide();
        },
        (err: any) => {
          this.spinner.hide();
          this.showError(err?.error?.message?.description);
        }
      );
  }
  providerQualification() {
    this.spinner.show();
    this.apiService.getLovs(20)
      .pipe(first())
      .subscribe(
        (res: any) => {
          this.qualificationLov = res[0].lovs;
          this.spinner.hide();
        },
        (err: any) => {
          this.spinner.hide();
          this.showError(err?.error?.message?.description);
        }
      );
  }

  getSubSpecialityLov() {
    this.spinner.show();
    this.apiService.getLovs(5)
      .pipe(first())
      .subscribe(
        (res: any) => {
          this.subSpecialityLov = res[0].lovs;
          this.spinner.hide();
        },
        (err: any) => {
          this.spinner.hide();
          this.showError(err?.error?.message?.description);
        }
      );
  }

  getUserDetailsBytokenRequest(data: any) {
    this.spinner.show();
    this.authenticationService.getDataByToken(data)
      .pipe(first())
      .subscribe(
        (res: any) => {
          if (res) {
            this.authenticationService.setLoggedInUser(res);
            if (res.user_Type == "Provider") {
              this.getProviderDataById(res._id, data);
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
          }
        },
        (err: any) => {
          this.spinner.hide();
          this.showError(err?.error?.message?.description);
        }
      );
  }


  getProviderDataById(providerId: any, token: any) {
    this.spinner.show();
    this.authenticationService.getProviderDataById(token, providerId)
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
}

