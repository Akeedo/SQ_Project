import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsersService } from '@app/auth/settings/users/services/users.service';
import { getHttpHeaders } from '@app/common/constants/constants';
import { resourceServerUrl } from '@app/common/constants/server-settings';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DesignationService {

  constructor(
    private http: HttpClient,
    private usersService: UsersService
    ) { }


  getPagedDesignations(offset: number, size: number, searchText: string, siteOid: string): Observable<HttpResponse<any>> {
    const url: string = `${resourceServerUrl}/v1/designation`;
    
    return this.http.get(url, {
      params: new HttpParams()
        .set('searchText', searchText)
        .set('offset', offset ? offset.toString() : '')
        .set('page', offset)
        .set('size', size ? size.toString() : '')
        .set('roleOid', this.usersService.getCurrentUser().roleOid),
      headers: getHttpHeaders(), observe: 'response'
    });
  }

  saveDesignation(requestData: any): Observable<any> {
    const url: string = `${resourceServerUrl}/v1/designation`;

    return this.http.post(url, requestData, {
      headers: getHttpHeaders(),
      observe: "response",
    });
  }

  getDesignationByOid(oid: any): Observable<any> {
    const url: string = `${resourceServerUrl}/v1/designation/${oid}`;
    return this.http.get(url, {
      headers: getHttpHeaders(),
      observe: "response",
    });
  }

  updateDesignation(requestData: any, oid): Observable<any> {
    const url: string = `${resourceServerUrl}/v1/designation/${oid}`;
    return this.http.put(url, requestData, {
      headers: getHttpHeaders(),
      observe: "response",
    });
  }

  deleteDesignationByOid(oid: string): Observable<any> {
    const url: string = `${resourceServerUrl}/v1/designation/${oid}`;
    return this.http.delete(url, {
      headers: getHttpHeaders(),
      observe: "response",
    });
  }


}
