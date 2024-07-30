import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GoogleMapsComponent } from './shared/google-maps/google-maps.component';
import { PaymentStatusComponent } from './shared/payment-status/payment-status.component';

@NgModule({
  declarations: [
    AppComponent,
    GoogleMapsComponent,
    PaymentStatusComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
