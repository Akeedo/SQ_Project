import {
  HttpBackend,
  HttpClient,
  HttpParams,
  HttpResponse,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UsersService } from "@app/auth/settings/users/services/users.service";
import { getHttpHeaders } from "@app/common/constants/constants";
import { resourceServerUrl } from "@app/common/constants/server-settings";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AssetService {




  constructor(private http: HttpClient,
    private usersService: UsersService) { }

  getPagedAssets(offset: number, size: number, searchText: string, siteOid: string): Observable<HttpResponse<any>> {
    const url: string = `${resourceServerUrl}/v1/asset/site/${siteOid}`;
    
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

  getAssetList(offset: number, size: number, searchText: string): Observable<HttpResponse<any>> {
    const url: string = `${resourceServerUrl}/v1/asset/assets`;
    return this.http.get(url, {
      params: new HttpParams()
        .set('searchText', searchText)
        .set('offset', offset ? offset.toString() : '')
        .set('size', size ? size.toString() : ''),
      headers: getHttpHeaders(), observe: 'response'
    });
  }

  saveAsset(requestData: any): Observable<any> {
    const url: string = `${resourceServerUrl}/v1/asset/assets`;

    return this.http.post(url, requestData, {
      headers: getHttpHeaders(),
      observe: "response",
    });
  }

  saveAssetCategoryType(requestData: any): Observable<any> {
    const url: string = `${resourceServerUrl}/v1/asset-category-types`;

    return this.http.post(url, requestData, {
      headers: getHttpHeaders(),
      observe: "response",
    });
  }

  updateAsset(requestData: any, assetOid: string): Observable<any> {
    const url: string = `${resourceServerUrl}/v1/asset/assets/${assetOid}`;

    return this.http.put(url, requestData, {
      headers: getHttpHeaders(),
      observe: "response",
    });
  }


  deleteAssetByAssetOid(assetOid: string): Observable<any> {
    const url: string = `${resourceServerUrl}/v1/asset/assets/${assetOid}`;
    return this.http.delete(url, {
      headers: getHttpHeaders(),
      observe: "response",
    });
  }


  findAssetOpByID(assetOid: any): Observable<any> {
    const url: string = `${resourceServerUrl}/v1/asset/assets/${assetOid}`;
    return this.http.get(url, {
      headers: getHttpHeaders(),
      observe: "response",
    });
  }

  findAssetSingleProjectionByID(assetOid: any): Observable<any> {
    const url: string = `${resourceServerUrl}/v1/asset/${assetOid}`;
    return this.http.get(url, {
      headers: getHttpHeaders(),
      observe: "response",
    });
  }

  getSiteNameList(): Observable<HttpResponse<any>> {
    const url: string = `${resourceServerUrl}/v1/site/dropdown`;
    return this.http.get(url, {
      headers: getHttpHeaders(),
      observe: "response",
    });
  }

  getDesignations(): Observable<HttpResponse<any>> {
    const url: string = `${resourceServerUrl}/v1/designation/dropdown`;
    return this.http.get(url, {
      headers: getHttpHeaders(),
      observe: "response",
    });
  }

  getSubSiteList(siteId: string): Observable<HttpResponse<any>> {
    let param = siteId !== null ? new HttpParams().set("siteId", siteId) : null;
    const url: string = `${resourceServerUrl}/v1/subsites/dropdown`;
    return this.http.get(url, {
      headers: getHttpHeaders(),
      params: param,
      observe: "response",
    });
  }

  getVendorList(): Observable<HttpResponse<any>> {
    const url: string = `${resourceServerUrl}/v1/vendors/dropdown`;
    return this.http.get(url, {
      headers: getHttpHeaders(),
      observe: "response",
    });
  }

  getManfacturerList(): Observable<HttpResponse<any>> {
    const url: string = `${resourceServerUrl}/v1/manufacturers/dropdown`;
    return this.http.get(url, {
      headers: getHttpHeaders(),
      observe: "response",
    });
  }

  getAssetDataByManufacturerOid(manufacturerOid: any): Observable<any> {
    const url: string = `${resourceServerUrl}/v1/by-manufacturer/${manufacturerOid}`;
    return this.http.get(url, {
      headers: getHttpHeaders(),
      observe: "response",
    });
  }

  getAssetHistoryDataByAssetOid(assetOid: any): Observable<any> {
    const url: string = `${resourceServerUrl}/v1/by-asset-history/${assetOid}`;
    return this.http.get(url, {
      headers: getHttpHeaders(),
      observe: "response",
    });
}
  getPackageList(): Observable<HttpResponse<any>> {
    const url: string = `${resourceServerUrl}/v1/asset-category-types/dropdown`;
    return this.http.get(url, {
      headers: getHttpHeaders(),
      observe: "response",
    });
  }

  getModelList(): Observable<HttpResponse<any>> {
    const url: string = `${resourceServerUrl}/v1/asset-models/dropdown`;
    return this.http.get(url, {
      headers: getHttpHeaders(),
      observe: "response",
    });
  }

  getAssetCategoryList(): Observable<HttpResponse<any>> {
    const url: string = `${resourceServerUrl}/v1/asset-categories/dropdown`;
    return this.http.get(url, {
      headers: getHttpHeaders(),
      observe: "response",
    });
  }

  fetchAssetCategoryById(categoryId: string): Observable<HttpResponse<any>> {
    const url: string = `${resourceServerUrl}/v1/asset-categories/${categoryId}`;
    return this.http.get(url, {
      headers: getHttpHeaders(),
      observe: "response",
    });
  }

  getAssetOwnerList(): Observable<HttpResponse<any>> {
    const url: string = `${resourceServerUrl}/v1/asset-owners/dropdown`;
    return this.http.get(url, {
      headers: getHttpHeaders(),
      observe: "response",
    });
  }


}
