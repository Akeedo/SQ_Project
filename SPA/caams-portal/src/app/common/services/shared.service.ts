import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SharedService {

    constructor(private http: HttpClient) { }

    public disableSource = new BehaviorSubject<any>(undefined);
    public notify: BehaviorSubject<string> = new BehaviorSubject<string>('');
    private userName = '';
    private currentLoggedInUserID = '';
    private currentUserCompanyOid = '';
    private rmsRole = '';
    private photoPath = '';
    private currentOfficeName = '';
    private currentSectionName = '';

    setNotify(value: string) {
        this.notify.next(value);
    }

    getNotify() {
        this.notify;
    }

    disableHeaderSidebar(disable: boolean) {
        this.disableSource.next(disable);
    }

    getcurrentLoggedInUserID(){
        return this.currentLoggedInUserID;
    }

    setcurrentLoggedInUserID(id: string){
        this.currentLoggedInUserID = id;
    }

    setCurrentUserCompanyOid(oid: string){
        this.currentUserCompanyOid = oid;
    }

    getCurrentUserCompanyOid(){
        return this.currentUserCompanyOid;
    }

    setCurrentOfficeName(oid: string){
        this.currentOfficeName = oid;
    }

    getCurrentOfficeName(){
        return this.currentOfficeName;
    }

    setCurrentSectionName(oid: string){
        this.currentSectionName = oid;
    }

    getCurrentSectionName(){
        return this.currentSectionName;
    }

    getRmsRole(){
        return this.rmsRole;
    }

    setRmsRole(rmsRole: string){
        this.rmsRole = rmsRole;
    }

    getName(){
        return this.userName;
    }

    setName(userName: string){
        this.userName = userName;
    }

    getPhotoPath(){
        return this.photoPath;
    }

    setPhotoPath(photoPath: string){
        this.photoPath = photoPath;
    }

    checkIfLockedAlreadyByOthers(item){
        return item.lockedBy != null && item.lockedBy !== this.getcurrentLoggedInUserID();
    }

    getLockIcon(item){
        if(item.lockedBy != null){
            return 'fa fa-lock fa-lg'
        }else{
            return 'fa fa-unlock fa-lg'
        }
    }

    getLockColor(item){
        if(this.checkIfLockedAlreadyByOthers(item)){
            return 'color: #9c9fa6'
        }else {
            return 'color: black'
        }
    }

    getApprovalRemarksIconColor(item){
        if(item.approverRemarks != null){
            return 'color: black'
        }
        else {
            return 'color: #9c9fa6'
        }
    }

    getLockIconTooltipText(item){
        if(!this.checkIfLockedAlreadyByOthers(item)){
            if(item.lockedBy != null){
                return 'Click to Unlock';
            } else{
                return 'Click to Lock';
            }
        }
    }

    getRemarksIconTooltipText(item){
        if(item.approverRemarks != null){
            return 'Click to See the  Approver Remarks'
        }
    }

    getCheckboxIconTooltipText(item){
        if(!this.checkIfLockedAlreadyByOthers(item)){
            return 'Click to Check'
        }
    }

    getDeleteIconToolTipText(){
        return 'Delete';
    }

}