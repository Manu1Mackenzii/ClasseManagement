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
import { StudentListComponent } from './pages/student-list/student-list.component';
import { StudentRoutingModule } from './student-routing.module';
import { StudentsFormComponent } from './form/student-form/student-form.component';
import { AgGridModule } from 'ag-grid-angular';
import { StudentDetailsComponent } from './pages/student-details/student-details.component';




@NgModule({
  declarations: [
   StudentListComponent,
   StudentsFormComponent,
   StudentDetailsComponent,
  ],
  imports: [
    CommonModule,
  StudentRoutingModule,
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

  ]
})
export class StudentsModule { }
