import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListDesignationComponent } from './components/list-designation/list-designation.component';
import { CreateDesignationComponent } from './components/create-designation/create-designation.component';
import { RouterModule, Routes } from '@angular/router';
import { UpdateDesignationComponent } from './components/update-designation/update-designation.component';

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: ListDesignationComponent,
      },
      {
        path: "create-designation",
        component: CreateDesignationComponent,
      },
      {
        path: "update-designation/:oid",
        component: UpdateDesignationComponent,
      }
    ],
  },
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DesignationRoutingModule { }
