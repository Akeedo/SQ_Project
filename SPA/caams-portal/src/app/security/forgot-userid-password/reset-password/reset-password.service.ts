import { Injectable } from '@angular/core';
import { resourceServerUrl } from '../../../common/constants/server-settings';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { Observable } from 'rxjs';

import { getHttpHeaders } from '../../../common/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

    private resetPasswordURI: string = `${resourceServerUrl}/v1/user/reset-password`;

    constructor(private http: HttpClient, private httpBackend: HttpBackend) {
        this.http = new HttpClient(httpBackend);
    }

    resetPassword(refId: string, userId: string, password: string): Observable<any> {

        return this.http.put(this.resetPasswordURI,
            { refId, userId, password },
            { headers: getHttpHeaders(), observe: 'response' });
    }
}
