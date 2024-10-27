import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MainHomeService } from 'src/app/services/main-home.service';


import intlTelInput, { Iti } from 'intl-tel-input';
import utils from "intl-tel-input"


interface CustomIti extends Iti {
  errorMsg: string;
}

@Component({
  selector: 'app-curis-contact-form',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule,],
  templateUrl: './curis-contact-form.component.html',
  styleUrls: ['./curis-contact-form.component.scss']
})
export class CurisContactFormComponent implements OnInit , AfterViewInit {

  contactInformationForm: FormGroup;
  showForm: boolean = true;
  showSubmitMessage: boolean = false;

  getCountryCode: any;
  inputMaxLength: string = "20"
  @ViewChild('telInput') telInput: any;
  iti: any;


  constructor(private spinner: NgxSpinnerService, private apiService: MainHomeService, private formBuilder: FormBuilder,
  ) {


    this.contactInformationForm = this.formBuilder.group({
      firstName: ["", [Validators.required,]],
      lastName: ["", [Validators.required,]],
      email: ["", [Validators.required,]],
      phone: ["", Validators.required],
      message: ["", Validators.required],
    });


  }
  ngOnInit() {
    // this.loaderService.start()
    // setTimeout(() => {
    //   this.loaderService.stop()
    // }, 1000)
  }


  saveImpression() {
    // if (this.contactInformationForm.invalid) {
    //   return
    // } else {
    //   let payload = {
    //     firstName: this.contactInformationForm.controls['firstName'].value,
    //     lastName: this.contactInformationForm.controls['lastName'].value,
    //     email: this.contactInformationForm.controls['email'].value,
    //     phone: this.contactInformationForm.controls['phone'].value,
    //     message: this.contactInformationForm.controls['message'].value
    //   }
    // }

    // this.apiService.checkEmail(payload).pipe(first())
    //   .subscribe(
    //     (res: any) => {
    //       if (res.success == true && res.isPatient == true) {
    //         this.router.navigateByUrl('/auth')
    //       } else {
    //         this.nextMove()
    //       }
    //     },
    //     (err: any) => {
    //       this.spinner.hide();
    //       this.nextMove()
    //       this.apiService.successToster(err?.error?.message, 'Success');
    //     }
    //   );


    this.showForm = false;
    this.showSubmitMessage = true;
  }
  ngAfterViewInit() {
    this.initializeItil()

  }


  initializeItil() {
    this.iti = intlTelInput(this.telInput.nativeElement, {
      utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@23.0.9/build/js/utils.js",
      // utilsScript: "assets/scripts/utils.js",
      initialCountry: this.contactInformationForm.value.iso_code ? this.contactInformationForm.value.iso_code : "us",
      separateDialCode: true,
      nationalMode: false,
      formatOnDisplay: true
    });

    this.updateFormValues();

    this.telInput.nativeElement.addEventListener('countrychange', () => {
      this.updateFormValues();
      this.updatePlaceholder();
      this.validatePhoneNumber();
    });

    this.telInput.nativeElement.addEventListener('input', () => {
      this.validatePhoneNumber();
    });

    this.updatePlaceholder();
  }

  updateFormValues() {
    const selectedCountryData = this.iti.getSelectedCountryData();
    this.contactInformationForm.get('iso_code')?.setValue(selectedCountryData.iso2);
    this.contactInformationForm.get('country_code')?.setValue(selectedCountryData.dialCode);
  }

  updatePlaceholder() {
    const placeholder = this.iti.getPlaceholderNumber();
    this.telInput.nativeElement.placeholder = placeholder;
  }

  validatePhoneNumber() {
    const isValid = this.iti.isValidNumber();
    if (isValid) {
      this.contactInformationForm.get('phone')?.setErrors(null);
    } else {
      this.contactInformationForm.get('phone')?.setErrors({ invalid: true });
    }
  }

  onInputKeyPress(event: KeyboardEvent) {
    const allowedChars = /[0-9\+\-\ ]/;
    const allowedCtrlChars = /[axcv]/;
    const allowedOtherKeys = ['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown', 'Home', 'End', 'Insert', 'Delete', 'Backspace'];

    if (!allowedChars.test(event.key) && !(event.ctrlKey && allowedCtrlChars.test(event.key)) && !allowedOtherKeys.includes(event.key)) {
      event.preventDefault();
    }
  }

  ngOnDestroy() {
    this.iti.destroy();
  }

}
