import { NgModule } from '@angular/core';

import { BDCurrency } from './bd-currency-format.pipe';
import { DateFormat } from './date-format.pipe';
import { LicenseCategory } from './license-category.pipe';

@NgModule({
    imports: [],
    declarations: [
        BDCurrency,
        DateFormat,
        LicenseCategory
    ],
    exports: [
        BDCurrency,
        DateFormat,
        LicenseCategory
    ]
})
export class AppPipesModule { }
