import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ClassroomService } from '@core/services/classroom/classroom.service';
import { InstrumentService } from '@core/services/instruments/instrument.service';
import { TeacherService } from '@core/services/teachers/teacher.service';
import { Teacher } from '@features/teachers/models/teacher-type';

@Component({
  selector: 'app-teacher-form',
  templateUrl: './teacher-form.component.html',
  styleUrls: ['./teacher-form.component.scss']
})

export class TeachersFormComponent {
  
  teachers : Teacher[] = [];
  selectedTeacher : Teacher ;
 
  showForm = false;
  submitted: boolean = false;
  
  modalOpen: boolean = false;
  modalupdate: boolean = false;
  isLoading: boolean = false;
  loading = false;
  itemToUpdate: any;
  form: FormGroup;
  formUpdate: FormGroup;
 
  instruments: any[]; 
  selectedInstruments: string[] = [];
  

  constructor(
    private teacherService: TeacherService,
    private instrumentService: InstrumentService,
    private classroomService: ClassroomService,
     private fb: FormBuilder,  
     private route: ActivatedRoute,
     private dialog: MatDialog,
     private dialogRef: MatDialogRef<TeachersFormComponent>,
     @Inject(MAT_DIALOG_DATA) public data: any,
    
     ) 
    { 
      this.initForm();
    }

   
  ngOnInit(): void {
    this.loadTeachers();

    this.instrumentService.readInstrument().subscribe((result : any)=>{
      this.instruments  =  result;
      this.addCheckboxes();
    }
    )
    
    this.classroomService.readClassroom().subscribe((data: any[]) => {
      this.teachers = data;
    });
   
  
  }

  selectTeacher(teacher: Teacher){
       this.selectedTeacher = teacher;
     }

  loadTeachers(): void {
    this.teacherService.readTeachers().subscribe((result : Teacher[])=>{
            this.teachers  =  result;
             console.log(this.teachers);
          })
  }
 
  addCheckboxes() {
    const selectedInstrument = this.form.get('selectedInstrument') as FormArray;
  
    this.instruments.forEach(() => {
      selectedInstrument.push(this.fb.control(false));
    });
  }

  toggleInstrument(instrumentLabel: string) {
    if (this.selectedInstruments.includes(instrumentLabel)) {
      this.selectedInstruments = this.selectedInstruments.filter(label => label !== instrumentLabel);
    } else {
      this.selectedInstruments.push(instrumentLabel);
    }
  }
  
  cancel(): void {
    this.dialogRef.close();
 }
 
  initForm(){
    
    this.selectedTeacher = { 
      id: '',
      firstname: '',
      lastname: '',
      email: '',
      phone: 0,
      address: '',
      instruments: [] ,
      createdAt: new Date() ,
      updatedAt: new Date() , 
      classroomId:'',
      instrumentId: '',

    
        };
       
   this.form = this.fb.group({
    id: new FormControl('') ,
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required, Validators.pattern('[0-9]{10}')]),
    instruments: new FormControl(this.selectedTeacher.instruments, [Validators.required]),
    instrumentId: ['', Validators.required],
    classroomId: ['', Validators.required]
    });

    

    if (this.data) {
      // If data is provided, pre-fill the form for update
      this.form.patchValue(this.data);
    }
   }


  save(): void {
    this.selectedTeacher = this.form.value;
   
    this.selectedTeacher.instruments = this.selectedInstruments;

    

    if (this.selectedTeacher) {
     
      if (this.selectedTeacher.id === '') {

        this.teacherService.createTeacher(this.selectedTeacher).subscribe(
          {
            next: (res: any) =>{
              console.log('res', res);
           
             if (res?.id){
              this.loadTeachers();
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
        this.teacherService.updateTeacher(this.selectedTeacher).subscribe({
          next: () => {
            this.loadTeachers();
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

  deleteTeacher(selectedTeacher : Teacher){
    console.log(selectedTeacher)
  const index = this.teachers.indexOf(selectedTeacher);
  if (index > -1) {
    this.teachers.splice(index, 1);
    console.log(selectedTeacher);
   this.teacherService.deleteTeacher(selectedTeacher.id).subscribe((result: any)=>{

    this.loadTeachers();
   }
    );

  }
  }


updateTeacher(f: { value: Teacher; }){
  f.value.id = this.selectedTeacher.id;
  this.teacherService.updateTeacher(f.value).subscribe((result: any)=>{ 
    console.log(result);
    this.loadTeachers();

  });
}
}


