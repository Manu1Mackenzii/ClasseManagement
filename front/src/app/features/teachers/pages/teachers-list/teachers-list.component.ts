import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherService } from '@core/services/teachers/teacher.service';
import { EditButtonRendererComponent } from '@shared/components/edit-button-renderer/edit-button-renderer.component';
import { Instruments } from '@features/instruments/models/instrument-type';
import { InstrumentListComponent } from '@features/instruments/pages/instrument-list/instrument-list.component';
import { TeachersFormComponent } from '@features/teachers/forms/teacher-form/teacher-form.component';
import { Teacher } from '@features/teachers/models/teacher-type';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, ColumnApi, GridOptions, GridReadyEvent, IRowNode, ISelectCellEditorParams } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { AG_GRID_LOCALE_FR } from 'src/locale/ag-grid.locale.fr';


@Component({
  selector: 'app-teachers-list',
  templateUrl: './teachers-list.component.html',
  styleUrls: ['./teachers-list.component.scss']
})

export class TeachersListComponent implements OnInit {


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
    { headerName: 'Nom', field: 'lastname', filter: 'agTextColumnFilter', width: 150, resizable: false },
    { headerName: 'Prénom', field: 'firstname', filter: 'agTextColumnFilter', width: 150, resizable: false },
    { headerName: 'Email', field: 'email', filter: 'agTextColumnFilter', width: 280, resizable: false },
    { headerName: 'Numéro', field: 'phone', filter: 'agTextColumnFilter', width: 150, resizable: false },
    { headerName: 'Adresse', field: 'address', filter: 'agTextColumnFilter', width: 250, resizable: false },
    { headerName: 'Instruments', field: 'instruments', filter: 'agTextColumnFilter', width: 250, resizable: false },

  ];
  public rowSelection: 'single' | 'multiple' = 'multiple';
  localeFr = AG_GRID_LOCALE_FR;

  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    floatingFilter: true,
    resizable: false,
  }


  public presentielRawData$!: Observable<Teacher[]>;
  public onlineRawData$!: Observable<Teacher[]>;
  @ViewChild('presentielGrid') presentielAgGrid!: AgGridAngular;


  refreshLoading: boolean = false;
  hasSelection: boolean = false;

  selectedRowNode: IRowNode | undefined;


  teachers: Teacher[] = [];
  selectedTeacher: Teacher;

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
    private teacherService: TeacherService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router
  ) {

  }


  ngOnInit(): void {
    this.loadTeachers();

  }


  selectTeacher(teachers: Teacher) {
    this.selectedTeacher = teachers;
  }

  loadTeachers(): void {
    this.teacherService.readTeachers().subscribe((result: Teacher[]) => {
      this.teachers = result;
      console.log(this.teachers);
    })
  }

  openPopup(item: any) {
    this.selectedTeacher = item;
    this.isPopupVisible = true;
  }

  closePopup() {
    this.isPopupVisible = false;
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

  deleteTeacher() {

    const selectedTeachers = this.presentielAgGrid.api.getSelectedRows();
    selectedTeachers.forEach((selectedTeacher: Teacher) => {
      this.teacherService.deleteTeacher(selectedTeacher.id).subscribe(
        (result: any) => {
          this.loadTeachers();
        },
        (error: any) => {
          console.error("Error deleting teacher:", error);
        }
      );
    })

  }

  openEditForm(data: Teacher): void {
    const dialogRef = this.dialog.open(TeachersFormComponent, {
      panelClass: 'regular-dialog',
      data: data
    });
    dialogRef.afterClosed().subscribe({
      next: (formData: Teacher | undefined) => {
        if (formData && this.selectedRowNode) {
          // this.selectedRowNode.setData(formData);
          this.fetchAllData();
        }
      }
    });
  }

  onGridReady(params: GridReadyEvent) {
    this.presentielRawData$ = this.teacherService.readTeachers();
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


  goToDetail() {
    const selectedTeachers = this.presentielAgGrid.api.getSelectedRows();

    selectedTeachers.forEach((selectedTeacher: Teacher) => {
      this.router.navigate(['admin/teachers', selectedTeacher.id]);
    });
  }

  updateTeacher() {
    const f = this.formUpdate;
    f.value.id = this.selectedTeacher?.id;
    this.teacherService.updateTeacher(f.value).subscribe((result: any) => {
      console.log(result);
      this.loadTeachers();

    });
  }

}
