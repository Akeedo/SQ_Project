import { Injectable, Injector } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse,
    HttpResponse
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';

import { SessionService } from './session.service';
import { LOCALSTORAGE_STATE } from '../custom-lib/oauth2-auth-code-PKCE';
import { tap, catchError, switchMap } from 'rxjs/operators';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
    constructor(private injector: Injector) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const sessionService = this.injector.get(SessionService);

        // console.log(request); //--------------------------------
        let accessToken = null;
        let authInfo = JSON.parse(localStorage.getItem(LOCALSTORAGE_STATE));
        if (localStorage.hasOwnProperty(LOCALSTORAGE_STATE) && authInfo.accessToken) {
            accessToken = authInfo.accessToken.value;
        }
        if (this.isInvalidToken(accessToken)) {
            this.logoutV2(sessionService, 'You are not logged in');
            return throwError({ error: 'Access token not found' });
        }
        return next.handle(this.customRequest(request, accessToken)).pipe(tap(
            (event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    return event;
                }
            }),catchError((error: any) => {
                if (error instanceof HttpErrorResponse) {
                    if (error.status === 401) {
                        const refreshToken = authInfo.refreshToken.value;
                        if (this.isInvalidToken(refreshToken)) {
                            this.logoutV2(sessionService, 'You are not logged in');
                            return throwError({ error: 'Refresh token not found' });
                        }
                        return sessionService.renewToken().pipe(
                            switchMap((_ => {
                                authInfo = JSON.parse(localStorage.getItem(LOCALSTORAGE_STATE));
                                const accessToken = authInfo.accessToken.value;
                                if (this.isInvalidToken(accessToken)) {
                                    this.logoutV2(sessionService, 'You are not logged in');
                                    return throwError({ error: 'Access token not found' });
                                }
                                return next.handle(this.customRequest(request, accessToken)).pipe(tap((evn: HttpEvent<any>) => {
                                    if (evn instanceof HttpResponse) {
                                        return evn;
                                    }
                                }),catchError((er: any) => {
                                    er.loggedIn = true;
                                    return throwError(er);
                                }));
                            })),catchError((err: any) => {
                                if (err.loggedIn !== true) {
                                    this.logoutV2(sessionService, 'Your session has expired. Please login again', true);
                                }
                                return throwError(err);
                            })
                        )
                    }
                }
                return throwError(error);
            }));
        
    }

    isInvalidToken(token: string) {
        return (typeof token === 'undefined' || token === null || token.toString().length === 0);
    }

    customRequest(request: HttpRequest<any>, accessToken: string) {
        const req = request.clone({
            setHeaders: {
                Authorization: 'Bearer {0}'.replace('{0}', accessToken)
            }
        });
        return req;
    }

    logoutV2(sessionService: SessionService, logoutMessage: string, hasSessionExpired: boolean = false) {
        const router = this.injector.get(Router);
        sessionService.redirectUrl = router.url;
        sessionService.logoutMessage = logoutMessage;
        sessionService.hasSessionExpired = hasSessionExpired;
        sessionService.logoutV2();
    }
}

