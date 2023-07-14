import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OAuth2Service } from '@app/common/services/oauth.service';


@Component({
    selector: 'app-session-expired',
    templateUrl: './session-expired.component.html',
    styleUrls: ['./session-expired.component.css']
})
export class SessionExpiredComponent implements OnInit {

    public isLoading: boolean = false;

    constructor(private router: Router, private oAuth2Service: OAuth2Service) { }

    ngOnInit(): void {
        if (this.oAuth2Service.oAuth2.isAccessTokenExpired()) {
            this.isLoading = true;
            this.router.navigate(['/login']);
        }
    }

}
