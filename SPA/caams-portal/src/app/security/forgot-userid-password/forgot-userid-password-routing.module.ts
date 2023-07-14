import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForgotUseridPasswordComponent } from './forgot-userid-password.component';


const routes: Routes = [{
    path: '',
    children:
        [
            {
                path: '',
                component: ForgotUseridPasswordComponent
            },
            {
                path: 'otp',
                loadChildren: () => import('./otp/otp.module').then(mod => mod.OtpModule)
            },
            {
                path: 'reset-password',
                loadChildren: () => import('./reset-password/reset-password.module').then(mod => mod.ResetPasswordModule)
            }
        ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForgotUseridPasswordRoutingModule { }
