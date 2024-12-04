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
    { name: 'X', link: 'https://x.com/curisnow?s=11' },
    { name: 'LinkedIn', link: 'https://www.linkedin.com/company/curisnow' },
    { name: 'Facebook', link: 'https://www.facebook.com/share/15NbKRg8kc/?mibextid=LQQJ4d' },
    { name: 'Instagram', link: 'https://www.instagram.com/curisnow?igsh=MWs3MjJrN2JmbmZzdw==' },
    { name: 'Tiktok', link: 'https://www.tiktok.com/@curisnow?_t=8rv3juCZB2F&_r=1' },
  ];

  legal: any = [
    { name: "Terms", link: "/terms-and-condition" },
    { name: "Privacy", link: "/privacy-policy" },
    { name: "Contact", link: "/contact-us" },
    { name: "Careers", link: "/contact-us" },
    // {name:"About Us" , link:"/about-us"},
    { name: "Notice Policy", link: "/notice-private-policy" },
  ]

}
