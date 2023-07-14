import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsersService } from '@app/auth/settings/users/services/users.service';
import { getHttpHeaders } from '@app/common/constants/constants';
import { resourceServerUrl } from '@app/common/constants/server-settings';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IssueLogService {

  constructor(
    private http: HttpClient,
    private usersService: UsersService
  ) { }

  saveIssueLog(requestData: any): Observable<any> {
    const url: string = `${resourceServerUrl}/v1/issue-log`;

    return this.http.post(url, requestData, {
      headers: getHttpHeaders(),
      observe: "response",
    });
  }

  getAllLogListByAssetOid(offset: number, size: number, searchText: string, currentAssetOid: string): Observable<HttpResponse<any>> {
    const url: string = `${resourceServerUrl}/v1/issue-log/asset:${currentAssetOid}`;
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

  getAllLogListByStatus(offset: number, size: number, searchText: string, statusType: string): Observable<HttpResponse<any>> {
    const url: string = `${resourceServerUrl}/v1/issue-log/status:${statusType}`;

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

  getIssueLogByOid(offset: number, size: number, searchText: string, currentIssueLogOid: string): any {
    const url: string = `${resourceServerUrl}/v1/issue-log/issue:${currentIssueLogOid}`;

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

  updateIssueLog(requestData: any): Observable<any> {
    const url: string = `${resourceServerUrl}/v1/issue-log/issue:${requestData.oid}`;

    return this.http.put(url, requestData, {
      headers: getHttpHeaders(),
      observe: "response",
    });
  }

  getCountByIssueStaus(issueStatus: string): any {

    var currentUser = this.usersService.getCurrentUser();
    if (currentUser.roleOid == "admin") {
      const url: string = `${resourceServerUrl}/v1/issue-log/issue-status:${issueStatus}`;

      return this.http.get(url, {
        params: new HttpParams()
          .set('roleOid', this.usersService.getCurrentUser().roleOid),
        headers: getHttpHeaders(), observe: 'response'
      });
    } else {
      console.log("here non admin ::");

      const url: string = `${resourceServerUrl}/v1/issue-log/issue-by-status:${issueStatus}:${currentUser.siteOid}`;
      return this.http.get(url, {
        params: new HttpParams()
          .set('roleOid', this.usersService.getCurrentUser().roleOid),
        headers: getHttpHeaders(), observe: 'response'
      });
    }
  }
}
