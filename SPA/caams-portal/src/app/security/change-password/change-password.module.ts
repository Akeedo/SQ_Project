import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { PasswordModule } from 'primeng/password';
import { MessageModule } from 'primeng/message';
import { StepsModule } from 'primeng/steps';

import { ChangePasswordRoutingModule } from './change-password-routing.module';
import { ChangePasswordComponent } from './change-password.component';
import { LoadingImageModule } from '@app/common/components/loading-image/loading-image.module';
import { AppDirectivesModule } from '@app/common/directives/app-directives.module';

@NgModule({
    declarations: [ChangePasswordComponent],
    imports: [
        CommonModule,
        StepsModule,
        ChangePasswordRoutingModule,
        ToastModule,
        ReactiveFormsModule,
        LoadingImageModule,
        TranslateModule,
        PasswordModule,
        AppDirectivesModule,
        MessageModule,

    ],
    providers: [MessageService]
})
export class ChangePasswordModule { }
