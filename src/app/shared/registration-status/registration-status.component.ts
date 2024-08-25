import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { authenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-registration-status',
  standalone: true,
  imports: [CommonModule, RouterModule,],
  templateUrl: './registration-status.component.html',
  styleUrls: ['./registration-status.component.scss']
})
export class RegistrationStatusComponent  implements OnInit {
  isSuccess: boolean = false

  @Input() successStatus: any;


  constructor(private router: Router, private route: ActivatedRoute,) { }



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
    let response = localStorage.getItem("user_response") || ""
    let res = JSON.parse(response)
    // this.authenticationservice.setLoggedInUser(res);
    if (res.user_Type == "Patient") {
      this.router.navigate(['/userDashboard']);
    }
  }



}
