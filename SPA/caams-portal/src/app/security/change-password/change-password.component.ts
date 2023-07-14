import {Component, HostListener, OnInit} from '@angular/core';
import {MenuItem, MessageService} from 'primeng/api';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ChangePasswordModel} from './change-password.model';
import {ChangePasswordService} from './change-password.service';
import {ConfirmPasswordMessage, ConfirmPasswordMessage2, PasswordInvalidMessage} from '@app/common/constants/invalid-message';
import {PASS_REGEX} from '@app/common/constants/input-validation-rules';
import {SessionService} from '@app/common/services/session.service';
import { Directive } from '@angular/core';

declare var $: any;

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.css'],
})

export class ChangePasswordComponent implements OnInit {

    public isLoading: boolean = false;
    public chgPassForm: FormGroup;
    public chngPassModel: ChangePasswordModel;
    public showOldPassword: boolean = false;
    public showNewPassword: boolean = false;
    public showConfirmPassword: boolean = false;
    public InvalidMessage: any = ConfirmPasswordMessage;
    public InvalidMessage2: any = ConfirmPasswordMessage2;
    public stepActiveIndex: number;
    public stepItems: MenuItem[];

    public InvalidPasswordMessage: any = PasswordInvalidMessage;

    constructor(private changePasswordService: ChangePasswordService, private fb: FormBuilder, private sessionService: SessionService,
                private messageService: MessageService, private router: Router) {
    }

    ngOnInit() {
        this.stepItems = [
            {label: ''},
            {label: ''},
            {label: ''}
        ];
        this.stepActiveIndex = 0;
        this.chgPassForm = this.fb.group({
            oldPassword: ['', Validators.required],
            newPassword: [
                '',
                Validators.compose([
                    Validators.required,
                    Validators.pattern(PASS_REGEX),
                ]),
            ],
            confirmPassword: ['', Validators.required],
        }, {
            validator: this.checkMatch('newPassword', 'confirmPassword')
        });
    }

    checkMatch(controlName: string, matchingControlName: string) {
        return (formGroup: FormGroup) => {
            const control = formGroup.controls[controlName];
            const matchingControl = formGroup.controls[matchingControlName];

            if (matchingControl.errors && !matchingControl.errors.mustMatch) {
                return;
            }
            if (control.value !== matchingControl.value) {
                matchingControl.setErrors({mustMatch: true});
            } else {
                matchingControl.setErrors(null);
            }
        }
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.chgPassForm.get('oldPassword').statusChanges.subscribe(status => {
                if (status === 'INVALID') {
                    $(`.ui-steps-item span:contains("1")`).addClass('ui-steps-error');
                } else {
                    $(`.ui-steps-item span:contains("1")`).removeClass('ui-steps-error');
                    if (this.stepActiveIndex === 0) {
                        this.stepActiveIndex = 1;
                    }
                }
            });

            this.chgPassForm.get('newPassword').statusChanges.subscribe(status => {
                if (status === 'INVALID') {
                    $(`.ui-steps-item span:contains("2")`).addClass('ui-steps-error');
                } else {
                    $(`.ui-steps-item span:contains("2")`).removeClass('ui-steps-error');
                    if (this.stepActiveIndex === 1) {
                        this.stepActiveIndex = 2;
                    }
                }
            });

            this.chgPassForm.get('confirmPassword').statusChanges.subscribe(status => {
                if (status === 'INVALID') {
                    $(`.ui-steps-item span:contains("3")`).addClass('ui-steps-error');
                } else {
                    $(`.ui-steps-item span:contains("3")`).removeClass('ui-steps-error');
                    if (this.stepActiveIndex === 2) {
                        this.stepActiveIndex = 3;
                    }
                }
            });
        });
    }

    @HostListener('document:keyup.enter', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        if (event.keyCode === 13 && !this.isLoading && this.chgPassForm.valid) {

            this.onChangeSubmit();
        }
    }

    onChangeSubmit() {
        if (this.chgPassForm.valid) {
            this.chngPassModel = {
                oldPassword: this.chgPassForm.get('oldPassword').value,
                newPassword: this.chgPassForm.get('newPassword').value
            };
            this.isLoading = true;
            this.changePasswordService.changePassword(this.chngPassModel)
                .subscribe(response => {
                        if (response.status === 200) {
                            this.messageService.add({severity: 'success', summary: response.body.userMessage, detail: ''});
                            setTimeout(() => {
                                this.sessionService.logout();
                            }, 2000);
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

    onShowOldPasswordClick() {
        this.showOldPassword = !this.showOldPassword;
    }

    onShowNewPasswordClick() {
        this.showNewPassword = !this.showNewPassword;
    }

    onShowConfirmPasswordClick() {
        this.showConfirmPassword = !this.showConfirmPassword;
    }

    onNewPasswordFocus() {
        // $('.ui-password-panel').css("margin-left", "4.25px");
    }
}
