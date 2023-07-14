import { ButtonModule } from 'primeng/button';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoadingImageModule } from './loading-image/loading-image.module';

@NgModule({
    imports: [RouterModule, CommonModule, TranslateModule, LoadingImageModule, ButtonModule],
    declarations: [HeaderComponent, SidebarComponent],
    exports: [HeaderComponent, SidebarComponent]
})
export class SharedModule {

}
