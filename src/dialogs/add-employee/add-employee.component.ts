import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Employee, EmployeeValidation } from '../../types';
import { EmployeeService } from '../../services/employee.service';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss'
})

export class AddEmployeeComponent {

  errors: EmployeeValidation;

  newEmployee: Employee;

  phoneNumber: string = "";
  
  constructor(
    private dialogRef: MatDialogRef<AddEmployeeComponent>,
    private _employeeService: EmployeeService,
    private _snackbar: SnackbarService,
  ) {
    this.newEmployee = {
      employeeId: '',
      name: '',
      email: '',
      contact: 0,
      designation: '',
      address: '',
      geoCode: {
        latitude: 0,
        longitude: 0
      }
    };

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
    if(this.newEmployee.employeeId.length === 0) {
      this.errors.employeeId = true;
      isValid = false;
    }
    
    if(this.newEmployee.name.length === 0) {
      this.errors.name = true;
      isValid = false;
    }

    const emailRegexpattern = /^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;
    if(this.newEmployee.email.length === 0) {
      this.errors.email.required = true;
      isValid = false;
    }
    else if(!emailRegexpattern.test(this.newEmployee.email)) {
      this.errors.email.invalid = true;
      isValid = false;
    }

    const phoneRegexPattern = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;

    if(this.phoneNumber.length === 0) {
      this.errors.contact.required = true;
      isValid = false;
    }
    else if(!phoneRegexPattern.test(this.phoneNumber)) {
      this.errors.contact.invalid = true;
      isValid = false;
    }

    this.newEmployee.contact = parseInt(this.phoneNumber);
    
    if(this.newEmployee.designation.length === 0) {
      this.errors.designation = true;
      isValid = false;
    }

    if(this.newEmployee.address.length === 0) {
      this.errors.address = true;
      isValid = false;
    }

    return isValid;
  }

  confirm(): void {
    // Perform any action needed (e.g., save data) and close the dialog
    if(this.validateForm()) {
      this._employeeService.addEmployee(this.newEmployee)
      .subscribe({
        next: (addedEmployee: Employee) => {
          this._snackbar.openSnackBar("center", "bottom", 5, addedEmployee.name + " added!");
        },
        error: (error) => {
          this._snackbar.openSnackBar("center", "bottom", 5, "Sorry, failed to add employee!");
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
