import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup
} from "@angular/forms";
// import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { providerService } from '../../provider.service';
// import { authenticationService } from 'src/app/authentication.service';
import { first } from 'rxjs';
import { MainHomeService } from 'src/app/services/main-home.service';
// import { homeService } from 'src/app/app.service';
@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.scss']
})
export class AddLocationComponent implements OnInit {

  locationFormGroup: FormGroup;
  title: any;
  data: any;
  cityLov: any;
  providersLocation: any;
  providerData: any;
  userToken: any;
  isEditMode: boolean = false;
  zipCodesLov: any;
  location: any;


  constructor(private formBuilder: FormBuilder,
    private apiService: MainHomeService,
    private spinner: NgxSpinnerService,
    private providerService: providerService,
  ) {
    // constructor(private formBuilder: FormBuilder,
    //   public dialog: MatDialog, private homeService: homeService,
    //   private spinner: NgxSpinnerService,
    //   private providerService: providerService,
    //   private authenticationservice: authenticationService,
    //   private home: homeService,) {

    this.locationFormGroup = this.formBuilder.group({

      locationName: ["", Validators.required],
      locationDescription: ["", Validators.required],
      activeStatus: [false, Validators.required],
      locationAddressLineOne: ["", Validators.required],
      locationAddressLineTwo: [""],
      city: ["", Validators.required],
      zipCode: ["", Validators.required]
    });

  }
  ngOnInit() {
    this.providerData = this.providerService.getProviderData()
    // this.userToken = this.authenticationservice.getUserToken();
    this.getProviderLocationAPI(this.providerData._id)
    this.getCityLov()
    this.getzipCodeLov();

    if (!!this.data) {
      this.patchFormData(this.data)

      this.isEditMode = true;

    }

    this.location = this.data._id
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

  closeModal() {
    this.locationFormGroup.reset();
    // this.dialog.closeAll()
  }


  showError(error: any) {
    this.apiService.errorToster(error, 'Error!',);
  }

  patchFormData(data: any) {
    this.isEditMode = true;
    this.locationFormGroup.patchValue({
      id: data._id,
      locationName: data.locationName,
      locationDescription: data.locationDescription,
      activeStatus: data.isActive,
      locationAddressLineOne: data.locationAddressLineOne,
      locationAddressLineTwo: data?.locationAddressLineTwo || "",
      city: data.city,
      zip: data.zip,
    });


  }


  updateLocationInformation() {
    let data = {
      "locationName": this.locationFormGroup.controls['locationName'].value,
      "locationDescription": this.locationFormGroup.controls['locationDescription'].value,
      "isActive": this.locationFormGroup.controls['activeStatus'].value,
      "locationAddressLineOne": this.locationFormGroup.controls['locationAddressLineOne'].value,
      "locationAddressLineTwo": this.locationFormGroup.controls['locationAddressLineTwo']?.value || "",
      "city": this.locationFormGroup.controls['city'].value,
      "zip": this.locationFormGroup.controls['zipCode'].value,
    };

    this.updateProviderLocationAPI(this.location, data);
  }

  updateProviderLocationAPI(locationId: any, dataToSet: any) {
    this.spinner.show();
    this.providerService.updateLocationInformation(this.userToken, locationId, dataToSet)
      .pipe(first())
      .subscribe(
        (res: any) => {
          this.getProviderLocationAPI(this.providerData._id);
          this.closeEditModal();
          this.spinner.hide();
        },
        (err: any) => {
          this.spinner.hide();
          this.showError(err?.error?.message?.description);
        }
      );
  }


  getProviderLocationAPI(providerId: any) {
    this.spinner.show();
    this.providerService.getProviderLocationInformation(this.userToken, providerId)
      .pipe(first())
      .subscribe(
        (res: any) => {
          this.providersLocation = res;
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

  closeEditModal() {
    // this.modalRef.hide();
  }

  saveLocationInformationData() {
    let data = {
      "locationName": this.locationFormGroup.controls['locationName'].value,
      "locationDescription": this.locationFormGroup.controls['locationDescription'].value,
      "isActive": this.locationFormGroup.controls['activeStatus'].value,
      "userId": this.providerData.userId,
      "providerId": this.providerData._id,
      "locationAddressLineOne": this.locationFormGroup.controls['locationAddressLineOne'].value,
      "locationAddressLineTwo": this.locationFormGroup.controls['locationAddressLineTwo']?.value || "",
      "city": this.locationFormGroup.controls['city'].value,
      "zip": this.locationFormGroup.controls['zipCode'].value,
    };
    this.saveProviderLocationAPI(data);
  }

  saveProviderLocationAPI(providerFormData: any) {
    this.spinner.show();
    this.providerService.saveProviderLocationInformation(this.userToken, providerFormData)
      .pipe(first())
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          this.closeModal();
          this.getProviderLocationAPI(this.providerData._id);
        },
        (err: any) => {
          this.spinner.hide();
          this.showError(err?.error?.message?.description);
        }
      );
  }

}
