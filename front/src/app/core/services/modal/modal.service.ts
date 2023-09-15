import { ComponentType } from '@angular/cdk/portal';
import { Injectable, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(
    public matDialog: MatDialog,
  ) { }

  open(component: TemplateRef<unknown>, config: MatDialogConfig): MatDialogRef<any> {
    return this.matDialog.open(component, config);
  }
}
