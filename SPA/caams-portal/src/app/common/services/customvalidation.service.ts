import {Injectable} from '@angular/core';
import {ValidatorFn, AbstractControl} from '@angular/forms';
import {FormGroup} from '@angular/forms';
import {UserprofileService} from '@app/auth/userprofile/services/userprofile.service';

@Injectable({
    providedIn: 'root'
})
export class CustomvalidationService {

    userProfileGroup: FormGroup;
    private emailCheck: any;

    constructor(private userprofileService: UserprofileService) {
    }

    patternValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            if (!control.value) {
                return null;
            }
            const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');
            const valid = regex.test(control.value);
            return valid ? null : {invalidPassword: true};
        };
    }

    MatchPassword(password: string, confirmPassword: string) {
        return (formGroup: FormGroup) => {
            const passwordControl = formGroup.controls[password];
            const confirmPasswordControl = formGroup.controls[confirmPassword];

            if (!passwordControl || !confirmPasswordControl) {
                return null;
            }

            if (confirmPasswordControl.errors && !confirmPasswordControl.errors.passwordMismatch) {
                return null;
            }

            if (passwordControl.value !== confirmPasswordControl.value) {
                confirmPasswordControl.setErrors({ passwordMismatch: true });
            } else {
                confirmPasswordControl.setErrors(null);
            }
        }
    }

    // EmailValidator(userControl: AbstractControl){
    //     return new Promise(resolve => {
    //         setTimeout(() => {
    //             if (this.validateEmail(userControl.value) === 'Yes'){
    //                 resolve({ EmailNotAvailable: true });
    //             } else {
    //                 resolve(null);
    //             }
    //         }, 1000);
    //     });
    // }
    //
    // validateEmail(email: string): any{
    //     this.userprofileService.getEmailListWithoutAuth(this.userProfileGroup.value.email).subscribe(res => {
    //         this.emailCheck = res.body.data;
    //         return this.emailCheck;
    //     });
    //
    // }
    // userNameValidator(userControl: AbstractControl) {
    //     return new Promise(resolve => {
    //         setTimeout(() => {
    //             if (this.validateUserName(userControl.value)) {
    //                 resolve({userNameNotAvailable: true});
    //             } else {
    //                 resolve(null);
    //             }
    //         }, 1000);
    //     });
    // }
    //
    // validateUserName(userName: string) {
    //     const UserList = ['ankit', 'admin', 'user', 'superuser'];
    //     return (UserList.indexOf(userName) > -1);
    // }
}
