import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';

import {MyProfileRoutingModule} from './my-profile-routing.module';
import {MyProfileComponent} from './my-profile.component';
import {LoadingImageModule} from '@app/common/components/loading-image/loading-image.module';

@NgModule({
    declarations: [MyProfileComponent],
    imports: [
        CommonModule,
        MyProfileRoutingModule,
        TranslateModule,
        ToastModule,
        LoadingImageModule
    ],
    providers: [MessageService]
})
export class MyProfileModule {
}
