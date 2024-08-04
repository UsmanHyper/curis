import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // { path: '', component: HomeComponent },
  // { path: 'signup', component: SignupComponent },
  // { path: 'doctor-profile', component: DoctorProfileComponent },
  // { path: 'schedule-appointment', component: ScheduleAppointmentComponent },
  // { path: 'login', component: LoginComponent },
  // { path: 'forgotPassword', component: ForgotPasswordComponent },
  // { path: 'payment-status', component: PaymentStatusComponent },
  // {
  //   path: "providerDashboard",
  //   component: ProviderDashboardComponent,
  //   canActivate: [providerAuthGuard],
  //   data: {
  //     title: "provider Dashboard",
  //   },
  //   children: [
  //     {
  //       path: "",
  //       loadChildren: () =>
  //         import("./provider-module/provider-module.module").then(
  //           (m) => m.ProviderModuleModule
  //         ),
  //     },
  //   ],
  // },

  {
    path: "",
    loadComponent: () =>
      import("./platform/main-dashboard/home/home.component").then(
        (mod) => mod.HomeComponent
      ),
  },
  {
    path: "service-providers",
    loadComponent: () =>
      import("./platform/main-dashboard/service-providers/service-providers.component").then(
        (mod) => mod.ServiceProvidersComponent
      ),
  },
  {
    path: "service-booking-flow",
    loadComponent: () =>
      import("./platform/service-booking-flow/service-booking-flow.component").then(
        (mod) => mod.ServiceBookingFlowComponent
      ),
  },
  {
    path: "about-us",
    loadComponent: () =>
      import("./platform/about-us/about-us.component").then(
        (mod) => mod.AboutUsComponent
      ),
  },
  {
    path: "contact-us",
    loadComponent: () =>
      import("./platform/contact-us/contact-us.component").then(
        (mod) => mod.ContactUsComponent
      ),
  },
  {
    path: "blogs",
    loadComponent: () =>
      import("./platform/blog/blog.component").then(
        (mod) => mod.BlogComponent
      ),
  },
  {
    path: 'register',
    loadChildren: () => import('./auth/auth.module').then(m => (m.AuthModule))
  }
  // {
  //   path: "userDashboard",
  //   component: UserDashboardComponent,
  //   canActivate: [],
  //   data: {
  //     title: "user Dashboard",
  //   },
  //   children: [
  //     {
  //       path: "",
  //       loadChildren: () =>
  //         import("./user-module/user-module.module").then(
  //           (m) => m.UserModuleModule
  //         ),
  //     },
  //   ],
  // },
  // {
  //   path: "AdminDashboard",
  //   component: AdminDashboardComponent,
  //   canActivate: [adminAuthGuard],
  //   data: {
  //     title: "Admin Dashboard",
  //   },
  //   children: [
  //     {
  //       path: "",
  //       loadChildren: () =>
  //         import("./admin-module/admin-module.module").then(
  //           (m) => m.AdminModuleModule
  //         ),
  //     },
  //   ],
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
