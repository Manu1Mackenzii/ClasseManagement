import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSidenavModule } from '@angular/material/sidenav';
import { AdminBoardRoutingModule } from './admin-board-routing.module';
import { AdminMainContainerComponent } from './components/admin-main-container/admin-main-container.component';
import { StripePaymentManagementComponent } from './pages/stripe-payment-management/stripe-payment-management.component';
import { LayoutModule } from 'src/app/shared/layout/layout.module';
import { AgGridModule } from 'ag-grid-angular';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';
import { MatDialogModule } from '@angular/material/dialog';
import { StripePaymentSetupComponent } from './components/stripe-payment-setup/stripe-payment-setup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdminMainContainerComponent,
    StripePaymentManagementComponent,
    StripePaymentSetupComponent,
   
  ],
  imports: [
    CommonModule,
    AdminBoardRoutingModule,
    MatSidenavModule,
    LayoutModule,
    AgGridModule,
    SharedComponentsModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AdminBoardModule { }
