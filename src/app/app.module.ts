import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import FormsModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaymentStatusComponent } from './shared/payment-status/payment-status.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { FlatpickrModule } from 'angularx-flatpickr';


@NgModule({
  declarations: [
    AppComponent,
    // HomeComponent,

    // GoogleMapsComponent,
  ],
  imports: [
    AppRoutingModule,
    NgbModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxMaskModule.forRoot(),
    FlatpickrModule.forRoot(),
    ToastrModule.forRoot({
      preventDuplicates: false,
      autoDismiss: true,
    })
  ],
  providers: [],
  // providers: [
  //   { provide: HTTP_INTERCEPTORS, useClass: x, multi: true },

  // ],
  bootstrap: [AppComponent]
})


export class AppModule { }
