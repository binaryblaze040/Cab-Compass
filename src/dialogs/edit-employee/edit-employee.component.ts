import { Component } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { SnackbarService } from '../../services/snackbar.service';
import { Employee, EmployeeValidation } from '../../types';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.scss'
})
export class EditEmployeeComponent {
  errors: EmployeeValidation;

  editEmployee: Employee;
  
  constructor(
    private dialogRef: MatDialogRef<EditEmployeeComponent>,
    private _employeeService: EmployeeService,
    private _snackbar: SnackbarService,
  ) {

    this.editEmployee = this._employeeService.selectedEmployeeForEdit;
    this.errors = {
      employeeId: false,
      name: false,
      email: {
        invalid: false,
        required: false
      },
      contact: {
        invalid: false,
        required: false
      },
      designation: false,
      address: false
    };
  }

  validateForm(): boolean {
    let isValid = true;
    
    if(this.editEmployee.name.length === 0) {
      this.errors.name = true;
      isValid = false;
    }

    const emailRegexpattern = /^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;
    if(this.editEmployee.email.length === 0) {
      this.errors.email.required = true;
      isValid = false;
    }
    else if(!emailRegexpattern.test(this.editEmployee.email)) {
      this.errors.email.invalid = true;
      isValid = false;
    }

    const phoneRegexPattern = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
    const phoneNumber = this.editEmployee.contact.toString();
    if(phoneNumber.length === 0) {
      this.errors.contact.required = true;
      isValid = false;
    }
    else if(!phoneRegexPattern.test(phoneNumber)) {
      this.errors.contact.invalid = true;
      isValid = false;
    }

    this.editEmployee.contact = parseInt(phoneNumber);
    
    if(this.editEmployee.designation.length === 0) {
      this.errors.designation = true;
      isValid = false;
    }

    if(this.editEmployee.address.length === 0) {
      this.errors.address = true;
      isValid = false;
    }

    return isValid;
  }

  confirm(): void {
    // Perform any action needed (e.g., save data) and close the dialog
    if(this.validateForm()) {
      this._employeeService.editEmployee(this.editEmployee)
      .subscribe({
        next: (editedEmployee: Employee) => {
          this._snackbar.openSnackBar("center", "bottom", 5, "Update details for " + editedEmployee.name + " successful!");
        },
        error: (error) => {
          this._snackbar.openSnackBar("center", "bottom", 5, "Sorry, failed to edit employee!");
          console.log(error);
        }
      });

      this.dialogRef.close(true);
    }
  }

  cancel(): void {
    // Close the dialog without any action
    this.dialogRef.close(false);
  }
}
