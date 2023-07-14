import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CalendarModule } from 'primeng/calendar';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';
import { PrimengModule } from '@app/common/modules/primeng-modules';
import { LoadingImageModule } from '@app/common/components/loading-image/loading-image.module';
import { AssetSubcategoryRoutingModule } from './asset-subcategory-routing.module';
import { ListAssetSubcategoryComponent } from './components/list-asset-subcategory/list-asset-subcategory.component';
import { CreateAssetSubcategoryComponent } from './components/create-asset-subcategory/create-asset-subcategory.component';
import { UpdateAssetSubcategoryComponent } from './components/update-asset-subcategory/update-asset-subcategory.component';


@NgModule({
  declarations: [
    ListAssetSubcategoryComponent,
    CreateAssetSubcategoryComponent,
    UpdateAssetSubcategoryComponent
  ],
  imports: [
    CommonModule,
    AssetSubcategoryRoutingModule,
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
export class AssetSubcategoryModule { }
