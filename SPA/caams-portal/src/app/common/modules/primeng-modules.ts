import { NgModule } from '@angular/core';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FieldsetModule } from 'primeng/fieldset';
import { CheckboxModule } from 'primeng/checkbox';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProgressBarModule } from 'primeng/progressbar';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { PasswordModule } from 'primeng/password';
import { AccordionModule } from 'primeng/accordion';
import { DialogModule } from 'primeng/dialog';
import { CarouselModule } from 'primeng/carousel';
import { MessageService, ConfirmationService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { KeyFilterModule } from 'primeng/keyfilter';
import { CardModule } from 'primeng/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { PanelModule } from 'primeng/panel';


@NgModule({
    imports: [],
    declarations: [],
    exports: [
        CalendarModule,
        TableModule,
        MessageModule,
        ToastModule,
        ConfirmDialogModule,
        ProgressBarModule,
        DropdownModule,
        ButtonModule,
        TooltipModule,
        PasswordModule,
        AccordionModule,
        InputTextareaModule,
        InputTextModule,
        RadioButtonModule,
        FieldsetModule,
        CheckboxModule,
        DialogModule,
        CarouselModule,
        MultiSelectModule,
        BreadcrumbModule,
        KeyFilterModule,
        CardModule,
        MatSlideToggleModule,
        PanelModule
    ],
    providers: [MessageService, ConfirmationService]
})
export class PrimengModule {

}