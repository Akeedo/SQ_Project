import { HttpBackend, HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getHttpHeaders } from '@app/common/constants/constants';
import { resourceServerUrl } from '@app/common/constants/server-settings';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SubSiteService {

    // getSiteNameList() {
    //   throw new Error('Method not implemented.');
    // }
    constructor(private http: HttpClient, private httpbackend: HttpBackend) {
        //Token Bypass
        // this.http = new HttpClient(httpbackend);
    }

    saveSubSite(requestData: any): Observable<HttpResponse<any>> {
    
        const url: string = `${resourceServerUrl}/v1/subsites`;
        return this.http.post(url, requestData,
            { headers: getHttpHeaders(), observe: 'response' });
    }
    deleteSubSite(requestData: any): Observable<HttpResponse<any>> {
        const url: string = `${resourceServerUrl}/v1/subsites`;
        return this.http.post(url, requestData,
            { headers: getHttpHeaders(), observe: 'response' });
    }


    getSubSiteByOid(subsiteOid: any): Observable<any> {
        const url: string = `${resourceServerUrl}/v1/subsites/${subsiteOid}`;
        return this.http.get(url,
            { headers: getHttpHeaders(), observe: 'response' });
    }

    updateSubSite(requestData: any, subsiteOid: any): Observable<any> {
        const url: string = `${resourceServerUrl}/v1/subsites/${subsiteOid}`;
        return this.http.put(url, requestData,
            {
                params: new HttpParams()
                    .set('siteOid', subsiteOid),
                headers: getHttpHeaders(), observe: 'response'
            });
    }

    getSubsite(offset: number, size: number, searchText: string): Observable<HttpResponse<any>> {
        const url: string = `${resourceServerUrl}/v1/subsites`;
        return this.http.get(url, {
            params: new HttpParams()
                .set('searchText', searchText)
                .set('offset', offset ? offset.toString() : '')
                .set('size', size ? size.toString() : ''),
            headers: getHttpHeaders(), observe: 'response'
        });
    }

    getsiteName(): Observable<HttpResponse<any>> {
        const url: string = `${resourceServerUrl}/v1/site/dropdown`;
        return this.http.get(url, {
            headers: getHttpHeaders(), observe: 'response'
        });
    }

    getDepartment(): Observable<HttpResponse<any>> {
        const url: string = `${resourceServerUrl}/v1/department/all`;
        return this.http.get(url, {
            params: new HttpParams(),
            headers: getHttpHeaders(), observe: 'response'
        });
    }
    getOrganization(): Observable<HttpResponse<any>> {
        const url: string = `${resourceServerUrl}/api/v1/organizations`;
        return this.http.get(url, {
            params: new HttpParams(),
            headers: getHttpHeaders(), observe: 'response'
        });
    }
}