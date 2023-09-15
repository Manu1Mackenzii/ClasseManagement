import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { InstrumentService } from '@core/services/instruments/instrument.service';
import { InstrumentFormComponent } from '@features/instruments/form/instrument-form/instrument-form.component';
import { Instruments } from '@features/instruments/models/instrument-type';

@Component({
  selector: 'app-instrument-list',
  templateUrl: './instrument-list.component.html',
  styleUrls: ['./instrument-list.component.scss']
})
export class InstrumentListComponent implements OnInit{

  instruments : Instruments [] = [];
  selectedInstrument: Instruments ;
  
  modalOpen: boolean = false;
  modalupdate: boolean = false;
  isUpdating: boolean = false;
  
  itemToUpdate: any;
  form: FormGroup;
  formUpdate: FormGroup;


  constructor(
    private instrumentService: InstrumentService,
     private fb: FormBuilder,  
     private route: ActivatedRoute,
     private dialog: MatDialog
     ) 
    {
    }

   
  ngOnInit(): void {
    this.loadInstrument();
  
  }


  selectInstrument(instruments: Instruments){
       this.selectedInstrument = instruments;
     }

     loadInstrument(): void {
    this.instrumentService.readInstrument().subscribe((result : Instruments[])=>{
            this.instruments  =  result;
             console.log(this.instruments);
          })
  }
 
 

  openform(data?: any): void {
    const dialogRef = this.dialog.open(InstrumentFormComponent, {
      width: '500px',
      height: '250px',
      data: data
    });
  

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      
        // Handle the result (save or update data)
        console.log(result);
        // Make API calls or update data accordingly
      }
    });
  }


  deleteInstrument(selectedInstrument : Instruments){
    console.log(selectedInstrument)
  const index = this.instruments.indexOf(selectedInstrument);
  if (index > -1) {
    this.instruments.splice(index, 1);
    console.log(selectedInstrument);
   this.instrumentService.deleteInstrument(selectedInstrument.id).subscribe((result: any)=>{

    this.loadInstrument();
   }
    );
  }
  }


  updateInstrument(f: { value: Instruments; }){
  f.value.id = this.selectedInstrument.id;
  this.instrumentService.updateInstrument(f.value).subscribe((result: any)=>{ 
    console.log(result);
    this.loadInstrument();

  });
}


}
