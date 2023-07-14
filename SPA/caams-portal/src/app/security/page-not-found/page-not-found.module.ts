import { NgModule } from '@angular/core';
import { pageNotFoundRoutes } from './page-not-found.route';

import { PageNotFoundComponent } from './page-not-found.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
    imports: [
        pageNotFoundRoutes,
        TranslateModule
    ],
    declarations: [PageNotFoundComponent]
})
export class PageNotFoundModule { }
