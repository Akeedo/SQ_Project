import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssetCategoryRoutingModule } from './asset-category-routing.module';
import { ListAssetCategoryComponent } from './components/list-asset-category/list-asset-category.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CalendarModule } from 'primeng/calendar';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';
import { PrimengModule } from '@app/common/modules/primeng-modules';
import { LoadingImageModule } from '@app/common/components/loading-image/loading-image.module';
import { CreateAssetCategoryComponent } from './components/create-asset-category/create-asset-category.component';
import { UpdateAssetCategoryComponent } from './components/update-asset-category/update-asset-category.component';


@NgModule({
  declarations: [
    ListAssetCategoryComponent,
    CreateAssetCategoryComponent,
    UpdateAssetCategoryComponent
  ],
  imports: [
    CommonModule,
    AssetCategoryRoutingModule,
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
export class AssetCategoryModule { }
