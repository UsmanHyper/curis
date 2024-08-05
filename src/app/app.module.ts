import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import FormsModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GoogleMapsComponent } from './shared/google-maps/google-maps.component';
import { PaymentStatusComponent } from './shared/payment-status/payment-status.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './platform/main-dashboard/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    // HomeComponent,
    GoogleMapsComponent,
    PaymentStatusComponent,
  ],
  imports: [
    AppRoutingModule,
    NgbModule,
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})


export class AppModule { }
