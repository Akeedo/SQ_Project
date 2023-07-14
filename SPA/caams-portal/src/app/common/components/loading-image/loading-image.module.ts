import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingImageComponent } from './loading-image.component';

@NgModule({
    imports: [CommonModule],
    declarations: [LoadingImageComponent],
    exports: [LoadingImageComponent]
})
export class LoadingImageModule { }
