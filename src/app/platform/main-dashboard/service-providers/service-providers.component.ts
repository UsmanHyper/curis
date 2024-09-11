import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FooterComponent } from 'src/app/shared/footer/footer.component';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsComponent } from 'src/app/shared/google-maps/google-maps.component';
import { MainHomeService } from 'src/app/services/main-home.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataSharingService } from 'src/app/services/data-sharing-servcie';
import { FlatpickrModule } from 'angularx-flatpickr';
import { debounceTime, distinctUntilChanged, first } from 'rxjs';
import * as moment from 'moment'


@Component({
  selector: 'app-service-providers',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent, FormsModule, GoogleMapsComponent, FlatpickrModule, ReactiveFormsModule, FlatpickrModule

  ],
  templateUrl: './service-providers.component.html',
  styleUrls: ['./service-providers.component.scss']
})
export class ServiceProvidersComponent implements OnInit {




  rating: number = 5;
  selectedSpeciality: FormControl;
  selectedService: FormControl;
  selectedLocation: FormControl;
  selectedDate: FormControl;

  filterValue: string

  slots: any = [
    '08:30 AM', '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM'
  ]


  filterItems = [
    { name: 'Price', value: 'price', selected: false },
    { name: 'Distance', value: 'distance', selected: false },
    { name: 'Rating', value: 'rating', selected: false }
  ];

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
  dateSelected: any


  providerDetails: any[] = []

  constructor(public formBuilder: FormBuilder, private apiService: MainHomeService, private spinner: NgxSpinnerService, private router: Router,
    private dss: DataSharingService) {
    this.selectedSpeciality = new FormControl('Select Speciality');
    this.selectedService = new FormControl('Select Service');
    this.selectedLocation = new FormControl('Select Location');
    this.selectedDate = new FormControl(null);

    this.filterValue = 'Filter'
  }


  ngOnInit(): void {


    this.getSpecialityLov()
    this.getZipCodeLov()


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

        this.dateSelected = moment(this.selectedDate.value).format('ddd, MMM D');
      }
    })



    // this.dss.onSignal().subscribe((value: any) => {

    //   if (value && value.type === "appointmentSearch") {
    //     this.patch(value.data);
    //   }
    // })

    let dt: any = localStorage.getItem("searchData");
    let searchData = JSON.parse(dt);
    console.log(searchData);
    if (!!searchData) {
      this.patch(searchData);
    }

    let providers: any = localStorage.getItem("appointments");
    this.providerDetails = JSON.parse(providers)

    console.log("searchData", this.providerDetails);
    console.log("searchData", this.providerDetails.length);
  }


  patch(data: any) {
    console.log(":-------", data)
    this.selectedSpeciality.patchValue(data.mainSpeciality);
    this.getServicesForSpeciality();

    this.selectedLocation.patchValue(data.zipCode)
    this.selectedDate.patchValue(data.date)

    this.dateSelected = moment(this.selectedDate.value).format('ddd, MMM D');

    // setTimeout(() => {
    //   this.selectedService.patchValue(data.service)
    // }, 2000);
  }

  // selectItem(ev: any) {
  //   this.filterValue = ev

  // }
  selectItem(selectedItem: any) {
    // if (selectedItem !== 'none') {
    this.filterItems.forEach(item => {
      item.selected = item.value === selectedItem.value;
    });
    this.filterValue = selectedItem.name || 'Filter';

    // } else {
    //   this.filterValue = 'Filter'
    // }
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

  showError(error: any) {
    this.apiService.errorToster(error, 'Error!',);
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

        console.log("searchProvidersByCriteria==============", res);
        this.dss.sendSignal({ type: 'appointmentSearch', item: payload });
        localStorage.setItem("searchData", JSON.stringify(payload));
        localStorage.setItem("appointments", JSON.stringify(res.data));
        // this.providerDetails = res.data;

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
        this.providerDetails = dt;
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


  setRating(star: any) {

  }

}
