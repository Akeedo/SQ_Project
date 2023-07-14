import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SessionExpiredComponent } from './session-expired.component';

const routes: Routes = [{
    path: '',
    children:
        [
            {
                path: '',
                component: SessionExpiredComponent
            }
        ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SessionExpiredRoutingModule { }
