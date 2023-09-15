import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CourseListComponent } from './pages/course-list/course-list.component';
import { CourseDetailsComponent } from './pages/course-details/course-details.component';

const routes = [
  {
    path: '',
    component: CourseListComponent
  },
  {
    path: ':id',
    component: CourseDetailsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
