import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from 'src/app/shared/footer/footer.component';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { LinksComponent } from 'src/app/shared/contact-us/links/links.component';

@Component({
  selector: 'app-patient-feedback-survey',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent, LinksComponent],
  templateUrl: './patient-feedback-survey.component.html',
  styleUrls: ['./patient-feedback-survey.component.scss']
})
export class PatientFeedbackSurveyComponent {

}
