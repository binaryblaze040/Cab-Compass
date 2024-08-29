import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss'
})
export class AddEmployeeComponent {
  constructor(public dialogRef: MatDialogRef<AddEmployeeComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
