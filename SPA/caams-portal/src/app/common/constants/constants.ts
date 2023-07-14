import { HttpHeaders } from '@angular/common/http';
import { environment } from '@src/environments/environment';
import { v4 as uuid } from 'uuid';

export const CONTENT_TYPE = 'application/json';
export const REQUEST_TIMEOUT_IN_SECONDS = '30';

export function getHttpHeaders(): HttpHeaders {
    return new HttpHeaders()
        .set('content-type', CONTENT_TYPE)
        .set('request-id', uuid())
        .set('request-time', new Date().toISOString())
        .set('request-timeout-in-seconds', REQUEST_TIMEOUT_IN_SECONDS);
}

export function getHttpHeadersForFile(): HttpHeaders {
    if (environment.production) {
        return new HttpHeaders({'ngsw-bypass': 'true'})
            .set('request-id', uuid())
            .set('request-time', new Date().toISOString())
            .set('request-timeout-in-seconds', REQUEST_TIMEOUT_IN_SECONDS);
    } else {
        return new HttpHeaders()
            .set('request-id', uuid())
            .set('request-time', new Date().toISOString())
            .set('request-timeout-in-seconds', REQUEST_TIMEOUT_IN_SECONDS);
    }
  }
  
export function getImageHttpHeaders(): HttpHeaders {
    return new HttpHeaders()
        .set('content-type', CONTENT_TYPE)
        .set('request-id', uuid())
        .set('request-time', new Date().toISOString())
        .set('Trace-Id', uuid())
        .set('request-timeout-in-seconds', REQUEST_TIMEOUT_IN_SECONDS);
}

export function getHttpHeadersP(): HttpHeaders {
    return new HttpHeaders()
        .set('content-type', CONTENT_TYPE)
        .set('Authorization', 'Bearer 73bf863d-b5b6-41c7-a9ca-a186d96477d3')
        .set('Request-Id','12345jkuu7iu7u')
        .set('Request-Time', new Date().toISOString())
        .set('Request-Timeout-In-Seconds', REQUEST_TIMEOUT_IN_SECONDS);
}

// ---------------------------------------------------------------------
export const REGISTRATION_REF_ID = 'registrationRefId';
export const OTP_EXPIRES_AT = 'otpExpiresAt';
export const USER_ID = 'userId';
export const PASSWORD = 'password';
export const SAVE_ID = 'saveId';
export const REF_ID = 'refId';


