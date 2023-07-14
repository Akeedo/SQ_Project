import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { ForgotUseridPasswordRoutingModule } from './forgot-userid-password-routing.module';
import { ForgotUseridPasswordComponent } from './forgot-userid-password.component';
import { LoadingImageModule } from '@app/common/components/loading-image/loading-image.module';
import { AppDirectivesModule } from '@app/common/directives/app-directives.module';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';

@NgModule({
    declarations: [ForgotUseridPasswordComponent],
    imports: [
        CommonModule,
        ForgotUseridPasswordRoutingModule,
        ProgressBarModule,
        ToastModule,
        FormsModule,
        TranslateModule,
        LoadingImageModule,
        AppDirectivesModule,
        DialogModule,
        ButtonModule
    ],
    providers: [MessageService]
})
export class ForgotUseridPasswordModule { }
