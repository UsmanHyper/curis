import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FooterComponent } from 'src/app/shared/footer/footer.component';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { defer, first, map, Observable } from 'rxjs';
import { CustomValidators } from 'src/app/utilities/custom.validator';
import { CreditCardDirectivesModule, CreditCardValidators } from "angular-cc-library";
import { CreditCard } from 'angular-cc-library';
import { PaymentStatusComponent } from 'src/app/shared/payment-status/payment-status.component';

@Component({
  selector: 'app-register-provider',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent, FormsModule, ReactiveFormsModule, CreditCardDirectivesModule, PaymentStatusComponent],
  templateUrl: './register-provider.component.html',
  styleUrls: ['./register-provider.component.scss']
})
export class RegisterProviderComponent implements OnInit {


  emailInformationStepper: boolean = true;
  createAccountStepper: boolean = true;
  payFeeStepper: boolean = true;
  successfulStepper: boolean = true;
  public type$: Observable<string> | any;
  allGenders: any = [
    { name: 'Male', value: "male" },
    { name: 'Female', value: "female" },
    { name: 'Other', value: "other" }
  ]
  userform: FormGroup;

  ccForm: FormGroup;

  constructor(public formBuilder: FormBuilder) {


    this.userform = this.formBuilder.group({
      first_name: [null, [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/), CustomValidators.noWhiteSpace]],
      last_name: [null, [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/), CustomValidators.noWhiteSpace]],
      contact_number: [null, [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/), Validators.minLength(8), this.noWhitespaceValidator]],
      gender: ["Select your gender", [Validators.required]],
      dob: [null, [Validators.required]],
      notes: [null, [Validators.required]],

    })


    this.ccForm = this.formBuilder.group({
      email: [null, [Validators.required]],
      name: [null, [Validators.required]],
      region: [null, [Validators.required]],
      creditCard: [null, [CreditCardValidators.validateCCNumber]],
      expDate: ['', [CreditCardValidators.validateExpDate]],
      cvc: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(4)]]
    });


    const creditCardControl = this.ccForm.get('creditCard');
    if (creditCardControl) {
      this.type$ = defer(() => creditCardControl.valueChanges)
        .pipe(map((num: string) => CreditCard.cardType(num)));
    }


  }


  ngOnInit() {
    this.type$.subscribe((type: any) => {
      console.log('Credit Card Type:', type);
    })
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


  goToNextField(controlName: string, nextField: HTMLInputElement) {
    const control = this.ccForm.get(controlName);
    if (control && control.valid) {
      nextField.focus();
    }
  }
}

