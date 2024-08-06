import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from 'src/app/shared/footer/footer.component';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { FormsModule } from '@angular/forms';
import { GoogleMapsComponent } from 'src/app/shared/google-maps/google-maps.component';


@Component({
  selector: 'app-service-providers',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent,FormsModule,GoogleMapsComponent],
  templateUrl: './service-providers.component.html',
  styleUrls: ['./service-providers.component.scss']
})
export class ServiceProvidersComponent {
  selectedSpeciality: string = '';
  selectedService: string = '';
  selectedLocation: string = '';
  selectedDate: string = '';
  rating:number=5;

  slots: any = [
    '08:30 AM', '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM'
  ]

  search() {
    console.log('Speciality:', this.selectedSpeciality);
    console.log('Service:', this.selectedService);
    console.log('Location:', this.selectedLocation);
    console.log('Date:', this.selectedDate);
  }


  setRating(star:any){

  }

}
