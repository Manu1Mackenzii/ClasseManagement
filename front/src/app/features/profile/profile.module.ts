import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { UserIdentityFormComponent } from './forms/user-identity-form/user-identity-form.component';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CompleteUserProfileComponent } from './pages/complete-user-profile/complete-user-profile.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';


@NgModule({
  declarations: [
    CompleteUserProfileComponent,
    UserIdentityFormComponent,
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedComponentsModule,
    ReactiveFormsModule,
    TranslateModule
  ]
})
export class ProfileModule { }
