import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { resourceServerUrl } from 'src/common/constants/server-settings';
import { getHttpHeaders } from 'src/common/constants/constants';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(
    private http: HttpClient
  ) { }

  private apiURL: string = 'https://localhost:7186/api/v1/Employees';
  getPagedEmployees():  Observable<any[]> {
    //const url: string = `${resourceServerUrl}/v1/Employees`;
    debugger
    return this.http.get<any>(this.apiURL)
    .pipe(
      map(res => res)  // if your response data is at the root level
    );
  }
  
}
