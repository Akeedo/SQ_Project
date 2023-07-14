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
import { UsersService } from "../../users/services/users.service";

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient, private usersService: UsersService) { }

  getRole(offset: number, size: number, searchText: string): Observable<HttpResponse<any>> {
    const url: string = `${resourceServerUrl}/v1/role`;
    return this.http.get(url, {
      params: new HttpParams()
        .set('searchText', searchText)
        .set('offset', offset ? offset.toString() : '')
        .set('size', size ? size.toString() : ''),
      headers: getHttpHeaders(), observe: 'response'
    });
  }

  getMenuList(): Observable<HttpResponse<any>> {
    const url: string = `${resourceServerUrl}/v1/menu-json`;
    return this.http.get(url,
      { headers: getHttpHeaders(), observe: 'response' });
  }

  saveRole(requestData: any): Observable<any> {

    const url: string = `${resourceServerUrl}/v1/role`;
    return this.http.post(url, requestData,
      { headers: getHttpHeaders(), observe: 'response' });
  }


  saveRoleMenu(givenRoleOid: any): Observable<any> {

    const requestData = {
      "roleOid": givenRoleOid,
      "menuOids": this.usersService.getCurrentMenuOids()
    }

    const url: string = `${resourceServerUrl}/v1/role-menu`;
    return this.http.post(url, requestData,
      { headers: getHttpHeaders(), observe: 'response' });
  }

  updateRole(requestData: any): Observable<any> {
    const url: string = `${resourceServerUrl}/v1/role`;
    return this.http.put(url, requestData,
      {
        headers: getHttpHeaders(), observe: 'response'
      });
  }

  getRoleByOid(oid: any): Observable<any> {
    const url: string = `${resourceServerUrl}/v1/role?search=roleOid:${oid}`;
    return this.http.get(url,
      { headers: getHttpHeaders(), observe: 'response' });
  }
  getRoleByOidMenuJson(oid: any): Observable<any> {
    const url: string = `${resourceServerUrl}/v1/role-menu?roleOid=${oid}`;
    return this.http.get(url,
      { headers: getHttpHeaders(), observe: 'response' });
  }
}
