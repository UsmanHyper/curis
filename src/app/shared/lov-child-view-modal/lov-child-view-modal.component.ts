import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { first, Subscription, take, timer } from 'rxjs';
import { DataSharingService } from 'src/app/services/data-sharing-servcie';
import { MainHomeService } from 'src/app/services/main-home.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { providerService } from 'src/app/platform/provider-section/provider.service';
import { authenticationService } from 'src/app/services/authentication.service';
import * as moment from 'moment';
import { adminService } from 'src/app/platform/admin-section/admin.service';
import { PaginationComponent } from '../pagination/pagination.component';

@Component({
  selector: 'app-lov-child-view-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, PaginationComponent],
  templateUrl: './lov-child-view-modal.component.html',
  styleUrls: ['./lov-child-view-modal.component.scss']
})
export class LovChildViewModalComponent implements OnInit {
  title: any;
  initialState: any;

  itemInView: number = 5;
  totalView: number = 10;

  totalPages: any = 10;
  itemsPerPage: any = 10;
  currentPage: number = 1;
  totalItems: number = 0;


  userToken: any;
  lovValueList: any;
  lovAlldata: any;

  constructor(
    private fb: FormBuilder, private router: Router, public bsModalRef: BsModalRef,
    private modalService: BsModalService, private dss: DataSharingService,private viewportScroller: ViewportScroller,
    private apiService: MainHomeService, private spinner: NgxSpinnerService,
    private providerService: providerService, private authenticationService: authenticationService, private adminService: adminService) {





  }

  ngOnInit(): void {
    this.userToken = this.authenticationService.getUserToken();
    this.getData(this.initialState.payload)

   this.title =  this.initialState.title
  }

  getData(id?: any) {
    this.adminService.getLovsbyId(this.userToken, id)
      .pipe(first())
      .subscribe(
        (res: any) => {
          // this.spinner.hide();
          this.lovValueList = res[0].lovs
          this.lovAlldata = res[0]
        },
        (err: any) => {
          this.spinner.hide();
        }
      );
  }






  onCheckboxChange(event: Event, ev: any): void {
    const inputElement = event.target as HTMLInputElement;
    //  inputElement.checked;
    console.log('Checkbox state:', inputElement.checked);
    console.log('Checkbox state:', ev);

    this.handleChange(inputElement.checked, ev)

  }


  handleChange(newValue: boolean, data: any) {
    let payload = {
      isActive: newValue
    }

    // this.adminService.putProviderDetails(this.userToken, data._id, payload)
    //   .pipe(first())
    //   .subscribe(
    //     (res: any) => {
    //       // this.spinner.hide();
    //       console.log(res);
    //       this.getProviderDetails();
    //     },
    //     (err: any) => {
    //       this.spinner.hide();
    //       this.showError(err?.error?.message?.description);
    //     }
    //   );

  }


  delLovValue(itemId?: any, childId?: any) {

    this.adminService.delLovsNewChild(this.userToken, itemId, childId)
      .pipe(first())
      .subscribe(
        (res: any) => {
          this.getData(res.id)
        },
        (err: any) => {
        }
      );
  }


  updateLovValue(data?: any) {

  }


  closeModal() {
    this.bsModalRef.hide()

  }


  showError(error: any) {
    this.apiService.errorToster(error, 'Error!',);
  }



  onPageChange(page: number): void {
    this.currentPage = page;

    // this.getHallData("", page)
  }


  calculatePages(item: number): void {
    if (item > 0) {
      this.totalPages = Math.ceil(item / this.itemsPerPage);
    }
  }


  setPage(page: number): void {
    this.currentPage = page;
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.totalItems);
    // this.pagedItems = this.filteredData;

    this.viewportScroller.scrollToPosition([0, 0]);
    // this.itemInView = this.totalItems
    // this.totalView = this.pagedItems

    // this.pageInfo = {
    //   page_size: this.totalItems || 0,
    //   on_display: this.pagedItems.length || 0,
    // };
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
}

