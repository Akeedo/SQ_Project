import {AfterViewInit, Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {SharedService} from '../../services/shared.service';
import {SessionService} from '../../services/session.service';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {MessageService} from 'primeng/api';
import { HeaderService } from './header.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {

    public downloadedFilePath1: SafeUrl = 'assets/images/user3.png';
    public downloadedFilePath2: SafeUrl = 'assets/images/notifications.png';
    public isLoading: boolean = false;
    public userName: string = '';
    public userId: string = '';
    public companyOid: string = '';
    public lastLoginDate: string = '';
    public lastLoginTime: string = '';
    public openFullscreen: boolean = false;
    public disableHeader: boolean = false;
    public role: string = '';
    resetRequired: string;
    public screenWidth: any;
    public screenHeight: any;
    public disableTime: boolean = false;
    public roleOid: string = '';
    public currentOffice: string = '';
    public currentSection: string = '';
    public photoPath: string = '';
    public refId: string = '';
    public awUserStatus: string = '';
    public currentOfficeName: string = '';
    public currentSectionName: string = '';
    public notificationData: any[] = [];

    constructor(private sharedService: SharedService, private sessionService: SessionService, private messageService: MessageService, private route: ActivatedRoute, private _router: Router,
                private sanitizer: DomSanitizer, private header: HeaderService) {
    }
    ngOnInit() {
        if (this.route.snapshot.data.home) {
            this.route.data
                .subscribe(data => {
                    if (data.home[0]) {
                        /* previously it was this.userName = data.home[0].body.userName; 
                        changing this.userName = data.home[0].body.userId to show name as body.userName is not passed!!!
                        */
                        this.userName = data.home[0].body.userId;
                        this.userId = data.home[0].body.userId;
                        this.roleOid = data.home[0].body.roleOid;
                        this.role = data.home[0].body.roles[0];
                        this.currentOfficeName = data.home[0].body.currentOfficeName;
                        this.currentSectionName = data.home[0].body.currentSectionName;
                        this.photoPath = data.home[0].body.photoPath;
                        this.formatLastLoginDateTime(data.home[0].body.lastLoginTime);
                        this.resetRequired = data.home[0].body.resetRequired;
                        if (this.resetRequired === 'Yes') {
                            this._router.navigate(['/change-password']);
                        }
                        this.sharedService.setcurrentLoggedInUserID(this.userId);
                        this.sharedService.setName(this.userName);
                        this.sharedService.setCurrentUserCompanyOid(this.companyOid);
                        this.sharedService.setRmsRole(this.roleOid);
                        this.sharedService.setCurrentOfficeName(this.currentOfficeName);
                        this.sharedService.setCurrentSectionName(this.currentSectionName);
                        this.sharedService.setPhotoPath(this.photoPath);
                    }
                });
        }

        this.sharedService.disableSource.asObservable()
            .subscribe(data => {
                if (data !== undefined) {
                    this.disableHeader = data;
                }
            });
    }

    ngAfterViewInit() {
        this.onResize();
        if (this.screenWidth <= 1366) {
            this.disableTime = true;
        } else {
            this.disableTime = false;
        }
    }

    @HostListener('window:resize', ['$event'])
    onResize() {
        this.screenWidth = window.innerWidth;
        this.screenHeight = window.innerHeight;
    }

    formatLastLoginDateTime(transactionDateTime) {
        const dateTime = transactionDateTime.split(' ');
        this.lastLoginDate = dateTime[0] + ' ' + dateTime[1] + ' ' + dateTime[2] + ' ' + dateTime[3];
        this.lastLoginTime = dateTime[4] + ' ' + dateTime[5];
    }

    onLogoutClick() {
        this.isLoading = true;
        this.sessionService.logout();
    }

    ngOnDestroy(): void {
    }
}
