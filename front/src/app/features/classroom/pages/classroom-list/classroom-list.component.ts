import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ClassroomType } from '@features/classroom/models/classroom-type';
import { ClassroomService } from '@core/services/classroom/classroom.service';
import { NgForm, FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { identifierName } from '@angular/compiler';
import { Observable, first, last, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ThemePalette } from '@angular/material/core';
import { ClassroomFormComponent } from '@features/classroom/forms/classroom-create/classroom-form.component';
import { StudentService } from '@core/services/students/student.service';
import { Students } from '@features/students/models/student-type';
import { StudentFormComponent } from '@features/classroom/forms/student-create/student-form.component';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, GridReadyEvent, IRowNode } from 'ag-grid-community';
import { AG_GRID_LOCALE_FR } from 'src/locale/ag-grid.locale.fr';
import { EditButtonRendererComponent } from '@shared/components/edit-button-renderer/edit-button-renderer.component';

@Component({
  selector: 'app-classrooms-list',
  templateUrl: './classroom-list.component.html',
  styleUrls: ['./classroom-list.component.scss']
})

export class ClassroomListComponent implements OnInit {


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
    { headerName: 'Nom de la classe', field: 'label', filter: 'agTextColumnFilter', width: 350, resizable: false },
    { headerName: 'Capacité', field: 'capacity', filter: 'agTextColumnFilter', width: 100, resizable: false },
    { headerName: 'Sceance', field: 'sceance', filter: 'agTextColumnFilter', width: 100, resizable: false },
    { headerName: 'Instruments', field: 'instruments', filter: 'agTextColumnFilter', width: 150, resizable: false },
    { headerName: 'Professeur', field: 'teachers', filter: 'agTextColumnFilter', width: 150, resizable: false },
    { headerName: 'Date de début', field: 'dateDebut', filter: 'agTextColumnFilter', width: 150, resizable: false },
    { headerName: 'Date de fin', field: 'dateFin', filter: 'agTextColumnFilter', width: 150, resizable: false },
    { headerName: 'Heure de début', field: 'coursesStartingTime', filter: 'agTextColumnFilter', width: 150, resizable: false },
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


  activeTab: number = 2;
  onlineTabIndex = 1;
  presentielTabIndex = 2;

  refreshLoading: boolean = false;
  hasSelection: boolean = false;

  selectedRowNode: IRowNode | undefined;


  classrooms: ClassroomType[] = [];
  selectedClassroom: ClassroomType;

  showForm = false;
  submitted: boolean = false;

  modalOpen: boolean = false;
  modalupdate: boolean = false;
  isLoading: boolean = false;
  loading = false;
  itemToUpdate: any;
  form: FormGroup;
  formUpdate: FormGroup;
  isPopupVisible: boolean = false;
  editDialog: any;
  params: any;
  data: any;
  isItemSelected: boolean = false;
  rowData: any;
  http: any;




  constructor(
    private classroomService: ClassroomService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router
  ) {

  }


  ngOnInit(): void {
    this.loadClassrooms();

  }


  selectClassroom(classrooms: ClassroomType) {
    this.selectedClassroom = classrooms;
  }

  loadClassrooms(): void {
    this.classroomService.readClassroom().subscribe((result: ClassroomType[]) => {
      this.classrooms = result;
      this.presentielRawData$ = of(result);
      console.log(this.classrooms);
    })
  }

  openPopup(item: any) {
    this.selectedClassroom = item;
    this.isPopupVisible = true;
  }

  closePopup() {
    this.isPopupVisible = false;
  }

  openform(data?: any): void {
    const dialogRef = this.dialog.open(ClassroomFormComponent, {
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


  openStudentForm(data?: any): void {
    const dialogRef = this.dialog.open(StudentFormComponent, {
      width: '500px',
      height: '360px',
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

  deleteClassroom() {

    const selectedClassrooms = this.presentielAgGrid.api.getSelectedRows();
    selectedClassrooms.forEach((selectedClassroom: ClassroomType) => {
      this.classroomService.deleteClassroom(selectedClassroom.id).subscribe(
        (result: any) => {
          this.loadClassrooms();
        },
        (error: any) => {
          console.error("Error deleting classroom:", error);
        }
      );
    })

  }

  openEditForm(data: ClassroomType): void {
    const dialogRef = this.dialog.open(ClassroomFormComponent, {
      panelClass: 'regular-dialog',
      data: data
    });
    dialogRef.afterClosed().subscribe({
      next: (formData: ClassroomType | undefined) => {
        if (formData && this.selectedRowNode) {
          // this.selectedRowNode.setData(formData);
          this.fetchAllData();
        }
      }
    });
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
    this.presentielRawData$ = this.classroomService.readClassroom();
    this.presentielAgGrid.api.redrawRows();
  }


  goToDetail() {
    const selectedClassrooms = this.presentielAgGrid.api.getSelectedRows();

    selectedClassrooms.forEach((selectedClassroom: ClassroomType) => {
      this.router.navigate(['admin/classrooms', selectedClassroom.id]);
    });
  }

  goToList() {
    const selectedClassrooms = this.presentielAgGrid.api.getSelectedRows();

    selectedClassrooms.forEach((selectedClassroom: ClassroomType) => {
      this.router.navigate(['admin/classrooms', selectedClassroom]);
    });
  }

  updateClassroom() {
    const f = this.formUpdate;
    f.value.id = this.selectedClassroom?.id;
    this.classroomService.updateClassroom(f.value).subscribe((result: any) => {
      console.log(result);
      this.loadClassrooms();

    });
  }

}
