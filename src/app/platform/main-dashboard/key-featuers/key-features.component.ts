import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-key-features',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './key-features.component.html',
  styleUrls: ['./key-features.component.scss']
})
export class KeyFeaturesComponent {
  cardInfo = [
    { title: 'Healthcare Marketplace', description: 'A platform connecting uninsured and under-insured patients with healthcare providers.', icon: 'bi bi-envelope' },
    { title: 'Pay-for-Service Model', description: ' Transparent pricing structure allowing patients to pay directly for medical services without insurance.', icon: 'bi bi-lightning-charge' },
    { title: 'Economical Healthcare Options', description: 'Curated selection of affordable healthcare services and providers.', icon: 'bi bi-bar-chart' },
    { title: 'Provider Directory', description: 'Comprehensive listing of healthcare professionals and facilities offering services to uninsured patients.', icon: 'bi bi-emoji-smile' },
    { title: 'Appointment Booking', description: 'Integrated system for scheduling appointments with chosen healthcare providers.', icon: 'bi bi-calendar-plus' },
    { title: 'Secure Patient Portal', description: 'Protected access for managing personal health information and communication with providers.', icon: 'bi bi-chat' },
  ]
}
