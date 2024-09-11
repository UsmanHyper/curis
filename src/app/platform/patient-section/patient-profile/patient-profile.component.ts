import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import * as moment from 'moment'
import { userService } from 'src/app/services/user.service';
import { providerService } from '../../provider-section/provider.service';
import { authenticationService } from 'src/app/services/authentication.service';
import { MainHomeService } from 'src/app/services/main-home.service';


@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.scss']
})
export class PatientProfileComponent implements OnInit {
  patientData: any;
  genderLov: any;
  cityLov: any;
  stateLov: any;
  zipcodeLov: any;
  countryLov: any;
  userToken: any;
  patientDemographics: FormGroup;
  personalInformationForm: FormGroup;
  isEdit: boolean | any = false;
  isEditPersonalInformation: boolean | any = false;
  userId: any;
  patientId: any;


  constructor(private userService: userService, private formBuilder: FormBuilder, private providerService: providerService, private authenticationService: authenticationService, private spinner: NgxSpinnerService, private apiService: MainHomeService,) {

    this.personalInformationForm = this.formBuilder.group({
      firstName: ["", [Validators.required,]],
      lastName: ["", [Validators.required,]],
      middleName: ["", []],
      email: ["", [Validators.required,]],
      gender: ["", Validators.required],
      emergency_firstName: ["", [Validators.required,]],
      emergency_lastName: ["", [Validators.required,]],
      emergency_contact_no: ["", [Validators.required,]],

    });

    this.patientDemographics = this.formBuilder.group({
      DOB: ["", Validators.required],
      contact_one: ["", Validators.required],
      contact_two: ["", Validators.required],
      city: ["Select City", Validators.required],
      state: ["Select State", Validators.required],
      country: ["Select Country", Validators.required],
      zipcode: ["Select Zip Code", Validators.required],
      address_one: ['', Validators.required],
      address_two: ['', Validators.required],
      // socialSecurityNumber: ['', Validators.required],


    });


  }

  ngOnInit() {

    this.patientData = this.userService.getLoggedInUser()
    this.userToken = this.authenticationService.getUserToken();

    this.getGenderLov()
    this.getCityLov()
    this.getZipCodeLov()
    this.getCountryLov()
    this.getStateLov()
    // this.getUserData()
    this.setUserFormValue(this.patientData)
    this.getUserDemographic(this.patientData._id)

    this.personalInformationForm.valueChanges.subscribe(changes => {
      this.isEditPersonalInformation = true;
      // You can perform any actions here based on the changes
    });

  }


  setUserFormValue(data: any) {

    this.personalInformationForm.get('firstName')?.setValue(this.patientData.f_name)
    this.personalInformationForm.get('lastName')?.setValue(this.patientData.l_name)
    this.personalInformationForm.get('email')?.setValue(this.patientData.email)
    this.personalInformationForm.get('gender')?.setValue(this.patientData.gender)
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
  getZipCodeLov() {
    this.spinner.show();
    this.providerService.getLovs(19)
      .pipe(first())
      .subscribe(
        (res: any) => {
          this.zipcodeLov = res[0].lovs;
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


  getUserDemographic(id: any): any {

    this.userService.getPatientInformation(this.userToken, id)
      .pipe(first())
      .subscribe(
        (res: any) => {
          let dt = res
          if (dt === null || dt == undefined) {

          } else {
            this.isEdit = true;
            this.setPatientDemograpicValue(dt)
            this.patientId = dt._id;
          }
        },
        (err: any) => {
          this.spinner.hide();
          this.showError(err?.error?.message?.description);
        }
      )
  }



  setPatientDemograpicValue(data: any) {
    let dateObj = moment(data['DOB'], "MM/DD/YYYY ");
    let convertedDate = dateObj.format("YYYY-MM-DD");
    this.patientDemographics.get('DOB')?.setValue(convertedDate);
    this.patientDemographics.get('contact_one')?.setValue(data.contact_one);
    this.patientDemographics.get('contact_two')?.setValue(data.contact_two);
    this.patientDemographics.get('city')?.setValue(data.city);
    this.patientDemographics.get('state')?.setValue(data.state);
    this.patientDemographics.get('country')?.setValue(data.country);
    this.patientDemographics.get('zipcode')?.setValue(data.zipcode);
    this.patientDemographics.get('address_one')?.setValue(data.address_one);
    this.patientDemographics.get('address_two')?.setValue(data.address_two);
    // this.patientDemographics.get('socialSecurityNumber')?.setValue(data.socialSecurityNumber);
  }

  patientReport() {

  }

  updatepatientReport() {

  }



  submitForm() {
    let dateObj = moment(this.patientDemographics.controls['DOB'].value, "YYYY-MM-DD");
    let convertedDate = dateObj.format("MM/DD/YYYY");
    let payload = {
      userId: this.patientData._id,
      DOB: convertedDate,
      contact_one: this.patientDemographics.controls['contact_one'].value,
      contact_two: this.patientDemographics.controls['contact_two'].value,
      city: this.patientDemographics.controls['city'].value,
      state: this.patientDemographics.controls['state'].value,
      country: this.patientDemographics.controls['country'].value,
      zipcode: this.patientDemographics.controls['zipcode'].value,
      address_one: this.patientDemographics.controls['address_one'].value,
      address_two: this.patientDemographics.controls['address_two'].value,
      socialSecurityNumber: this.patientDemographics.controls['socialSecurityNumber'].value,

    }

    if (this.isEdit === true) {
      this.userService.putPatientInformation(this.userToken, this.patientId, payload)
        .pipe(first())
        .subscribe(
          (res: any) => {
          },
          (err: any) => {
            // this.spinner.hide();
            this.showError(err?.error?.message?.description);
          }
        )

    } else {

      this.userService.postPatientInformation(this.userToken, payload)
        .pipe(first())
        .subscribe(
          (res: any) => {
            this.patientId = res._id;
            this.isEdit = true;
          },
          (err: any) => {
            // this.spinner.hide();
            this.showError(err?.error?.message?.description);
          }
        )
    }
  }
  showError(error: any) {
    this.apiService.errorToster(error, 'Error!',);
  }


  submitPatientForm() {
    let payload = {
      f_name: this.personalInformationForm.controls['firstName']?.value,
      l_name: this.personalInformationForm.controls['lastName']?.value,
      gender: this.personalInformationForm.controls['gender']?.value,
    }

    this.userService.putPatientData(this.userToken, this.patientData._id, payload)
      .pipe(first())
      .subscribe(
        (res: any) => {
        },
        (err: any) => {
          // this.spinner.hide();
          this.showError(err?.error?.message?.description);
        }
      )

  }

}
