import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateResponsiblePersonComponent } from './components/create-responsible-person/create-responsible-person.component';
import { ListResponsiblePersonComponent } from './components/list-responsible-person/list-responsible-person.component';
import { UpdateResponsiblePersonComponent } from './components/update-responsible-person/update-responsible-person.component';

const routes: Routes = [
  {
    path: '',
    component: ListResponsiblePersonComponent
},
{
    path: 'create-responsible-person',
    component: CreateResponsiblePersonComponent
},
{
    path: 'update-responsible-person/:oid',
    component: UpdateResponsiblePersonComponent
  }


]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResponsiblePersonRoutingModule { }
