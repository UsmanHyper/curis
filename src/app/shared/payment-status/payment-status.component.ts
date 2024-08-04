import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { authenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-payment-status',
  templateUrl: './payment-status.component.html',
  styleUrls: ['./payment-status.component.scss']
})
export class PaymentStatusComponent implements OnInit {
  isSuccess: boolean = false
  constructor(private router: Router, private route: ActivatedRoute, private authenticationservice: authenticationService,) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params:any) => {
      const successParam = params['ispaid']; // Get the 'success' query parameter
      this.isSuccess = successParam === 'true'; // Convert it to a boolean
    });
    localStorage.removeItem('appointmentId')
    localStorage.removeItem('user_response')
  }

  gotoDashboard() {
    let response = localStorage.getItem("user_response") || ""
    let res = JSON.parse(response)
    this.authenticationservice.setLoggedInUser(res);
    if (res.user_Type == "Patient") {
      this.router.navigate(['/userDashboard']);
    }
  }



}
