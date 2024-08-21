import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FooterComponent } from 'src/app/shared/footer/footer.component';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { LinksComponent } from 'src/app/shared/links/links.component';
import { TestimonialComponent } from 'src/app/platform/main-dashboard/testimonial/testimonial.component';
import { WorkflowComponent } from '../workflow/workflow.component';
import { KeyFeaturesComponent } from '../key-featuers/key-features.component';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import FormsModule
import { MainHomeService } from 'src/app/services/main-home.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataSharingService } from 'src/app/services/data-sharing-servcie';
import { first } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HeaderComponent, FooterComponent, LinksComponent, TestimonialComponent, WorkflowComponent, KeyFeaturesComponent, FormsModule, ReactiveFormsModule,]
})
export class HomeComponent implements OnInit {

  selectedSpeciality: FormControl;
  selectedService: FormControl;
  selectedLocation: FormControl;
  selectedDate: FormControl;
  rating: number = 5;


  zipCodesLov: any;
  selectedItem: any;
  searchFormGroup!: FormGroup;
  specialtiesList: any;
  servicesList: any;
  selectedProvider: any;
  selectedValue: any;

  showList = false;

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  disableService: boolean = true;
  disableLocation: boolean = false;

  slots: any = [
    '08:30 AM', '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM'
  ];

  constructor(public formBuilder: FormBuilder, private apiService: MainHomeService, private spinner: NgxSpinnerService, private router: Router,
    private dss: DataSharingService,) {



    this.selectedSpeciality = new FormControl(null);
    this.selectedService = new FormControl(null);
    this.selectedLocation = new FormControl(null);
    this.selectedDate = new FormControl(null);
  }


  ngOnInit() {


    this.getSpecialityLov()
    this.getzipCodeLov()
  }

  search() {
    console.log('Speciality:', this.selectedSpeciality);
    console.log('Service:', this.selectedService);
    console.log('Location:', this.selectedLocation);
    console.log('Date:', this.selectedDate);
  }


  setRating(star: any) {

  }


  getSpecialityLov() {
    this.spinner.show();
    this.apiService.getLovs(4)
      .pipe(first())
      .subscribe(
        (res: any) => {

          this.specialtiesList = res[0].lovs;
          this.disableService = false
          this.spinner.hide();
        },
        (err: any) => {
          this.spinner.hide();
          this.showError(err?.error?.message?.description);
        }
      );
  }

  getServicesForSpeciality() {
    this.spinner.show();
    this.apiService.getLovByName(this.selectedSpeciality)
      .pipe(first())
      .subscribe(
        (res: any) => {
          this.servicesList = res[0].lovs;
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

  showError(error: any) {
    this.apiService.errorToster(error, 'Error!',);
  }


}
