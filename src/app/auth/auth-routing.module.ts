import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultScreenComponent } from './default-screen/default-screen.component';
import { LoginComponent } from './login/login.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { VerifyOtpComponent } from './verify-otp/verify-otp.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes: Routes = [
  {
    path: '', component: DefaultScreenComponent,
    children: [
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'reset-password', component: ChangePasswordComponent , pathMatch: 'full'},
      { path: 'verify-otp', component: VerifyOtpComponent , pathMatch: 'full'},
      { path: 'forgot-password', component: ForgotPasswordComponent , pathMatch: 'full'},
    ]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }