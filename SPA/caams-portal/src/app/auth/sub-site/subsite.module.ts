import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubSiteRoutingModule } from './subsite-routing.module';
import { SubSiteListComponent } from './components/subsite-list/subsite-list.component';
import { TranslateModule } from '@ngx-translate/core';
import { PrimengModule } from '@app/common/modules/primeng-modules';
import { FileUploadModule } from 'primeng/fileupload';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { LoadingImageModule } from '@app/common/components/loading-image/loading-image.module';
import { CreateSubsiteComponent } from './components/create-subsite/create-subsite.component';
import { UpdateSubsiteComponent } from './components/update-subsite/update-subsite.component';
import { InputTextareaModule } from 'primeng/inputtextarea';



@NgModule({
  declarations: [
    SubSiteListComponent,
    CreateSubsiteComponent,
    UpdateSubsiteComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    SubSiteRoutingModule,
    LoadingImageModule,
    PrimengModule,
    FileUploadModule,
    ReactiveFormsModule,
    FormsModule,
    AutoCompleteModule,
    CalendarModule,
    InputTextareaModule
  ]
})
export class SubSiteModule { }
