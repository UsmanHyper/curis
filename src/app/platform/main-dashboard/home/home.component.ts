import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from 'src/app/shared/footer/footer.component';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { LinksComponent } from 'src/app/shared/links/links.component';
import { TestimonialComponent } from 'src/app/platform/main-dashboard/testimonial/testimonial.component';
import { WorkflowComponent } from '../workflow/workflow.component';
import { KeyFeaturesComponent } from '../key-featuers/key-features.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent, LinksComponent, TestimonialComponent, WorkflowComponent, KeyFeaturesComponent]
})
export class HomeComponent {



  
}
