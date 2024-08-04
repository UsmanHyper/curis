import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-links',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss']
})
export class LinksComponent {

  specialists: any = [
    "Dermatologists in New York",
    "Dermatologists in New York",
    "Dermatologists in New York",
    "Dermatologists in New York",
    "Dermatologists in New York",
    "Dermatologists in New York",
  ];
  doctors: any = [
    "Doctors in Dallas",
    "Doctors in Dallas",
    "Doctors in Dallas",
    "Doctors in Dallas",
    "Doctors in Dallas",
    "Doctors in Dallas",
  ];
  social: any = [
    "Twitter",
    "LinkedIn",
    "Facebook",
    "GitHub",
    "AngelList",
    "Dribbble",
  ];
  legal: any = [
    "Terms",
    "Privacy",
    "Contact",
    "Careers",
    "Help",
    "Contact",
  ];

}
