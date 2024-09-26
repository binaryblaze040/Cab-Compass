import { Component, OnInit } from '@angular/core';
import { Employee, EmployeeFilters, EmployeeWithCabRequirement } from '../../types';
import { SnackbarService } from '../../services/snackbar.service';
import { EmployeeService } from '../../services/employee.service';
import { CabService } from '../../services/cab.service';

@Component({
  selector: 'app-assign-cab',
  templateUrl: './assign-cab.component.html',
  styleUrl: './assign-cab.component.scss'
})
export class AssignCabComponent implements OnInit {
  filters: EmployeeFilters = {};

  employees: EmployeeWithCabRequirement[] = [];

  allEmployees: EmployeeWithCabRequirement[] = [];

  constructor(
    private _snackbar: SnackbarService, 
    private _employeeService: EmployeeService,
    private _cabService: CabService
  ) {
  }

  ngOnInit(): void {
    this.filters = {};
    this._employeeService.getAllEmployees()
    .subscribe({
      next: (data) => {
        this.employees = this.addCabRequirement(data);
        this.allEmployees = this.employees;
      },
      error: (error) => {
        console.error('Error fetching Employees: ', error);
      }
    });
  }

  addCabRequirement(employees: Employee[]): EmployeeWithCabRequirement[] {
    let employeesWithCabRequirement: EmployeeWithCabRequirement[] = [];

    employees.forEach(employee => {
      employeesWithCabRequirement.push(
        {
          employeeId: employee.employeeId,
          name: employee.name,
          email: employee.email,
          contact: employee.contact,
          designation: employee.designation,
          address: employee.address,
          cabRequired: false,
          geoCode: employee.geoCode
        }
      );
    });

    return employeesWithCabRequirement;
  } 

  assignCabToRequiredEmployees(): void {
    // logic to assign the cab to employees
    let employeesToAssignCab = this.getEmployeesWithCabRequirement(this.employees);

    this._cabService.getAvailableCabsPromise()
    .then((availableCabs) => {
      if(availableCabs.length === 0) {
        this._snackbar.openSnackBar("center", "top", 5, "Sorry, no available cabs!");
      }
      this._cabService.assignCabs(employeesToAssignCab, availableCabs);
    });
  }

  getEmployeesWithCabRequirement(employeesToFilter: EmployeeWithCabRequirement[]): EmployeeWithCabRequirement[] {
    return employeesToFilter.filter(emp => emp.cabRequired);
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
