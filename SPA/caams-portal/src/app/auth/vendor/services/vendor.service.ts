import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getHttpHeaders } from '@app/common/constants/constants';
import { resourceServerUrl } from '@app/common/constants/server-settings';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class VendorService {


  constructor(private http: HttpClient) { }

  getVendorByOid(id: any): Observable<any> {

    const url: string = `${resourceServerUrl}/v1/vendors/${id}`;

    return this.http.get(url,
      { headers: getHttpHeaders(), observe: 'response' });
  }

  saveVendor(requestData: any): Observable<HttpResponse<any>> {
    
    const url: string = `${resourceServerUrl}/v1/vendors`;

    return this.http.post(url, requestData,
      { headers: getHttpHeaders(), observe: 'response' });
  }

  updateVendor(requestData: any, vendorOid: any): Observable<any> {
    const url: string = `${resourceServerUrl}/v1/vendors/${vendorOid}`;
    return this.http.put(url, requestData,
      {
        headers: getHttpHeaders(), observe: 'response'
      });
  }

  getVendor(offset: number, size: number, searchText: string): Observable<HttpResponse<any>> {
    const url: string = `${resourceServerUrl}/v1/vendors`;
    return this.http.get(url, {
      params: new HttpParams()
        .set('searchText', searchText)
        .set('offset', offset ? offset.toString() : '')
        .set('size', size ? size.toString() : ''),
      headers: getHttpHeaders(), observe: 'response'
    });
  }
}
