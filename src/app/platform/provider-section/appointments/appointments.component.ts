import { Component, OnInit } from '@angular/core';
import { providerService } from '../provider.service';
import { authenticationService } from 'src/app/services/authentication.service';
import { first } from 'rxjs';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { BsModalService, BsModalRef, ModalOptions, ModalModule } from 'ngx-bootstrap/modal';
import { DataSharingService } from 'src/app/services/data-sharing-servcie';
import { ProviderAppointmentDetailsComponent } from 'src/app/shared/provider-appointment-details/provider-appointment-details.component';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss'],
  providers: [DatePipe],

})
export class AppointmentsComponent implements OnInit {
  imgSrc1: string = './assets/images/admin/search.png';
  itemInView: number = 5;
  totalView: number = 10;
  appointmentList: any;
  userToken: any;
  providerData: any;
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

  dateTitle: string = "dd,mm,yyyy"
  modalRef!: BsModalRef;
  totalPages: any = 10;
  currentPage: number = 1;

  constructor(private providerService: providerService, private authenticationService: authenticationService, private modalService: BsModalService, private dss: DataSharingService) {

  }

  ngOnInit() {
    this.userToken = this.authenticationService.getUserToken();
    this.providerData = this.providerService.getProviderData();
    this.getProviderAppointments();

    this.dss.onSignal().subscribe((value: any) => {

      if (value && value.type === "patientInteraction-saved") {
        this.getProviderAppointments();
      }
    })
  }


  onDateChange(newDate: any) {
    this.dateTitle = moment(this.inlineDatePicker).format('DD/MM/YYYY')
  }

  viewAppointment(ev?: any) {
    console.log("viewAppointment", ev);
    this.openModal(ev, 'Appointment Details');

  }

  openModal(payload?: any, title?: any,) {
    console.log("openModal", payload, title);

    let initialState: ModalOptions = {
      initialState: {
        title: title,
        payload: payload,

      }
    };
    console.log("this this.initialState", initialState)
    this.modalRef = this.modalService.show(ProviderAppointmentDetailsComponent, {
      initialState,
      class: 'modal-dialog-centered modal-xl',
      // ignoreBackdropClick: true,
      keyboard: false,
      animated: true,
      backdrop: true,
      // backdrop: 'static',
    });

  }

  onPageChange(page: number): void {
    this.currentPage = page;

    // this.getHallData("", page)
  }


  getStatusColor(status: string): string {
    switch (status) {
      case 'New':
        return '#027A48'; // Example color for booked status
      case 'Completed':
        return '#026AA2'; // Example color for reserved status
      case 'cancelled':
        return '#B42318';
      // Add more cases as needed
      default:
        return '#f3f3f3'; // Default color
    }
  }
  getStatusBg(status: string): string {
    switch (status) {
      case 'New':
        return '#ECFDF3'; // Example color for booked status
      case 'Completed':
        return '#F0F9FF'; // Example color for reserved status
      case 'cancelled':
        return '#d50000';
      // Add more cases as needed
      default:
        return '#f3f3f3'; // Default color
    }
  }


  getProviderAppointments() {
    this.providerService.getScheduledAppointments(this.userToken, this.providerData._id)
      .pipe(first())
      .subscribe(
        (res: any) => {
          this.appointmentList = res
        },
        (err: any) => {
          // this.spinner.hide();
          // this.showError(err?.error?.message?.description);
        }
      );
  }



}
