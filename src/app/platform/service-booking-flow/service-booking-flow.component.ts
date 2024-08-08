import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FooterComponent } from 'src/app/shared/footer/footer.component';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { authenticationService } from 'src/app/services/authentication.service';
import { Global } from '../../utilities/Global';
import { homeService } from 'src/app/services/home.service';


@Component({
  selector: 'app-service-booking-flow',
  templateUrl: './service-booking-flow.component.html',
  styleUrls: ['./service-booking-flow.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent, FormsModule, ReactiveFormsModule],
})
export class ServiceBookingFlowComponent implements OnInit {


  personalInformationStepper: boolean = true;
  practiceInformationStepper: boolean = false;
  skillsInformationStepper: boolean = false;
  accountInformationStepper: boolean = false;
  successfulStepper: boolean = false;

  constructor(public formBuilder: FormBuilder) {

  }


  ngOnInit() {

  }

}
