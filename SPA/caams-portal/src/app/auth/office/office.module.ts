import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfficeRoutingModule } from './office-routing.module';
import { UpdateOfficeComponent } from './components/update-office/update-office.component';
import { TranslateModule } from '@ngx-translate/core';
import { LoadingImageModule } from '@app/common/components/loading-image/loading-image.module';
import { PrimengModule } from '@app/common/modules/primeng-modules';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {CalendarModule} from 'primeng/calendar';
import {FileUploadModule} from 'primeng/fileupload';
import { OfficeListComponent } from './components/office-list/office-list.component';
import { CreateOfficeComponent } from './components/create-office/create-office.component';


@NgModule({
  declarations: [
    OfficeListComponent,
    CreateOfficeComponent,
    UpdateOfficeComponent
  ],
  imports: [
    CommonModule,
    OfficeRoutingModule,
    TranslateModule,
    LoadingImageModule,
    OfficeRoutingModule,
    PrimengModule,
    FileUploadModule,
    ReactiveFormsModule,
    FormsModule,
    AutoCompleteModule,
    CalendarModule
  ]
})
export class OfficeModule { }
