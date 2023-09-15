import { Component, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassroomService } from '@core/services/classroom/classroom.service';
import { InstrumentService } from '@core/services/instruments/instrument.service';
import { NotificationService } from '@core/services/notification/notification.service';
import { TeacherService } from '@core/services/teachers/teacher.service';
import { ClassroomType } from '@features/classroom/models/classroom-type';


@Component({
  selector: 'app-classroom-form',
  templateUrl: './classroom-form.component.html',
  styleUrls: ['./classroom-form.component.scss']
})
export class ClassroomFormComponent {

  classrooms: ClassroomType[] = [];
  selectedClassroom: ClassroomType;
  showForm = false;
  submitted: boolean = false;

  modalOpen: boolean = false;
  modalupdate: boolean = false;
  isLoading: boolean = false;


  saveErrors: boolean = false;

  itemToUpdate: any;
  form: FormGroup;
  formUpdate: FormGroup;

  selectedTeacher: any;
  selectedInstrument: any;
  teachers: any;
  instruments: any;
  filteredInstruments: any;
  showAssignmentForm: boolean = false;
  students: any;




  constructor(
    private classroomService: ClassroomService,
    private teacherService: TeacherService,
    private instrumentService: InstrumentService,
    private notificationService: NotificationService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<ClassroomFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
  ) {
    this.initForm();

    this.form.valueChanges.subscribe(() => {
      this.updateClasseName();
    });
  }


  ngOnInit(): void {
    this.loadClassrooms();
    this.teacherService.readTeachers().subscribe((data: any[]) => {
      this.teachers = data;
    });
    this.instrumentService.readInstrument().subscribe((data: any[]) => {
      this.instruments = data;
    });
  }

  loadClassrooms(): void {
    this.classroomService.readClassroom().subscribe((result: ClassroomType[]) => {
      this.classrooms = result;
      console.log(this.classrooms);
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
      id: new FormControl('', Validators.required),
      label: new FormControl('', Validators.required),
      capacity: new FormControl(7, Validators.required),
      sceance: new FormControl(12, Validators.required),
      instruments: new FormControl('', Validators.required),
      teachers: new FormControl('', Validators.required),
      dateDebut: new FormControl('', Validators.required),
      dateFin: new FormControl('', Validators.required),
      coursesStartingTime: new FormControl('', Validators.required),
      coursesEndingTime: new FormControl('', Validators.required),
      createdAt: new FormControl('', Validators.required),
      updatedAt: new FormControl('', Validators.required),
      students: new FormControl([], Validators.required),

    },
      { validator: this.dateTimeValidator }

    );

    if (this.data) {
      // If data is provided, pre-fill the form for update
      this.form.patchValue(this.data);
    }

  }

  generateClasseName(): string {
    const instrument = this.form.get('instruments')?.value;
    const teacher = this.form.get('teachers')?.value;
    const time = this.form.get('coursesStartingTime')?.value;

    // Logique de génération du nom de classe
    const classeName = 'Cours de ' + instrument + ' - ' + teacher + ' - ' + time;

    return classeName;
  }


  updateClasseName(): void {
    const labelControl: AbstractControl | null = this.form.get('label');

    if (labelControl && labelControl.value !== this.generateClasseName()) {
      labelControl.patchValue(this.generateClasseName());
    }
  }


  dateTimeValidator(control: AbstractControl) {
    const startDate = control.get('dateDebut')?.value;
    const endDate = control.get('dateFin')?.value;
    const startTime = control.get('coursesStartingTime')?.value;
    const endTime = control.get('coursesEndingTime')?.value;

    // Check if any of the required fields are empty or not yet touched
    if (!startDate || !endDate || !startTime || !endTime) {
      return null; // Return null when any field is empty or untouched
    }

    const startDateTime = new Date(startDate + ' ' + startTime);
    const endDateTime = new Date(endDate + ' ' + endTime);

    if (startDateTime >= endDateTime) {
      return { heuresInvalides: true };
    }

    return null;
  }




  save(): void {

    this.selectedClassroom = this.form.value;
    if (this.form.valid) {


      if (this.selectedClassroom.id === '') {
        this.classroomService.createClassroom(this.selectedClassroom).subscribe({
          next: (res: any) => {
            console.log('res', res);

            if (res?.id) {
              this.dialogRef.close(); // Fermez le dialogue après la création
              window.location.reload();
            } else {
              console.log('Erreur');
            }
          },
          error: (err: any) => {
            console.log('Erreur', err);
          }
        });
      } else {
        this.classroomService.updateClassroom(this.selectedClassroom).subscribe({
          next: () => {
            this.loadClassrooms();
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




  updateClassroom(f: { value: ClassroomType; }) {
    f.value.id = this.selectedClassroom.id;
    this.classroomService.updateClassroom(f.value).subscribe((result: any) => {
      console.log(result);
      this.loadClassrooms();

    });
  }

}

