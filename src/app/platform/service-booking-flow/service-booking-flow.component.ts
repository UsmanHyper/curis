import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from 'src/app/shared/footer/footer.component';
import { HeaderComponent } from 'src/app/shared/header/header.component';

@Component({
  selector: 'app-service-booking-flow',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent,],
  templateUrl: './service-booking-flow.component.html',
  styleUrls: ['./service-booking-flow.component.scss']
})
export class ServiceBookingFlowComponent {

}
