import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-links',
  standalone: true,
  imports: [CommonModule,RouterModule],
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



  legal : any =[
    {name:"Terms" , link:"/terms-and-condition"},
    {name:"Privacy" , link:"/privacy-policy"},
    {name:"Contact" , link:"/contact-us"},
    {name:"Careers" , link:"/contact-us"},
    {name:"About Us" , link:"/about-us"},
    {name:"Notice Policy" , link:"/notice-private-policy"},
  ]
}
