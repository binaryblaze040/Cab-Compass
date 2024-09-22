import { Component, OnInit } from '@angular/core';
import { Employee, EmployeeFilters, EmployeeWithCabRequirement } from '../../types';
import { SnackbarService } from '../../services/snackbar.service';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-assign-cab',
  templateUrl: './assign-cab.component.html',
  styleUrl: './assign-cab.component.scss'
})
export class AssignCabComponent implements OnInit {
  filters: EmployeeFilters = {};

  employees: EmployeeWithCabRequirement[] = [];

  allEmployees: EmployeeWithCabRequirement[] = [];

  constructor(private _snackbar: SnackbarService, private _employeeService: EmployeeService) {
  }

  ngOnInit(): void {
    this.filters = {};
    this._employeeService.getAllEmployees()
    .subscribe({
      next: (data) => {
        data = this.addCabRequirement(data);
        this.employees = data;
        this.allEmployees = this.employees;
      },
      error: (error) => {
        console.error('Error fetching Employees: ', error);
      }
    });
  }

  addCabRequirement(employees: EmployeeWithCabRequirement[]): EmployeeWithCabRequirement[] {
    employees.forEach(employee => {
      employee.cabRequired = false;
    });
    return employees;
  }

  assignCab(): void {
    // logic to assign the cab
    console.log(this.employees);
  }

  switchCabRequirement(employee: EmployeeWithCabRequirement): void {
    employee.cabRequired = !employee.cabRequired;
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

    this._snackbar.openSnackBar("center", "bottom", 5, "Filters applied, " + this.employees.length + (this.employees.length > 1? " employees found!" : " employee found!"));
  }

}
