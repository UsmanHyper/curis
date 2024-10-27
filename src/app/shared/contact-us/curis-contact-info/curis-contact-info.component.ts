import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../footer/footer.component';
import { HeaderComponent } from '../../header/header.component';
import { LinksComponent } from './../links/links.component';
import { CurisContactFormComponent } from '../curis-contact-form/curis-contact-form.component';

@Component({
  selector: 'app-curis-contact-info',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent, LinksComponent, CurisContactFormComponent
  ],
  templateUrl: './curis-contact-info.component.html',
  styleUrls: ['./curis-contact-info.component.scss']
})
export class CurisContactInfoComponent {


  cardInfo = [
    { title: 'Email', description: 'Our friendly team is here to help.', link: "info@curis.com", icon: 'bi bi-envelope' },
    { title: 'Office', description: 'Come say hello at our office HQ.', link: "100 Smith Street Collingwood VIC 3066 AU", icon: 'bi bi-geo-alt' },
    { title: 'Phone', description: 'Mon-Fri from 8am to 5pm.', link: "+1 (555) 000-0000", icon: 'bi bi-telephone' },

  ]
}
