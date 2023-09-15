import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-edit-button-renderer',
  templateUrl: './edit-button-renderer.component.html',
  styleUrls: ['./edit-button-renderer.component.scss']

})
export class EditButtonRendererComponent implements ICellRendererAngularComp {
  params: any;

  agInit(params: any): void {
    this.params = params;
  }

  editClicked() {
    if (this.params.onEditClick) {
      this.params.onEditClick(this.params.data);
    }
  }

  refresh(params: any): boolean {
    return false;
  }
}
