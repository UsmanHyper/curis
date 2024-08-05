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

  search() {
    console.log('Speciality:', this.selectedSpeciality);
    console.log('Service:', this.selectedService);
    console.log('Location:', this.selectedLocation);
    console.log('Date:', this.selectedDate);
  }
}
