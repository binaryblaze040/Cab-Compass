import { Component } from '@angular/core';
import { SnackbarService } from '../../services/snackbar.service';
import { AssignedCabFilters } from '../../types';
import { CabWithAssignedEmployees } from '../../types/cab';
import { CabService } from '../../services/cab.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assigned-cab',
  templateUrl: './assigned-cab.component.html',
  styleUrl: './assigned-cab.component.scss'
})
export class AssignedCabComponent {
    filters: AssignedCabFilters = {};
  
    filteredCabs: CabWithAssignedEmployees[] = [];
  
    allCabs: CabWithAssignedEmployees[] = [];
    
    constructor(
      private _snackbar: SnackbarService,
      private _cabService: CabService,
      private _router: Router
    ) {
    }
  
    ngOnInit(): void {
      this.allCabs = this._cabService.assignedCabs;
      this.filteredCabs = this.allCabs;

      if (this.allCabs.length === 0) {
        alert("No cabs assigned, please assign some cabs first !");
        this._router.navigate(['/assign-cab']);
      }
    }

    containsSubstring(word: string, query: string): boolean {
      return word.toLowerCase().includes(query.toLowerCase());
    }
  
    getFilteredCabs(): void {
      this.filteredCabs = structuredClone(this.allCabs);
      if (this.filters.registrationNumber) {
        this.filteredCabs = this.filteredCabs.filter((cab) => {
          return this.filters.registrationNumber
            ? this.containsSubstring(cab.registrationNumber, this.filters.registrationNumber)
            : true;
        });
      }
  
      if (this.filters.employeeId) { 
        let cabWithEmployee: CabWithAssignedEmployees[] = [];
        for (let cab of this.filteredCabs) {
          for (let employee of cab.employees) {
            if (this.containsSubstring(employee.employeeId, this.filters.employeeId)) {
              cabWithEmployee.push(cab);
            }
          }
        }
        if(cabWithEmployee.length) {
          this.filteredCabs = cabWithEmployee;
        }
        else {
          this.filteredCabs = [];
        }
      }
  
      if (this.filters.employeeEmail) {
        let cabWithEmployee: CabWithAssignedEmployees[] = [];
        for (let cab of this.filteredCabs) {
          for (let employee of cab.employees) {
            if (employee.email === this.filters.employeeEmail) {
              cabWithEmployee.push(cab);
              break;
            }
          }
        }

        if(cabWithEmployee.length) {
          this.filteredCabs = cabWithEmployee;
        }
        else {
          this.filteredCabs = [];
        }
      }
  
      if (this.filters.employeeContact) {
        let cabWithEmployee: CabWithAssignedEmployees[] = [];
        for (let cab of this.filteredCabs) {
          for (let employee of cab.employees) {
            if (this.containsSubstring(employee.contact.toString(), this.filters.employeeContact)) {
              cabWithEmployee.push(cab);
              break;
            }
          }
        }

        if(cabWithEmployee.length) {
          this.filteredCabs = cabWithEmployee;
        }
        else {
          this.filteredCabs = [];
        }
      }
  
      this._snackbar.openSnackBar("center", "bottom", 5, "Filters applied, " + this.filteredCabs.length + (this.filteredCabs.length > 1? " cabs found!" : " cab found!"));
    }
}
