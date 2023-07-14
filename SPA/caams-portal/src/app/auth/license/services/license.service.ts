import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { resourceServerUrl } from "@app/common/constants/server-settings";
import { getHttpHeaders } from '@app/common/constants/constants';
import { HttpClient, HttpParams, HttpResponse } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class LicenseService {

  constructor(private http: HttpClient) { }

  getlicenseByOid(id: any): Observable<any> {
    const url: string = `${resourceServerUrl}/v1/licenses/${id}`;
    return this.http.get(url, 
      {headers: getHttpHeaders(), observe: "response"});
  }

  getCategoryNameList(): Observable<HttpResponse<any>> {
    const url: string = `${resourceServerUrl}/v1/asset-categories/dropdown`;
    return this.http.get(url, {
      headers: getHttpHeaders(),
      observe: "response",
    });
  }
  getManufacturerNameList(): Observable<any> {
    const url: string = `${resourceServerUrl}/v1/manufacturers/dropdown`;
    return this.http.get(url, {
      headers: getHttpHeaders(),
      observe: "response",
    });
  }
  getVendorNameList(): Observable<any> {
  const url: string = `${resourceServerUrl}/v1/vendors/dropdown`;
    return this.http.get(url,{ 
      headers: getHttpHeaders(), 
      observe: 'response'
     });
  }
  saveLicense(requestData: any): Observable<any> {
    const url: string = `${resourceServerUrl}/v1/licenses`;

    return this.http.post(url, requestData, {
      headers: getHttpHeaders(),
      observe: "response",
    });
  }

  updateLicense(requestData: any, licenseOid): Observable<any> {
    const url: string = `${resourceServerUrl}/v1/licenses/${licenseOid}`;
    return this.http.put(url, requestData, {
      headers: getHttpHeaders(),
      observe: "response",
    });
  }

  getLicense(offset: number, size: number, searchText: string): Observable<HttpResponse<any>> {
    const url: string = `${resourceServerUrl}/v1/licenses`;
    return this.http.get(url, {
      params: new HttpParams()
        .set('searchText', searchText)
        .set('offset', offset ? offset.toString() : '')
        .set('size', size ? size.toString() : ''),
      headers: getHttpHeaders(), observe: 'response'
    });
  }
}
