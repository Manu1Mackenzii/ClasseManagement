import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassroomService } from '@core/services/classroom/classroom.service';
import { TeacherService } from '@core/services/teachers/teacher.service';
import { ClassroomType } from '@features/classroom/models/classroom-type';
import { TeachersFormComponent } from '@features/teachers/forms/teacher-form/teacher-form.component';
import { Teacher } from '@features/teachers/models/teacher-type';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, GridReadyEvent, IRowNode } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { AG_GRID_LOCALE_FR } from 'src/locale/ag-grid.locale.fr';

@Component({
  selector: 'app-teachers-details',
  templateUrl: './teachers-details.component.html',
  styleUrls: ['./teachers-details.component.scss']
})
export class TeachersDetailsComponent {

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


  public presentielRawData$!: Observable<ClassroomType[]>;
  public onlineRawData$!: Observable<ClassroomType[]>;
  @ViewChild('presentielGrid') presentielAgGrid!: AgGridAngular;


  refreshLoading: boolean = false;
  hasSelection: boolean = false;

  selectedRowNode: IRowNode | undefined;


  teachers: Teacher[] = [];
  teacher: Teacher;
  teacherId: string;
  selectedTeacher: Teacher;
  isVisible: boolean = false;
  params: any;
  data: any;
  isItemSelected: boolean = false;
  rowData: any;
  http: any;



  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private teacherService: TeacherService,
    private classroomService: ClassroomService,
    private dialog: MatDialog,
  ) {

  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id'); // Récupérer la valeur de l'ID en tant que chaîne
      if (idParam) {
        // Call api service to get teacher details
        this.teacherId = idParam;
        this.getTeacher(this.teacherId);
      } {
        // this.router.navigateByUrl('/id');
      }
    });
  }

  selectTeacher(teachers: Teacher) {
    this.selectedTeacher = teachers;
  }


  getTeacher(id: string): void {
    this.teacherService.getTeacher(id).subscribe({
      next: (res: Teacher) => {
        // success
        if (res.id) {
          this.teacher = res;
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
    const dialogRef = this.dialog.open(TeachersFormComponent, {
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
    this.presentielRawData$ = this.teacherService.readTeachers();
    this.presentielAgGrid.api.redrawRows();
  }

}
