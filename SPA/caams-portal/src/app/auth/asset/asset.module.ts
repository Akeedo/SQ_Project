import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssetRoutingModule } from './asset-routing.module';
import { ListAssetComponent } from './components/list-asset/list-asset.component';
import { CreateAssetComponent } from './components/create-asset/create-asset.component';
import { ViewAssetComponent } from './components/view-asset/view-asset.component';
import { LoadingImageModule } from "@app/common/components/loading-image/loading-image.module";
import { PrimengModule } from "@app/common/modules/primeng-modules";
import { FileUploadModule } from "primeng/fileupload";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AutoCompleteModule } from "primeng/autocomplete";
import { CalendarModule } from "primeng/calendar";
import { InputSwitchModule } from "primeng/inputswitch";
import { TabViewModule } from 'primeng/tabview';
import { IssueLogModule } from '../issue-log/issue-log.module';
import { IssueLogRoutingModule } from '../issue-log/issue-log-routing.module';


@NgModule({
  declarations: [
    ListAssetComponent,
    CreateAssetComponent,
    ViewAssetComponent,
    
  ],
  imports: [
    CommonModule,
    AssetRoutingModule,
    LoadingImageModule,
    PrimengModule,
    FileUploadModule,
    ReactiveFormsModule,
    FormsModule,
    AutoCompleteModule,
    CalendarModule,
    InputSwitchModule,
    TabViewModule,
    IssueLogModule
  ]
})
export class AssetModule { }