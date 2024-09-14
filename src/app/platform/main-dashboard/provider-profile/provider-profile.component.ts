import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FooterComponent } from 'src/app/shared/footer/footer.component';
import { GoogleMapsComponent } from 'src/app/shared/google-maps/google-maps.component';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import * as moment from 'moment'
import { FlatpickrModule } from 'angularx-flatpickr';
import { MainHomeService } from 'src/app/services/main-home.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-provider-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent, FormsModule, GoogleMapsComponent, FlatpickrModule],
  templateUrl: './provider-profile.component.html',
  styleUrls: ['./provider-profile.component.scss'],
  providers: [DatePipe],
})
export class ProviderProfileComponent implements OnInit {

  @ViewChild('binMap') binMap: GoogleMapsComponent | any;

  selectedSpeciality: string = '';
  selectedService: string = '';
  selectedLocation: string = '';
  selectedDate: string = '';
  rating: number = 5;

  formattedDate: string = '';
  preDate: string = '';
  searchQuery: any;

  morningSlots: any[] = [];
  afternoonSlots: any[] = [];
  eveningSlots: any[] = [];

  morningLength: number = 5;
  afternoonLength: number = 5;
  eveningLength: number = 5;
  selectedSlot: any = null;

  slotsData: any
  mapData: any
  tomorrowDate: any

  slots: any = [
    '08:30 AM', '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM'
  ]
  providerDetails: any = []


  inlineDatePicker: Date | any = new Date();
  flatpickrOptions: any = {
    disable: [
      (date: Date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date < today;
      }
    ],

  };


  constructor(private apiService: MainHomeService) {

  }

  ngOnInit(): void {
    let providers: any = localStorage.getItem("profileInfo");
    this.providerDetails = JSON.parse(providers)

    console.log("received", this.providerDetails)




    let dt: any = localStorage.getItem("searchData");
    let searchData = JSON.parse(dt);
    console.log(searchData);
    if (!!searchData) {

      let payload = {
        mainSpeciality: searchData.selectedSpeciality,
        service: searchData.selectedSpeciality,
        // service: searchData.selectedService,
        zipCode: searchData.selectedLocation,
        date: moment(searchData.selectedDate).format('YYYY-MM-DD')
      }
      this.searchQuery = payload
    }

    this.formattedDate = moment(searchData.date).format('MMM Do');
    this.preDate = moment(searchData.selectedDate).format('YYYY-MM-DD');

    if (!!this.providerDetails) {


      let slots = this.providerDetails?.locationInformation

      slots.forEach((elem: any) => {
        // let body = { locName: elem.locationName, zipCode: elem.zip }
        // this.mapData.push(body);
        if (elem.availableSlots.length > 0) {
          this.slotsData = elem.availableSlots
          elem.availableSlots.forEach((slot: any) => {

            // Parse startTimeOnly into a moment object
            const slotTime = moment(slot.startTimeOnly, 'HH:mm:ss');

            // Define morning and afternoon end times
            const morningEnd = moment('12:00:00', 'HH:mm:ss');
            const afternoonEnd = moment('17:00:00', 'HH:mm:ss');

            if (slotTime.isBefore(morningEnd)) {
              this.morningSlots.push(slot);
            } else if (slotTime.isBetween(morningEnd, afternoonEnd, null, '[)')) {
              this.afternoonSlots.push(slot);
            } else {
              this.eveningSlots.push(slot);
            }
          })
        }
      })
      console.log("Morning", this.morningSlots);
      console.log("Evening", this.eveningSlots);
      console.log("AfterNoon", this.afternoonSlots);

      // setTimeout(() => {
      //   this.binMap.setupLocations(this.mapData)
      // }, 2000)
    }

  }
  getFormattedDate(): string {
    return moment(this.inlineDatePicker).format('MMM Do'); // 'Do' adds the ordinal suffix
  }
  showMore(period: string) {
    if (period === 'morning') {
      this.morningLength = this.morningSlots.length;
    } else if (period === 'evening') {
      this.afternoonLength = this.afternoonSlots.length;
    } else if (period === 'afternoon') {
      this.afternoonLength = this.afternoonSlots.length;
    } else {
      return;
    }

  }
  selectSlot(slot: any): void {
    console.log('selectSlot', slot);
    this.selectedSlot = slot;
  }

  setRating(star: any) {

  }

