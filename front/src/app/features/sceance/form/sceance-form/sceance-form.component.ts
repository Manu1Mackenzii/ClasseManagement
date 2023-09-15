import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { SceanceService } from '@core/services/sceance/sceance.service';
import { CourseSession } from '@features/sceance/model/sceance';

@Component({
  selector: 'app-sceance-form',
  templateUrl: './sceance-form.component.html',
  styleUrls: ['./sceance-form.component.scss']
})
export class SceanceFormComponent {


  selectedSceance: CourseSession;
  sceance: CourseSession[] = [];


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
    private sceanceService: SceanceService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<SceanceFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.initForm();

  }


  ngOnInit(): void {
    this.loadSceance();

  }


  selectSceance(sceances: CourseSession) {
    this.selectedSceance = sceances;
  }

  loadSceance(): void {
    this.sceanceService.readSceance().subscribe((result: CourseSession[]) => {
      this.sceance = result;
      console.log(this.sceance);
    })
  }




  openform(data?: any): void {
    const dialogRef = this.dialog.open(SceanceFormComponent, {
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

  initForm() {
    this.selectedSceance = {
      id: '',
      label: '',
      room: '',
      notice: '',
      status: '',
      classroomId: '',
      // signInDate: new Date(),
      // courseInstructor: [],
      // studentList: [],
      // scheduledStartDate: new Date(),
      // startDate: new Date(),
      // scheduledEndDate: new Date(),
      // EndDate: new Date(),
      // createdAt: new Date(),
      // updatedAt: new Date()
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
    this.selectedSceance = this.form.value;

    if (this.selectedSceance) {

      if (this.selectedSceance.id === '') {

        this.sceanceService.createSceance(this.selectedSceance).subscribe(
          {
            next: (res: any) => {
              console.log('res', res);

              if (res?.id) {
                this.loadSceance();
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
        this.sceanceService.updateSceance(this.selectedSceance).subscribe({
          next: () => {
            this.loadSceance();
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


  deleteSceance(selectedSceance: CourseSession) {
    console.log(selectedSceance)
    const index = this.sceance.indexOf(selectedSceance);
    if (index > -1) {
      this.sceance.splice(index, 1);
      console.log(selectedSceance);
      this.sceanceService.deleteSceance(selectedSceance.id).subscribe((result: any) => {

        this.loadSceance();
      }
      );

    }
  }


  updateSceance(f: { value: CourseSession; }) {
    f.value.id = this.selectedSceance.id;
    this.sceanceService.updateSceance(f.value).subscribe((result: any) => {
      console.log(result);
      this.loadSceance();

    });
  }


}
  
  
  

