import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateVendorComponent } from './components/create-vendor/create-vendor.component';
import { UpdateVendorComponent } from './components/update-vendor/update-vendor.component';
import { VendorListComponent } from './components/vendor-list/vendor-list.component';


const routes: Routes = [
  {
    path: '',
    children: [
        {
            path: '',
            component: VendorListComponent
        },
        {
          path: 'create-vendor',
          component: CreateVendorComponent
        },
        {
          path: 'update-vendor/:oid',
          component: UpdateVendorComponent
      },
    ],
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorRoutingModule { }
