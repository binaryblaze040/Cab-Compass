import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment';
import { Employee } from '../types';
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
    return this.http.get<Employee[]>(this.apiUrl + '/employees')
  }
}
