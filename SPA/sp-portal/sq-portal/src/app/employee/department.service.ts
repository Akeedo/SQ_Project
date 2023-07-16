import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(
    private http: HttpClient
  ) { }


  private apiURL: string = 'https://localhost:7186/api/v1/Departments';
  
  getDepartments():  Observable<any[]> {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(this.apiURL,{headers})
    .pipe(
      map(res => res)  // if your response data is at the root level
    );
  }
}
