//import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IssueLogRoutingModule } from './issue-log-routing.module';
import { CreateIssueLogComponent } from './components/create-issue-log/create-issue-log.component';
import { ListIssueLogComponent } from './components/list-issue-log/list-issue-log.component';
import { UpdateIssueLogComponent } from './components/update-issue-log/update-issue-log.component';
import { ViewIssueLogComponent } from './components/view-issue-log/view-issue-log.component';

import { PrimengModule } from "@app/common/modules/primeng-modules";
import { FileUploadModule } from "primeng/fileupload";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AutoCompleteModule } from "primeng/autocomplete";
import { CalendarModule } from "primeng/calendar";
import { InputSwitchModule } from "primeng/inputswitch";
import { TabViewModule } from 'primeng/tabview';
import { MultiSelectModule } from 'primeng/multiselect';

import { NgModule } from '@angular/core';
import { LoadingImageModule } from "@app/common/components/loading-image/loading-image.module";
import { ListIssueLogByStatusComponent } from './components/list-issue-log-by-status/list-issue-log-by-status.component';



@NgModule({
    declarations: [
        CreateIssueLogComponent,
        ListIssueLogComponent,
        UpdateIssueLogComponent,
        ViewIssueLogComponent,
        ListIssueLogByStatusComponent
    ],
    imports: [
        CommonModule,
        IssueLogRoutingModule,
        //        LoadingImageModule,
        PrimengModule,
        FileUploadModule,
        ReactiveFormsModule,
        FormsModule,
        AutoCompleteModule,
        CalendarModule,
        InputSwitchModule,
        LoadingImageModule
    ]
})
export class IssueLogModule { }
