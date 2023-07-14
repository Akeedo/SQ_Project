import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { resourceServerUrl } from "@app/common/constants/server-settings";
import { getHttpHeaders } from '@app/common/constants/constants';
import { HttpClient, HttpParams, HttpResponse } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AssetCategoryService {

  constructor(private http: HttpClient) { }

  assetCategoryGetByOid(oid: any): Observable<any> {
    const url: string = `${resourceServerUrl}/v1/asset-categories/${oid}`;
    return this.http.get(url, {
      headers: getHttpHeaders(),
      observe: "response",
    });
  }

  saveAssetCategory(requestData: any): Observable<any> {
    const url: string = `${resourceServerUrl}/v1/asset-categories`;

    return this.http.post(url, requestData, {
      headers: getHttpHeaders(),
      observe: "response",
    });
  }

  updateAssetCategory(requestData: any, id): Observable<any> {
    const url: string = `${resourceServerUrl}/v1/asset-categories/${id}`;
    return this.http.put(url, requestData, {
      headers: getHttpHeaders(),
      observe: "response",
    });
  }
  deleteAssetCategory(assetCategoryOid: string): Observable<any> {
    const url: string = `${resourceServerUrl}/v1/asset-categories/asset-categories/${assetCategoryOid}`;
    return this.http.delete(url, {
      headers: getHttpHeaders(),
      observe: "response",
    });
  }

  getAssetCategories(offset: number, size: number, searchText: string): Observable<HttpResponse<any>> {
    const url: string = `${resourceServerUrl}/v1/asset-categories`;
    return this.http.get(url, {
      params: new HttpParams()
        .set('searchText', searchText)
        .set('offset', offset ? offset.toString() : '')
        .set('size', size ? size.toString() : ''),
      headers: getHttpHeaders(), observe: 'response'
    });
  }
}
