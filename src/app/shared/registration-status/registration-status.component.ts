import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { first } from 'rxjs';
import { authenticationService } from 'src/app/services/authentication.service';
import { MainHomeService } from 'src/app/services/main-home.service';

@Component({
  selector: 'app-registration-status',
  standalone: true,
  imports: [CommonModule, RouterModule, NgxSpinnerModule],
  templateUrl: './registration-status.component.html',
  styleUrls: ['./registration-status.component.scss']
})
export class RegistrationStatusComponent implements OnInit {
  isSuccess: boolean = false

  successBtn: any = 'Login Provider portal'

  @Input() successStatus: any;
  @Input() successTitle: any;
  @Input() successResponse: any;


  constructor(private router: Router, private route: ActivatedRoute, private authenticationService: authenticationService, private spinner: NgxSpinnerService, private apiService: MainHomeService

  ) { }



  ngOnChanges(changes: SimpleChanges): void {
    if (changes['successStatus']) {
      this.successStatus = changes['successStatus'].currentValue;
      if (!!this.successStatus) {
        this.isSuccess = this.successStatus

      }
    }

    if (changes['successTitle']) {
      this.successTitle = changes['successTitle'].currentValue;
      if (!!this.successTitle) {
        this.successBtn = this.successTitle

      }
    }

    if (changes['successResponse']) {
      this.successResponse = changes['successResponse'].currentValue;
      if (!!this.successResponse) {
        this.successResponse = this.successResponse

      }
    }

  }


  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      const successParam = params['ispaid']; // Get the 'success' query parameter
      this.isSuccess = successParam === 'true'; // Convert it to a boolean
    });
    localStorage.removeItem('appointmentId')
    localStorage.removeItem('user_response')
  }






  gotoDashboard() {
    // let response = localStorage.getItem("user_response") || ""
    // let res = JSON.parse(response)
    // // this.authenticationservice.setLoggedInUser(res);
    // if (res.user_Type == "Patient") {
    //   this.router.navigate(['/userDashboard']);
    // }
    this.getUserDetailsByTokenRequest(this.successResponse);
    localStorage.setItem("isLoggedIn", "true");

  }


  getUserDetailsByTokenRequest(data: any) {
    this.spinner.show();
    this.authenticationService.getDataByToken(data)
      .pipe(first())
      .subscribe(
        (res: any) => {
          if (res) {
            this.authenticationService.setLoggedInUser(res);
            if (res.user_Type == "Provider") {
              this.getProviderDataById(res._id, data);
              this.router.navigate(['/providerDashboard']);
            }
            else if (res.user_Type == "Patient") {
              this.router.navigate(['/userDashboard']);
            }
            else if (res.user_Type == "Admin") {
              this.router.navigate(['/AdminDashboard']);
            }
            else if (res.user_Type == "Lab") {
              this.router.navigate(['/LabDashboard']);
            }
          }
        },
        (err: any) => {
          this.spinner.hide();
          this.showError(err?.error?.message?.description);
        }
      );
  }

  getProviderDataById(providerId: any, token: any) {
    this.spinner.show();
    this.authenticationService.getProviderDataById(token, providerId)
      .pipe(first())
      .subscribe(
        (res: any) => {
          this.authenticationService.setProviderData(res);
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
  // localStorage.setItem("isLoggedIn", "true");

}
