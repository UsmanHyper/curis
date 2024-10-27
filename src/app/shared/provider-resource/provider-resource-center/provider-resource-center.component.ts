import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../footer/footer.component';
import { HeaderComponent } from '../../header/header.component';
import { LinksComponent } from '../../links/links.component';
import { GettingStartedComponent } from '../getting-started/getting-started.component';

@Component({
  selector: 'app-provider-resource-center',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent, LinksComponent,
    GettingStartedComponent, ],
  templateUrl: './provider-resource-center.component.html',
  styleUrls: ['./provider-resource-center.component.scss']
})
export class ProviderResourceCenterComponent {

}
