import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { InstrumentService } from '@core/services/instruments/instrument.service';
import { Instruments } from '@features/instruments/models/instrument-type';

@Component({
  selector: 'app-instrument-form',
  templateUrl: './instrument-form.component.html',
  styleUrls: ['./instrument-form.component.scss']
})
export class InstrumentFormComponent {
  instruments : Instruments[] = [];
  selectedInstrument : Instruments ;
  showForm = false;
  submitted: boolean = false;
  
  modalOpen: boolean = false;
  modalupdate: boolean = false;
  isLoading: boolean = false;
  loading = false;
  
  itemToUpdate: any;
  form: FormGroup;
  formUpdate: FormGroup;

  selectedTeacher: any;
  teachers: any;
 



  constructor(
    private instrumentService: InstrumentService,
     private fb: FormBuilder,  
     private route: ActivatedRoute,
     private dialog: MatDialog,
     private dialogRef: MatDialogRef<InstrumentFormComponent>,
     @Inject(MAT_DIALOG_DATA) public data: any
     ) 
    { 
      this.initForm();
     
    }

   
  ngOnInit(): void {
    this.loadInstruments();
    
  }


  selectInstrument(instruments: Instruments){
       this.selectedInstrument = instruments;
     }

  loadInstruments(): void {
    this.instrumentService.readInstrument().subscribe((result : Instruments[])=>{
            this.instruments  =  result;
             console.log(this.instruments);
          })
  }
 
 
  

  openform(data?: any): void {
    const dialogRef = this.dialog.open(InstrumentFormComponent, {
      width: '400px',
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

  cancel(): void {
    this.dialogRef.close();
 }

  initForm(){
    this.selectedInstrument = { 
        id: '',
        label: '', 
        createdAt: new Date(),
        updatedAt: new Date() 
         };
       
   this.form = this.fb.group({
      id: new FormControl('', Validators.required),
      label: new FormControl('', Validators.required),
      createdAt: new FormControl('', Validators.required),
      updatedAt: new FormControl('', Validators.required),
    
    });

    if (this.data) {
      // If data is provided, pre-fill the form for update
      this.form.patchValue(this.data);
    }

   }


  save(): void {
    this.selectedInstrument = this.form.value;
    
   if (this.selectedInstrument) {
     
      if (this.selectedInstrument.id === '') {

        this.instrumentService.createInstrument(this.selectedInstrument).subscribe(
          {
            next: (res: any) =>{
              console.log('res', res);
           
              if (res?.id) {
                this.loadInstruments();
              } else {
                console.log('Erreur');
              }
            },
            error: (err: any) => {
              console.log('Erreur', err);
            }
          });
          this.dialogRef.close(); // Fermez le dialogue après la création
          window.location.reload();
        } else {
          this.instrumentService.updateInstrument(this.selectedInstrument).subscribe({
            next: () => {
              this.loadInstruments();
              this.dialogRef.close(); 
          window.location.reload();
            },
            error: (err: any) => {
              console.log('Erreur', err);
            }
          });
        }
      }
    }


  deleteInstrument(selectedInstrument : Instruments){
    console.log(selectedInstrument)
  const index = this.instruments.indexOf(selectedInstrument);
  if (index > -1) {
    this.instruments.splice(index, 1);
    console.log(selectedInstrument);
   this.instrumentService.deleteInstrument(selectedInstrument.id).subscribe((result: any)=>{

    this.loadInstruments();
   }
    );

 }
  }


updateInstrument(f: { value: Instruments; }){
  f.value.id = this.selectedInstrument.id;
  this.instrumentService.updateInstrument(f.value).subscribe((result: any)=>{ 
    console.log(result);
    this.loadInstruments();

  });
}


}


