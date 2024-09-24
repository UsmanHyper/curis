import { NgModule } from '@angular/core';
// import { DashboardComponent } from '../shared/dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import {AdminDashboardComponent} from './admin-dashboard/admin-dashboard.component'
// import {ProviderDetailsDescriptionComponent} from './provider-details-description/provider-details-description.component'


const routes: Routes = [
  { path: '', component:AdminDashboardComponent},
  // { path: 'providerDetails', component:ProviderDetailsDescriptionComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
