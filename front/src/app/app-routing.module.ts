import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth/auth.guard';



const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./features/profile/profile.module').then(m => m.ProfileModule),
    //canActivate: [AuthGuard]
  },
  {
    path: 'lessons',
    loadChildren: () => import('./features/courses/courses.module').then(m => m.CoursesModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'tutorials',
    loadChildren: () => import('./features/tutorials/tutorials.module').then(m => m.TutorialsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'songs',
    loadChildren: () => import('./features/songs/songs.module').then(m => m.SongsModule),
   // canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    loadChildren: () => import('./features/admin-board/admin-board.module').then(m => m.AdminBoardModule),
   // canActivate: [AuthGuard],
    data: {
      showFooter: false
    }
  },

  {
      path: 'classrooms', 
      loadChildren: () => import('./features/classroom/classroom.module').then(m => m.ClassroomModule),
  },

  // {
  //   path: 'teachers',
  //   loadChildren: () => import('./features/teachers/teachers.module').then(m => m.TeachersModule),
  // },

  {
    path: 'instruments',
    loadChildren: () => import('./features/instruments/instrument.module').then(m => m.InstrumentModule),
  },

  // {
  //   path: 'sceances',
  //   loadChildren: () => import('./features/sceance/sceance.module').then( m => m.SceanceModule),
  // },

  // {
  //   path: 'students',
  //   loadChildren: () => import('./features/students/students.module').then(m => m.StudentsModule),
  // },
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
