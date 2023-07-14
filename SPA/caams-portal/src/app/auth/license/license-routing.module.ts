import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateLicenseComponent } from './components/create-license/create-license.component';
import { LicenseListComponent } from './components/license-list/license-list.component';
import { UpdateLicenseComponent } from './components/update-license/update-license.component';


const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: LicenseListComponent,
      },
      {
        path: "create-license",
        component: CreateLicenseComponent,
      },
      {
        path: 'update-license/:oid',
        component: UpdateLicenseComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LicenseRoutingModule { }
  