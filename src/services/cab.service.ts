import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment';
import { Observable } from 'rxjs';
import { Cab } from '../types/cab';


@Injectable({
  providedIn: 'root'
})
export class CabService {
  apiUrl = environment.serverUrlLocal;

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

  constructor(private http: HttpClient) { }

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