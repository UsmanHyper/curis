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
import { debounceTime, distinctUntilChanged, first } from 'rxjs';
import { FlatpickrModule } from 'angularx-flatpickr';
import * as moment from 'moment'



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent, LinksComponent, TestimonialComponent,
    WorkflowComponent, KeyFeaturesComponent, FormsModule, ReactiveFormsModule, FlatpickrModule]
})
export class HomeComponent implements OnInit {

  selectedSpeciality: FormControl;
  selectedService: FormControl;
  selectedLocation: FormControl;
  selectedDate: FormControl;
  rating: number = 5;

  dateTitle: any;
  checkSpeciality: boolean = false;
  checkService: boolean = false;
  checkLocation: boolean = false;
  checkDate: boolean = false;


  zipCodesLov: any;
  selectedItem: any;
  specialtiesList: any;
  servicesList: any;
  selectedProvider: any;
  selectedValue: any;

  showList = false;
  flatpickrOptions: any = {
    disable: [
      (date: Date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date < today;
      }
    ],

  };



  disableService: boolean = true;
  disableLocation: boolean = false;

  slots: any = [
    '08:30 AM', '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM'
  ];

  constructor(public formBuilder: FormBuilder, private apiService: MainHomeService, private spinner: NgxSpinnerService, private router: Router,
    private dss: DataSharingService,) {

    localStorage.removeItem("searchData");
    localStorage.removeItem("appointments");

    this.selectedSpeciality = new FormControl('Select Speciality');
    this.selectedService = new FormControl('Select Service');
    this.selectedLocation = new FormControl('Select Location');
    this.selectedDate = new FormControl(null);

    this.disableService = true
  }


  ngOnInit() {


    this.getSpecialityLov()
    this.getzipCodeLov()


    this.selectedSpeciality.valueChanges.pipe(debounceTime(400), distinctUntilChanged()).subscribe((val: any) => {
      console.log("-----------", val)
      if (val === "Select Speciality") {
        this.checkSpeciality = false
      } else {
        this.checkSpeciality = true
      }

    })
    this.selectedService.valueChanges.pipe(debounceTime(400), distinctUntilChanged()).subscribe((val: any) => {
      if (val === "Select Service") {

        this.checkService = false
      } else {
        this.checkService = true
      }

    })
    this.selectedLocation.valueChanges.pipe(debounceTime(400), distinctUntilChanged()).subscribe((val: any) => {
      if (val === "Select Location") {

        this.checkLocation = false
      } else {
        this.checkLocation = true
      }

    })
    this.selectedDate.valueChanges.pipe(debounceTime(400), distinctUntilChanged()).subscribe((val: any) => {

      if (!!val) {
        this.dateTitle = moment(this.selectedDate.value).format('DD/MM/YYYY')
        this.checkDate = true
      }
    })


  }

  search() {
    console.log('Speciality:', this.selectedSpeciality.value);
    console.log('Service:', this.selectedService.value);
    console.log('Location:', this.selectedLocation.value);
    console.log('Date:', this.selectedDate.value);



    // this.router.navigateByUrl('service-providers')

    if (!!this.selectedSpeciality.value && !!this.selectedService.value && !!this.selectedLocation.value && !this.selectedDate.value) {
      // if (this.selectedSpeciality === null && this.selectedProvider === null && this.selectedLocation === null && !this.range.valid) {
      return
    } else {

      let payload = {
        mainSpeciality: this.selectedSpeciality.value,
        service: this.selectedSpeciality.value,
        // service: this.selectedService.value,
        zipCode: this.selectedLocation.value,
        date: moment(this.selectedDate.value).format('YYYY-MM-DD')
      }


      this.apiService.searchProvidersByCriteria(payload).pipe(first()).subscribe((res: any) => {
        console.log("searchProvidersByCriteria==============", res.data);

        let dt = res.data
        dt.forEach((ele: any) => {
          if (ele.locationInformation.length > 0) {
            ele.locationInformation.forEach((elem: any) => {
              if (elem.availableSlots.length > 0) {
                elem.availableSlots.forEach((slot: any) => {
                  slot.timeSlot = moment(slot.startTimeOnly, 'HH:mm:ss').format('h:mm A');
                })
              }
            });
          }
        });
        console.log("------------------------", dt)

        this.dss.sendSignal({ type: 'appointmentSearch', item: payload });
        localStorage.setItem("searchData", JSON.stringify(payload));
        localStorage.setItem("appointments", JSON.stringify(dt));


        this.router.navigate(["/service-providers"], {
          queryParams: { specialty: `${payload.mainSpeciality}`, service: payload.service, zip: payload.zipCode, date: payload.date },
        })
      },
        (err: any) => {
          this.spinner.hide();
          this.showError(err?.error?.message);
        }


      )

      // this.signals.emit(payload);

      // this.dss.sendSignal({ type: 'appointment', item: payload });
      // this.router.navigate(['/schedule-appointment']);
    }

  }

  checkFields() {
    console.log('Speciality:', this.checkSpeciality, this.checkDate, this.checkLocation, this.checkService);


    // if (!this.selectedSpeciality || !this.selectedProvider || !this.selectedLocation || !this.selectedDate) {

    // }
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

    console.log("this.selectedSpeciality", this.selectedSpeciality.value)
    this.spinner.show();
    this.apiService.getLovByName(this.selectedSpeciality.value)
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
