import { Component, OnInit } from '@angular/core';
import { Employee, EmployeeFilters } from '../../types';
import { SnackbarService } from '../../services/snackbar.service';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss',
})
export class EmployeeComponent implements OnInit {
  filters: EmployeeFilters = {};

  employees: Employee[] = [];
  allEmployees: Employee[] = [];

  constructor(private _snackbar: SnackbarService, private _employeeService: EmployeeService) {
  }

  ngOnInit(): void {
    this.filters = {};
    this._employeeService.getAllEmployees()
    .subscribe({
      next: (data) => {
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
    this.employees = this.allEmployees;
    if (this.filters.employeeId) {
      this.employees = this.employees.filter((employee) => {
        return this.filters.employeeId
          ? this.containsSubstring(employee.employeeId, this.filters.employeeId)
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
}
