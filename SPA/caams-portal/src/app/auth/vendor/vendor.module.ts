import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorRoutingModule } from './vendor-routing.module';
import { VendorListComponent } from './components/vendor-list/vendor-list.component';
import { PrimengModule } from '@app/common/modules/primeng-modules';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingImageModule } from '@app/common/components/loading-image/loading-image.module';
import { UpdateVendorComponent } from './components/update-vendor/update-vendor.component';



@NgModule({
  declarations: [
    VendorListComponent,
    UpdateVendorComponent
  ],
  imports: [
    CommonModule,
    VendorRoutingModule,
    PrimengModule,
    FormsModule,
    ReactiveFormsModule,
    LoadingImageModule
  ]
})
export class VendorModule { }
