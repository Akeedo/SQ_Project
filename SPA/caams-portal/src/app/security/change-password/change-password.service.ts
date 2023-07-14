import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

import {ChangePasswordModel} from './change-password.model';
import {resourceServerUrl} from '@app/common/constants/server-settings';
import {getHttpHeaders} from '@app/common/constants/constants';

@Injectable({
    providedIn: 'root'
})
export class ChangePasswordService {

    constructor(private http: HttpClient) {
    }

    changePassword(chngPassData: ChangePasswordModel): Observable<HttpResponse<any>> {

        const url: string = `${resourceServerUrl}/v1/user/password`;

        return this.http.put(url, chngPassData,
            {headers: getHttpHeaders(), observe: 'response'});
    }
}
