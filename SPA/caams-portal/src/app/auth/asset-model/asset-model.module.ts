import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingImageModule } from "@app/common/components/loading-image/loading-image.module";
import { AssetModelRoutingModule } from './asset-model-routing.module';
import { ListAssetModelComponent } from './components/list-asset-model/list-asset-model.component';
import { PrimengModule } from "@app/common/modules/primeng-modules";
import { FileUploadModule } from "primeng/fileupload";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AutoCompleteModule } from "primeng/autocomplete";
import { CalendarModule } from "primeng/calendar";
import { InputSwitchModule } from "primeng/inputswitch";
import { CreateAssetModelComponent } from './components/create-asset-model/create-asset-model.component';
import { UpdateAssetModelComponent } from './components/update-asset-model/update-asset-model.component';


@NgModule({
  declarations: [ListAssetModelComponent, CreateAssetModelComponent, UpdateAssetModelComponent],
  imports: [
    CommonModule,
    AssetModelRoutingModule,
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
export class AssetModelModule {}
