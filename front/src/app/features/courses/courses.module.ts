import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseDetailsComponent } from './pages/course-details/course-details.component';
import { CourseListComponent } from './pages/course-list/course-list.component';
import { RouterModule } from '@angular/router';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { CoursesRoutingModule } from './courses-routing.module';

@NgModule({
  declarations: [
    CourseListComponent,
    CourseDetailsComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    PipesModule
  ]
})
export class CoursesModule { }
