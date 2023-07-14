import {
  HttpBackend,
  HttpClient,
  HttpParams,
  HttpResponse,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { getHttpHeaders } from "@app/common/constants/constants";
import { resourceServerUrl } from "@app/common/constants/server-settings";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})

export class ManufacturerService {
  constructor(private http: HttpClient) { }

  saveManufacturer(requestData: any): Observable<any> {
    const url: string = `${resourceServerUrl}/v1/manufacturers`;

    return this.http.post(url, requestData, {
      headers: getHttpHeaders(),
      observe: "response",
    });
  }

  updateManufacturer(requestData: any, oid): Observable<any> {
    const url: string = `${resourceServerUrl}/v1/manufacturers/${oid}`;
    return this.http.put(url, requestData, {
      headers: getHttpHeaders(),
      observe: "response",
    });
  }

  getManufacturerByOid(oid: any): Observable<any> {
    const url: string = `${resourceServerUrl}/v1/manufacturers/${oid}`;
    return this.http.get(url, {
      headers: getHttpHeaders(),
      observe: "response",
    });
  }

  getManufacturer(offset: number, size: number, searchText: string): Observable<HttpResponse<any>> {
    const url: string = `${resourceServerUrl}/v1/manufacturers`;
    return this.http.get(url, {
      params: new HttpParams()
        .set('searchText', searchText)
        .set('offset', offset ? offset.toString() : '')
        .set('size', size ? size.toString() : ''),
      headers: getHttpHeaders(), observe: 'response'
    });
  }
}
