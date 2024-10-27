import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProviderDashboardComponent } from './platform/provider-section/provider-dashboard/provider-dashboard.component';
import { DefaultScreenComponent } from './auth/default-screen/default-screen.component';
import { PatientDashboardComponent } from './platform/patient-section/patient-dashboard/patient-dashboard.component';
import { AdminDashboardComponent } from './platform/admin-section/admin-dashboard/admin-dashboard.component';

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
  {
    path: "AdminDashboard",
    component: AdminDashboardComponent,
    // canActivate: [adminAuthGuard],
    data: {
      title: "Admin Dashboard",
    },
    children: [
      {
        path: "",
        loadChildren: () =>
          import("../app/platform/admin-section/admin-module.module").then(
            (m) => m.AdminModuleModule
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
      import("./shared/contact-us/curis-contact-info/curis-contact-info.component").then(
        (mod) => mod.CurisContactInfoComponent
      ),
  },
  {
    path: "terms-and-condition",
    loadComponent: () =>
      import("./platform/terms-and-condition/terms-and-condition.component").then(
        (mod) => mod.TermsAndConditionComponent
      ),
  },
  {
    path: "privacy-policy",
    loadComponent: () =>
      import("./platform/privacy-policy/privacy-policy.component").then(
        (mod) => mod.PrivacyPolicyComponent
      ),
  },
  {
    path: "patient-feedback-survey",
    loadComponent: () =>
      import("./platform/patient-feedback-survey/patient-feedback-survey.component").then(
        (mod) => mod.PatientFeedbackSurveyComponent
      ),
  },
  {
    path: "notice-private-policy",
    loadComponent: () =>
      import("./platform/notice-private-policy/notice-private-policy.component").then(
        (mod) => mod.NoticePrivatePolicyComponent
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
  },
  {
    path: 'curis-detail-page',
    loadComponent: () =>
      import("./shared/curis-detail-page/curis-detail-page.component").then(
        (mod) => mod.CurisDetailPageComponent
      ),
  },
  {
    path: 'provider-portal',
    loadComponent: () =>
      import("./shared/provider-portal/provider-portal.component").then(
        (mod) => mod.ProviderPortalComponent
      ),
  },
  {
    path: 'provider-resource-center',
    loadComponent: () =>
      import("./shared/provider-resource/provider-resource-center/provider-resource-center.component").then(
        (mod) => mod.ProviderResourceCenterComponent
      ),
  },
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

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
