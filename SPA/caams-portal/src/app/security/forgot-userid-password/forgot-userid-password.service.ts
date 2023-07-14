import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { Observable } from 'rxjs';

import { resourceServerUrl } from '../../common/constants/server-settings';
import { getHttpHeaders } from '../../common/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class ForgotUseridPasswordService {

    private passwordRecoveryURI: string = `${resourceServerUrl}/public/v1/forget-password`;

    constructor(private http: HttpClient, private httpBackend: HttpBackend) {
        this.http = new HttpClient(httpBackend);
    }

    passwordRecovery(userId: any, nid: any, recoveryType: any): Observable<any> {
        return this.http.post(this.passwordRecoveryURI,
            { "userId": userId,
              "nid": nid,
              "recoveryType": recoveryType
            },
            { headers: getHttpHeaders(), observe: 'response' });
    }
}
