import { Component, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassroomService } from '@core/services/classroom/classroom.service';
import { InstrumentService } from '@core/services/instruments/instrument.service';
import { NotificationService } from '@core/services/notification/notification.service';
import { StudentService } from '@core/services/students/student.service';
import { TeacherService } from '@core/services/teachers/teacher.service';
import { ClassroomType } from '@features/classroom/models/classroom-type';
import { StudentsFormComponent } from '@features/students/form/student-form/student-form.component';
import { Students } from '@features/students/models/student-type';
import { Pipe, PipeTransform } from '@angular/core';


@Component({
    selector: 'app-classroom-form',
    templateUrl: './student-form.component.html',
    styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent {
    classrooms: ClassroomType[] = [];
    selectedClassroom: ClassroomType;
    classroomId: string;
    // student: any;
    students: Students [] = [];
    selectedStudent: Students ;
  
   
    itemToUpdate: any;
    form: FormGroup;
  

    instruments: any[];
    selectedInstruments: string[] = [];
    isStudentPopupVisible: boolean = false;



    constructor(
        private studentService: StudentService,
        private classroomService: ClassroomService,
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private dialog: MatDialog,
        private dialogRef: MatDialogRef<StudentsFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
       
      }

    ngOnInit(): void {
       this.initForm();
        this.loadStudents();
        this.selectedClassroom = this.data;

    }

    
    selectStudent(student: Students) {
        this.selectedStudent = student;
    }

    loadStudents(): void {
        this.studentService.readStudents().subscribe((result: Students[]) => {
            this.students = result;
            console.log(this.students);
        })
    }
   
    cancel(): void {
        this.dialogRef.close();
    }


    initForm() {
        this.selectedClassroom = {
          id: '',
          label: '',
          capacity: 7,
          instruments: '',
          teachers: '',
          sceance: 12,
          dateDebut: new Date(),
          dateFin: new Date(),
          coursesStartingTime: new Date(),
          coursesEndingTime: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
          students: [],
        };
    
        this.form = this.fb.group({
        id: new FormControl(''),
        students: new FormControl([], Validators.required)
        }
        );
    
    
        if (this.data) {
            this.form.patchValue(this.data);
          }
      }
    
      save(): void {
        const selectedStudentValue = this.form.get('students')?.value;
      
        // Vérifier si l'étudiant sélectionné existe déjà dans la liste des étudiants de la classe
        const isDuplicate = this.selectedClassroom.students.some(
          student => student === selectedStudentValue
        );
      
        if (isDuplicate) {
          // L'étudiant sélectionné existe déjà dans la liste des étudiants de la classe
          // Effectuez ici les actions nécessaires pour empêcher la duplication
          console.log('Duplication détectée');
          return; // Arrêter le processus de sauvegarde
        }
      
        this.selectedClassroom.students.push(selectedStudentValue);
      
        this.classroomService.updateClassroom(this.selectedClassroom).subscribe({
          next: () => {
            this.loadStudents();
            this.dialogRef.close();
          },
          error: (err: any) => {
            console.log('Erreur', err);
          }
        });
      }

    

deleteStudent(student: Students): void {
  const index = this.selectedClassroom.students.indexOf(student);
  if (index !== -1) {
    this.selectedClassroom.students.splice(index, 1);

    // Mettre à jour les données côté serveur
    this.classroomService.deleteClassroom(`${this.classroomId}`).subscribe(
      () => {
        console.log('Étudiant supprimé avec succès de la base de données.');
      },
      (      error: any) => {
        console.error('Une erreur s\'est produite lors de la suppression de l\'étudiant :', error);
        // En cas d'erreur, rétablir l'état précédent en réinsérant l'étudiant dans le tableau
        this.selectedClassroom.students.splice(index, 0, student);
      }
    );
  }
}

      } 