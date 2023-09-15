
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '@core/services/students/student.service';
import { StudentsFormComponent } from '@features/students/form/student-form/student-form.component';
import { Students } from '@features/students/models/student-type';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, GridReadyEvent, IRowNode } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { AG_GRID_LOCALE_FR } from 'src/locale/ag-grid.locale.fr';



@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})

export class StudentListComponent implements OnInit {

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
    suppressMenu: true,
    resizable: false,
  }

  public presentielRawData$!: Observable<Students[]>;
  public onlineRawData$!: Observable<Students[]>;
  @ViewChild('presentielGrid') presentielAgGrid!: AgGridAngular;


  activeTab: number = 2;
  onlineTabIndex = 1;
  presentielTabIndex = 2;

  refreshLoading: boolean = false;
  hasSelection: boolean = false;

  selectedRowNode: IRowNode | undefined;


  students: Students[] = [];
  selectedStudent: Students;

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
  params: any;
  data: any;
  editDialog: any;
  isItemSelected: boolean = false;
  rowData: any;
  http: any;


  constructor(
    private studentService: StudentService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router
  ) {

  }


  ngOnInit(): void {
    this.loadStudents();

  }


  selectStudent(students: Students) {
    this.selectedStudent = students;
  }

  loadStudents(): void {
    this.studentService.readStudents().subscribe((result: Students[]) => {
      this.students = result;
      console.log(this.students);
    })
  }

  openPopup(item: any) {
    this.selectedStudent = item;
    this.isPopupVisible = true;
  }

  closePopup() {
    this.isPopupVisible = false;
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

  deleteStudent() {

    const selectedStudent = this.presentielAgGrid.api.getSelectedRows();
    selectedStudent.forEach((selectedTeacher: Students) => {
      this.studentService.deleteStudent(selectedTeacher.id).subscribe(
        (result: any) => {
          this.loadStudents();
        },
        (error: any) => {
          console.error("Error deleting teacher:", error);
        }
      );
    })

  }


  updateStudent(f: { value: Students; }) {
    f.value.id = this.selectedStudent.id;
    this.studentService.updateStudent(f.value).subscribe((result: any) => {
      console.log(result);
      this.loadStudents();

    });
  }


  /**
 * Open modal for edition
 */
  openEditForm(data: Students): void {
    const dialogRef = this.editDialog.open(StudentListComponent, {
      panelClass: 'regular-dialog',
      data: data
    });

    dialogRef.afterClosed().subscribe({
      next: (formData: Students | undefined) => {
        if (formData && this.selectedRowNode) {
          // this.selectedRowNode.setData(formData);
          this.fetchAllData();
        }
      }
    });
  }

  onGridReady(params: GridReadyEvent) {
    this.presentielRawData$ = this.studentService.readStudents();
  }

  // Example of consuming Grid Event
  onCellClicked(e: CellClickedEvent): void {
    this.hasSelection = true;
    this.selectedRowNode = e.node;
  }

  // Example using Grid's API
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


  goToDetail() {
    const selectedStudent = this.presentielAgGrid.api.getSelectedRows();

    selectedStudent.forEach((selectedStudent: Students) => {
      this.router.navigate(['admin/students', selectedStudent.id]);
    });
  }


}




