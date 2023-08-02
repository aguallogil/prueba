import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-alert-dialog',
  template: `
    <h2 mat-dialog-title>Alerta</h2>
    <mat-dialog-content>{{ data.message }}</mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close class="bg-blue-500 text-white">Aceptar</button>
    </mat-dialog-actions>
  `,
})
export class AlertDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Data) {}
}

interface Data {
  message: string;
}
