import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  template: `
    <h2 mat-dialog-title>Confirmación</h2>
    <mat-dialog-content>¿Estás seguro de que quieres continuar?</mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close class="mr-2">Cancelar</button>
      <button mat-button (click)="onConfirm()" class="bg-blue-500 text-white">Aceptar</button>
    </mat-dialog-actions>
  `,
})
export class ConfirmDialogComponent {
  constructor(private dialogRef: MatDialogRef<ConfirmDialogComponent>) {}

  onConfirm() {
    this.dialogRef.close(true); // Se cerrará el cuadro de confirmación con el resultado 'true'
  }
}
