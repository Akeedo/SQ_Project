import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { resourceServerUrl } from "@app/common/constants/server-settings";
import { getHttpHeaders } from '@app/common/constants/constants';
import { HttpClient, HttpParams, HttpResponse } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class ReportService {

  constructor(private http: HttpClient) { }

  // getCategoryNameList(): Observable<HttpResponse<any>> {
  //   const url: string = `${resourceServerUrl}/v1/asset-categories/dropdown`;
  //   return this.http.get(url, {
  //     headers: getHttpHeaders(),
  //     observe: "response",
  //   });
  // }

  

  getAssetListPdf(parameterType: string, parameter: string): Observable<any> {
    let url=`${resourceServerUrl}/v1/report/asset`;
    return this.http.get(url, {
      params: new HttpParams()
      .set('parameterType', parameterType ? parameterType.toString() : '')
      .set('parameter', parameter ? parameter.toString() : ''),
      headers: getHttpHeaders(),
        observe: 'response',
        responseType: 'blob',
    });
  }

  getAssetHistoryPdf(parameterType: string, parameter: string): Observable<any> {
    let url=`${resourceServerUrl}/v1/report/asset-history`;
    return this.http.get(url, {
      params: new HttpParams()
      .set('parameterType', parameterType ? parameterType.toString() : '')
      .set('parameter', parameter ? parameter.toString() : ''),
      headers: getHttpHeaders(),
      observe: 'response',
      responseType: 'blob',
    });
}

  dateFormat(str){
    var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }
}
