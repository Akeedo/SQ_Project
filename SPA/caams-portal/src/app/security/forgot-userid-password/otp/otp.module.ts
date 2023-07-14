import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputMaskModule } from 'primeng/inputmask';
import { FormsModule } from '@angular/forms';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { KeyFilterModule } from 'primeng/keyfilter';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { OtpRoutingModule } from './otp-routing.module';
import { OtpComponent } from './otp.component';
import { LoadingImageModule } from '../../../common/components/loading-image/loading-image.module';
import { AppDirectivesModule } from '../../../common/directives/app-directives.module';
import { NgCircleProgressModule } from '../../../common/custom-lib/circle-progress.module';

@NgModule({
    declarations: [OtpComponent],
    imports: [
        CommonModule,
        OtpRoutingModule,
        InputMaskModule,
        FormsModule,
        ProgressBarModule,
        ToastModule,
        LoadingImageModule,
        KeyFilterModule,
        AppDirectivesModule,
        TranslateModule,
        ConfirmDialogModule,
        NgCircleProgressModule.forRoot()
    ],
    providers: [MessageService, ConfirmationService]
})
export class OtpModule { }
