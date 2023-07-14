import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAssetModelComponent } from './components/create-asset-model/create-asset-model.component';
import { ListAssetModelComponent } from './components/list-asset-model/list-asset-model.component';
import { UpdateAssetModelComponent } from './components/update-asset-model/update-asset-model.component';

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: ListAssetModelComponent,
      },
      {
        path: "create-asset-model",
        component: CreateAssetModelComponent,
      },
      {
        path: "update-asset-model/:oid",
        component: UpdateAssetModelComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetModelRoutingModule { }
