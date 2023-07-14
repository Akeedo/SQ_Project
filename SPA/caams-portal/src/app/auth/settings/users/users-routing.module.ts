import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUsersComponent } from './components/create-users/create-users.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { UpdateUsersComponent } from './components/update-users/update-users.component';

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: ListUsersComponent,
      },
      {
        path: "create-user",
        component: CreateUsersComponent,
      },
      {
        path: "update-user/:oid",
        component: UpdateUsersComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
