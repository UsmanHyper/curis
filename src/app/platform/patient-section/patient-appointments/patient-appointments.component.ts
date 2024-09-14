import { Component, OnInit } from '@angular/core';
import { authenticationService } from 'src/app/services/authentication.service';
import { first } from 'rxjs';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { BsModalService, BsModalRef, ModalOptions, ModalModule } from 'ngx-bootstrap/modal';
import { DataSharingService } from 'src/app/services/data-sharing-servcie';
import { providerService } from '../../provider-section/provider.service';
import { PatientAppointmentDetailsComponent } from 'src/app/shared/patient-appointment-details/patient-appointment-details.component';
import { userService } from 'src/app/services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { adminService } from 'src/app/services/admin.service';
import { MainHomeService } from 'src/app/services/main-home.service';

@Component({
  selector: 'app-patient-appointments',
  templateUrl: './patient-appointments.component.html',
  styleUrls: ['./patient-appointments.component.scss'],
  providers: [DatePipe],

})
export class PatientAppointmentsComponent implements OnInit {
  imgSrc1: string = './assets/images/provider/icon.png';
  itemInView: number = 5;
  totalView: number = 10;
  appointmentList: any;
  userToken: any;
  providerData: any;

  modalRef!: BsModalRef;
  totalPages: any = 10;
  currentPage: number = 1;


  // AppointmentList: any;
  dataToSend: any;
  showList: boolean = true;
  showDetail: boolean = false;

  constructor(private providerService: providerService, private authenticationService: authenticationService, private modalService: BsModalService,
    private dss: DataSharingService, private userService: userService, private spinner: NgxSpinnerService,
    public adminService: adminService, private apiService: MainHomeService) {

  }

  ngOnInit() {
    this.userToken = this.authenticationService.getUserToken();
    this.providerData = this.userService.getLoggedInUser()
    this.getAppointDetails();

    // this.dss.onSignal().subscribe((value: any) => {

    //   if (value && value.type === "patientInteraction-saved") {
    //     this.getProviderAppointments();
    //   }
    // })
  }


  // onDateChange(newDate: any) {
  //   this.dateTitle = moment(this.inlineDatePicker).format('DD/MM/YYYY')
  // }

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
    this.modalRef = this.modalService.show(PatientAppointmentDetailsComponent, {
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


  getStatusColor(status: any) {
    switch (status) {
      case true:
        return '#027A48'; // Example color for booked status
      case 'Completed':
        return '#026AA2'; // Example color for reserved status
      case false:
        return '#B42318';
      // Add more cases as needed
      default:
        return '#f3f3f3'; // Default color
    }
  }
  getStatusBg(status: any) {
    switch (status) {
      case true:
        return '#ECFDF3'; // Example color for booked status
      case 'Completed':
        return '#F0F9FF'; // Example color for reserved status
      case false:
        return '#c1414130';
      // Add more cases as needed
      default:
        return '#f3f3f3'; // Default color
    }
  }


  getAppointDetails() {
    this.spinner.show();
    this.adminService.getUserAppointmentDetailsByID(this.userToken, this.providerData._id)
      .pipe(first())
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          console.log(res);
          this.appointmentList = res
          let dt = res;

          dt.forEach((ele: any) => {

            ele.status = (ele.isCancelled === false && ele.isCompleted === false && ele.isPaid === true) ? true : false


          });

          this.dataToSend = res
          // this.getProviderData(res)
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
