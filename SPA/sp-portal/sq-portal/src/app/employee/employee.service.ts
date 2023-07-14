import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { resourceServerUrl } from 'src/common/constants/server-settings';
import { getHttpHeaders } from 'src/common/constants/constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(
    private http: HttpClient
  ) { }

  getPagedEmployees(): Observable<HttpResponse<any>> {
    const url: string = `${resourceServerUrl}/v1/Employees`;
    
    return this.http.get(url, {
      headers: getHttpHeaders(), observe: 'response'
    });
  }
  
}
