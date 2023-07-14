import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { from } from 'rxjs';

import { OAuth2Service } from './oauth.service';
import { resourceServerUrl } from '../constants/server-settings';
import { getHttpHeaders } from '../constants/constants';

@Injectable()
export class SessionService {
    public redirectUrl: string;
    public logoutMessage: string;
    public hasSessionExpired: boolean = false;

    constructor(private router: Router, private oAuth2Service: OAuth2Service, private http: HttpClient) { }

    renewToken(): Observable<any> {

        return from(this.oAuth2Service.oAuth2.exchangeRefreshTokenForAccessToken());
    }

    revokeToken(): Observable<HttpResponse<any>> {
        return this.http.put(`${resourceServerUrl}/v1/user/sessions/logout`, {}, { headers: getHttpHeaders(), observe: 'response' });
    }

    logout() {
        this.revokeToken().subscribe(response => {
            if (response.status === 200) {
                this.logoutV2();
            }
        },
            err => {
                this.logoutV2();
            },
            () => {

            });
    }

    logoutV2() {
        this.oAuth2Service.oAuth2.reset();
        localStorage.clear();
        this.logoutNavigate();
    }

    logoutNavigate() {
        if (this.hasSessionExpired) {
            this.router.navigate(['/session-expired']);
        }
        else {
            this.router.navigate(['/login']).then(isNavigated => {
                if (isNavigated) {

                }
            });
        }
    }
}
