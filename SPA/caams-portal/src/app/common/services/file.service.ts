import { HttpBackend, HttpClient, HttpEvent, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@src/environments/environment';
import { Observable } from 'rxjs';
import { getHttpHeaders, getHttpHeadersForFile } from '../constants/constants';
import { resourceServerUrl } from '../constants/server-settings';

@Injectable({
    providedIn: 'root'
})
export class FileService {

    public withCredentials = false;

    constructor(private http: HttpClient, private handler: HttpBackend) {
        // this.http = new HttpClient(handler);
    }

    upload(files: Array<File>,  formData: FormData, fileDir: string): Observable<any> {
        const url = `${resourceServerUrl}/v1/file/upload`;
        if (!files) {
            return;
        }

        if (environment.production) {
            this.withCredentials = true;
        }
        
        const req = new HttpRequest('POST', url, formData, {
            headers: getHttpHeadersForFile(),
            params: new HttpParams()
                .set('fileDir', fileDir),
            reportProgress: true,
            withCredentials: this.withCredentials
        });
        return this.http.request(req);
    }

    download(fileName: string, fileDir: string): Observable<any> {
        if (!fileName || fileName === '') {
            return;
        }

        const url = `${resourceServerUrl}/v1/file/download/${fileName}`;
        return this.http.get(url, {
            params: new HttpParams()
                .set('fileDir', fileDir),

            headers: getHttpHeaders(),
            observe: 'response',
            responseType: 'blob',
        });
    }


}

