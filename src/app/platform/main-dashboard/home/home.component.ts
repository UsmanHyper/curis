import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from 'src/app/shared/footer/footer.component';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { LinksComponent } from 'src/app/shared/links/links.component';
import { TestimonialComponent } from 'src/app/platform/main-dashboard/testimonial/testimonial.component';
import { WorkflowComponent } from '../workflow/workflow.component';
import { KeyFeaturesComponent } from '../key-featuers/key-features.component';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HeaderComponent, FooterComponent, LinksComponent, TestimonialComponent, WorkflowComponent, KeyFeaturesComponent]
})
export class HomeComponent {

  selectedSpeciality: string = '';
  selectedService: string = '';
  selectedLocation: string = '';
  selectedDate: string = '';
  rating:number=5;

  slots: any = [
    '08:30 AM', '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM'
  ];

  search() {
    console.log('Speciality:', this.selectedSpeciality);
    console.log('Service:', this.selectedService);
    console.log('Location:', this.selectedLocation);
    console.log('Date:', this.selectedDate);
  }


  setRating(star:any){

  }
}
