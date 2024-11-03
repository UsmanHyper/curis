import { Component, OnInit } from '@angular/core';
import { providerService } from '../provider.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { first } from 'rxjs/operators';
import {
  FormBuilder,
  Validators,
  FormGroup,
  AbstractControl
} from "@angular/forms";
import { MainHomeService } from 'src/app/services/main-home.service';
import { authenticationService } from 'src/app/services/authentication.service';
import { CustomValidators } from 'src/app/utilities/custom.validator';



@Component({
  selector: 'app-provider-profile',
  templateUrl: './provider-profile.component.html',
  styleUrls: ['./provider-profile.component.scss']
})
export class ProviderProfileComponent implements OnInit {
  countryLov: any;
  stateLov: any;
  cityLov: any;
  languageLov: any;
  mainSpecialtyLov: any;
  subSpecialtyLov: any;
  practiceSize: any;
  roleAtPractice: any;
  genderLov: any;
  timeZoneLov: any;
  userToken: any;
  userData: any;
  providerData: any;
  zipCodesLov: any;
  qualificationLov: any;
  filteredLocations: any[] = [];
  filteredCity: any[] = [];

  showTextFelid: boolean = true


  personalInformationForm: FormGroup;
  practiceInformationForm: FormGroup;
  qualificationAndSkillsForm: FormGroup;

