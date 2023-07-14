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
import * as bcrypt from 'bcryptjs';
import { Users } from "../model/users";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  currentMenuOids: number[] = [];
  currentUser: Users;

  constructor(private http: HttpClient) { }

  getUsers(offset: number, size: number, searchText: string): Observable<HttpResponse<any>> {
    const url: string = `${resourceServerUrl}/v1/login`;
    return this.http.get(url, {
      params: new HttpParams()
        .set('searchText', searchText)
        .set('offset', offset ? offset.toString() : '')
        .set('size', size ? size.toString() : ''),
      headers: getHttpHeaders(), observe: 'response'
    });
  }

  saveUser(requestData: any): Observable<any> {
    requestData.password = this.encryptionAES(requestData.password);

    const url: string = `${resourceServerUrl}/v1/login`;
    return this.http.post(url, requestData,
      { headers: getHttpHeaders(), observe: 'response' });
  }

  updateUser(requestData: any): Observable<any> {
    const url: string = `${resourceServerUrl}/v1/login`;
    return this.http.put(url, requestData,
      {
        headers: getHttpHeaders(), observe: 'response'
      });
  }

  getUserByOid(oid: any): Observable<any> {
    const url: string = `${resourceServerUrl}/v1/login?search=loginOid:${oid}`;
    return this.http.get(url,
      { headers: getHttpHeaders(), observe: 'response' });
  }

  setOidToCurrentMenuOids(menuJsons: any[]): void {
    for (var menu of menuJsons) {
      this.addCurrentMenuOids(menu.oid);
      if (menu.children) {
        this.setOidToCurrentMenuOids(menu.children);
      }
    }
  }

  setOidToCurrentMenuOidsFromOidMenu(oidMenu: any[]): void {
    this.currentMenuOids = [];

    for (var menu of oidMenu) {
      this.addCurrentMenuOids(menu);
      if (menu.children) {
        this.setOidToCurrentMenuOids(menu.children);
      }
    }

  }

  addCurrentMenuOids(numberToAdd: number): void {
    if (this.currentMenuOids.includes(numberToAdd) == false) {
      this.currentMenuOids.push(numberToAdd);
    }
  }
  deleteCurrentMenuOids(numberToAdd: number): void {
    this.currentMenuOids.forEach((value, index) => {
      if (value == numberToAdd) this.currentMenuOids.splice(index, 1);
    });
  }
  setAllMenuOids(): void {
    //not implemented
  }
  getCurrentMenuOids(): any {
    return this.currentMenuOids;
  }
  clearCurrentMenuOids(): any {
    this.currentMenuOids = [];
  }

  encryptionAES(givenPassword) {
    const salt = "$2a$10$2eM9/38du44g0DJq.hgfg.";

    const pass = bcrypt.hashSync(givenPassword, salt);
    return pass;

  }
  clearCurrentOid() {
    this.currentMenuOids = [];
    //console.log(this.currentMenuOids);

  }
  setCurrentUser(givenCurrentUser):void{
    this.currentUser=givenCurrentUser;
  }
  getCurrentUser():Users{
    return this.currentUser;
  }
}
