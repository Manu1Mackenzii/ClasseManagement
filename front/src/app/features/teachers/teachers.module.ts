import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedComponentsModule } from "../../shared/components/shared-components.module";
import { TeachersListComponent } from './pages/teachers-list/teachers-list.component';
import { TeacherRoutingModule } from './teacher-routing.module';
import { TeachersFormComponent } from './forms/teacher-form/teacher-form.component';
import { AgGridModule } from 'ag-grid-angular';
import { TeachersDetailsComponent } from './pages/teachers-details/teachers-details.component';
import { MatIconModule } from '@angular/material/icon';





@NgModule({
  declarations: [
    TeachersListComponent,
    TeachersFormComponent,
    TeachersDetailsComponent,  
  ],
  imports: [
    CommonModule,
   TeacherRoutingModule,
    MatTableModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    SharedComponentsModule,
    AgGridModule,
    MatIconModule,
  ]
})
export class TeachersModule { }