  constructor(private spinner: NgxSpinnerService, private apiService: MainHomeService, private formBuilder: FormBuilder,
    private providerService: providerService, private authenticationService: authenticationService) {

    this.personalInformationForm = this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/), CustomValidators.noWhiteSpace]],
      lastName: ["", [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/), CustomValidators.noWhiteSpace]],
      email: ["", [Validators.required,]],
      gender: ["Select your Gender", Validators.required],
      contactNumber: ["", Validators.required,],
    });


    this.practiceInformationForm = this.formBuilder.group({
      practiceName: ["", [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/), CustomValidators.noWhiteSpace]],
      providersSpeciality: ["Provider Specialty", Validators.required],
      practiceSize: ["Practice Size (Number of Providers)", Validators.required],
      roleAtPractice: ["Role at Practice", Validators.required],
      billingAddress: ["", Validators.required],
      billingAddresstwo: ["",],
      zipCode: [null, Validators.required,],
      city: [null, Validators.required,],
      // state: ["", Validators.required]
    });

    this.qualificationAndSkillsForm = this.formBuilder.group({
      qualification: ["Select qualification", Validators.required],
      mainSpecialization: ["Main specialization", Validators.required],
      subSpecialization: ["Sub specialization", Validators.required],
      practiceState: ["Licensed State", Validators.required],
      overallExperience: ["", Validators.required,],
      npiNumber: ["", [Validators.required,]],
    });

    this.fetchData()
    this.initializeData()

  }
  ngOnInit() {

  }


  async initializeData() {
    await Promise.all([
      this.getCityLov(),
      this.getCountryLov(),
      this.getLanguageLov(),
      this.getSubSpecialtyLov(),
      this.getPracticeRolesLov(),
      this.getPracticeSizeLov(),
      this.getStateLov(),
      this.getTimezoneLov(),
      this.getMainSpecialtyLov(),
      this.getGenderLov(),
      this.getZipCodeLov(),
      // this.providerQualification()

    ])
  }






  async fetchData() {
    return Promise.all([
      this.providerService.getProviderData(),
      this.authenticationService.getLoggedInUser(),
      this.authenticationService.getUserToken(),
    ])
      .then(([providerData, userData, userToken]) => {
        this.providerData = providerData;
        this.userData = userData;
        this.userToken = userToken;
        // Further logic after the promises resolve

        this.createPersonalInformationForm();

        setTimeout(() => {
          this.createPracticeInformationForm();
          this.createQualificationAndSkillsForm();

        }, 3000)

      })
      .catch(error => {
        console.error('Error during fetchData:', error);
        // Handle the error appropriately
      });
  }

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
  locationValidator(control: AbstractControl) {
    if (!control.value) return null; // Allow empty value; required validation will handle this

    // Check if input length is at least 3 characters and if filteredLocations has items
    if (control.value.length >= 3 && this.filteredLocations.length > 0) {
      const match = this.filteredLocations.find(item => item.zipCode === control.value); // Adjust property name if needed
      return match ? null : { invalidLocation: true };
    }

    return null; // If input length is less than 3 or no locations to match, do not mark as invalid
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
      this.filteredLocations = [];
      this.practiceInformationForm.get('zipCode')?.setErrors({ invalidCity: true });
    }
  }

  selectLocation(item: any) {
    this.filteredLocations = [];
    this.practiceInformationForm.get('zipCode')?.setValue(item);
    this.practiceInformationForm.get('zipCode')?.updateValueAndValidity(); // Re-validate

  }
  onSpecialitySelect(selectedValue: any) {
    console.log("=============", selectedValue)
    this.onSpecialtySelect(this.qualificationAndSkillsForm.controls['mainSpecialization'].value)
  }


  onSpecialtySelect(selectedValue: string) {
    this.showTextFelid = false;
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
        this.providerQualification(27);
        break;
      default:
        console.warn('Selected speciality does not have a mapped ID.');
        break;
    }
  }


  createPersonalInformationForm() {
    console.log("this.userData", this.userData)
    this.personalInformationForm.setValue({
      firstName: this.userData.f_name,
      lastName: this.userData.l_name,
      email: this.userData.email,
      gender: this.userData.gender,
      contactNumber: this.userData.contact_no
    });
  }

  createPracticeInformationForm() {
    console.log("this.userData", this.providerData)

    if (this.providerData === null || this.providerData == undefined) {
      let data: any = localStorage?.getItem("providerData");
      this.providerData = JSON.parse(data);
    }

    // Set values for practice information form
    this.practiceInformationForm.setValue({
      practiceName: this.providerData.practiceName,
      providersSpeciality: this.providerData.practiceSpecialization,
      practiceSize: this.providerData.practiceSize,
      roleAtPractice: this.providerData.roleAtPractice,
      billingAddress: this.providerData.addressLineOne ? this.providerData.addressLineOne : null,
      billingAddresstwo: this.providerData.addressLineTwo ? this.providerData.addressLineTwo : null,
      zipCode: this.providerData.zipcode,
      city: this.providerData.city,
      // state: this.providerData.liciencedState
    });
  }

  createQualificationAndSkillsForm() {

    console.log("this.userData----", this.providerData)

    if (this.providerData === null || this.providerData == undefined) {
      let data: any = localStorage?.getItem("providerData");
      this.providerData = JSON.parse(data);
    }

    if (this.providerData.qualification) {
      this.showTextFelid = true
    } else {
      this.showTextFelid = false
    }

    this.qualificationAndSkillsForm.setValue({
      qualification: this.providerData.qualification,
      mainSpecialization: this.providerData.mainSpeciality,
      subSpecialization: this.providerData.subSpeciality,
      practiceState: this.providerData.practiceState || null,
      overallExperience: this.providerData.experience || null,
      npiNumber: this.providerData.NPI_Number
    });
    console.log("this.userData----qualification", this.providerData.qualification)

    // setTimeout(() => {

    //   this.qualificationAndSkillsForm.get("qualification")?.setValue(this.providerData.qualification)
    // }, 3000);

  }

  // Assuming this is inside a function that handles the API response
  handleApiResponse(response: any) {
    // Set values for personal information form
    this.personalInformationForm.setValue({
      firstName: response.f_name,
      lastName: response.l_name,
      email: response.email,
      gender: response.gender,
      contactNumber: response.contact_no
    });

    // Set values for practice information form
    this.practiceInformationForm.setValue({
      practiceName: response.practiceName,
      providersSpeciality: response.practiceSpecialization,
      practiceSize: response.practiceSize,
      roleAtPractice: response.roleAtPractice,
      billingAddress: response.billingAddress,
      billingAddresstwo: response.billingAddresstwo,
      zipCode: response.zipcode,
      city: response.city,
      // state: response.practiceState
    });

    // Set values for qualification and skills form
    this.qualificationAndSkillsForm.setValue({
      qualification: response.qualification || 'Select qualification',
      mainSpecialization: response.mainSpeciality,
      subSpecialization: response.subSpeciality || "",
      practiceState: response.practiceState || '',
      overallExperience: response.experience || null,
      npiNumber: response.NPI_Number
    });
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

  submitProviderForm() {
    if (this.providerData) {
      let data = {
        "f_name": this.personalInformationForm.controls['firstName'].value,
        "l_name": this.personalInformationForm.controls['lastName'].value,
        "email": this.personalInformationForm.controls['email'].value,
        "gender": this.personalInformationForm.controls['gender'].value,
        "contact_no": this.personalInformationForm.controls['contactNumber'].value,

        "practiceName": this.practiceInformationForm.controls['practiceName'].value,
        "practiceSpecialization": this.practiceInformationForm.controls['providersSpeciality'].value,
        "practiceSize": this.practiceInformationForm.controls['practiceSize'].value,
        "roleAtPractice": this.practiceInformationForm.controls['roleAtPractice'].value,
        "billingAddress": this.practiceInformationForm.controls['billingAddress'].value,
        "billingAddresstwo": this.practiceInformationForm.controls['billingAddresstwo'].value,
        "zipcode": this.practiceInformationForm.controls['zipCode'].value,
        "city": this.practiceInformationForm.controls['city'].value,
        // "practiceState": this.practiceInformationForm.controls['state'].value,

        "qualification": this.qualificationAndSkillsForm.controls['qualification'].value,
        "mainSpeciality": this.qualificationAndSkillsForm.controls['mainSpecialization'].value,
        "subSpeciality": this.qualificationAndSkillsForm.controls['subSpecialization'].value || "",
        "practiceState": this.qualificationAndSkillsForm.controls['practiceState'].value,
        "experience": this.qualificationAndSkillsForm.controls['overallExperience'].value,
        "NPI_Number": this.qualificationAndSkillsForm.controls['npiNumber'].value,
      }
      let UserData = {
        "f_name": this.personalInformationForm.controls['firstName'].value,
        "l_name": this.personalInformationForm.controls['lastName'].value,
        "contact_no": this.personalInformationForm.controls['contactNumber'].value,

      }
      this.updateProviderDataById(data, this.providerData._id);
      this.updateUserDataById(UserData);
    }
    // else{
    //   let data={
    //     "userId":this.userData._id,
    //     "NPI_Number": this.providerFormGroup.controls['npiNumber'].value,
    //     "contact_one": this.providerFormGroup.controls['phone'].value,
    //     "city": this.providerFormGroup.controls['city'].value,
    //     "state":this.providerFormGroup.controls['state'].value,
    //     "country":this.providerFormGroup.controls['country'].value,
    //     "zipcode":this.providerFormGroup.controls['zip'].value,
    //     "address_office":this.providerFormGroup.controls['billingAddress'].value,
    //     "mainSpeciality":this.providerFormGroup.controls['speciality'].value,
    //     "subSpeciality":this.providerFormGroup.controls['subSpeciality'].value,
    //     "timezone":this.providerFormGroup.controls['timezone'].value,
    //     "gender":this.providerFormGroup.controls['gender'].value,
    //     "language":this.providerFormGroup.controls['language'].value,
    //   }
    //   let UserData={
    //     "f_name": this.providerFormGroup.controls['firstName'].value,
    //     "l_name": this.providerFormGroup.controls['lastName'].value,
    //   }
    //   this.saveProviderData(data);
    //   this.updateUserDataById(UserData);
    // }
  }

  get f() {
    return this.personalInformationForm.controls;
  }
  get f1() {
    return this.practiceInformationForm.controls;
  }
  get f2() {
    return this.qualificationAndSkillsForm.controls;
  }


  showError(error: any) {
    this.apiService.errorToster(error, 'Error!',);
  }



  getProviderData() {
    this.providerData = this.providerService.getProviderData();
  }


  updateProviderDataById(providerFormData: any, providerId: any) {
    this.spinner.show();
    this.providerService.updateProviderBasicInformation(this.userToken, providerFormData, providerId)
      .pipe(first())
      .subscribe(
        (res: any) => {
          this.providerService.setProviderData(res);
          this.getProviderData();
          this.spinner.hide();
        },
        (err: any) => {
          this.spinner.hide();
          this.showError(err?.error?.message?.description);
        }
      );
  }


  saveProviderData(providerFormData: any) {
    this.spinner.show();
    this.providerService.saveProviderBasicInformation(this.userToken, providerFormData)
      .pipe(first())
      .subscribe(
        (res: any) => {
          this.providerService.setProviderData(res);
          this.getProviderData();
          this.spinner.hide();
        },
        (err: any) => {
          this.spinner.hide();
          this.showError(err?.error?.message?.description);
        }
      );
  }

  updateUserDataById(userFormData: any) {
    this.spinner.show();
    this.apiService.updateUserBasicInformation(this.userToken, userFormData, this.userData._id)
      .pipe(first())
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          this.authenticationService.setLoggedInUser(res);
          this.userData = this.authenticationService.getLoggedInUser();
        },
        (err: any) => {
          this.spinner.hide();
          this.showError(err?.error?.message?.description);
        }
      );
  }


  getCountryLov() {
    this.spinner.show();
    this.providerService.getLovs(1)
      .pipe(first())
      .subscribe(
        (res: any) => {
          this.countryLov = res[0].lovs;
          this.spinner.hide();
        },
        (err: any) => {
          this.spinner.hide();
          this.showError(err?.error?.message?.description);
        }
      );
  }

  getGenderLov() {
    this.spinner.show();
    this.providerService.getLovs(6)
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

  getCityLov() {
    this.spinner.show();
    this.providerService.getLovs(3)
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

  getPracticeSizeLov() {
    this.spinner.show();
    this.providerService.getLovs(12)
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

  getStateLov() {
    this.spinner.show();
    this.providerService.getLovs(2)
      .pipe(first())
      .subscribe(
        (res: any) => {
          this.stateLov = res[0].lovs;
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
    this.providerService.getLovs(11)
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

  getLanguageLov() {
    this.spinner.show();
    this.providerService.getLovs(9)
      .pipe(first())
      .subscribe(
        (res: any) => {
          this.languageLov = res[0].lovs;
          this.spinner.hide();
        },
        (err: any) => {
          this.spinner.hide();
          this.showError(err?.error?.message?.description);
        }
      );
  }

  getMainSpecialtyLov() {
    this.spinner.show();
    this.providerService.getLovs(4)
      .pipe(first())
      .subscribe(
        (res: any) => {
          this.mainSpecialtyLov = res[0].lovs;
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
    this.providerService.getLovs(5)
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

  getTimezoneLov() {
    this.spinner.show();
    this.providerService.getLovs(10)
      .pipe(first())
      .subscribe(
        (res: any) => {
          this.timeZoneLov = res[0].lovs;
          this.spinner.hide();
        },
        (err: any) => {
          this.spinner.hide();
          this.showError(err?.error?.message?.description);
        }
      );
  }

}

