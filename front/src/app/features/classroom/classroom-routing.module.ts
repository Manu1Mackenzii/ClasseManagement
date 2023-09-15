import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassroomListComponent } from './pages/classroom-list/classroom-list.component';
import { ClassroomDetailsComponent } from './pages/classroom-details/classroom-details.component';

const routes: Routes = [
  { 
    path: '',
    component: ClassroomListComponent
  },

  { 
    path:':id',
    component: ClassroomDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassroomRoutingModule { }
