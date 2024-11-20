import { Component, OnInit } from '@angular/core';
import { CalendarOptions, EventApi, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';

import { providerService } from '../provider.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { first } from 'rxjs';
import * as moment from 'moment'
import { ViewportScroller } from '@angular/common';
import { MainHomeService } from 'src/app/services/main-home.service';

import { BsModalService, BsModalRef, ModalOptions, ModalModule } from 'ngx-bootstrap/modal';
import { CalenderAppointmentModalComponent } from 'src/app/shared/calender-appointment-modal/calender-appointment-modal.component';
import { authenticationService } from 'src/app/services/authentication.service';
import { DataSharingService } from 'src/app/services/data-sharing-servcie';
import Swal from 'sweetalert2';





@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss']
})
export class CalenderComponent implements OnInit {

  Events: any[] = [];
  // events: any[] = [];
  events: any[] = [];
  providersLocation: any;
  providerData: any;
  userToken: any;
  modalRef!: BsModalRef;

  eventsPromise: Promise<EventInput[]> | any;
  isModalOpen = false;


  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin, bootstrap5Plugin],
    initialView: 'dayGridMonth',
    themeSystem: 'bootstrap5',
    headerToolbar: {
      // left: 'prev , next, today',
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    // weekends: true,
    // editable: false,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,

    editable: true,
    droppable: true,
    weekends: true,
    drop: function (info) {
      // alert('clicked ' + info);
    },


    // eventRender: this.handleEventRender.bind(this),
  };
  constructor(private providerService: providerService,
    private modalService: BsModalService, private spinner: NgxSpinnerService, private apiService: MainHomeService,
    private viewportScroller: ViewportScroller, private authenticationService: authenticationService, private dss: DataSharingService) {

  }


  ngOnInit(): void {


    this.calendar()
    this.providerData = this.providerService.getProviderData()
    this.userToken = this.authenticationService.getUserToken();
    this.getProviderAppointment(this.providerData._id)

    this.dss.onSignal().subscribe((value: any) => {

      if (value && value.type === "appointment-saved") {
        this.calendar()
        this.providerData = this.providerService.getProviderData()
        this.userToken = this.authenticationService.getUserToken();
        this.getProviderAppointment(this.providerData._id)
      }
    })
  }

  calendar() {
    setTimeout(() => {
      this.calendarOptions = {
        initialView: 'dayGridMonth',
        events: this.events,
        displayEventTime: true,
        displayEventEnd: true,
        eventColor: '#378006',
        eventTimeFormat: { // like '14:30:00'
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          meridiem: false
        },
        eventBackgroundColor: '#3ca5dc',
        eventClick: this.handleEventClicked.bind(this),
        eventDrop: this.handleEventDrop.bind(this),
        // dateClick: this.onDateClick.bind(this),
        // dateClick: this.onDateClick.bind(this),
        // eventOverlap: function(stillEvent:any, movingEvent:any) {
        //   return stillEvent.allDay && movingEvent.allDay;
        // }
        eventOverlap: this.checkEventOverlap.bind(this),
        // dateClick: (info) => this.handleDateClick(info)   // alert('clicked ' + info.dateStr);

        // ,
        dateClick: this.handleDateClick.bind(this),
        select: (info) => this.handleTimeSelect(info)
        // select: function (info) {
        //   alert('selected ' + info);
        //   console.log('selected ', info);
        // }
      };
    }, 1000);
  }


  getProviderAppointment(providerId: any) {

    this.spinner.show();
    this.providerService.getProviderAppointmentInformation(this.userToken, providerId).pipe(first())
      .subscribe(
        (res: any) => {
          console.log("Provider information Slots", res)
          let dt = res.slots
          dt.forEach((ele: any) => {
            // const parsedDate = moment(ele.startTime, 'DD/MM/YYYY : hh:mm:ss A');
            // const parsedDateEnd = moment(ele.endTime, 'DD/MM/YYYY : hh:mm:ss A');
            ele.title = ele?.appointmentTitle || " Empty Appointment Slot";
            ele.start = `${ele.dateOnly}T${ele.startTimeOnly}`
            // ele.start = ele.startTime;
            // ele.end = ele.endTime;
            ele.end = `${ele.dateOnly}T${ele.endTimeOnly}`;
            ele.appointmentId = ele._id
            //           start: new Date(event.startTime).toISOString(), // Converts UTC to local ISO format
            // end: new Date(event.endTime).toISOString(),
            // ele.start = parsedDate.format('YYYY-MM-DDTHH:mm:ss');
            // ele.end = parsedDateEnd.format('YYYY-MM-DDTHH:mm:ss');
          });
          this.events = dt
          console.log("Provider information Slots", this.events)


          this.calendar()
          // this.serviceLov = res[0].lovs;
          this.spinner.hide();
        },
        (err: any) => {
          this.spinner.hide();
          // this.showError(err?.error?.message?.description);
        }
      );
  }




  handleTimeSelect(info: any) {
    if (info.event) {
      // This is the 'select' event
      console.log('Selected range info:', info);
      // Open modal for selected event
      this.openModal1(info.event);
    } else {
      // This is the 'dateClick' event
      console.log('Clicked date info:', info);
      // Open modal for date click
      this.openModalForDate(info.date);
    }
  }

  handleDateClick(info: any) {
    // This is the 'dateClick' event
    console.log('Clicked date info:', info);
    // Open modal for date click
    this.openModalForDate(info.date);
  }


  openModal1(event: any) {
    // Your code to open modal for the selected event
    console.log('Opening modal for event:', event);
  }

  openModalForDate(date: Date) {
    // Your code to open modal for the clicked date
    console.log('Opening modal for date:', date);
    this.viewportScroller.scrollToPosition([0, 0]);

    setTimeout(() => {
      this.openModal(date, "eventDataNew");
    }, 1000)
  }





  checkEventOverlap(stillEvent: any, movingEvent: any): boolean {
    console.log("stillEvent", stillEvent);
    // console.log("stillEvent", movingEvent);
    return stillEvent.allDay && movingEvent.allDay;
  }

  onDateClick(res: any) {
    alert('Clicked on date : ' + res.dateStr);

  }


  handleEventClicked(arg: any) {
    // arg.event will contain the clicked event data
    const eventData = arg.event;

    console.log('Clicked Event:', eventData);
    console.log('Clicked Event:', eventData['_def'].title);
    console.log('Clicked Event:', eventData['_def'].extendedProps);
    console.log('Clicked Event:', eventData._instance.range.end);
    console.log('Clicked Event:', eventData["_instance"].range.start);

    let slotData = eventData['_def'].extendedProps
    // let payload = {
    //   title: eventData['_def'].title,
    //   start: eventData._instance.range.start,
    //   end: eventData._instance.range.end,
    // }

    // this.openModal(payload, "eventDataUpdate");
    const popover = document.querySelector('.fc-more-popover');
    if (popover) {
      popover.remove();
    }
    if (slotData.isAvailable === true) {
      this.deleteLocationInformation(slotData.providerId, slotData._id)
    } else {
      this.unableToDeleteLocationInformation();
    }

  }
  unableToDeleteLocationInformation() {
    Swal.fire({
      icon: "error",
      title: "Sorry ",
      text: "You cannot delete a slot with a booked appointment ",
    });
  }
  deleteLocationInformation(providerId: any, slotId: any) {

    Swal.fire({
      title: 'Are you sure you want to delete it?',

      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: 'grey',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.providerService.deleteProviderAppointmentSlot(this.userToken, providerId, slotId)
          .pipe(first())
          .subscribe(
            (res: any) => {
              this.spinner.hide();
              Swal.fire({
                title: 'Deleted!',
                text: 'Appointment Slot has been Deleted.',
                icon: 'success',
              });
              this.getProviderAppointment(this.providerData._id)
            },
            (err: any) => {
              this.spinner.hide();
              Swal.fire({
                title: 'Error!',
                text: 'An error occurred while deleting the Location.',
                icon: 'error',
              });
              // this.showError(err?.error?.message?.description);
            }
          );

      }
    });
  }


  openModal(payload?: any, type?: any) {
    console.log("openModal", payload, type);
    if (!!payload) {
      if (this.isModalOpen) {
        return; // Prevent opening multiple modals
      }

      // Set the flag to true as the modal is now opening
      this.isModalOpen = true;

      let initialState: ModalOptions = {
        initialState: {
          title: type === 'eventDataUpdate' ? 'Update Appointment Slot' : ' Add New Slot',
          payload: payload,
          type: type
        }
      };
      console.log("this this.initialState", initialState)
      this.modalRef = this.modalService.show(CalenderAppointmentModalComponent, {
        initialState,
        class: 'modal-dialog-centered modal-lg',
        ignoreBackdropClick: true,
        keyboard: false,
        animated: true,
        // backdrop: true,
        backdrop: 'static',
      });

      setTimeout(() => {
        if (this.modalRef && this.modalRef.onHide) {
          this.modalRef.onHide.subscribe(() => {
            this.isModalOpen = false;
          });
        }
      });
    }




    // const dialogRefLocation = this.dialog.open(AppointmentModalComponent, {
    //   width: '600px',
    //   height: '400px',
    // });

    // if (type === "eventDataUpdate") {
    //   dialogRefLocation.componentInstance.title = "Update Appointment";
    //   dialogRefLocation.componentInstance.data = payload;

    //   dialogRefLocation.afterClosed().subscribe(result => {
    //   });
    // } else if (type === "eventDataNew") {
    //   dialogRefLocation.componentInstance.title = "Add New Appointment";
    //   dialogRefLocation.componentInstance.data = payload;
    //   dialogRefLocation.afterClosed().subscribe(result => {
    //     this.getProviderAppointment(this.providerData._id)
    //   });
    // }
  }

  handleEventDrop(arg: any) {
    // arg.event will contain the updated event data
    const updatedEvent = arg.event;

    // arg.oldEvent will contain the original event data before the drop
    const originalEvent = arg.oldEvent;

    // Perform actions based on the event drop
    // console.log('Updated Event:', updatedEvent);
    // console.log('Original Event:', originalEvent);





    let UpdatedPayload = {
      title: updatedEvent['_def'].title,
      start: updatedEvent._instance.range.start,
      end: updatedEvent._instance.range.end,
    }
    let OriginalPayload = {
      title: originalEvent['_def'].title,
      start: originalEvent._instance.range.start,
      end: originalEvent._instance.range.end,
    }


    // console.log('Updated Event UpdatedPayload:', UpdatedPayload);
    // console.log('Original Event OriginalPayload:', OriginalPayload);

  }
}


