import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompleteUserProfileComponent } from './pages/complete-user-profile/complete-user-profile.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'account',
    pathMatch: 'full'
  },
  {
    path: 'account',
    component: UserProfileComponent,
    title: 'userProfile.PageTitle'
  },
  {
    path: 'complete-your-profile',
    component: CompleteUserProfileComponent,
    title: 'completeProfile.PageTitle'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
