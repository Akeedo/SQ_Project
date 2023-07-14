import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordModule } from 'primeng/password';
import { FormsModule } from '@angular/forms';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';

import { ResetPasswordRoutingModule } from './reset-password-routing.module';
import { ResetPasswordComponent } from './reset-password.component';
import { LoadingImageModule } from '../../../common/components/loading-image/loading-image.module';

@NgModule({
    declarations: [ResetPasswordComponent],
    imports: [
        CommonModule,
        ResetPasswordRoutingModule,
        PasswordModule,
        FormsModule,
        ProgressBarModule,
        ToastModule,
        LoadingImageModule,
        MessageModule,
        TranslateModule
    ],
    providers: [MessageService]
})
export class ResetPasswordModule { }
