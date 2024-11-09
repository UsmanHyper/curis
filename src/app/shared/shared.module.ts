import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ProviderEditModalComponent } from './provider-edit-modal/provider-edit-modal.component';




@NgModule({
  declarations: [

    NavBarComponent,


  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  exports: [NavBarComponent],
  providers: [],
})
export class SharedModule { }
