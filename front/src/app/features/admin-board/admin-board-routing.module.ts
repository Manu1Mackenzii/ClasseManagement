import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminMainContainerComponent } from './components/admin-main-container/admin-main-container.component';
import { StripePaymentManagementComponent } from './pages/stripe-payment-management/stripe-payment-management.component';
import { TeachersListComponent } from '@features/teachers/pages/teachers-list/teachers-list.component';
import { ClassroomListComponent } from '@features/classroom/pages/classroom-list/classroom-list.component';
import { StudentListComponent } from '@features/students/pages/student-list/student-list.component';

const routes: Routes = [
  {
    path: '',
    component: AdminMainContainerComponent,
    children: [
      {
        path: '',
        redirectTo: 'stripe-payments',
        pathMatch: 'full'
      },
      // {
      //   path: 'stripe-payments',
      //   component: StripePaymentManagementComponent
      // },

      {
        path: 'teachers',
        loadChildren: () => import('../../features/teachers/teachers.module').then(m => m.TeachersModule),
      },

      {
        path: 'students',
        loadChildren: () => import('../../features/students/students.module').then(m => m.StudentsModule),
      },

      {
        path: 'instruments',
        loadChildren: () => import('../../features/instruments/instrument.module').then(m => m.InstrumentModule),
      },

      {
        path: 'classrooms',
        loadChildren: () => import('../../features/classroom/classroom.module').then(m => m.ClassroomModule),
      },

      // {
      //   path: 'sceances',
      //   loadChildren: () => import('../../features/sceance/sceance.module').then( m => m.SceanceModule),
      // },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminBoardRoutingModule { }
