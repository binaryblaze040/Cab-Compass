import { Component, OnInit } from '@angular/core';
import { Employee, EmployeeFilters } from '../../types';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from '../../services/snackbar.service';
import { EmployeeService } from '../../services/employee.service';
import { AddEmployeeComponent } from '../../dialogs/add-employee/add-employee.component';
import { EditEmployeeComponent } from '../../dialogs/edit-employee/edit-employee.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss',
})
export class EmployeeComponent implements OnInit {
  filters: EmployeeFilters = {};

  editMode = false;
  employees: Employee[] = [];
  allEmployees: Employee[] = [];

  constructor(
    private _snackbar: SnackbarService,
    private _employeeService: EmployeeService,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.filters = {};
    this._employeeService.getAllEmployees()
    .subscribe({
      next: (data) => {
        console.log(data)
        this.employees = data;
        this.allEmployees = this.employees;
      },
      error: (error) => {
        console.error('Error fetching Employees: ', error);
      }
    });
  }

  containsSubstring(word: string, query: string): boolean {
    return word.toLowerCase().includes(query.toLowerCase());
  }

  getFilteredEmployees(): void {
    this.employees = structuredClone(this.allEmployees);
    if (this.filters.employeeId) {
      this.employees = this.employees.filter((employee) => {
        return this.filters.employeeId
          ? employee.employeeId === this.filters.employeeId
          : true;
      });
    }

    if (this.filters.email) {
      this.employees = this.employees.filter((employee) => {
        return this.filters.email
          ? this.containsSubstring(employee.email, this.filters.email)
          : true;
      });
    }

    if (this.filters.contact) { 
      this.employees = this.employees.filter((employee) => {
        return this.filters.contact
          ? this.containsSubstring(
              employee.contact.toString(),
              this.filters.contact.toString()
            )
          : true;
      });
    }

    if (this.filters.address) {
      this.employees = this.employees.filter((employee) => {
        return this.filters.address
          ? this.containsSubstring(employee.address, this.filters.address)
          : true;
      });
    }

    this._snackbar.openSnackBar("center", "bottom", 5, "Filters applied, " + this.employees.length + (this.employees.length > 1? " employees found!" : " employee found!"));
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }

  addEmployee(): void {
    const dialogRef = this.dialog.open(AddEmployeeComponent);
    dialogRef.afterClosed().subscribe();
  }

  editEmployee(employee: Employee): void {
    // open a model to get the changes
    this._employeeService.selectedEmployeeForEdit = employee;
    const dialogRef = this.dialog.open(EditEmployeeComponent);
    dialogRef.afterClosed().subscribe();
  }

  deleteEmployee(employee: Employee): void {
    if (confirm("Are you sure you want to delete " + employee.name + " ?") == true) {
      this._employeeService.deleteEmployee(employee)
      .subscribe({
        next: (updatedEmployee: Employee) => {
          this._snackbar.openSnackBar("center", "bottom", 5, updatedEmployee.name + " deleted successfully!");
        },
        error: (error) => {
          this._snackbar.openSnackBar("center", "bottom", 5, "Sorry, deletion failed!");
          console.error('Error deleting employee: ', error);
        }
      });
    }
  }
}
