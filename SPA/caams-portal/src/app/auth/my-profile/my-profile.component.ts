import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {MessageService} from 'primeng/api';

import {MyProfileService} from './my-profile.service';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {ProfileInfo} from '@app/auth/my-profile/profileInfo';
import {SharedService} from '@app/common/services/shared.service';

@Component({
    selector: 'app-my-profile',
    templateUrl: './my-profile.component.html',
    styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

    public isLoading: boolean = false;
    public downloadedFilePath1: SafeUrl = 'assets/images/user3.png';
    public profileInfo: ProfileInfo;
    public userId: string;

    constructor(public translate: TranslateService, private myProfileService: MyProfileService,
                private sanitizer: DomSanitizer, private messageService: MessageService,
                private sharedService: SharedService) {
    }

    ngOnInit(): void {
        this.isLoading = true;
        this.userId = this.sharedService.getcurrentLoggedInUserID()
        this.myProfileService.getMyProfile(this.userId)
            .subscribe(response => {
                    if (response) {
                        this.profileInfo = response.body;
                        this.getUserFile1(this.profileInfo.photoPath);
                    }
                },
                // err => {
                //     this.isLoading = false;
                //     if (err.error && err.error.message) {
                //         this.messageService.add({severity: 'error', summary: err.error.message, detail: ''});
                //     }
                // },
                () => {
                    this.isLoading = false;
                });
    }

    getUserFile1(refId: string) {
        this.isLoading = true;
        this.downloadedFilePath1 ='assets/images/user3.png';
        // this.applicationService.getDownloadFile(refId).subscribe(file => {
        //         // this.downloadedFilePath = '';
        //         const unsafeImageUrl = URL.createObjectURL(file);
        //         const downloadedFilePath12 = this.sanitizer.bypassSecurityTrustUrl(unsafeImageUrl);
        //         this.downloadedFilePath1 = downloadedFilePath12 ? downloadedFilePath12 : 'assets/images/user3.png'
        //     },
        //     err => {
        //         this.isLoading = false;
        //         if (err.error && err.error.message) {
        //             this.messageService.add({severity: 'error', summary: err.error.message, detail: ''});
        //         }
        //     });
    }
}
