import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateRoleComponent } from './components/create-role/create-role.component';
import { ListRoleComponent } from './components/list-role/list-role.component';
import { UpdateRoleComponent } from './components/update-role/update-role.component';

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: ListRoleComponent,
      },
      {
        path: "create-role",
        component: CreateRoleComponent,
      },
      {
        path: "update-role/:oid",
        component: UpdateRoleComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleRoutingModule { }
