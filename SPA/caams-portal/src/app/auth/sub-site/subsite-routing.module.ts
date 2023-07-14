import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateSubsiteComponent } from './components/create-subsite/create-subsite.component';
import { SubSiteListComponent } from './components/subsite-list/subsite-list.component';
import { UpdateSubsiteComponent } from './components/update-subsite/update-subsite.component';


const routes: Routes = [
  {
    path: '',
    children: [
        {
            path: '',
            component: SubSiteListComponent
        },
        {
            path: 'create-subsite',
            component: CreateSubsiteComponent
        },
        {
            path: 'update-subsite/:oid',
            component: UpdateSubsiteComponent
        }


    ],
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubSiteRoutingModule { }
