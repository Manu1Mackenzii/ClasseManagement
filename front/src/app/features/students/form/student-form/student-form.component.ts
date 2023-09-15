import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ClassroomService } from '@core/services/classroom/classroom.service';
import { InstrumentService } from '@core/services/instruments/instrument.service';
import { StudentService } from '@core/services/students/student.service';
import { Students } from '@features/students/models/student-type';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})

export class StudentsFormComponent {
  
  students : Students[] = [];
  selectedStudent : Students ;
 
  showForm = false;
  submitted: boolean = false;
  
  modalOpen: boolean = false;
  modalupdate: boolean = false;
  
  form: FormGroup;
  formUpdate: FormGroup;
 
  instruments: any[]; 
  selectedInstruments: string[] = [];
  

  constructor(
    private studentService: StudentService,
    private instrumentService: InstrumentService,
    private classroomService: ClassroomService,
     private fb: FormBuilder,  
     private route: ActivatedRoute,
     private dialog: MatDialog,
     private dialogRef: MatDialogRef<StudentsFormComponent>,
     @Inject(MAT_DIALOG_DATA) public data: any,
    
     ) 
    { 
      this.initForm();
    }

   
  ngOnInit(): void {
    this.loadStudents();

    this.instrumentService.readInstrument().subscribe((result : any)=>{
      this.instruments  =  result;
      this.addCheckboxes();
    }
    )
    
    this.classroomService.readClassroom().subscribe((data: any[]) => {
      this.students = data;
    });
   
  
  }

  selectStudent(students: Students){
       this.selectedStudent = students;
     }

  loadStudents(): void {
    this.studentService.readStudents().subscribe((result : Students[])=>{
            this.students  =  result;
             console.log(this.students);
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
    
    this.selectedStudent = { 
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
    instruments: new FormControl(this.selectedStudent.instruments, [Validators.required]),
    instrumentId: ['', Validators.required],
    classroomId: ['', Validators.required]
    });

    

    if (this.data) {
      // If data is provided, pre-fill the form for update
      this.form.patchValue(this.data);
    }
   }


  save(): void {
    this.selectedStudent = this.form.value;
   
    this.selectedStudent.instruments = this.selectedInstruments;

    

    if (this.selectedStudent) {
     
      if (this.selectedStudent.id === '') {

        this.studentService.createStudent(this.selectedStudent).subscribe(
          {
            next: (res: any) =>{
              console.log('res', res);
           
             if (res?.id){
              this.loadStudents();
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
        this.studentService.updateStudent(this.selectedStudent).subscribe({
          next: () => {
            this.loadStudents();
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

  deleteStudent(selectedStudent : Students){
    console.log(selectedStudent)
  const index = this.students.indexOf(selectedStudent);
  if (index > -1) {
    this.students.splice(index, 1);
    console.log(selectedStudent);
   this.studentService.deleteStudent(selectedStudent.id).subscribe((result: any)=>{

    this.loadStudents();
   }
    );

  }
  }


updateStudent(f: { value: Students; }){
  f.value.id = this.selectedStudent.id;
  this.studentService.updateStudent(f.value).subscribe((result: any)=>{ 
    console.log(result);
    this.loadStudents();

  });
}
}



