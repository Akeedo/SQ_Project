import { Injectable } from '@angular/core';
import {getHttpHeaders} from '@app/common/constants/constants';
import {resourceServerUrl} from '@app/common/constants/server-settings';
import {Observable} from 'rxjs';
import {HttpBackend, HttpClient, HttpParams, HttpResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ResponsiblePersonService {

  constructor(private http: HttpClient, private httpbackend: HttpBackend) {
    //Token Bypass
    // this.http = new HttpClient(httpbackend);
}

saveResponsiblePerson(requestData: any): Observable<HttpResponse<any>> {
    
    const url: string = `${resourceServerUrl}/v1/asset-owners`;

    return this.http.post(url, requestData,
        {headers: getHttpHeaders(), observe: 'response'});
}

updateResponsiblePerson(requestData: any, assetOwnerOid: any): Observable<any> {
    const url: string = `${resourceServerUrl}/v1/asset-owners/${assetOwnerOid}`;
    return this.http.put(url, requestData,
        {
            params: new HttpParams()
            .set('assetOwnerOid', assetOwnerOid),
            headers: getHttpHeaders(), observe: 'response'
        });
}

getResponsiblePersonByOid(id: any): Observable<any> {

    const url: string = `${resourceServerUrl}/v1/asset-owners/${id}`;

    return this.http.get(url,
        {headers: getHttpHeaders(), observe: 'response'});
}


getResponsiblePerson(offset: number, size: number, searchText: string): Observable<HttpResponse<any>> {
    const url: string = `${resourceServerUrl}/v1/asset-owners`;
    return this.http.get(url, {
        params: new HttpParams()
            .set('searchText', searchText)
            .set('offset', offset ? offset.toString() : '')
            .set('size', size ? size.toString() : ''),
        headers: getHttpHeaders(), observe: 'response'
    });
}

}
