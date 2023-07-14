import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { Observable } from 'rxjs';

import { resourceServerUrl } from '../../../common/constants/server-settings';
import { getHttpHeaders } from '../../../common/constants/constants';

@Injectable({
    providedIn: 'root'
})
export class OtpService {

    private otpVerificationURI: string = `${resourceServerUrl}/v1/user/password/recovery/verification`;

    constructor(private http: HttpClient, private httpBackend: HttpBackend) {
        this.http = new HttpClient(httpBackend);
    }

    verifyOTP(otp: string, refId: string): Observable<any> {

        return this.http.post(this.otpVerificationURI,
            { otp, refId },
            { headers: getHttpHeaders(), observe: 'response' });
    }
    forgotPasswordResendOTP(requestData: any): Observable<any> {

        const forgotPasswordResendOTP_URI: string = `${resourceServerUrl}/v1/user/password/recovery/resend-otp/request/SMS`;

        return this.http.post(forgotPasswordResendOTP_URI, requestData,
            { headers: getHttpHeaders(), observe: 'response' });
    }
}
