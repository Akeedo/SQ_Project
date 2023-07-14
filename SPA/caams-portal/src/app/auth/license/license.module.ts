import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LicenseRoutingModule } from './license-routing.module';
import { LicenseListComponent } from './components/license-list/license-list.component';
import { CreateLicenseComponent } from './components/create-license/create-license.component';
import { LoadingImageModule } from '@app/common/components/loading-image/loading-image.module';
import { PrimengModule } from '@app/common/modules/primeng-modules';
import { FileUploadModule } from 'primeng/fileupload';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { InputSwitchModule } from 'primeng/inputswitch';
import { UpdateLicenseComponent } from './components/update-license/update-license.component';
import { AppPipesModule } from '@app/common/pipes/app-pipes.module';


@NgModule({
  declarations: [
    LicenseListComponent,
    CreateLicenseComponent,
    UpdateLicenseComponent
    
  ],
  imports: [
    CommonModule,
    LicenseRoutingModule,
    CommonModule,
    LoadingImageModule,
    PrimengModule,
    FileUploadModule,
    ReactiveFormsModule,
    FormsModule,
    AutoCompleteModule,
    CalendarModule,
    InputSwitchModule,
    AppPipesModule
  ]
})
export class LicenseModule { }
