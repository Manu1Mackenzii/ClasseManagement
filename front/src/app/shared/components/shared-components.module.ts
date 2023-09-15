import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinLoaderComponent } from './spin-loader/spin-loader.component';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { CourseCardComponent } from './course-card/course-card.component';


@NgModule({
  declarations: [
    SpinLoaderComponent,
    CourseCardComponent
  ],
  imports: [
    CommonModule,
    InlineSVGModule.forRoot()
  ],
  exports: [
    SpinLoaderComponent,
    CourseCardComponent
  ]
})
export class SharedComponentsModule { }
