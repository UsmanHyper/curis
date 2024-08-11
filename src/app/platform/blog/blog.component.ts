import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FooterComponent } from 'src/app/shared/footer/footer.component';
import { GoogleMapsComponent } from 'src/app/shared/google-maps/google-maps.component';
import { HeaderComponent } from 'src/app/shared/header/header.component';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent,FormsModule,GoogleMapsComponent],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent {

}
