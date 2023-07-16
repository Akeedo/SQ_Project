import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
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
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    //const url: string = `${resourceServerUrl}/v1/Employees`;
    return this.http.get<any>(this.apiURL,{ headers })
    .pipe(
      map(res => res)  // if your response data is at the root level
    );
  }

  saveEmployee(employee: any): Observable<any> {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    const httpOptions = { headers: headers };
    return this.http.post<any>(this.apiURL, employee,httpOptions,);
  }

  getEmployeeById(id: any): Observable<any> {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  const options = { headers: headers };

    const url: string = this.apiURL + '/'+ id;
    return this.http.get(url,options);
  }

  updateEmployee(emp: any, id:any): Observable<any> {
  const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    const httpOptions = { headers: headers };
    const url: string = this.apiURL + '/'+ id;
    return this.http.put<any>(url, emp, httpOptions);
  }
  
}
