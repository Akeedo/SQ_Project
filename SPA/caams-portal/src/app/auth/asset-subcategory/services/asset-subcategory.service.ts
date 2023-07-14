import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { resourceServerUrl } from "@app/common/constants/server-settings";
import { getHttpHeaders } from '@app/common/constants/constants';
import { HttpClient, HttpParams, HttpResponse } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AssetSubCategoryService {


  constructor(private http: HttpClient) { }

  assetSubCategoryGetByOid(oid: any): Observable<any> {
    const url: string = `${resourceServerUrl}/v1/asset-sub-categories/${oid}`;
    return this.http.get(url, {
      headers: getHttpHeaders(),
      observe: "response",
    });
  }

  saveAssetSubCategory(requestData: any): Observable<any> {
    const url: string = `${resourceServerUrl}/v1/asset-sub-categories`;

    return this.http.post(url, requestData, {
      headers: getHttpHeaders(),
      observe: "response",
    });
  }

  updateAssetSubCategory(requestData: any, id): Observable<any> {
    const url: string = `${resourceServerUrl}/v1/asset-sub-categories/${id}`;
    return this.http.put(url, requestData, {
      headers: getHttpHeaders(),
      observe: "response",
    });
  }
  getCategoryTypeList(): Observable<HttpResponse<any>> {
    const url: string = `${resourceServerUrl}/v1/asset-category-types/dropdown`;
    return this.http.get(url, {
      headers: getHttpHeaders(),
      observe: "response",
    });
  }

  getCategoryNameList(): Observable<HttpResponse<any>> {
    const url: string = `${resourceServerUrl}/v1/asset-categories/dropdown`;
    return this.http.get(url, {
      headers: getHttpHeaders(),
      observe: "response",
    });
  }

  getSubcategoryNameList(id: string): Observable<HttpResponse<any>> {
    const url: string = `${resourceServerUrl}/v1/asset-sub-categories/dropdown/${id}`;
    return this.http.get(url, {
      headers: getHttpHeaders(),
      observe: "response",
    });
  }

  getAssetSubCategory(offset: number, size: number, searchText: string): Observable<HttpResponse<any>> {
    const url: string = `${resourceServerUrl}/v1/asset-sub-categories`;
    return this.http.get(url, {
        params: new HttpParams()
            .set('searchText', searchText)
            .set('offset', offset ? offset.toString() : '')
            .set('size', size ? size.toString() : ''),
        headers: getHttpHeaders(), observe: 'response'
    });
}
}