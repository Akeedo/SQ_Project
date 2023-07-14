import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResponsiblePersonRoutingModule } from './responsible-person-routing.module';
import { ListResponsiblePersonComponent } from './components/list-responsible-person/list-responsible-person.component';
import { CreateResponsiblePersonComponent } from './components/create-responsible-person/create-responsible-person.component';
import { UpdateResponsiblePersonComponent } from './components/update-responsible-person/update-responsible-person.component';
import { LoadingImageModule } from '@app/common/components/loading-image/loading-image.module';
import { PrimengModule } from '@app/common/modules/primeng-modules';
import { FileUploadModule } from 'primeng/fileupload';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { InputSwitchModule } from 'primeng/inputswitch';


@NgModule({
  declarations: [
    ListResponsiblePersonComponent,
    CreateResponsiblePersonComponent,
    UpdateResponsiblePersonComponent
  ],
  imports: [
    CommonModule,
    ResponsiblePersonRoutingModule,
    LoadingImageModule,
    PrimengModule,
    FileUploadModule,
    ReactiveFormsModule,
    FormsModule,
    AutoCompleteModule,
    CalendarModule,
    InputSwitchModule
  ]
})
export class ResponsiblePersonModule { }
