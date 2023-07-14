import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAssetCategoryComponent } from './components/create-asset-category/create-asset-category.component';
import { ListAssetCategoryComponent } from './components/list-asset-category/list-asset-category.component';
import { UpdateAssetCategoryComponent } from './components/update-asset-category/update-asset-category.component';

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: ListAssetCategoryComponent,
      },
      {
        path: "create-asset-category",
        component: CreateAssetCategoryComponent,
      },
      {
        path: 'update-asset-category/:oid',
        component: UpdateAssetCategoryComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetCategoryRoutingModule { }
