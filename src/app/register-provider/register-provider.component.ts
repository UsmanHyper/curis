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
import { invalid } from 'moment';


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
  specialtyLov: any = [];
  practiceSize: any = [];
  roleAtPractice: any = [];
  statesLov: any = [];
  qualificationLov: any = [];
  cityLov: any = [];
  zipCodesLov: any = [];
  subSpecialtyLov: any = [];

  passwordVisibility: any = {
    currentPassword: false,
    newPassword: false,
    confirmPassword: false
  };

  imgSrc: string = './assets/images/admin/eye.png'
  filteredLocations: any[] = [];
  filteredCity: any[] = [];

  successTitle: any
  successResponse: any
  overallExperienceLov: any = [
    { name: "Less than 1 year", value: "Less than 1 year" },
    { name: "One", value: "1" },
    { name: "Two", value: "1" },
    { name: "Three", value: "1" },
    { name: "Four", value: "1" },
    { name: "Five", value: "1" },
    { name: "Six", value: "1" },
    { name: "Seven", value: "1" },
    { name: "Eight", value: "1" },
    { name: "Nine", value: "1" },
    { name: "Ten", value: "1" },
    { name: "More then 10 Year", value: "10+" }
  ];


  constructor(public formBuilder: FormBuilder, private apiService: MainHomeService, private spinner: NgxSpinnerService, private router: Router, private authenticationService: authenticationService) {

    this.personalInformationForm = this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/), CustomValidators.noWhiteSpace,CustomValidators.isAlphabetsAndSpace]],
      lastName: ["", [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/), CustomValidators.noWhiteSpace, CustomValidators.isAlphabetsAndSpace]],
      email: ["", [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/), CustomValidators.isEmail]],
      gender: ["Select your Gender", Validators.required],
      contactNumber: ["", Validators.required,],
      userType: ["Provider"]
    })


    // this.practiceInformationForm = this.formBuilder.group({
    //   practiceName: ["", [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/), CustomValidators.noWhiteSpace]],
    //   providersSpecialty: ["Provider Specialty", Validators.required],
    //   practiceSize: ["Practice Size (Number of Providers)", Validators.required],
    //   roleAtPractice: ["Role at Practice", Validators.required],
    //   zipCode: ["", Validators.required, Validators.maxLength(5), Validators.minLength(5), this.locationValidator],
    //   city: ["", Validators.required, this.cityValidator],
    //   addressLineOne: ["", Validators.required],
    //   addressLineTwo: [""],
    // });
    this.practiceInformationForm = this.formBuilder.group({
      practiceName: [
        "",
        [
          Validators.required,
          Validators.pattern(/^(\s*\S+\s*)*$/),
          CustomValidators.noWhiteSpace,
          CustomValidators.noEmptyValue,
          CustomValidators.isAlphabetsAndSpace
        ]
      ],
      providersSpecialty: ["Provider Specialty", [Validators.required, CustomValidators.noEmptyValue]],
      practiceSize: ["Practice Size (Number of Providers)", [Validators.required, CustomValidators.noEmptyValue]],
      roleAtPractice: ["Role at Practice", [Validators.required, CustomValidators.noEmptyValue]],
      zipCode: [
        "",
        [
          Validators.required,
          Validators.maxLength(5),
          Validators.minLength(5),
          
          CustomValidators.noEmptyValue
        ]
      ],
      city: [
        "",
        [
          Validators.required,
          this.cityValidator,
          CustomValidators.noEmptyValue
        ]
      ],
      addressLineOne: ["", [Validators.required, CustomValidators.noEmptyValue]],
      addressLineTwo: [""]
    });



    this.qualificationAndSkillsForm = this.formBuilder.group({
      qualification: ["Select Qualification", Validators.required],
      overallExperience: ["Select Experience (In years)", Validators.required],
      npiNumber: ["", [Validators.required, CustomValidators.isNumbers, Validators.maxLength(10), Validators.minLength(10)]],
      licensedState: ["Licensed State", Validators.required],
      subSpecialty: ["Sub Specialization", Validators.required],

    });

    this.accountInformationForm = this.formBuilder.group({
      password: [null, [Validators.required,]],
      confirmPassword: [null, [Validators.required,]]
    })



  }


  ngOnInit() {
    this.getGenderLov()
    this.getSpecialtiesLov()
    this.getSubSpecialtiesLov()
    this.getPracticeSizeLov()
    this.getCityLov();
    this.getPracticeRolesLov();
    this.getStatesLov()
    this.getZipCodeLov()
    // this.providerQualification()
    this.getSubSpecialtyLov()

    this.practiceInformationForm.get('providersSpecialty')?.valueChanges.subscribe(selectedValue => {
      this.onSpecialtySelect(selectedValue);
      this.qualificationAndSkillsForm.get('qualification')?.reset();
      this.qualificationAndSkillsForm.get('qualification')?.setValue('Select Qualification')
    });
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

  // Custom validator to check if the city is in filteredCity
  cityValidator(control: AbstractControl) {
    if (!control.value) return null; // Allow empty value, if required validation will handle this
    // const match = this.filteredCity.find(item => item.city === control.value);
    // return match ? null : { invalidCity: true };


    // Check if input length is at least 3 characters
    if (control.value.length >= 3) {
      const match = this.filteredCity.find(item => item.city === control.value); // Assuming item has a 'city' property
      return match ? null : { invalidCity: true };
    }

    return null; // If input length is less than 3, do not mark as invalid
  }


  isNextButtonDisabled(): boolean {
    let defaultProviderSpecialty = 'Provider Specialty';
    let defaultPracticeSize = 'Practice Size (Number of Providers)';
    let defaultRoleAtPractice = 'Role at Practice';
    const { providersSpecialty, practiceSize, roleAtPractice } = this.practiceInformationForm.controls;
    return this.practiceInformationForm.invalid ||
      (providersSpecialty.value === defaultProviderSpecialty ||
        practiceSize.value === defaultPracticeSize ||
        roleAtPractice.value === defaultRoleAtPractice);
  }

  qualificationAndSkillButtonDisabled(): boolean {
    const defaultQualification = 'Select Qualification';
    const defaultExperience = 'Select Experience (In years)';
    const defaultLicensedState = 'Licensed State';
    const defaultSubSpecialty = 'Sub Specialization';

    const { qualification, overallExperience, licensedState, subSpecialty } = this.qualificationAndSkillsForm.controls;
    return this.qualificationAndSkillsForm.invalid ||
      qualification.value === defaultQualification ||
      overallExperience.value === defaultExperience ||
      licensedState.value === defaultLicensedState ||
      subSpecialty.value === defaultSubSpecialty;
  }


  onKeyUpCity(event: KeyboardEvent) {
    const input = (event.target as HTMLInputElement).value;
    if (input.length >= 3) {
      this.apiService.getCity(input).subscribe((res: any) => {
        this.filteredCity = res.data;
      }, (err: any) => {
        this.filteredCity = [];
        this.apiService.errorToster("Zip Code Not Found", "Error");
        this.practiceInformationForm.get('city')?.setErrors({ invalidCity: true });
      });
    } else {
      this.filteredCity = [];
      this.practiceInformationForm.get('city')?.setErrors({ invalidCity: true });
    }
  }

  selectCity(item: any) {
    this.filteredCity = [];
    this.practiceInformationForm.get('city')?.setValue(item);
    this.practiceInformationForm.get('city')?.updateValueAndValidity(); // Re-validate
  }



  // Custom validator to check if zipCode is in filteredLocations
  // locationValidator(control: AbstractControl) {
  //   if (!control.value) return null; // Allow empty value; required validation will handle this

  //   // Check if input length is at least 3 characters and if filteredLocations has items
  //   if (control.value.length >= 3 ) {
  //     const match = this.filteredLocations.find(item => item.zipCode === control.value); // Adjust property name if needed
  //     return match ? null : { invalidLocation: true };
  //   }

  //   return null; // If input length is less than 3 or no locations to match, do not mark as invalid
  // }

  // Call this function manually when you want to check and set the error status
validateZipCode() {
  const zipCodeControl = this.practiceInformationForm.get('zipCode');

  // Perform validation
  if (zipCodeControl?.value && zipCodeControl.value.length >= 3) {
    const match = this.filteredLocations.find(item => item.zipCode === zipCodeControl.value);
    if (!match) {
      // If no match, set the control to invalid with an error
      zipCodeControl.setErrors({ invalidLocation: true });
    } else {
      // Clear any previous errors if match is found
      zipCodeControl.setErrors(null);
    }
  } else {
    // Clear any previous errors if the value is not long enough
    zipCodeControl?.setErrors(null);
  }
}


  onKeyUp(event: KeyboardEvent) {
    const input = (event.target as HTMLInputElement).value;
    if (input.length >= 3) {
      this.apiService.getLocations(input).subscribe((res: any) => {
        this.filteredLocations = res.data;
        console.log("---------------", res.data);
      }, (err: any) => {
        this.filteredLocations = [];
        this.apiService.errorToster("Zip Code Not Found", "Error")
        this.practiceInformationForm.get('zipCode')?.setErrors({ invalid: true });
      });
    } else {
      // this.filteredLocations = [];
      this.practiceInformationForm.get('zipCode')?.setErrors({ invalid: true });
    }
  }

  selectLocation(item: any) {

    this.practiceInformationForm.get('zipCode')?.setValue(item);
    this.validateZipCode()
    this.practiceInformationForm.get('zipCode')?.updateValueAndValidity(); // Re-validate
    this.filteredLocations = [];

  }



  onSpecialtySelect(selectedValue: string) {
    switch (selectedValue) {
      case "Cardiologist":
        this.providerQualification(21);
        break;
      case "Dermatologist":
        this.providerQualification(22);
        break;
      case "Mental Health":
        this.providerQualification(23);
        break;
      case "OB-GYN":
        this.providerQualification(24);
        break;
      case "Optometrist":
        this.providerQualification(25);
        break;
      case "Primary Care":
        this.providerQualification(26);
        break;
      case "Diagnostic Lab":
        this.providerQualification(27);
        break;
      case "Dentist":
        this.providerQualification(28);
        break;
      default:
        console.warn('Selected specialty does not have a mapped ID.');
        break;
    }
  }

  // Your existing function




  // onKeyUpCity(event: KeyboardEvent) {
  //   const input = (event.target as HTMLInputElement).value;
  //   if (input.length >= 3) {
  //     this.apiService.getCity(input).subscribe((res: any) => {
  //       this.filteredCity = res.data;
  //       console.log("---------------", res.data);
  //     }, (err: any) => {
  //       this.filteredCity = [];
  //       this.apiService.errorToster("Zip Code Not Found", "Error")
  //       this.practiceInformationForm.get('city')?.invalid
  //     }
  //     );
  //   } else {
  //     this.filteredCity = [];
  //   }
  // }

  // selectCity(item: any) {
  //   this.filteredCity = [];
  //   this.practiceInformationForm.get('city')?.setValue(item)
  // }







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
      // "gender": (this.personalInformationForm.controls['gender'].value).toLowerCase(),
      "user_Type": this.personalInformationForm.controls['userType'].value,
      "contact_no": this.personalInformationForm.controls['contactNumber'].value,

      "practiceName": this.practiceInformationForm.controls['practiceName'].value,
      "practiceSpecialization": this.practiceInformationForm.controls['providersSpecialty'].value,
      "practiceSize": this.practiceInformationForm.controls['practiceSize'].value,
      "roleAtPractice": this.practiceInformationForm.controls['roleAtPractice'].value,
      "zipcode": this.practiceInformationForm.controls['zipCode'].value,
      "city": this.practiceInformationForm.controls['city'].value,
      "addressLineOne": this.practiceInformationForm.controls['addressLineOne'].value,
      "addressLineTwo": this.practiceInformationForm.controls['addressLineTwo']?.value || "",

      "qualification": this.qualificationAndSkillsForm.controls['qualification'].value,
      "mainSpecialty": this.practiceInformationForm.controls['providersSpecialty'].value,
      "subSpecialty": this.qualificationAndSkillsForm.controls['subSpecialty'].value,
      "licensedState": this.qualificationAndSkillsForm.controls['licensedState'].value,
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
            this.successTitle = "Go To Dashboard";
            this.successResponse = res.token

            // this.getUserDetailsByTokenRequest(res.token);
            this.authenticationService.setIsAuthenticated(true);
            // localStorage.setItem("isLoggedIn", "true");
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


    let dt = this.practiceInformationForm.value

    this.practiceInformationForm.get("providersSpecialty")?.setValue(dt.providersSpecialty)
    this.practiceInformationForm.get("practiceSize")?.setValue(dt.practiceSize)
    this.practiceInformationForm.get("zipCode")?.setValue(dt.zipCode)
    this.practiceInformationForm.get("addressLineOne")?.setValue(dt.addressLineOne)
    this.practiceInformationForm.get("addressLineTwo")?.setValue(dt.addressLineTwo)
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
          let dt = res[0].lovs;
          // dt.forEach((elem: any) => {
          //   elem.value = this.capitalizeFirstLetter(elem.value);
          // });
          this.genderLov = dt
          this.spinner.hide();
        },
        (err: any) => {
          this.spinner.hide();
          this.showError(err?.error?.message?.description);
        }
      );
  }

  capitalizeFirstLetter(str: string): string {
    return str
      .split(' ') // Split the string into an array of words
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
      .join(' '); // Join the words back into a single string

  }

  getSpecialtiesLov() {
    this.spinner.show();
    this.apiService.getLovs(4)
      .pipe(first())
      .subscribe(
        (res: any) => {
          this.specialtyLov = res[0].lovs;
          this.spinner.hide();
        },
        (err: any) => {
          this.spinner.hide();
          this.showError(err?.error?.message?.description);
        }
      );
  }

  getSubSpecialtiesLov() {
    this.spinner.show();
    this.apiService.getLovs(4)
      .pipe(first())
      .subscribe(
        (res: any) => {
          this.specialtyLov = res[0].lovs;
          this.spinner.hide();
        },
        (err: any) => {
          this.spinner.hide();
          this.showError(err?.error?.message?.description);
        }
      );
  }

  getPracticeSizeLov() {
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
  getPracticeRolesLov() {
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


  getZipCodeLov() {
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
  providerQualification(id: number) {
    this.spinner.show();
    this.apiService.getLovs(id)
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

  getSubSpecialtyLov() {
    this.spinner.show();
    this.apiService.getLovs(5)
      .pipe(first())
      .subscribe(
        (res: any) => {
          this.subSpecialtyLov = res[0].lovs;
          this.spinner.hide();
        },
        (err: any) => {
          this.spinner.hide();
          this.showError(err?.error?.message?.description);
        }
      );
  }

  getUserDetailsByTokenRequest(data: any) {
    this.spinner.show();
    this.authenticationService.getDataByToken(data)
      .pipe(first())
      .subscribe(
        (res: any) => {
          if (res) {
            // this.authenticationService.setLoggedInUser(res);
            // if (res.user_Type == "Provider") {
            //   this.getProviderDataById(res._id, data);
            //   this.router.navigate(['/providerDashboard']);
            // }
            // else if (res.user_Type == "Patient") {
            //   this.router.navigate(['/userDashboard']);
            // }
            // else if (res.user_Type == "Admin") {
            //   this.router.navigate(['/AdminDashboard']);
            // }
            // else if (res.user_Type == "Lab") {
            //   this.router.navigate(['/LabDashboard']);
            // }
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

