import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { first, Subscription, take, timer } from 'rxjs';
import { DataSharingService } from 'src/app/services/data-sharing-servcie';
import { MainHomeService } from 'src/app/services/main-home.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { providerService } from 'src/app/platform/provider-section/provider.service';
import { authenticationService } from 'src/app/services/authentication.service';
import * as moment from 'moment';
import { adminService } from 'src/app/platform/admin-section/admin.service';
import { CustomValidators } from 'src/app/utilities/custom.validator';

@Component({
  selector: 'app-provider-edit-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,],
  templateUrl: './provider-edit-modal.component.html',
  styleUrls: ['./provider-edit-modal.component.scss']
})
export class ProviderEditModalComponent implements OnInit {
  title: any;
  initialState: any;
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

  showTextFelid: boolean = true;

  overallExperienceLov: any = [
    { name: "Less than 1 year", value: "Less than 1 year" },
    { name: "One", value: "01" },
    { name: "Two", value: "02" },
    { name: "Three", value: "03" },
    { name: "Four", value: "04" },
    { name: "Five", value: "05" },
    { name: "Six", value: "06" },
    { name: "Seven", value: "07" },
    { name: "Eight", value: "08" },
    { name: "Nine", value: "09" },
    { name: "Ten", value: "10" },
    { name: "More then 10 Year", value: "10+" }
  ];

  personalInformationForm: FormGroup;
  practiceInformationForm: FormGroup;
  qualificationAndSkillsForm: FormGroup;

