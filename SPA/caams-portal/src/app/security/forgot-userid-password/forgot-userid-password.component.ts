import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {MessageService} from 'primeng/api';
import {NgModel} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

import {ForgotUseridPasswordService} from './forgot-userid-password.service';
import {OTP_EXPIRES_AT, USER_ID} from '../../common/constants/constants';
import {TranslateService} from '@ngx-translate/core';
import {OAuth2Service} from '../../common/services/oauth.service';

@Component({
    selector: 'app-forgot-userid-password',
    templateUrl: './forgot-userid-password.component.html',
    styleUrls: ['./forgot-userid-password.component.css']
})
export class ForgotUseridPasswordComponent implements OnInit {

    public isLoading: boolean = false;
    public userId: string;
    public nid: string;
    public recoveryType: string = 'userId';
    foregetModal: boolean = false;

    @ViewChild('userIdModelRef') userIdModelRef: NgModel;

    constructor(private forgotUseridPasswordService: ForgotUseridPasswordService, private router: Router,
                private route: ActivatedRoute, private messageService: MessageService,
                private oAuth2Service: OAuth2Service, private translate: TranslateService) {
    }

    ngOnInit() {
        if (!this.oAuth2Service.oAuth2.isAccessTokenExpired()) {
            this.isLoading = true;
            this.router.navigate(['/']);
        }
        localStorage.removeItem(USER_ID);
        localStorage.removeItem(OTP_EXPIRES_AT);
    }

    @HostListener('document:keyup.enter', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        if (event.keyCode === 13 && !this.isLoading && this.userIdModelRef && this.userIdModelRef.valid) {
            this.onSubmitClick();
        }
    }

    onSubmitClick() {
        if (!this.isLoading && this.userIdModelRef && this.userIdModelRef.valid) {
            this.isLoading = true;
            this.forgotUseridPasswordService.passwordRecovery(this.userId, this.nid, this.recoveryType)
                .subscribe(response => {
                        if (response.status === 200) {
                            this.foregetModal = true;
                            // this.messageService.add({severity: 'success', summary: 'Please check your mobile & email address. If you do not get any message then contact with IT Department', detail: ''});
                            //     setTimeout(() => {
                            //         this.router.navigate(['/login'])
                            //     }, 3000);
                        }
                    },
                    err => {
                        this.isLoading = false;
                        if (err.error && err.error.message) {
                            this.messageService.add({severity: 'error', summary: err.error.message, detail: ''});
                        }
                    },
                    () => {
                        this.isLoading = false;
                    });
        }
    }

    backButton() {
        this.router.navigate(['/']);
    }
}
