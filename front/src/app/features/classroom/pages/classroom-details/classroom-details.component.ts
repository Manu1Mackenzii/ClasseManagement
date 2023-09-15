import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassroomService } from '@core/services/classroom/classroom.service';
import { SceanceService } from '@core/services/sceance/sceance.service';
import { ClassroomFormComponent } from '@features/classroom/forms/classroom-create/classroom-form.component';
import { ClassroomType } from '@features/classroom/models/classroom-type';
import { CourseSession } from '@features/sceance/model/sceance';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'app-classroom-details',
  templateUrl: './classroom-details.component.html',
  styleUrls: ['./classroom-details.component.scss']
})
export class ClassroomDetailsComponent {

  classroom: ClassroomType;
  classrooms: ClassroomType[] = [];
  generatedSeances: CourseSession[] = [];

  classroomId: string;
  selectedClassroom: ClassroomType;
  selectedSession: CourseSession;
  isItemSelected: boolean = false;
  form: FormGroup;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private classroomService: ClassroomService,
    private sceanceService: SceanceService,
    private dialog: MatDialog,
    private fb: FormBuilder,
  ) {

  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id'); // Récupérer la valeur de l'ID en tant que chaîne
      if (idParam) {
        // Call api service to get classroom details
        this.classroomId = idParam;
        this.getClassroom(this.classroomId);
      } {
        // this.router.navigateByUrl('/id');
      }
    });
  }

  selectClassroom(classrooms: ClassroomType) {
    this.selectedClassroom = classrooms;
  }

  getClassroom(id: string): void {
    this.classroomService.getClassroom(id).subscribe({
      next: (res: ClassroomType) => {
        // success
        if (res?.id) {
          this.classroom = res;
        } else {
          // Pas de classe
        }
      },
      error: () => {
        // Error
      }
    })
  }

  openform(data?: any): void {
    const dialogRef = this.dialog.open(ClassroomFormComponent, {
      width: '500px',
      height: '540px',
      data: data
    });


    dialogRef.afterClosed().subscribe(result => {
      if (result) {

        console.log(result);
      }
    });
  }

  initForm() {
    this.selectedSession = {
      id: '',
      classroomId: '',
      label: '',
      notice: '',
      status: '',
      room: '',
    };


    this.form = this.fb.group({
      id: new FormControl('', Validators.required),
      label: new FormControl('', Validators.required),
      room: new FormControl(7, Validators.required),
      notice: new FormControl(12, Validators.required),
      status: new FormControl('', Validators.required),
      signInDate: new FormControl('', Validators.required),
    }
     );
  }

  
  //generateSessions
  generateSeances() {
    this.selectedSession = this.form.value;
    if (this.form.valid) {
        this.classroomService.generateSessions(this.classroomId).subscribe({
          next: (res: any) => {
            console.log('res', res);
            if (res?.id) {
              window.location.reload();
            } 
          },
          error: (err: any) => {
            console.log('Erreur', err);
         }
      });
    }
  }





}