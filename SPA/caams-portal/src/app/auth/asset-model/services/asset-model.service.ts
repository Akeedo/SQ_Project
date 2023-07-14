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
export class AssetModelService {
  constructor(private http: HttpClient) { }

  assetModelGetByOid(oid: any): Observable<any> {
    const url: string = `${resourceServerUrl}/v1/asset-models/${oid}`;
    return this.http.get(url, {
      headers: getHttpHeaders(),
      observe: "response",
    });
  }

  saveAssetModel(requestData: any): Observable<any> {
    const url: string = `${resourceServerUrl}/v1/asset-models`;

    return this.http.post(url, requestData, {
      headers: getHttpHeaders(),
      observe: "response",
    });
  }

  updateAssetModel(requestData: any, oid): Observable<any> {
    const url: string = `${resourceServerUrl}/v1/asset-models/${oid}`;
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

  getManufacturerNameList(): Observable<HttpResponse<any>> {
    const url: string = `${resourceServerUrl}/v1/manufacturers/dropdown`;
    return this.http.get(url, {
      headers: getHttpHeaders(),
      observe: "response",
    });
  }

  getAssetModel(offset: number, size: number, searchText: string): Observable<HttpResponse<any>> {
    const url: string = `${resourceServerUrl}/v1/asset-models`;
    return this.http.get(url, {
      params: new HttpParams()
        .set('searchText', searchText)
        .set('offset', offset ? offset.toString() : '')
        .set('size', size ? size.toString() : ''),
      headers: getHttpHeaders(), observe: 'response'
    });
  }
}
