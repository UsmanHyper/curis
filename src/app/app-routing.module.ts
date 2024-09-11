import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProviderDashboardComponent } from './platform/provider-section/provider-dashboard/provider-dashboard.component';
import { DefaultScreenComponent } from './auth/default-screen/default-screen.component';
import { PatientDashboardComponent } from './platform/patient-section/patient-dashboard/patient-dashboard.component';

const routes: Routes = [
  // { path: '', component: HomeComponent },
  // { path: 'signup', component: SignupComponent },
  // { path: 'doctor-profile', component: DoctorProfileComponent },
  // { path: 'schedule-appointment', component: ScheduleAppointmentComponent },
  // { path: 'login', component: LoginComponent },
  // { path: 'forgotPassword', component: ForgotPasswordComponent },
  // { path: 'payment-status', component: PaymentStatusComponent },
  {
    path: "providerDashboard",
    component: ProviderDashboardComponent,
    // canActivate: [providerAuthGuard],
    data: {
      title: "Provider Dashboard",
    },
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./platform/provider-section/provider-module.module").then(
            (m) => m.ProviderModuleModule
          ),
      },
    ],
  },
  {
    path: "patientDashboard",
    component: PatientDashboardComponent,
    // canActivate: [providerAuthGuard],
    data: {
      title: "Patient Dashboard",
    },
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./platform/patient-section/patient-module.module").then(
            (m) => m.PatientModuleModule
          ),
      },
    ],
  },

  // {
  //   path: "login",
  //   component: DefaultScreenComponent,
  //   // canActivate: [providerAuthGuard],
  //   data: {
  //     title: "Login",
  //   },
  //   children: [
  //     {
  //       path: "",
  //       loadChildren: () =>
  //         import("./auth/auth.module").then(
  //           (m) => m.AuthModule
  //         ),
  //     },
  //   ],
  // },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
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
    path: "provider-profile",
    loadComponent: () =>
      import("./platform/main-dashboard/provider-profile/provider-profile.component").then(
        (mod) => mod.ProviderProfileComponent
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
    path: "register-as-a-provider",
    loadComponent: () =>
      import("./register-provider/register-provider.component").then(
        (mod) => mod.RegisterProviderComponent
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
