import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {resourceServerUrl} from '@app/common/constants/server-settings';
import {getHttpHeaders} from '@app/common/constants/constants';


@Injectable({
    providedIn: 'root'
})
export class MyProfileService {

    constructor(private http: HttpClient) {
    }

    getMyProfile(oid: any): Observable<any> {
        const url: string = `${resourceServerUrl}/public/v1/userprofile/${oid}`;
        return this.http.get(url, {
            headers: getHttpHeaders(),
            observe: 'response'
        });
    }


}