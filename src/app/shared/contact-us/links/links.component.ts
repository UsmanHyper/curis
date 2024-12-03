import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-links',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss']
})
export class LinksComponent {
  specialists: any = [
    "Dermatologists in Chicago",
    "Dermatologists in Chicago",
    "Dermatologists in Chicago",
    "Dermatologists in Chicago",
    "Dermatologists in Chicago",
    "Dermatologists in Chicago",
  ];
  doctors: any = [
    "Doctors in Chicago",
    "Doctors in Chicago",
    "Doctors in Chicago",
    "Doctors in Chicago",
    "Doctors in Chicago",
    "Doctors in Chicago",
  ];
  social: any = [
    "Twitter",
    "LinkedIn",
    "Facebook",
    "GitHub",
    "Tiktok",
    "Dribbble",
  ];
  legal: any = [
    { name: "Terms", link: "/terms-and-condition" },
    { name: "Privacy", link: "/privacy-policy" },
    { name: "Contact", link: "/contact-us" },
    { name: "Careers", link: "/contact-us" },
    { name: "About Us", link: "/about-us" },
    { name: "Notice Policy", link: "/notice-private-policy" },
  ]
}
