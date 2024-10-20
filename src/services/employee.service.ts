import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Employee } from '../types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  apiUrl = environment.serverUrlLocal;

  selectedEmployeeForEdit: Employee = {
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

  constructor(private http: HttpClient) { }

  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl + '/employees');
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl + '/add-employee', employee);
  }

  editEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl + '/edit-employee', employee);
  }

  deleteEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl + '/delete-employee', {employeeId: employee.employeeId});
  }
}
