import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginFormComponent } from './forms/login-form/login-form.component';
import { LoginComponent } from './pages/login/login.component';




@NgModule({
  declarations: [
   
    LoginFormComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    TranslateModule,
    ReactiveFormsModule,
    SharedComponentsModule
  ]
})
export class AuthModule { }
