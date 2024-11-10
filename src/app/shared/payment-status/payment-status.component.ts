import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { authenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-payment-status',
  templateUrl: './payment-status.component.html',
  styleUrls: ['./payment-status.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule,]
})
export class PaymentStatusComponent implements OnInit {
  isSuccess: boolean = false

  @Input() successStatus: any;


  constructor(private router: Router, private route: ActivatedRoute, private authenticationService: authenticationService) { }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['successStatus']) {
      this.successStatus = changes['successStatus'].currentValue;
      if (!!this.successStatus) {
        console.log("this tot price 1", this.successStatus)
        this.isSuccess = this.successStatus

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
    let response :any = localStorage.getItem("loggedInUser") || null
    let res = JSON.parse(response)
    
    if(!!res){
      this.authenticationService.setLoggedInUser(res);
      if (res.user_Type == "Provider") {
        // this.getProviderDataById(res._id)
        this.router.navigate(['/providerDashboard']);
      }
      else if (res.user_Type == "Patient") {
        this.router.navigate(['/patientDashboard']);
      }
      else if (res.user_Type == "Admin") {
        this.router.navigate(['/AdminDashboard']);
      }
      else if (res.user_Type == "Lab") {
        this.router.navigate(['/LabDashboard']);
      }
    }else{
      this.router.navigate(['/auth']);
    }
    

  }



}
