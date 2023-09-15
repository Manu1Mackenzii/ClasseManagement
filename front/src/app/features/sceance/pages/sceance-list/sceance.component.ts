import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SceanceService } from '@core/services/sceance/sceance.service';
import { SceanceFormComponent } from '@features/sceance/form/sceance-form/sceance-form.component';
import { CourseSession } from '@features/sceance/model/sceance';

@Component({
  selector: 'app-sceance',
  templateUrl: './sceance.component.html',
  styleUrls: ['./sceance.component.scss']
})
export class SceanceComponent {

  sceances: CourseSession[] = [];
  selectedSceance: CourseSession;


  constructor(
    private sceanceService: SceanceService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.loadSceances();

  }

  loadSceances(): void {
    this.sceanceService.readSceance().subscribe((result: CourseSession[]) => {
      this.sceances = result;
      console.log(this.sceances);
    })
  }

  selectSceance(sceances: CourseSession) {
    this.selectedSceance = sceances;
  }

  deleteSceance(selectedSceance: CourseSession) {
    console.log(selectedSceance)
    const index = this.sceances.indexOf(selectedSceance);
    if (index > -1) {
      this.sceances.splice(index, 1);
      console.log(selectedSceance);
      this.sceanceService.deleteSceance(selectedSceance.id).subscribe((result: any) => {

        this.loadSceances();
      }
      );
    }
  }


  updateSceance(f: { value: CourseSession; }) {
    f.value.id = this.selectedSceance.id;
    this.sceanceService.updateSceance(f.value).subscribe((result: any) => {
      console.log(result);
      this.loadSceances();

    });
  }

  openform(data?: any): void {
    const dialogRef = this.dialog.open(SceanceFormComponent, {
      width: '500px',
      height: '250px',
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
  

}
