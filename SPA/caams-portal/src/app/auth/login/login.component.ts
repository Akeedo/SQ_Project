import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {OAuth2Service} from './../../common/services/oauth.service';
import {OAuth2AuthCodePKCE} from './../../common/custom-lib/oauth2-auth-code-PKCE';


@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

    public isLoading: boolean = false;
    public oAuth2Obj: OAuth2AuthCodePKCE;

    constructor(private router: Router, private oAuth2Service: OAuth2Service) {
    }

    ngOnInit() {
        this.oAuth2Obj = this.oAuth2Service.oAuth2;
        this.oAuth2Obj.isReturningFromAuthServer().then(hasAuthCode => {
            if (!hasAuthCode) {
                this.oAuth2Obj.fetchAuthorizationCode();
            }

            return this.oAuth2Obj.getAccessToken().then((data) => {
                this.isLoading = true;
                this.router.navigate(['/']);
            });

        }).catch((potentialError) => {

            if (potentialError) {
                // console.error(potentialError);
            }

        });
    }
}
