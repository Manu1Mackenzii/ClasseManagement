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
import { InstrumentFormComponent } from './form/instrument-form/instrument-form.component';
import { InstrumentRoutingModule } from './Instrument-routing.module';
import { InstrumentListComponent } from './pages/instrument-list/instrument-list.component';




@NgModule({
    declarations: [
    InstrumentFormComponent,
    InstrumentListComponent
],
    imports: [
        CommonModule,
        InstrumentRoutingModule,
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
export class InstrumentModule { }
