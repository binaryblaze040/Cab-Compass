import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { Cab, CabWithAssignedEmployees } from '../types/cab';
import { SnackbarService } from './snackbar.service';
import { EmployeeWithCabRequirement } from '../types';
import { Router } from '@angular/router';

import { getDistance } from 'geolib';


@Injectable({
  providedIn: 'root'
})
export class CabService {
  apiUrl = environment.serverUrlLocal;

  assignedCabs: CabWithAssignedEmployees[] = [];

  selectedCabForEdit: Cab = {
    registrationNumber: '',
    driverName: '',
    driverLicenseNumber: '',
    type: '',
    model: '',
    contact: '',
    capacity: 0,
    available: false
  };

  constructor(
    private http: HttpClient,
    private _snackbar: SnackbarService,
    private _router: Router
  ) { }

  // Magic function of the project
  assignCabs(employeesToAssignCab : EmployeeWithCabRequirement[], availableCabs: Cab[]): void {
    this.assignedCabs = [];

    if(employeesToAssignCab.length === 0) {
      this._snackbar.openSnackBar("center", "bottom", 5, "Please select atleast one employee");
    }

    for (const cab of availableCabs) {
      let currentCab = this.initializeNewCab(cab);

      if (employeesToAssignCab.length === 0) {
        break;
      }

      let firstEmployeeForCab = employeesToAssignCab[0];

      // assigning cab to the first employee 
      currentCab.employees.push(firstEmployeeForCab);
      employeesToAssignCab = employeesToAssignCab.filter(emp => emp.employeeId != firstEmployeeForCab.employeeId);

      // find co-passengers for first employee in the cab
      for (let i=0; i<cab.capacity-1; i++) {
        if (employeesToAssignCab.length === 0) {
          break;
        }
        
        let minimumDistance = getDistance(firstEmployeeForCab.geoCode, employeesToAssignCab[0].geoCode);
        let employeeWithMinDistance = employeesToAssignCab[0];

        // getting the employee with minimum distance
        employeesToAssignCab.forEach((employee) => {
          let currentDistance = getDistance(firstEmployeeForCab.geoCode, employee.geoCode);
          if (currentDistance < minimumDistance) {
            employeeWithMinDistance = employee;
            minimumDistance = currentDistance;
          }
        })

        // assigning cab to the employee with minimum distance
        currentCab.employees.push(employeeWithMinDistance);
        employeesToAssignCab = employeesToAssignCab.filter(emp => emp.employeeId != employeeWithMinDistance.employeeId);
      }

      this.assignedCabs.push(currentCab);
    }

    console.log(this.assignedCabs);
    this._snackbar.openSnackBar("center", "bottom", 5, "Cabs Assigned!");

    // redirect to assigned cabs component
    this._router.navigate(['/assigned-cabs']);
  }

  initializeNewCab(cab: Cab): CabWithAssignedEmployees {
    return {
      registrationNumber: cab.registrationNumber,
      driverName: cab.driverName,
      driverLicenseNumber: cab.driverLicenseNumber,
      type: cab.type,
      model: cab.model,
      contact: cab.contact,
      capacity: cab.capacity,
      available: cab.available,
      employees: []
    }
  }

  getAvailableCabsPromise(): Promise<Cab[]> {
    return new Promise(async(resolve, reject) => {
      this.getAllCabs()
      .subscribe({
        next: (allCabs) => {
          let availableCabs = allCabs.filter((cab) => cab.available);
          resolve(availableCabs);
        },
        error: (error) => {
          this._snackbar.openSnackBar("center", "top", 5, "Sorry, failed to get cabs!");
          console.error('Error fetching Cab: ', error);
          reject();
        }
      });
    });
  }

  getAllCabs(): Observable<Cab[]> {
    return this.http.get<Cab[]>(this.apiUrl + '/cabs');
  }

  addCab(cab: Cab): Observable<Cab> {
    return this.http.post<Cab>(this.apiUrl + '/add-cab', cab);
  }

  editCabDetails(cab: Cab): Observable<Cab> {
    return this.http.post<Cab>(this.apiUrl + '/edit-cab', cab);
  }

  deleteCab(cab: Cab): Observable<Cab> {
    return this.http.post<Cab>(this.apiUrl + '/delete-cab', {registrationNumber: cab.registrationNumber});
  }
  
}