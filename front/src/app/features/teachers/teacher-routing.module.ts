import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeachersListComponent } from './pages/teachers-list/teachers-list.component';
import { TeachersDetailsComponent } from './pages/teachers-details/teachers-details.component';

const routes: Routes = [


  { 
    path: '',
    component: TeachersListComponent,
  },

  { 
    path:':id',
    component: TeachersDetailsComponent
  }

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
