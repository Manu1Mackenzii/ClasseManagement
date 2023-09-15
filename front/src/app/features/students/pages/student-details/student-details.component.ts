import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassroomService } from '@core/services/classroom/classroom.service';
import { StudentService } from '@core/services/students/student.service';
import { StudentsFormComponent } from '@features/students/form/student-form/student-form.component';
import { Students } from '@features/students/models/student-type';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, GridReadyEvent, IRowNode } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { AG_GRID_LOCALE_FR } from 'src/locale/ag-grid.locale.fr';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent {

  public columnDefs: ColDef[] = [
    {
      field: 'Choix',
      width: 50,
      checkboxSelection: true,
      headerCheckboxSelection: true,
      filter: false,
      floatingFilter: false,
      showDisabledCheckboxes: true,

    },
    { headerName: 'Instruments', field: 'instruments', filter: 'agTextColumnFilter', width: 200, resizable: false },
    { headerName: 'Date de début', field: 'dateDebut', filter: 'agTextColumnFilter', width: 200, resizable: false },
    { headerName: 'Date de fin', field: 'dateFin', filter: 'agTextColumnFilter', width: 200, resizable: false },
    { headerName: 'Heure de début', field: 'coursesStartingTime', filter: 'agTextColumnFilter', width: 200, resizable: false },
    { headerName: 'Heure de fin', field: 'coursesEndingTime', filter: 'agTextColumnFilter', width: 150, resizable: false },

  ];
  public rowSelection: 'single' | 'multiple' = 'multiple';
  localeFr = AG_GRID_LOCALE_FR;

  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    floatingFilter: true,
    resizable: false,
  }


  public presentielRawData$!: Observable<Students[]>;
  public onlineRawData$!: Observable<Students[]>;
  @ViewChild('presentielGrid') presentielAgGrid!: AgGridAngular;


  refreshLoading: boolean = false;
  hasSelection: boolean = false;

  selectedRowNode: IRowNode | undefined;

  students: Students[] = [];
  student: Students;
  StudentId: string;
  selectedStudent: Students;
  isItemSelected: boolean = false;
 



  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private studentService: StudentService,
    private classroomService: ClassroomService,
    private dialog: MatDialog,
  ) {

  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id'); // Récupérer la valeur de l'ID en tant que chaîne
      if (idParam) {
        // Call api service to get student details
        this.StudentId = idParam;
        this.getStudent(this.StudentId);
      } {
        // this.router.navigateByUrl('/id');
      }
    });
  }

  selectStudent(students: Students) {
    this.selectedStudent = students;
  }


  getStudent(id: string): void {
    this.studentService.getStudent(id).subscribe({
      next: (res: Students) => {
        // success
        if (res.id) {
          this.student = res;
        } else {
          // Pas de prof
        }
      },
      error: () => {
        // Error
      }
    })
  }



  openform(data?: any): void {
    const dialogRef = this.dialog.open(StudentsFormComponent, {
      width: '500px',
      height: '540px',
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

  onSelectionChanged(event: any) {
    const selectedRows = this.presentielAgGrid.api.getSelectedRows();
    console.log(selectedRows); // Vérifiez les enseignants sélectionnés dans la console
    this.isItemSelected = selectedRows.length > 0;
  }


  onGridReady(params: GridReadyEvent) {
    this.presentielRawData$ = this.classroomService.readClassroom();
  }


  onCellClicked(e: CellClickedEvent): void {
    this.hasSelection = true;
    this.selectedRowNode = e.node;
  }


  clearSelection(): void {
    this.presentielAgGrid.api.deselectAll();
    this.hasSelection = false;
  }

  onDataUpdated() {
    this.refreshLoading = false;
  }

  fetchAllData() {
    this.refreshLoading = true;
    this.presentielRawData$ = this.studentService.readStudents();
    this.presentielAgGrid.api.redrawRows();
  }












}
