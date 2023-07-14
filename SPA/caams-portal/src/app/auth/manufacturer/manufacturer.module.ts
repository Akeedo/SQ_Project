import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingImageModule } from "@app/common/components/loading-image/loading-image.module";
import { PrimengModule } from "@app/common/modules/primeng-modules";
import { FileUploadModule } from "primeng/fileupload";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AutoCompleteModule } from "primeng/autocomplete";
import { CalendarModule } from "primeng/calendar";
import { InputSwitchModule } from "primeng/inputswitch";
import { ManufacturerRoutingModule } from './manufacturer-routing.module';
import { CreateManufacturerComponent } from './components/create-manufacturer/create-manufacturer.component';
import { ListManufacturerComponent } from './components/list-manufacturer/list-manufacturer.component';
import { UpdateManufacturerComponent } from './components/update-manufacturer/update-manufacturer.component';


@NgModule({
  declarations: [
    CreateManufacturerComponent,
    ListManufacturerComponent,
    UpdateManufacturerComponent,
  ],
  imports: [
    CommonModule,
    ManufacturerRoutingModule,
    LoadingImageModule,
    PrimengModule,
    FileUploadModule,
    ReactiveFormsModule,
    FormsModule,
    AutoCompleteModule,
    CalendarModule,
    InputSwitchModule,
  ],
})
export class ManufacturerModule {}
