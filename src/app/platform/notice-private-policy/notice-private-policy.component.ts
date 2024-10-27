import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from 'src/app/shared/footer/footer.component';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { LinksComponent } from 'src/app/shared/contact-us/links/links.component';

@Component({
  selector: 'app-notice-private-policy',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent, LinksComponent],
  templateUrl: './notice-private-policy.component.html',
  styleUrls: ['./notice-private-policy.component.scss']
})
export class NoticePrivatePolicyComponent {

}
