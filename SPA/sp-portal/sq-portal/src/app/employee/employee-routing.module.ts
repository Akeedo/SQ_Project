import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { CreateEmployeeComponent } from './components/create-employee/create-employee.component';

const routes: Routes = [
  {
    path: "",
    children:[{
      path: "",
      component: EmployeeListComponent
    },
      {
        path: "create-employee",
        component: CreateEmployeeComponent,
      }
    ]
    
   
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
