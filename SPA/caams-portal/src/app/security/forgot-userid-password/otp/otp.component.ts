import { Component, OnInit, ViewChild } from '@angular/core';
import { LocationStrategy, Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { HostListener } from '@angular/core';
import { NgModel } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';

import { USER_ID, OTP_EXPIRES_AT, REF_ID } from '../../../common/constants/constants';
import { OtpService } from './otp.service';
import { BackButton } from '../../../common/classes/prevent-back-button.class';
import { TranslateService } from '@ngx-translate/core';
import { CircleProgressComponent } from '../../../common/custom-lib/circle-progress.module';

@Component({
    selector: 'app-otp',
    templateUrl: './otp.component.html',
    styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {

    public otpInput: string;
    public timeLeft: number;
    public isOTPVerificationSuccess: boolean = false;
    public isLoading: boolean = false;
    public otpExpiresAt: number;
    public onlyNumber: RegExp = /^[0-9]*$/;

    public secondToCircleProgres: number;
    private userId: string;
    private refId: any;
    private interval: any;

    @ViewChild('otpModelRef') otpModelRef: NgModel;
    @ViewChild('circleProgres') circleProgres: CircleProgressComponent;

    @HostListener('window:beforeunload', ['$event'])
    beforeUnloadHandler($event) {
        $event.returnValue = false;
    }

    @HostListener('window:unload', ['$event'])
    unloadHandler($event) {
        localStorage.removeItem(OTP_EXPIRES_AT);
    }

    constructor(private router: Router, private otpService: OtpService, private route: ActivatedRoute, private location: Location, private confirmationService: ConfirmationService,
        private messageService: MessageService, private locationStrategy: LocationStrategy, private translate: TranslateService) {
    }

    ngOnInit() {
        if (localStorage.hasOwnProperty(USER_ID) && localStorage.hasOwnProperty(OTP_EXPIRES_AT)
            && localStorage.hasOwnProperty(REF_ID)) {

            BackButton.prevent(this.locationStrategy);
            this.userId = localStorage.getItem(USER_ID);
            this.refId = localStorage.getItem(REF_ID);
            const otpExpiresAt = localStorage.getItem(OTP_EXPIRES_AT);
            this.startTimer(otpExpiresAt);
        }
        else {
            this.router.navigate(['../../'], { relativeTo: this.route });
        }
    }

    startTimer(otpExpiresAt) {
        clearInterval(this.interval);
        const expireDate = new Date(otpExpiresAt);
        const timeInMilliseconds = ((expireDate.getTime() + (expireDate.getTimezoneOffset() * 60000)) as any) - (new Date().getTime() as any);
        this.timeLeft = Math.round(timeInMilliseconds / 1000);
        this.secondToCircleProgres = this.timeLeft + 1;
        this.interval = setInterval(() => {
            if (this.timeLeft > 0) {
                this.timeLeft--;
            } else {
                clearInterval(this.interval);
            }
        }, 1000);
    }

    formatTitle = (percent: number) => {
        return this.timeLeft;
    }

    @HostListener('document:keyup.enter', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        if (event.keyCode === 13 && !this.isLoading && this.otpModelRef.valid) {
            this.onVerifyClick();
        }
    }

    onVerifyClick() {
        if (!this.isLoading && this.otpModelRef.valid) {

            this.isLoading = true;
            this.otpService.verifyOTP(this.otpInput, this.refId)
                .subscribe(response => {
                    if (response.status === 200) {
                        localStorage.removeItem(OTP_EXPIRES_AT);
                        this.router.navigate([`../../reset-password`], { relativeTo: this.route });
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

    onResendOTPClick() {
        if (!this.isLoading && this.timeLeft === 0) {

            const requestData = {
                userId: this.userId,
                refId: this.refId
            };
            this.isLoading = true;
            this.otpService.forgotPasswordResendOTP(requestData)
                .subscribe(response => {
                    if (response.status === 200) {
                        this.circleProgres.animate(0, 100);
                        this.startTimer(response.body.otpExpiresAt);
                        this.messageService.add({ severity: 'success', summary: response.body.userMessage, detail: '' });
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

    onCancelClick() {
        this.confirm();
    }

    confirm() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to cancel?',
            accept: () => {
                this.router.navigate(['/forgot-userid-password']);
            }
        });
    }
}
