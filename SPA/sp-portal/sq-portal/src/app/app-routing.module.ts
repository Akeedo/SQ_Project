import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/components/home/home.component';
import { EmployeeListComponent } from './employee/components/employee-list/employee-list.component';

const routes: Routes = [
        {
          path: 'employee',
          loadChildren: () => import('./employee/employee-routing.module').then(mod => mod.EmployeeRoutingModule)
        }
   ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