  onDateChange(newDate: any) {
    console.log("-----", moment(this.inlineDatePicker).format('DD/MM/YYYY'))
    this.slotsDate('selected')
  }
  getStatusColor(status: any): string {
    switch (status) {
      case true:
        return '#027A48'; // Example color for booked status
      // case 'true':
      //   return '#026AA2'; // Example color for reserved status
      case false:
        return '#B42318';
      // Add more cases as needed
      default:
        return 'yellow'; // Default color
    }
  }
  getStatusBg(status: any): string {
    switch (status) {
      case true:
        return '#ECFDF3'; // Example color for booked status
      // Example color for reserved status
      case false:
        return '#f4d3d3';
      // Add more cases as needed
      default:
        return 'yellow'; // Default color
    }
  }


  sendDataForPayment(slot: any, data: any) {
    console.log("send", slot);
    console.log("send", data);

    // let dt = [slot, ...data?.providerInformation]
    // let dt = [...data?.providerInformation, slot];
    // let dt = [{...slot}, ...data?.providerInformation];
    let mergedData = { ...slot, ...data?.providerInformation };

    console.log("send", mergedData);

    localStorage.setItem('slotInfo', JSON.stringify(mergedData));
  }




  // slotsDate(type: any) {
  //   let payload: any
  //   let date: any
  //   if (type === 'today') {
  //     if (!!this.preDate) {
  //       date = this.preDate;
  //     } else {
  //       let dt = new Date();
  //       date = moment(dt).format('YYYY-MM-DD');
  //     }
  //     this.getSlotsData(date)

  //   } else if (type === 'tomorrow') {
  //     let dt = new Date();
  //     date = moment(dt).format('YYYY-MM-DD');

  //     this.getSlotsData(date)


  //   } else if (type === 'selected') {

  //     date = moment(this.inlineDatePicker).format('YYYY-MM-DD');

  //     this.getSlotsData(date)


  //   } else {
  //     return
  //   }



  // }
  slotsDate(type: string) {
    let date: string;

    if (type === 'today') {
      date = this.preDate ? this.preDate : moment().format('YYYY-MM-DD');
    } else if (type === 'tomorrow') {
      date = moment().add(1, 'day').format('YYYY-MM-DD');

      this.tomorrowDate = moment().add(1, 'day').format('MMM Do');
    } else if (type === 'selected') {
      date = moment(this.inlineDatePicker).format('YYYY-MM-DD');
    } else {
      return;
    }

    console.log("-------------------", date);

    this.getSlotsData(date);
  }


  getSlotsData(date: any) {

    let payload = {
      date: date,
      providerId: this.providerDetails?.providerInformation?._id,
    }

    this.apiService.searchProvidersByCriteriaByProviderId(payload).pipe(first()).subscribe((res: any) => {
      console.log("============,", res);

      let dt = res.slotData
      dt.forEach((slot: any) => {
        slot.timeSlot = moment(slot.startTimeOnly, 'HH:mm:ss').format('h:mm A');


      })
      console.log("============,", dt);

      const filteredDt = dt.filter((ele: any) => !!ele.slotLocation);
      console.log("slot===========>filteredDt", filteredDt)

      this.slotsData = filteredDt
      console.log("slot===========>", this.slotsData)


      this.morningSlots = [];
      this.eveningSlots = [];
      this.afternoonSlots = [];
      this.slotsData.forEach((slot: any) => {
        // Parse startTimeOnly into a moment object
        const slotTime = moment(slot.startTimeOnly, 'HH:mm:ss');

        // Define morning and afternoon end times
        const morningEnd = moment('12:00:00', 'HH:mm:ss');
        const afternoonEnd = moment('17:00:00', 'HH:mm:ss');

        // Categorize the slots based on the time
        if (slotTime.isBefore(morningEnd)) {
          this.morningSlots.push(slot);  // Before 12:00:00 (morning)
        } else if (slotTime.isBetween(morningEnd, afternoonEnd, null, '[)')) {
          this.afternoonSlots.push(slot);  // Between 12:00:00 and 17:00:00 (afternoon)
        } else {
          this.eveningSlots.push(slot);  // After 17:00:00 (evening)
        }
      });
      console.log("Morning", this.morningSlots);
      console.log("Evening", this.eveningSlots);
      console.log("AfterNoon", this.afternoonSlots);

    }, ((err: any) => {
      // this.spinner.hide();
      this.slotsData = [];
      this.showError(err?.error?.message);
    }));
  }
  showError(error: any) {
    this.apiService.errorToster(error, 'Error!',);
  }
}
