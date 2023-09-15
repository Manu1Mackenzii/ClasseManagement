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
import { SceanceRoutingModule } from './sceance-routing.module';
import { SceanceComponent } from './pages/sceance-list/sceance.component';
import { SceanceFormComponent } from './form/sceance-form/sceance-form.component';



@NgModule({
    declarations: [
 SceanceComponent,
 SceanceFormComponent
],
    imports: [
        CommonModule,
       SceanceRoutingModule,
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
       
    ]
})
export class SceanceModule { }
