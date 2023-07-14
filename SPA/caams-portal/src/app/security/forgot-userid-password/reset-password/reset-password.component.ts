import { Component, OnInit, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import { LocationStrategy } from '@angular/common';
import { NgModel } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ConfirmPasswordMessage } from '../../../common/constants/invalid-message';
declare var $: any;

import { USER_ID, REF_ID } from '../../../common/constants/constants';
import { ResetPasswordService } from './reset-password.service';
import { BackButton } from '../../../common/classes/prevent-back-button.class';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit, AfterViewInit {

    public newPassword: string;
    public confirmPassword: string;
    public showNewPassword: boolean = false;
    public showConfirmPassword: boolean = false;
    public userId: string;
    public isLoading: boolean = false;
    public InvalidMessage: any = ConfirmPasswordMessage;
    @ViewChild('newPasswordModelRef') newPasswordModelRef: NgModel;
    @ViewChild('confirmPasswordModelRef') confirmPasswordModelRef: NgModel;

    @HostListener('window:beforeunload', ['$event'])
    beforeUnloadHandler($event) {
        $event.returnValue = false;
    }

    @HostListener('window:unload', ['$event'])
    unloadHandler($event) {
        localStorage.removeItem(REF_ID);
        localStorage.removeItem(USER_ID);
    }

    constructor(private router: Router, private messageService: MessageService, private route: ActivatedRoute,
        private resetPasswordService: ResetPasswordService, private locationStrategy: LocationStrategy) {
    }

    ngOnInit() {
        if (localStorage.hasOwnProperty(REF_ID) && localStorage.hasOwnProperty(USER_ID)) {
            BackButton.prevent(this.locationStrategy);
            this.userId = localStorage.getItem(USER_ID);
        }
        else {
            this.router.navigate(['../../'], { relativeTo: this.route });
        }
    }

    ngAfterViewInit() {
        this.newPasswordModelRef.valueChanges.subscribe(value => {
            if (value && value === this.confirmPassword) {
                this.confirmPasswordModelRef.control.setErrors(null);
            }
            else {
                this.confirmPasswordModelRef.control.setErrors({ valid: false });
            }
        });
        this.confirmPasswordModelRef.valueChanges.subscribe(value => {
            if (value && value === this.newPassword) {
                this.confirmPasswordModelRef.control.setErrors(null);
            }
            else {
                this.confirmPasswordModelRef.control.setErrors({ valid: false });
            }
        });
    }

    onShowNewPasswordClick() {
        this.showNewPassword = !this.showNewPassword;
    }

    onShowConfirmPasswordClick() {
        this.showConfirmPassword = !this.showConfirmPassword;
    }

    @HostListener('document:keyup.enter', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        if (event.keyCode === 13 && !this.isLoading && this.newPasswordModelRef && this.newPasswordModelRef.valid &&
            this.confirmPasswordModelRef && this.confirmPasswordModelRef.valid) {

            this.onResetClick();
        }
    }

    onResetClick() {
        if (!this.isLoading && this.newPasswordModelRef && this.newPasswordModelRef.valid &&
            this.confirmPasswordModelRef && this.confirmPasswordModelRef.valid) {

            const refId = localStorage.getItem(REF_ID);
            this.isLoading = true;
            this.resetPasswordService.resetPassword(refId, this.userId, this.confirmPassword)
                .subscribe(response => {
                    if (response.status === 200) {
                        localStorage.removeItem(REF_ID);
                        localStorage.removeItem(USER_ID);
                        this.messageService.add({ severity: 'success', summary: response.body.userMessage, detail: '' });
                        setTimeout(() => { this.router.navigate(['login']); }, 2000);
                    }
                },
                    err => {
                        this.isLoading = false;
                        if (err.error && err.error.message) {
                            this.messageService.add({ severity: 'error', summary: err.error.message, detail: '' });
                        }
                    },
                    () => {
                        this.isLoading = false;
                    });
        }
    }

    onNewPasswordFocus() {
        $('.ui-password-panel').css('margin-left', '8.5px');
    }
}