  constructor(private spinner: NgxSpinnerService, private apiService: MainHomeService, private formBuilder: FormBuilder, public bsModalRef: BsModalRef, private adminServices: adminService,
    private providerService: providerService, private authenticationService: authenticationService, private modalService: BsModalService, private dss: DataSharingService) {

    this.personalInformationForm = this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/), CustomValidators.noWhiteSpace, CustomValidators.noEmptyValue]],
      lastName: ["", [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/), CustomValidators.noWhiteSpace, CustomValidators.noEmptyValue]],
      email: ["", [Validators.required,]],
      gender: ["Select your Gender", Validators.required],
      contactNumber: ["", Validators.required,],
    });


    this.practiceInformationForm = this.formBuilder.group({
      practiceName: ["", [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/), CustomValidators.noWhiteSpace, CustomValidators.noEmptyValue]],
      providersSpecialty: ["Provider Specialty", Validators.required],
      practiceSize: ["Practice Size (Number of Providers)", Validators.required],
      roleAtPractice: ["Role at Practice", Validators.required],
      billingAddress: ["", Validators.required,],
      billingAddresstwo: ["",],
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
          CustomValidators.noEmptyValue
        ]
      ]
      // state: ["", Validators.required]
    });

    this.qualificationAndSkillsForm = this.formBuilder.group({
      qualification: ["Select qualification", Validators.required],
      mainSpecialization: ["Main specialization", Validators.required],
      subSpecialization: ["Sub specialization", Validators.required],
      licensedState: ["Licensed State", Validators.required],
      overallExperience: ["Select Experience (In years)", Validators.required,],
      npiNumber: ["", [Validators.required, CustomValidators.isNumbers, Validators.maxLength(10), Validators.minLength(10)]],
    });

    this.initializeData()

  }
  ngOnInit() {
    this.providerData = this.providerService.getProviderData()
    this.userToken = this.authenticationService.getUserToken();

    this.title = this.initialState.title
    // this.patchData(this.initialState.payload)
    this.getProviderData(this.initialState.payload)
  }




  closeModal() {
    this.dss.sendSignal({ type: 'admin-provider-update-saved', data: "success" })
    // this.appointmentForm.reset();
    this.bsModalRef.hide()

  }

  getProviderData(data: any) {
    this.adminServices.getProviderDetails(this.userToken, data._id).
      pipe(first())
      .subscribe(
        (res: any) => {
          let dt = res;
          console.log("============res", dt)

          this.personalInformationForm.get('firstName')?.setValue(dt.userId.f_name);
          this.personalInformationForm.get('lastName')?.setValue(dt.userId.l_name);
          this.personalInformationForm.get('email')?.setValue(dt.userId.email);
          this.personalInformationForm.get('gender')?.setValue(dt.userId.gender);
          this.personalInformationForm.get('contactNumber')?.setValue(dt.userId.contact_no);

          this.practiceInformationForm.get('practiceName')?.setValue(dt.practiceName);
          this.practiceInformationForm.get('providersSpecialty')?.setValue(dt.mainSpecialty);
          this.practiceInformationForm.get('practiceSize')?.setValue(dt.practiceSize);
          this.practiceInformationForm.get('roleAtPractice')?.setValue(dt.roleAtPractice);
          this.practiceInformationForm.get('billingAddress')?.setValue(dt.billingAddress);
          this.practiceInformationForm.get('billingAddresstwo')?.setValue(dt.billingAddresstwo);
          this.practiceInformationForm.get('city')?.setValue(dt.city);
          this.practiceInformationForm.get('zipCode')?.setValue(dt.zipcode);

          this.qualificationAndSkillsForm.get('qualification')?.setValue(dt.qualification);
          this.qualificationAndSkillsForm.get('mainSpecialization')?.setValue(dt.mainSpecialty);
          this.qualificationAndSkillsForm.get('subSpecialization')?.setValue(dt.subSpecialty);
          this.qualificationAndSkillsForm.get('licensedState')?.setValue(dt.licensedState);
          this.qualificationAndSkillsForm.get('npiNumber')?.setValue(dt.NPI_Number);
          this.qualificationAndSkillsForm.get('overallExperience')?.setValue(dt.experience);

          this.onSpecialtySelect(this.qualificationAndSkillsForm.controls['mainSpecialization'].value)

        },
        (err: any) => {
          this.spinner.hide();
          this.showError(err?.error?.message?.description);
        }
      );
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



  // Custom validator to check if the city is in filteredCity
  cityValidator(control: AbstractControl) {
    if (!control.value) return null; // Allow empty value, if required validation will handle this
    // const match = this.filteredCity.find(item => item.city === control.value);
    // return match ? null : { invalidCity: true };


    // Check if input length is at least 3 characters
    if (control.value.length >= 3) {
      const match = this.filteredCity.find(item => item.city === control.value); // Assuming item has a 'city' property
      return match ? null : { invalid: true };
    }

    return null; // If input length is less than 3, do not mark as invalid
  }


  onKeyUpCity(event: KeyboardEvent) {
    // this.practiceInformationForm.get('city')?.setValidators(this.cityValidator)
    this.practiceInformationForm.get('city')?.setErrors({ invalid: true });
    const input = (event.target as HTMLInputElement).value;
    if (input.length >= 3) {
      this.apiService.getCity(input).subscribe((res: any) => {
        this.filteredCity = res.data;
      }, (err: any) => {
        this.filteredCity = [];
        this.apiService.errorToster("Zip Code Not Found", "Error");
        this.practiceInformationForm.get('city')?.setErrors({ invalid: true });
      });
    } else {
      this.filteredCity = [];
      this.practiceInformationForm.get('city')?.setErrors({ invalid: true });
    }
  }

  selectCity(item: any) {
    this.practiceInformationForm.get('city')?.setValue(item);
    this.validateCity()
    this.practiceInformationForm.get('city')?.updateValueAndValidity(); // Re-validate
    this.filteredCity = [];
  }

  validateCity() {
    const cityControl = this.practiceInformationForm.get('city');

    // Perform validation
    if (cityControl?.value && cityControl.value.length >= 3) {
      const match = this.filteredLocations.find(item => item.city === cityControl.value);
      if (!match) {
        // If no match, set the control to invalid with an error
        cityControl.setErrors({ invalid: true });
      } else {
        // Clear any previous errors if match is found
        cityControl.setErrors(null);
      }
    } else {
      // Clear any previous errors if the value is not long enough
      cityControl?.setErrors(null);
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
      this.filteredLocations = [];
      this.practiceInformationForm.get('zipCode')?.setErrors({ invalidCity: true });
    }
  }

  selectLocation(item: any) {
    this.practiceInformationForm.get('zipCode')?.setValue(item);
    this.validateZipCode()
    this.practiceInformationForm.get('zipCode')?.updateValueAndValidity(); // Re-validate
    this.filteredLocations = [];

  }
  onSpecialty(selectedValue: any) {
    console.log("=============", selectedValue)
    this.onSpecialtySelect(this.qualificationAndSkillsForm.controls['mainSpecialization'].value)
  }


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
        this.providerQualification(28);
        break;
      default:
        console.warn('Selected specialty does not have a mapped ID.');
        break;
    }
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
    // if (this.providerData) {
      let data = {
        "f_name": this.personalInformationForm.controls['firstName'].value,
        "l_name": this.personalInformationForm.controls['lastName'].value,
        "email": this.personalInformationForm.controls['email'].value,
        "gender": this.personalInformationForm.controls['gender'].value,
        "contact_no": this.personalInformationForm.controls['contactNumber'].value,

        "practiceName": this.practiceInformationForm.controls['practiceName'].value,
        "practiceSpecialization": this.practiceInformationForm.controls['providersSpecialty'].value,
        "practiceSize": this.practiceInformationForm.controls['practiceSize'].value,
        "roleAtPractice": this.practiceInformationForm.controls['roleAtPractice'].value,
        "billingAddress": this.practiceInformationForm.controls['billingAddress'].value,
        "billingAddresstwo": this.practiceInformationForm.controls['billingAddresstwo'].value,
        "zipcode": this.practiceInformationForm.controls['zipCode'].value,
        "city": this.practiceInformationForm.controls['city'].value,
        // "licensedState": this.practiceInformationForm.controls['state'].value,

        "qualification": this.qualificationAndSkillsForm.controls['qualification'].value,
        "mainSpecialty": this.qualificationAndSkillsForm.controls['mainSpecialization'].value,
        "subSpecialty": this.qualificationAndSkillsForm.controls['subSpecialization'].value || "",
        "licensedState": this.qualificationAndSkillsForm.controls['licensedState'].value,
        "experience": this.qualificationAndSkillsForm.controls['overallExperience'].value,
        "NPI_Number": this.qualificationAndSkillsForm.controls['npiNumber'].value,
      }
      let UserData = {
        "f_name": this.personalInformationForm.controls['firstName'].value,
        "l_name": this.personalInformationForm.controls['lastName'].value,
        "contact_no": this.personalInformationForm.controls['contactNumber'].value,

      }
      console.log("===========",data )
      console.log("===========",UserData )
      this.updateProviderDataById(data, this.initialState.payload.providerId);
      this.updateUserDataById(UserData);
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

  updateProviderDataById(providerFormData: any, providerId: any) {
    this.spinner.show();
    this.providerService.updateProviderBasicInformation(this.userToken, providerFormData, providerId)
      .pipe(first())
      .subscribe(
        (res: any) => {
          // this.getProviderData(this.initialState.payload);
          this.closeModal();
          this.spinner.hide();
        },
        (err: any) => {
          this.spinner.hide();
          this.apiService.errorToster(err?.error?.message?.description || ' Some Thing Went Wrong', "Error");
        }
      );
  }


  saveProviderData(providerFormData: any) {
    this.spinner.show();
    this.providerService.saveProviderBasicInformation(this.userToken, providerFormData)
      .pipe(first())
      .subscribe(
        (res: any) => {
          // this.getProviderData(this.initialState.payload);
          this.closeModal();
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
    this.apiService.updateUserBasicInformation(this.userToken, userFormData, this.initialState.payload._id)
      .pipe(first())
      .subscribe(
        (res: any) => {
          // this.getProviderData(this.initialState.payload);
          this.closeModal();
          this.spinner.hide();

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


  checkAllFields(): boolean {
    return (
      this.personalInformationForm.valid &&
      this.practiceInformationForm.valid &&
      this.qualificationAndSkillsForm.valid

    );
  }


}




//implements OnInit {
//   title: any;
//   initialState: any;

//   providerData: any;
//   userToken: any;
//   appointmentForm: FormGroup;
//   isEdit: boolean | any;




//   constructor(
//     private fb: FormBuilder, private router: Router, public bsModalRef: BsModalRef,
//     private modalService: BsModalService, private dss: DataSharingService,
//     private apiService: MainHomeService, private spinner: NgxSpinnerService,
//     private providerService: providerService, private authenticationService: authenticationService, private adminServices: adminService) {


//     this.appointmentForm = this.fb.group({
//       f_name: ["",],
//       l_name: ["",],
//       gender: ["",],
//       email: ['',],
//       practiceName: ['',],
//       contact_no: ['',],
//       mainSpecialty: ['',],
//       practiceSize: ['',],
//       roleAtPractice: ['',],
//       addressLineOne: ['',],
//       addressLineTwo: ['',],
//       city: ['',],
//       qualification: ['',],
//       main_Specialty: ['',],
//       subSpecialty: ['',],
//       licensedState: ['',],
//       NPI_Number: ['',],
//       zipcode: ['',],
//     });


//   }

//   ngOnInit(): void {
//     this.providerData = this.providerService.getProviderData()
//     this.userToken = this.authenticationService.getUserToken();

//     this.title = this.initialState.title
//     // this.patchData(this.initialState.payload)
//     this.getProviderData(this.initialState.payload)
//   }




//   closeModal() {
//     // this.dss.sendSignal({ type: 'patientInteraction-saved', data: "success" })
//     this.appointmentForm.reset();
//     this.bsModalRef.hide()

//   }


//   showError(error: any) {
//     this.apiService.errorToster(error, 'Error!',);
//   }


//   getProviderData(data: any) {
//     this.adminServices.getProviderDetails(this.userToken, data._id).
//       pipe(first())
//       .subscribe(
//         (res: any) => {
//           let dt = res;

//           this.appointmentForm.get('f_name')?.setValue(dt.userId.f_name);
//           this.appointmentForm.get('l_name')?.setValue(dt.userId.l_name);
//           this.appointmentForm.get('email')?.setValue(dt.userId.email);
//           this.appointmentForm.get('gender')?.setValue(dt.userId.gender);
//           this.appointmentForm.get('contact_no')?.setValue(dt.userId.contact_no);

//           this.appointmentForm.get('practiceName')?.setValue(dt.practiceName);
//           this.appointmentForm.get('mainSpecialty')?.setValue(dt.mainSpecialty);
//           this.appointmentForm.get('practiceSize')?.setValue(dt.practiceSize);
//           this.appointmentForm.get('roleAtPractice')?.setValue(dt.roleAtPractice);
//           this.appointmentForm.get('addressLineOne')?.setValue(dt.addressLineOne);
//           this.appointmentForm.get('addressLineTwo')?.setValue(dt.addressLineTwo);
//           this.appointmentForm.get('city')?.setValue(dt.city);
//           this.appointmentForm.get('zipcode')?.setValue(dt.zipcode);

//           this.appointmentForm.get('qualification')?.setValue(dt.qualification);
//           this.appointmentForm.get('main_Specialty')?.setValue(dt.mainSpecialty);
//           this.appointmentForm.get('subSpecialty')?.setValue(dt.subSpecialty);
//           this.appointmentForm.get('licensedState')?.setValue(dt.licensedState);
//           this.appointmentForm.get('NPI_Number')?.setValue(dt.NPI_Number);


//         },
//         (err: any) => {
//           this.spinner.hide();
//           this.showError(err?.error?.message?.description);
//         }
//       );
//   }




// }

