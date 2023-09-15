import {  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassroomRoutingModule } from './classroom-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedComponentsModule } from "../../shared/components/shared-components.module";
import { ClassroomFormComponent } from './forms/classroom-create/classroom-form.component';
import { StudentFormComponent } from './forms/student-create/student-form.component';
import { AgGridModule } from 'ag-grid-angular';
import { ClassroomDetailsComponent } from './pages/classroom-details/classroom-details.component';
import { ClassroomListComponent } from './pages/classroom-list/classroom-list.component';



@NgModule({
    declarations: [
        ClassroomListComponent,
        ClassroomDetailsComponent,
        ClassroomFormComponent,
        StudentFormComponent,
        
    ],

    imports: [
        CommonModule,
        ClassroomRoutingModule,
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
export class ClassroomModule { }
