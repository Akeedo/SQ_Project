import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { LoadingImageModule } from '@app/common/components/loading-image/loading-image.module';
import { PrimengModule } from '@app/common/modules/primeng-modules';
import { FileUploadModule } from 'primeng/fileupload';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { InputSwitchModule } from 'primeng/inputswitch';
import { AllReportComponent } from './components/all-report/all-report.component';
import { ByCategoryComponent } from './components/by-category/by-category.component';
import { ByIssueComponent } from './components/by-issue/by-issue.component';
import { ByManufacturerComponent } from './components/by-manufacturer/by-manufacturer.component';
import { BySiteComponent } from './components/by-site/by-site.component';
import { ByVendorComponent } from './components/by-vendor/by-vendor.component';
import { ByAllAssetsComponent } from './components/by-all-assets/by-all-assets.component';
import { ByProductSerialComponent } from './components/by-product-serial/by-product-serial.component';
import { ByPartNumberComponent } from './components/by-part-number/by-part-number.component';
import { ByCsiConNumberComponent } from './components/by-csi-con-number/by-csi-con-number.component';
import { ByConditionComponent } from './components/by-condition/by-condition.component';
import { ByResponsibleComponent } from './components/by-responsible/by-responsible.component';
import { ByAllCategoryComponent } from './components/by-all-category/by-all-category.component';
import { ByLicenseCategoryComponent } from './components/by-license-category/by-license-category.component';
import { ByPurchaseDateComponent } from './components/by-purchase-date/by-purchase-date.component';
import { ByEolDateComponent } from './components/by-eol-date/by-eol-date.component';
import { ByWarrantyStartDateComponent } from './components/by-warranty-start-date/by-warranty-start-date.component';
import { ByWarrantyEndDateComponent } from './components/by-warranty-end-date/by-warranty-end-date.component';
import { AppPipesModule } from '@app/common/pipes/app-pipes.module';
import { ByAssetHistoryComponent } from './components/by-asset-history/by-asset-history.component';


@NgModule({
  declarations: [


      AllReportComponent,
      ByCategoryComponent,
      ByIssueComponent,
      ByManufacturerComponent,
      BySiteComponent,
      ByVendorComponent,
      ByAllAssetsComponent,
      ByProductSerialComponent,
      ByPartNumberComponent,
      ByCsiConNumberComponent,
      ByConditionComponent,
      ByResponsibleComponent,
      ByAllCategoryComponent,
      ByLicenseCategoryComponent,
      ByPurchaseDateComponent,
      ByEolDateComponent,
      ByWarrantyStartDateComponent,
      ByWarrantyEndDateComponent,
      ByAssetHistoryComponent
  ],
  imports: [
    CommonModule,
    ReportRoutingModule,
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
export class ReportModule { }
