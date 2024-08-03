import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { DefaultScreenComponent } from './default-screen/default-screen.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyOtpComponent } from './verify-otp/verify-otp.component';
import { ChangePasswordComponent } from './change-password/change-password.component';


@NgModule({
    declarations: [

    
    DefaultScreenComponent,
    LoginComponent,
    ForgotPasswordComponent,
    VerifyOtpComponent,
    ChangePasswordComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AuthRoutingModule,
        // NgOtpInputModule,
        // NgProgressModule.withConfig({
        //     spinner:false,
        //     color: "#426bf7",
        //     thick: true,
        // }),
        // NgProgressHttpModule,
        // ToastrModule.forRoot({
        //     timeOut: 10000,
        //     preventDuplicates: true,
        // }),

    ]
})
export class AuthModule { }