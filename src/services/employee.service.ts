import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment';
import { APIResponse, Employee } from '../types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService implements OnInit {

  apiUrl = environment.serverUrlLocal;
  employees: Employee[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl + '/employees');
  }

  addEmployee(employee: Employee): Observable<APIResponse> {
    return this.http.post<APIResponse>(this.apiUrl + '/add-employee', employee);
  }

  editEmployee(employee: Employee): Observable<APIResponse> {
    return this.http.post<APIResponse>(this.apiUrl + '/edit-employee', employee);
  }

  deleteEmployee(employee: Employee): Observable<APIResponse> {
    return this.http.post<APIResponse>(this.apiUrl + '/delete-employee', employee);
  }
}
