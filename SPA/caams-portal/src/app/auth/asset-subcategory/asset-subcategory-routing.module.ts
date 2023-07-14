import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateAssetCategoryComponent } from '../asset-category/components/update-asset-category/update-asset-category.component';
import { CreateAssetSubcategoryComponent } from './components/create-asset-subcategory/create-asset-subcategory.component';
import { ListAssetSubcategoryComponent } from './components/list-asset-subcategory/list-asset-subcategory.component';
import { UpdateAssetSubcategoryComponent } from './components/update-asset-subcategory/update-asset-subcategory.component';

const routes: Routes = [
  {
    path: '',
    children: [
        {
            path: '',
            component: ListAssetSubcategoryComponent
        },
        {
            path: 'create-asset-subcategory',
            component: CreateAssetSubcategoryComponent
        },
        {
            path: 'update-asset-subcategory/:oid',
            component: UpdateAssetSubcategoryComponent
          }


    ],
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetSubcategoryRoutingModule { }
