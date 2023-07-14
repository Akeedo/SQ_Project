import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getHttpHeaders } from '@app/common/constants/constants';
import { resourceServerUrl } from '@app/common/constants/server-settings';
import { Observable } from 'rxjs';
import { UsersService } from '../settings/users/services/users.service';

@Injectable({
  providedIn: 'root'
})
export class IssueCommentServiceService {

  constructor(
    private http: HttpClient,
    private usersService: UsersService
  ) { }


  getPagedIssueComments(offset: number, size: number, searchText: string, siteOid: string): Observable<HttpResponse<any>> {
    const url: string = `${resourceServerUrl}/v1/issue-comments`;
    
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

  getAllIssueComments(): Observable<HttpResponse<any>> {
    const url: string = `${resourceServerUrl}/v1/issue-comments`;
    
    return this.http.get(url, {
      headers: getHttpHeaders(), observe: 'response'
    });
  }

  getAllIssueCommentsFromIssueOid(issueOid: any): Observable<HttpResponse<any>> {
    const url: string = `${resourceServerUrl}/v1/issue-comments/issue/${issueOid}`;
    
    return this.http.get(url, {
      headers: getHttpHeaders(), observe: 'response'
    });
  }

  getAllIssueReplies(): Observable<HttpResponse<any>> {
    const url: string = `${resourceServerUrl}/v1/issue-replies`;
    
    return this.http.get(url, {
      headers: getHttpHeaders(), observe: 'response'
    });
  }

  saveComments(requestData: any): Observable<any> {
    const url: string = `${resourceServerUrl}/v1/issue-comments`;

    return this.http.post(url, requestData, {
      headers: getHttpHeaders(),
      observe: "response",
    });
  }

  getIssueCommentsByOid(oid: any): Observable<any> {
    const url: string = `${resourceServerUrl}/v1/issue-comments/${oid}`;
    return this.http.get(url, {
      headers: getHttpHeaders(),
      observe: "response",
    });
  }

  updateIssueComments(requestData: any, oid): Observable<any> {
    const url: string = `${resourceServerUrl}/v1/issue-comments/${oid}`;
    return this.http.put(url, requestData, {
      headers: getHttpHeaders(),
      observe: "response",
    });
  }

  saveReplies(requestData: any): Observable<any> {
    const url: string = `${resourceServerUrl}/v1/issue-replies`;
    return this.http.post(url, requestData, {
      headers: getHttpHeaders(),
      observe: "response",
    });
  }

  getLastCommentByIssueOid(issueOid: any): Observable<any> {
    const url: string = `${resourceServerUrl}/v1/issue-comments/${issueOid}/last-comment`;
    return this.http.get(url, {
      headers: getHttpHeaders(),
      observe: "response",
    });
  }

}
