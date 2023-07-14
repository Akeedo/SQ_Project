import {HttpBackend, HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {getHttpHeaders} from '@app/common/constants/constants';
import {resourceServerUrl} from '@app/common/constants/server-settings';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class OfficeService {

    constructor(private http: HttpClient, private httpbackend: HttpBackend) {
        //Token Bypass
        // this.http = new HttpClient(httpbackend);
    }

    saveSite(requestData: any): Observable<HttpResponse<any>> {
        
        const url: string = `${resourceServerUrl}/v1/site`;

        return this.http.post(url, requestData,
            {headers: getHttpHeaders(), observe: 'response'});
    }


    getSiteByOid(siteOid: any): Observable<any> {

        const url: string = `${resourceServerUrl}/v1/site/${siteOid}`;

        return this.http.get(url,
            {headers: getHttpHeaders(), observe: 'response'});
    }

    updateSite(requestData: any, siteOid: any): Observable<any> {
        const url: string = `${resourceServerUrl}/v1/site/${siteOid}`;
        return this.http.put(url, requestData,
            {
                params: new HttpParams()
                .set('siteOid', siteOid),
                headers: getHttpHeaders(), observe: 'response'
            });
    }

    getOffices(offset: number, size: number, searchText: string): Observable<HttpResponse<any>> {
        const url: string = `${resourceServerUrl}/v1/site`;
        return this.http.get(url, {
            params: new HttpParams()
                .set('searchText', searchText)
                .set('offset', offset ? offset.toString() : '')
                .set('size', size ? size.toString() : ''),
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
}
